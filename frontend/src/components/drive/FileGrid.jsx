import React from 'react';
import { FolderCard } from './FolderCard';
import { FileCard } from './FileCard';
import { useTheme } from '../../context/ThemeContext';

export const FileGrid = ({ 
  folders = [], 
  files = [], 
  onOpenFolder, 
  onStarFolder, 
  onTrashFolder, 
  onRenameFolder,
  onStarFile,
  onTrashFile,
  onRenameFile
}) => {
  const { isDarkMode } = useTheme();
  const hasFolders = folders.length > 0;
  const hasFiles = files.length > 0;

  if (!hasFolders && !hasFiles) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-2 text-center">
        <p className={`text-base font-bold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>
          No items found in this directory
        </p>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-[#705A4A]'}`}>
          Upload files or create new folders to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {hasFolders && (
        <div>
          <h2 className={`text-xs font-extrabold uppercase tracking-wider mb-4 ${
            isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'
          }`}>
            Folders ({folders.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {folders.map((folder) => (
              <FolderCard
                key={folder.id}
                folder={folder}
                onOpen={onOpenFolder}
                onStar={onStarFolder}
                onTrash={onTrashFolder}
                onRename={onRenameFolder}
              />
            ))}
          </div>
        </div>
      )}

      {hasFiles && (
        <div>
          <h2 className={`text-xs font-extrabold uppercase tracking-wider mb-4 ${
            isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'
          }`}>
            Files ({files.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {files.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                onStar={onStarFile}
                onTrash={onTrashFile}
                onRename={onRenameFile}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
