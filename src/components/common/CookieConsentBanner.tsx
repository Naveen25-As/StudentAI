import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CONSENT_STORAGE_KEY = 'studentai_cookie_consent';

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [analyticsOption, setAnalyticsOption] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!consent) {
        // Show after a brief delay for smoother page render
        const timer = setTimeout(() => setIsVisible(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({
        essential: true,
        analytics: true,
        timestamp: new Date().toISOString()
      }));
    } catch {}
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({
        essential: true,
        analytics: false,
        timestamp: new Date().toISOString()
      }));
    } catch {}
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({
        essential: true,
        analytics: analyticsOption,
        timestamp: new Date().toISOString()
      }));
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie and Local Storage Consent"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-800 shadow-2xl animate-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 max-w-4xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/40 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">cookie</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Privacy &amp; Local Storage Transparency</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase tracking-wide">
                  Zero Ad Trackers
                </span>
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                StudentAI uses browser <code>LocalStorage</code> solely for essential functionality—preserving your academic prediction runs, study checklists, and interface preferences directly on your device. We do not use third-party advertising cookies, behavioural trackers, or tracking pixels. Review our{' '}
                <Link to="/cookies" className="text-indigo-400 hover:text-indigo-300 underline font-semibold focus-visible:outline-2 focus-visible:outline-indigo-400">
                  Cookie &amp; Storage Policy
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-indigo-400 hover:text-indigo-300 underline font-semibold focus-visible:outline-2 focus-visible:outline-indigo-400">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>

          {/* Quick Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-center">
            <button
              type="button"
              onClick={() => setIsCustomizeOpen(!isCustomizeOpen)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors focus-visible:outline-2 focus-visible:outline-white"
            >
              {isCustomizeOpen ? 'Close Settings' : 'Customize'}
            </button>
            <button
              type="button"
              onClick={handleRejectNonEssential}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors focus-visible:outline-2 focus-visible:outline-white"
            >
              Reject Non-Essential
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md focus-visible:outline-2 focus-visible:outline-white"
            >
              Accept All &amp; Continue
            </button>
          </div>
        </div>

        {/* Customize Panel Drawer */}
        {isCustomizeOpen && (
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs flex flex-col gap-3 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <span className="font-bold text-slate-200 text-xs">Manage Storage &amp; Cookie Preferences</span>
              <span className="text-[11px] text-slate-400">Aligned with Indian DPDP Act 2023 &amp; IT Rules</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/80 flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span>Strictly Essential Local Storage</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 font-bold">Required</span>
                  </span>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Session state, current student profile, prediction history archive, and recommendation checklists.
                  </p>
                </div>
                <input
                  type="checkbox"
                  disabled
                  checked
                  aria-label="Strictly Essential Local Storage (Always active)"
                  className="mt-1 h-4 w-4 rounded accent-indigo-600 cursor-not-allowed"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/80 flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span>Diagnostic Metrics Telemetry</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-700 text-slate-300 font-bold">Optional</span>
                  </span>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Permits local browser calculation of speed benchmarks when evaluating models. No data leaves your machine.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="analytics-consent"
                  checked={analyticsOption}
                  onChange={(e) => setAnalyticsOption(e.target.checked)}
                  aria-label="Diagnostic Metrics Telemetry"
                  className="mt-1 h-4 w-4 rounded accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
