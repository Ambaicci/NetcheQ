'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react'; // Import useState
import { Menu, X } from 'lucide-react'; // Import icons for open/close

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sliding Sidebar - UPDATED WITH ANIMATION */}
      <div 
        className={`
          bg-[#0095fd] p-6 text-white relative min-h-screen 
          transition-all duration-300 ease-in-out 
          flex flex-col
          ${isSidebarOpen ? 'w-64' : 'w-0 p-0 overflow-hidden'}
        `}
      >
        {/* Header with Toggle Button */}
        <div className="flex items-center justify-between mb-6">
          {isSidebarOpen && <h1 className="text-xl font-bold">NetcheQ</h1>}
          <button 
            onClick={toggleSidebar}
            className="text-white hover:bg-[#0085e0] p-1 rounded"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation Links - Only show when open */}
        {isSidebarOpen && (
          <nav className="space-y-2 flex-1">
            <Link 
              href="/dashboard" 
              className={`block p-2 rounded hover:bg-[#0085e0] ${
                pathname === '/dashboard' ? 'bg-[#0085e0]' : ''
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/issue" 
              className={`block p-2 rounded hover:bg-blue-700 ${
                pathname === '/issue' ? 'bg-[#0085e0]' : ''
              }`}
            >
              Issue Cheque
            </Link>
            <Link 
              href="/received" 
              className={`block p-2 rounded hover:bg-[#0085e0] ${
                pathname === '/received' ? 'bg-[#0085e0]' : ''
              }`}
            >
              Received Cheques
            </Link>
            <Link 
              href="/history" 
              className={`block p-2 rounded hover:bg-[#0085e0] ${
                pathname === '/history' ? 'bg-[#0085e0]' : ''
              }`}
            >
              History
            </Link>
            <Link 
              href="/settings" 
              className={`block p-2 rounded hover:bg-[#0085e0] ${
                pathname === '/settings' ? 'bg-[#0085e0]' : ''
              }`}
            >
              Settings
            </Link>
          </nav>
        )}
        
        {/* Logout button at the bottom - Only show when open */}
        {isSidebarOpen && (
          <div className="absolute bottom-6 left-6 right-6">
            <button 
              onClick={() => { window.location.href = '/'; }}
              className="w-full p-2 text-left rounded hover:bg-blue-700 text-sm"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}