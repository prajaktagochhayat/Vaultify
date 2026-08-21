import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { UploadModal } from '../modals/UploadModal';
import { CreateFolderModal } from '../modals/CreateFolderModal';
import { ShareModal } from '../modals/ShareModal';
import { FilePreviewModal } from '../modals/FilePreviewModal';
import { MoveModal } from '../modals/MoveModal';
import { SettingsModal } from '../modals/SettingsModal';
import { RenameModal } from '../modals/RenameModal';
import { useTheme } from '../../context/ThemeContext';

export const MainLayout = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-[#17110D] text-[#F7EFE6]' 
        : 'bg-[#FAF6F0] text-[#3A2010]'
    }`}>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>

      {/* Global Modals */}
      <UploadModal />
      <CreateFolderModal />
      <ShareModal />
      <FilePreviewModal />
      <MoveModal />
      <SettingsModal />
      <RenameModal />
    </div>
  );
};
