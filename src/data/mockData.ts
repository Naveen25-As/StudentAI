import { StudentProfile, AcademicInput, PredictionResult, RecommendationItem, CohortStudentOverview } from '../types/academic';
import { generatePredictionReport } from '../utils/predictionEngine';

export const defaultStudentProfile: StudentProfile = {
  id: 'usr-alex-chen',
  name: 'Alex Chen',
  rollNumber: '1KL21CS042',
  degree: 'B.Tech Computer Science & Engineering',
  semester: 6,
  academicYear: '2024–2025',
  email: 'alex.chen@university.edu',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJpAKlL7dgNkOTy17C3yryfCi178Azhkn5ffQu23U5Li-YVpDC1zWIKKTB2ip4dcnoEablXMDnb8-lUPL85KutgM3Dj8JfnHXeqffvWJsEhhs8d-oy8c_IiCzN1ymaFFYW_2Cw5EpioKangVl9mr5OEH-zENcU_VvYkwQ8kVZqnXUARmKdOnjVtj-6nM2hT5ffHOYUJ4N3wJS0uJOql4uM_gU9DolSxcRIzmqf--9x12ey6Rh7zzI',
  targetSgpa: 8.75,
  counselorName: 'Prof. Sarah Jenkins',
  counselorEmail: 'sarah.jenkins@university.edu'
};

export const defaultAcademicInput: AcademicInput = {
  attendancePercentage: 85,
  ciaMarks: 42,
  assignmentMarks: 22,
  practicalMarks: 20,
  previousSemSgpa: 8.15,
  cumulativeAggregate: 79.5,
  activeBacklogs: 0,
  dailyStudyHours: 3.5,
  dailySleepHours: 7.0,
  extracurricularHours: 4.0
};

// Generate default baseline report #PR-2024-884
const baselineReport = generatePredictionReport(defaultAcademicInput, false);
baselineReport.reportCode = 'PR-2024-884';
baselineReport.dateCreated = 'Oct 24, 2024';
baselineReport.timestamp = '14:32 EST';

export const defaultPredictionHistory: PredictionResult[] = [
  baselineReport,
  {
    ...generatePredictionReport({
      attendancePercentage: 81,
      ciaMarks: 39,
      assignmentMarks: 21,
      practicalMarks: 19,
      previousSemSgpa: 7.95,
      cumulativeAggregate: 78.0,
      activeBacklogs: 0,
      dailyStudyHours: 3.0,
      dailySleepHours: 6.5,
      extracurricularHours: 4.5
    }, false),
    id: 'pr-sep-12-2024',
    reportCode: 'PR-2024-821',
    dateCreated: 'Sep 12, 2024',
    timestamp: '11:15 EST',
    predictedMarks: 79,
    predictedSgpa: 8.12,
    expectedGrade: 'B+',
    passProbability: 91.2,
    cohortTier: 'Solid Academic Standing',
    cohortRank: '~28 / 120',
    academicRisk: 'Low'
  },
  {
    ...generatePredictionReport({
      attendancePercentage: 76,
      ciaMarks: 35,
      assignmentMarks: 19,
      practicalMarks: 18,
      previousSemSgpa: 7.60,
      cumulativeAggregate: 75.5,
      activeBacklogs: 1,
      dailyStudyHours: 2.5,
      dailySleepHours: 6.0,
      extracurricularHours: 6.0
    }, false),
    id: 'pr-aug-04-2024',
    reportCode: 'PR-2024-740',
    dateCreated: 'Aug 04, 2024',
    timestamp: '09:40 EST',
    predictedMarks: 74,
    predictedSgpa: 7.62,
    expectedGrade: 'B',
    passProbability: 82.5,
    cohortTier: 'Moderate Track',
    cohortRank: '~52 / 120',
    academicRisk: 'Moderate'
  }
];

export const defaultAllRecommendations: RecommendationItem[] = [
  {
    id: 'rec-1',
    priority: 'high',
    priorityLabel: 'High Priority',
    title: 'Dedicate +45 mins/week on Mathematics IV Numerical Methods',
    subtitle: 'Module continuous assessment • Partial differential equations problem sets show highest error frequency.',
    targetTimeline: 'Target: Friday',
    estimatedBoost: '+3.5% Est. Boost',
    categoryTag: 'Continuous Assessment',
    moduleRelated: 'Mathematics IV',
    completed: false
  },
  {
    id: 'rec-2',
    priority: 'high',
    priorityLabel: 'High Priority',
    title: 'Attend Saturday extra practical lab session for SQL query tuning',
    subtitle: 'Coursework threshold maintenance • Elevates DBMS practical viva preparedness before external examiner evaluations.',
    targetTimeline: 'Lab 3B • Saturday 10:00 AM',
    estimatedBoost: '+2.5% Est. Boost',
    categoryTag: 'Lab Practical',
    moduleRelated: 'DBMS',
    completed: false
  },
  {
    id: 'rec-3',
    priority: 'medium',
    priorityLabel: 'Medium Priority',
    title: 'Complete DBMS Lab Practical 4 Submission',
    subtitle: 'Coursework threshold maintain >85% • Stored procedures and triggers benchmark verification.',
    targetTimeline: 'Due in 3 days',
    estimatedBoost: '+1.8% Est. Boost',
    categoryTag: 'Core Practical',
    moduleRelated: 'DBMS',
    completed: false
  },
  {
    id: 'rec-4',
    priority: 'medium',
    priorityLabel: 'Medium Priority',
    title: 'Download solved previous question papers for Engineering Mathematics IV',
    subtitle: 'Library Digital Portal • Focus specifically on Fourier transforms and PDE sets (2021–2024).',
    targetTimeline: 'Due next Tuesday',
    estimatedBoost: '+2.0% Est. Boost',
    categoryTag: 'Exam Prep',
    moduleRelated: 'Mathematics IV',
    completed: false
  },
  {
    id: 'rec-5',
    priority: 'routine',
    priorityLabel: 'Routine',
    title: 'Attempt 2 Computer Networks mock quizzes',
    subtitle: 'OSI Layer and TCP/IP protocol reinforcement • Timed online assessment simulator.',
    targetTimeline: 'Exam Prep',
    estimatedBoost: '+1.2% Est. Boost',
    categoryTag: 'Self-Check',
    moduleRelated: 'Computer Networks',
    completed: false
  },
  {
    id: 'rec-6',
    priority: 'routine',
    priorityLabel: 'Routine',
    title: 'Maintain current 3.5 hrs/day study schedule leading into final exams',
    subtitle: 'Pacing currently guarantees complete syllabus recap 12 days ahead of finals.',
    targetTimeline: 'Routine Habit Active',
    estimatedBoost: 'Consistency Safe',
    categoryTag: 'Study Cadence',
    moduleRelated: 'General',
    completed: true
  },
  {
    id: 'rec-7',
    priority: 'routine',
    priorityLabel: 'Routine',
    title: 'Review Python DSA Graph Traversal implementations',
    subtitle: 'BFS/DFS and Dijkstra shortest path complexity analysis for terminal lab viva.',
    targetTimeline: 'Weekly Review',
    estimatedBoost: '+1.5% Est. Boost',
    categoryTag: 'Code Lab',
    moduleRelated: 'Python',
    completed: true
  }
];

export const defaultCohortStudents: CohortStudentOverview[] = [
  { id: 'cs-1', rollNo: '1KL21CS042', name: 'Alex Chen', semester: 6, attendancePct: 85, ciaScore: 42, predictedMarks: 82, predictedSgpa: 8.42, expectedGrade: 'A', riskLevel: 'Low', activeBacklogs: 0, lastRunDate: 'Oct 24, 2024' },
  { id: 'cs-2', rollNo: '1KL21CS018', name: 'Ananya Sharma', semester: 6, attendancePct: 92, ciaScore: 46, predictedMarks: 91, predictedSgpa: 9.25, expectedGrade: 'O', riskLevel: 'Low', activeBacklogs: 0, lastRunDate: 'Oct 22, 2024' },
  { id: 'cs-3', rollNo: '1KL21CS075', name: 'Dev Patel', semester: 6, attendancePct: 78, ciaScore: 38, predictedMarks: 76, predictedSgpa: 7.85, expectedGrade: 'B+', riskLevel: 'Low', activeBacklogs: 0, lastRunDate: 'Oct 23, 2024' },
  { id: 'cs-4', rollNo: '1KL21CS102', name: 'Rohan Verma', semester: 6, attendancePct: 71, ciaScore: 28, predictedMarks: 62, predictedSgpa: 6.40, expectedGrade: 'B', riskLevel: 'High', activeBacklogs: 2, lastRunDate: 'Oct 19, 2024' },
  { id: 'cs-5', rollNo: '1KL21CS034', name: 'Priya Kulkarni', semester: 6, attendancePct: 88, ciaScore: 44, predictedMarks: 86, predictedSgpa: 8.80, expectedGrade: 'A+', riskLevel: 'Low', activeBacklogs: 0, lastRunDate: 'Oct 24, 2024' },
  { id: 'cs-6', rollNo: '1KL21CS089', name: 'Sameer Khan', semester: 6, attendancePct: 74, ciaScore: 32, predictedMarks: 69, predictedSgpa: 7.10, expectedGrade: 'B', riskLevel: 'Moderate', activeBacklogs: 1, lastRunDate: 'Oct 20, 2024' },
  { id: 'cs-7', rollNo: '1KL21CS007', name: 'Aarav Mehta', semester: 6, attendancePct: 96, ciaScore: 48, predictedMarks: 94, predictedSgpa: 9.60, expectedGrade: 'O', riskLevel: 'Low', activeBacklogs: 0, lastRunDate: 'Oct 24, 2024' },
  { id: 'cs-8', rollNo: '1KL21CS061', name: 'Sneha Deshmukh', semester: 6, attendancePct: 83, ciaScore: 40, predictedMarks: 80, predictedSgpa: 8.20, expectedGrade: 'A', riskLevel: 'Low', activeBacklogs: 0, lastRunDate: 'Oct 21, 2024' },
  { id: 'cs-9', rollNo: '1KL21CS115', name: 'Vikram Joshi', semester: 6, attendancePct: 68, ciaScore: 24, predictedMarks: 54, predictedSgpa: 5.60, expectedGrade: 'C', riskLevel: 'High', activeBacklogs: 3, lastRunDate: 'Oct 18, 2024' },
  { id: 'cs-10', rollNo: '1KL21CS053', name: 'Neha Reddy', semester: 6, attendancePct: 86, ciaScore: 41, predictedMarks: 83, predictedSgpa: 8.50, expectedGrade: 'A', riskLevel: 'Low', activeBacklogs: 0, lastRunDate: 'Oct 22, 2024' },
  { id: 'cs-11', rollNo: '1KL21CS094', name: 'Tarun Rao', semester: 6, attendancePct: 77, ciaScore: 36, predictedMarks: 73, predictedSgpa: 7.50, expectedGrade: 'B+', riskLevel: 'Moderate', activeBacklogs: 1, lastRunDate: 'Oct 23, 2024' },
  { id: 'cs-12', rollNo: '1KL21CS028', name: 'Kavita Nair', semester: 6, attendancePct: 89, ciaScore: 43, predictedMarks: 85, predictedSgpa: 8.70, expectedGrade: 'A+', riskLevel: 'Low', activeBacklogs: 0, lastRunDate: 'Oct 24, 2024' }
];

// LocalStorage helpers
const STORAGE_KEYS = {
  HISTORY: 'studentai_prediction_history',
  RECOMMENDATIONS: 'studentai_recommendations',
  CURRENT_INPUT: 'studentai_current_input',
  PROFILE: 'studentai_student_profile'
};

export function getStoredHistory(): PredictionResult[] {
  try {
    const item = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!item) return defaultPredictionHistory;
    return JSON.parse(item);
  } catch {
    return defaultPredictionHistory;
  }
}

export function savePredictionRun(report: PredictionResult): void {
  try {
    const current = getStoredHistory();
    const updated = [report, ...current];
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save prediction run to LocalStorage', err);
  }
}

export function getStoredRecommendations(): RecommendationItem[] {
  try {
    const item = localStorage.getItem(STORAGE_KEYS.RECOMMENDATIONS);
    if (!item) return defaultAllRecommendations;
    return JSON.parse(item);
  } catch {
    return defaultAllRecommendations;
  }
}

export function toggleStoredRecommendation(id: string): RecommendationItem[] {
  try {
    const current = getStoredRecommendations();
    const updated = current.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
    localStorage.setItem(STORAGE_KEYS.RECOMMENDATIONS, JSON.stringify(updated));
    return updated;
  } catch {
    return defaultAllRecommendations;
  }
}

export function resetApplicationState(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.RECOMMENDATIONS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_INPUT);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
  } catch (err) {
    console.error('Failed to reset LocalStorage', err);
  }
}
