import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { BuatAkunPage } from './pages/BuatAkunPage';
import { AktivasiAkunPage } from './pages/AktivasiAkunPage';
import { LoginPage } from './pages/LoginPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { CekPendaftaranPage } from './pages/CekPendaftaranPage';
import { PanduanPage } from './pages/PanduanPage';
import { PendaftarDashboardPage } from './pages/PendaftarDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
          {/* Header */}
          <Header onOpenSearch={() => setIsSearchOpen(true)} />

          {/* Search Modal */}
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />

          {/* Toast Notification Container */}
          <Toast />

          {/* Main Viewport Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/buat-akun" element={<BuatAkunPage />} />
              <Route path="/aktivasi-akun" element={<AktivasiAkunPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/cek-pendaftaran" element={<CekPendaftaranPage />} />
              <Route path="/panduan" element={<PanduanPage />} />
              <Route path="/dashboard-pendaftar" element={<PendaftarDashboardPage />} />
              <Route path="/dashboard-admin" element={<AdminDashboardPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
