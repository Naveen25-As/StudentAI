import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { defaultCohortStudents } from '../data/mockData';
import { AcademicRiskLevel } from '../types/academic';

export const AdminPortalPage: React.FC = () => {
  const navigate = useNavigate();
  const [students] = useState(defaultCohortStudents);
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | AcademicRiskLevel>('all');
  const [detentionOnly, setDetentionOnly] = useState(false);
  const [advisorySent, setAdvisorySent] = useState<string | null>(null);

  const filtered = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchesRisk = riskFilter === 'all' || student.riskLevel === riskFilter;
    const matchesDetention = !detentionOnly || student.attendancePct < 75;

    return matchesSearch && matchesRisk && matchesDetention;
  });

  const handleIssueAdvisory = (studentId: string, studentName: string) => {
    setAdvisorySent(`Advisory notice dispatched to ${studentName}`);
    setTimeout(() => setAdvisorySent(null), 3000);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="px-4 md:px-6 py-6 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-2 text-xs text-slate-500">
              <Link to="/dashboard" className="hover:text-slate-900 transition-colors font-medium">Overview</Link>
              <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
              <span className="text-slate-900 font-semibold">Admin &amp; Faculty Portal</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Cohort Academic Oversight &amp; Risk Intervention
            </h1>
            <p className="text-xs text-slate-500">
              Department-level monitoring of 120 enrolled students in Semester 6 B.Tech CS / BCA
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Exporting cohort academic roster as CSV...')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => alert('Batch attendance warning notices sent to all 6 students below 75% threshold.')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">mail</span>
              <span>Batch Warning</span>
            </button>
          </div>
        </div>

        {advisorySent && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 animate-in fade-in">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{advisorySent}</span>
          </div>
        )}

        {/* 4 Summary Cohort Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Enrolled Cohort</span>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">school</span>
            </div>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">120</span>
              <span className="text-xs text-slate-400 font-medium">Students</span>
            </div>
            <span className="text-[11px] text-slate-400">Semester 6 • 2025 Graduation</span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 uppercase">Low Risk Profile</span>
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
            </div>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-600 font-mono">98</span>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">81.6%</span>
            </div>
            <span className="text-[11px] text-slate-400">Clear attendance &gt;75% and SGPA &gt;7.0</span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 uppercase">Moderate Caution</span>
              <span className="material-symbols-outlined text-amber-600 text-[18px]">warning</span>
            </div>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-600 font-mono">16</span>
              <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">13.3%</span>
            </div>
            <span className="text-[11px] text-slate-400">Borderline marks or 1 active backlog</span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-700 uppercase">Critical Intervene</span>
              <span className="material-symbols-outlined text-rose-600 text-[18px]">report_problem</span>
            </div>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-rose-600 font-mono">6</span>
              <span className="text-xs text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded">5.0%</span>
            </div>
            <span className="text-[11px] text-rose-600 font-semibold">Attendance &lt;75% or 2+ backlogs</span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
            <input
              type="text"
              placeholder="Search by student name or roll number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setRiskFilter('all')}
                className={`px-2.5 py-1 rounded font-semibold transition-all ${
                  riskFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Ranks
              </button>
              <button
                onClick={() => setRiskFilter('Low')}
                className={`px-2.5 py-1 rounded font-semibold transition-all ${
                  riskFilter === 'Low' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Low Risk
              </button>
              <button
                onClick={() => setRiskFilter('Moderate')}
                className={`px-2.5 py-1 rounded font-semibold transition-all ${
                  riskFilter === 'Moderate' ? 'bg-white text-amber-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Moderate
              </button>
              <button
                onClick={() => setRiskFilter('High')}
                className={`px-2.5 py-1 rounded font-semibold transition-all ${
                  riskFilter === 'High' ? 'bg-white text-rose-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                High Risk
              </button>
            </div>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={detentionOnly}
                onChange={(e) => setDetentionOnly(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
              />
              <span className="text-rose-700">Detention Bar (&lt;75% Attendance Only)</span>
            </label>
          </div>
        </div>

        {/* Roster Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <th className="py-3 px-4 font-semibold">Student &amp; USN</th>
                  <th className="py-3 px-4 font-semibold">Attendance</th>
                  <th className="py-3 px-4 font-semibold">CIA Score</th>
                  <th className="py-3 px-4 font-semibold text-right">Predicted Marks</th>
                  <th className="py-3 px-4 font-semibold text-center">SGPA</th>
                  <th className="py-3 px-4 font-semibold text-center">Grade</th>
                  <th className="py-3 px-4 font-semibold">Risk Classification</th>
                  <th className="py-3 px-4 font-semibold text-right">Intervention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {filtered.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      <div className="flex flex-col">
                        <span>{st.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{st.rollNo}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-mono font-bold ${st.attendancePct < 75 ? 'text-rose-600' : 'text-slate-700'}`}>
                        {st.attendancePct}%
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono">
                      {st.ciaScore} / 50
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900 font-mono tabular-nums">
                      {st.predictedMarks}/100
                    </td>
                    <td className="py-3 px-4 text-center font-bold font-mono text-indigo-700">
                      {st.predictedSgpa}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-bold text-slate-800">
                        {st.expectedGrade}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-semibold border ${
                          st.riskLevel === 'Low'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : st.riskLevel === 'Moderate'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            st.riskLevel === 'Low'
                              ? 'bg-emerald-500'
                              : st.riskLevel === 'Moderate'
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                        ></span>
                        {st.riskLevel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleIssueAdvisory(st.id, st.name)}
                          className="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold hover:underline"
                        >
                          Advisory
                        </button>
                        <button
                          onClick={() => navigate('/report/latest')}
                          className="text-[11px] text-slate-500 hover:text-slate-800 font-medium"
                        >
                          Audit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
