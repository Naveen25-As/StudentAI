import React from 'react';
import { Link } from 'react-router-dom';

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-8">
        
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-indigo-600 transition-colors font-medium">Home</Link>
          <span className="material-symbols-outlined text-[14px] text-slate-400" aria-hidden="true">chevron_right</span>
          <Link to="/dashboard" className="hover:text-indigo-600 transition-colors font-medium">Dashboard</Link>
          <span className="material-symbols-outlined text-[14px] text-slate-400" aria-hidden="true">chevron_right</span>
          <span className="text-slate-900 font-semibold" aria-current="page">Cookie &amp; Storage Policy</span>
        </nav>

        {/* Header Banner */}
        <header className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold w-fit uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">cookie</span>
            <span>Local Storage &amp; Cookie Disclosure</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Cookie &amp; Local Storage Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Effective Date: October 2024 • Last Audited: November 2024
          </p>
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed font-medium">
            ✅ <strong>Zero Tracking Cookies:</strong> StudentAI does NOT use third-party tracking cookies, advertising beacons, or behavioural tracking scripts. We utilize strictly necessary browser <code>LocalStorage</code> to maintain your diagnostic session on your device.
          </div>
        </header>

        {/* Main Content */}
        <article className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col gap-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          {/* 1. What are Cookies & Local Storage */}
          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs" aria-hidden="true">01</span>
              <span>Understanding Cookies vs. Local Storage</span>
            </h2>
            <p>
              Cookies are small text files sent by web servers to your browser that are transmitted back to the server with every request. Modern web applications also use <strong>HTML5 LocalStorage</strong>, which allows data to be stored securely on your local device without being automatically transmitted to any server on every page view.
            </p>
            <p>
              StudentAI prioritizes your privacy by using <strong>LocalStorage exclusively</strong> for functional state management. No HTTP cookies are set or tracked by our application code.
            </p>
          </section>

          {/* 2. Complete Inventory of Storage Keys */}
          <section className="flex flex-col gap-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs" aria-hidden="true">02</span>
              <span>Complete Inventory of Browser Storage Items</span>
            </h2>
            <p>
              Below is the comprehensive, audited list of every storage item created or accessed by StudentAI:
            </p>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-3">Storage Key</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Provider</th>
                    <th className="p-3">Purpose</th>
                    <th className="p-3">Expiration</th>
                    <th className="p-3">Classification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="p-3 font-bold text-slate-900">studentai_auth_user</td>
                    <td className="p-3 text-slate-600">LocalStorage</td>
                    <td className="p-3 text-slate-600">StudentAI (First-Party)</td>
                    <td className="p-3 font-sans text-slate-700">Stores active user identity (Alex Chen or Prof. Jenkins) and interface role state.</td>
                    <td className="p-3 text-slate-600">Persistent until sign-out or browser cache clear</td>
                    <td className="p-3 font-sans font-semibold text-emerald-700">Essential (Functional)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">studentai_student_profile</td>
                    <td className="p-3 text-slate-600">LocalStorage</td>
                    <td className="p-3 text-slate-600">StudentAI (First-Party)</td>
                    <td className="p-3 font-sans text-slate-700">Retains student name, roll number/USN, degree program, and target SGPA.</td>
                    <td className="p-3 text-slate-600">Persistent until manually reset in Settings</td>
                    <td className="p-3 font-sans font-semibold text-emerald-700">Essential (Functional)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">studentai_prediction_history</td>
                    <td className="p-3 text-slate-600">LocalStorage</td>
                    <td className="p-3 text-slate-600">StudentAI (First-Party)</td>
                    <td className="p-3 font-sans text-slate-700">Stores past prediction runs, reports, and feature attribution metrics for historical review.</td>
                    <td className="p-3 text-slate-600">Persistent until cleared via Settings reset button</td>
                    <td className="p-3 font-sans font-semibold text-emerald-700">Essential (Functional)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">studentai_recommendations</td>
                    <td className="p-3 text-slate-600">LocalStorage</td>
                    <td className="p-3 text-slate-600">StudentAI (First-Party)</td>
                    <td className="p-3 font-sans text-slate-700">Maintains checkmark completion status of personalized study improvement tasks.</td>
                    <td className="p-3 text-slate-600">Persistent until manually reset</td>
                    <td className="p-3 font-sans font-semibold text-emerald-700">Essential (Functional)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">studentai_cookie_consent</td>
                    <td className="p-3 text-slate-600">LocalStorage</td>
                    <td className="p-3 text-slate-600">StudentAI (First-Party)</td>
                    <td className="p-3 font-sans text-slate-700">Records your acknowledgment of this storage policy to prevent repeated popups.</td>
                    <td className="p-3 text-slate-600">1 Year</td>
                    <td className="p-3 font-sans font-semibold text-emerald-700">Essential (Compliance)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Third-Party Trackers Audit */}
          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs" aria-hidden="true">03</span>
              <span>Third-Party Trackers &amp; Pixels Audit</span>
            </h2>
            <p>
              Our automated source code audit confirms the following:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">Advertising Cookies: None</span>
                <span className="text-slate-500">No Google AdSense, DoubleClick, or Facebook Pixel trackers exist.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">Behavioral Analytics: None</span>
                <span className="text-slate-500">No session recording tools (Hotjar, FullStory) or telemetry SDKs.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">Cross-Site Tracking: Disabled</span>
                <span className="text-slate-500">No identifiers are shared across external domains or ad networks.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">Google Fonts: CDN Only</span>
                <span className="text-slate-500">Fonts loaded strictly for visual typography without cookie deposition.</span>
              </div>
            </div>
          </section>

          {/* 4. How to Manage or Clear Local Storage */}
          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs" aria-hidden="true">04</span>
              <span>How You Can Manage or Clear Stored Data</span>
            </h2>
            <p>You have full authority to clear all data stored by StudentAI at any moment:</p>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <strong>Method A — In-App Reset (Recommended):</strong> Navigate to <Link to="/settings" className="text-indigo-600 font-semibold hover:underline">Settings &amp; Profile</Link> and click <em>"Reset Application State to Placement Demo Baseline"</em>. This wipes all custom prediction runs and resets checklist states.
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <strong>Method B — Browser Developer Tools:</strong> Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono">F12</kbd> or right-click &gt; <em>Inspect</em>, open the <em>Application</em> or <em>Storage</em> tab, select <em>Local Storage</em>, and click <em>Clear All</em>.
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <strong>Method C — Browser Privacy Settings:</strong> In your browser settings (Chrome, Firefox, Safari, Edge), clear your "Cookies and other site data" for the host domain.
              </div>
            </div>
          </section>

          {/* 5. Policy Updates */}
          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs" aria-hidden="true">05</span>
              <span>Policy Updates</span>
            </h2>
            <p>
              If future updates introduce new functional storage keys or cloud synchronization mechanisms, this inventory will be updated immediately to maintain 100% compliance transparency.
            </p>
          </section>

        </article>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link to="/" className="inline-flex items-center gap-1.5 text-indigo-600 font-bold hover:underline">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_back</span>
            <span>Return to Landing Page</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-slate-900 transition-colors font-medium">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-900 transition-colors font-medium">Terms &amp; Conditions</Link>
            <Link to="/compliance" className="hover:text-slate-900 transition-colors font-medium">Compliance Center</Link>
          </div>
        </div>

      </div>
    </div>
  );
};
