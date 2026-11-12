"""
MongoDB Database Connection & Persistent Store
Handles connection pooling to MongoDB via Motor/PyMongo,
with an in-memory document store fallback when a local MongoDB instance is not active.
"""

import os
from datetime import datetime

from passlib.context import CryptContext

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "studentai_db")

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def _hash_demo_password(password: str) -> str:
    return password_context.hash(password)


# Fallback in-memory collections when MongoDB server is not running.
# The legacy public demo accounts are preserved only for local development and are not
# treated as production admin identities.
_memory_db = {
    "users": [
        {
            "id": "usr-alex-chen",
            "name": "Alex Chen",
            "email": "alex.chen@university.edu",
            "password_hash": _hash_demo_password("student2025"),
            "role": "student",
            "roll_number": "1KL21CS042",
            "degree": "B.Tech Computer Science",
        }
    ],
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
            print(
                f"[DatabaseManager] MongoDB server not reachable ({e}). Using secure in-memory data store."
            )

    def find_user_by_email(self, email: str):
        if self.is_connected and self.db is not None:
            return self.db.users.find_one({"email": email})
        for user in _memory_db["users"]:
            if user["email"] == email:
                return user
        return None

    def find_user_by_id(self, user_id: str):
        if self.is_connected and self.db is not None:
            return self.db.users.find_one({"id": user_id})
        for user in _memory_db["users"]:
            if user["id"] == user_id:
                return user
        return None

    def insert_user(self, user_dict: dict):
        if self.is_connected and self.db is not None:
            result = self.db.users.insert_one(user_dict)
            user_dict["_id"] = str(result.inserted_id)
            return user_dict
        _memory_db["users"].append(user_dict)
        return user_dict

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
