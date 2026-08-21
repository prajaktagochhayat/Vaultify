import React, { useState, useEffect } from 'react';
import { X, FolderInput, Folder } from 'lucide-react';
import { useDrive } from '../../context/DriveContext';
import { useTheme } from '../../context/ThemeContext';
import { driveService } from '../../services/driveService';

export const MoveModal = () => {
  const { moveModalItem, setMoveModalItem } = useDrive();
  const { isDarkMode } = useTheme();
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (moveModalItem) {
      driveService.getFolderContents(null).then(data => {
        setFolders(data.folders.filter(f => f.id !== moveModalItem.item.id));
      });
    }
  }, [moveModalItem]);

  if (!moveModalItem) return null;

  const { item, type } = moveModalItem;

  const handleMove = async () => {
    setLoading(true);
    setError('');

    try {
      if (type === 'FILE') {
        await driveService.moveFile(item.id, selectedFolderId);
      } else {
        await driveService.moveFolder(item.id, selectedFolderId);
      }
      setMoveModalItem(null);
      window.dispatchEvent(new Event('refresh_drive'));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to move item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border animate-in fade-in zoom-in-95 ${
        isDarkMode ? 'bg-[#231B15] border-[#3E2C20]' : 'bg-white border-[#E8D5C1]'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderInput className={`w-5 h-5 ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`} />
            <h3 className={`text-lg font-bold truncate max-w-[280px] ${
              isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'
            }`}>Move "{item.name}"</h3>
          </div>
          <button
            onClick={() => setMoveModalItem(null)}
            className={`p-1 rounded-lg transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-[#2E231C]' : 'text-gray-500 hover:text-gray-700 hover:bg-[#F4ECE1]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300 text-xs rounded-xl font-medium border border-red-100 dark:border-red-900">
            {error}
          </div>
        )}

        <div>
          <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Select Destination Folder
          </label>
          <div className={`border rounded-xl overflow-hidden max-h-56 overflow-y-auto divide-y ${
            isDarkMode 
              ? 'border-[#3E2C20] divide-[#3E2C20]' 
              : 'border-[#E8D5C1] divide-[#E8D5C1]/50'
          }`}>
            <button
              onClick={() => setSelectedFolderId(null)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 text-xs font-semibold transition-colors ${
                selectedFolderId === null 
                  ? (isDarkMode ? 'bg-[#2E231C] text-[#BD9673]' : 'bg-[#F4ECE1] text-[#8B5E3C]')
                  : (isDarkMode ? 'hover:bg-[#2E231C]/50 text-gray-300' : 'hover:bg-[#F4ECE1]/40 text-gray-700')
              }`}
            >
              <Folder className={`w-4 h-4 ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`} />
              My Drive (Root)
            </button>
            {folders.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFolderId(f.id)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 text-xs font-semibold transition-colors ${
                  selectedFolderId === f.id 
                    ? (isDarkMode ? 'bg-[#2E231C] text-[#BD9673]' : 'bg-[#F4ECE1] text-[#8B5E3C]')
                    : (isDarkMode ? 'hover:bg-[#2E231C]/50 text-gray-300' : 'hover:bg-[#F4ECE1]/40 text-gray-700')
                }`}
              >
                <Folder className="w-4 h-4 text-amber-500" />
                {f.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => setMoveModalItem(null)}
            className={`px-4 py-2 text-xs font-medium rounded-xl transition-colors ${
              isDarkMode ? 'text-gray-400 hover:bg-[#2E231C]' : 'text-gray-600 hover:bg-[#F4ECE1]'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleMove}
            disabled={loading}
            className={`px-5 py-2 text-xs font-bold text-white rounded-xl shadow-md transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-[#A57750] hover:bg-[#BD9673] disabled:opacity-50' 
                : 'bg-[#8B5E3C] hover:bg-[#70492D] disabled:opacity-50'
            }`}
          >
            {loading ? 'Moving...' : 'Move Here'}
          </button>
        </div>
      </div>
    </div>
  );
};
