import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, User, ArrowRight, BookOpen, Trophy } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { applicants } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const filteredApplicants = searchTerm.trim().length > 1
    ? applicants.filter(
        (a) =>
          a.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.nomorRegistrasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.programStudi.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSelectApplicant = (noReg: string) => {
    onClose();
    navigate(`/cek-pendaftaran?noreg=${noReg}`);
  };

  const handleViewLeaderboard = () => {
    onClose();
    navigate('/leaderboard');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 sm:pt-20">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-sky-600 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nomor registrasi, nama pendaftar, atau prodi..."
            className="w-full text-slate-800 placeholder-slate-400 bg-transparent text-sm sm:text-base focus:outline-hidden"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="p-4 max-h-96 overflow-y-auto">
          {searchTerm.trim().length > 1 ? (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
                Hasil Pencarian Pendaftar ({filteredApplicants.length})
              </div>
              {filteredApplicants.length > 0 ? (
                <div className="space-y-1">
                  {filteredApplicants.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => handleSelectApplicant(app.nomorRegistrasi)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-sky-50/80 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                          {app.nama.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900 group-hover:text-sky-700 flex items-center gap-2">
                            <span>{app.nama}</span>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                              {app.nomorRegistrasi}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500">
                            {app.programStudi} · {app.jalur}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-sm text-slate-500">
                  Tidak ditemukan pendaftar dengan kata kunci &quot;{searchTerm}&quot;
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
                Pencarian Cepat & Navigasi
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={handleViewLeaderboard}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50 text-left transition-colors"
                >
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <div>
                    <div className="text-sm font-semibold text-slate-800">Cek Leaderboard</div>
                    <div className="text-xs text-slate-500">Peringkat & skor real-time</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/cek-pendaftaran');
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50 text-left transition-colors"
                >
                  <User className="w-5 h-5 text-sky-600" />
                  <div>
                    <div className="text-sm font-semibold text-slate-800">Cek Status Pendaftaran</div>
                    <div className="text-xs text-slate-500">Cari nomor registrasi Anda</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/panduan');
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50 text-left transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="text-sm font-semibold text-slate-800">Panduan & Syarat PMB</div>
                    <div className="text-xs text-slate-500">Alur verifikasi & IPI</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/buat-akun');
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50 text-left transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold">
                    +
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">Buat Akun Baru</div>
                    <div className="text-xs text-slate-500">Pendaftar & Panitia</div>
                  </div>
                </button>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-400 px-2">
                Tips: Masukkan contoh nomor registrasi seperti <span className="font-mono text-sky-700 font-semibold">2026XXX001</span> atau nama seperti <span className="text-sky-700 font-semibold">Raihan</span>.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
