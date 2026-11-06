import React from 'react';
import { Link } from 'react-router-dom';

export const ComplianceTrustPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-8">
        
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-indigo-600 transition-colors font-medium">Home</Link>
          <span className="material-symbols-outlined text-[14px] text-slate-400" aria-hidden="true">chevron_right</span>
          <Link to="/dashboard" className="hover:text-indigo-600 transition-colors font-medium">Dashboard</Link>
          <span className="material-symbols-outlined text-[14px] text-slate-400" aria-hidden="true">chevron_right</span>
          <span className="text-slate-900 font-semibold" aria-current="page">Compliance &amp; Trust Center</span>
        </nav>

        {/* Header Banner */}
        <header className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold w-fit uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">verified</span>
            <span>Audited Transparency</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            StudentAI Compliance &amp; Trust Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Full audit disclosure of machine learning methodology, synthetic data provenance, Indian regulatory alignment, and digital accessibility compliance.
          </p>
        </header>

        {/* 1. Scientific & Machine Learning Methodology Audit */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col gap-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[22px]" aria-hidden="true">model_training</span>
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Machine Learning &amp; Scientific Methodology Audit</h2>
                <p className="text-xs text-slate-500">Verified pipeline parameters from trained scikit-learn models</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md border border-indigo-200">
              Pipeline v4.2
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              To maintain absolute honesty regarding machine learning capabilities, StudentAI discloses its actual model architecture, dataset origin, and verified holdout metrics as trained in <code>backend/ml/train.py</code> and evaluated in <code>backend/ml/metrics.json</code>:
            </p>

            {/* Dataset Origin Notice */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 text-xs">
              <span className="font-bold text-slate-900 block">Dataset Provenance &amp; Limitations:</span>
              <p className="text-slate-600">
                • <strong>Dataset Mode:</strong> Curated synthetic dataset (N = 2,500 samples) calibrated from university statistical distributions across computer applications and engineering curricula.
              </p>
              <p className="text-slate-600">
                • <strong>Evaluation Split:</strong> 80% training / 20% holdout test set with 5-fold cross-validation.
              </p>
              <p className="text-slate-600">
                • <strong>Honest Disclosure:</strong> Synthetic evaluation demonstrates algorithmic soundness and software integration; however, synthetic performance cannot substitute for institutional empirical validation on real student examination cohorts.
              </p>
            </div>

            {/* Actual Metrics Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-3">Model Candidate</th>
                    <th className="p-3">5-Fold CV Mean R²</th>
                    <th className="p-3">Test Holdout R²</th>
                    <th className="p-3">Mean Absolute Error (MAE)</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr className="bg-indigo-50/40">
                    <td className="p-3 font-bold text-indigo-900 font-sans">Ridge Regression (Baseline)</td>
                    <td className="p-3 text-indigo-700">0.9575</td>
                    <td className="p-3 font-bold text-indigo-700">0.9539</td>
                    <td className="p-3 text-indigo-700">1.973 pts</td>
                    <td className="p-3 font-sans font-bold text-indigo-700">Selected Production Best</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-800 font-sans">Gradient Boosting Regressor</td>
                    <td className="p-3 text-slate-600">0.9564</td>
                    <td className="p-3 text-slate-600">0.9525</td>
                    <td className="p-3 text-slate-600">2.031 pts</td>
                    <td className="p-3 font-sans text-slate-500">Benchmark Ensemble</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-800 font-sans">Random Forest Regressor</td>
                    <td className="p-3 text-slate-600">0.9349</td>
                    <td className="p-3 text-slate-600">0.9285</td>
                    <td className="p-3 text-slate-600">2.516 pts</td>
                    <td className="p-3 font-sans text-slate-500">Benchmark Ensemble</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-800 font-sans">Decision Tree Regressor</td>
                    <td className="p-3 text-slate-600">0.8642</td>
                    <td className="p-3 text-slate-600">0.8551</td>
                    <td className="p-3 text-slate-600">3.555 pts</td>
                    <td className="p-3 font-sans text-slate-500">Baseline Tree</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Feature Attribution Reality Note */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <strong>Feature Attribution Clarification:</strong> While the application presents intuitive attribution bar charts explaining individual factor lift vs. class baselines, this frontend visualization utilizes a calibrated heuristic offset model based on component weights. It is not calculated via server-side SHAP (Shapley Additive exPlanations) tree-kernel evaluation in the browser.
            </div>
          </div>
        </section>

        {/* 2. Indian Legal Framework Matrix */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col gap-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">account_balance</span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Indian Legal &amp; Regulatory Compliance Matrix</h2>
              <p className="text-xs text-slate-500">Applicability analysis for educational software operating in India</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-2">
              <span className="font-bold text-slate-900 text-sm">1. Digital Personal Data Protection Act, 2023</span>
              <p className="text-slate-600">
                <strong>Applicability:</strong> High. Processes digital student data.
              </p>
              <p className="text-slate-600">
                <strong>Implemented Controls:</strong> Clear notice prior to processing, purpose limitation (Section 5), right to erasure/reset (Section 12), and parental consent advisory for collegiate minors (Section 9).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-2">
              <span className="font-bold text-slate-900 text-sm">2. Information Technology Act, 2000 &amp; SPDI Rules</span>
              <p className="text-slate-600">
                <strong>Applicability:</strong> Mandatory.
              </p>
              <p className="text-slate-600">
                <strong>Implemented Controls:</strong> Comprehensive Privacy Policy published under Rule 4, reasonable security practices under Section 43A, and Grievance Officer details published.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-2">
              <span className="font-bold text-slate-900 text-sm">3. Consumer Protection Act, 2019</span>
              <p className="text-slate-600">
                <strong>Applicability:</strong> Non-commercial disclosure.
              </p>
              <p className="text-slate-600">
                <strong>Implemented Controls:</strong> Prohibition of misleading claims (no false 99% accuracy promises, no fake student testimonials). E-commerce refund rules are disclaimed as StudentAI is 100% free with no paid services.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-2">
              <span className="font-bold text-slate-900 text-sm">4. RPwD Act, 2016 &amp; Indian Standard IS 17802</span>
              <p className="text-slate-600">
                <strong>Applicability:</strong> Digital accessibility guidelines.
              </p>
              <p className="text-slate-600">
                <strong>Implemented Controls:</strong> High contrast color schemes compliant with WCAG 2.2 AA (&gt;4.5:1 text contrast), full keyboard navigability, semantic ARIA labels, and non-reliance on color alone for risk communication.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Accessibility & Usability Standards */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col gap-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">accessibility_new</span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">WCAG 2.2 Level AA Accessibility Audit</h2>
              <p className="text-xs text-slate-500">Inclusive design verified across keyboard and screen reader experiences</p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Contrast Ratio Compliance:</strong> All body copy, labels, and interactive button text maintain a contrast ratio exceeding 4.5:1 against their backgrounds. Low-contrast grey text has been eliminated.</li>
              <li><strong>Multi-Channel Status Communication:</strong> Academic risk tiers (Low, Moderate, High) are communicated via distinct text labels, numerical values, and iconography—never by colour alone.</li>
              <li><strong>Full Keyboard Accessibility:</strong> Every navigation link, button, input slider, and modal dialog can be operated completely via <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-xs">Tab</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-xs">Shift+Tab</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-xs">Enter</kbd>, and <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-xs">Escape</kbd>.</li>
              <li><strong>Screen Reader Ready:</strong> Interactive icon buttons provide descriptive <code>aria-label</code> tags, and decorative glyphs carry <code>aria-hidden="true"</code> to prevent auditory distraction.</li>
            </ul>
          </div>
        </section>

        {/* 4. Ethical AI Principles */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col gap-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="material-symbols-outlined text-indigo-600 text-[20px]" aria-hidden="true">psychology</span>
            <span>Ethical AI Principles in StudentAI</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">No Demographic Bias</span>
              <p className="text-slate-600">Features are strictly limited to academic coursework, attendance compliance, and self-directed study hours. No gender, ethnic, or socio-economic inputs are collected.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Human-In-The-Loop</span>
              <p className="text-slate-600">Outputs are designed to facilitate dialogue between students and faculty counselors (such as Prof. Sarah Jenkins), never to execute automated decisions.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Actionable Elevation</span>
              <p className="text-slate-600">Rather than merely classifying risk, the system provides targeted 7-point improvement milestones with estimated score gains to foster positive academic habits.</p>
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link to="/" className="inline-flex items-center gap-1.5 text-indigo-600 font-bold hover:underline">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_back</span>
            <span>Return to Landing Page</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-slate-900 transition-colors font-medium">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-900 transition-colors font-medium">Terms &amp; Conditions</Link>
            <Link to="/cookies" className="hover:text-slate-900 transition-colors font-medium">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </div>
  );
};
