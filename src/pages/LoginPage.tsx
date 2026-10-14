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

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Brand */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md font-black">
            <span className="material-symbols-outlined text-[26px]">neurology</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">StudentAI Portal</h1>
          <p className="text-xs text-slate-500">Sign in to your collegiate diagnostic analytics workspace</p>
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
            <label className="font-bold text-slate-800">University Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800">Password</label>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs mt-2"
          >
            Authenticate &amp; Launch
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
          <Link to="/" className="text-indigo-600 hover:underline font-medium">← Back to Overview</Link>
          <span>
            New student? <Link to="/register" className="font-bold text-indigo-600 hover:underline">Register</Link>
          </span>
        </div>

      </div>
    </div>
  );
};
