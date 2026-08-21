import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DriveProvider } from './context/DriveContext';
import { ThemeProvider } from './context/ThemeContext';
import { MainLayout } from './components/layout/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { MyDrivePage } from './pages/MyDrivePage';
import { SharedWithMePage } from './pages/SharedWithMePage';
import { StarredPage } from './pages/StarredPage';
import { TrashPage } from './pages/TrashPage';
import { ActivityPage } from './pages/ActivityPage';
import { PublicSharePage } from './pages/PublicSharePage';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0] dark:bg-[#17110D]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B5E3C] dark:border-[#BD9673]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DriveProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/share/:token" element={<PublicSharePage />} />

              {/* Protected Drive Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <MyDrivePage />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/shared"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <SharedWithMePage />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/starred"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <StarredPage />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trash"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <TrashPage />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/activity"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <ActivityPage />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </DriveProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
