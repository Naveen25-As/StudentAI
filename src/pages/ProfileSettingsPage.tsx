import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { probeBackendStatus, BackendStatus } from '../services/api';
import { resetApplicationState } from '../data/mockData';

export const ProfileSettingsPage: React.FC = () => {
  const { studentProfile, updateProfile } = useAuth();

  const [name, setName] = useState(studentProfile.name);
  const [targetSgpa, setTargetSgpa] = useState(studentProfile.targetSgpa);
  const [counselorEmail, setCounselorEmail] = useState(studentProfile.counselorEmail);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Backend prober
  const [backendUrl, setBackendUrl] = useState('/api/v1');
  const [probing, setProbing] = useState(false);
  const [backendStatus, setBackendStatus] = useState<BackendStatus | null>(null);

  useEffect(() => {
    probeBackendStatus().then(setBackendStatus);
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      targetSgpa: Number(targetSgpa),
      counselorEmail
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleTestBackend = async () => {
    setProbing(true);
    const status = await probeBackendStatus();
    setBackendStatus(status);
    setProbing(false);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all prediction runs and checklists back to default demo data?')) {
      resetApplicationState();
      setResetSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="px-4 md:px-6 py-6 flex flex-col gap-6 max-w-5xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col gap-1">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/dashboard" className="hover:text-slate-900 transition-colors font-medium">Overview</Link>
            <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
            <span className="text-slate-900 font-semibold">Settings &amp; Profile</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Identity &amp; System Configuration
          </h1>
          <p className="text-xs text-slate-500">
            Manage your collegiate enrollment parameters, target thresholds, and machine learning backend connection
          </p>
        </div>

        {/* Section 1: Academic Profile */}
        <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <img
                alt={studentProfile.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100 border border-slate-200"
                src={studentProfile.avatarUrl}
              />
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-slate-900">{studentProfile.name}</h3>
                <span className="text-xs text-slate-400">{studentProfile.rollNumber} • {studentProfile.degree}</span>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
              Active Enrolled
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-slate-800">Student Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-slate-800">Roll Number / USN</label>
              <input
                type="text"
                disabled
                value={studentProfile.rollNumber}
                className="h-10 px-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed font-mono"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-slate-800">Target Semester SGPA Goal (Scale 10.0)</label>
              <input
                type="number"
                step="0.05"
                min="5.0"
                max="10.0"
                value={targetSgpa}
                onChange={(e) => setTargetSgpa(Number(e.target.value))}
                className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:bg-white font-mono"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-slate-800">Faculty Counselor Email</label>
              <input
                type="email"
                value={counselorEmail}
                onChange={(e) => setCounselorEmail(e.target.value)}
                className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <span className="text-[11px] text-slate-400">Values are stored securely in browser container state</span>
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs"
            >
              {saveSuccess ? 'Changes Saved ✓' : 'Save Profile Changes'}
            </button>
          </div>
        </form>

        {/* Section 2: Machine Learning & FastAPI Backend Integration Prober */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">hub</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-slate-900">Python FastAPI &amp; Scikit-learn Service</h3>
                <span className="text-xs text-slate-400">Live endpoint status prober for local placement demonstrations</span>
              </div>
            </div>

            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border inline-flex items-center gap-1.5 ${
                backendStatus?.isLive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  backendStatus?.isLive ? 'bg-emerald-500 animate-pulse' : 'bg-indigo-600'
                }`}
              ></span>
              {backendStatus?.isLive ? 'FastAPI Connected' : 'Sample Data Fallback Active'}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-2">
            <div className="flex items-center justify-between font-semibold text-slate-700">
              <span>Active Model Engine:</span>
              <span className="font-mono text-indigo-700">{backendStatus?.model}</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-slate-700">
              <span>Current Model Version:</span>
              <span className="font-mono text-slate-900">{backendStatus?.version}</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-slate-700">
              <span>Evaluation Accuracy Metric:</span>
              <span className="font-mono text-emerald-600">{backendStatus?.accuracy}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={backendUrl}
                onChange={(e) => setBackendUrl(e.target.value)}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:border-indigo-600"
              />
            </div>
            <button
              onClick={handleTestBackend}
              disabled={probing}
              className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
            >
              {probing ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                  <span>Probing Backend...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">sensors</span>
                  <span>Test API Connection</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Section 3: Reset Demo State */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-slate-900">Reset Application State to Placement Demo Baseline</h3>
            <span className="text-xs text-slate-400">
              Restores initial Alex Chen prediction history (#PR-2024-884) and resets recommendation checkboxes
            </span>
          </div>

          <button
            onClick={handleResetData}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold transition-colors shrink-0"
          >
            {resetSuccess ? 'Restored Demo Baseline ✓' : 'Reset to Defaults'}
          </button>
        </div>

      </div>
    </div>
  );
};
