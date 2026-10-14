import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { probeBackendStatus, BackendStatus } from '../../services/api';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileSidebar, onOpenSearch }) => {
  const { currentUser, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const [backendStatus, setBackendStatus] = useState<BackendStatus | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    probeBackendStatus().then(setBackendStatus);
    const interval = setInterval(() => {
      probeBackendStatus().then(setBackendStatus);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 z-40 px-4 md:px-6 flex items-center justify-between gap-4">
      {/* Mobile Menu Button & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          aria-label="Open navigation"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        {/* Quick Search Bar */}
        <div
          onClick={onOpenSearch}
          className="relative w-full cursor-pointer group"
        >
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[19px] group-hover:text-indigo-600 transition-colors">
            search
          </span>
          <div className="w-full h-9 pl-9 pr-16 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-400 flex items-center justify-between shadow-2xs group-hover:bg-white group-hover:border-indigo-400 transition-all">
            <span className="truncate">Search modules, risk factors, or roll number...</span>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white rounded border border-slate-200 shadow-2xs">
                Ctrl+K
              </kbd>
            </div>
          </div>
        </div>

        {/* Dynamic Backend Status Indicator */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50/80 border border-indigo-100 shrink-0">
          <span
            className={`flex h-1.5 w-1.5 rounded-full ${
              backendStatus?.isLive ? 'bg-emerald-500 animate-pulse' : 'bg-indigo-600'
            }`}
          />
          <span className="text-[11px] font-semibold text-indigo-700 tracking-wide">
            {backendStatus?.isLive
              ? 'FastAPI ML Backend Live Synced'
              : 'Illustrative AI Estimates Active'}
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <Link
          to="/predict"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all text-xs font-semibold shadow-xs"
        >
          <span className="material-symbols-outlined text-[17px]">add_circle</span>
          <span className="hidden sm:inline">+ New Prediction</span>
          <span className="sm:hidden">+ Run</span>
        </Link>

        <div className="h-4 w-[1px] bg-slate-200 mx-0.5 hidden sm:block"></div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            type="button"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Academic Alerts</span>
                <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-1.5 py-0.5 rounded border border-rose-200">2 New</span>
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <div className="p-2 rounded-lg bg-indigo-50/60 border border-indigo-100 flex items-start gap-2">
                  <span className="material-symbols-outlined text-indigo-600 text-[16px] shrink-0 mt-0.5">verified_user</span>
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-800">Prediction Report Synced</span>
                    <span className="text-slate-500 text-[11px]">Semester 6 outcome calculated at 82/100 (Grade A).</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-100 flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-600 text-[16px] shrink-0 mt-0.5">warning</span>
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-800">Mathematics IV Lab Viva</span>
                    <span className="text-slate-500 text-[11px]">Saturday session recommended to elevate viva score.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2.5 pl-1 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <img
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200"
              src={currentUser.avatarUrl}
            />
            <div className="hidden md:flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-slate-800">{currentUser.name}</span>
              <span className="text-[11px] text-slate-400">{currentUser.title}</span>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[18px] hidden md:block">
              expand_more
            </span>
          </button>

          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 p-2 z-50 text-xs">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <div className="font-bold text-slate-800">{currentUser.name}</div>
                <div className="text-slate-400 text-[11px] truncate">{currentUser.email}</div>
                <div className="mt-1 inline-flex items-center px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                  Role: {currentUser.role === 'admin' ? 'Faculty Admin' : 'Student (Sem 6)'}
                </div>
              </div>

              <button
                onClick={() => {
                  switchRole(currentUser.role === 'student' ? 'admin' : 'student');
                  setUserDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-between"
              >
                <span>Switch to {currentUser.role === 'student' ? 'Admin View' : 'Student View'}</span>
                <span className="material-symbols-outlined text-[16px] text-indigo-600">swap_horiz</span>
              </button>

              <Link
                to="/settings"
                onClick={() => setUserDropdownOpen(false)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-between"
              >
                <span>Profile &amp; Settings</span>
                <span className="material-symbols-outlined text-[16px] text-slate-400">settings</span>
              </Link>

              <div className="my-1 border-t border-slate-100"></div>

              <button
                onClick={() => {
                  logout();
                  setUserDropdownOpen(false);
                  navigate('/login');
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 font-medium flex items-center justify-between"
              >
                <span>Sign Out</span>
                <span className="material-symbols-outlined text-[16px]">logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
