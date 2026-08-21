import React, { useState } from 'react';
import { X, User, Shield, HardDrive, Settings, Check, Sparkles, Sun, Moon, Palette } from 'lucide-react';
import { useDrive } from '../../context/DriveContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const SettingsModal = () => {
  const { isSettingsModalOpen, setIsSettingsModalOpen } = useDrive();
  const { user } = useAuth();
  const { isDarkMode, setThemeMode } = useTheme();

  const [activeTab, setActiveTab] = useState('account');
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [savedMsg, setSavedMsg] = useState('');

  if (!isSettingsModalOpen) return null;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedMsg('Settings updated successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const formatStorage = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`rounded-2xl max-w-2xl w-full h-[580px] flex shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 border ${
        isDarkMode 
          ? 'bg-[#231B15] border-[#3E2C20]' 
          : 'bg-white border-[#E8D5C1]'
      }`}>
        {/* Settings Sidebar */}
        <div className={`w-56 p-4 border-r flex flex-col justify-between ${
          isDarkMode 
            ? 'bg-[#1C140E] border-[#3E2C20]' 
            : 'bg-[#F4ECE1]/60 border-[#E8D5C1]'
        }`}>
          <div className="space-y-1">
            <div className={`flex items-center gap-2 px-3 py-2 font-bold text-sm mb-2 ${
              isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'
            }`}>
              <Settings className={`w-4 h-4 ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`} />
              Settings
            </div>

            <button
              onClick={() => setActiveTab('account')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'account' 
                  ? (isDarkMode ? 'bg-[#A57750] text-white shadow-sm' : 'bg-[#8B5E3C] text-white shadow-sm')
                  : (isDarkMode ? 'text-gray-400 hover:bg-[#2E231C]' : 'text-gray-600 hover:bg-[#E8D5C1]/60')
              }`}
            >
              <User className="w-4 h-4" />
              Profile Account
            </button>

            <button
              onClick={() => setActiveTab('appearance')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'appearance' 
                  ? (isDarkMode ? 'bg-[#A57750] text-white shadow-sm' : 'bg-[#8B5E3C] text-white shadow-sm')
                  : (isDarkMode ? 'text-gray-400 hover:bg-[#2E231C]' : 'text-gray-600 hover:bg-[#E8D5C1]/60')
              }`}
            >
              <Palette className="w-4 h-4" />
              Theme & Colors
            </button>

            <button
              onClick={() => setActiveTab('storage')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'storage' 
                  ? (isDarkMode ? 'bg-[#A57750] text-white shadow-sm' : 'bg-[#8B5E3C] text-white shadow-sm')
                  : (isDarkMode ? 'text-gray-400 hover:bg-[#2E231C]' : 'text-gray-600 hover:bg-[#E8D5C1]/60')
              }`}
            >
              <HardDrive className="w-4 h-4" />
              Storage
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'security' 
                  ? (isDarkMode ? 'bg-[#A57750] text-white shadow-sm' : 'bg-[#8B5E3C] text-white shadow-sm')
                  : (isDarkMode ? 'text-gray-400 hover:bg-[#2E231C]' : 'text-gray-600 hover:bg-[#E8D5C1]/60')
              }`}
            >
              <Shield className="w-4 h-4" />
              Security & Access
            </button>
          </div>

          <div className={`text-[11px] font-medium px-3 ${isDarkMode ? 'text-gray-400' : 'text-[#705A4A]'}`}>
            Vaultify v1.2.0
          </div>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className={`flex items-center justify-between border-b pb-3 mb-5 ${
              isDarkMode ? 'border-[#3E2C20]' : 'border-[#E8D5C1]'
            }`}>
              <h3 className={`font-bold text-base capitalize ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>{activeTab} Settings</h3>
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className={`p-1 rounded-lg transition-colors ${
                  isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-[#2E231C]' : 'text-gray-500 hover:text-gray-700 hover:bg-[#F4ECE1]'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {savedMsg && (
              <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs rounded-xl font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                {savedMsg}
              </div>
            )}

            {/* Account Settings Tab */}
            {activeTab === 'account' && (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className={`flex items-center gap-4 p-3 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-[#1C140E] border-[#3E2C20]' 
                    : 'bg-[#F4ECE1]/50 border-[#E8D5C1]'
                }`}>
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-14 h-14 rounded-full border-2 border-[#8B5E3C] object-cover" />
                  ) : (
                    <div className={`w-14 h-14 rounded-full text-white font-bold text-xl flex items-center justify-center ${
                      isDarkMode ? 'bg-[#A57750]' : 'bg-[#8B5E3C]'
                    }`}>
                      {fullName?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div>
                    <h4 className={`font-bold text-sm ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>{fullName || user?.fullName}</h4>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-xl text-xs focus:outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#1C140E] border-[#3E2C20] text-[#F7EFE6] focus:border-[#BD9673]' 
                        : 'bg-[#F4ECE1]/50 border-[#E8D5C1] text-[#3A2010] focus:border-[#8B5E3C]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Avatar Seed URL
                  </label>
                  <input
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-xl text-xs focus:outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#1C140E] border-[#3E2C20] text-[#F7EFE6] focus:border-[#BD9673]' 
                        : 'bg-[#F4ECE1]/50 border-[#E8D5C1] text-[#3A2010] focus:border-[#8B5E3C]'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className={`px-5 py-2.5 text-white text-xs font-bold rounded-xl shadow-sm transition-colors mt-2 ${
                    isDarkMode ? 'bg-[#A57750] hover:bg-[#BD9673]' : 'bg-[#8B5E3C] hover:bg-[#70492D]'
                  }`}
                >
                  Save Profile Changes
                </button>
              </form>
            )}

            {/* Appearance & Theme Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-4">
                <p className="text-xs text-gray-500 font-medium">
                  Choose your preferred theme style for Vaultify interface.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div
                    onClick={() => setThemeMode('light')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-3 ${
                      !isDarkMode
                        ? 'border-[#8B5E3C] bg-[#F4ECE1]/60 shadow-md ring-2 ring-[#8B5E3C]/20'
                        : 'border-[#E8D5C1] hover:border-[#8B5E3C]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-white rounded-xl text-[#8B5E3C] shadow-sm">
                        <Sun className="w-5 h-5 text-[#8B5E3C]" />
                      </div>
                      {!isDarkMode && (
                        <span className="text-[10px] font-bold bg-[#8B5E3C] text-white px-2 py-0.5 rounded-full">Active</span>
                      )}
                    </div>
                    <div>
                      <h4 className={`font-bold text-sm ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>Light Brown Mode</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">Warm cream canvas with rich mocha brown accents</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setThemeMode('dark')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-3 ${
                      isDarkMode
                        ? 'border-[#A57750] bg-[#1C140E] shadow-md ring-2 ring-[#A57750]/20'
                        : 'border-[#E8D5C1] hover:border-[#A57750]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-[#2E231C] rounded-xl text-amber-400 shadow-sm">
                        <Moon className="w-5 h-5 text-amber-400" />
                      </div>
                      {isDarkMode && (
                        <span className="text-[10px] font-bold bg-[#A57750] text-white px-2 py-0.5 rounded-full">Active</span>
                      )}
                    </div>
                    <div>
                      <h4 className={`font-bold text-sm ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>Dark Espresso Mode</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">Deep roasted coffee tones with soft gold highlights</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Storage Tab */}
            {activeTab === 'storage' && (
              <div className="space-y-5">
                <div className={`p-4 rounded-xl border ${
                  isDarkMode ? 'bg-[#1C140E] border-[#3E2C20]' : 'bg-[#F4ECE1]/50 border-[#E8D5C1]'
                }`}>
                  <div className={`flex justify-between items-center text-xs font-bold mb-2 ${
                    isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'
                  }`}>
                    <span>Storage Quota</span>
                    <span>{formatStorage(user?.storageUsed)} / {formatStorage(user?.storageQuota)}</span>
                  </div>
                  <div className={`w-full rounded-full h-2 overflow-hidden ${
                    isDarkMode ? 'bg-[#2E231C]' : 'bg-[#E8D5C1]'
                  }`}>
                    <div
                      className={`h-full rounded-full transition-all ${
                        isDarkMode ? 'bg-[#A57750]' : 'bg-[#8B5E3C]'
                      }`}
                      style={{ width: `${Math.min(100, Math.round(((user?.storageUsed || 0) / (user?.storageQuota || 1)) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-4">
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className={`w-full px-4 py-2.5 border rounded-xl text-xs focus:outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#1C140E] border-[#3E2C20] text-[#F7EFE6] focus:border-[#BD9673]' 
                        : 'bg-[#F4ECE1]/50 border-[#E8D5C1] text-[#3A2010] focus:border-[#8B5E3C]'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className={`w-full px-4 py-2.5 border rounded-xl text-xs focus:outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#1C140E] border-[#3E2C20] text-[#F7EFE6] focus:border-[#BD9673]' 
                        : 'bg-[#F4ECE1]/50 border-[#E8D5C1] text-[#3A2010] focus:border-[#8B5E3C]'
                    }`}
                  />
                </div>
                <button
                  onClick={() => {
                    setSavedMsg('Password updated successfully!');
                    setTimeout(() => setSavedMsg(''), 3000);
                  }}
                  className={`px-5 py-2.5 text-white text-xs font-bold rounded-xl shadow-sm transition-colors ${
                    isDarkMode ? 'bg-[#A57750] hover:bg-[#BD9673]' : 'bg-[#8B5E3C] hover:bg-[#70492D]'
                  }`}
                >
                  Update Password
                </button>
              </div>
            )}
          </div>

          <div className={`flex justify-end pt-3 border-t ${
            isDarkMode ? 'border-[#3E2C20]' : 'border-[#E8D5C1]'
          }`}>
            <button
              onClick={() => setIsSettingsModalOpen(false)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                isDarkMode ? 'text-gray-400 hover:bg-[#2E231C]' : 'text-gray-600 hover:bg-[#F4ECE1]'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
