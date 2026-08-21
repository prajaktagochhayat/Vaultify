import React, { useState } from 'react';
import { Folder as FolderIcon, Star, MoreVertical, Share2, FolderInput, Edit2, Trash2 } from 'lucide-react';
import { useDrive } from '../../context/DriveContext';
import { useTheme } from '../../context/ThemeContext';

export const FolderCard = ({ folder, onOpen, onStar, onTrash, onRename }) => {
  const { setShareModalItem, setMoveModalItem } = useDrive();
  const { isDarkMode } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      onDoubleClick={() => onOpen(folder.id)}
      className={`group relative rounded-xl border p-4 hover:shadow-md transition-all cursor-pointer flex items-center justify-between ${
        isDarkMode 
          ? 'bg-[#231B15] border-[#3E2C20] hover:border-[#BD9673]' 
          : 'bg-white border-[#E8D5C1] hover:border-[#8B5E3C]'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className={`p-2.5 rounded-lg group-hover:scale-105 transition-transform ${
          isDarkMode ? 'bg-amber-950/40 text-amber-400' : 'bg-amber-50 text-amber-600'
        }`}>
          <FolderIcon className="w-6 h-6 fill-amber-500 text-amber-500" />
        </div>
        <div className="min-w-0">
          <h3 className={`font-semibold text-xs truncate transition-colors ${
            isDarkMode ? 'text-[#F7EFE6] group-hover:text-[#BD9673]' : 'text-[#3A2010] group-hover:text-[#8B5E3C]'
          }`}>
            {folder.name}
          </h3>
          <p className="text-[10px] text-gray-400">Folder</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStar(folder.id);
          }}
          className={`p-1.5 rounded-md transition-colors ${
            isDarkMode ? 'hover:bg-[#2E231C]' : 'hover:bg-[#F4ECE1]'
          } ${
            folder.isStarred ? 'text-amber-500 fill-amber-500' : 'text-gray-400 opacity-0 group-hover:opacity-100'
          }`}
        >
          <Star className={`w-4 h-4 ${folder.isStarred ? 'fill-amber-500' : ''}`} />
        </button>

        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className={`p-1.5 rounded-md text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ${
              isDarkMode ? 'hover:bg-[#2E231C]' : 'hover:bg-[#F4ECE1]'
            }`}
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showMenu && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute right-0 mt-1 w-44 rounded-lg shadow-xl border py-1 z-30 animate-in fade-in ${
                isDarkMode ? 'bg-[#231B15] border-[#3E2C20]' : 'bg-white border-[#E8D5C1]'
              }`}
            >
              <button
                onClick={() => {
                  setShowMenu(false);
                  setShareModalItem({ item: folder, type: 'FOLDER' });
                }}
                className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 ${
                  isDarkMode ? 'text-[#F7EFE6] hover:bg-[#2E231C]' : 'text-[#3A2010] hover:bg-[#F4ECE1]'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  onRename(folder);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 ${
                  isDarkMode ? 'text-[#F7EFE6] hover:bg-[#2E231C]' : 'text-[#3A2010] hover:bg-[#F4ECE1]'
                }`}
              >
                <Edit2 className="w-3.5 h-3.5" />
                Rename
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  setMoveModalItem({ item: folder, type: 'FOLDER' });
                }}
                className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 ${
                  isDarkMode ? 'text-[#F7EFE6] hover:bg-[#2E231C]' : 'text-[#3A2010] hover:bg-[#F4ECE1]'
                }`}
              >
                <FolderInput className="w-3.5 h-3.5" />
                Move to
              </button>
              <div className={`my-1 border-t ${isDarkMode ? 'border-[#3E2C20]' : 'border-[#E8D5C1]'}`} />
              <button
                onClick={() => {
                  setShowMenu(false);
                  onTrash(folder.id);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs text-red-600 flex items-center gap-2 ${
                  isDarkMode ? 'hover:bg-red-950/30' : 'hover:bg-red-50'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                Move to Trash
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
