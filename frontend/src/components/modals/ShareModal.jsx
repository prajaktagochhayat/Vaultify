import React, { useState } from 'react';
import { X, Share2, Link, Copy, Check, Lock, Calendar, UserPlus, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { useDrive } from '../../context/DriveContext';
import { driveService } from '../../services/driveService';
import { useTheme } from '../../context/ThemeContext';

export const ShareModal = () => {
  const { shareModalItem, setShareModalItem } = useDrive();
  const { isDarkMode } = useTheme();

  const [activeTab, setActiveTab] = useState('direct'); // 'direct' or 'public'
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('VIEWER');
  
  // Public Link state
  const [publicLink, setPublicLink] = useState(null);
  const [expiryDays, setExpiryDays] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [customDomain, setCustomDomain] = useState(window.location.origin);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!shareModalItem) return null;

  const { item, type } = shareModalItem;

  const getFullShareUrl = () => {
    if (!publicLink) return '';
    const base = (customDomain || window.location.origin).replace(/\/$/, '');
    return `${base}${publicLink.shareUrl}`;
  };

  const handleShareWithUser = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      await driveService.shareItem(
        type === 'FILE' ? item.id : null,
        type === 'FOLDER' ? item.id : null,
        email.trim(),
        role
      );
      setSuccessMsg(`Successfully shared with ${email.trim()}`);
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to share item');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePublicLink = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await driveService.createPublicLink(
        type === 'FILE' ? item.id : null,
        type === 'FOLDER' ? item.id : null,
        expiryDays ? parseInt(expiryDays) : null,
        password ? password.trim() : null,
        'VIEWER'
      );
      setPublicLink(res);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate link');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (!publicLink) return;
    const fullUrl = getFullShareUrl();
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 border animate-in fade-in zoom-in-95 ${
        isDarkMode 
          ? 'bg-[#231B15] border-[#3E2C20]' 
          : 'bg-white border-[#E8D5C1]'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className={`w-5 h-5 ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`} />
            <h3 className={`text-lg font-bold truncate max-w-[280px] ${
              isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'
            }`}>
              Share "{item.name}"
            </h3>
          </div>
          <button
            onClick={() => setShareModalItem(null)}
            className={`p-1 rounded-lg transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-[#2E231C]' : 'text-gray-500 hover:text-gray-700 hover:bg-[#F4ECE1]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className={`flex border-b ${isDarkMode ? 'border-[#3E2C20]' : 'border-[#E8D5C1]'}`}>
          <button
            onClick={() => setActiveTab('direct')}
            className={`flex-1 py-2 text-xs font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'direct' 
                ? (isDarkMode ? 'border-[#BD9673] text-[#BD9673]' : 'border-[#8B5E3C] text-[#8B5E3C]')
                : (isDarkMode ? 'border-transparent text-gray-400 hover:text-[#F7EFE6]' : 'border-transparent text-gray-500 hover:text-[#3A2010]')
            }`}
          >
            <UserPlus className="w-4 h-4" />
            Share with People
          </button>
          <button
            onClick={() => setActiveTab('public')}
            className={`flex-1 py-2 text-xs font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'public' 
                ? (isDarkMode ? 'border-[#BD9673] text-[#BD9673]' : 'border-[#8B5E3C] text-[#8B5E3C]')
                : (isDarkMode ? 'border-transparent text-gray-400 hover:text-[#F7EFE6]' : 'border-transparent text-gray-500 hover:text-[#3A2010]')
            }`}
          >
            <Link className="w-4 h-4" />
            Get Public Link
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300 text-xs rounded-xl font-medium border border-red-100 dark:border-red-900">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 text-xs rounded-xl font-medium border border-emerald-100 dark:border-emerald-900">
            {successMsg}
          </div>
        )}

        {/* Tab 1: Share with People */}
        {activeTab === 'direct' && (
          <form onSubmit={handleShareWithUser} className="space-y-4">
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                User Email Address
              </label>
              <input
                type="email"
                placeholder="colleague@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-2.5 border rounded-xl text-xs focus:outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-[#1C140E] border-[#3E2C20] text-[#F7EFE6] focus:border-[#BD9673]'
                    : 'bg-[#F4ECE1] border-[#E8D5C1] text-[#3A2010] focus:border-[#8B5E3C]'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Permission Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full px-4 py-2.5 border rounded-xl text-xs focus:outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-[#1C140E] border-[#3E2C20] text-[#F7EFE6] focus:border-[#BD9673]'
                    : 'bg-[#F4ECE1] border-[#E8D5C1] text-[#3A2010] focus:border-[#8B5E3C]'
                }`}
              >
                <option value="VIEWER">Viewer (Can read & download)</option>
                <option value="EDITOR">Editor (Can edit & manage)</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShareModalItem(null)}
                className={`px-4 py-2 text-xs font-medium rounded-xl transition-colors ${
                  isDarkMode ? 'text-gray-400 hover:bg-[#2E231C]' : 'text-gray-600 hover:bg-[#F4ECE1]'
                }`}
              >
                Done
              </button>
              <button
                type="submit"
                disabled={loading || !email.trim()}
                className={`px-5 py-2 text-xs font-bold text-white rounded-xl shadow-md transition-all cursor-pointer ${
                  isDarkMode 
                    ? 'bg-[#A57750] hover:bg-[#BD9673] disabled:opacity-50' 
                    : 'bg-[#8B5E3C] hover:bg-[#70492D] disabled:opacity-50'
                }`}
              >
                {loading ? 'Sharing...' : 'Send Share Access'}
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Public Link Generation */}
        {activeTab === 'public' && (
          <div className="space-y-4">
            {!publicLink ? (
              <div className="space-y-3">
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Calendar className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`} />
                    Expiration (Days) - Optional
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 7 days (leave blank for unlimited)"
                    value={expiryDays}
                    onChange={(e) => setExpiryDays(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-xl text-xs focus:outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#1C140E] border-[#3E2C20] text-[#F7EFE6] focus:border-[#BD9673]'
                        : 'bg-[#F4ECE1] border-[#E8D5C1] text-[#3A2010] focus:border-[#8B5E3C]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Lock className="w-3.5 h-3.5 text-amber-500" />
                    Password Protection - Optional
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Set access password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-4 pr-10 py-2 border rounded-xl text-xs focus:outline-none transition-all ${
                        isDarkMode 
                          ? 'bg-[#1C140E] border-[#3E2C20] text-[#F7EFE6] focus:border-[#BD9673]'
                          : 'bg-[#F4ECE1] border-[#E8D5C1] text-[#3A2010] focus:border-[#8B5E3C]'
                      }`}
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

                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Share Domain / Host URL (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="https://vaultify.app"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-xl text-xs focus:outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#1C140E] border-[#3E2C20] text-[#F7EFE6] focus:border-[#BD9673]'
                        : 'bg-[#F4ECE1] border-[#E8D5C1] text-[#3A2010] focus:border-[#8B5E3C]'
                    }`}
                  />
                </div>

                <button
                  onClick={handleCreatePublicLink}
                  disabled={loading}
                  className={`w-full py-2.5 text-white font-bold text-xs rounded-xl shadow-md transition-colors mt-2 cursor-pointer ${
                    isDarkMode ? 'bg-[#A57750] hover:bg-[#BD9673]' : 'bg-[#8B5E3C] hover:bg-[#70492D]'
                  }`}
                >
                  {loading ? 'Generating Link...' : 'Generate Shareable Link'}
                </button>
              </div>
            ) : (
              <div className={`space-y-3 p-4 rounded-xl border ${
                isDarkMode ? 'bg-[#2E231C] border-[#3E2C20]' : 'bg-[#F4ECE1] border-[#E8D5C1]'
              }`}>
                <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                  <span className="font-bold text-[#8B5E3C] dark:text-[#BD9673]">Public Link Active</span>
                  {publicLink.isPasswordProtected && <span className="text-amber-600 font-bold">Protected</span>}
                </div>
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Base Domain / URL:
                  </label>
                  <input
                    type="text"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="https://vaultify.app"
                    className={`w-full px-3 py-1.5 mb-2 border rounded-lg text-xs font-mono focus:outline-none ${
                      isDarkMode ? 'bg-[#1C140E] border-[#3E2C20] text-[#F7EFE6]' : 'bg-white border-[#E8D5C1] text-[#3A2010]'
                    }`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={getFullShareUrl()}
                    className={`w-full px-3 py-2 border rounded-lg text-xs font-mono focus:outline-none ${
                      isDarkMode ? 'bg-[#1C140E] border-[#3E2C20] text-[#F7EFE6]' : 'bg-white border-[#E8D5C1] text-[#3A2010]'
                    }`}
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`p-2 rounded-lg text-white transition-colors flex-shrink-0 cursor-pointer ${
                      isDarkMode ? 'bg-[#A57750] hover:bg-[#BD9673]' : 'bg-[#8B5E3C] hover:bg-[#70492D]'
                    }`}
                    title="Copy Link"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={getFullShareUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-2 rounded-lg text-white transition-colors flex-shrink-0 ${
                      isDarkMode ? 'bg-[#2E231C] hover:bg-[#3E2C20] text-[#F7EFE6]' : 'bg-[#E8D5C1] hover:bg-[#D5B89B] text-[#3A2010]'
                    }`}
                    title="Open Link in New Tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                {copied && (
                  <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">✓ Link copied to clipboard!</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
