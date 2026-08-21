import React, { useState, useEffect } from 'react';
import { useDrive } from '../context/DriveContext';
import { useTheme } from '../context/ThemeContext';
import { driveService } from '../services/driveService';
import { FileGrid } from '../components/drive/FileGrid';
import { FileList } from '../components/drive/FileList';
import { Users } from 'lucide-react';

export const SharedWithMePage = () => {
  const { viewMode } = useDrive();
  const { isDarkMode } = useTheme();
  const [data, setData] = useState({ folders: [], files: [] });
  const [loading, setLoading] = useState(true);

  const fetchShared = async () => {
    setLoading(true);
    try {
      const res = await driveService.getSharedWithMe();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShared();
  }, []);

  const hasItems = data.folders.length > 0 || data.files.length > 0;

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-2.5 border-b pb-4 ${
        isDarkMode ? 'border-[#3E2C20]' : 'border-[#E8D5C1]'
      }`}>
        <Users className={`w-6 h-6 ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`} />
        <h2 className={`text-xl font-extrabold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>Shared with me</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
            isDarkMode ? 'border-[#BD9673]' : 'border-[#8B5E3C]'
          }`}></div>
        </div>
      ) : !hasItems ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3 text-center">
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-[#2E231C]' : 'bg-[#F4ECE1]'}`}>
            <Users className={`w-10 h-10 ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`} />
          </div>
          <p className={`text-base font-bold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>No items shared with you yet</p>
          <p className={`text-xs max-w-sm ${isDarkMode ? 'text-gray-400' : 'text-[#705A4A]'}`}>
            Files and folders that other users share with your email address will appear here.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <FileGrid
          folders={data.folders}
          files={data.files}
          onOpenFolder={() => {}}
          onStarFolder={() => {}}
          onTrashFolder={() => {}}
          onRenameFolder={() => {}}
          onStarFile={() => {}}
          onTrashFile={() => {}}
          onRenameFile={() => {}}
        />
      ) : (
        <FileList
          folders={data.folders}
          files={data.files}
          onOpenFolder={() => {}}
          onStarFolder={() => {}}
          onTrashFolder={() => {}}
          onStarFile={() => {}}
          onTrashFile={() => {}}
        />
      )}
    </div>
  );
};
