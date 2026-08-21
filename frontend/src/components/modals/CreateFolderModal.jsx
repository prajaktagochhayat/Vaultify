import React, { useState } from 'react';
import { X, FolderPlus } from 'lucide-react';
import { useDrive } from '../../context/DriveContext';
import { driveService } from '../../services/driveService';
import { useTheme } from '../../context/ThemeContext';

export const CreateFolderModal = () => {
  const { 
    isCreateFolderModalOpen, 
    setIsCreateFolderModalOpen, 
    currentFolderId 
  } = useDrive();
  const { isDarkMode } = useTheme();

  const [folderName, setFolderName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!folderName.trim()) return;

    setLoading(true);
    setError('');

    try {
      await driveService.createFolder(folderName.trim(), currentFolderId);
      setFolderName('');
      setIsCreateFolderModalOpen(false);
      window.dispatchEvent(new Event('refresh_drive'));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create folder');
    } finally {
      setLoading(false);
    }
  };

  if (!isCreateFolderModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className={`rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 border ${
        isDarkMode 
          ? 'bg-[#231B15] border-[#3E2C20]' 
          : 'bg-white border-[#E8D5C1]'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderPlus className={`w-5 h-5 ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`} />
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>New Folder</h3>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateFolderModalOpen(false)}
            className={`p-1 rounded-lg transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-[#2E231C]' : 'text-gray-500 hover:text-gray-700 hover:bg-[#F4ECE1]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs rounded-xl font-medium border border-red-100 dark:border-red-900">
            {error}
          </div>
        )}

        <div>
          <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Folder Name
          </label>
          <input
            type="text"
            placeholder="Untitled folder"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            autoFocus
            className={`w-full px-4 py-2.5 rounded-xl text-xs border focus:outline-none transition-all ${
              isDarkMode 
                ? 'bg-[#1C140E] border-[#3E2C20] text-[#F7EFE6] focus:border-[#BD9673] placeholder-gray-500'
                : 'bg-[#F4ECE1] border-[#E8D5C1] text-[#3A2010] focus:border-[#8B5E3C] placeholder-gray-400'
            }`}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setIsCreateFolderModalOpen(false)}
            className={`px-4 py-2 text-xs font-medium rounded-xl transition-colors ${
              isDarkMode ? 'text-gray-400 hover:bg-[#2E231C]' : 'text-gray-600 hover:bg-[#F4ECE1]'
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !folderName.trim()}
            className={`px-5 py-2 text-xs font-bold text-white rounded-xl shadow-md transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-[#A57750] hover:bg-[#BD9673] disabled:opacity-50' 
                : 'bg-[#8B5E3C] hover:bg-[#70492D] disabled:opacity-50'
            }`}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};
