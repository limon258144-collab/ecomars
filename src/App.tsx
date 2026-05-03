/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Storefront from './components/Storefront';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [view, setView] = useState<'store' | 'admin'>('store');
  const [user, setUser] = useState<{ name: string; role: 'user' | 'admin'; email?: string; phone?: string; address?: string } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setView('store');
  };

  const handleUpdateProfile = (data: { phone: string; address: string }) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`antialiased font-sans ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
        {view === 'store' ? (
          <Storefront 
            user={user}
            onLogin={(userData) => setUser({ ...userData, email: 'limon@example.com' })}
            onLogout={handleLogout}
            onUpdateProfile={handleUpdateProfile}
            onOpenAdmin={() => setView('admin')} 
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        ) : (
          <AdminDashboard 
            user={user}
            onLogout={handleLogout}
            onBackToStore={() => setView('store')} 
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        )}
      </div>
    </div>
  );
}
