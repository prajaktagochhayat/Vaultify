import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, CheckCircle2, AlertCircle, File, Check } from 'lucide-react';
import { useDrive } from '../../context/DriveContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { driveService } from '../../services/driveService';

export const UploadModal = () => {
  const { isUploadModalOpen, setIsUploadModalOpen, currentFolderId } = useDrive();
  const { refreshUserData } = useAuth();
  const { isDarkMode } = useTheme();

  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [error, setError] = useState('');

  const handleClose = () => {
    setIsUploadModalOpen(false);
    setUploadingFiles([]);
    window.dispatchEvent(new Event('refresh_drive'));
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    setError('');
    const newItems = acceptedFiles.map(file => ({
      file,
      name: file.name,
      progress: 0,
      status: 'uploading'
    }));

    setUploadingFiles(prev => [...prev, ...newItems]);

    for (let item of newItems) {
      try {
        await driveService.uploadFile(
          item.file,
          currentFolderId,
          (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadingFiles(prev => prev.map(f => f.name === item.name ? { ...f, progress: percentCompleted } : f));
          }
        );
        setUploadingFiles(prev => prev.map(f => f.name === item.name ? { ...f, status: 'completed', progress: 100 } : f));
        refreshUserData();
        window.dispatchEvent(new Event('refresh_drive'));
      } catch (err) {
        setUploadingFiles(prev => prev.map(f => f.name === item.name ? { ...f, status: 'error', errorMsg: err.response?.data?.message || 'Upload failed' } : f));
      }
    }
  }, [currentFolderId, refreshUserData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (!isUploadModalOpen) return null;

  const allCompleted = uploadingFiles.length > 0 && uploadingFiles.every(f => f.status === 'completed' || f.status === 'error');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 border animate-in fade-in zoom-in-95 ${
        isDarkMode 
          ? 'bg-[#231B15] border-[#3E2C20]' 
          : 'bg-white border-[#E8D5C1]'
      }`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>Upload Files</h3>
          <button
            onClick={handleClose}
            className={`p-1 rounded-lg transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-[#2E231C]' : 'text-gray-500 hover:text-gray-700 hover:bg-[#F4ECE1]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drop Zone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragActive
              ? isDarkMode ? 'border-[#BD9673] bg-[#2E231C] scale-[1.01]' : 'border-[#8B5E3C] bg-[#F4ECE1]/80 scale-[1.01]'
              : isDarkMode 
                ? 'border-[#3E2C20] hover:border-[#BD9673] hover:bg-[#2E231C]/60'
                : 'border-[#E8D5C1] hover:border-[#8B5E3C] hover:bg-[#F4ECE1]/40'
          }`}
        >
          <input {...getInputProps()} />
          <div className={`p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 ${
            isDarkMode ? 'bg-[#2E231C] text-[#BD9673]' : 'bg-[#F4ECE1] text-[#8B5E3C]'
          }`}>
            <Upload className="w-6 h-6" />
          </div>
          <p className={`text-sm font-semibold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>
            {isDragActive ? 'Drop the files here...' : 'Drag & drop files here, or click to browse'}
          </p>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Supports any file format up to 100MB</p>
        </div>

        {/* Upload Progress Queue */}
        {uploadingFiles.length > 0 && (
          <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Upload Queue</h4>
            {uploadingFiles.map((item, index) => (
              <div key={index} className={`rounded-lg p-3 border text-xs space-y-2 ${
                isDarkMode 
                  ? 'bg-[#2E231C] border-[#3E2C20]' 
                  : 'bg-[#F4ECE1]/50 border-[#E8D5C1]'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`font-medium truncate max-w-[240px] flex items-center gap-2 ${
                    isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'
                  }`}>
                    <File className={`w-4 h-4 ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`} />
                    {item.name}
                  </span>
                  {item.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                  {item.status === 'error' && <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />}
                  {item.status === 'uploading' && <span className={`font-semibold ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`}>{item.progress}%</span>}
                </div>
                <div className={`w-full rounded-full h-1.5 overflow-hidden ${
                  isDarkMode ? 'bg-[#1C140E]' : 'bg-[#E8D5C1]'
                }`}>
                  <div
                    className={`h-full transition-all ${
                      item.status === 'completed' ? 'bg-emerald-600' : item.status === 'error' ? 'bg-red-600' : (isDarkMode ? 'bg-[#BD9673]' : 'bg-[#8B5E3C]')
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                {item.status === 'error' && item.errorMsg && (
                  <p className="text-[11px] font-semibold text-red-600 dark:text-red-400 mt-1">
                    {item.errorMsg}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#E8D5C1] dark:border-[#3E2C20]">
          <button
            onClick={handleClose}
            className={`px-5 py-2.5 text-xs font-bold text-white rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 ${
              isDarkMode 
                ? 'bg-[#A57750] hover:bg-[#BD9673]' 
                : 'bg-[#8B5E3C] hover:bg-[#70492D]'
            }`}
          >
            {allCompleted ? <Check className="w-4 h-4" /> : null}
            {allCompleted ? 'Done & View Files' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
