import React, { useState, useEffect } from 'react';
import { X, Download, Share2, FileText, Music, Film, ExternalLink } from 'lucide-react';
import { useDrive } from '../../context/DriveContext';
import { useTheme } from '../../context/ThemeContext';
import { driveService } from '../../services/driveService';
import API from '../../services/api';

export const FilePreviewModal = () => {
  const { previewFile, setPreviewFile, setShareModalItem } = useDrive();
  const { isDarkMode } = useTheme();
  const [textContent, setTextContent] = useState('');
  const [loadingText, setLoadingText] = useState(false);

  useEffect(() => {
    if (previewFile && isTextFile(previewFile.mimeType)) {
      setLoadingText(true);
      API.get(driveService.previewFileUrl(previewFile.id), { responseType: 'text' })
        .then(res => setTextContent(res.data))
        .catch(() => setTextContent('Could not load text preview.'))
        .finally(() => setLoadingText(false));
    }
  }, [previewFile]);

  if (!previewFile) return null;

  const isImage = previewFile.mimeType?.startsWith('image/');
  const isVideo = previewFile.mimeType?.startsWith('video/');
  const isAudio = previewFile.mimeType?.startsWith('audio/');
  const isPdf = previewFile.mimeType?.includes('pdf');
  const isTextFile = (mime) => mime?.includes('json') || mime?.includes('text') || mime?.includes('javascript') || mime?.includes('html') || mime?.includes('css');

  const previewUrl = driveService.previewFileUrl(previewFile.id);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className={`rounded-2xl max-w-4xl w-full h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 border ${
        isDarkMode ? 'bg-[#231B15] border-[#3E2C20]' : 'bg-white border-[#E8D5C1]'
      }`}>
        {/* Header */}
        <div className={`h-14 px-6 border-b flex items-center justify-between ${
          isDarkMode 
            ? 'bg-[#1C140E] border-[#3E2C20] text-[#F7EFE6]' 
            : 'bg-[#F4ECE1] border-[#E8D5C1] text-[#3A2010]'
        }`}>
          <div className="flex items-center gap-3 min-w-0">
            <FileText className={`w-5 h-5 flex-shrink-0 ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`} />
            <h3 className="font-bold text-sm truncate">{previewFile.name}</h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShareModalItem({ item: previewFile, type: 'FILE' })}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-[#2E231C] text-gray-300 hover:text-white' 
                  : 'hover:bg-[#E8D5C1] text-gray-600 hover:text-[#3A2010]'
              }`}
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => driveService.downloadFile(previewFile.id, previewFile.name || previewFile.originalName)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-[#2E231C] text-gray-300 hover:text-white' 
                  : 'hover:bg-[#E8D5C1] text-gray-600 hover:text-[#3A2010]'
              }`}
              title="Download File"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewFile(null)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-[#2E231C] text-gray-400 hover:text-white' 
                  : 'hover:bg-[#E8D5C1] text-gray-500 hover:text-[#3A2010]'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Viewer Body */}
        <div className={`flex-1 flex items-center justify-center p-6 overflow-auto ${
          isDarkMode ? 'bg-[#1C140E]' : 'bg-[#FAF6F0]'
        }`}>
          {isImage && (
            <img
              src={previewUrl}
              alt={previewFile.name}
              className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
            />
          )}

          {isVideo && (
            <video controls className="max-h-full max-w-full rounded-lg shadow-lg">
              <source src={previewUrl} type={previewFile.mimeType} />
              Your browser does not support video playback.
            </video>
          )}

          {isAudio && (
            <div className={`p-8 rounded-2xl flex flex-col items-center space-y-4 max-w-md w-full border ${
              isDarkMode ? 'bg-[#231B15] border-[#3E2C20]' : 'bg-white border-[#E8D5C1]'
            }`}>
              <Music className={`w-16 h-16 animate-pulse ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`} />
              <p className={`font-semibold text-sm text-center ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>{previewFile.name}</p>
              <audio controls className="w-full">
                <source src={previewUrl} type={previewFile.mimeType} />
              </audio>
            </div>
          )}

          {isPdf && (
            <iframe
              src={previewUrl}
              title={previewFile.name}
              className="w-full h-full rounded-lg border-0 bg-white"
            />
          )}

          {isTextFile(previewFile.mimeType) && (
            <div className={`w-full h-full p-4 rounded-xl font-mono text-xs overflow-auto border ${
              isDarkMode 
                ? 'bg-[#231B15] text-[#BD9673] border-[#3E2C20]' 
                : 'bg-white text-[#55341E] border-[#E8D5C1]'
            }`}>
              {loadingText ? 'Loading text preview...' : <pre>{textContent}</pre>}
            </div>
          )}

          {!isImage && !isVideo && !isAudio && !isPdf && !isTextFile(previewFile.mimeType) && (
            <div className="text-center space-y-4 max-w-sm mx-auto">
              <div className={`p-5 rounded-2xl inline-flex items-center justify-center ${
                isDarkMode ? 'bg-[#2E231C] text-[#BD9673]' : 'bg-[#F4ECE1] text-[#8B5E3C]'
              }`}>
                <FileText className="w-16 h-16" />
              </div>
              <div className="space-y-1">
                <p className={`text-base font-bold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>{previewFile.name}</p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-[#705A4A]'}`}>
                  No inline browser preview for this file type. Click below to download in its original format.
                </p>
              </div>
              <button
                onClick={() => driveService.downloadFile(previewFile.id, previewFile.name || previewFile.originalName)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 font-bold text-xs rounded-xl shadow-md transition-all text-white cursor-pointer ${
                  isDarkMode ? 'bg-[#A57750] hover:bg-[#BD9673]' : 'bg-[#8B5E3C] hover:bg-[#70492D]'
                }`}
              >
                <Download className="w-4 h-4" />
                Download Original File ({previewFile.name?.split('.').pop()?.toUpperCase() || 'FILE'})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
