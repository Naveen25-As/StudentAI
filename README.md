# StudentAI — AI-Powered Student Performance & Result Prediction System

StudentAI is a portfolio-grade academic diagnostic and result prediction application engineered for BCA and B.Tech Computer Science faculties and students. It integrates an institutional dashboard design inspired by Google Stitch with a Scikit-learn machine learning regression pipeline, Python FastAPI backend, and MongoDB persistence.

## 🚀 Live Demo

![Vercel Deployment](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)
---

## 🌟 Key Capabilities

1. **Academic Overview Dashboard**:
   - 5 Key summary metrics: Predicted Marks (82/100), Expected Grade (Grade A), Pass Probability (94%), Attendance Rate (85%), Risk Assessment (Low Risk).
   - Semester Performance Trajectory hybrid chart comparing historical terms (Sem 1–5) against AI-predicted Sem 6.
   - 5-Module Competency Progress meters (Python, DBMS, Web Development, Computer Networks, Mathematics IV).
   - Dynamic Improvement Plan with checkable priority interventions.
   - Recent Prediction Runs table with quick filtering.

2. **Computational Assessment Matrix (`/predict`)**:
   - **Section A (Current Academic Performance - 60% Weight)**: Attendance slider with dynamic detention bar warnings (<75% Detained, 75% Mandatory, >90% Exemplary), CIA (max 50), Assignments (max 25), Practical/Viva (max 25).
   - **Section B (Previous Collegiate Benchmarks - 25% Weight)**: Previous SGPA, Cumulative Aggregate %, Active Backlogs selector.
   - **Section C (Study Habits - 15% Weight)**: Daily study hours, sleep duration, and extracurricular hours.
   - **Instant Live Benchmark Preview**: High-contrast card recalculating estimated SGPA, pass probability, and risk tier dynamically on any slider or input change.

3. **Performance Prediction Report (`/report/:id`)**:
   - Radial SVG score gauge (82/100 PTS) with "First Class with Distinction Band".
   - **SHAP Feature Attribution Audit**: Visualizes individual feature lift (+6.2% CIA lift, +4.8% Attendance lift, -1.5% Lab delta) with cohort mean baseline indicators.
   - Course-level forecast breakdown with syllabus credits and lead instructors.
   - Strengths vs. Areas for Improvement panels.
   - Interactive Recommended Action Checklist with completion toggles.
   - Faculty Advisor Card with 1-on-1 messaging modal.

4. **Academic Analytics & History**:
   - Recharts SGPA progression, attendance-to-marks correlation scatter, and subject competency radar charts.
   - Searchable, filterable historical archive of all automated and manual prediction runs.

5. **Admin & Faculty Portal (`/admin`)**:
   - Cohort risk distribution across 120 enrolled students (81.6% Low, 13.3% Moderate, 5.0% High Risk).
   - Attendance compliance filter identifying students below the 75% statutory bar.
   - Advisory notice dispatching.

---

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        StudentAI Application Shell                     │
│  ┌───────────────────────┐  ┌────────────────────────────────────────┐  │
│  │    Sidebar Navigation  │  │   Top Header (Search, Notice, User)   │  │
│  │ - Logo & Semester Tag │  └────────────────────────────────────────┘  │
│  │ - Nav Links (7 items) │  ┌────────────────────────────────────────┐  │
│  │ - Model Engine Badge  │  │             Routed Main View           │  │
│  │ - Role Switcher       │  │  • /dashboard     • /predict           │  │
│  └───────────────────────┘  │  • /report/:id    • /history           │  │
│                             │  • /analytics     • /recommendations   │  │
│                             │  • /settings      • /admin             │  │
│                             │  • /login         • /register          │  │
│                             │  • /              (Landing)            │  │
│                             └────────────────────────────────────────┘  │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
┌───────────────────────────────────┐       ┌───────────────────────────────────┐
│     Prediction Engine Utility     │       │     Local Storage Data Store      │
│  • calculatePrediction(input)     │       │  • studentProfile (Alex Chen)     │
│  • SHAP feature impact lifts      │       │  • predictionRuns []              │
│  • Subject-level grade estimates  │       │  • recommendationChecklist []     │
│  • Risk tier & pass probability   │       │  • cohortRecords (for Admin)      │
└───────────────────────────────────┘       └───────────────────────────────────┘
```

---

## 🚀 Getting Started Locally

### 1. Frontend Setup (React + Vite + Tailwind)
```bash
# Clone the repository
git clone <repo-url>
cd studentai

# Install dependencies
npm install

# Start development server
npm run dev
```
The frontend is available at `http://localhost:3000` (or `http://localhost:5173`).

### 2. Machine Learning Pipeline Training
```bash
# Generate the realistic academic dataset (2,500 records)
python3 backend/ml/dataset_generator.py

# Train candidate models, prevent leakage, evaluate metrics, and export model.joblib
python3 backend/ml/train.py
```
This evaluates Ridge, DecisionTree, RandomForest, and GradientBoosting using 5-fold cross-validation and writes `backend/ml/metrics.json` and `backend/ml/model.joblib`.

### 3. Python FastAPI Backend Setup
```bash
# Install Python dependencies
pip install -r backend/requirements.txt

# Launch FastAPI development server
uvicorn backend.main:app --reload --port 8000
```
- Swagger API Docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/api/v1/health`

### 4. MongoDB Database Setup (Optional)
If MongoDB is installed locally:
```bash
mongod --dbpath /data/db
```
Configure `.env`:
```env
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=studentai_db
VITE_API_URL=http://localhost:8000/api/v1
```
*Note: If MongoDB is not running, StudentAI automatically activates its robust in-memory persistence fallback with clear UI indication.*

---

## 🔬 Honest Live vs. Sample Data Distinction
- **When FastAPI is online**: The header shows `FastAPI ML Backend Live Synced` with a pulsing green indicator. Result predictions query the trained Scikit-learn model pipeline in real-time.
- **When offline**: The header transparently displays `Illustrative AI Estimates Active` with an informational pill. The frontend calculates estimates using a deterministic regression formula matching the Stitch design weights (CIA 35%, SGPA 25%, Attendance 25%, Habits 15%), ensuring zero broken UI and transparent attribution.

---

## 📜 License
Apache-2.0
