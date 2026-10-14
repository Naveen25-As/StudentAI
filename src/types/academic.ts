/**
 * Academic Data Models and Types for StudentAI
 */

export type AcademicRiskLevel = 'Low' | 'Moderate' | 'High';
export type GradeLetter = 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'P' | 'F';

export interface StudentProfile {
  id: string;
  name: string;
  rollNumber: string;
  degree: string;
  semester: number;
  academicYear: string;
  email: string;
  avatarUrl: string;
  targetSgpa: number;
  counselorName: string;
  counselorEmail: string;
}

export interface AcademicInput {
  attendancePercentage: number;
  ciaMarks: number; // max 50
  assignmentMarks: number; // max 25
  practicalMarks: number; // max 25
  previousSemSgpa: number; // scale 10.0
  cumulativeAggregate: number; // percentage
  activeBacklogs: number;
  dailyStudyHours: number;
  dailySleepHours: number;
  extracurricularHours: number;
}

export interface SubjectProjection {
  code: string;
  name: string;
  shortCode: string;
  credits: number;
  instructor: string;
  format: 'Theory + Lab' | 'Theory' | 'Practical' | 'Core Theory';
  score: number;
  grade: GradeLetter;
  badge: string;
  isFocusArea?: boolean;
}

export interface FeatureAttribution {
  feature: string;
  label: string;
  inputDisplay: string;
  liftPct: number; // positive or negative lift vs cohort baseline
  isPositive: boolean;
  cohortBaselineDisplay: string;
  cohortBaselinePct: number;
  userPercentile: number;
  impactDescription: string;
  badgeLabel?: string;
  barWidthPct: number;
}

export interface RecommendationItem {
  id: string;
  priority: 'high' | 'medium' | 'routine';
  priorityLabel: 'High Priority' | 'Medium Priority' | 'Routine';
  title: string;
  subtitle: string;
  targetTimeline: string;
  estimatedBoost: string;
  categoryTag: string;
  moduleRelated: string;
  completed: boolean;
}

export interface PredictionResult {
  id: string;
  reportCode: string;
  dateCreated: string;
  timestamp: string;
  semesterNumber: number;
  academicSession: string;
  
  // Primary Metrics
  predictedMarks: number; // 0-100
  predictedSgpa: number; // 0-10.0
  expectedGrade: GradeLetter;
  gradeRange: string;
  standingDescription: string;
  passProbability: number; // 0-100%
  ciBounds: string;
  cohortTier: string;
  cohortRank: string;
  academicRisk: AcademicRiskLevel;
  backlogsLogged: number;
  
  // Model Diagnostics
  modelArchitecture: string;
  confidenceR2: number;
  algorithmName: string;
  isBackendPrediction: boolean;
  
  // Breakdowns
  inputParameters: AcademicInput;
  subjectBreakdown: SubjectProjection[];
  featureAttributions: FeatureAttribution[];
  strengths: { title: string; detail: string }[];
  areasForImprovement: { title: string; detail: string }[];
  actionChecklist: RecommendationItem[];
  
  // Counselor
  facultyAdvisor: {
    name: string;
    title: string;
    status: string;
    nextSync: string;
    avatarUrl: string;
  };
}

export interface CohortStudentOverview {
  id: string;
  rollNo: string;
  name: string;
  semester: number;
  attendancePct: number;
  ciaScore: number;
  predictedMarks: number;
  predictedSgpa: number;
  expectedGrade: GradeLetter;
  riskLevel: AcademicRiskLevel;
  activeBacklogs: number;
  lastRunDate: string;
}
