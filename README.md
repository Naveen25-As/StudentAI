# 🎓 StudentAI — AI-Powered Student Performance & Result Prediction System

StudentAI is an AI-powered academic performance analysis and result prediction application designed for BCA and B.Tech Computer Science students and faculty. It combines a React-based dashboard, a Python FastAPI backend, a Scikit-learn machine learning pipeline, and MongoDB persistence to help analyze academic performance and estimate future results.

## 🚀 Live Demo

🌐 **Frontend:** [Launch StudentAI](https://student-ai-bice.vercel.app/)

⚙️ **Backend API:** [StudentAI API](https://studentai-api-u23u.onrender.com/)

📚 **API Documentation:** [Explore Swagger UI](https://studentai-api-u23u.onrender.com/docs)

💻 **Source Code:** [View Repository on GitHub](https://github.com/Naveen25-As/StudentAI/edit/main/README.md)

![Frontend](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![Machine Learning](https://img.shields.io/badge/ML-Scikit--learn-F7931E?logo=scikitlearn)
![Database](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)

---

## 📌 Table of Contents

* [Overview](#-overview)
* [Key Features](#-key-features)
* [Technology Stack](#️-technology-stack)
* [System Architecture](#️-system-architecture)
* [Getting Started](#-getting-started-locally)
* [Machine Learning Pipeline](#-machine-learning-pipeline)
* [API Endpoints](#-api-endpoints)
* [Live vs. Sample Data](#-live-vs-sample-data)
* [Future Enhancements](#-future-enhancements)
* [License](#-license)
* [Author](#-author)

---

## 🌟 Overview

StudentAI helps students and faculty explore academic performance through interactive dashboards, academic indicators, machine learning predictions, and personalized improvement recommendations.

The application is designed to bring together academic records, attendance information, study habits, and previous semester performance in one place.

### 🎯 Project Objectives

* Estimate future academic performance using machine learning.
* Analyze attendance, assignments, internal assessments, and previous academic results.
* Identify potential academic risks.
* Present performance trends through interactive charts.
* Provide recommendations to help students improve their academic performance.
* Demonstrate the integration of frontend development, backend APIs, machine learning, and database technologies.

---

## ✨ Key Features

### 1. 📊 Academic Overview Dashboard

* Summary cards for predicted marks, expected grade, pass probability, attendance, and academic risk.
* Semester performance trajectory comparing previous semester results with predicted performance.
* Subject competency indicators for Python, DBMS, Web Development, Computer Networks, and Mathematics IV.
* Academic improvement recommendations.
* Recent prediction history with filtering options.

### 2. 🤖 Academic Performance Prediction

The prediction interface organizes academic information into three categories.

**Section A — Current Academic Performance**

* Attendance percentage.
* Continuous Internal Assessment (CIA) marks.
* Assignment marks.
* Practical and viva performance.
* Attendance warnings for students below the required threshold.

**Section B — Previous Academic Performance**

* Previous semester SGPA.
* Cumulative academic percentage.
* Active backlogs.

**Section C — Study Habits**

* Daily study hours.
* Sleep duration.
* Extracurricular activity hours.

The prediction interface provides estimated academic indicators and performance risk information based on the active prediction implementation.

### 3. 📄 Performance Prediction Report

The report interface is designed to present:

* Predicted academic scores.
* Expected grade and performance classification.
* Subject-level performance estimates.
* Strengths and areas requiring improvement.
* Recommended actions for academic improvement.
* Visual indicators explaining contributing academic factors.

**Note:** Feature-attribution charts and other explanatory indicators should be interpreted according to their underlying implementation. They should not be considered genuine SHAP explanations unless calculated using the SHAP library and the trained model.

### 4. 📈 Academic Analytics & History

* Semester performance progression.
* Attendance and marks comparison.
* Subject competency visualizations.
* Searchable prediction history.
* Filtering of historical prediction records.

### 5. 🏫 Admin & Faculty Portal

The interface includes features designed for academic monitoring:

* Cohort-level academic risk visualization.
* Attendance compliance indicators.
* Identification of students who may need academic support.
* Academic advisory notices.

**Data note:** Cohort totals and student statistics displayed in demonstration dashboards should be identified as sample data unless they are generated from actual connected records.

---

## 🛠️ Technology Stack

| Category            | Technologies            |
| ------------------- | ----------------------- |
| Frontend            | React, TypeScript, Vite |
| UI & Styling        | Tailwind CSS            |
| Data Visualization  | Recharts                |
| Backend             | Python, FastAPI         |
| Machine Learning    | Scikit-learn            |
| Data Processing     | Pandas, NumPy           |
| Model Persistence   | Joblib                  |
| Database            | MongoDB                 |
| API Documentation   | Swagger UI / OpenAPI    |
| Frontend Deployment | Vercel                  |
| Backend Deployment  | Render                  |
| Version Control     | Git and GitHub          |

---

## 🏗️ System Architecture

```text
                   ┌──────────────────────────┐
                   │       User / Student     │
                   └────────────┬─────────────┘
                                │
                                ▼
                   ┌──────────────────────────┐
                   │     React + TypeScript   │
                   │       Vite Frontend      │
                   │       (Vercel)           │
                   └────────────┬─────────────┘
                                │
                         HTTP / REST API
                                │
                                ▼
                   ┌──────────────────────────┐
                   │       FastAPI Backend    │
                   │        (Render)          │
                   └────────────┬─────────────┘
                                │
                  ┌─────────────┴─────────────┐
                  ▼                           ▼
       ┌─────────────────────┐    ┌─────────────────────┐
       │ Scikit-learn Model  │    │   MongoDB Database  │
       │ Academic Prediction │    │ Prediction Records  │
       └─────────────────────┘    └─────────────────────┘
```

### Prediction Workflow

1. The user enters academic and study-habit information.
2. The frontend sends the prediction request to the backend when the live API is configured and available.
3. FastAPI validates the request.
4. The prediction pipeline processes the input using the trained model.
5. The backend returns the prediction response.
6. The frontend displays the result and associated academic indicators.

If the backend is unavailable, the frontend may use its configured illustrative prediction logic instead. The interface should clearly distinguish illustrative estimates from model-generated results.

---

## 💻 Getting Started Locally

Follow these instructions to run StudentAI on your computer.

### Prerequisites

Install the following:

* Python 3.11 or a compatible supported version.
* Node.js and npm.
* Git.
* MongoDB, if you want to use a local MongoDB database.

### 1. Clone the Repository

Replace the repository URL below with your actual StudentAI repository URL if it is different.

```bash
git clone <YOUR-STUDENTAI-REPOSITORY-URL>
cd StudentAI
```

### 2. Install Frontend Dependencies

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Open the local URL printed in your terminal. Depending on the Vite configuration, it may be `http://localhost:3000` or `http://localhost:5173`.

### 3. Set Up the Python Environment

Create a virtual environment:

**Windows PowerShell**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install the backend dependencies:

```bash
pip install -r backend/requirements.txt
```

### 4. Generate the Dataset and Train the Model

If you want to regenerate the training dataset and train the model, run:

```bash
python backend/ml/dataset_generator.py
python backend/ml/train.py
```

These commands are intended to generate academic records and train the configured machine learning pipeline. The exact output files depend on the repository implementation.

Ensure the training scripts complete successfully before starting the backend if the application requires a generated model file.

### 5. Configure Environment Variables

Create a `.env` file in the appropriate project directory and configure the environment variables required by your implementation.

Example:

```env
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=studentai_db
VITE_API_URL=http://localhost:8000/api/v1
```

**Important:**

* Place frontend variables where Vite can read them.
* Configure backend variables in the environment used by FastAPI.
* Confirm that the application loads each variable from the correct location.
* Never commit credentials, API keys, or production database connection strings to GitHub.
* Keep `.env` files out of version control and provide a safe `.env.example` instead.

### 6. Start the FastAPI Backend

From the project root, run:

```bash
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

The backend should be available at:

* **API Base URL:** `http://127.0.0.1:8000/api/v1`
* **Swagger Documentation:** `http://127.0.0.1:8000/docs`
* **Health Check:** `http://127.0.0.1:8000/api/v1/health`

The health-check URL assumes that your application defines this route. If your route differs, use the endpoint configured in your backend.

### 7. Configure MongoDB

For a local MongoDB installation, configure:

```env
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=studentai_db
```

Ensure MongoDB is running before starting the backend.

Alternatively, use MongoDB Atlas by configuring your connection string in the backend environment. Keep the connection string private.

---

## 🧠 Machine Learning Pipeline

StudentAI uses a Scikit-learn machine learning pipeline to estimate academic performance.

The training workflow is intended to:

1. Generate or load an academic dataset.
2. Prepare input features and target values.
3. Train and evaluate candidate regression models.
4. Select a model based on the configured evaluation procedure.
5. Save the trained model for inference.
6. Load the saved model in the prediction backend.
7. Return predictions through the FastAPI API.

The candidate models described in the project include:

* Ridge Regression
* Decision Tree Regressor
* Random Forest Regressor
* Gradient Boosting Regressor

The training script is configured to evaluate models using cross-validation.

**Model evaluation note:** Dataset size, evaluation metrics, cross-validation results, and model performance should be reported from the actual generated dataset and training output. Synthetic training data and evaluation results alone do not establish real-world prediction accuracy.

---

## 🔌 API Endpoints

The deployed backend provides API documentation through FastAPI's Swagger UI.

**Explore the API:** [StudentAI Swagger Documentation](https://studentai-api-u23u.onrender.com/docs)

The following are example endpoint descriptions; confirm the actual routes in Swagger UI before relying on them.

| Endpoint          | Purpose                                   |
| ----------------- | ----------------------------------------- |
| `/docs`           | Interactive API documentation             |
| `/api/v1/health`  | Backend health check, if configured       |
| `/api/v1/predict` | Academic prediction, if configured        |
| Additional routes | Determined by the implemented API routers |

---

## 🔬 Live vs. Illustrative Predictions

StudentAI distinguishes between backend-generated predictions and illustrative frontend estimates.

### Live Backend Mode

When the FastAPI service is available and the frontend is configured correctly:

* Prediction requests can be sent to the backend.
* The backend can load the trained Scikit-learn model.
* The model generates predictions from the supplied input.
* Results are returned to the frontend through the API.

### Illustrative Mode

When the backend is unavailable, the frontend may use its local prediction logic to preserve the demonstration experience.

These estimates are illustrative and should not be presented as predictions generated by the trained model.

**Important:** Always check the application's live status indicator and verify the API response when demonstrating the machine learning functionality.

---

## 🔮 Future Enhancements

Potential improvements include:

* Student authentication and role-based access control.
* Faculty and administrator dashboards backed by real database records.
* Improved model evaluation using held-out test data.
* Model explainability based on validated SHAP calculations.
* Exportable academic performance reports.
* More comprehensive prediction history and analytics.
* Automated testing and continuous integration.
* Improved accessibility and mobile responsiveness.

---

## 📜 License

This project is licensed under the Apache License 2.0.

If you distribute this project under Apache-2.0, include the applicable `LICENSE` file in the repository.

---

## 👨‍💻 Author

**Naveen Asundi**

* GitHub: [Naveen25-As](https://github.com/Naveen25-As)
* LinkedIn: [Connect with me](https://www.linkedin.com/in/naveen-asundi-0a75b739/)

---

⭐ **If you find StudentAI interesting, explore the live demo and check out the source code!**
