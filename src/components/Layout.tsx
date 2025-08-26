'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 p-6 text-white relative min-h-screen">
        <h1 className="text-xl font-bold mb-6">NetcheQ</h1>
        <nav className="space-y-2">
          <Link 
            href="/dashboard" 
            className={`block p-2 rounded hover:bg-slate-700 ${
              pathname === '/dashboard' ? 'bg-slate-700' : ''
            }`}
          >
            Dashboard
          </Link>
          <Link 
            href="/issue" 
            className={`block p-2 rounded hover:bg-slate-700 ${
              pathname === '/issue' ? 'bg-slate-700' : ''
            }`}
          >
            Issue Cheque
          </Link>
          <Link 
            href="/received" 
            className={`block p-2 rounded hover:bg-slate-700 ${
              pathname === '/received' ? 'bg-slate-700' : ''
            }`}
          >
            Received Cheques
          </Link>
          <Link 
            href="/history" 
            className={`block p-2 rounded hover:bg-slate-700 ${
              pathname === '/history' ? 'bg-slate-700' : ''
            }`}
          >
            History
          </Link>
          <Link 
            href="/settings" 
            className={`block p-2 rounded hover:bg-slate-700 ${
              pathname === '/settings' ? 'bg-slate-700' : ''
            }`}
          >
            Settings
          </Link>
        </nav>
        
        {/* Logout button at the bottom */}
        <div className="absolute bottom-6 left-6 right-6">
          <button 
            onClick={() => {
              window.location.href = '/';
            }}
            className="w-full p-2 text-left rounded hover:bg-slate-700 text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}