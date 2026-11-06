import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-8">
        
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-indigo-600 transition-colors font-medium">Home</Link>
          <span className="material-symbols-outlined text-[14px] text-slate-400" aria-hidden="true">chevron_right</span>
          <Link to="/dashboard" className="hover:text-indigo-600 transition-colors font-medium">Dashboard</Link>
          <span className="material-symbols-outlined text-[14px] text-slate-400" aria-hidden="true">chevron_right</span>
          <span className="text-slate-900 font-semibold" aria-current="page">Privacy Policy</span>
        </nav>

        {/* Header Banner */}
        <header className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold w-fit uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">verified_user</span>
            <span>Privacy &amp; Data Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            StudentAI Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Effective Date: October 2024 • Last Audited &amp; Updated: November 2024
          </p>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
            <strong>Transparency Commitment:</strong> StudentAI is an educational research and capstone portfolio application developed by Naveen Asundi. This Privacy Policy documents our actual, verified data handling practices. We do not sell data, do not use behavioral ad trackers, and do not transmit academic metrics to commercial data brokers.
          </div>
        </header>

        {/* Content Sections */}
        <article className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col gap-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          {/* 1. Introduction & Scope */}
          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs" aria-hidden="true">01</span>
              <span>Introduction &amp; Scope</span>
            </h2>
            <p>
              This Privacy Policy explains how <strong>StudentAI — AI-Powered Student Performance &amp; Result Prediction System</strong> handles personal and academic data. This application serves as an academic decision-support and self-evaluation tool designed for collegiate students (such as BCA, MCA, and B.Tech Computer Science undergraduates) and academic faculty advisors.
            </p>
            <p>
              By accessing or using StudentAI, you acknowledge the collection and processing of your academic information solely for the diagnostic purposes outlined herein.
            </p>
          </section>

          {/* 2. Inventory of Collected Data */}
          <section className="flex flex-col gap-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs" aria-hidden="true">02</span>
              <span>Inventory of Information Collected</span>
            </h2>
            <p>
              We collect only the specific data items entered into the interface or stored locally for application continuity:
            </p>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-3">Data Category</th>
                    <th className="p-3">Specific Fields</th>
                    <th className="p-3">Requirement</th>
                    <th className="p-3">Storage Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Student Identity</td>
                    <td className="p-3">Student Name, Roll Number/USN, University Email, Degree Program</td>
                    <td className="p-3 text-indigo-700 font-semibold">Optional / Profile</td>
                    <td className="p-3 font-mono text-slate-600">LocalStorage &amp; In-Memory Session</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Current Coursework</td>
                    <td className="p-3">Attendance %, Continuous Internal Assessment (CIA /50), Assignment Marks (/25), Practical/Lab Marks (/25)</td>
                    <td className="p-3 text-rose-700 font-semibold">Required for Prediction</td>
                    <td className="p-3 font-mono text-slate-600">Ephemeral Inference Payload &amp; LocalStorage History</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Historical Academic</td>
                    <td className="p-3">Previous Semester SGPA (Scale 10.0), Cumulative Aggregate %, Active Backlogs Count</td>
                    <td className="p-3 text-rose-700 font-semibold">Required for Trajectory</td>
                    <td className="p-3 font-mono text-slate-600">Ephemeral Inference Payload &amp; LocalStorage History</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Study &amp; Habits</td>
                    <td className="p-3">Daily Study Hours, Daily Sleep Hours, Extracurricular Hours/Week</td>
                    <td className="p-3 text-slate-600 font-semibold">Study hours core; sleep/extracurricular optional</td>
                    <td className="p-3 font-mono text-slate-600">Ephemeral Inference Payload &amp; LocalStorage History</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Advising &amp; Settings</td>
                    <td className="p-3">Faculty Counselor Email, Target SGPA Threshold, Action Checklist completion states</td>
                    <td className="p-3 text-slate-600 font-semibold">Optional Configuration</td>
                    <td className="p-3 font-mono text-slate-600">Browser LocalStorage</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-600 text-xs">
              <strong>Non-Collection Note:</strong> StudentAI does NOT collect payment information, government national identifiers (such as Aadhaar or PAN), biometric data, geolocation tracking, IP addresses in persistent databases, or contact books.
            </p>
          </section>

          {/* 3. Purpose of Processing */}
          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs" aria-hidden="true">03</span>
              <span>Purpose &amp; Legal Basis for Processing</span>
            </h2>
            <p>Your academic metrics are processed solely for the following legitimate educational purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Academic Performance Estimation:</strong> Executing mathematical and machine learning regression algorithms to estimate terminal semester marks and expected grade classifications.</li>
              <li><strong>Statutory Detention Warning:</strong> Alerting students when cumulative attendance falls below the university 75% threshold.</li>
              <li><strong>Actionable Study Prescription:</strong> Generating high-priority study milestones (e.g., Numerical Methods revision, practical lab viva preparation) tailored to diagnostic weakness points.</li>
              <li><strong>Local History Persistence:</strong> Enabling students to review previous prediction runs across semesters without re-entering all historical metrics.</li>
            </ul>
          </section>

          {/* 4. Data Storage & MongoDB Disclosure */}
          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs" aria-hidden="true">04</span>
              <span>Data Storage Architecture &amp; Database Implementation</span>
            </h2>
            <p>
              To prevent misunderstanding regarding database storage:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <p>
                <strong>Client-Side Storage:</strong> In the active web application, all user records, saved prediction runs, and checklist statuses are stored exclusively on your device inside browser <code>LocalStorage</code>.
              </p>
              <p>
                <strong>Backend REST Service &amp; MongoDB:</strong> The optional Python FastAPI backend contains database drivers for MongoDB (via <code>backend/db/mongodb.py</code>). When deployed in sandbox or local demonstration mode where a MongoDB URI is not provided or reachable, the backend operates entirely using an in-memory document store. In-memory data is volatile and is completely purged when the server process terminates.
              </p>
              <p>
                <strong>Cloud Data Transmission:</strong> Prediction requests sent to the local API endpoint (/api/v1/predict) execute inference and return the calculation payload immediately. Data is not permanently archived in external cloud databases unless an institutional deployment explicitly configures private MongoDB credentials in a secured server environment.
              </p>
            </div>
          </section>

          {/* 5. Third-Party Sharing & Embeds */}
          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs" aria-hidden="true">05</span>
              <span>Third-Party Services &amp; Embeds</span>
            </h2>
            <p>StudentAI maintains a minimal third-party footprint:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Google Fonts:</strong> Web typography is delivered via Google Fonts (Inter font family and Material Symbols). Google receives standard HTTP request headers (such as IP address and User-Agent) necessary to deliver font assets.</li>
              <li><strong>Demo Avatars:</strong> Profile image placeholders utilize public Google UserContent URLs. No student identity is linked to these static image URLs.</li>
              <li><strong>No Analytics or Ad Trackers:</strong> We do NOT employ Google Analytics, Google Tag Manager, Meta Pixel, Hotjar, or advertising SDKs.</li>
              <li><strong>No Commercial Data Sharing:</strong> We do not sell, rent, trade, or share user academic records with any marketing, recruiting, or commercial entities.</li>
            </ul>
          </section>

          {/* 6. Indian Legal Compliance */}
          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs" aria-hidden="true">06</span>
              <span>Applicable Indian Legal &amp; Regulatory Framework</span>
            </h2>
            <p>
              StudentAI is developed and operated in India. This policy is structured to reflect principles under applicable Indian statutes:
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block">Digital Personal Data Protection Act, 2023 (DPDP Act, 2023)</span>
                <span className="text-slate-600 text-xs block mt-0.5">
                  Notified by the Government of India in the Gazette of India on August 11, 2023. StudentAI aligns with DPDP principles through purpose limitation, explicit consent notice, data minimization, and provision of user rights to access, correction, and erasure.
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block">Information Technology Act, 2000 &amp; SPDI Rules, 2011</span>
                <span className="text-slate-600 text-xs block mt-0.5">
                  In compliance with Rule 4 of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, this policy provides transparent disclosure of collection, purpose, storage, and contact information.
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block">Notice Concerning Minor Students</span>
                <span className="text-slate-600 text-xs block mt-0.5">
                  Pursuant to Section 9 of the DPDP Act 2023, platforms processing personal data of individuals under 18 years require verifiable parental consent. If a student using StudentAI is a minor under Indian law, usage must be undertaken with the knowledge and consent of a parent, guardian, or sponsoring academic institution.
                </span>
              </div>
            </div>
          </section>

          {/* 7. User Rights: Access, Correction & Erasure */}
          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs" aria-hidden="true">07</span>
              <span>Your Rights: Access, Correction &amp; Erasure</span>
            </h2>
            <p>Under the DPDP Act 2023 and IT Rules, you have full control over your data:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Right to Access:</strong> You can review all saved prediction runs, report summaries, and profile parameters directly in the application at any time.</li>
              <li><strong>Right to Correction:</strong> You can update your name, email, target SGPA, and counselor information via the <Link to="/settings" className="text-indigo-600 font-semibold hover:underline">Settings &amp; Profile</Link> page.</li>
              <li><strong>Right to Complete Erasure:</strong> You can wipe all stored predictions, custom profile attributes, and recommendation checklists instantly by navigating to Settings and clicking <em>"Reset Application State to Baseline"</em>, or by clearing your browser's site data/LocalStorage.</li>
            </ul>
          </section>

          {/* 8. Security Measures */}
          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs" aria-hidden="true">08</span>
              <span>Security Safeguards &amp; Data Protection</span>
            </h2>
            <p>
              We implement reasonable security practices appropriate to an educational application:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Client-side data isolation: Each student's records remain isolated in their browser sandbox.</li>
              <li>No hardcoded sensitive production credentials or database passwords committed in client code.</li>
              <li>Transport layer protection: Encrypted HTTPS connections for all asset delivery and API interactions.</li>
              <li>Minimal attack surface: No unnecessary server daemon processes or unauthenticated administrative write interfaces.</li>
            </ul>
          </section>

          {/* 9. Contact & Grievance Redressal */}
          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs" aria-hidden="true">09</span>
              <span>Grievance Officer &amp; Contact Information</span>
            </h2>
            <p>
              For privacy inquiries, rights requests, data erasure assistance, or grievance redressal, please contact:
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <p><strong>Project Developer &amp; Data Coordinator:</strong> Naveen Asundi</p>
              <p><strong>Project:</strong> StudentAI Academic Performance &amp; Result Prediction System</p>
              <p><strong>Location:</strong> Karnataka, India</p>
              <p><strong>Contact Mechanism:</strong> Via GitHub repository issue tracking or LinkedIn profile at <a href="https://www.linkedin.com/in/naveen-asundi-0a75b739/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline">linkedin.com/in/naveen-asundi</a></p>
              <p><strong>Response Timeline:</strong> We aim to acknowledge and address privacy queries within 15 working days.</p>
            </div>
          </section>

        </article>

        {/* Bottom Back Button */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link to="/" className="inline-flex items-center gap-1.5 text-indigo-600 font-bold hover:underline">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_back</span>
            <span>Return to Landing Page</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-slate-900 transition-colors font-medium">Terms &amp; Conditions</Link>
            <Link to="/cookies" className="hover:text-slate-900 transition-colors font-medium">Cookie Policy</Link>
            <Link to="/compliance" className="hover:text-slate-900 transition-colors font-medium">Compliance &amp; Trust Center</Link>
          </div>
        </div>

      </div>
    </div>
  );
};
