from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])

@router.get("", response_model=List[Dict[str, Any]])
def get_recommendations():
    return [
        {
            "id": "rec-1",
            "priority": "high",
            "priorityLabel": "High Priority",
            "title": "Dedicate +45 mins/week on Mathematics IV Numerical Methods",
            "subtitle": "Module continuous assessment • Partial differential equations problem sets show highest error frequency.",
            "targetTimeline": "Target: Friday",
            "estimatedBoost": "+3.5% Est. Boost",
            "categoryTag": "Continuous Assessment",
            "moduleRelated": "Mathematics IV",
            "completed": False
        },
        {
            "id": "rec-2",
            "priority": "high",
            "priorityLabel": "High Priority",
            "title": "Attend Saturday extra practical lab session for SQL query tuning",
            "subtitle": "Coursework threshold maintenance • Elevates DBMS practical viva preparedness before external examiner evaluations.",
            "targetTimeline": "Lab 3B • Saturday 10:00 AM",
            "estimatedBoost": "+2.5% Est. Boost",
            "categoryTag": "Lab Practical",
            "moduleRelated": "DBMS",
            "completed": False
        },
        {
            "id": "rec-3",
            "priority": "medium",
            "priorityLabel": "Medium Priority",
            "title": "Complete DBMS Lab Practical 4 Submission",
            "subtitle": "Coursework threshold maintain >85% • Stored procedures and triggers benchmark verification.",
            "targetTimeline": "Due in 3 days",
            "estimatedBoost": "+1.8% Est. Boost",
            "categoryTag": "Core Practical",
            "moduleRelated": "DBMS",
            "completed": False
        }
    ]
