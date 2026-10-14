import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getStoredHistory, getStoredRecommendations, toggleStoredRecommendation } from '../data/mockData';

export const OverviewDashboard: React.FC = () => {
  const { studentProfile } = useAuth();
  const navigate = useNavigate();

  const [history] = useState(getStoredHistory);
  const [recommendations, setRecommendations] = useState(() => getStoredRecommendations().slice(0, 3));
  const [historyFilter, setHistoryFilter] = useState<'all' | 'sem6' | 'sem5'>('sem6');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Latest run for summary metrics
  const latestRun = history[0] || null;

  const handleToggleRec = (id: string) => {
    toggleStoredRecommendation(id);
    setRecommendations(prev =>
      prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r)
    );
  };

  const handleDownloadReport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const filteredRuns = history.filter(run => {
    if (historyFilter === 'sem6') return run.dateCreated.includes('Oct') || run.dateCreated.includes('Sep');
    if (historyFilter === 'sem5') return run.dateCreated.includes('Aug') || run.dateCreated.includes('May');
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-12">
      <div className="px-4 sm:px-6 py-6 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        
        {/* Top Notice Banner */}
        <div className="flex flex-col gap-3">
          {/* Institutional Guidance Notice Banner */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 px-4 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 text-indigo-700">
                <span className="material-symbols-outlined text-[17px]">psychology</span>
              </div>
              <p className="text-xs text-slate-600">
                <strong className="font-semibold text-slate-800">Academic Guidance Notice:</strong>{' '}
                Predictions are ML regression estimates based on historical cohort data and ongoing coursework. Calibrated strictly for diagnostic study planning.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Bayesian Model v4.2
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            </div>
          </div>

          {/* Welcome Banner */}
          <div className="relative overflow-hidden bg-white border border-slate-200/90 rounded-xl p-6 lg:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="absolute -right-16 -top-16 w-60 h-60 bg-indigo-50/60 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col gap-1.5 max-w-2xl">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 font-bold tracking-wide uppercase">
                  Active Session: Semester 6
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[11px] text-slate-400">Updated today, 10:42 AM</span>
              </div>
              <h1 className="text-2xl lg:text-3xl text-slate-900 font-extrabold tracking-tight">
                Welcome back, {studentProfile.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-sm text-slate-500 leading-relaxed">
                Here is an overview of your academic performance and latest AI performance predictions for Semester 6.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap items-center gap-2.5 shrink-0">
              <Link
                to="/predict"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all text-xs font-semibold shadow-xs"
              >
                <span className="material-symbols-outlined text-[17px] text-indigo-300">bolt</span>
                <span>Run New Prediction</span>
              </Link>
              <button
                onClick={handleDownloadReport}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-all text-xs font-semibold shadow-2xs"
              >
                <span className="material-symbols-outlined text-[17px] text-slate-500">file_download</span>
                <span>{downloadSuccess ? 'Summary Report Downloaded ✓' : 'Download Summary Report'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5 Key Summary Metric Cards with Uniform Heights & AI Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Metric 1: Predicted Marks */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-col justify-between h-48 hover:shadow-sm transition-shadow relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Predicted Marks</span>
                <span className="inline-flex items-center gap-1 mt-0.5 text-[10px] font-semibold text-indigo-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span> ML Predicted
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">trending_up</span>
              </div>
            </div>
            <div className="my-auto flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
                {latestRun?.predictedMarks ?? 82}
              </span>
              <span className="text-sm font-semibold text-slate-400">/ 100</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
                <span className="material-symbols-outlined text-[12px]">north_east</span> +4.2% vs S5
              </span>
              <svg className="w-14 h-4" fill="none" viewBox="0 0 64 20">
                <path d="M2 17L14 13L26 15L38 9L50 11L62 3" stroke="#4338ca" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <circle cx="62" cy="3" fill="#4338ca" r="2.5"></circle>
              </svg>
            </div>
          </div>

          {/* Metric 2: Expected Grade */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-col justify-between h-48 hover:shadow-sm transition-shadow relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Expected Grade</span>
                <span className="inline-flex items-center gap-1 mt-0.5 text-[10px] font-semibold text-indigo-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span> ML Predicted
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">military_tech</span>
              </div>
            </div>
            <div className="my-auto flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {latestRun?.expectedGrade ?? 'A'}
              </span>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Range: {latestRun?.gradeRange ?? '80–89%'}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-500 font-medium">Solid Academic Standing</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">Consistent</span>
            </div>
          </div>

          {/* Metric 3: Pass Probability */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-col justify-between h-48 hover:shadow-sm transition-shadow relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Pass Probability</span>
                <span className="inline-flex items-center gap-1 mt-0.5 text-[10px] font-semibold text-indigo-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span> ML Confidence
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
              </div>
            </div>
            <div className="my-auto flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
                {latestRun?.passProbability ?? 94}%
              </span>
              <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                High Conf.
              </span>
            </div>
            <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${latestRun?.passProbability ?? 94}%` }}
                ></div>
              </div>
              <span className="text-[11px] text-slate-400">Minimal academic risk profile</span>
            </div>
          </div>

          {/* Metric 4: Attendance Rate */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-col justify-between h-48 hover:shadow-sm transition-shadow relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Attendance Rate</span>
                <span className="inline-flex items-center gap-1 mt-0.5 text-[10px] font-semibold text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span> Actual Record
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/70 text-slate-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">co_present</span>
              </div>
            </div>
            <div className="my-auto flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
                {latestRun?.inputParameters.attendancePercentage ?? 85}%
              </span>
              <span className="text-[11px] text-slate-500">Min. req: 75%</span>
            </div>
            <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${latestRun?.inputParameters.attendancePercentage ?? 85}%` }}
                ></div>
              </div>
              <span className="text-[11px] text-slate-400">28 / 33 scheduled lectures</span>
            </div>
          </div>

          {/* Metric 5: Academic Risk Assessment */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-col justify-between h-48 hover:shadow-sm transition-shadow relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Risk Assessment</span>
                <span className="inline-flex items-center gap-1 mt-0.5 text-[10px] font-semibold text-indigo-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span> AI Evaluated
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">shield</span>
              </div>
            </div>
            <div className="my-auto flex items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                Low Academic Risk
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-500 font-medium">0 active backlogs</span>
              <span className="material-symbols-outlined text-emerald-600 text-[16px]">check_circle</span>
            </div>
          </div>
        </div>

        {/* Performance Charts Grid (2 Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Semester Performance Trend (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900">Semester Performance Trajectory</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                      Historical vs ML
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 mt-0.5">
                    Aggregate examination marks across B.Tech academic progression
                  </span>
                </div>
                {/* Chart Legend */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-slate-300"></span>
                    <span className="text-slate-600 font-medium text-xs">Sem 1-5 Actual</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-indigo-600"></span>
                    <span className="text-indigo-900 font-bold text-xs">Sem 6 (AI Predicted)</span>
                  </div>
                </div>
              </div>

              {/* Multi-Point Hybrid Bar/Line Chart with Distinct Sem 6 */}
              <div className="w-full relative h-64 flex items-end justify-between pt-6 pb-4 px-3 sm:px-6 bg-slate-50/50 rounded-lg border border-slate-100">
                {/* Background Grid lines */}
                <div className="absolute inset-x-3 top-6 bottom-8 flex flex-col justify-between pointer-events-none opacity-60">
                  <div className="w-full border-b border-dashed border-slate-200 text-slate-400 text-[10px] pb-0.5">100%</div>
                  <div className="w-full border-b border-dashed border-slate-200 text-slate-400 text-[10px] pb-0.5">80%</div>
                  <div className="w-full border-b border-dashed border-slate-200 text-slate-400 text-[10px] pb-0.5">60%</div>
                  <div className="w-full border-b border-dashed border-slate-200 text-slate-400 text-[10px] pb-0.5">40%</div>
                </div>

                {/* Sem 1 */}
                <div className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer w-10 sm:w-12">
                  <span className="text-xs text-slate-500 font-medium group-hover:text-slate-900 transition-colors font-mono">72%</span>
                  <div className="w-8 sm:w-9 bg-slate-300 hover:bg-slate-400 rounded-t-md transition-all h-36"></div>
                  <span className="text-[11px] text-slate-600 font-medium">Sem 1</span>
                </div>
                {/* Sem 2 */}
                <div className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer w-10 sm:w-12">
                  <span className="text-xs text-slate-500 font-medium group-hover:text-slate-900 transition-colors font-mono">74%</span>
                  <div className="w-8 sm:w-9 bg-slate-300 hover:bg-slate-400 rounded-t-md transition-all h-[150px]"></div>
                  <span className="text-[11px] text-slate-600 font-medium">Sem 2</span>
                </div>
                {/* Sem 3 */}
                <div className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer w-10 sm:w-12">
                  <span className="text-xs text-slate-500 font-medium group-hover:text-slate-900 transition-colors font-mono">78%</span>
                  <div className="w-8 sm:w-9 bg-slate-300 hover:bg-slate-400 rounded-t-md transition-all h-[158px]"></div>
                  <span className="text-[11px] text-slate-600 font-medium">Sem 3</span>
                </div>
                {/* Sem 4 */}
                <div className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer w-10 sm:w-12">
                  <span className="text-xs text-slate-500 font-medium group-hover:text-slate-900 transition-colors font-mono">76%</span>
                  <div className="w-8 sm:w-9 bg-slate-300 hover:bg-slate-400 rounded-t-md transition-all h-[154px]"></div>
                  <span className="text-[11px] text-slate-600 font-medium">Sem 4</span>
                </div>
                {/* Sem 5 */}
                <div className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer w-10 sm:w-12">
                  <span className="text-xs text-slate-500 font-medium group-hover:text-slate-900 transition-colors font-mono">80%</span>
                  <div className="w-8 sm:w-9 bg-slate-400 hover:bg-slate-500 rounded-t-md transition-all h-[164px]"></div>
                  <span className="text-[11px] text-slate-700 font-semibold">Sem 5</span>
                </div>
                {/* Sem 6 (Predicted Highlight - Distinct Indigo & Badge) */}
                <div className="relative z-10 flex flex-col items-center gap-2 cursor-pointer w-10 sm:w-12">
                  <div className="flex items-center gap-0.5 text-xs text-indigo-700 font-bold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                    <span className="font-mono">{latestRun?.predictedMarks ?? 82}%</span>
                    <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                  </div>
                  <div className="w-8 sm:w-9 bg-indigo-600 hover:bg-indigo-700 rounded-t-md h-[172px] relative shadow-md ring-2 ring-indigo-200">
                    <div className="absolute -top-1 left-0 right-0 h-1 bg-indigo-300 rounded-t"></div>
                  </div>
                  <span className="text-[11px] text-indigo-700 font-extrabold flex items-center gap-0.5">Sem 6</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">trending_up</span>
                Consistent upward trend detected across 5 terms (+10% gain overall).
              </span>
              <Link
                to="/analytics"
                className="text-xs text-indigo-600 font-semibold hover:text-indigo-800 hover:underline flex items-center gap-0.5"
              >
                <span>Full Analytics</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Card 2: Subject Performance Analysis (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <h3 className="text-base font-bold text-slate-900">Subject Performance Analysis</h3>
                <span className="text-xs text-slate-400">Current syllabus benchmark &amp; competencies</span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                5 Modules
              </span>
            </div>

            {/* Subject List with Progress Meters */}
            <div className="flex flex-col gap-4 my-auto">
              {/* Subject 1: Python */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-indigo-600 text-[16px]">code</span>
                    Python Programming
                    <span className="text-[10px] text-slate-400 font-normal">(4 Credits)</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900 font-bold font-mono">88/100</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-semibold">
                      High Distinction
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>

              {/* Subject 2: DBMS */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-indigo-600 text-[16px]">database</span>
                    Database Management
                    <span className="text-[10px] text-slate-400 font-normal">(4 Credits)</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900 font-bold font-mono">84/100</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 font-semibold">
                      Strong
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>

              {/* Subject 3: Web Dev */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-indigo-600 text-[16px]">language</span>
                    Web Development
                    <span className="text-[10px] text-slate-400 font-normal">(3 Credits)</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900 font-bold font-mono">86/100</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 font-semibold">
                      Strong
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>

              {/* Subject 4: Computer Networks */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-slate-500 text-[16px]">lan</span>
                    Computer Networks
                    <span className="text-[10px] text-slate-400 font-normal">(3 Credits)</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900 font-bold font-mono">78/100</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                      Solid
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-slate-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              {/* Subject 5: Mathematics IV */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-rose-600 text-[16px]">calculate</span>
                    Mathematics IV
                    <span className="text-[10px] text-slate-400 font-normal">(4 Credits)</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900 font-bold font-mono">76/100</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                      Needs Review
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-rose-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Target: Numerical Methods &amp; Calculus</span>
              <span className="font-medium text-slate-700">Highest: Python (88%)</span>
            </div>
          </div>
        </div>

        {/* Lower Section: Improvement Plan & Recent Prediction Runs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Academic Improvement Plan (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">Improvement Plan</h3>
                    <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                  </div>
                  <span className="text-xs text-slate-400">Actionable guidance generated by Bayesian engine</span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
                  <span className="material-symbols-outlined text-[17px]">lightbulb</span>
                </div>
              </div>

              {/* Recommendation Items */}
              <div className="flex flex-col gap-3">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className={`p-3.5 rounded-xl border transition-colors flex items-start gap-3 ${
                      rec.completed ? 'bg-slate-50/50 border-slate-200/50 opacity-75' : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200/70'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={rec.completed}
                      onChange={() => handleToggleRec(rec.id)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wide ${
                            rec.priority === 'high'
                              ? 'text-rose-700 bg-rose-50 border border-rose-200'
                              : rec.priority === 'medium'
                              ? 'text-amber-700 bg-amber-50 border border-amber-200'
                              : 'text-slate-600 bg-slate-100 border border-slate-200'
                          }`}
                        >
                          {rec.priorityLabel}
                        </span>
                        <span className="text-[10px] text-slate-400">{rec.targetTimeline}</span>
                      </div>
                      <p className={`text-xs font-semibold leading-snug ${rec.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {rec.title}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                        <span>{rec.subtitle.split('•')[0]}</span>
                        <span className="font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                          {rec.estimatedBoost}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-2">
              <Link
                to="/recommendations"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold transition-colors"
              >
                <span>View All 7 Recommendations</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Recent Prediction Runs Table (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">Recent Prediction Runs</h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-mono">
                      {history.length} Runs Logged
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">Audit trail of automated and ad-hoc ML calculations</span>
                </div>
                {/* Filter Pill Buttons */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/60">
                  <button
                    onClick={() => setHistoryFilter('sem6')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                      historyFilter === 'sem6'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Sem 6
                  </button>
                  <button
                    onClick={() => setHistoryFilter('sem5')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                      historyFilter === 'sem5'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Sem 5
                  </button>
                  <button
                    onClick={() => setHistoryFilter('all')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                      historyFilter === 'all'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    All
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-slate-200/80 rounded-lg">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider border-b border-slate-200/80">
                      <th className="py-2.5 px-3.5 font-semibold">Date &amp; Type</th>
                      <th className="py-2.5 px-3.5 font-semibold">Input Parameters</th>
                      <th className="py-2.5 px-3.5 text-right font-semibold">Marks</th>
                      <th className="py-2.5 px-3.5 text-center font-semibold">Grade</th>
                      <th className="py-2.5 px-3.5 font-semibold">Risk Level</th>
                      <th className="py-2.5 px-3.5 text-right font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {filteredRuns.map((run) => (
                      <tr key={run.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3.5 font-semibold text-slate-900">
                          <div className="flex flex-col">
                            <span>{run.dateCreated}</span>
                            <span className="text-slate-400 font-normal text-[10px]">{run.reportCode}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3.5">
                          <span className="font-medium text-slate-700">
                            {run.inputParameters.attendancePercentage}% Attn, {run.inputParameters.ciaMarks} CIA
                          </span>
                        </td>
                        <td className="py-3 px-3.5 text-right font-bold text-slate-900 font-mono text-sm tabular-nums">
                          {run.predictedMarks}/100
                        </td>
                        <td className="py-3 px-3.5 text-center">
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-800 border border-slate-200">
                            {run.expectedGrade}
                          </span>
                        </td>
                        <td className="py-3 px-3.5">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-semibold border ${
                              run.academicRisk === 'Low'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                : run.academicRisk === 'Moderate'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                run.academicRisk === 'Low'
                                  ? 'bg-emerald-500'
                                  : run.academicRisk === 'Moderate'
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                              }`}
                            ></span>{' '}
                            {run.academicRisk}
                          </span>
                        </td>
                        <td className="py-3 px-3.5 text-right">
                          <button
                            onClick={() => navigate(`/report/${run.id}`)}
                            type="button"
                            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
                          >
                            View Report
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Algorithm: Random Forest Regression v4.2</span>
              <Link
                to="/history"
                className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
              >
                <span>View Full Archive</span>
                <span className="material-symbols-outlined text-[15px]">arrow_right_alt</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
