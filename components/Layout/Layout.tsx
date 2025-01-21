'use client';
import { usePathname } from 'next/navigation';
import Aside from './Aside';
import Footer from './Footer';
import { ReactNode } from 'react';
import Header from './Header';

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname(); // Get the current route

  // Check if the current route is '/login' or '/signup'
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <div className="flex min-h-screen">
      {/* Conditionally render the Sidebar if it's not the login or signup page */}
      {!isAuthPage && <Aside />}

      {/* Main content - Adjusted to take space next to sidebar */}
      <div className={`flex-1 ${!isAuthPage ? 'ml-64' : ''} flex flex-col`}>
        {/* Header - Fixed at the top */}
        {!isAuthPage && <Header />}

        {/* Main content (children) */}
        <main className="flex-grow overflow-auto" style={{ marginTop: !isAuthPage ? '72px' : '0px' }}>
          {children}
        </main>

        {/* Footer */}
        {!isAuthPage && <Footer />}
      </div>
    </div>
  );
}
