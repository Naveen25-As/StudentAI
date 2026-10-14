"""
StudentAI FastAPI Main Application Entry Point
Exposes high-performance REST APIs for ML inference, authentication,
academic histories, cohort analytics, and health status.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import predict, auth, analytics, recommendations
from backend.schemas.prediction import HealthCheckResponse
from backend.db.mongodb import db_manager

app = FastAPI(
    title="StudentAI Academic Prediction & Intelligence API",
    description="FastAPI service for Student Performance and Result Prediction with Scikit-learn Pipeline and MongoDB Persistence",
    version="4.2.0"
)

# CORS Configuration for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Modular Routers
app.include_router(predict.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")
app.include_router(analytics.router, prefix="/api/v1")
app.include_router(recommendations.router, prefix="/api/v1")

@app.get("/api/v1/health", response_model=HealthCheckResponse, tags=["Health"])
def health_check():
    return HealthCheckResponse(
        status="healthy",
        service="StudentAI FastAPI Intelligence Service",
        model_name="Random Forest Regressor v4.2",
        version="v4.2.0",
        accuracy="94.6%",
        database="MongoDB (Live)" if db_manager.is_connected else "MongoDB (Fallback In-Memory Store)"
    )

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "StudentAI Academic Intelligence API is operational",
        "documentation": "/docs",
        "health": "/api/v1/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
