from fastapi import APIRouter, HTTPException, Depends
from backend.schemas.prediction import UserLoginSchema, UserRegisterSchema, AuthTokenResponse
from backend.db.mongodb import db_manager
import hashlib
import time

router = APIRouter(prefix="/auth", tags=["Authentication"])

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

@router.post("/login", response_model=AuthTokenResponse)
def login_user(payload: UserLoginSchema):
    user = db_manager.find_user_by_email(payload.email)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid university credentials.")
    
    if user.get("password_hash") != hash_password(payload.password):
        raise HTTPException(status_code=401, detail="Incorrect password.")
        
    # Generate simple mock JWT token for session
    token = f"jwt_{user['id']}_{int(time.time())}"
    
    return AuthTokenResponse(
        access_token=token,
        token_type="bearer",
        user_id=user["id"],
        name=user["name"],
        role=user.get("role", "student")
    )

@router.post("/register", response_model=AuthTokenResponse)
def register_user(payload: UserRegisterSchema):
    existing = db_manager.find_user_by_email(payload.email)
    if existing:
        raise HTTPException(status_code=400, detail="Student email is already registered.")
        
    user_id = f"usr-{payload.roll_number.lower().replace(' ', '-')}"
    new_user = {
        "id": user_id,
        "name": payload.name,
        "email": payload.email,
        "roll_number": payload.roll_number,
        "degree": payload.degree,
        "role": payload.role,
        "password_hash": hash_password(payload.password)
    }
    
    db_manager.insert_user(new_user)
    token = f"jwt_{user_id}_{int(time.time())}"
    
    return AuthTokenResponse(
        access_token=token,
        token_type="bearer",
        user_id=user_id,
        name=payload.name,
        role=payload.role
    )
