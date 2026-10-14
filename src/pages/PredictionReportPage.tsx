import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStoredHistory, getStoredRecommendations, toggleStoredRecommendation } from '../data/mockData';

export const PredictionReportPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = getStoredHistory();

  // Find matching report or default to latest
  const report = history.find(r => r.id === id) || history[0];

  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shared, setShared] = useState(false);
  const [checklist, setChecklist] = useState(() => report?.actionChecklist || getStoredRecommendations().slice(0, 3));
  const [advisorChatOpen, setAdvisorChatOpen] = useState(false);
  const [advisorMessages, setAdvisorMessages] = useState([
    { sender: 'advisor', text: "Hello Alex, I reviewed your Semester 6 prediction report. Great job on Python and DBMS! Let's ensure we strengthen Numerical Methods before the midterms." }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleToggleChecklist = (recId: string) => {
    toggleStoredRecommendation(recId);
    setChecklist(prev =>
      prev.map(item => item.id === recId ? { ...item, completed: !item.completed } : item)
    );
  };

  const handleExportPdf = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExported(true);
      setTimeout(() => setExported(false), 2500);
    }, 1000);
  };

  const handleShareAdvisor = () => {
    setSharing(true);
    setTimeout(() => {
      setSharing(false);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }, 800);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setAdvisorMessages(prev => [...prev, { sender: 'student', text: chatInput }]);
    const currentText = chatInput;
    setChatInput('');
    setTimeout(() => {
      setAdvisorMessages(prev => [
        ...prev,
        {
          sender: 'advisor',
          text: `Acknowledged: "${currentText}". I've pinned the supplementary practice problem sets for you.`
        }
      ]);
    }, 1000);
  };

  if (!report) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-slate-500">Report not found.</p>
        <Link to="/predict" className="mt-4 inline-block text-xs text-indigo-600 font-bold underline">
          Run a new prediction
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="px-4 md:px-6 py-6 flex flex-col gap-6 max-w-[1540px] mx-auto w-full">
        
        {/* Breadcrumb & Top Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider">
              <Link to="/predict" className="hover:text-indigo-600 transition-colors font-semibold">
                Predict Result
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-indigo-600 font-bold">Report #{report.reportCode}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold tracking-tight inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
                Verified Run
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl text-slate-900 tracking-tight font-extrabold">
              Your Performance Prediction Report
            </h1>

            <p className="text-xs text-slate-500 flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                <span className="material-symbols-outlined text-[16px] text-slate-400">schedule</span>
                <span>Generated {report.dateCreated} • {report.timestamp}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold border border-slate-200 text-xs">
                <span className="material-symbols-outlined text-[15px] text-indigo-600">memory</span>
                <span>{report.modelArchitecture}</span>
              </span>
              <span className="text-indigo-700 font-bold text-xs bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 font-mono">
                Confidence R² = {report.confidenceR2}
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            <button
              onClick={handleExportPdf}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-all shadow-2xs"
            >
              {exporting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin text-indigo-600">progress_activity</span>
                  <span>Compiling PDF...</span>
                </>
              ) : exported ? (
                <>
                  <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                  <span className="text-emerald-700">PDF Downloaded</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px] text-indigo-600">picture_as_pdf</span>
                  <span>Export PDF Report</span>
                </>
              )}
            </button>

            <button
              onClick={handleShareAdvisor}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-all shadow-2xs"
            >
              {sharing ? (
                <span className="material-symbols-outlined text-[18px] animate-spin text-slate-600">progress_activity</span>
              ) : shared ? (
                <>
                  <span className="material-symbols-outlined text-[18px] text-emerald-600">check</span>
                  <span className="text-emerald-700 font-semibold">Advisor Synced!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px] text-slate-500">share</span>
                  <span>Share with Advisor</span>
                </>
              )}
            </button>

            <Link
              to="/predict"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all text-xs font-semibold shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              <span>Run Another Prediction</span>
            </Link>
          </div>
        </div>

        {/* Primary Hero Metric Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-[#172037] to-slate-950 text-white border border-slate-800 shadow-md">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"></div>
          <div className="absolute left-1/4 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none"></div>

          <div className="relative p-6 lg:p-8 flex flex-col xl:flex-row items-center justify-between gap-8 z-10">
            {/* Score Circular Gauge & Main Title */}
            <div className="flex flex-col sm:flex-row items-center gap-8 w-full xl:w-auto">
              <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-indigo-500/25 blur-xl pointer-events-none"></div>
                <svg className="w-full h-full -rotate-90 transform drop-shadow-md" viewBox="0 0 120 120">
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4338ca" />
                      <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                  </defs>
                  <circle
                    className="text-slate-800"
                    cx="60"
                    cy="60"
                    r="50"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="9"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="transparent"
                    stroke="url(#scoreGrad)"
                    strokeWidth="10"
                    strokeDasharray="314.159"
                    strokeDashoffset={314.159 - (314.159 * (report.predictedMarks / 100))}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-extrabold text-white leading-none tracking-tight font-mono tabular-nums">
                    {report.predictedMarks}
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      / 100 PTS
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col text-center sm:text-left gap-1.5">
                <div className="inline-flex items-center gap-2 justify-center sm:justify-start">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[11px] uppercase tracking-wider font-bold">
                    Illustrative AI Estimate
                  </span>
                  <span className="text-xs text-slate-400">• Calibrated</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
                  First Class with Distinction Band
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  Model synthesis predicts high-confidence academic mastery across core engineering modules with negligible terminal exam risk profile.
                </p>
              </div>
            </div>

            {/* 4 Metric Mini-Cards */}
            <div className="flex flex-col gap-3 w-full xl:w-auto xl:items-end">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                {/* Expected Grade */}
                <div className="bg-white/10 backdrop-blur-md px-4 py-3.5 rounded-xl border border-white/10 shadow-xs flex flex-col justify-between h-28 min-w-[140px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold">
                      Expected Grade
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-indigo-300">school</span>
                  </div>
                  <span className="text-2xl font-black text-white leading-none my-1">
                    Grade {report.expectedGrade}
                  </span>
                  <span className="text-[11px] text-indigo-200 font-bold">
                    GPA ~ {report.predictedSgpa}
                  </span>
                </div>

                {/* Pass Probability */}
                <div className="bg-white/10 backdrop-blur-md px-4 py-3.5 rounded-xl border border-white/10 shadow-xs flex flex-col justify-between h-28 min-w-[140px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold">
                      Pass Probability
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-emerald-400">trending_up</span>
                  </div>
                  <span className="text-2xl font-black text-emerald-400 leading-none my-1 font-mono tabular-nums">
                    {report.passProbability}%
                  </span>
                  <span className="text-[11px] text-slate-300 font-semibold">{report.ciBounds}</span>
                </div>

                {/* Performance Tier */}
                <div className="bg-white/10 backdrop-blur-md px-4 py-3.5 rounded-xl border border-white/10 shadow-xs flex flex-col justify-between h-28 min-w-[140px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold">
                      Cohort Tier
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-amber-300">workspace_premium</span>
                  </div>
                  <span className="text-2xl font-black text-white leading-none my-1">
                    {report.cohortTier.split(' ')[0]}
                  </span>
                  <span className="text-[11px] text-slate-300 font-semibold">{report.cohortRank}</span>
                </div>

                {/* Academic Risk */}
                <div className="bg-white/10 backdrop-blur-md px-4 py-3.5 rounded-xl border border-white/10 shadow-xs flex flex-col justify-between h-28 min-w-[140px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold">
                      Academic Risk
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-emerald-400">shield</span>
                  </div>
                  <div className="flex items-center gap-1.5 my-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                    <span className="text-2xl font-black text-emerald-400 leading-none">
                      {report.academicRisk}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-300 font-semibold">
                    {report.backlogsLogged} Backlog History
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-black/40 border border-white/10 px-3.5 py-1.5 rounded-full shadow-xs text-left">
                <span className="material-symbols-outlined text-[16px] text-indigo-300 shrink-0">info</span>
                <span className="text-[11px] text-slate-300">
                  Estimated probability based on historical curriculum models. Illustrative statistical guidance.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Diagnostic Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (7 cols): Input Audit + Subject Projection */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Model Feature Importance & Input Audit (SHAP Attribution) */}
            <div className="bg-white rounded-xl p-6 shadow-xs border border-slate-200 flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <span className="material-symbols-outlined text-[20px]">tune</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Model Feature Importance &amp; Input Audit</h3>
                    <p className="text-xs text-slate-500">SHAP attribution analysis revealing individual feature lift vs. cohort baseline</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="text-[11px] uppercase tracking-wider px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md font-bold text-slate-600">
                    Cohort Normalized
                  </span>
                </div>
              </div>

              {/* Attribution Guide Legend */}
              <div className="flex items-center justify-between text-xs px-2 py-1.5 rounded bg-slate-50 font-medium text-slate-600">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-indigo-600"></span>Positive Score Lift
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>Improvement Opportunity
                  </span>
                </div>
                <span className="text-[10px] uppercase text-slate-400">Cohort Mean Baseline: 0.0%</span>
              </div>

              {/* Feature Lift Items */}
              <div className="flex flex-col gap-3.5 pt-1">
                {report.featureAttributions.map((attr, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 rounded-xl p-3.5 flex flex-col gap-2.5 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-800">{attr.label}</span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 font-mono">
                          Input: {attr.inputDisplay}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {attr.badgeLabel && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              attr.isPositive
                                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            {attr.badgeLabel}
                          </span>
                        )}
                        <span
                          className={`font-bold font-mono ${
                            attr.isPositive ? 'text-indigo-600' : 'text-amber-600'
                          }`}
                        >
                          {attr.liftPct > 0 ? `+${attr.liftPct}% lift` : `${attr.liftPct}% delta`}
                        </span>
                      </div>
                    </div>

                    <div className="relative py-1">
                      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden flex">
                        <div
                          className={`h-full rounded-full transition-all ${
                            attr.isPositive ? 'bg-gradient-to-r from-indigo-600 to-indigo-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${attr.barWidthPct}%` }}
                        ></div>
                      </div>
                      {/* Cohort tick */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-slate-900/60"
                        style={{ left: `${attr.cohortBaselinePct}%` }}
                        title={attr.cohortBaselineDisplay}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center text-slate-500 text-[11px]">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                        {attr.cohortBaselineDisplay}
                      </span>
                      <span className={attr.isPositive ? 'text-indigo-700 font-semibold' : 'text-amber-700 font-semibold'}>
                        {attr.impactDescription}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject-Level Projection Breakdown */}
            <div className="bg-white rounded-xl p-6 shadow-xs border border-slate-200 flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 border border-slate-200">
                    <span className="material-symbols-outlined text-[20px]">bar_chart</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Subject-Level Projection Breakdown</h3>
                    <p className="text-xs text-slate-500">Model forecast per semester course credit weighting</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-600 font-semibold px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200">
                    Semester VI Core • 24 Credits
                  </span>
                </div>
              </div>

              {/* Subject Cards */}
              <div className="flex flex-col gap-2.5">
                {report.subjectBreakdown.map((subj, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 transition-all gap-3"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm shrink-0 border ${
                          subj.isFocusArea
                            ? 'bg-amber-50 border-amber-200 text-amber-700'
                            : 'bg-indigo-50 border-indigo-100 text-indigo-600'
                        }`}
                      >
                        {subj.shortCode}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-bold font-mono">
                            {subj.code}
                          </span>
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {subj.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500">
                          {subj.credits} Credits • Lead Instructor: {subj.instructor} • {subj.format}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                            {subj.score}%
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${
                              subj.isFocusArea
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            }`}
                          >
                            Grade {subj.grade}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-bold ${
                            subj.isFocusArea ? 'text-amber-700' : 'text-indigo-600'
                          }`}
                        >
                          {subj.badge}
                        </span>
                      </div>
                      <div className="w-24 hidden md:block">
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              subj.isFocusArea ? 'bg-amber-500' : 'bg-indigo-600'
                            }`}
                            style={{ width: `${subj.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Diagnostic Insights + Action Prescription */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Strengths Identified */}
            <div className="bg-white rounded-xl p-6 shadow-xs border-l-4 border-l-emerald-500 border-y border-r border-slate-200 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Strengths Identified</h3>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                      Top 20% Performance Markers
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                  {report.strengths.length} Catalysts
                </span>
              </div>

              <div className="flex flex-col gap-2.5 pt-1">
                {report.strengths.map((str, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/40 border border-emerald-100">
                    <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0 mt-0.5">check_circle</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-900">{str.title}</span>
                      <p className="text-[12px] text-slate-600 leading-snug mt-0.5">{str.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-white rounded-xl p-6 shadow-xs border-l-4 border-l-amber-500 border-y border-r border-slate-200 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                    <span className="material-symbols-outlined text-[20px]">warning</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Areas for Improvement</h3>
                    <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">
                      Targeted Elevation Levers
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                  {report.areasForImprovement.length} Focus Points
                </span>
              </div>

              <div className="flex flex-col gap-2.5 pt-1">
                {report.areasForImprovement.map((area, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-amber-50/40 border border-amber-100">
                    <span className="material-symbols-outlined text-amber-600 text-[20px] shrink-0 mt-0.5">error_outline</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-900">{area.title}</span>
                      <p className="text-[12px] text-slate-600 leading-snug mt-0.5">{area.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Action Checklist */}
            <div className="bg-white rounded-xl p-6 shadow-xs border border-slate-200 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
                    <span className="material-symbols-outlined text-[19px]">checklist</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Recommended Action Checklist</h3>
                    <p className="text-[11px] text-slate-400">Step-by-step guidance tailored to report gaps</p>
                  </div>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold">
                  {checklist.filter(c => !c.completed).length} Pending
                </span>
              </div>

              <div className="flex flex-col gap-3 pt-1">
                {checklist.map((item) => (
                  <label
                    key={item.id}
                    className={`group flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                      item.completed ? 'bg-slate-50 border-slate-200 opacity-70' : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleToggleChecklist(item.id)}
                      className="mt-1 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
                    />
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-md font-bold border ${
                            item.priority === 'high'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : item.priority === 'medium'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {item.priorityLabel}
                        </span>
                        <span className="text-[11px] text-slate-400 font-semibold">{item.targetTimeline}</span>
                      </div>
                      <span className={`text-xs font-semibold leading-snug ${item.completed ? 'line-through text-slate-400' : 'text-slate-900 group-hover:text-indigo-600 transition-colors'}`}>
                        {item.title}
                      </span>
                      <span className="text-[12px] text-slate-500 leading-snug">
                        {item.subtitle}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
                <Link
                  to="/recommendations"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all text-xs font-semibold shadow-xs text-center"
                >
                  <span className="material-symbols-outlined text-[18px]">psychology_alt</span>
                  <span>Recommendations Hub</span>
                </Link>
                <Link
                  to="/history"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all text-xs font-semibold text-center border border-slate-200"
                >
                  <span className="material-symbols-outlined text-[18px]">history</span>
                  <span>Historical Trends</span>
                </Link>
              </div>
            </div>

            {/* Polished Faculty Mentor Card */}
            <div className="rounded-xl p-4 bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="relative shrink-0">
                  <img
                    alt={report.facultyAdvisor.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100 shadow-xs"
                    src={report.facultyAdvisor.avatarUrl}
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white" title="Active Synced"></span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider">
                      Faculty Mentor Synced
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-400"></span>
                    <span className="text-[11px] text-emerald-600 font-semibold">{report.facultyAdvisor.status}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 truncate">{report.facultyAdvisor.name}</span>
                  <span className="text-[11px] text-slate-500 truncate">
                    Auto-notified • Next 1-on-1 scheduled {report.facultyAdvisor.nextSync}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setAdvisorChatOpen(true)}
                className="shrink-0 p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors"
                title="Message Advisor"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Advisor Chat Drawer/Modal */}
      {advisorChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full flex flex-col h-[520px] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <img
                  alt={report.facultyAdvisor.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-200"
                  src={report.facultyAdvisor.avatarUrl}
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">{report.facultyAdvisor.name}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Online • CS Faculty Counselor</span>
                </div>
              </div>
              <button
                onClick={() => setAdvisorChatOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Message Thread */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-50/50">
              {advisorMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.sender === 'student'
                        ? 'bg-indigo-600 text-white rounded-tr-xs'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-2xs'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask Prof. Thorne about your prediction..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors shadow-2xs"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
