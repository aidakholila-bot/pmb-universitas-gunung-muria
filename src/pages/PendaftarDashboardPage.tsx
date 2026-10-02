import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  ShieldCheck,
  Trophy,
  Building2,
  GraduationCap,
  Ticket,
  Lock,
  Save,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  AlertCircle
} from 'lucide-react';
import { FAKULTAS_LIST, JALUR_LIST, Applicant } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const PendaftarDashboardPage: React.FC = () => {
  const { applicants, currentUser, updateApplicant, showToast, getApplicantRank } = useApp();
  const navigate = useNavigate();

  // Find applicant record
  const currentApplicant: Applicant =
    (currentUser?.applicantId &&
      applicants.find((a) => a.id === currentUser.applicantId)) ||
    (currentUser?.email &&
      applicants.find((a) => a.email.toLowerCase() === currentUser.email.toLowerCase())) ||
    applicants[0]; // fallback default demo applicant

  // Editable fields by Pendaftar: Fakultas, Program Studi, Jalur
  const [fakultas, setFakultas] = useState(currentApplicant.fakultas);
  const [programStudi, setProgramStudi] = useState(currentApplicant.programStudi);
  const [jalur, setJalur] = useState<'Mandiri Rapor' | 'Mandiri SNBT / UTBK'>(currentApplicant.jalur);

  // Sync state if applicant updates
  useEffect(() => {
    if (currentApplicant) {
      setFakultas(currentApplicant.fakultas);
      setProgramStudi(currentApplicant.programStudi);
      setJalur(currentApplicant.jalur);
    }
  }, [currentApplicant.id]);

  const activeFaculty = FAKULTAS_LIST.find((f) => f.nama === fakultas);
  const prodiOptions = activeFaculty ? activeFaculty.programStudi : [];

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFaculty = e.target.value;
    setFakultas(newFaculty);
    setProgramStudi(''); // reset prodi when faculty changes
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fakultas) {
      showToast('Fakultas tidak boleh kosong.', 'error');
      return;
    }
    if (!programStudi) {
      showToast('Program Studi wajib dipilih.', 'error');
      return;
    }

    updateApplicant(currentApplicant.id, {
      fakultas,
      programStudi,
      jalur
    });

    showToast('Pilihan Program Studi & Jalur berhasil diperbarui di sistem!', 'success');
  };

  const currentRank = getApplicantRank(currentApplicant.id);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-2xl shadow-xs">
              {currentApplicant.nama.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {currentApplicant.nama}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800">
                  Pendaftar
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-500 mt-1">
                <span className="font-mono">No. Registrasi: <strong className="text-slate-800">{currentApplicant.nomorRegistrasi}</strong></span>
                <span>·</span>
                <span>{currentApplicant.email}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Biometrik Terverifikasi
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/leaderboard"
              className="px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Cek Posisi di Leaderboard</span>
            </Link>
          </div>
        </div>

        {/* SUMMARY STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Peringkat */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Peringkat Saat Ini</span>
              <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">
                #{currentRank > 0 ? currentRank : '-'}
              </div>
              <span className="text-[11px] text-slate-400">Dari {applicants.length} peserta</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Skor Akhir */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Skor Akhir Nilai</span>
              <div className="text-2xl font-extrabold font-mono text-sky-700 mt-1">
                {currentApplicant.skorAkhir.toFixed(2).replace('.', ',')}
              </div>
              <span className="text-[11px] text-slate-400">Skor murni terstandar</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Status Seleksi */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Status Kelolosan</span>
              <div className="mt-1">
                {currentApplicant.status === 'Lolos' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Lolos
                  </span>
                ) : currentApplicant.status === 'Waiting List' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                    <Clock className="w-3.5 h-3.5" /> Waiting List
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                    <XCircle className="w-3.5 h-3.5" /> Tidak Lolos
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Berdasarkan kuota real-time</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Nominal IPI */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Nominal IPI Resmi</span>
              <div className="text-lg font-extrabold font-mono text-slate-900 mt-1">
                {formatRupiah(currentApplicant.nominalIpi)}
              </div>
              <span className="text-[11px] text-slate-400">Ditetapkan universitas</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Ticket className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* FORM SECTION (STRICT EDIT PERMISSION CHECK: CAN ONLY EDIT FAKULTAS, PRODI, JALUR) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Pengaturan Pilihan Program Studi &amp; Jalur
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Calon mahasiswa dapat mengganti preferensi jurusan selama masa pendaftaran masih terbuka.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Periode Pendaftaran Terbuka
            </span>
          </div>

          <form onSubmit={handleSavePreferences} className="space-y-6">
            
            {/* EDITABLE FIELDS */}
            <div className="space-y-4">
              <div className="text-xs font-bold text-sky-800 uppercase tracking-wider flex items-center gap-1.5">
                <span>Pilihan yang Dapat Diubah Pendaftar</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Fakultas (EDITABLE) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>Fakultas</span>
                  </label>
                  <select
                    value={fakultas}
                    onChange={handleFacultyChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 transition-all cursor-pointer"
                  >
                    {FAKULTAS_LIST.map((f) => (
                      <option key={f.nama} value={f.nama}>
                        {f.nama}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Program Studi (EDITABLE - DEPENDENT ON FAKULTAS) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                    <span>Program Studi (S1)</span>
                  </label>
                  <select
                    value={programStudi}
                    onChange={(e) => setProgramStudi(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 transition-all cursor-pointer"
                  >
                    <option value="">-- Pilih Program Studi --</option>
                    {prodiOptions.map((prodi) => (
                      <option key={prodi} value={prodi}>
                        {prodi}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Jalur Pendaftaran (EDITABLE - ONLY Mandiri Rapor or Mandiri SNBT / UTBK) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5 text-sky-600" />
                  <span>Jalur Pendaftaran</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {JALUR_LIST.map((j) => (
                    <label
                      key={j}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-xs font-medium transition-all ${
                        jalur === j
                          ? 'bg-sky-50 border-sky-500 text-sky-900 ring-2 ring-sky-500/20'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="jalurPendaftar"
                        checked={jalur === j}
                        onChange={() => setJalur(j)}
                        className="text-sky-600 focus:ring-sky-500"
                      />
                      <span>{j}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* READ-ONLY LOCKED FIELDS (Skor, Ranking, Status, IPI) */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Data Terkunci (Hanya Dapat Diubah Panitia / Otomatis AI)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-3 bg-slate-100/70 border border-slate-200 rounded-xl">
                  <span className="text-[11px] text-slate-500 font-semibold block">Skor Akhir:</span>
                  <span className="text-sm font-mono font-bold text-slate-800">
                    {currentApplicant.skorAkhir.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Terkunci (Hasil Ujian/Rapor)</span>
                </div>

                <div className="p-3 bg-slate-100/70 border border-slate-200 rounded-xl">
                  <span className="text-[11px] text-slate-500 font-semibold block">Peringkat:</span>
                  <span className="text-sm font-mono font-bold text-slate-800">
                    #{currentRank}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Terkunci (Kalkulasi Sistem)</span>
                </div>

                <div className="p-3 bg-slate-100/70 border border-slate-200 rounded-xl">
                  <span className="text-[11px] text-slate-500 font-semibold block">Status Seleksi:</span>
                  <span className="text-sm font-bold text-slate-800">
                    {currentApplicant.status}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Terkunci (Keputusan Panitia)</span>
                </div>

                <div className="p-3 bg-slate-100/70 border border-slate-200 rounded-xl">
                  <span className="text-[11px] text-slate-500 font-semibold block">Nominal IPI:</span>
                  <span className="text-sm font-mono font-bold text-slate-800">
                    {formatRupiah(currentApplicant.nominalIpi)}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Terkunci (SK Rektor UGM)</span>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Perubahan pilihan prodi akan langsung tercermin pada tabel leaderboard real-time.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 bg-blue-950 hover:bg-blue-900 active:bg-blue-950 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan Pilihan</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
