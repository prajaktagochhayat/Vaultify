import React, { useState, useEffect, useCallback } from 'react';
import { useDrive } from '../context/DriveContext';
import { driveService } from '../services/driveService';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { FileGrid } from '../components/drive/FileGrid';
import { FileList } from '../components/drive/FileList';
import { HardDrive, Upload } from 'lucide-react';

export const MyDrivePage = () => {
  const { 
    viewMode, 
    currentFolderId, 
    setCurrentFolderId, 
    searchQuery,
    setIsUploadModalOpen,
    setRenameModalItem
  } = useDrive();
  const { refreshUserData } = useAuth();
  const { isDarkMode } = useTheme();

  const [data, setData] = useState({ folders: [], files: [], breadcrumbs: [] });
  const [loading, setLoading] = useState(true);

  const fetchDriveContents = useCallback(async () => {
    setLoading(true);
    try {
      if (searchQuery.trim()) {
        const searchRes = await driveService.search(searchQuery.trim());
        setData({
          folders: searchRes.folders,
          files: searchRes.files,
          breadcrumbs: []
        });
      } else {
        const res = await driveService.getFolderContents(currentFolderId);
        setData({
          folders: res.folders,
          files: res.files,
          breadcrumbs: res.breadcrumbs
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentFolderId, searchQuery]);

  useEffect(() => {
    fetchDriveContents();

    const handleRefresh = () => fetchDriveContents();
    window.addEventListener('refresh_drive', handleRefresh);
    return () => window.removeEventListener('refresh_drive', handleRefresh);
  }, [fetchDriveContents]);

  // Handlers
  const handleOpenFolder = (folderId) => {
    setCurrentFolderId(folderId);
  };

  const handleStarFolder = async (id) => {
    await driveService.starFolder(id);
    fetchDriveContents();
  };

  const handleTrashFolder = async (id) => {
    await driveService.trashFolder(id);
    fetchDriveContents();
  };

  const handleStarFile = async (id) => {
    await driveService.starFile(id);
    fetchDriveContents();
  };

  const handleTrashFile = async (id) => {
    await driveService.trashFile(id);
    fetchDriveContents();
  };

  const isEmpty = data.folders.length === 0 && data.files.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumbs
          breadcrumbs={data.breadcrumbs}
          onNavigate={(id) => setCurrentFolderId(id)}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
            isDarkMode ? 'border-[#BD9673]' : 'border-[#8B5E3C]'
          }`}></div>
        </div>
      ) : isEmpty ? (
        <div className={`flex flex-col items-center justify-center py-20 text-center space-y-4 max-w-md mx-auto rounded-3xl p-8 border shadow-md transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-[#231B15] border-[#3E2C20]' 
            : 'bg-white border-[#E8D5C1]'
        }`}>
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-[#2E231C] text-[#BD9673]' : 'bg-[#F4ECE1] text-[#8B5E3C]'}`}>
            <HardDrive className="w-10 h-10" />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>Your Vault is Empty</h3>
            <p className="text-xs text-gray-500 mt-1">Upload files to get started with Vaultify!</p>
          </div>

          <div className="flex justify-center w-full pt-2">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className={`py-3 px-6 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isDarkMode 
                  ? 'bg-[#A57750] hover:bg-[#BD9673]' 
                  : 'bg-[#8B5E3C] hover:bg-[#70492D]'
              }`}
            >
              <Upload className="w-4 h-4 text-[#F5ECE0]" />
              Upload Files
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <FileGrid
          folders={data.folders}
          files={data.files}
          onOpenFolder={handleOpenFolder}
          onStarFolder={handleStarFolder}
          onTrashFolder={handleTrashFolder}
          onRenameFolder={(item) => setRenameModalItem({ item, type: 'FOLDER' })}
          onStarFile={handleStarFile}
          onTrashFile={handleTrashFile}
          onRenameFile={(item) => setRenameModalItem({ item, type: 'FILE' })}
        />
      ) : (
        <FileList
          folders={data.folders}
          files={data.files}
          onOpenFolder={handleOpenFolder}
          onStarFolder={handleStarFolder}
          onTrashFolder={handleTrashFolder}
          onStarFile={handleStarFile}
          onTrashFile={handleTrashFile}
        />
      )}
    </div>
  );
};
