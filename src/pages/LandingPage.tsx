import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs font-black text-sm">
            <span className="material-symbols-outlined text-[20px]">neurology</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-slate-900 leading-none">StudentAI</span>
            <span className="text-[10px] uppercase tracking-wider text-indigo-600 font-bold mt-0.5">Predictive Intel</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
          >
            Launch System
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center text-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide uppercase">
          <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
          <span>BCA Placement Capstone Project • AI Predictive Intel</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl leading-tight">
          AI-Powered Student Performance &amp; Result Prediction System
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          Calibrated diagnostic modeling synthesizing continuous internal evaluations (CIA), statutory physical cohort attendance, historical collegiate trajectories, and study habits into early-warning academic forecasts.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/dashboard"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Open Student Dashboard</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
          <Link
            to="/predict"
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm shadow-xs transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-indigo-600 text-[18px]">bolt</span>
            <span>Computational Assessment Matrix</span>
          </Link>
          <Link
            to="/admin"
            className="px-5 py-3.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 font-bold text-sm transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">supervisor_account</span>
            <span>Faculty &amp; HOD Console</span>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left w-full">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[22px]">model_training</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Multi-Factor Machine Learning</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Trained Scikit-learn Random Forest regression pipeline evaluating CIA (35%), SGPA (25%), Attendance (25%), and Study Habits (15%) without subjective bias.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[22px]">tune</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">SHAP Feature Attribution</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Transparent attribution bar charts explaining individual feature lift and opportunity gaps against cohort baselines instead of opaque black-box scores.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[22px]">shield</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Statutory Risk Prevention</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Early alerts for the 75% attendance detention bar and pending backlogs, paired with an actionable 7-point improvement plan with quantified boost estimates.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-6 text-center text-xs text-slate-400">
        StudentAI System • Developed for BCA Academic Placement Portfolio • Preserving Google Stitch Institutional Design
      </footer>
    </div>
  );
};
