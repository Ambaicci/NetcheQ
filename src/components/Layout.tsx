"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start closed on mobile
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true); // Auto-open on desktop
      } else {
        setIsSidebarOpen(false); // Auto-close on mobile
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking on a link on mobile
  const handleNavigation = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen">    
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sliding Sidebar */}
      <div
        className={`
          bg-[#0095fd] p-6 text-white relative min-h-screen
          transition-all duration-300 ease-in-out
          flex flex-col z-50
          ${isSidebarOpen ? 'w-64' : 'w-0 p-0 overflow-hidden'}
          ${isMobile ? 'fixed left-0 top-0 h-full' : 'relative'}
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
              onClick={handleNavigation}
              className={`block p-2 rounded hover:bg-[#0085e0] ${
                pathname === '/dashboard' ? 'bg-[#0085e0]' : ''
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/issue"
              onClick={handleNavigation}
              className={`block p-2 rounded hover:bg-[#0085e0] ${
                pathname === '/issue' ? 'bg-[#0085e0]' : ''
              }`}
            >
              Issue Cheque
            </Link>
            <Link
              href="/received"
              onClick={handleNavigation}
              className={`block p-2 rounded hover:bg-[#0085e0] ${
                pathname === '/received' ? 'bg-[#0085e0]' : ''
              }`}
            >
              Received Cheques
            </Link>
            <Link
              href="/history"
              onClick={handleNavigation}
              className={`block p-2 rounded hover:bg-[#0085e0] ${
                pathname === '/history' ? 'bg-[#0085e0]' : ''
              }`}
            >
              History
            </Link>
            <Link
              href="/settings"
              onClick={handleNavigation}
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
              className="w-full p-2 text-left rounded hover:bg-[#0085e0] text-sm"      
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        isMobile && isSidebarOpen ? 'ml-0' : 'ml-0'
      } lg:ml-0`}>
        {/* Mobile menu button */}
        {!isSidebarOpen && isMobile && (
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50 p-2 bg-[#0095fd] text-white rounded lg:hidden"
          >
            <Menu size={20} />
          </button>
        )}
        
        <div className={isMobile ? 'pt-16' : ''}>
          {children}
        </div>
      </div>
    </div>
  );
}
