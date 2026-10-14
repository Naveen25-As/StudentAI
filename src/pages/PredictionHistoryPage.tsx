import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getStoredHistory } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const PredictionHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [history] = useState(getStoredHistory);
  const [search, setSearch] = useState('');
  const [filterSem, setFilterSem] = useState<'all' | '6' | '5'>('all');

  const filtered = history.filter(item => {
    const matchesSearch = item.reportCode.toLowerCase().includes(search.toLowerCase()) ||
      item.dateCreated.toLowerCase().includes(search.toLowerCase()) ||
      item.expectedGrade.toLowerCase().includes(search.toLowerCase());
    
    if (filterSem === '6') return matchesSearch && item.semesterNumber === 6;
    if (filterSem === '5') return matchesSearch && item.semesterNumber === 5;
    return matchesSearch;
  });

  // Data for progression line chart
  const trendData = [...history].reverse().map(item => ({
    name: item.dateCreated,
    marks: item.predictedMarks,
    sgpa: item.predictedSgpa * 10
  }));

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="px-4 md:px-6 py-6 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-2 text-xs text-slate-500">
              <Link to="/dashboard" className="hover:text-slate-900 transition-colors font-medium">Overview</Link>
              <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
              <span className="text-slate-900 font-semibold">Prediction History</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Academic Prediction Archive &amp; Audit Trail
            </h1>
            <p className="text-xs text-slate-500">
              Immutable log of automated and ad-hoc machine learning inferences across collegiate semesters
            </p>
          </div>

          <Link
            to="/predict"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all text-xs font-semibold shadow-xs self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-[17px] text-indigo-300">bolt</span>
            <span>Run New Calculation</span>
          </Link>
        </div>

        {/* Trend Summary Chart Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[18px]">trending_up</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-slate-900">Score Progression Across Logged Inferences</h3>
                <span className="text-[11px] text-slate-400">Tracking predicted marks trajectory over time</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 text-indigo-700 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span> Predicted Marks (/100)
              </span>
            </div>
          </div>

          <div className="h-56 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="marks"
                  name="Predicted Marks"
                  stroke="#4338ca"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#4338ca' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Filter by report ID, grade, or date..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-slate-500 font-medium">Semester:</span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setFilterSem('all')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  filterSem === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Terms
              </button>
              <button
                onClick={() => setFilterSem('6')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  filterSem === '6' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sem 6 (Current)
              </button>
              <button
                onClick={() => setFilterSem('5')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  filterSem === '5' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sem 5
              </button>
            </div>
          </div>
        </div>

        {/* Archive Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <th className="py-3 px-4 font-semibold">Report Code</th>
                  <th className="py-3 px-4 font-semibold">Date &amp; Session</th>
                  <th className="py-3 px-4 font-semibold">Input Feature Summary</th>
                  <th className="py-3 px-4 text-right font-semibold">Predicted Marks</th>
                  <th className="py-3 px-4 text-center font-semibold">SGPA</th>
                  <th className="py-3 px-4 text-center font-semibold">Grade</th>
                  <th className="py-3 px-4 font-semibold">Academic Risk</th>
                  <th className="py-3 px-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-indigo-600">description</span>
                        <span className="font-mono">{item.reportCode}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">{item.dateCreated}</span>
                        <span className="text-[10px] text-slate-400">{item.academicSession}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-slate-700 font-medium">
                        {item.inputParameters.attendancePercentage}% Attn • {item.inputParameters.ciaMarks}/50 CIA • {item.inputParameters.dailyStudyHours}h study
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900 font-mono text-sm tabular-nums">
                      {item.predictedMarks}/100
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold font-mono text-indigo-700">
                      {item.predictedSgpa}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-bold text-slate-800">
                        {item.expectedGrade}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-semibold border ${
                          item.academicRisk === 'Low'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : item.academicRisk === 'Moderate'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.academicRisk === 'Low'
                              ? 'bg-emerald-500'
                              : item.academicRisk === 'Moderate'
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                        ></span>
                        {item.academicRisk}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => navigate(`/report/${item.id}`)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1"
                      >
                        <span>View Report</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
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
