import React, { useState, useEffect } from 'react';
import { useDrive } from '../context/DriveContext';
import { useTheme } from '../context/ThemeContext';
import { driveService } from '../services/driveService';
import { FileGrid } from '../components/drive/FileGrid';
import { FileList } from '../components/drive/FileList';
import { Star } from 'lucide-react';

export const StarredPage = () => {
  const { viewMode } = useDrive();
  const { isDarkMode } = useTheme();
  const [data, setData] = useState({ folders: [], files: [] });
  const [loading, setLoading] = useState(true);

  const fetchStarred = async () => {
    setLoading(true);
    try {
      const res = await driveService.getStarred();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStarred();
  }, []);

  const hasItems = data.folders.length > 0 || data.files.length > 0;

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-2 border-b pb-4 ${
        isDarkMode ? 'border-[#3E2C20]' : 'border-[#E8D5C1]'
      }`}>
        <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
        <h2 className={`text-xl font-extrabold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>Starred Items</h2>
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
            <Star className="w-10 h-10 text-amber-500 fill-amber-500" />
          </div>
          <p className={`text-base font-bold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>No starred items</p>
          <p className={`text-xs max-w-sm ${isDarkMode ? 'text-gray-400' : 'text-[#705A4A]'}`}>
            Add stars to files and folders that you want to easily find later.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <FileGrid
          folders={data.folders}
          files={data.files}
          onOpenFolder={() => {}}
          onStarFolder={async (id) => {
            await driveService.starFolder(id);
            fetchStarred();
          }}
          onTrashFolder={async (id) => {
            await driveService.trashFolder(id);
            fetchStarred();
          }}
          onRenameFolder={() => {}}
          onStarFile={async (id) => {
            await driveService.starFile(id);
            fetchStarred();
          }}
          onTrashFile={async (id) => {
            await driveService.trashFile(id);
            fetchStarred();
          }}
          onRenameFile={() => {}}
        />
      ) : (
        <FileList
          folders={data.folders}
          files={data.files}
          onOpenFolder={() => {}}
          onStarFolder={async (id) => {
            await driveService.starFolder(id);
            fetchStarred();
          }}
          onTrashFolder={async (id) => {
            await driveService.trashFolder(id);
            fetchStarred();
          }}
          onStarFile={async (id) => {
            await driveService.starFile(id);
            fetchStarred();
          }}
          onTrashFile={async (id) => {
            await driveService.trashFile(id);
            fetchStarred();
          }}
        />
      )}
    </div>
  );
};
