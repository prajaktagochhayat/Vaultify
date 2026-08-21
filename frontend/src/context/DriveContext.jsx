import React, { createContext, useContext, useState } from 'react';

const DriveContext = createContext();

export const DriveProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [shareModalItem, setShareModalItem] = useState(null); // { item, type: 'FILE'|'FOLDER' }
  const [previewFile, setPreviewFile] = useState(null);
  const [moveModalItem, setMoveModalItem] = useState(null); // { item, type }
  const [renameModalItem, setRenameModalItem] = useState(null); // { item, type }

  return (
    <DriveContext.Provider value={{
      viewMode,
      setViewMode,
      currentFolderId,
      setCurrentFolderId,
      searchQuery,
      setSearchQuery,
      isUploadModalOpen,
      setIsUploadModalOpen,
      isCreateFolderModalOpen,
      setIsCreateFolderModalOpen,
      isSettingsModalOpen,
      setIsSettingsModalOpen,
      shareModalItem,
      setShareModalItem,
      previewFile,
      setPreviewFile,
      moveModalItem,
      setMoveModalItem,
      renameModalItem,
      setRenameModalItem,
    }}>
      {children}
    </DriveContext.Provider>
  );
};

export const useDrive = () => useContext(DriveContext);
