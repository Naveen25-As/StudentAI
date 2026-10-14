from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/cohort", response_model=List[Dict[str, Any]])
def get_cohort_analytics():
    return [
        {"id": "cs-1", "rollNo": "1KL21CS042", "name": "Alex Chen", "semester": 6, "attendancePct": 85, "ciaScore": 42, "predictedMarks": 82, "predictedSgpa": 8.42, "expectedGrade": "A", "riskLevel": "Low", "activeBacklogs": 0, "lastRunDate": "Oct 24, 2024"},
        {"id": "cs-2", "rollNo": "1KL21CS018", "name": "Ananya Sharma", "semester": 6, "attendancePct": 92, "ciaScore": 46, "predictedMarks": 91, "predictedSgpa": 9.25, "expectedGrade": "O", "riskLevel": "Low", "activeBacklogs": 0, "lastRunDate": "Oct 22, 2024"},
        {"id": "cs-3", "rollNo": "1KL21CS075", "name": "Dev Patel", "semester": 6, "attendancePct": 78, "ciaScore": 38, "predictedMarks": 76, "predictedSgpa": 7.85, "expectedGrade": "B+", "riskLevel": "Low", "activeBacklogs": 0, "lastRunDate": "Oct 23, 2024"},
        {"id": "cs-4", "rollNo": "1KL21CS102", "name": "Rohan Verma", "semester": 6, "attendancePct": 71, "ciaScore": 28, "predictedMarks": 62, "predictedSgpa": 6.40, "expectedGrade": "B", "riskLevel": "High", "activeBacklogs": 2, "lastRunDate": "Oct 19, 2024"},
        {"id": "cs-5", "rollNo": "1KL21CS034", "name": "Priya Kulkarni", "semester": 6, "attendancePct": 88, "ciaScore": 44, "predictedMarks": 86, "predictedSgpa": 8.80, "expectedGrade": "A+", "riskLevel": "Low", "activeBacklogs": 0, "lastRunDate": "Oct 24, 2024"},
        {"id": "cs-6", "rollNo": "1KL21CS089", "name": "Sameer Khan", "semester": 6, "attendancePct": 74, "ciaScore": 32, "predictedMarks": 69, "predictedSgpa": 7.10, "expectedGrade": "B", "riskLevel": "Moderate", "activeBacklogs": 1, "lastRunDate": "Oct 20, 2024"}
    ]
