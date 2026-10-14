import React from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine
} from 'recharts';

export const AcademicAnalyticsPage: React.FC = () => {
  // Semester GPA Progression
  const semesterProgression = [
    { semester: 'Sem 1', sgpa: 7.20, cgpa: 7.20, cohortAvg: 7.05 },
    { semester: 'Sem 2', sgpa: 7.42, cgpa: 7.31, cohortAvg: 7.15 },
    { semester: 'Sem 3', sgpa: 7.85, cgpa: 7.49, cohortAvg: 7.30 },
    { semester: 'Sem 4', sgpa: 7.60, cgpa: 7.52, cohortAvg: 7.22 },
    { semester: 'Sem 5', sgpa: 8.15, cgpa: 7.64, cohortAvg: 7.45 },
    { semester: 'Sem 6 (Est)', sgpa: 8.42, cgpa: 7.77, cohortAvg: 7.50 },
  ];

  // Attendance vs Marks correlation scatter (simulated cohort data)
  const attendanceCorrelation = [
    { attendance: 65, marks: 52, name: 'Student A' },
    { attendance: 70, marks: 58, name: 'Student B' },
    { attendance: 72, marks: 61, name: 'Student C' },
    { attendance: 76, marks: 72, name: 'Student D' },
    { attendance: 78, marks: 74, name: 'Student E' },
    { attendance: 81, marks: 78, name: 'Student F' },
    { attendance: 83, marks: 80, name: 'Student G' },
    { attendance: 85, marks: 82, name: 'Alex Chen (You)' },
    { attendance: 88, marks: 85, name: 'Student H' },
    { attendance: 92, marks: 90, name: 'Student I' },
    { attendance: 95, marks: 93, name: 'Student J' },
  ];

  // Subject competency analysis
  const subjectCompetency = [
    { subject: 'Python DSA', actualScore: 88, cohortMean: 76, target: 85 },
    { subject: 'DBMS NoSQL', actualScore: 84, cohortMean: 74, target: 85 },
    { subject: 'Full Stack Web', actualScore: 86, cohortMean: 72, target: 85 },
    { subject: 'Computer Networks', actualScore: 78, cohortMean: 71, target: 80 },
    { subject: 'Engineering Maths IV', actualScore: 76, cohortMean: 69, target: 80 },
  ];

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="px-4 md:px-6 py-6 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col gap-1">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/dashboard" className="hover:text-slate-900 transition-colors font-medium">Overview</Link>
            <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
            <span className="text-slate-900 font-semibold">Academic Analytics</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Academic Analytics &amp; Deep-Dive
          </h1>
          <p className="text-xs text-slate-500">
            Multi-dimensional evaluation of collegiate progression, credit pacing, and statutory correlation trends
          </p>
        </div>

        {/* Top 3 Analytical KPI Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cumulative CGPA</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-100">
                +0.57 Gain
              </span>
            </div>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-mono">7.77</span>
              <span className="text-xs text-slate-400 font-semibold">Projected Final</span>
            </div>
            <span className="text-[11px] text-slate-500">Started at 7.20 in Sem 1; steady upward slope across all terms</span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance Compliance</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                Safe Buffer (+10%)
              </span>
            </div>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-mono">85.0%</span>
              <span className="text-xs text-slate-400 font-semibold">vs 75% Bar</span>
            </div>
            <span className="text-[11px] text-slate-500">Can miss up to 4 more lecture hours without detention risk</span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cohort Percentile</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                Top 15%
              </span>
            </div>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-mono">86th</span>
              <span className="text-xs text-slate-400 font-semibold">Percentile</span>
            </div>
            <span className="text-[11px] text-slate-500">Ranked #12 among 120 enrolled B.Tech CS students</span>
          </div>
        </div>

        {/* Row 1: Progression Chart & Attendance Correlation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 1: SGPA vs CGPA Progression */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">SGPA vs CGPA Progression Trajectory</h3>
                <p className="text-xs text-slate-400">Comparing term performance against cumulative aggregate &amp; cohort average</p>
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={semesterProgression}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="semester" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
                  <YAxis domain={[6.5, 9.0]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="sgpa" name="Term SGPA" stroke="#4338ca" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="cgpa" name="Cumulative CGPA" stroke="#10b981" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="cohortAvg" name="Cohort Average" stroke="#94a3b8" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Attendance vs Marks Correlation */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Attendance vs. Examination Marks</h3>
              <p className="text-xs text-slate-400">Scatter correlation showing detention threshold impact</p>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" dataKey="attendance" name="Attendance" unit="%" domain={[60, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis type="number" dataKey="marks" name="Marks" unit=" pts" domain={[40, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  />
                  <ReferenceLine x={75} stroke="#ef4444" strokeDasharray="3 3" label={{ value: '75% Bar', fill: '#ef4444', fontSize: 10 }} />
                  <Scatter name="Students" data={attendanceCorrelation} fill="#4338ca" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <span className="text-[11px] text-slate-500">
              Strong positive regression correlation ($r = 0.88$); students below 75% show steep terminal mark degradation.
            </span>
          </div>
        </div>

        {/* Row 2: Subject Competency Comparison */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">Subject Competency Benchmark vs Cohort Mean</h3>
              <p className="text-xs text-slate-400">Comparing your estimated score with syllabus benchmarks and class average</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded text-slate-700">
              5 Core Modules Active
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectCompetency} margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="actualScore" name="Your Projected Marks" fill="#4338ca" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cohortMean" name="Cohort Average" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" name="Target Distinction (85)" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
