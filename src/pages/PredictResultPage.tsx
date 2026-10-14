import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AcademicInput } from '../types/academic';
import { defaultAcademicInput } from '../data/mockData';
import { calculateAcademicMetrics } from '../utils/predictionEngine';
import { submitAcademicPrediction } from '../services/api';

export const PredictResultPage: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<AcademicInput>(defaultAcademicInput);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);
  const [advisorScheduled, setAdvisorScheduled] = useState(false);

  // Live dynamic projection benchmark
  const liveMetrics = useMemo(() => {
    return calculateAcademicMetrics(form);
  }, [form]);

  const handleInputChange = (field: keyof AcademicInput, value: number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleResetDefaults = () => {
    setForm(defaultAcademicInput);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const report = await submitAcademicPrediction(form);
      setTimeout(() => {
        setIsSubmitting(false);
        navigate(`/report/${report.id}`);
      }, 700);
    } catch {
      setIsSubmitting(false);
    }
  };

  // Attendance status badge
  const getAttendanceBadge = (pct: number) => {
    if (pct >= 85) {
      return (
        <span className="text-[11px] px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 font-bold border border-emerald-500/20 inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Good Standing</span>
        </span>
      );
    } else if (pct >= 75) {
      return (
        <span className="text-[11px] px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 font-bold border border-amber-500/20 inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          <span>Eligible (Warning)</span>
        </span>
      );
    } else {
      return (
        <span className="text-[11px] px-3 py-1 rounded-full bg-rose-500/10 text-rose-700 font-bold border border-rose-500/20 inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          <span>Detention Risk</span>
        </span>
      );
    }
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Breadcrumb & Hero Header */}
      <div className="relative overflow-hidden bg-slate-100/70 px-4 sm:px-6 py-8 border-b border-slate-200/80">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col gap-4 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/dashboard" className="hover:text-slate-900 transition-colors font-medium">
              Overview
            </Link>
            <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
            <span className="text-slate-900 font-semibold">Predict Result</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1.5 max-w-3xl">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-indigo-600 text-white shadow-xs">
                  <span className="material-symbols-outlined text-[15px]">neurology</span>
                </span>
                <span className="text-[11px] uppercase tracking-widest text-indigo-700 font-bold">
                  Computational Assessment Matrix
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl text-slate-900 tracking-tight font-extrabold">
                Predict Your Academic Performance
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Provide your current coursework, assessment marks, and study habits to receive an instant machine-learning estimated performance report with actionable diagnostic insights.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <div className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 flex items-center gap-2.5 shadow-xs">
                <span className="material-symbols-outlined text-indigo-600 text-[20px]">sync</span>
                <div className="flex flex-col leading-none">
                  <span className="uppercase font-bold text-slate-400 text-[10px]">Telemetry</span>
                  <span className="text-xs text-slate-900 font-semibold">Live Synced</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-1 rounded-xl bg-white p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <span className="material-symbols-outlined text-[22px]">model_training</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-xs font-bold text-slate-900">Model Architecture:</span>
                <span className="text-xs text-slate-600">
                  Random Forest &amp; Gradient Boosting Regressor (v2.4) • Calibrated for B.Tech CS curriculum.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold tracking-wide uppercase border border-indigo-100">
                Indicative Planning
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Form Left, Sticky Explanatory Right */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Form Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Section 01: Current Academic Performance */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
                <div className="flex items-center gap-3.5">
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 text-slate-900 font-extrabold text-sm border border-slate-200 shadow-xs">
                    01
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg text-slate-900 font-bold">
                      Section A — Current Academic Performance
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Active semester continuous evaluations and physical cohort attendance
                    </p>
                  </div>
                </div>
                <span className="self-start sm:self-auto text-xs text-indigo-700 font-bold uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                  Weight: 60%
                </span>
              </div>

              {/* Attendance block */}
              <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4 sm:p-5 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[19px] text-indigo-600">co_present</span>
                      <span>Attendance Percentage</span>
                    </label>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Mandatory university statutory minimum requirement is 75%.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getAttendanceBadge(form.attendancePercentage)}
                    <div className="relative w-28">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={form.attendancePercentage}
                        onChange={(e) => handleInputChange('attendancePercentage', Number(e.target.value))}
                        className="w-full h-11 px-3 pr-8 rounded-xl bg-white text-slate-900 font-bold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-right shadow-xs font-mono"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold pointer-events-none">
                        %
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={form.attendancePercentage}
                    onChange={(e) => handleInputChange('attendancePercentage', Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                  />
                  <div className="grid grid-cols-3 text-[11px] px-1 text-center font-medium">
                    <div className="text-left text-rose-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>Detained (&lt;75%)
                    </div>
                    <div className="text-center">
                      <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        75% Mandatory Bar
                      </span>
                    </div>
                    <div className="text-right text-emerald-600 font-semibold flex items-center justify-end gap-1">
                      Exemplary (&gt;90%)<span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Internal Marks, Assignments, Practical */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col justify-between gap-2.5 rounded-xl bg-slate-50 border border-slate-200/80 p-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-900">Internal Marks (CIA)</label>
                    <span className="text-[11px] text-slate-500 font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded">
                      Max 50
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={form.ciaMarks}
                      onChange={(e) => handleInputChange('ciaMarks', Number(e.target.value))}
                      className="w-full h-11 px-3.5 pr-14 rounded-xl bg-white text-slate-900 font-bold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-xs font-mono"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold pointer-events-none">
                      / 50
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Continuous internal mid-term evaluations
                  </p>
                </div>

                <div className="flex flex-col justify-between gap-2.5 rounded-xl bg-slate-50 border border-slate-200/80 p-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-900">Assignments</label>
                    <span className="text-[11px] text-slate-500 font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded">
                      Max 25
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="25"
                      value={form.assignmentMarks}
                      onChange={(e) => handleInputChange('assignmentMarks', Number(e.target.value))}
                      className="w-full h-11 px-3.5 pr-14 rounded-xl bg-white text-slate-900 font-bold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-xs font-mono"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold pointer-events-none">
                      / 25
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Coursework submissions &amp; mini-projects
                  </p>
                </div>

                <div className="flex flex-col justify-between gap-2.5 rounded-xl bg-slate-50 border border-slate-200/80 p-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-900">Practical &amp; Lab</label>
                    <span className="text-[11px] text-slate-500 font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded">
                      Max 25
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="25"
                      value={form.practicalMarks}
                      onChange={(e) => handleInputChange('practicalMarks', Number(e.target.value))}
                      className="w-full h-11 px-3.5 pr-14 rounded-xl bg-white text-slate-900 font-bold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-xs font-mono"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold pointer-events-none">
                      / 25
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Hands-on lab performance &amp; viva score
                  </p>
                </div>
              </div>
            </div>

            {/* Section 02: Previous Academic Record */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
                <div className="flex items-center gap-3.5">
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 text-slate-900 font-extrabold text-sm border border-slate-200 shadow-xs">
                    02
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg text-slate-900 font-bold">
                      Section B — Previous Academic Record
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Historical performance benchmarks across prior collegiate terms
                    </p>
                  </div>
                </div>
                <span className="self-start sm:self-auto text-xs text-indigo-700 font-bold uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                  Weight: 25%
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col justify-between gap-2.5 rounded-xl bg-slate-50 border border-slate-200/80 p-4">
                  <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                    <span>Previous Sem SGPA</span>
                    <span className="text-[11px] text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded font-semibold">
                      Scale 10.0
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={form.previousSemSgpa}
                      onChange={(e) => handleInputChange('previousSemSgpa', Number(e.target.value))}
                      className="w-full h-11 px-3.5 pr-10 rounded-xl bg-white text-slate-900 font-bold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-xs font-mono"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[18px]">
                      grade
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Semester 5 Grade Point Average (0.00 – 10.00)</p>
                </div>

                <div className="flex flex-col justify-between gap-2.5 rounded-xl bg-slate-50 border border-slate-200/80 p-4">
                  <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                    <span>Cumulative Aggregate</span>
                    <span className="text-[11px] text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded font-semibold">
                      Percentage
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={form.cumulativeAggregate}
                      onChange={(e) => handleInputChange('cumulativeAggregate', Number(e.target.value))}
                      className="w-full h-11 px-3.5 pr-10 rounded-xl bg-white text-slate-900 font-bold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-xs font-mono"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">
                      %
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Cumulative score across Sem 1–5 examinations</p>
                </div>

                <div className="flex flex-col justify-between gap-2.5 rounded-xl bg-slate-50 border border-slate-200/80 p-4">
                  <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                    <span>Active Backlogs</span>
                    <span className="text-[11px] text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded font-semibold">
                      Arrears
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      value={form.activeBacklogs}
                      onChange={(e) => handleInputChange('activeBacklogs', Number(e.target.value))}
                      className="w-full h-11 px-3.5 pr-10 rounded-xl bg-white text-slate-900 text-xs font-semibold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all appearance-none cursor-pointer shadow-xs"
                    >
                      <option value="0">0 Backlogs (Cleared)</option>
                      <option value="1">1 Backlog (Mild Impact)</option>
                      <option value="2">2 Backlogs (Moderate Risk)</option>
                      <option value="3">3+ Backlogs (Critical Intervene)</option>
                    </select>
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 pointer-events-none text-[20px]">
                      unfold_more
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Pending remediations from previous terms</p>
                </div>
              </div>
            </div>

            {/* Section 03: Study Habits & Lifestyle Indicators */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
                <div className="flex items-center gap-3.5">
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 text-slate-900 font-extrabold text-sm border border-slate-200 shadow-xs">
                    03
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg text-slate-900 font-bold">
                      Section C — Study Habits &amp; Lifestyle Indicators
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Extracurricular balancing, rest metrics, and deliberate self-directed study
                    </p>
                  </div>
                </div>
                <span className="self-start sm:self-auto text-xs text-indigo-700 font-bold uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                  Weight: 15%
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col justify-between gap-2.5 rounded-xl bg-slate-50 border border-slate-200/80 p-4">
                  <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[17px] text-indigo-600">menu_book</span>
                      <span>Daily Study Hours</span>
                    </span>
                    <span className="text-[11px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-bold">
                      Core
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="16"
                      value={form.dailyStudyHours}
                      onChange={(e) => handleInputChange('dailyStudyHours', Number(e.target.value))}
                      className="w-full h-11 px-3.5 pr-16 rounded-xl bg-white text-slate-900 font-bold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-xs font-mono"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold pointer-events-none">
                      hrs/day
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Focused self-study outside instructional lecture hours</p>
                </div>

                <div className="flex flex-col justify-between gap-2.5 rounded-xl bg-slate-50 border border-slate-200/80 p-4">
                  <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[17px] text-slate-400">bedtime</span>
                      <span>Daily Sleep Hours</span>
                    </span>
                    <span className="text-[11px] text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded font-medium">
                      Optional
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="16"
                      value={form.dailySleepHours}
                      onChange={(e) => handleInputChange('dailySleepHours', Number(e.target.value))}
                      className="w-full h-11 px-3.5 pr-16 rounded-xl bg-white text-slate-900 font-bold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-xs font-mono"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold pointer-events-none">
                      hrs/day
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Affects cognitive retention, stamina, and test focus</p>
                </div>

                <div className="flex flex-col justify-between gap-2.5 rounded-xl bg-slate-50 border border-slate-200/80 p-4">
                  <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[17px] text-slate-400">sports_esports</span>
                      <span>Extracurricular / Wk</span>
                    </span>
                    <span className="text-[11px] text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded font-medium">
                      Optional
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="40"
                      value={form.extracurricularHours}
                      onChange={(e) => handleInputChange('extracurricularHours', Number(e.target.value))}
                      className="w-full h-11 px-3.5 pr-16 rounded-xl bg-white text-slate-900 font-bold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-xs font-mono"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold pointer-events-none">
                      hrs/wk
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Clubs, athletics, hackathons, and creative projects</p>
                </div>
              </div>
            </div>

            {/* Bottom Button Action Bar */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                <span>Reset to Defaults</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2.5 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                    <span>Processing Model Inference...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-indigo-300 text-[20px]">auto_awesome</span>
                    <span>Predict My Result</span>
                  </>
                )}
              </button>
            </div>

            {/* Ethical Notice */}
            <div className="px-4 py-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5 text-slate-600">
              <span className="material-symbols-outlined text-[20px] text-indigo-600 shrink-0 mt-0.5">verified_user</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-slate-900">Data Privacy &amp; Ethical AI Notice</span>
                <p className="text-xs leading-relaxed text-slate-500">
                  Predictions are statistical estimates calibrated against anonymous historical semester cohorts. They do not replace formal university evaluation boards, accredited transcripts, or faculty counseling. All computations execute within your authenticated institutional container.
                </p>
              </div>
            </div>

          </div>

          {/* Sticky Side Panel (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-20">
            
            {/* How ML Evaluates Inputs Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shrink-0">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">How ML Evaluates Inputs</h3>
                  <p className="text-[12px] text-slate-400">Feature relative impact weights</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 py-1">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-800 font-semibold flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                      Internal Tests &amp; CIA
                    </span>
                    <span className="font-bold text-indigo-700 font-mono text-[12px]">35% Weight</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <span className="text-[11px] text-slate-400">Strongest real-time correlation to final written examinations.</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-800 font-semibold flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                      Previous Sem SGPA
                    </span>
                    <span className="font-bold text-slate-800 font-mono text-[12px]">25% Weight</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-slate-800 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="text-[11px] text-slate-400">Foundational prerequisite retention from terms 1–5.</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-800 font-semibold flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
                      Attendance Metric
                    </span>
                    <span className="font-bold text-indigo-500 font-mono text-[12px]">25% Weight</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-indigo-400 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="text-[11px] text-slate-400">Continuous instructional absorption and practical viva readiness.</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-800 font-semibold flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                      Habits &amp; Lifestyle
                    </span>
                    <span className="font-bold text-slate-500 font-mono text-[12px]">15% Weight</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-[11px] text-slate-400">Sleep stability, deliberate practice, and self-study velocity.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-indigo-600">tune</span>
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">Hyperparameter Note</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Trained on 14,200 anonymized student semester outcomes across accredited engineering faculties with 94.6% confidence interval.
                </p>
              </div>
            </div>

            {/* Live Instant Benchmark Preview Card (High Contrast Dark Slate) */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white rounded-2xl p-6 shadow-lg border border-slate-800 flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[11px] uppercase tracking-widest text-indigo-200 font-bold">
                    Estimated Live Benchmark
                  </span>
                </div>
                <span className="material-symbols-outlined text-indigo-300 text-[20px]">bolt</span>
              </div>

              <div className="flex flex-col gap-1 relative z-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono tabular-nums">
                    {liveMetrics.predictedSgpa}
                  </span>
                  <span className="text-sm text-slate-300 font-semibold">/ 10.0 SGPA</span>
                </div>
                <span className="text-slate-400 text-[11px]">
                  Simulated instant estimate • Recalculates dynamically
                </span>
              </div>

              <div className="space-y-2 relative z-10 pt-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Pass Probability</span>
                  <span className="font-bold text-white font-mono tabular-nums">
                    {liveMetrics.passProbability}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-300"
                    style={{ width: `${liveMetrics.passProbability}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 relative z-10">
                <span>
                  Risk Tier:{' '}
                  <strong
                    className={`font-semibold ${
                      liveMetrics.academicRisk === 'Low'
                        ? 'text-emerald-400'
                        : liveMetrics.academicRisk === 'Moderate'
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {liveMetrics.academicRisk} ({liveMetrics.academicRisk === 'Low' ? 'Safe Zone' : liveMetrics.academicRisk === 'Moderate' ? 'On Track' : 'Needs Support'})
                  </strong>
                </span>
                <span className="font-mono text-slate-300">{liveMetrics.cohortRank}</span>
              </div>
            </div>

            {/* Academic Advisor Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
              <img
                alt="Prof. Sarah Jenkins"
                className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-indigo-100 border border-slate-200"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8LTqB1Y-NKhvkBKMDsk9rPs_YYke1Tn6RF7B3FHIS1T7AvHEvGEyValmlDpCeVYyH-FnW79TO26f7rDklg88jfzDjsO4H-uXBh1o2qAKVWISM3ZDHOLs2g9E6TrpiH-oYXb3aN9foMEuhNpKkSYjPVjs_NTgDM0GeFpr68i_pbhIZIHhxnmAbyMx9w1-Q4omeBi3hJn-q5X8fVeHxba-sl9SSTdrF_L-3vCc1j7nepxUU6ye_amo"
              />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-bold text-slate-900 truncate">Prof. Sarah Jenkins</span>
                <span className="text-[11px] text-slate-500 truncate">CS Faculty Academic Counselor</span>
                <button
                  type="button"
                  onClick={() => setAdvisorModalOpen(true)}
                  className="text-xs text-indigo-600 font-bold hover:text-indigo-800 hover:underline mt-1 inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>{advisorScheduled ? 'Advising Booked (Friday)' : 'Schedule 1-on-1 Advising'}</span>
                  <span className="material-symbols-outlined text-[15px]">calendar_month</span>
                </button>
              </div>
            </div>

          </div>

        </form>
      </div>

      {/* Advisor Scheduling Modal */}
      {advisorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">Schedule Academic Advising</h3>
              </div>
              <button
                onClick={() => setAdvisorModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-2">
              <p>
                Book a 20-minute 1-on-1 diagnostic review session with <strong>Prof. Sarah Jenkins</strong> to discuss continuous assessment scores and numerical methods preparation.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-500">Proposed Slot:</span>
                  <span className="text-slate-900">Friday, Oct 27 • 14:30 – 14:50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="text-slate-900">CS Dept Cabin 304 / Google Meet</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setAdvisorModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setAdvisorScheduled(true);
                  setAdvisorModalOpen(false);
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs"
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
