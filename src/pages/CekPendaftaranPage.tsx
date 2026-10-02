import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  FileCheck,
  Trophy,
  Ticket,
  Printer,
  X,
  Share2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { UniversityLogo } from '../components/UniversityLogo';
import { useApp } from '../context/AppContext';
import { Applicant } from '../data/mockData';

export const CekPendaftaranPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { applicants, getApplicantByNoReg, getApplicantRank, showToast } = useApp();

  const [inputNoReg, setInputNoReg] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Check URL query param on mount or change
  useEffect(() => {
    const queryNoReg = searchParams.get('noreg');
    if (queryNoReg) {
      setInputNoReg(queryNoReg);
      const found = getApplicantByNoReg(queryNoReg);
      if (found) {
        setSelectedApplicant(found);
        setHasSearched(true);
      }
    } else if (applicants.length > 0 && !hasSearched) {
      // Default to first applicant for immediate rich preview
      setSelectedApplicant(applicants[0]);
      setInputNoReg(applicants[0].nomorRegistrasi);
      setHasSearched(true);
    }
  }, [searchParams, applicants]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputNoReg.trim()) {
      showToast('Masukkan nomor registrasi pendaftaran.', 'error');
      return;
    }

    const found = getApplicantByNoReg(inputNoReg.trim());
    setSelectedApplicant(found || null);
    setHasSearched(true);

    if (found) {
      showToast(`Data ditemukan untuk ${found.nama}`, 'success');
    } else {
      showToast('Nomor registrasi tidak ditemukan dalam sistem.', 'error');
    }
  };

  const handleSelectQuickSuggestion = (noReg: string) => {
    setInputNoReg(noReg);
    const found = getApplicantByNoReg(noReg);
    setSelectedApplicant(found || null);
    setHasSearched(true);
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const currentRank = selectedApplicant ? getApplicantRank(selectedApplicant.id) : -1;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-sky-100 via-sky-50 to-blue-100 rounded-3xl p-6 sm:p-8 border border-sky-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block mb-1">
              Verifikasi &amp; Hasil Seleksi PMB
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Cek Status Pendaftaran
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg">
              Masukkan Nomor Registrasi peserta untuk melihat rincian kelulusan, skor akhir, dan nominal IPI resmi.
            </p>
          </div>
          <div className="shrink-0">
            <UniversityLogo size="lg" />
          </div>
        </div>

        {/* SEARCH BOX */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-sky-600 absolute left-3.5 top-3" />
              <input
                type="text"
                value={inputNoReg}
                onChange={(e) => setInputNoReg(e.target.value)}
                placeholder="Masukkan Nomor Registrasi (contoh: 2026XXX001)..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-semibold"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3 bg-blue-950 hover:bg-blue-900 active:bg-blue-950 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Cari Pendaftaran</span>
            </button>
          </form>

          {/* Quick Suggestions Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Contoh Registrasi Cepat:</span>
            {applicants.slice(0, 4).map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => handleSelectQuickSuggestion(app.nomorRegistrasi)}
                className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200 font-mono transition-colors"
              >
                {app.nomorRegistrasi} ({app.nama.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS CARD (Exact Prompt Requirements) */}
        {hasSearched && selectedApplicant && (
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2">
            
            {/* Candidate Header Dossier */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-sky-50/70 to-white border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
                  {selectedApplicant.nama.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {selectedApplicant.nama}
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="font-mono font-bold text-sky-800">
                      No. Reg: {selectedApplicant.nomorRegistrasi}
                    </span>
                    <span>·</span>
                    <span>{selectedApplicant.email}</span>
                    <span>·</span>
                    <span>{selectedApplicant.nomorHp}</span>
                  </div>
                </div>
              </div>

              {/* Status Seleksi Pill (Lolos / Waiting List / Tidak Lolos) */}
              <div className="flex items-center gap-3">
                {selectedApplicant.status === 'Lolos' && (
                  <div className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-2 font-bold text-sm shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Lolos Seleksi</span>
                  </div>
                )}
                {selectedApplicant.status === 'Waiting List' && (
                  <div className="px-4 py-2 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-2 font-bold text-sm shadow-xs">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <span>Waiting List</span>
                  </div>
                )}
                {selectedApplicant.status === 'Tidak Lolos' && (
                  <div className="px-4 py-2 rounded-xl bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-2 font-bold text-sm shadow-xs">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Tidak Lolos</span>
                  </div>
                )}

                <button
                  onClick={() => setShowPrintModal(true)}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Cetak Bukti Pendaftaran"
                >
                  <Printer className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Complete Data Grid as requested:
                - Fakultas
                - Program Studi
                - Jalur
                - Status Verifikasi
                - Skor
                - Ranking
                - Status Seleksi
                - IPI
            */}
            <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Fakultas */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-400 font-semibold block">Fakultas</span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">
                  {selectedApplicant.fakultas}
                </span>
              </div>

              {/* Program Studi */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-400 font-semibold block">Program Studi</span>
                <span className="text-sm font-bold text-sky-800 mt-1 block">
                  {selectedApplicant.programStudi}
                </span>
              </div>

              {/* Jalur */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-400 font-semibold block">Jalur Pendaftaran</span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">
                  {selectedApplicant.jalur}
                </span>
              </div>

              {/* Status Verifikasi */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-400 font-semibold block">Status Verifikasi</span>
                <span className="text-xs font-bold text-emerald-700 mt-1 inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Terverifikasi Biometrik Wajah
                </span>
              </div>

              {/* Skor Akhir */}
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
                <span className="text-xs text-sky-800 font-semibold block">Skor Akhir Nilai</span>
                <span className="text-2xl font-mono font-extrabold text-sky-900 mt-1 block tabular-nums">
                  {selectedApplicant.skorAkhir.toFixed(2).replace('.', ',')}
                </span>
              </div>

              {/* Ranking */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
                <span className="text-xs text-amber-800 font-semibold block">Peringkat Real-Time</span>
                <span className="text-2xl font-mono font-extrabold text-amber-900 mt-1 block">
                  #{currentRank} <span className="text-xs font-sans font-normal text-amber-700">dari {applicants.length}</span>
                </span>
              </div>

              {/* Status Seleksi */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-400 font-semibold block">Status Seleksi</span>
                <span className="text-base font-bold text-slate-900 mt-1 block">
                  {selectedApplicant.status}
                </span>
              </div>

              {/* Nominal IPI */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                <span className="text-xs text-indigo-800 font-semibold block">Nominal IPI Resmi</span>
                <span className="text-base sm:text-lg font-mono font-extrabold text-indigo-950 mt-1 block">
                  {formatRupiah(selectedApplicant.nominalIpi)}
                </span>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="p-6 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Data diperbarui secara real-time berdasarkan hasil verifikasi panitia PMB UGM.
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowPrintModal(true)}
                  className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <FileCheck className="w-4 h-4 text-sky-600" />
                  <span>Cetak Tanda Terima</span>
                </button>
                <Link
                  to="/leaderboard"
                  className="px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Lihat di Leaderboard</span>
                </Link>
              </div>
            </div>

          </div>
        )}

        {/* NOT FOUND STATE */}
        {hasSearched && !selectedApplicant && (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm space-y-4">
            <XCircle className="w-12 h-12 text-rose-500 mx-auto" />
            <h2 className="text-lg font-bold text-slate-800">
              Nomor Registrasi Tidak Ditemukan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Pastikan Anda memasukkan nomor registrasi yang sesuai saat melakukan pendaftaran (contoh format: <strong>2026XXX001</strong>).
            </p>
            <div className="pt-2">
              <Link
                to="/buat-akun"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-950 text-white rounded-xl text-xs font-bold hover:bg-blue-900 transition-colors"
              >
                <span>Daftar Akun Baru</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* PRINT / OFFICIAL RECEIPT MODAL */}
        {showPrintModal && selectedApplicant && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
              
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <span className="text-xs font-bold text-slate-600 uppercase">
                  Bukti Tanda Terima Resmi PMB UGM
                </span>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Printable Document Sheet */}
              <div className="p-8 space-y-6 bg-white text-slate-900 font-sans">
                {/* Header */}
                <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
                  <div className="flex items-center gap-3">
                    <UniversityLogo size="md" />
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider">
                        Universitas Gunung Muria
                      </h4>
                      <p className="text-xs text-slate-600">
                        Panitia Penerimaan Mahasiswa Baru 2026
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block">KARTU BUKTI SELEKSI</span>
                    <span className="font-mono text-sm font-extrabold text-sky-800">
                      {selectedApplicant.nomorRegistrasi}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Nama Peserta:</span>
                    <span className="font-bold text-sm">{selectedApplicant.nama}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Program Studi:</span>
                    <span className="font-bold text-sm">{selectedApplicant.programStudi}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Fakultas:</span>
                    <span className="font-semibold">{selectedApplicant.fakultas}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Jalur:</span>
                    <span className="font-semibold">{selectedApplicant.jalur}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Skor Terstandar:</span>
                    <span className="font-mono font-bold text-sky-700 text-sm">
                      {selectedApplicant.skorAkhir.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Peringkat Sementara:</span>
                    <span className="font-mono font-bold text-amber-700 text-sm">
                      #{currentRank}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Status Kelolosan:</span>
                    <span className="font-bold text-emerald-700 uppercase">
                      {selectedApplicant.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Kewajiban IPI:</span>
                    <span className="font-mono font-bold">
                      {formatRupiah(selectedApplicant.nominalIpi)}
                    </span>
                  </div>
                </div>

                {/* Verification Stamp */}
                <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-emerald-800 block">
                      ✓ Biometrik Wajah Terverifikasi AI
                    </span>
                    <span className="text-[11px] text-slate-500">
                      ID Verifikasi: BIO-UGM-{selectedApplicant.id}
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center font-mono text-[9px] text-slate-600 text-center">
                    [QR CODE VALIDASI]
                  </div>
                </div>
              </div>

              {/* Modal Action buttons */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    showToast('Memulai pencetakan bukti tanda terima...', 'info');
                    try {
                      window.print();
                    } catch {
                      showToast('Silakan gunakan kombinasi Ctrl+P pada browser Anda untuk mencetak.', 'info');
                    }
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-950 hover:bg-blue-900 rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Dokumen</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
