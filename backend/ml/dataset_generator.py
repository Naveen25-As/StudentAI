"""
StudentAI Synthetic Academic Dataset Generator
Generates realistic collegiate student records with non-linear correlations
and statutory detention boundary effects.
"""

import os
import random
import csv

def generate_academic_dataset(num_samples=2500, output_path="backend/ml/student_academic_records.csv"):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    random.seed(42)

    headers = [
        "student_id",
        "attendance_pct",
        "cia_score",
        "assignment_score",
        "lab_score",
        "prev_sem_sgpa",
        "cumulative_aggregate",
        "active_backlogs",
        "daily_study_hours",
        "daily_sleep_hours",
        "extracurricular_hrs",
        "target_final_marks"
    ]

    rows = []
    for i in range(1, num_samples + 1):
        student_id = f"STU-{10000 + i}"
        
        # Base student academic capability tier (latent variable: 0.5 to 1.0)
        capability = random.betavariate(5, 2) # Skewed towards 0.70-0.85
        
        # Attendance: Normal distribution centered around 82%
        attendance_pct = min(100.0, max(42.0, round(random.gauss(82.0, 9.5), 1)))
        
        # CIA: Continuous internal assessment (max 50)
        cia_score = min(50.0, max(12.0, round((capability * 46.0) + random.gauss(0, 3.2), 1)))
        
        # Assignments (max 25)
        assignment_score = min(25.0, max(8.0, round((capability * 23.0) + random.gauss(0, 1.8), 1)))
        
        # Lab practical & viva (max 25)
        lab_score = min(25.0, max(8.0, round((capability * 22.5) + random.gauss(0, 2.0), 1)))
        
        # Previous Sem SGPA (scale 10.0)
        prev_sem_sgpa = min(10.0, max(4.0, round((capability * 9.4) + random.gauss(0, 0.4), 2)))
        
        # Cumulative Aggregate %
        cumulative_aggregate = min(96.0, max(48.0, round((prev_sem_sgpa * 9.8) + random.gauss(0, 2.5), 1)))
        
        # Active backlogs: 0 for most, 1-3 for struggling
        if capability > 0.8:
            active_backlogs = 0
        elif capability > 0.65:
            active_backlogs = random.choices([0, 1], weights=[0.85, 0.15])[0]
        else:
            active_backlogs = random.choices([0, 1, 2, 3], weights=[0.45, 0.35, 0.15, 0.05])[0]
            
        # Study habits
        daily_study_hours = round(min(9.5, max(1.0, (capability * 4.2) + random.gauss(0, 0.9))), 1)
        daily_sleep_hours = round(min(9.5, max(4.5, random.gauss(7.0, 1.1))), 1)
        extracurricular_hrs = round(min(18.0, max(0.0, random.gauss(4.0, 2.5))), 1)
        
        # Target Final Marks calculation (Ground Truth composite with noise)
        current_comp = ((cia_score / 50.0) * 0.45 + (assignment_score / 25.0) * 0.25 + (lab_score / 25.0) * 0.30) * 100.0
        prev_comp = ((prev_sem_sgpa / 10.0) * 0.6 + (cumulative_aggregate / 100.0) * 0.4) * 100.0
        
        # Detention penalty if attendance < 75%
        att_factor = attendance_pct
        if attendance_pct < 75.0:
            att_factor -= (75.0 - attendance_pct) * 1.6
            
        # Habits bonus/penalty
        study_bonus = min(8.0, daily_study_hours * 1.5)
        sleep_penalty = 0.0
        if daily_sleep_hours < 6.0:
            sleep_penalty = 3.5
            
        final_marks = (current_comp * 0.35) + (prev_comp * 0.25) + (att_factor * 0.25) + (study_bonus * 1.5) - sleep_penalty
        final_marks -= (active_backlogs * 4.5)
        final_marks += random.gauss(0, 2.2) # Real-world examination variance
        
        target_final_marks = round(min(99.0, max(28.0, final_marks)), 1)
        
        rows.append([
            student_id,
            attendance_pct,
            cia_score,
            assignment_score,
            lab_score,
            prev_sem_sgpa,
            cumulative_aggregate,
            active_backlogs,
            daily_study_hours,
            daily_sleep_hours,
            extracurricular_hrs,
            target_final_marks
        ])

    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        writer.writerows(rows)

    print(f"Generated {num_samples} student records at {output_path}")

if __name__ == "__main__":
    generate_academic_dataset()
