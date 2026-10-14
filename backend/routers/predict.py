from fastapi import APIRouter, HTTPException
from backend.schemas.prediction import AcademicInputSchema, PredictionResponseSchema
from backend.ml.predictor import predictor
from backend.db.mongodb import db_manager

router = APIRouter(prefix="/predict", tags=["Predictions"])

@router.post("", response_model=PredictionResponseSchema)
def predict_academic_result(input_data: AcademicInputSchema):
    try:
        prediction_result = predictor.predict(input_data.model_dump())
        
        # Log to persistent MongoDB store
        log_entry = {
            "user_id": "usr-alex-chen",
            "input_parameters": input_data.model_dump(),
            "prediction_metrics": prediction_result
        }
        db_manager.save_prediction(log_entry)
        
        return PredictionResponseSchema(**prediction_result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")
