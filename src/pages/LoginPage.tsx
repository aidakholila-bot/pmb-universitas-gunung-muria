import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Shield,
  ScanFace,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Info,
  Eye
} from 'lucide-react';
import { UniversityLogo } from '../components/UniversityLogo';
import { useApp } from '../context/AppContext';
import { DEMO_ADMIN } from '../data/mockData';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { applicants, loginUser, showToast } = useApp();

  const [selectedRole, setSelectedRole] = useState<'pendaftar' | 'admin' | null>(null);
  const [emailInput, setEmailInput] = useState('');
  
  // Biometric verification simulation state inside Login
  const [isVerifyingFace, setIsVerifyingFace] = useState(false);
  const [progress, setProgress] = useState(0);
  const [verifyStatus, setVerifyStatus] = useState('Menghubungkan sensor wajah...');

  const handleStartLoginBiometric = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailInput.trim() || !emailInput.includes('@')) {
      showToast('Masukkan email valid yang terdaftar.', 'error');
      return;
    }

    setIsVerifyingFace(true);
    setProgress(0);

    const steps = [
      { p: 25, msg: 'Memindai kontur wajah...', delay: 600 },
      { p: 55, msg: 'Mencocokkan template biometrik...', delay: 1300 },
      { p: 85, msg: 'Validasi token keamanan AI...', delay: 2000 },
      { p: 100, msg: 'Autentikasi Berhasil!', delay: 2800 }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        setProgress(step.p);
        setVerifyStatus(step.msg);

        if (step.p === 100) {
          setTimeout(() => {
            if (selectedRole === 'admin') {
              loginUser({
                role: 'Pegawai / Admin',
                email: emailInput,
                nama: DEMO_ADMIN.nama,
                nip: DEMO_ADMIN.nip
              });
              navigate('/dashboard-admin');
            } else {
              // Find matching applicant or fallback to first applicant
              const matched = applicants.find(
                (a) => a.email.toLowerCase() === emailInput.trim().toLowerCase()
              ) || applicants[0];

              loginUser({
                role: 'Pendaftar',
                applicantId: matched.id,
                email: emailInput,
                nama: matched.nama
              });
              navigate('/dashboard-pendaftar');
            }
          }, 600);
        }
      }, step.delay);
    });
  };

  const handleQuickDemo = (role: 'pendaftar' | 'admin') => {
    setSelectedRole(role);
    if (role === 'pendaftar') {
      setEmailInput('raihan.pratama@gmail.com');
    } else {
      setEmailInput('admin.pmb@gunungmuria.ac.id');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      
      {/* Back button */}
      <div className="w-full max-w-lg mb-6 flex items-center justify-between">
        <button
          onClick={() => {
            if (isVerifyingFace) {
              setIsVerifyingFace(false);
            } else if (selectedRole) {
              setSelectedRole(null);
            } else {
              navigate('/');
            }
          }}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{selectedRole ? 'Kembali ke Pilihan Akun' : 'Kembali ke Beranda'}</span>
        </button>

        <span className="text-xs text-sky-400 font-mono">Autentikasi Biometrik</span>
      </div>

      <div className="w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-sky-100/30 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 sm:p-8 text-center border-b border-slate-100 bg-gradient-to-b from-sky-50/70 to-white">
          <div className="flex justify-center mb-3">
            <UniversityLogo size="lg" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Portal Masuk PMB UGM
          </h1>
          <p className="text-xs sm:text-sm text-sky-800 font-semibold mt-0.5">
            Sistem Autentikasi Biometrik Wajah Tanpa Kata Sandi
          </p>
        </div>

        <div className="p-6 sm:p-8">
          
          {/* STEP 1: ROLE SELECTION (No role picked yet) */}
          {!selectedRole && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
                <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Pilih Kategori:</span> Silakan tentukan peran akun Anda untuk memulai proses login biometrik.
                </div>
              </div>

              <div className="space-y-3.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('pendaftar');
                    setEmailInput('raihan.pratama@gmail.com');
                  }}
                  className="w-full p-5 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-bold group-hover:text-sky-200 transition-colors">
                        Pendaftar
                      </div>
                      <div className="text-xs text-sky-200/90 mt-0.5">
                        Calon mahasiswa baru peserta seleksi PMB
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-sky-300 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('admin');
                    setEmailInput('admin.pmb@gunungmuria.ac.id');
                  }}
                  className="w-full p-5 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-bold group-hover:text-emerald-200 transition-colors">
                        Pegawai / Admin
                      </div>
                      <div className="text-xs text-emerald-200/90 mt-0.5">
                        Panitia seleksi, verifikator, dan manajemen kuota
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="pt-2 text-center text-xs text-slate-500">
                Belum memiliki akun?{' '}
                <button
                  onClick={() => navigate('/buat-akun')}
                  className="text-sky-700 font-semibold hover:underline"
                >
                  Daftar akun di sini
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: EMAIL INPUT (NO PASSWORD FIELD PER PROMPT) */}
          {selectedRole && !isVerifyingFace && (
            <form onSubmit={handleStartLoginBiometric} className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  {selectedRole === 'admin' ? (
                    <Shield className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <User className="w-4 h-4 text-sky-600" />
                  )}
                  Masuk Sebagai {selectedRole === 'admin' ? 'Pegawai / Admin' : 'Pendaftar'}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="text-xs text-sky-600 hover:underline"
                >
                  Ganti Peran
                </button>
              </div>

              {/* Email field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Alamat Email Terdaftar <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder={
                      selectedRole === 'admin'
                        ? 'admin.pmb@gunungmuria.ac.id'
                        : 'emailanda@gmail.com'
                    }
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Explicit prompt instruction:
                  "There must be NO password field.
                   Text: 'Login menggunakan verifikasi biometrik wajah.'
                   Button: 'Lanjutkan dengan Verifikasi Wajah'"
              */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 text-xs sm:text-sm flex items-start gap-3">
                <ScanFace className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-indigo-900">
                    Login menggunakan verifikasi biometrik wajah.
                  </span>
                  <span className="text-xs text-indigo-800/80">
                    Sistem mendeteksi fitur biometrik wajah Anda sebagai kunci autentikasi aman tanpa perlu mengingat kata sandi.
                  </span>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-blue-950 hover:bg-blue-900 active:bg-blue-950 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <ScanFace className="w-4 h-4" />
                <span>Lanjutkan dengan Verifikasi Wajah</span>
              </button>

              {/* Quick Demo Helpers for easy testing */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="text-[11px] text-slate-400 text-center font-medium">
                  Atau gunakan akun contoh untuk pengujian instan:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('pendaftar')}
                    className="p-2 text-[11px] rounded-lg border border-slate-200 hover:bg-sky-50 hover:border-sky-300 text-slate-700 font-medium transition-colors text-center"
                  >
                    Calon Mahasiswa (Raihan)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('admin')}
                    className="p-2 text-[11px] rounded-lg border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 font-medium transition-colors text-center"
                  >
                    Admin PMB (Drs. Hendro)
                  </button>
                </div>
              </div>

            </form>
          )}

          {/* STEP 3: FACE BIOMETRIC VERIFICATION SIMULATION DURING LOGIN */}
          {isVerifyingFace && (
            <div className="py-4 flex flex-col items-center justify-center space-y-6 text-center animate-in fade-in duration-200">
              
              <div className="relative w-48 h-48 rounded-full p-2 bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 shadow-xl flex items-center justify-center">
                
                {/* Rotating scanner ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/60 animate-radar"></div>

                {/* Inner Face Simulation Frame */}
                <div className="relative w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center">
                  <Eye className="w-16 h-16 text-sky-400 animate-pulse" />

                  {/* Scanning beam */}
                  <div className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-scan-line"></div>

                  {progress === 100 && (
                    <div className="absolute inset-0 bg-emerald-900/90 flex flex-col items-center justify-center text-white">
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-1" />
                      <span className="text-xs font-bold">Terverifikasi</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-base font-bold text-slate-800 flex items-center justify-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping"></span>
                  <span>{verifyStatus}</span>
                  <span className="font-mono text-sky-700 font-bold">{progress}%</span>
                </div>
                <p className="text-xs text-slate-500">
                  Mengidentifikasi akun: <strong className="text-slate-700">{emailInput}</strong>
                </p>
              </div>

              {/* Progress indicator bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <p className="text-[11px] text-slate-400">
                Otomatis mengarahkan ke Dashboard {selectedRole === 'admin' ? 'Admin' : 'Pendaftar'}...
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
