import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDrive } from '../../context/DriveContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Search, 
  Upload, 
  FolderPlus, 
  Grid, 
  List as ListIcon, 
  LogOut, 
  ShieldCheck, 
  Settings,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, setThemeMode } = useTheme();
  const { 
    viewMode, 
    setViewMode, 
    searchQuery, 
    setSearchQuery,
    setIsUploadModalOpen,
    setIsCreateFolderModalOpen,
    setIsSettingsModalOpen
  } = useDrive();
  
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className={`h-16 px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm transition-colors duration-200 border-b ${
      isDarkMode 
        ? 'bg-[#231B15] border-[#3E2C20]' 
        : 'bg-white border-[#E8D5C1]'
    }`}>
      {/* Left Brand & Logo */}
      <div className="flex items-center gap-3 w-64">
        <div className={`p-2.5 rounded-xl shadow-md flex items-center justify-center ${
          isDarkMode ? 'bg-[#A57750] text-white' : 'bg-[#8B5E3C] text-white'
        }`}>
          <ShieldCheck className="w-5 h-5 text-[#F5ECE0]" />
        </div>
        <div>
          <h1 className={`font-extrabold tracking-tight text-lg flex items-center gap-1.5 ${
            isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'
          }`}>
            Vaultify
          </h1>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${
            isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'
          }`}>Smart Cloud Storage</span>
        </div>
      </div>

      {/* Middle Search Bar */}
      <div className="flex-1 max-w-2xl px-6">
        <div className="relative">
          <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
            isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'
          }`} />
          <input
            type="text"
            placeholder="Search vault, documents, folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none transition-all shadow-inner ${
              isDarkMode 
                ? 'bg-[#1C140E] hover:bg-[#2A1D15] focus:bg-[#231B15] text-[#F7EFE6] border-[#3E2C20] focus:border-[#BD9673] placeholder-[#CBB8A7]'
                : 'bg-[#F4ECE1] hover:bg-[#E8D5C1]/60 focus:bg-white text-[#3A2010] border-[#E8D5C1] focus:border-[#8B5E3C] placeholder-[#705A4A]'
            }`}
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Segmented Light / Dark Mode Switch */}
        <div className={`flex items-center p-1 rounded-xl border shadow-sm ${
          isDarkMode ? 'bg-[#2E231C] border-[#3E2C20]' : 'bg-[#F4ECE1] border-[#E8D5C1]'
        }`}>
          <button
            onClick={() => setThemeMode('light')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              !isDarkMode 
                ? 'bg-white text-[#8B5E3C] shadow-sm' 
                : 'text-gray-400 hover:text-[#F7EFE6]'
            }`}
            title="Switch to Light Mode"
          >
            <Sun className={`w-3.5 h-3.5 ${!isDarkMode ? 'text-[#8B5E3C] fill-[#8B5E3C]/20' : 'text-gray-400'}`} />
            <span>Light</span>
          </button>

          <button
            onClick={() => setThemeMode('dark')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-[#1C140E] text-[#F7EFE6] shadow-sm' 
                : 'text-gray-500 hover:text-[#3A2010]'
            }`}
            title="Switch to Dark Mode"
          >
            <Moon className={`w-3.5 h-3.5 ${isDarkMode ? 'text-amber-400 fill-amber-400/20' : 'text-gray-400'}`} />
            <span>Dark</span>
          </button>
        </div>

        <button
          onClick={() => setIsCreateFolderModalOpen(true)}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold border rounded-xl transition-all cursor-pointer ${
            isDarkMode 
              ? 'text-[#F7EFE6] bg-[#2E231C] hover:bg-[#3E2C20] border-[#3E2C20]'
              : 'text-[#3A2010] bg-[#F4ECE1] hover:bg-[#E8D5C1] border-[#E8D5C1]'
          }`}
        >
          <FolderPlus className={`w-4 h-4 ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`} />
          <span className="hidden sm:inline">New Folder</span>
        </button>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold text-white rounded-xl shadow-md transition-all cursor-pointer ${
            isDarkMode 
              ? 'bg-[#A57750] hover:bg-[#BD9673]' 
              : 'bg-[#8B5E3C] hover:bg-[#70492D]'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span className="hidden sm:inline">Upload</span>
        </button>

        {/* View Toggle */}
        <div className={`flex items-center p-1 rounded-xl border ${
          isDarkMode ? 'bg-[#2E231C] border-[#3E2C20]' : 'bg-[#F4ECE1] border-[#E8D5C1]'
        }`}>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === 'grid' 
                ? (isDarkMode ? 'bg-[#1C140E] text-[#F7EFE6] shadow-sm font-bold' : 'bg-white text-[#8B5E3C] shadow-sm font-bold') 
                : (isDarkMode ? 'text-gray-400 hover:text-[#F7EFE6]' : 'text-gray-500 hover:text-gray-900')
            }`}
            title="Grid View"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === 'list' 
                ? (isDarkMode ? 'bg-[#1C140E] text-[#F7EFE6] shadow-sm font-bold' : 'bg-white text-[#8B5E3C] shadow-sm font-bold') 
                : (isDarkMode ? 'text-gray-400 hover:text-[#F7EFE6]' : 'text-gray-500 hover:text-gray-900')
            }`}
            title="List View"
          >
            <ListIcon className="w-4 h-4" />
          </button>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`flex items-center gap-2 p-1 rounded-full transition-colors focus:outline-none ring-2 ring-transparent hover:ring-[#BD9673] ${
              isDarkMode ? 'hover:bg-[#2E231C]' : 'hover:bg-[#F4ECE1]'
            }`}
          >
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.fullName} className="w-8 h-8 rounded-full border-2 border-[#8B5E3C] object-cover shadow-sm" />
            ) : (
              <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-sm ${
                isDarkMode ? 'bg-[#A57750]' : 'bg-[#8B5E3C]'
              }`}>
                {user?.fullName?.charAt(0) || 'U'}
              </div>
            )}
          </button>

          {showProfileMenu && (
            <div className={`absolute right-0 mt-2 w-60 rounded-2xl shadow-xl border py-2 z-30 animate-in fade-in zoom-in-95 ${
              isDarkMode ? 'bg-[#231B15] border-[#3E2C20]' : 'bg-white border-[#E8D5C1]'
            }`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-[#3E2C20]' : 'border-[#E8D5C1]'}`}>
                <p className={`font-bold text-sm ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>{user?.fullName}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  setIsSettingsModalOpen(true);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                  isDarkMode ? 'text-[#F7EFE6] hover:bg-[#2E231C]' : 'text-[#3A2010] hover:bg-[#F4ECE1]'
                }`}
              >
                <Settings className={`w-4 h-4 ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`} />
                Account Settings
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                }}
                className={`w-full text-left px-4 py-2.5 text-xs font-semibold text-red-600 flex items-center gap-2.5 transition-colors border-t ${
                  isDarkMode ? 'border-[#3E2C20] hover:bg-red-950/30' : 'border-[#E8D5C1] hover:bg-red-50'
                }`}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
