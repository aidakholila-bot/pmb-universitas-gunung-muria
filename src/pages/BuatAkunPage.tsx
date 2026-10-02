import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Shield,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Building2,
  Mail,
  Phone,
  BookMarked,
  CheckCircle2,
  Info
} from 'lucide-react';
import { UniversityLogo } from '../components/UniversityLogo';
import { FAKULTAS_LIST, JALUR_LIST } from '../data/mockData';
import { useApp, RegistrationDraft } from '../context/AppContext';

export const BuatAkunPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRegistrationDraft, showToast } = useApp();

  // Role selection state: null = selecting role, 'pendaftar' | 'admin'
  const [selectedRole, setSelectedRole] = useState<'pendaftar' | 'admin' | null>(null);

  // Pendaftar Form State
  const [namaLengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [nomorHp, setNomorHp] = useState('');
  const [selectedFakultas, setSelectedFakultas] = useState('');
  const [selectedProdi, setSelectedProdi] = useState('');
  const [selectedJalur, setSelectedJalur] = useState<'Mandiri Rapor' | 'Mandiri SNBT / UTBK'>('Mandiri Rapor');

  // Admin Form State
  const [adminNama, setAdminNama] = useState('');
  const [adminNip, setAdminNip] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminUnit, setAdminUnit] = useState('Panitia Seleksi PMB');

  // Dependent prodi list based on selected fakultas
  const activeFaculty = FAKULTAS_LIST.find((f) => f.nama === selectedFakultas);
  const prodiOptions = activeFaculty ? activeFaculty.programStudi : [];

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFaculty = e.target.value;
    setSelectedFakultas(newFaculty);
    // Reset prodi when faculty changes
    setSelectedProdi('');
  };

  const handlePendaftarSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!namaLengkap.trim()) {
      showToast('Nama Lengkap wajib diisi.', 'error');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      showToast('Format email tidak valid.', 'error');
      return;
    }
    if (!nomorHp.trim() || nomorHp.length < 9) {
      showToast('Nomor HP tidak valid.', 'error');
      return;
    }
    if (!selectedFakultas) {
      showToast('Silakan pilih Fakultas terlebih dahulu.', 'error');
      return;
    }
    if (!selectedProdi) {
      showToast('Silakan pilih Program Studi.', 'error');
      return;
    }

    const draft: RegistrationDraft = {
      nama: namaLengkap.trim(),
      email: email.trim().toLowerCase(),
      nomorHp: nomorHp.trim(),
      fakultas: selectedFakultas,
      programStudi: selectedProdi,
      jalur: selectedJalur,
      role: 'Pendaftar'
    };

    setRegistrationDraft(draft);
    showToast('Data pendaftaran tersimpan. Lanjutkan ke verifikasi wajah biometrik.', 'info');
    navigate('/aktivasi-akun');
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!adminNama.trim() || !adminNip.trim() || !adminEmail.trim()) {
      showToast('Semua kolom data pegawai wajib diisi.', 'error');
      return;
    }

    const draft: RegistrationDraft = {
      nama: adminNama.trim(),
      email: adminEmail.trim().toLowerCase(),
      nomorHp: '081234567890',
      fakultas: 'Biro Administrasi Akademik',
      programStudi: adminUnit,
      jalur: 'Mandiri SNBT / UTBK',
      role: 'Pegawai / Admin'
    };

    setRegistrationDraft(draft);
    showToast('Data registrasi pegawai tersimpan. Lanjutkan verifikasi wajah biometrik.', 'info');
    navigate('/aktivasi-akun');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      
      {/* Back button */}
      <div className="w-full max-w-xl mb-6 flex items-center justify-between">
        <button
          onClick={() => {
            if (selectedRole) {
              setSelectedRole(null);
            } else {
              navigate('/');
            }
          }}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{selectedRole ? 'Kembali ke Pilihan Peran' : 'Kembali ke Beranda'}</span>
        </button>

        <span className="text-xs text-sky-400 font-mono">Langkah 1 dari 3</span>
      </div>

      {/* Main Container Card inspired by Reference 2 */}
      <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-sky-100/30 overflow-hidden">
        
        {/* Card Header with Emblem */}
        <div className="p-6 sm:p-8 text-center border-b border-slate-100 bg-gradient-to-b from-sky-50/70 to-white">
          <div className="flex justify-center mb-3">
            <UniversityLogo size="lg" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Universitas Gunung Muria
          </h1>
          <p className="text-xs sm:text-sm text-sky-800 font-semibold mt-0.5">
            Portal Penerimaan Mahasiswa Baru
          </p>
          <p className="text-xs text-slate-500 mt-1 font-serif italic">
            Spirit of Academic Integrity &amp; Transparency
          </p>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: ROLE SELECTION (Inspired directly by Reference 2) */}
          {!selectedRole && (
            <div className="space-y-6">
              {/* Guidance Box from Reference 2 */}
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
                <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Petunjuk:</span> Pilih kategori akun Anda agar proses pendaftaran dan autentikasi biometrik dilakukan dengan tepat.
                </div>
              </div>

              <div className="space-y-3.5">
                {/* Role 1: Pendaftar */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('pendaftar')}
                  className="w-full p-5 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-bold group-hover:text-sky-200 transition-colors">
                        Pendaftar (Calon Mahasiswa)
                      </div>
                      <div className="text-xs text-sky-200/90 mt-0.5">
                        Daftar seleksi jalur Mandiri Rapor / SNBT UTBK
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-sky-300 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Role 2: Pegawai / Admin */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className="w-full p-5 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-bold group-hover:text-emerald-200 transition-colors">
                        Pegawai / Admin PMB
                      </div>
                      <div className="text-xs text-emerald-200/90 mt-0.5">
                        Panitia seleksi, verifikator nilai, dan pengelola IPI
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="pt-2 text-center text-xs text-slate-500">
                Sudah memiliki akun?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-sky-700 font-semibold hover:underline"
                >
                  Masuk di sini
                </button>
              </div>
            </div>
          )}

          {/* STEP 2A: PENDAFTAR REGISTRATION FORM */}
          {selectedRole === 'pendaftar' && (
            <form onSubmit={handlePendaftarSubmit} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-sky-600" />
                  Formulir Pendaftaran Calon Mahasiswa
                </h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 font-medium">
                  Pendaftar
                </span>
              </div>

              {/* Nama Lengkap */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap Sesuai KTP / Ijazah <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={namaLengkap}
                    onChange={(e) => setNamaLengkap(e.target.value)}
                    placeholder="Contoh: Muhammad Ilham Saputra"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Aktif <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Contoh: ilham.saputra@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Email ini digunakan sebagai akun login biometrik dan penerimaan kartu ujian.
                </p>
              </div>

              {/* Nomor HP */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor HP / WhatsApp <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={nomorHp}
                    onChange={(e) => setNomorHp(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Fakultas (Dropdown of 12 faculties) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pilihan Fakultas <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <select
                    required
                    value={selectedFakultas}
                    onChange={handleFacultyChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    <option value="">-- Pilih Fakultas --</option>
                    {FAKULTAS_LIST.map((f) => (
                      <option key={f.nama} value={f.nama}>
                        {f.nama}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Program Studi (Dependent dropdown) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pilihan Program Studi (S1) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <select
                    required
                    disabled={!selectedFakultas}
                    value={selectedProdi}
                    onChange={(e) => setSelectedProdi(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {selectedFakultas ? '-- Pilih Program Studi --' : 'Pilih Fakultas terlebih dahulu'}
                    </option>
                    {prodiOptions.map((prodi) => (
                      <option key={prodi} value={prodi}>
                        {prodi}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Jalur Pendaftaran (ONLY Mandiri Rapor or Mandiri SNBT / UTBK) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jalur Pendaftaran <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {JALUR_LIST.map((jalur) => (
                    <label
                      key={jalur}
                      className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-medium transition-all ${
                        selectedJalur === jalur
                          ? 'bg-sky-50 border-sky-500 text-sky-900 ring-2 ring-sky-500/20'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="jalur"
                        checked={selectedJalur === jalur}
                        onChange={() => setSelectedJalur(jalur)}
                        className="text-sky-600 focus:ring-sky-500"
                      />
                      <span>{jalur}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Setelah menekan tombol di bawah, Anda akan diarahkan ke tahap <strong>Aktivasi Akun</strong> untuk melakukan pemindaian biometrik wajah.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-950 hover:bg-blue-900 active:bg-blue-950 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Lanjutkan ke Verifikasi Wajah</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2B: ADMIN REGISTRATION FORM */}
          {selectedRole === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  Registrasi Akun Pegawai / Admin PMB
                </h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                  Pegawai / Admin
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap beserta Gelar <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={adminNama}
                  onChange={(e) => setAdminNama(e.target.value)}
                  placeholder="Contoh: Drs. Hendro Wibowo, M.Kom."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor Induk Pegawai (NIP / NIDN) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={adminNip}
                  onChange={(e) => setAdminNip(e.target.value)}
                  placeholder="Contoh: 197805122003121002"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Institusi (@gunungmuria.ac.id) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="Contoh: hendro.wibowo@gunungmuria.ac.id"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Unit Kerja / Penugasan
                </label>
                <select
                  value={adminUnit}
                  onChange={(e) => setAdminUnit(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Panitia Seleksi PMB">Panitia Seleksi PMB</option>
                  <option value="Biro Administrasi Akademik">Biro Administrasi Akademik</option>
                  <option value="Tim Verifikator Nilai & IPI">Tim Verifikator Nilai &amp; IPI</option>
                  <option value="Pusat Data dan Informasi (Pusdatin)">Pusat Data dan Informasi (Pusdatin)</option>
                </select>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-950 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Admin PMB memiliki otorisasi penuh untuk memperbarui status pendaftar, memvalidasi kuota program studi, dan mengelola Iuran Pengembangan Institusi (IPI).
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Lanjutkan ke Verifikasi Wajah Admin</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
