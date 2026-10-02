import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  UserPlus,
  ShieldCheck,
  ScanFace,
  Trophy,
  DollarSign,
  HelpCircle,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  FileText,
  AlertCircle,
  Clock,
  XCircle
} from 'lucide-react';

interface GuideModalContent {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: any;
  content: React.ReactNode;
}

export const PanduanPage: React.FC = () => {
  const [activeModal, setActiveModal] = useState<GuideModalContent | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const guideCards = [
    {
      id: 'pendaftaran',
      title: 'Panduan Pendaftaran',
      desc: 'Tahapan pendaftaran akun baru, pengisian biodata, serta pemilihan fakultas & program studi.',
      icon: UserPlus,
      badge: 'Tahap 1',
      bgColor: 'bg-sky-50',
      iconColor: 'text-sky-600 bg-sky-100'
    },
    {
      id: 'aktivasi',
      title: 'Aktivasi Akun & Biometrik',
      desc: 'Prosedur pemindaian biometrik wajah menggunakan kamera perangkat untuk verifikasi identitas resmi.',
      icon: ShieldCheck,
      badge: 'Tahap 2',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600 bg-emerald-100'
    },
    {
      id: 'login',
      title: 'Login Biometrik Wajah',
      desc: 'Sistem login aman tanpa kata sandi menggunakan pencocokan fitur wajah secara instan.',
      icon: ScanFace,
      badge: 'Autentikasi',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600 bg-indigo-100'
    },
    {
      id: 'leaderboard',
      title: 'Sistem Real-Time Leaderboard',
      desc: 'Memahami cara kerja pemeringkatan otomatis berbasis AI dan transparansi data seleksi.',
      icon: Trophy,
      badge: 'Transparansi',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600 bg-amber-100'
    },
    {
      id: 'ipi',
      title: 'Informasi IPI (Uang Gedung)',
      desc: 'Penetapan nominal Iuran Pengembangan Institusi berdasarkan fakultas dan jalur mandiri.',
      icon: DollarSign,
      badge: 'Finansial',
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-600 bg-cyan-100'
    },
    {
      id: 'faq',
      title: 'FAQ (Tanya Jawab PMB)',
      desc: 'Jawaban atas pertanyaan yang paling sering diajukan oleh calon mahasiswa baru.',
      icon: HelpCircle,
      badge: 'Bantuan',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600 bg-yellow-100'
    }
  ];

  const getModalDetails = (id: string): GuideModalContent => {
    switch (id) {
      case 'pendaftaran':
        return {
          id: 'pendaftaran',
          title: 'Panduan Pendaftaran Mahasiswa Baru',
          subtitle: 'Langkah mudah memulai pendaftaran di Universitas Gunung Muria',
          badge: 'Panduan Lengkap',
          icon: UserPlus,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                Proses pendaftaran PMB UGM 2026/2027 dilakukan secara online dan terpusat. Calon mahasiswa diharapkan menyiapkan data diri yang valid sesuai KTP/Ijazah.
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Buka Menu Buat Akun:</strong> Pilih kategori &quot;Pendaftar (Calon Mahasiswa)&quot;.
                </li>
                <li>
                  <strong>Isi Biodata Diri:</strong> Masukkan Nama Lengkap, Email aktif, dan Nomor WhatsApp.
                </li>
                <li>
                  <strong>Pilih Fakultas &amp; Program Studi:</strong> Tentukan 1 pilihan program studi S1 yang diminati. Pilihan program studi akan otomatis menyesuaikan fakultas yang dipilih.
                </li>
                <li>
                  <strong>Tentukan Jalur Masuk:</strong> Pilih antara <em>Mandiri Rapor</em> (berdasarkan nilai semester 1-5) atau <em>Mandiri SNBT / UTBK</em> (berdasarkan skor tes resmi).
                </li>
                <li>
                  <strong>Kirim Formulir:</strong> Sistem akan mengarahkan Anda ke aktivasi biometrik wajah.
                </li>
              </ol>
              <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-sky-900">
                💡 <em>Catatan:</em> Setelah mendaftar, Anda tetap dapat mengubah pilihan Fakultas dan Program Studi di Dashboard Pendaftar selama masa seleksi belum ditutup.
              </div>
            </div>
          )
        };

      case 'aktivasi':
        return {
          id: 'aktivasi',
          title: 'Aktivasi Akun & Verifikasi Biometrik Wajah',
          subtitle: 'Standar verifikasi identitas modern Universitas Gunung Muria',
          badge: 'Keamanan Digital',
          icon: ShieldCheck,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                Universitas Gunung Muria menjadi pelopor transparansi PMB dengan menerapkan sistem <strong>Face Biometric Verification</strong> untuk memastikan keaslian peserta dan mencegah joki seleksi.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">1. Wajah Terlihat</span>
                  <p className="text-[11px] text-slate-500">
                    Lepas kacamata tebal, topi, dan masker agar fitur biometrik terbaca sempurna.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">2. Cahaya Cukup</span>
                  <p className="text-[11px] text-slate-500">
                    Hindari posisi membelakangi jendela atau sumber cahaya langsung.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">3. Posisi Tegak</span>
                  <p className="text-[11px] text-slate-500">
                    Tatap langsung ke lensa kamera dengan jarak ideal 30–50 cm.
                  </p>
                </div>
              </div>
              <p>
                Jika kamera tidak terdeteksi atau peramban tidak mendukung izin webcam, Anda dapat menggunakan tombol <strong>Mode Demo</strong> yang disediakan di halaman aktivasi.
              </p>
            </div>
          )
        };

      case 'login':
        return {
          id: 'login',
          title: 'Login Tanpa Kata Sandi (Passwordless Biometric)',
          subtitle: 'Kemudahan akses dengan pemindaian biometrik',
          badge: 'Inovasi UX',
          icon: ScanFace,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                Demi kemudahan dan perlindungan dari pencurian kata sandi, portal ini menggunakan konsep <strong>Passwordless Authentication</strong>:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Anda cukup memilih peran (Pendaftar atau Pegawai/Admin) dan mengetikkan alamat email.
                </li>
                <li>
                  Tidak ada kolom input password konvensional yang rentan bocor.
                </li>
                <li>
                  Cukup klik tombol <em>&quot;Lanjutkan dengan Verifikasi Wajah&quot;</em> dan hadapkan wajah ke layar.
                </li>
                <li>
                  Sistem langsung mengenali profil Anda dan membuka dashboard yang relevan.
                </li>
              </ul>
            </div>
          )
        };

      case 'leaderboard':
        return {
          id: 'leaderboard',
          title: 'Sistem Real-Time Leaderboard & AI Ranking',
          subtitle: 'Keterbukaan posisi peringkat seleksi tanpa manipulasi',
          badge: 'Transparansi Penuh',
          icon: Trophy,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                Leaderboard real-time merupakan inti inovasi portal PMB UGM. Seluruh pendaftar diurutkan murni berdasarkan <strong>Skor Akhir</strong> tertinggi.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Status Lolos (Warna Hijau): Masuk dalam kuota kapasitas prodi.</span>
                </div>
                <div className="flex items-center gap-2 text-amber-800 font-semibold">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Status Waiting List (Warna Kuning): Berada di daftar tunggu cadangan.</span>
                </div>
                <div className="flex items-center gap-2 text-rose-800 font-semibold">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Status Tidak Lolos (Warna Merah): Skor berada di bawah batas kelolosan.</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
                Peringkat diperbarui secara otomatis setiap kali panitia mengoreksi nilai atau ada pendaftar baru yang teraktivasi.
              </p>
            </div>
          )
        };

      case 'ipi':
        return {
          id: 'ipi',
          title: 'Informasi Iuran Pengembangan Institusi (IPI)',
          subtitle: 'Pedoman besaran IPI berdasarkan kelompok fakultas',
          badge: 'Ketentuan Keuangan',
          icon: DollarSign,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                Iuran Pengembangan Institusi (IPI) dibayarkan satu kali selama masa studi oleh calon mahasiswa yang dinyatakan lolos melalui Jalur Mandiri:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-200 text-xs">
                  <thead>
                    <tr className="bg-slate-100 font-bold">
                      <th className="p-2.5 border border-slate-200">Fakultas / Kelompok Ilmu</th>
                      <th className="p-2.5 border border-slate-200">Rentang Nominal IPI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-2.5 border border-slate-200">Fakultas Kedokteran (Kedokteran &amp; Gigi)</td>
                      <td className="p-2.5 border border-slate-200 font-mono font-bold text-sky-900">Rp 60.000.000 - Rp 85.000.000</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border border-slate-200">Fakultas Teknik &amp; Farmasi</td>
                      <td className="p-2.5 border border-slate-200 font-mono font-bold text-sky-900">Rp 20.000.000 - Rp 35.000.000</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border border-slate-200">Fakultas Ekonomi &amp; Bisnis, Hukum, FISIP</td>
                      <td className="p-2.5 border border-slate-200 font-mono font-bold text-sky-900">Rp 15.000.000 - Rp 25.000.000</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border border-slate-200">Fakultas Pertanian, Biologi, MIPA, Peternakan, Perikanan, Budaya</td>
                      <td className="p-2.5 border border-slate-200 font-mono font-bold text-sky-900">Rp 8.000.000 - Rp 15.000.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500">
                *Penyesuaian besaran IPI dilakukan oleh panitia secara transparan dan dicantumkan pada kartu kelolosan pendaftar.
              </p>
            </div>
          )
        };

      case 'faq':
      default:
        return {
          id: 'faq',
          title: 'Frequently Asked Questions (FAQ)',
          subtitle: 'Pertanyaan umum seputar sistem PMB Universitas Gunung Muria',
          badge: 'Tanya Jawab',
          icon: HelpCircle,
          content: (
            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold block text-slate-900">Q: Apakah saya bisa mengganti prodi setelah mendaftar?</span>
                <p className="text-slate-600 mt-1">
                  A: Ya, calon mahasiswa dapat mengganti pilihan Fakultas dan Program Studi secara mandiri di Dashboard Pendaftar.
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold block text-slate-900">Q: Bagaimana jika kamera tidak bisa dibuka saat aktivasi?</span>
                <p className="text-slate-600 mt-1">
                  A: Anda dapat mengklik tombol &quot;Mode Demo&quot; untuk menjalankan simulasi pemindaian biometrik tanpa hambatan.
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold block text-slate-900">Q: Apakah urutan di leaderboard bisa berubah?</span>
                <p className="text-slate-600 mt-1">
                  A: Ya, leaderboard beroperasi secara real-time. Jika ada pendaftar baru dengan skor lebih tinggi, peringkat akan otomatis bergeser.
                </p>
              </div>
            </div>
          )
        };
    }
  };

  const faqs = [
    {
      q: 'Bagaimana cara melihat posisi saya di tabel kelolosan?',
      a: 'Buka menu "Cek Leaderboard" atau menu "Cek Pendaftaran". Masukkan nomor registrasi Anda pada kolom pencarian untuk melihat peringkat dan status kelulusan Anda secara real-time.'
    },
    {
      q: 'Apa perbedaan Jalur Mandiri Rapor dan Jalur Mandiri SNBT / UTBK?',
      a: 'Jalur Mandiri Rapor menyeleksi calon mahasiswa berdasarkan rekap nilai semester 1 sampai 5. Sedangkan Jalur Mandiri SNBT / UTBK menggunakan sertifikat nilai UTBK resmi yang dikeluarkan oleh panitia pusat.'
    },
    {
      q: 'Mengapa sistem menggunakan verifikasi wajah biometrik?',
      a: 'Verifikasi biometrik menjamin bahwa orang yang mendaftar dan mengikuti seleksi adalah orang yang sama, mencegah kecurangan dan joki, serta menghapus kebutuhan mengingat kata sandi.'
    },
    {
      q: 'Apakah panitia admin dapat mengubah status pendaftar?',
      a: 'Melalui Dashboard Admin, panitia memiliki hak akses resmi untuk memverifikasi dokumen fisik, menyesuaikan kuota kelulusan prodi, dan menginput penyesuaian nominal IPI.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-sky-100 via-sky-50 to-blue-100 rounded-3xl p-6 sm:p-10 border border-sky-200/80 shadow-xs text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-sky-200/80 text-sky-900 text-xs font-bold uppercase tracking-wider mb-2">
            Pusat Informasi &amp; Layanan
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Panduan &amp; Informasi PMB
          </h1>
          <p className="text-xs sm:text-base text-slate-600 mt-2 leading-relaxed">
            Informasi lengkap tata cara registrasi, aktivasi biometrik, pembacaan leaderboard, besaran IPI, serta jawaban atas pertanyaan umum seputar PMB Universitas Gunung Muria.
          </p>
        </div>

        {/* 6 GUIDE CARDS (CLICKABLE -> OPENS DETAILED MODAL) */}
        <div>
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Modul Panduan Interaktif
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Klik salah satu kartu di bawah untuk membuka penjelasan terperinci.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guideCards.map((card) => {
              const IconComp = card.icon;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setActiveModal(getModalDetails(card.id))}
                  className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-xl transition-all duration-200 flex flex-col justify-between text-left hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconColor}`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-700">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ ACCORDION SECTION */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Pertanyaan yang Sering Diajukan
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Temukan solusi cepat atas kendala teknis atau aturan seleksi.
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 pr-4">
                    {faq.q}
                  </span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-sky-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="p-4 sm:p-5 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS MODAL */}
        {activeModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
              
              <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-sky-50 to-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                    <activeModal.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {activeModal.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {activeModal.subtitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
                {activeModal.content}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  PMB Universitas Gunung Muria 2026
                </span>
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-950 hover:bg-blue-900 rounded-xl shadow-xs"
                >
                  Mengerti &amp; Tutup
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
