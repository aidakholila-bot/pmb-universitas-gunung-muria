import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  ArrowLeft,
  Building2,
  GraduationCap,
  Ticket,
  Search,
  RotateCcw,
  CheckCircle2,
  Clock,
  XCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Info,
  ShieldCheck,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { FAKULTAS_LIST, JALUR_LIST } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const LeaderboardPage: React.FC = () => {
  const { applicants } = useApp();

  // Filters state
  const [selectedFakultas, setSelectedFakultas] = useState<string>('');
  const [selectedProdi, setSelectedProdi] = useState<string>('');
  const [selectedJalur, setSelectedJalur] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Live WIB Clock
  const [currentTimeWib, setCurrentTimeWib] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as WIB (UTC+7)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatted = new Intl.DateTimeFormat('id-ID', options).format(now);
      setCurrentTimeWib(`${formatted} WIB`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Dependent prodi list based on selected fakultas
  const activeFaculty = FAKULTAS_LIST.find((f) => f.nama === selectedFakultas);
  const prodiOptions = activeFaculty ? activeFaculty.programStudi : [];

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFakultas(e.target.value);
    setSelectedProdi('');
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setSelectedFakultas('');
    setSelectedProdi('');
    setSelectedJalur('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Filtered and sorted applicants
  const filteredApplicants = useMemo(() => {
    return applicants.filter((applicant) => {
      // Filter by Fakultas
      if (selectedFakultas && applicant.fakultas !== selectedFakultas) {
        return false;
      }
      // Filter by Program Studi
      if (selectedProdi && applicant.programStudi !== selectedProdi) {
        return false;
      }
      // Filter by Jalur
      if (selectedJalur && applicant.jalur !== selectedJalur) {
        return false;
      }
      // Filter by Search (Nomor Registrasi or Nama)
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchesNoReg = applicant.nomorRegistrasi.toLowerCase().includes(query);
        const matchesName = applicant.nama.toLowerCase().includes(query);
        if (!matchesNoReg && !matchesName) {
          return false;
        }
      }
      return true;
    });
  }, [applicants, selectedFakultas, selectedProdi, selectedJalur, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage) || 1;
  const paginatedApplicants = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredApplicants.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredApplicants, currentPage, itemsPerPage]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* TOP HERO BANNER Inspired by Reference 4 */}
        <div className="relative overflow-hidden bg-gradient-to-r from-sky-100 via-sky-50 to-blue-100 rounded-3xl p-6 sm:p-8 border border-sky-200/70 shadow-xs">
          {/* Subtle mountain SVG backdrop */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
            <svg className="w-full h-full object-cover" viewBox="0 0 600 200" fill="none">
              <path d="M100 200 L250 80 L350 150 L450 60 L600 200 Z" fill="#0284C7" />
              <path d="M200 200 L320 110 L420 170 L520 90 L600 200 Z" fill="#0369A1" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-800 hover:text-sky-950 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Beranda</span>
              </Link>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-xs">
                  <Trophy className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Cek Leaderboard
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                    Pantau peringkat Anda secara real-time berdasarkan jalur pendaftaran, fakultas, dan program studi.
                  </p>
                </div>
              </div>
            </div>

            {/* Tagline calligraphy on right as seen in reference */}
            <div className="hidden lg:block text-right pr-4">
              <span className="text-2xl font-serif italic text-sky-900 font-bold block">
                Ilmu Integritas Inovasi
              </span>
              <span className="text-xs text-sky-700 font-medium">
                Penerimaan Mahasiswa Baru Berbasis Nilai Murni
              </span>
            </div>
          </div>
        </div>

        {/* FILTER CONTROLS CARD (ABOVE TABLE, DIRECTLY FROM REFERENCE 4) */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/90 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Filter 1: Fakultas */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-sky-600" />
                <span>Fakultas</span>
              </label>
              <select
                value={selectedFakultas}
                onChange={handleFacultyChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 transition-all cursor-pointer truncate"
              >
                <option value="">Semua Fakultas</option>
                {FAKULTAS_LIST.map((f) => (
                  <option key={f.nama} value={f.nama}>
                    {f.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter 2: Program Studi (Dependent on Fakultas) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                <span>Program Studi</span>
              </label>
              <select
                value={selectedProdi}
                onChange={(e) => {
                  setSelectedProdi(e.target.value);
                  setCurrentPage(1);
                }}
                disabled={!selectedFakultas}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed truncate"
              >
                <option value="">
                  {selectedFakultas ? 'Semua Program Studi' : 'Pilih Fakultas Dulu'}
                </option>
                {prodiOptions.map((prodi) => (
                  <option key={prodi} value={prodi}>
                    {prodi}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter 3: Jalur Pendaftaran (ONLY Mandiri Rapor or Mandiri SNBT / UTBK) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Ticket className="w-3.5 h-3.5 text-sky-600" />
                <span>Jalur Pendaftaran</span>
              </label>
              <select
                value={selectedJalur}
                onChange={(e) => {
                  setSelectedJalur(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 transition-all cursor-pointer"
              >
                <option value="">Semua Jalur</option>
                {JALUR_LIST.map((jalur) => (
                  <option key={jalur} value={jalur}>
                    {jalur}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter 4: Nomor Registrasi Search Field + Button */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-sky-600" />
                <span>Cari Nomor Registrasi / Nama</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Cth: 2026XXX001 / Raihan"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

          </div>

          {/* Action Row: Reset Filter button & quick filter badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Filter Aktif:</span>
              <span className="font-semibold text-slate-800">
                {selectedFakultas || 'Semua Fakultas'}
                {selectedProdi ? ` › ${selectedProdi}` : ''}
                {selectedJalur ? ` · ${selectedJalur}` : ''}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {(selectedFakultas || selectedProdi || selectedJalur || searchQuery) && (
                <button
                  onClick={handleResetFilter}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filter</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* LEADERBOARD TABLE CARD Inspired by Reference 4 */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-200/90 overflow-hidden">
          
          {/* Table Top Header: Real-Time indicator & live WIB clock */}
          <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900">
                Tabel Peringkat Pendaftar
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-semibold font-mono">
                {filteredApplicants.length} Pendaftar
              </span>
            </div>

            {/* Live indicator & WIB clock matching Reference 4 */}
            <div className="flex items-center gap-3 text-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="w-2 h-2 -ml-3.5 rounded-full bg-emerald-500"></span>
                <span>Data diperbarui secara real-time</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-mono font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{currentTimeWib || '14:32:05 WIB'}</span>
              </div>
            </div>
          </div>

          {/* Table Content with horizontal scroll safety */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/90 bg-slate-50/70 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6 text-center w-20">Peringkat</th>
                  <th className="py-3.5 px-4 sm:px-6">No. Registrasi</th>
                  <th className="py-3.5 px-4 sm:px-6">Nama</th>
                  <th className="py-3.5 px-4 sm:px-6">Fakultas / Program Studi</th>
                  <th className="py-3.5 px-4 sm:px-6">Jalur Pendaftaran</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Skor Akhir</th>
                  <th className="py-3.5 px-4 sm:px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                {paginatedApplicants.length > 0 ? (
                  paginatedApplicants.map((applicant, index) => {
                    const globalRank =
                      filteredApplicants.findIndex((a) => a.id === applicant.id) + 1;

                    return (
                      <tr
                        key={applicant.id}
                        className="hover:bg-sky-50/40 transition-colors group"
                      >
                        {/* Peringkat Badge (Ref 4 style: 1 gold, 2 silver, 3 bronze, 4+ blue circle) */}
                        <td className="py-4 px-4 sm:px-6 text-center">
                          {globalRank === 1 ? (
                            <div className="w-8 h-8 rounded-full mx-auto bg-amber-400 text-white font-extrabold flex items-center justify-center shadow-sm text-xs">
                              🥇 1
                            </div>
                          ) : globalRank === 2 ? (
                            <div className="w-8 h-8 rounded-full mx-auto bg-slate-400 text-white font-extrabold flex items-center justify-center shadow-sm text-xs">
                              🥈 2
                            </div>
                          ) : globalRank === 3 ? (
                            <div className="w-8 h-8 rounded-full mx-auto bg-amber-700 text-white font-extrabold flex items-center justify-center shadow-sm text-xs">
                              🥉 3
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded-full mx-auto bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-xs">
                              {globalRank}
                            </div>
                          )}
                        </td>

                        {/* No Registrasi */}
                        <td className="py-4 px-4 sm:px-6 font-mono font-semibold text-slate-900 whitespace-nowrap">
                          <Link
                            to={`/cek-pendaftaran?noreg=${applicant.nomorRegistrasi}`}
                            className="hover:text-sky-700 hover:underline"
                            title="Klik untuk cek detail pendaftaran"
                          >
                            {applicant.nomorRegistrasi}
                          </Link>
                        </td>

                        {/* Nama */}
                        <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900 whitespace-nowrap">
                          {applicant.nama}
                        </td>

                        {/* Fakultas / Program Studi (Two lines matching Reference 4) */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="text-sky-900 font-semibold leading-snug">
                            {applicant.fakultas}
                          </div>
                          <div className="text-xs text-slate-500 font-medium leading-snug">
                            {applicant.programStudi}
                          </div>
                        </td>

                        {/* Jalur Pendaftaran */}
                        <td className="py-4 px-4 sm:px-6 text-slate-600 whitespace-nowrap">
                          {applicant.jalur}
                        </td>

                        {/* Skor Akhir (Tabular numerals, descending) */}
                        <td className="py-4 px-4 sm:px-6 text-right font-mono font-bold text-slate-900 tabular-nums">
                          {applicant.skorAkhir.toFixed(2).replace('.', ',')}
                        </td>

                        {/* Status (Lolos = GREEN, Waiting List = YELLOW, Tidak Lolos = RED) */}
                        <td className="py-4 px-4 sm:px-6 text-center whitespace-nowrap">
                          {applicant.status === 'Lolos' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Lolos</span>
                            </span>
                          )}

                          {applicant.status === 'Waiting List' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              <span>Waiting List</span>
                            </span>
                          )}

                          {applicant.status === 'Tidak Lolos' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                              <XCircle className="w-3.5 h-3.5 text-rose-600" />
                              <span>Tidak Lolos</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      <div className="max-w-sm mx-auto space-y-2">
                        <Info className="w-8 h-8 text-slate-400 mx-auto" />
                        <p className="font-semibold text-slate-700">Tidak ada data pendaftar yang cocok.</p>
                        <p className="text-xs text-slate-500">
                          Coba ganti pilihan filter atau bersihkan pencarian kata kunci.
                        </p>
                        <button
                          onClick={handleResetFilter}
                          className="mt-2 px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-semibold hover:bg-sky-700"
                        >
                          Tampilkan Semua Data
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer: Pagination & Result Count matching Reference 4 */}
          <div className="p-4 sm:p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
            <div className="text-xs sm:text-sm text-slate-500">
              Menampilkan{' '}
              <strong className="text-slate-800 font-mono">
                {filteredApplicants.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
              </strong>{' '}
              -{' '}
              <strong className="text-slate-800 font-mono">
                {Math.min(currentPage * itemsPerPage, filteredApplicants.length)}
              </strong>{' '}
              dari{' '}
              <strong className="text-slate-800 font-mono">
                {filteredApplicants.length}
              </strong>{' '}
              pendaftar
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Halaman Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        currentPage === pageNum
                          ? 'bg-blue-950 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  pageNum === currentPage - 2 ||
                  pageNum === currentPage + 2
                ) {
                  return (
                    <span key={pageNum} className="text-xs text-slate-400 px-1">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Halaman Berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* AI RANKING INSIGHT CARD (Explicit Prompt Requirement) */}
        <div className="bg-gradient-to-br from-sky-50 to-indigo-50/50 rounded-2xl p-6 border border-sky-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                AI Ranking Insight
              </h3>
              <p className="text-xs text-sky-800 font-medium">
                Mekanisme Penilaian Transparan &amp; Otomatis
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Sistem prototype ini secara otomatis menghitung ulang dan menyusun peringkat calon mahasiswa secara real-time
            berdasarkan nilai murni rapor dan skor SNBT/UTBK setiap kali ada pembaruan data atau pendaftar baru masuk.
            Hal ini menjamin transparansi 100% tanpa adanya intervensi subjektif atau perubahan kuota tersembunyi.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Urutan murni skor tertinggi
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-sky-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Audit log pendaftaran terpusat
            </span>
            <span>·</span>
            <span className="text-slate-400">
              *Prototype mengimplementasikan logika otomatisasi data-driven transparan UGM.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
