# StudentAI Academic Dataset & Data Dictionary

## 1. Dataset Overview
This dataset contains academic performance records calibrated for engineering and computer application collegiate degrees (BCA / B.Tech CS). It reflects continuous internal assessments, laboratory evaluations, statutory attendance compliance, historical GPA trajectory, and study habits.

**Dataset Mode**: Curated synthetic dataset generated from university statistical distributions ($N = 2,500$ student records) for placement demonstration and baseline model training.

### Limitations of Synthetic Data:
- Real-world student outcomes include latent behavioral factors (health disruptions, family circumstances, exam day stress) not fully represented in statistical synthesis.
- Curricular grading standards vary across autonomous universities; hyperparameter re-calibration is required before real institutional deployment.
- No model prediction should supersede official accredited examination boards or human faculty academic counseling.

---

## 2. Feature Schema & Data Dictionary

| Column Name | Data Type | Range | Unit / Scale | Description | Weight in Matrix |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `attendance_pct` | Float | 40.0 – 100.0 | Percentage (%) | Cumulative lecture attendance in active semester. Statutory minimum is 75%. | 25% |
| `cia_score` | Float | 10.0 – 50.0 | Marks (Max 50) | Continuous Internal Assessment mid-term score. | 35% (Current term composite) |
| `assignment_score` | Float | 5.0 – 25.0 | Marks (Max 25) | Coursework submissions, lab record books, and mini-project milestones. | 15% (Current term composite) |
| `lab_score` | Float | 5.0 – 25.0 | Marks (Max 25) | Hands-on practical laboratory execution and viva voce evaluation. | 15% (Current term composite) |
| `prev_sem_sgpa` | Float | 4.0 – 10.0 | GPA (Scale 10.0) | Semester 5 Grade Point Average. | 25% |
| `cumulative_aggregate` | Float | 45.0 – 95.0 | Percentage (%) | Cumulative grade percentage across collegiate Semesters 1 to 5. | Historical anchor |
| `active_backlogs` | Integer | 0 – 5 | Count | Number of uncleared prerequisite course arrears. | Penalty factor (-4.2 pts/backlog) |
| `daily_study_hours` | Float | 1.0 – 10.0 | Hours/Day | Dedicated self-directed study outside instructional lecture hours. | 15% (Habits composite) |
| `daily_sleep_hours` | Float | 4.0 – 10.0 | Hours/Day | Nightly sleep duration affecting cognitive focus and retention. | Rest factor |
| `extracurricular_hrs` | Float | 0.0 – 20.0 | Hours/Week | Engagement in athletics, student clubs, hackathons, and community work. | Balance factor |
| `target_final_marks` | Float | 30.0 – 100.0 | Marks (Max 100) | **Target Variable**: Terminal composite semester examination mark. | Ground Truth |

---

## 3. Data Leakage Prevention Strategy
1. **Pipeline Isolation**: Preprocessing scaling (`StandardScaler`) is strictly enclosed within `sklearn.pipeline.Pipeline` objects fitted only on training folds.
2. **Train/Test Holdout**: An 80/20 train/test split with stratified cross-validation ensures evaluation occurs strictly on unseen student test sets.
3. **No Target Leakage**: The target variable `target_final_marks` is excluded from all feature transformations.
