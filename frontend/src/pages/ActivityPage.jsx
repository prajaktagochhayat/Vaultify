import React, { useState, useEffect } from 'react';
import { driveService } from '../services/driveService';
import { useTheme } from '../context/ThemeContext';
import { Activity, Clock, File, Folder, User } from 'lucide-react';

export const ActivityPage = () => {
  const { isDarkMode } = useTheme();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    driveService.getActivities()
      .then((data) => setActivities(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-2 border-b pb-4 ${
        isDarkMode ? 'border-[#3E2C20]' : 'border-[#E8D5C1]'
      }`}>
        <Activity className={`w-6 h-6 ${isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'}`} />
        <h2 className={`text-xl font-extrabold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>Activity Log</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
            isDarkMode ? 'border-[#BD9673]' : 'border-[#8B5E3C]'
          }`}></div>
        </div>
      ) : activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-2">
          <Clock className="w-12 h-12 text-gray-400" />
          <p className={`text-base font-bold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>No activity recorded yet</p>
          <p className="text-xs text-gray-500">Your uploads, shares, and changes will be logged here</p>
        </div>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {activities.map((act) => (
            <div
              key={act.id}
              className={`rounded-xl p-4 border shadow-sm flex items-start gap-4 transition-colors ${
                isDarkMode 
                  ? 'bg-[#231B15] border-[#3E2C20] hover:border-[#BD9673]' 
                  : 'bg-white border-[#E8D5C1] hover:border-[#8B5E3C]'
              }`}
            >
              <div className={`p-2.5 rounded-xl mt-0.5 ${
                isDarkMode ? 'bg-[#2E231C] text-[#BD9673]' : 'bg-[#F4ECE1] text-[#8B5E3C]'
              }`}>
                {act.targetType === 'FOLDER' ? <Folder className="w-5 h-5" /> : <File className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'}`}>
                    {act.details || act.action}
                  </p>
                  <span className="text-xs text-gray-400 font-medium">
                    {formatDate(act.timestamp)}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <span className={`flex items-center gap-1 font-medium ${isDarkMode ? 'text-gray-300' : 'text-[#55341E]'}`}>
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    {act.userFullName}
                  </span>
                  <span>•</span>
                  <span className={`uppercase font-bold tracking-wider text-[10px] ${
                    isDarkMode ? 'text-[#BD9673]' : 'text-[#8B5E3C]'
                  }`}>
                    {act.action}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
