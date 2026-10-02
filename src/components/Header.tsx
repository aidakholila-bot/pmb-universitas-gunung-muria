import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User as UserIcon, LogOut, LayoutDashboard, ShieldCheck, ChevronDown } from 'lucide-react';
import { UniversityLogo } from './UniversityLogo';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useApp();

  const navLinks = [
    { label: 'Beranda', path: '/' },
    { label: 'Buat Akun', path: '/buat-akun' },
    { label: 'Aktivasi Akun', path: '/aktivasi-akun' },
    { label: 'Login', path: '/login' },
    { label: 'Cek Leaderboard', path: '/leaderboard' },
    { label: 'Cek Pendaftaran', path: '/cek-pendaftaran' },
    { label: 'Panduan & Informasi', path: '/panduan' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left section: Hamburger button + University Brand Lockup */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-1 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              aria-label="Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="flex items-center gap-3 group">
              <UniversityLogo size="md" className="group-hover:scale-105 transition-transform" />
              <div className="border-l border-slate-300 pl-3 hidden sm:block">
                <div className="text-sm font-bold text-slate-900 tracking-tight leading-tight uppercase font-sans">
                  Universitas Gunung Muria
                </div>
                <div className="text-xs text-sky-800 font-semibold leading-tight">
                  Portal Penerimaan Mahasiswa Baru
                </div>
                <div className="text-[10px] text-slate-600 font-mono leading-none mt-0.5">
                  universitasgunungmuria.pmb.ac.id
                </div>
              </div>
              <div className="sm:hidden">
                <div className="text-xs font-bold text-slate-900 uppercase">
                  UGM PMB
                </div>
                <div className="text-[10px] text-sky-800 font-medium">
                  Portal Penerimaan
                </div>
              </div>
            </Link>
          </div>

          {/* Center / Desktop Navigation bar */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg transition-all ${
                  isActive(link.path)
                    ? 'text-sky-700 bg-sky-50 font-semibold'
                    : 'hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right section: Search button + Masuk button / User Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              title="Cari nomor registrasi atau informasi PMB"
              aria-label="Cari"
            >
              <Search className="w-5 h-5" />
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-sky-50 border border-sky-200 text-sky-900 rounded-full hover:bg-sky-100 transition-colors text-xs font-medium focus:outline-hidden"
                >
                  <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-bold">
                    {currentUser.nama.charAt(0)}
                  </div>
                  <div className="text-left hidden md:block max-w-[120px] truncate">
                    <span className="font-semibold block truncate leading-none">{currentUser.nama}</span>
                    <span className="text-[10px] text-sky-700 capitalize leading-tight block">
                      {currentUser.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-sky-700" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500 font-medium">Masuk sebagai:</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{currentUser.nama}</p>
                      <p className="text-xs text-sky-600">{currentUser.email}</p>
                    </div>
                    <Link
                      to={currentUser.role === 'Pegawai / Admin' ? '/dashboard-admin' : '/dashboard-pendaftar'}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <LayoutDashboard className="w-4 h-4 text-sky-600" />
                      Dashboard {currentUser.role === 'Pegawai / Admin' ? 'Admin' : 'Pendaftar'}
                    </Link>
                    <Link
                      to="/leaderboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Pantau Leaderboard
                    </Link>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Keluar (Logout)
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-950 hover:bg-blue-900 active:bg-blue-950 text-white rounded-full text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              >
                <UserIcon className="w-4 h-4" />
                <span>Masuk</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Offcanvas Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="pt-2 pb-3 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider px-3">
            Menu Utama
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-sky-50 text-sky-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-100">
            {currentUser ? (
              <div className="space-y-2">
                <Link
                  to={currentUser.role === 'Pegawai / Admin' ? '/dashboard-admin' : '/dashboard-pendaftar'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2.5 bg-sky-600 text-white rounded-lg text-sm font-semibold hover:bg-sky-700"
                >
                  Buka Dashboard ({currentUser.role})
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-center px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Keluar Akun
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-950 text-white rounded-xl text-sm font-semibold hover:bg-blue-900"
              >
                <UserIcon className="w-4 h-4" />
                Masuk ke Portal
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
