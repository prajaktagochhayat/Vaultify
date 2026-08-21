import React, { useState, useEffect } from 'react';
import { driveService } from '../services/driveService';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Trash2, RefreshCw, XCircle } from 'lucide-react';

export const TrashPage = () => {
  const { refreshUserData } = useAuth();
  const { isDarkMode } = useTheme();
  const [data, setData] = useState({ folders: [], files: [] });
  const [loading, setLoading] = useState(true);

  const fetchTrash = async () => {
    setLoading(true);
    try {
      const res = await driveService.getTrash();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const handleRestoreFolder = async (id) => {
    await driveService.restoreFolder(id);
    fetchTrash();
  };

  const handleRestoreFile = async (id) => {
    await driveService.restoreFile(id);
    fetchTrash();
  };

  const handleDeletePermanent = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this file? This action cannot be undone.')) {
      await driveService.deleteFilePermanently(id);
      refreshUserData();
      fetchTrash();
    }
  };

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-2 border-b pb-4 ${
        isDarkMode ? 'border-[#3E2C20]' : 'border-[#E8D5C1]'
      }`}>
        <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
        <h2 className={`text-xl font-extrabold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>Trash</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
            isDarkMode ? 'border-[#BD9673]' : 'border-[#8B5E3C]'
          }`}></div>
        </div>
      ) : data.folders.length === 0 && data.files.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3 text-center">
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-[#2E231C]' : 'bg-[#F4ECE1]'}`}>
            <Trash2 className={`w-10 h-10 ${isDarkMode ? 'text-gray-400' : 'text-[#8B5E3C]'}`} />
          </div>
          <p className={`text-base font-bold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>Trash is empty</p>
          <p className={`text-xs max-w-sm ${isDarkMode ? 'text-gray-400' : 'text-[#705A4A]'}`}>
            Items moved to trash will appear here before permanent deletion.
          </p>
        </div>
      ) : (
        <div className={`rounded-xl border overflow-hidden shadow-sm ${
          isDarkMode ? 'bg-[#231B15] border-[#3E2C20]' : 'bg-white border-[#E8D5C1]'
        }`}>
          <table className="w-full text-left text-xs">
            <thead className={`border-b font-bold uppercase tracking-wider ${
              isDarkMode 
                ? 'bg-[#2E231C] border-[#3E2C20] text-gray-400' 
                : 'bg-[#F4ECE1] border-[#E8D5C1] text-gray-600'
            }`}>
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-[#3E2C20]' : 'divide-[#E8D5C1]'}`}>
              {data.folders.map((folder) => (
                <tr key={`folder-${folder.id}`} className={isDarkMode ? 'hover:bg-[#2E231C]/50' : 'hover:bg-[#F4ECE1]/50'}>
                  <td className={`py-3 px-4 font-semibold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>{folder.name}</td>
                  <td className="py-3 px-4 text-gray-500">Folder</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleRestoreFolder(folder.id)}
                      className={`px-3 py-1.5 font-bold text-xs rounded-lg inline-flex items-center gap-1.5 transition-colors ${
                        isDarkMode 
                          ? 'bg-[#2E231C] text-[#BD9673] hover:bg-[#3E2C20]' 
                          : 'bg-[#F4ECE1] text-[#8B5E3C] hover:bg-[#E8D5C1]'
                      }`}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Restore
                    </button>
                  </td>
                </tr>
              ))}

              {data.files.map((file) => (
                <tr key={`file-${file.id}`} className={isDarkMode ? 'hover:bg-[#2E231C]/50' : 'hover:bg-[#F4ECE1]/50'}>
                  <td className={`py-3 px-4 font-semibold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>{file.name}</td>
                  <td className="py-3 px-4 text-gray-500">File</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleRestoreFile(file.id)}
                      className={`px-3 py-1.5 font-bold text-xs rounded-lg inline-flex items-center gap-1.5 transition-colors ${
                        isDarkMode 
                          ? 'bg-[#2E231C] text-[#BD9673] hover:bg-[#3E2C20]' 
                          : 'bg-[#F4ECE1] text-[#8B5E3C] hover:bg-[#E8D5C1]'
                      }`}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Restore
                    </button>
                    <button
                      onClick={() => handleDeletePermanent(file.id)}
                      className="px-3 py-1.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold text-xs rounded-lg inline-flex items-center gap-1.5 transition-colors hover:bg-red-100"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Delete Permanently
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
