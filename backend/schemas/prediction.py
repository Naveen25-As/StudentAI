from pydantic import BaseModel, Field
from typing import Optional, List

class AcademicInputSchema(BaseModel):
    attendance_pct: float = Field(..., ge=0.0, le=100.0, description="Attendance percentage (0-100%)")
    cia_score: float = Field(..., ge=0.0, le=50.0, description="Continuous Internal Assessment score (0-50)")
    assignment_score: float = Field(..., ge=0.0, le=25.0, description="Assignment score (0-25)")
    lab_score: float = Field(..., ge=0.0, le=25.0, description="Lab practical & viva score (0-25)")
    prev_sem_sgpa: float = Field(..., ge=0.0, le=10.0, description="Previous semester SGPA (0.0-10.0)")
    cumulative_aggregate: float = Field(..., ge=0.0, le=100.0, description="Cumulative percentage aggregate across semesters")
    active_backlogs: int = Field(default=0, ge=0, le=10, description="Number of uncleared prerequisite course backlogs")
    daily_study_hours: float = Field(default=3.5, ge=0.0, le=16.0, description="Daily focused self-study hours")
    daily_sleep_hours: float = Field(default=7.0, ge=0.0, le=16.0, description="Average daily sleep hours")
    extracurricular_hrs: float = Field(default=4.0, ge=0.0, le=40.0, description="Weekly extracurricular hours")

class PredictionResponseSchema(BaseModel):
    predicted_marks: float
    predicted_sgpa: float
    expected_grade: str
    grade_range: str
    pass_probability: float
    risk_level: str
    model_architecture: str
    confidence_r2: float

class HealthCheckResponse(BaseModel):
    status: str
    service: str
    model_name: str
    version: str
    accuracy: str
    database: str

class UserLoginSchema(BaseModel):
    email: str
    password: str

class UserRegisterSchema(BaseModel):
    name: str
    roll_number: str
    email: str
    password: str
    degree: str
    role: str = "student"

class AuthTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    name: str
    role: str
