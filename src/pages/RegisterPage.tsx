import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, updateProfile } = useAuth();

  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [degree, setDegree] = useState('BCA (Bachelor of Computer Applications)');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name || 'Student Applicant',
      rollNumber: rollNo || '1KL22BCA015',
      degree,
      email: email || 'student@university.edu'
    });
    login(email || 'student@university.edu', 'student');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-150">
        
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md font-black">
            <span className="material-symbols-outlined text-[26px]">how_to_reg</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Student Enrollment</h1>
          <p className="text-xs text-slate-500">Register your academic profile for continuous predictive intelligence</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-3.5 text-xs">
          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-800">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Chen"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-800">Roll Number / USN</label>
            <input
              type="text"
              required
              placeholder="e.g. 1KL21CS042"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white font-mono"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-800">Department &amp; Degree Program</label>
            <select
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white cursor-pointer font-semibold"
            >
              <option value="BCA (Bachelor of Computer Applications)">BCA (Bachelor of Computer Applications)</option>
              <option value="B.Tech Computer Science & Engineering">B.Tech Computer Science &amp; Engineering</option>
              <option value="MCA (Master of Computer Applications)">MCA (Master of Computer Applications)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-800">University Email</label>
            <input
              type="email"
              required
              placeholder="name@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-800">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs mt-2"
          >
            Create Student Account
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
          <Link to="/login" className="text-indigo-600 hover:underline font-medium">← Already registered? Log In</Link>
          <Link to="/" className="text-slate-400 hover:underline">Landing</Link>
        </div>

      </div>
    </div>
  );
};
