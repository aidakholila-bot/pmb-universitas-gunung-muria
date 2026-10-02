import React from 'react';
import { Link } from 'react-router-dom';
import {
  UserPlus,
  ShieldCheck,
  ScanFace,
  Trophy,
  FileSearch,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { UniversityLogo } from '../components/UniversityLogo';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const { applicants } = useApp();

  const totalCount = 1216 + applicants.length;
  const lolosCount = applicants.filter((a) => a.status === 'Lolos').length;

  const featureCards = [
    {
      title: 'Buat Akun',
      desc: 'Daftar akun untuk memulai proses pendaftaran. Gunakan email aktif dan lakukan verifikasi wajah.',
      path: '/buat-akun',
      icon: UserPlus,
      bgColor: 'bg-sky-50',
      iconBg: 'bg-sky-100 text-sky-600',
      accentHover: 'group-hover:border-sky-300 group-hover:shadow-sky-100'
    },
    {
      title: 'Aktivasi Akun',
      desc: 'Aktifkan akun Anda setelah melakukan pendaftaran. Pastikan email dan data yang dimasukkan sudah benar.',
      path: '/aktivasi-akun',
      icon: ShieldCheck,
      bgColor: 'bg-emerald-50/60',
      iconBg: 'bg-emerald-100 text-emerald-600',
      accentHover: 'group-hover:border-emerald-300 group-hover:shadow-emerald-100'
    },
    {
      title: 'Login',
      desc: 'Masuk ke akun Anda dengan email dan verifikasi wajah untuk mengakses leaderboard dan informasi pendaftaran.',
      path: '/login',
      icon: ScanFace,
      bgColor: 'bg-indigo-50/60',
      iconBg: 'bg-indigo-100 text-indigo-600',
      accentHover: 'group-hover:border-indigo-300 group-hover:shadow-indigo-100'
    },
    {
      title: 'Cek Leaderboard',
      desc: 'Pantau peringkat Anda secara real-time berdasarkan jalur pendaftaran, fakultas, dan program studi.',
      path: '/leaderboard',
      icon: Trophy,
      bgColor: 'bg-amber-50/60',
      iconBg: 'bg-amber-100 text-amber-600',
      accentHover: 'group-hover:border-amber-300 group-hover:shadow-amber-100'
    },
    {
      title: 'Cek Pendaftaran',
      desc: 'Lihat status verifikasi berkas, hasil seleksi, serta pengumuman penting lainnya.',
      path: '/cek-pendaftaran',
      icon: FileSearch,
      bgColor: 'bg-cyan-50/60',
      iconBg: 'bg-cyan-100 text-cyan-600',
      accentHover: 'group-hover:border-cyan-300 group-hover:shadow-cyan-100'
    },
    {
      title: 'Panduan & Informasi',
      desc: 'Pelajari jalur pendaftaran, jadwal, persyaratan, serta informasi lengkap seputar PMB Universitas Gunung Muria.',
      path: '/panduan',
      icon: BookOpen,
      bgColor: 'bg-yellow-50/60',
      iconBg: 'bg-yellow-100 text-yellow-600',
      accentHover: 'group-hover:border-yellow-300 group-hover:shadow-yellow-100'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* HERO SECTION Inspired by Reference 1 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-100 via-sky-50 to-blue-100 border-b border-sky-200/60">
        
        {/* Subtle background graphic & mountain silhouette */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full object-cover" viewBox="0 0 1440 400" fill="none">
            <path
              d="M0 340 L180 260 L360 300 L540 220 L720 280 L900 180 L1080 250 L1260 210 L1440 290 L1440 400 L0 400 Z"
              fill="#0284C7"
            />
            <path
              d="M0 360 L240 310 L480 340 L720 290 L960 330 L1200 280 L1440 340 L1440 400 L0 400 Z"
              fill="#0369A1"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-sky-200 text-xs font-semibold text-sky-800 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>PMB Universitas Gunung Muria Tahun Akademik 2026/2027</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Selamat Datang di <br />
                <span className="text-sky-700">Portal Penerimaan Mahasiswa Baru</span> <br />
                Universitas Gunung Muria
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
                Bersama UGM, wujudkan masa depan yang lebih baik melalui pendidikan berkualitas,
                berintegritas, dan berdaya saing.
              </p>

              {/* Yellow horizontal accent line */}
              <div className="w-20 h-1.5 bg-amber-400 rounded-full"></div>

              {/* Call to action buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/buat-akun"
                  className="px-6 py-3 bg-blue-950 hover:bg-blue-900 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Daftar Sekarang</span>
                </Link>
                <Link
                  to="/leaderboard"
                  className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold text-sm rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Lihat Real-Time Leaderboard</span>
                </Link>
              </div>

              {/* Real-time Transparency Pill */}
              <div className="pt-2 flex items-center gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="w-2 h-2 -ml-3.5 rounded-full bg-emerald-500"></span>
                  Leaderboard Real-Time Aktif
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  Verifikasi Biometrik Wajah
                </span>
              </div>
            </div>

            {/* Right Visual Graphic Column (Campus building & Students Representation) */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              
              {/* University Campus Graphic Box */}
              <div className="relative w-full max-w-md bg-white/85 backdrop-blur-md p-6 rounded-3xl border border-sky-100 shadow-xl overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-sky-200/50 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-amber-200/40 rounded-full blur-2xl"></div>
                
                {/* Campus Facade illustration */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-gradient-to-b from-sky-50 to-white rounded-2xl border border-sky-200 shadow-xs">
                    <UniversityLogo size="lg" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-wide uppercase">
                      Universitas Gunung Muria
                    </h3>
                    <p className="text-xs text-sky-800 font-medium">
                      Kampus Berintegritas &amp; Berwawasan Global
                    </p>
                  </div>

                  {/* Student avatars / representation */}
                  <div className="w-full bg-gradient-to-r from-sky-100/70 to-blue-50/80 rounded-2xl p-4 border border-sky-100/80 flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[11px] text-slate-500 block">Jalur Mandiri Aktif</span>
                      <span className="text-xs font-bold text-slate-800">
                        Rapor &amp; SNBT / UTBK
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-500 block">Total Pendaftar</span>
                      <span className="text-xs font-bold text-sky-700 font-mono">
                        {totalCount.toLocaleString('id-ID')} Siswa
                      </span>
                    </div>
                  </div>

                  {/* Calligraphic Tagline as seen in Reference 1 */}
                  <div className="pt-2 text-center">
                    <span className="text-xl sm:text-2xl font-serif italic text-sky-900 font-semibold tracking-wider block">
                      Ilmu &nbsp;•&nbsp; Integritas &nbsp;•&nbsp; Inovasi
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6 CLICKABLE CARDS GRID Inspired by Reference 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Menu Utama Penerimaan Mahasiswa Baru
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Silakan pilih tahapan layanan pendaftaran, verifikasi identitas, atau pengecekan peringkat seleksi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Link
                key={card.path}
                to={card.path}
                className={`group relative p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between ${card.accentHover} hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${card.iconBg}`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-blue-950 text-slate-500 group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-700">
                  <span>Buka Halaman</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* AI & DATA-DRIVEN TRANSPARENCY EXPLANATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-400/30">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                <span>Teknologi Transparansi UGM 2026</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Sistem Real-Time Leaderboard Berbasis AI dan Data-Driven
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Portal PMB Universitas Gunung Muria menerapkan sistem pemeringkatan otomatis dan transparan.
                Setiap calon mahasiswa dapat melihat posisi peringkat kelolosan secara langsung tanpa ada manipulasi,
                didukung dengan sistem verifikasi biometrik wajah untuk memastikan integritas data pendaftar.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Perhitungan Peringkat Otomatis Real-Time</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Autentikasi Wajah Pencegah Joki Seleksi</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Keterbukaan Data Skor dan Kuota Jurusan</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <div className="text-xs text-sky-300 font-medium">Status Pendaftar Saat Ini</div>
                <div className="text-2xl font-bold font-mono text-white mt-1">
                  {lolosCount} <span className="text-xs font-sans font-normal text-emerald-300">Lolos Kuota Awal</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  Peringkat dinamis dapat bergeser sewaktu-waktu sesuai skor pendaftar baru.
                </div>
              </div>

              <Link
                to="/leaderboard"
                className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-center text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Lihat Data Leaderboard Sekarang</span>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
