import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenMobile, onCloseMobile }) => {
  const { currentUser, switchRole } = useAuth();

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: 'dashboard' },
    { name: 'Predict Result', path: '/predict', icon: 'auto_graph' },
    { name: 'Prediction History', path: '/history', icon: 'history_edu' },
    { name: 'Academic Analytics', path: '/analytics', icon: 'insights' },
    { name: 'Recommendations', path: '/recommendations', icon: 'psychology_alt' }
  ];

  const secondaryItems = [
    { name: 'Admin Portal', path: '/admin', icon: 'supervisor_account' },
    { name: 'Settings & Profile', path: '/settings', icon: 'settings' }
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs font-black text-sm">
              <span className="material-symbols-outlined text-[20px]">neurology</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-slate-900 leading-none">StudentAI</span>
              <span className="text-[10px] uppercase tracking-wider text-indigo-600 font-bold mt-1">Predictive Intel</span>
            </div>
          </div>
          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Close sidebar"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Semester Tag */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/70">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-slate-600 truncate font-semibold">Spring 2025 • Semester 6</span>
          </div>
        </div>

        {/* Primary Nav Links */}
        <nav className="flex flex-col gap-1 px-3 mt-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isActive ? 'text-indigo-400' : 'text-slate-400'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}

          <div className="my-2 border-t border-slate-100 mx-2"></div>

          {secondaryItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isActive ? 'text-indigo-400' : 'text-slate-400'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Model Engine Status Card & Quick Role Toggle */}
      <div className="p-4 flex flex-col gap-2.5">
        <div className="rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/80 border border-slate-200/80 p-3.5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-indigo-600 text-[18px]">neurology</span>
              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">Model Engine</span>
            </div>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
              v4.2
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            ML Regression &amp; Bayesian network calibrated for 2025 curriculum.
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
            <span className="text-[11px] text-slate-700 font-semibold">Diagnostic Accuracy</span>
            <span className="text-[11px] text-emerald-600 font-bold">94.6%</span>
          </div>
        </div>

        {/* Demo Role Switcher for Placement Presentation */}
        <div className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-slate-100/80 border border-slate-200/60 text-xs">
          <span className="text-slate-500 text-[11px] font-medium">Demo Role:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => switchRole('student')}
              className={`px-2 py-0.5 rounded font-semibold text-[11px] transition-colors ${
                currentUser.role === 'student'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`px-2 py-0.5 rounded font-semibold text-[11px] transition-colors ${
                currentUser.role === 'admin'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Admin/HOD
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200/80 z-50 flex-col justify-between shadow-[1px_0_4px_rgba(0,0,0,0.02)]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
