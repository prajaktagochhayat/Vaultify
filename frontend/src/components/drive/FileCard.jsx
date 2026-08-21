import React, { useState } from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  Film, 
  Music, 
  FileCode, 
  Archive, 
  File, 
  Star, 
  MoreVertical, 
  Download, 
  Share2, 
  FolderInput, 
  Edit2, 
  Trash2, 
  Eye 
} from 'lucide-react';
import { useDrive } from '../../context/DriveContext';
import { driveService } from '../../services/driveService';
import { useTheme } from '../../context/ThemeContext';

export const FileCard = ({ file, onStar, onTrash, onRename }) => {
  const { setShareModalItem, setPreviewFile, setMoveModalItem } = useDrive();
  const { isDarkMode } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const getFileIcon = (mimeType) => {
    if (!mimeType) return File;
    if (mimeType.startsWith('image/')) return ImageIcon;
    if (mimeType.startsWith('video/')) return Film;
    if (mimeType.startsWith('audio/')) return Music;
    if (mimeType.includes('pdf') || mimeType.includes('word') || mimeType.includes('document')) return FileText;
    if (mimeType.includes('json') || mimeType.includes('javascript') || mimeType.includes('html') || mimeType.includes('css')) return FileCode;
    if (mimeType.includes('zip') || mimeType.includes('tar') || mimeType.includes('compressed')) return Archive;
    return File;
  };

  const getFileBadgeColor = (mimeType) => {
    if (!mimeType) return isDarkMode ? 'bg-[#2E231C] text-gray-300' : 'bg-[#F4ECE1] text-[#70492D]';
    if (mimeType.startsWith('image/')) return isDarkMode ? 'bg-emerald-950/40 text-emerald-400' : 'bg-emerald-50 text-emerald-600';
    if (mimeType.startsWith('video/')) return isDarkMode ? 'bg-purple-950/40 text-purple-400' : 'bg-purple-50 text-purple-600';
    if (mimeType.startsWith('audio/')) return isDarkMode ? 'bg-pink-950/40 text-pink-400' : 'bg-pink-50 text-pink-600';
    if (mimeType.includes('pdf')) return isDarkMode ? 'bg-red-950/40 text-red-400' : 'bg-red-50 text-red-600';
    return isDarkMode ? 'bg-[#2E231C] text-[#BD9673]' : 'bg-[#F4ECE1] text-[#8B5E3C]';
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const IconComponent = getFileIcon(file.mimeType);
  const badgeClass = getFileBadgeColor(file.mimeType);

  return (
    <div
      onDoubleClick={() => setPreviewFile(file)}
      className={`group relative rounded-xl border p-4 hover:shadow-md transition-all flex flex-col justify-between h-40 cursor-pointer ${
        isDarkMode 
          ? 'bg-[#231B15] border-[#3E2C20] hover:border-[#BD9673]' 
          : 'bg-white border-[#E8D5C1] hover:border-[#8B5E3C]'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl ${badgeClass} group-hover:scale-105 transition-transform`}>
          <IconComponent className="w-6 h-6" />
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStar(file.id);
            }}
            className={`p-1.5 rounded-md transition-colors ${
              isDarkMode ? 'hover:bg-[#2E231C]' : 'hover:bg-[#F4ECE1]'
            } ${
              file.isStarred ? 'text-amber-500 fill-amber-500' : 'text-gray-400 opacity-0 group-hover:opacity-100'
            }`}
          >
            <Star className={`w-4 h-4 ${file.isStarred ? 'fill-amber-500' : ''}`} />
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
                    setPreviewFile(file);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 ${
                    isDarkMode ? 'text-[#F7EFE6] hover:bg-[#2E231C]' : 'text-[#3A2010] hover:bg-[#F4ECE1]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Preview
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    driveService.downloadFile(file.id, file.name || file.originalName);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 ${
                    isDarkMode ? 'text-[#F7EFE6] hover:bg-[#2E231C]' : 'text-[#3A2010] hover:bg-[#F4ECE1]'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShareModalItem({ item: file, type: 'FILE' });
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
                    onRename(file);
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
                    setMoveModalItem({ item: file, type: 'FILE' });
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
                    onTrash(file.id);
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

      <div className="mt-4">
        <h4 className={`font-semibold text-xs truncate transition-colors ${
          isDarkMode ? 'text-[#F7EFE6] group-hover:text-[#BD9673]' : 'text-[#3A2010] group-hover:text-[#8B5E3C]'
        }`}>
          {file.name}
        </h4>
        <div className="flex items-center justify-between mt-1 text-[11px] text-gray-400">
          <span>{formatFileSize(file.size)}</span>
          <span>v{file.version || 1}</span>
        </div>
      </div>
    </div>
  );
};
