import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CommandPalette } from './CommandPalette';

export const AppLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Sidebar
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="md:pl-64 flex flex-col min-h-screen">
        <Header
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
        />

        <main className="pt-16 flex-1 w-full flex flex-col">
          <Outlet />
        </main>

        {/* Institutional Shell Footer */}
        <footer className="border-t border-slate-200/90 bg-white/80 py-4 px-6 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-800">StudentAI v4.2</span>
              <span>•</span>
              <span className="text-[11px] text-slate-500">ML Estimates for Diagnostic Planning Only</span>
              <span>•</span>
              <span className="text-[11px] text-slate-500">Apache 2.0</span>
            </div>

            <nav aria-label="Legal footer" className="flex items-center gap-4 text-xs font-medium">
              <Link to="/privacy" className="text-slate-600 hover:text-indigo-600 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-slate-600 hover:text-indigo-600 transition-colors">
                Terms &amp; Conditions
              </Link>
              <Link to="/cookies" className="text-slate-600 hover:text-indigo-600 transition-colors">
                Cookie Policy
              </Link>
              <Link to="/compliance" className="text-slate-600 hover:text-indigo-600 transition-colors">
                Compliance Center
              </Link>
            </nav>
          </div>
        </footer>
      </div>

      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
};
