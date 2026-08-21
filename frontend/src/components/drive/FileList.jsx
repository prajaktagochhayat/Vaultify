import React from 'react';
import { 
  Folder as FolderIcon, 
  FileText, 
  Star, 
  Download, 
  Share2, 
  Trash2, 
  Eye,
  Edit2
} from 'lucide-react';
import { useDrive } from '../../context/DriveContext';
import { driveService } from '../../services/driveService';
import { useTheme } from '../../context/ThemeContext';

export const FileList = ({ 
  folders = [], 
  files = [], 
  onOpenFolder, 
  onStarFolder, 
  onTrashFolder, 
  onStarFile, 
  onTrashFile 
}) => {
  const { setShareModalItem, setPreviewFile, setRenameModalItem } = useDrive();
  const { isDarkMode } = useTheme();

  const formatFileSize = (bytes) => {
    if (!bytes) return '-';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`rounded-xl border overflow-hidden shadow-sm transition-colors ${
      isDarkMode 
        ? 'bg-[#231B15] border-[#3E2C20]' 
        : 'bg-white border-[#E8D5C1]'
    }`}>
      <table className="w-full text-left text-xs">
        <thead className={`border-b font-bold uppercase tracking-wider ${
          isDarkMode 
            ? 'bg-[#2E231C] border-[#3E2C20] text-gray-400' 
            : 'bg-[#F4ECE1] border-[#E8D5C1] text-gray-600'
        }`}>
          <tr>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Owner</th>
            <th className="py-3 px-4">Last Modified</th>
            <th className="py-3 px-4">File Size</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className={`divide-y ${isDarkMode ? 'divide-[#3E2C20]' : 'divide-[#E8D5C1]'}`}>
          {folders.map((folder) => (
            <tr
              key={`folder-${folder.id}`}
              onDoubleClick={() => onOpenFolder(folder.id)}
              className={`transition-colors cursor-pointer group ${
                isDarkMode ? 'hover:bg-[#2E231C]/60' : 'hover:bg-[#F4ECE1]/60'
              }`}
            >
              <td className={`py-3 px-4 font-semibold flex items-center gap-3 ${
                isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'
              }`}>
                <FolderIcon className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className={isDarkMode ? 'group-hover:text-[#BD9673]' : 'group-hover:text-[#8B5E3C]'}>{folder.name}</span>
              </td>
              <td className="py-3 px-4 text-gray-500">{folder.ownerName || 'Me'}</td>
              <td className="py-3 px-4 text-gray-500">{formatDate(folder.updatedAt)}</td>
              <td className="py-3 px-4 text-gray-500">-</td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setRenameModalItem({ item: folder, type: 'FOLDER' })}
                    className={`p-1.5 rounded-md text-gray-500 ${isDarkMode ? 'hover:bg-[#2E231C]' : 'hover:bg-[#F4ECE1]'}`}
                    title="Rename"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onStarFolder(folder.id)}
                    className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-[#2E231C]' : 'hover:bg-[#F4ECE1]'} ${folder.isStarred ? 'text-amber-500' : 'text-gray-400'}`}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShareModalItem({ item: folder, type: 'FOLDER' })}
                    className={`p-1.5 rounded-md text-gray-500 ${isDarkMode ? 'hover:bg-[#2E231C]' : 'hover:bg-[#F4ECE1]'}`}
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onTrashFolder(folder.id)}
                    className={`p-1.5 rounded-md text-red-600 ${isDarkMode ? 'hover:bg-red-950/30' : 'hover:bg-red-50'}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {files.map((file) => (
            <tr
              key={`file-${file.id}`}
              onDoubleClick={() => setPreviewFile(file)}
              className={`transition-colors cursor-pointer group ${
                isDarkMode ? 'hover:bg-[#2E231C]/60' : 'hover:bg-[#F4ECE1]/60'
              }`}
            >
              <td className={`py-3 px-4 font-semibold flex items-center gap-3 ${
                isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'
              }`}>
                <FileText className={`w-5 h-5 ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`} />
                <span className={isDarkMode ? 'group-hover:text-[#BD9673]' : 'group-hover:text-[#8B5E3C]'}>{file.name}</span>
              </td>
              <td className="py-3 px-4 text-gray-500">{file.ownerName || 'Me'}</td>
              <td className="py-3 px-4 text-gray-500">{formatDate(file.updatedAt)}</td>
              <td className="py-3 px-4 text-gray-500">{formatFileSize(file.size)}</td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setPreviewFile(file)}
                    className={`p-1.5 rounded-md text-gray-500 ${isDarkMode ? 'hover:bg-[#2E231C]' : 'hover:bg-[#F4ECE1]'}`}
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setRenameModalItem({ item: file, type: 'FILE' })}
                    className={`p-1.5 rounded-md text-gray-500 ${isDarkMode ? 'hover:bg-[#2E231C]' : 'hover:bg-[#F4ECE1]'}`}
                    title="Rename"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => driveService.downloadFile(file.id, file.name || file.originalName)}
                    className={`p-1.5 rounded-md text-gray-500 ${isDarkMode ? 'hover:bg-[#2E231C]' : 'hover:bg-[#F4ECE1]'}`}
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onStarFile(file.id)}
                    className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-[#2E231C]' : 'hover:bg-[#F4ECE1]'} ${file.isStarred ? 'text-amber-500' : 'text-gray-400'}`}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShareModalItem({ item: file, type: 'FILE' })}
                    className={`p-1.5 rounded-md text-gray-500 ${isDarkMode ? 'hover:bg-[#2E231C]' : 'hover:bg-[#F4ECE1]'}`}
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onTrashFile(file.id)}
                    className={`p-1.5 rounded-md text-red-600 ${isDarkMode ? 'hover:bg-red-950/30' : 'hover:bg-red-50'}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
