// src/components/DashboardHeader.tsx
import { Search, Bell, Settings, LogOut } from 'lucide-react';
import { authService } from '../services/api/authService';
import { useState } from 'react';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  userName: string;
  userRole: string;
  searchPlaceholder?: string;
}

export const DashboardHeader = ({ 
  title, 
  subtitle, 
  userName, 
  userRole,
  searchPlaceholder = "Buscar..." 
}: DashboardHeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      authService.logout();
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 transition-colors"
              >
                <img 
                  src={`https://ui-avatars.com/api/?name=${userName}&background=3b82f6&color=fff`} 
                  alt={userName} 
                  className="w-10 h-10 rounded-full" 
                />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500">{userRole}</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};