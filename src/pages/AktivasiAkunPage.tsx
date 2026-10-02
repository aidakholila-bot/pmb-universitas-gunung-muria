import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Camera,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Sun,
  Eye,
  Crosshair,
  AlertTriangle,
  Play,
  ShieldCheck,
  Trophy,
  LayoutDashboard
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AktivasiAkunPage: React.FC = () => {
  const navigate = useNavigate();
  const { registrationDraft, registerAndActivateApplicant, showToast, currentUser, loginUser } = useApp();

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatusText, setScanStatusText] = useState('Siap untuk verifikasi');
  const [isVerifiedSuccess, setIsVerifiedSuccess] = useState(false);
  const [activatedApplicantNoReg, setActivatedApplicantNoReg] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize camera
  useEffect(() => {
    let active = true;

    async function startCamera() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 640 },
              height: { ideal: 640 },
              facingMode: 'user'
            },
            audio: false
          });

          if (active) {
            streamRef.current = stream;
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.play().catch(() => {});
            }
            setHasCameraPermission(true);
          }
        } else {
          setHasCameraPermission(false);
          setIsDemoMode(true);
        }
      } catch (err) {
        console.warn('Webcam permission error or not supported:', err);
        if (active) {
          setHasCameraPermission(false);
          setIsDemoMode(true);
        }
      }
    }

    startCamera();

    return () => {
      active = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Update status message based on progress
  useEffect(() => {
    if (!isScanning && scanProgress === 0) {
      setScanStatusText('Posisikan wajah Anda di dalam lingkaran');
    } else if (scanProgress > 0 && scanProgress < 25) {
      setScanStatusText('Memindai wajah...');
    } else if (scanProgress >= 25 && scanProgress < 60) {
      setScanStatusText('Wajah terdeteksi, mempertahankan fokus...');
    } else if (scanProgress >= 60 && scanProgress < 95) {
      setScanStatusText('Memeriksa kecocokan biometrik AI...');
    } else if (scanProgress >= 100) {
      setScanStatusText('Verifikasi Wajah Berhasil!');
    }
  }, [scanProgress, isScanning]);

  const handleStartVerification = () => {
    setIsScanning(true);
    setScanProgress(0);

    const steps = [
      { progress: 20, delay: 600 },
      { progress: 40, delay: 1300 },
      { progress: 65, delay: 2100 },
      { progress: 80, delay: 2900 },
      { progress: 100, delay: 3800 }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        setScanProgress(step.progress);

        if (step.progress === 100) {
          setIsScanning(false);
          setIsVerifiedSuccess(true);

          // If there is a registration draft, complete the registration
          if (registrationDraft) {
            if (registrationDraft.role === 'Pegawai / Admin') {
              loginUser({
                role: 'Pegawai / Admin',
                email: registrationDraft.email,
                nama: registrationDraft.nama,
                nip: '197805122003121002'
              });
              setActivatedApplicantNoReg('ADM-UGM-2026');
            } else {
              const newApp = registerAndActivateApplicant(registrationDraft);
              setActivatedApplicantNoReg(newApp.nomorRegistrasi);
            }
          } else if (currentUser) {
            // Already logged in user doing reverification
            setActivatedApplicantNoReg('2026XXX001');
            showToast('Verifikasi biometrik berhasil diperbarui!', 'success');
          } else {
            // Default demo applicant
            setActivatedApplicantNoReg('2026XXX' + Math.floor(100 + Math.random() * 890));
            showToast('Verifikasi biometrik wajah berhasil!', 'success');
          }
        }
      }, step.delay);
    });
  };

  const handleResetVerification = () => {
    setIsScanning(false);
    setScanProgress(0);
    setIsVerifiedSuccess(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumb matching Reference 3 */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-slate-800 transition-colors">Beranda</Link>
            <span>/</span>
            <Link to="/buat-akun" className="hover:text-slate-800 transition-colors">Buat Akun</Link>
            <span>/</span>
            <span className="text-sky-700 font-semibold">Aktivasi Akun</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            Sistem PMB Universitas Gunung Muria
          </div>
        </div>

        {/* Stepper Progress Bar (Reference 3) */}
        <div className="mb-8">
          <div className="flex items-center justify-center max-w-md mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium text-emerald-800 mt-1.5">1. Buat Akun</span>
            </div>

            {/* Line 1 */}
            <div className={`h-1 flex-1 mx-2 rounded-full ${scanProgress === 100 ? 'bg-emerald-500' : 'bg-sky-400'}`}></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-xs ${
                isVerifiedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-sky-600 text-white ring-4 ring-sky-100'
              }`}>
                {isVerifiedSuccess ? <CheckCircle2 className="w-4 h-4" /> : '2'}
              </div>
              <span className="text-[11px] font-semibold text-sky-900 mt-1.5">2. Verifikasi Wajah</span>
            </div>

            {/* Line 2 */}
            <div className={`h-1 flex-1 mx-2 rounded-full ${isVerifiedSuccess ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-xs ${
                isVerifiedSuccess ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                3
              </div>
              <span className={`text-[11px] font-medium mt-1.5 ${isVerifiedSuccess ? 'text-emerald-800 font-semibold' : 'text-slate-400'}`}>
                3. Selesai
              </span>
            </div>
          </div>
        </div>

        {/* MAIN BIOMETRIC CARD (Reference 3 Layout) */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
          
          {/* Card Title & Description */}
          <div className="pt-8 px-6 sm:px-10 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold tracking-wider uppercase mb-2">
              Langkah 2 Dari 3
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Verifikasi Wajah Biometrik
            </h1>
            <p className="text-sm text-slate-600 max-w-lg mx-auto mt-2">
              Posisikan wajah Anda di dalam lingkaran dan sistem AI kami akan memverifikasi identitas Anda secara otomatis.
            </p>

            {/* Candidate details preview if draft exists */}
            {registrationDraft && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900 font-medium">
                <span>Pendaftar: <strong>{registrationDraft.nama}</strong> ({registrationDraft.programStudi})</span>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            
            {/* Notice Alert Banner matching Reference 3 */}
            <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block mb-0.5 text-amber-900">Pastikan kondisi optimal untuk verifikasi:</strong>
                <span>
                  Lepas topi, kacamata, atau masker • Berada di tempat dengan pencahayaan yang cukup terang • Tatap langsung ke kamera
                </span>
              </div>
            </div>

            {/* Webcam / Face Scanning Circular Frame */}
            <div className="flex flex-col items-center justify-center">
              
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-600 shadow-2xl flex items-center justify-center">
                
                {/* Rotating HUD Radar Ring */}
                {isScanning && (
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/60 animate-radar pointer-events-none"></div>
                )}

                {/* Inner Video / Simulation Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
                  
                  {/* Real Camera Preview */}
                  {hasCameraPermission && !isDemoMode ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover scale-x-[-1]"
                    />
                  ) : (
                    /* Fallback Realistic Demo Simulation Face Preview */
                    <div className="w-full h-full bg-gradient-to-b from-slate-800 to-slate-950 relative flex items-center justify-center">
                      <div className="text-center p-4">
                        {/* Realistic Avatar representation */}
                        <div className="w-32 h-32 rounded-full mx-auto border-2 border-dashed border-sky-400/60 flex items-center justify-center bg-sky-950/40">
                          <Eye className="w-12 h-12 text-sky-400/80 animate-pulse" />
                        </div>
                        <span className="text-[11px] text-sky-300 font-mono mt-2 block">
                          [Mode Demo: Pemindaian Biometrik]
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Face Guide Oval Silhouette */}
                  <div className="absolute inset-4 rounded-full border border-sky-400/40 pointer-events-none flex items-center justify-center">
                    <div className="w-40 h-52 rounded-[50%] border-2 border-dashed border-sky-300/60"></div>
                  </div>

                  {/* Scanning Laser Line */}
                  {isScanning && (
                    <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#38bdf8] animate-scan-line pointer-events-none"></div>
                  )}

                  {/* Corner Targets */}
                  <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                  <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
                  <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
                  <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

                  {/* Success Overlay */}
                  {isVerifiedSuccess && (
                    <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-white animate-in zoom-in-95 duration-200">
                      <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-2 drop-shadow-md" />
                      <span className="text-base font-bold text-emerald-200">100% Cocok</span>
                      <span className="text-xs text-white/80">Identitas Terverifikasi</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress & Live Status Text */}
              <div className="mt-5 text-center space-y-1.5">
                <div className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-slate-800">
                  <span className={`w-2.5 h-2.5 rounded-full ${isScanning ? 'bg-cyan-500 animate-ping' : isVerifiedSuccess ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                  <span>{scanStatusText}</span>
                  {isScanning && <span className="font-mono text-sky-700 font-bold">{scanProgress}%</span>}
                </div>
                <p className="text-xs text-slate-500">
                  {isScanning
                    ? 'Tahan posisi wajah Anda tetap di dalam lingkaran...'
                    : isVerifiedSuccess
                    ? 'Data biometrik tersimpan aman dalam sistem pendaftaran UGM.'
                    : 'Arahkan wajah langsung ke lensa kamera dengan pencahayaan merata.'}
                </p>
              </div>

            </div>

            {/* Bottom 3 Requirements Cards from Reference 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Wajah Terlihat</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    Lepas kacamata, topi, dan masker sebelum memulai pemindaian.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Cahaya Cukup</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    Pilih tempat terang dan hindari cahaya kuat langsung dari belakang.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Crosshair className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Posisi Tepat</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    Posisikan wajah di tengah lingkaran dengan jarak ideal 30–50 cm.
                  </p>
                </div>
              </div>
            </div>

            {/* SUCCESS BANNER WHEN VERIFIED */}
            {isVerifiedSuccess && (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-4 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-emerald-900">
                      Selamat, Akun Anda Berhasil Diaktivasi!
                    </h3>
                    <p className="text-xs text-emerald-700">
                      Verifikasi biometrik wajah Anda valid dan telah sinkron dengan basis data penerimaan mahasiswa baru.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                  <div>
                    <span className="text-xs text-slate-500 block">Nomor Registrasi Resmi:</span>
                    <span className="text-lg font-mono font-extrabold text-slate-900 tracking-wider">
                      {activatedApplicantNoReg}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                      Status: Terverifikasi Biometrik
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (registrationDraft?.role === 'Pegawai / Admin' || currentUser?.role === 'Pegawai / Admin') {
                        navigate('/dashboard-admin');
                      } else {
                        navigate('/dashboard-pendaftar');
                      }
                    }}
                    className="flex-1 py-3 px-5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Masuk ke Dashboard {currentUser?.role === 'Pegawai / Admin' ? 'Admin' : 'Pendaftar'}</span>
                  </button>

                  <button
                    onClick={() => navigate('/leaderboard')}
                    className="py-3 px-5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                  >
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span>Lihat Posisi di Leaderboard</span>
                  </button>
                </div>
              </div>
            )}

            {/* ACTION BUTTONS (Reference 3) */}
            {!isVerifiedSuccess && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <Link
                  to="/buat-akun"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-colors text-center"
                >
                  ← Kembali
                </Link>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Mode Demo Button (prompt: "If webcam permission fails, provide a Mode Demo button so the prototype still works") */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsDemoMode(true);
                      showToast('Mode demo diaktifkan. Anda dapat menjalankan pemindaian langsung.', 'info');
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                      isDemoMode
                        ? 'bg-sky-100 border-sky-300 text-sky-800'
                        : 'border-slate-200 hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isDemoMode ? '✓ Mode Demo Aktif' : 'Gunakan Mode Demo'}
                  </button>

                  {/* Start verification button (0% -> 20% -> 40% -> 65% -> 80% -> 100%) */}
                  <button
                    type="button"
                    disabled={isScanning}
                    onClick={handleStartVerification}
                    className="flex-1 sm:flex-initial px-7 py-3 rounded-xl bg-blue-950 hover:bg-blue-900 active:bg-blue-950 text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isScanning ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Memindai ({scanProgress}%)...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-white" />
                        <span>Mulai Verifikasi</span>
                      </>
                    )}
                  </button>

                  {scanProgress > 0 && !isScanning && (
                    <button
                      type="button"
                      onClick={handleResetVerification}
                      className="p-3 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
                      title="Ulangi Pemindaian"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
