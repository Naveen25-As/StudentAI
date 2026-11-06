import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('alex.chen@university.edu');
  const [password, setPassword] = useState('student2025');
  const [role, setRole] = useState<'student' | 'admin'>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    navigate('/dashboard');
  };

  const handleDemoFill = (selectedRole: 'student' | 'admin') => {
    setRole(selectedRole);
    if (selectedRole === 'student') {
      setEmail('alex.chen@university.edu');
      setPassword('student2025');
    } else {
      setEmail('sarah.jenkins@university.edu');
      setPassword('faculty2025');
    }
  };

  const [recoveryModalOpen, setRecoveryModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Brand */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md font-black" aria-hidden="true">
            <span className="material-symbols-outlined text-[26px]">neurology</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">StudentAI Portal</h1>
          <p className="text-xs text-slate-600">Sign in to your collegiate diagnostic analytics workspace</p>
        </div>

        {/* Demo Fast Fill Buttons */}
        <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex flex-col gap-2">
          <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wide">
            Placement Demonstration Quick-Fill:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill('student')}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                role === 'student'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Student (Alex Chen)
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('admin')}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                role === 'admin'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Faculty (Prof. Jenkins)
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-email" className="font-bold text-slate-800">University Email Address</label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="login-password" className="font-bold text-slate-800">Password</label>
              <button
                type="button"
                onClick={() => setRecoveryModalOpen(true)}
                className="text-[11px] text-indigo-600 hover:underline font-semibold"
              >
                Need password help?
              </button>
            </div>
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs mt-2 focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            Authenticate &amp; Launch
          </button>
        </form>

        <div className="text-center text-xs text-slate-600 pt-2 border-t border-slate-100 flex items-center justify-between">
          <Link to="/" className="text-indigo-600 hover:underline font-semibold">← Back to Overview</Link>
          <span>
            New student? <Link to="/register" className="font-bold text-indigo-600 hover:underline">Register</Link>
          </span>
        </div>

        {/* Legal links in login footer */}
        <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 pt-1">
          <Link to="/privacy" className="hover:text-slate-800 transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms" className="hover:text-slate-800 transition-colors">Terms of Use</Link>
          <span>•</span>
          <Link to="/compliance" className="hover:text-slate-800 transition-colors">Trust Center</Link>
        </div>

      </div>

      {/* Password Recovery / Demo Access Modal */}
      {recoveryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-sm w-full p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600 text-[20px]" aria-hidden="true">key</span>
                <h2 className="text-sm font-bold text-slate-900">Account Access &amp; Demo Credentials</h2>
              </div>
              <button
                type="button"
                onClick={() => setRecoveryModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">close</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              StudentAI runs in local educational demonstration mode. You can sign in using either of the following verified credentials:
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>Student Profile:</span>
                  <span className="font-mono text-indigo-700">alex.chen@university.edu</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Default Password:</span>
                  <span className="font-mono text-slate-700">student2025</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>Faculty Counselor:</span>
                  <span className="font-mono text-indigo-700">sarah.jenkins@university.edu</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Default Password:</span>
                  <span className="font-mono text-slate-700">faculty2025</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                handleDemoFill('student');
                setRecoveryModalOpen(false);
              }}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              Fill Student Credentials &amp; Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
