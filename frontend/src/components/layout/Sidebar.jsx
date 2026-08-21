import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  HardDrive, 
  Users, 
  Star, 
  Trash2, 
  Activity, 
  Database 
} from 'lucide-react';

export const Sidebar = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();

  const navItems = [
    { name: 'My Vault', path: '/', icon: HardDrive },
    { name: 'Shared with me', path: '/shared', icon: Users },
    { name: 'Starred', path: '/starred', icon: Star },
    { name: 'Trash', path: '/trash', icon: Trash2 },
    { name: 'Activity Log', path: '/activity', icon: Activity },
  ];

  const formatStorage = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const used = user?.storageUsed || 0;
  const quota = user?.storageQuota || 5368709120; // 5GB default
  const percentage = Math.min(100, Math.round((used / quota) * 100));

  return (
    <aside className={`w-64 border-r p-4 flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 select-none shadow-sm transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-[#231B15] border-[#3E2C20]' 
        : 'bg-white border-[#E8D5C1]'
    }`}>
      <div className="space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? (isDarkMode ? 'bg-[#A57750] text-white shadow-sm' : 'bg-[#8B5E3C] text-white shadow-sm')
                    : (isDarkMode ? 'text-[#D4C3B3] hover:bg-[#2E231C]' : 'text-[#3A2010] hover:bg-[#F4ECE1]')
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </NavLink>
          );
        })}
      </div>

      {/* Storage Quota Widget */}
      <div className={`border rounded-2xl p-4 space-y-3 shadow-sm transition-colors ${
        isDarkMode 
          ? 'bg-[#2E231C] border-[#3E2C20]' 
          : 'bg-[#F4ECE1] border-[#E8D5C1]'
      }`}>
        <div className="flex items-center justify-between text-xs font-bold">
          <span className={`flex items-center gap-1.5 ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>
            <Database className={`w-4 h-4 ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`} />
            Vault Storage
          </span>
          <span className={isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}>{percentage}% used</span>
        </div>

        <div className={`w-full rounded-full h-2 overflow-hidden ${isDarkMode ? 'bg-[#1C140E]' : 'bg-[#E8D5C1]'}`}>
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              percentage > 90 ? 'bg-red-500' : percentage > 75 ? 'bg-amber-500' : (isDarkMode ? 'bg-[#A57750]' : 'bg-[#8B5E3C]')
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className={`text-[11px] font-medium ${isDarkMode ? 'text-gray-400' : 'text-[#705A4A]'}`}>
          {formatStorage(used)} of {formatStorage(quota)} used
        </p>
      </div>
    </aside>
  );
};
