import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Cloud, Lock, Download, FileText, AlertCircle, Eye, EyeOff } from 'lucide-react';
import API from '../services/api';
import { driveService } from '../services/driveService';

export const PublicSharePage = () => {
  const { token } = useParams();
  const [shareInfo, setShareInfo] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchInfo = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const info = await driveService.getPublicLinkInfo(token);
      setShareInfo(info);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired share link');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  const handleDownload = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await API.post(
        driveService.accessPublicLinkUrl(token),
        { password: password ? password.trim() : null },
        { responseType: 'blob' }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', shareInfo?.fileName || 'shared-file');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      if (err.response?.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const json = JSON.parse(text);
          setError(json.message || 'Access denied or invalid password');
        } catch {
          setError('Access denied or invalid password');
        }
      } else {
        setError(err.response?.data?.message || 'Access denied or invalid password');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl border border-[#E8D5C1] p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3.5 bg-[#8B5E3C] text-white rounded-2xl shadow-md mb-2">
            <Cloud className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#3A2010]">Shared Cloud Storage</h2>
          <p className="text-xs font-medium text-[#70492D]">Access public file download on Vaultify</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B5E3C]"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-600 text-xs rounded-xl font-medium flex items-center gap-3 border border-red-100">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-[#F4ECE1]/60 rounded-2xl p-4 border border-[#E8D5C1] flex items-center gap-3">
              <div className="p-3 bg-[#F4ECE1] text-[#8B5E3C] rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-[#3A2010] text-sm truncate">{shareInfo.fileName || 'Shared Item'}</h4>
                <p className="text-xs text-gray-500">Item Type: {shareInfo.itemType}</p>
              </div>
            </div>

            <form onSubmit={handleDownload} className="space-y-4">
              {shareInfo.isPasswordProtected && (
                <div>
                  <label className="block text-xs font-bold text-[#55341E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-amber-600" />
                    Enter Password to Access
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter link password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-4 pr-10 py-2.5 bg-[#F4ECE1]/40 border border-[#E8D5C1] rounded-xl text-xs text-[#3A2010] focus:bg-white focus:border-[#8B5E3C] focus:outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#8B5E3C] hover:bg-[#70492D] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Shared File
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
