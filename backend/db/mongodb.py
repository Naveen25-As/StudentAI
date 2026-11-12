"""
MongoDB database connection and persistence helpers.

MongoDB documents are not altered during startup. The in-memory fallback is
local-development only and never creates an administrator account.
"""

import os
from datetime import datetime

from passlib.context import CryptContext

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "studentai_db")
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def _build_memory_users():
    """Optionally provision a local demo student from explicit operator settings."""
    app_env = os.getenv("APP_ENV", "development").strip().lower()
    demo_enabled = os.getenv("DEMO_STUDENT_ENABLED", "").strip().lower() == "true"
    password = os.getenv("DEMO_STUDENT_PASSWORD")

    if app_env == "production" or not demo_enabled or not password:
        return []
    if len(password.encode("utf-8")) > 72:
        raise ValueError("DEMO_STUDENT_PASSWORD must be at most 72 UTF-8 bytes for bcrypt.")

    return [{
        "id": "usr-local-demo-student",
        "name": "Local Demo Student",
        "email": os.getenv("DEMO_STUDENT_EMAIL", "student@example.test").strip().lower(),
        "password_hash": password_context.hash(password),
        "role": "student",
        "roll_number": "LOCAL-DEMO",
        "degree": "Demo Program",
    }]


# No public default password or fallback admin account. This is process-local
# demonstration data only and does not create, update, or delete MongoDB records.
_memory_db = {
    "users": _build_memory_users(),
    "predictions": [],
    "recommendations": [],
}


class DatabaseManager:
    def __init__(self):
        self.client = None
        self.db = None
        self.is_connected = False
        self._init_connection()

    def _init_connection(self):
        try:
            from pymongo import MongoClient

            self.client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=800)
            self.client.admin.command("ping")
            self.db = self.client[DATABASE_NAME]
            self.is_connected = True
            print(f"[DatabaseManager] Successfully connected to MongoDB at {MONGODB_URI}")
        except Exception as e:
            self.is_connected = False
            print(f"[DatabaseManager] MongoDB server not reachable ({e}). Using in-memory data store.")

    def find_user_by_email(self, email: str):
        normalized_email = email.strip().lower()
        if self.is_connected and self.db is not None:
            return self.db.users.find_one({"email": normalized_email})
        return next((user for user in _memory_db["users"] if user["email"] == normalized_email), None)

    def find_user_by_id(self, user_id: str):
        if self.is_connected and self.db is not None:
            return self.db.users.find_one({"id": user_id})
        return next((user for user in _memory_db["users"] if user["id"] == user_id), None)

    def insert_user(self, user_dict: dict):
        if self.is_connected and self.db is not None:
            result = self.db.users.insert_one(user_dict)
            user_dict["_id"] = str(result.inserted_id)
            return user_dict
        _memory_db["users"].append(user_dict)
        return user_dict

    def update_password_hash(self, user_id: str, old_hash: str, new_hash: str) -> bool:
        """Replace a verified legacy hash without overwriting concurrent changes."""
        if self.is_connected and self.db is not None:
            result = self.db.users.update_one(
                {"id": user_id, "password_hash": old_hash},
                {"$set": {"password_hash": new_hash}},
            )
            return result.modified_count == 1

        for user in _memory_db["users"]:
            if user["id"] == user_id and user.get("password_hash") == old_hash:
                user["password_hash"] = new_hash
                return True
        return False

    def save_prediction(self, prediction_doc: dict):
        prediction_doc["created_at"] = datetime.utcnow().isoformat()
        if self.is_connected and self.db is not None:
            self.db.predictions.insert_one(prediction_doc)
        else:
            _memory_db["predictions"].append(prediction_doc)
        return prediction_doc

    def get_user_predictions(self, user_id: str = "usr-alex-chen"):
        if self.is_connected and self.db is not None:
            return list(self.db.predictions.find({"user_id": user_id}).sort("created_at", -1))
        return list(reversed(_memory_db["predictions"]))


db_manager = DatabaseManager()
