import React, { useState, useEffect } from 'react';
import { X, Edit2 } from 'lucide-react';
import { useDrive } from '../../context/DriveContext';
import { driveService } from '../../services/driveService';
import { useTheme } from '../../context/ThemeContext';

export const RenameModal = () => {
  const { renameModalItem, setRenameModalItem } = useDrive();
  const { isDarkMode } = useTheme();

  const [baseName, setBaseName] = useState('');
  const [extension, setExtension] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (renameModalItem) {
      const item = renameModalItem.item || renameModalItem;
      const isFileItem = renameModalItem.type === 'FILE' || (item && (item.mimeType !== undefined || item.size !== undefined));
      const fullName = item ? (item.name || '') : '';

      if (isFileItem) {
        const lastDotIndex = fullName.lastIndexOf('.');
        if (lastDotIndex > 0) {
          setBaseName(fullName.substring(0, lastDotIndex));
          setExtension(fullName.substring(lastDotIndex));
        } else {
          setBaseName(fullName);
          setExtension('');
        }
      } else {
        setBaseName(fullName);
        setExtension('');
      }
      setError('');
    }
  }, [renameModalItem]);

  if (!renameModalItem) return null;

  const item = renameModalItem.item || renameModalItem;
  const isFile = renameModalItem.type === 'FILE' || (item && (item.mimeType !== undefined || item.size !== undefined));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!baseName.trim()) return;

    setLoading(true);
    setError('');

    try {
      if (isFile) {
        const finalName = `${baseName.trim()}${extension}`;
        await driveService.renameFile(item.id, finalName);
      } else {
        await driveService.renameFolder(item.id, baseName.trim());
      }
      setRenameModalItem(null);
      window.dispatchEvent(new Event('refresh_drive'));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to rename item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className={`rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 border ${
        isDarkMode 
          ? 'bg-[#231B15] border-[#3E2C20]' 
          : 'bg-white border-[#E8D5C1]'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Edit2 className={`w-5 h-5 ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`} />
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>
              {isFile ? 'Rename File' : 'Rename Folder'}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setRenameModalItem(null)}
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
            {isFile ? 'File Name' : 'Folder Name'}
          </label>

          <div className="flex items-center">
            <input
              type="text"
              value={baseName}
              onChange={(e) => setBaseName(e.target.value)}
              autoFocus
              required
              className={`flex-1 px-4 py-2.5 text-xs border focus:outline-none transition-all ${
                isFile && extension ? 'rounded-l-xl border-r-0' : 'rounded-xl'
              } ${
                isDarkMode 
                  ? 'bg-[#1C140E] border-[#3E2C20] text-[#F7EFE6] focus:border-[#BD9673]'
                  : 'bg-[#F4ECE1] border-[#E8D5C1] text-[#3A2010] focus:border-[#8B5E3C]'
              }`}
            />
            {isFile && extension && (
              <span className={`px-3 py-2.5 text-xs font-mono font-bold select-none border rounded-r-xl ${
                isDarkMode 
                  ? 'bg-[#2E231C] border-[#3E2C20] text-[#BD9673]'
                  : 'bg-[#E8D5C1] border-[#E8D5C1] text-[#55341E]'
              }`}>
                {extension}
              </span>
            )}
          </div>
          {isFile && extension && (
            <p className={`text-[11px] mt-1.5 font-medium ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              File format extension <span className="font-mono font-bold text-[#8B5E3C] dark:text-[#BD9673]">{extension}</span> is protected and cannot be altered.
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setRenameModalItem(null)}
            className={`px-4 py-2 text-xs font-medium rounded-xl transition-colors ${
              isDarkMode ? 'text-gray-400 hover:bg-[#2E231C]' : 'text-gray-600 hover:bg-[#F4ECE1]'
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !baseName.trim()}
            className={`px-5 py-2 text-xs font-bold text-white rounded-xl shadow-md transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-[#A57750] hover:bg-[#BD9673] disabled:opacity-50' 
                : 'bg-[#8B5E3C] hover:bg-[#70492D] disabled:opacity-50'
            }`}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};
