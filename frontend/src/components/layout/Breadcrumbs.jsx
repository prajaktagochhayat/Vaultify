import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const Breadcrumbs = ({ breadcrumbs = [], onNavigate }) => {
  const { isDarkMode } = useTheme();

  return (
    <nav className="flex items-center gap-1.5 text-xs py-2">
      <button
        onClick={() => onNavigate(null)}
        className={`flex items-center gap-1.5 font-bold transition-colors ${
          isDarkMode 
            ? 'text-[#BD9673] hover:text-[#F7EFE6]' 
            : 'text-[#8B5E3C] hover:text-[#55341E]'
        }`}
      >
        <Home className="w-4 h-4" />
        <span>My Drive</span>
      </button>

      {breadcrumbs.map((crumb, idx) => {
        const isLast = idx === breadcrumbs.length - 1;
        return (
          <React.Fragment key={crumb.id}>
            <ChevronRight className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            {isLast ? (
              <span className={`font-bold truncate max-w-[200px] ${
                isDarkMode ? 'text-[#F7EFE6]' : 'text-[#3A2010]'
              }`}>
                {crumb.name}
              </span>
            ) : (
              <button
                onClick={() => onNavigate(crumb.id)}
                className={`font-semibold truncate max-w-[150px] transition-colors ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-[#BD9673]' 
                    : 'text-gray-600 hover:text-[#8B5E3C]'
                }`}
              >
                {crumb.name}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
