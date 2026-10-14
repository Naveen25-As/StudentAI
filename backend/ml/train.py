"""
StudentAI Genuine Machine Learning Model Training Pipeline
Compares 4 regression architectures, prevents data leakage using Pipelines,
evaluates on test holdout sets using MAE, RMSE, and R2, and serializes the best model.
"""

import os
import json
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score, KFold
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import Ridge
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib

DATASET_PATH = "backend/ml/student_academic_records.csv"
MODEL_OUTPUT_PATH = "backend/ml/model.joblib"
METRICS_OUTPUT_PATH = "backend/ml/metrics.json"
FEATURE_IMP_OUTPUT_PATH = "backend/ml/feature_importance.json"

FEATURE_COLUMNS = [
    "attendance_pct",
    "cia_score",
    "assignment_score",
    "lab_score",
    "prev_sem_sgpa",
    "cumulative_aggregate",
    "active_backlogs",
    "daily_study_hours",
    "daily_sleep_hours",
    "extracurricular_hrs"
]
TARGET_COLUMN = "target_final_marks"

def train_and_evaluate():
    print(f"Loading academic records from {DATASET_PATH}...")
    df = pd.read_csv(DATASET_PATH)
    print(f"Dataset shape: {df.shape[0]} students, {df.shape[1]} features")

    X = df[FEATURE_COLUMNS]
    y = df[TARGET_COLUMN]

    # Data Leakage Prevention: Holdout split strictly before scaling
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42
    )
    print(f"Training split: {X_train.shape[0]} samples | Testing holdout: {X_test.shape[0]} samples")

    # Define candidate pipelines
    candidate_models = {
        "Ridge Regression (Baseline)": Pipeline([
            ("scaler", StandardScaler()),
            ("regressor", Ridge(alpha=1.0))
        ]),
        "Decision Tree Regressor": Pipeline([
            ("regressor", DecisionTreeRegressor(max_depth=6, random_state=42))
        ]),
        "Random Forest Regressor": Pipeline([
            ("regressor", RandomForestRegressor(n_estimators=100, max_depth=8, random_state=42))
        ]),
        "Gradient Boosting Regressor": Pipeline([
            ("regressor", GradientBoostingRegressor(n_estimators=100, max_depth=4, learning_rate=0.08, random_state=42))
        ])
    }

    results = {}
    cv = KFold(n_splits=5, shuffle=True, random_state=42)

    print("\n" + "=" * 75)
    print(f"{'Model Architecture':<32} | {'CV R2 Mean':<10} | {'Test MAE':<9} | {'Test RMSE':<9} | {'Test R2':<8}")
    print("=" * 75)

    best_model_name = None
    best_test_r2 = -float("inf")
    best_pipeline = None

    for name, pipeline in candidate_models.items():
        # 5-Fold Cross Validation
        cv_scores = cross_val_score(pipeline, X_train, y_train, cv=cv, scoring="r2")
        cv_r2_mean = float(np.mean(cv_scores))

        # Train on full train fold
        pipeline.fit(X_train, y_train)

        # Evaluate on holdout test set
        y_pred = pipeline.predict(X_test)
        mae = float(mean_absolute_error(y_test, y_pred))
        rmse = float(np.sqrt(mean_squared_error(y_test, y_pred)))
        r2 = float(r2_score(y_test, y_pred))

        results[name] = {
            "cv_r2_mean": round(cv_r2_mean, 4),
            "test_mae": round(mae, 3),
            "test_rmse": round(rmse, 3),
            "test_r2": round(r2, 4)
        }

        print(f"{name:<32} | {cv_r2_mean:<10.4f} | {mae:<9.3f} | {rmse:<9.3f} | {r2:<8.4f}")

        if r2 > best_test_r2:
            best_test_r2 = r2
            best_model_name = name
            best_pipeline = pipeline

    print("=" * 75)
    print(f"\nOptimal Architecture Selected: {best_model_name} (Test R2: {best_test_r2:.4f})")

    # Serialize trained pipeline artifact
    os.makedirs(os.path.dirname(MODEL_OUTPUT_PATH), exist_ok=True)
    joblib.dump(best_pipeline, MODEL_OUTPUT_PATH)
    print(f"Saved serialized model pipeline to {MODEL_OUTPUT_PATH}")

    # Extract feature importance if tree-based
    feature_importances = {}
    if hasattr(best_pipeline.named_steps.get("regressor", None), "feature_importances_"):
        importances = best_pipeline.named_steps["regressor"].feature_importances_
        for feat, imp in zip(FEATURE_COLUMNS, importances):
            feature_importances[feat] = round(float(imp), 4)

    # Save metrics JSON for reporting
    metrics_payload = {
        "best_model": best_model_name,
        "test_r2": round(best_test_r2, 4),
        "test_mae": results[best_model_name]["test_mae"],
        "test_rmse": results[best_model_name]["test_rmse"],
        "cv_r2_mean": results[best_model_name]["cv_r2_mean"],
        "all_models_evaluated": results,
        "dataset_samples": len(df),
        "features": FEATURE_COLUMNS
    }

    with open(METRICS_OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(metrics_payload, f, indent=2)
    print(f"Saved evaluation metrics report to {METRICS_OUTPUT_PATH}")

    if feature_importances:
        with open(FEATURE_IMP_OUTPUT_PATH, "w", encoding="utf-8") as f:
            json.dump(feature_importances, f, indent=2)
        print(f"Saved feature importances to {FEATURE_IMP_OUTPUT_PATH}")

    return metrics_payload

if __name__ == "__main__":
    train_and_evaluate()
