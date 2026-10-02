import React, { createContext, useContext, useState, useEffect } from 'react';
import { Applicant, INITIAL_APPLICANTS } from '../data/mockData';

export interface CurrentUser {
  role: 'Pendaftar' | 'Pegawai / Admin';
  applicantId?: string;
  email: string;
  nama: string;
  nip?: string;
}

export interface RegistrationDraft {
  nama: string;
  email: string;
  nomorHp: string;
  fakultas: string;
  programStudi: string;
  jalur: 'Mandiri Rapor' | 'Mandiri SNBT / UTBK';
  role?: 'Pendaftar' | 'Pegawai / Admin';
}

interface ToastState {
  message: string;
  type: 'success' | 'info' | 'error';
  visible: boolean;
}

interface AppContextType {
  applicants: Applicant[];
  currentUser: CurrentUser | null;
  registrationDraft: RegistrationDraft | null;
  toast: ToastState;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;
  setRegistrationDraft: (draft: RegistrationDraft | null) => void;
  loginUser: (user: CurrentUser) => void;
  logout: () => void;
  updateApplicant: (id: string, updates: Partial<Applicant>) => void;
  registerAndActivateApplicant: (draft: RegistrationDraft) => Applicant;
  resetDataToDefault: () => void;
  getApplicantByNoReg: (noReg: string) => Applicant | undefined;
  getApplicantRank: (applicantId: string) => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'ugm_pmb_applicants_v1';
const USER_KEY = 'ugm_pmb_user_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applicants, setApplicants] = useState<Applicant[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Sort by score descending
          return parsed.sort((a, b) => b.skorAkhir - a.skorAkhir);
        }
      }
    } catch {
      // Fallback
    }
    return [...INITIAL_APPLICANTS].sort((a, b) => b.skorAkhir - a.skorAkhir);
  });

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  const [registrationDraft, setRegistrationDraft] = useState<RegistrationDraft | null>(null);

  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'info',
    visible: false
  });

  // Save applicants to local storage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applicants));
    } catch {
      // ignore
    }
  }, [applicants]);

  // Save current user to local storage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_KEY);
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  const loginUser = (user: CurrentUser) => {
    setCurrentUser(user);
    showToast(`Selamat datang, ${user.nama}!`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Anda telah keluar dari akun.', 'info');
  };

  const updateApplicant = (id: string, updates: Partial<Applicant>) => {
    setApplicants(prev => {
      const updated = prev.map(app => {
        if (app.id === id) {
          return { ...app, ...updates };
        }
        return app;
      });
      // Sort immediately by score descending so leaderboard is live
      return updated.sort((a, b) => b.skorAkhir - a.skorAkhir);
    });
    showToast('Data pendaftar berhasil diperbarui!', 'success');
  };

  const registerAndActivateApplicant = (draft: RegistrationDraft): Applicant => {
    // Generate new unique ID & registration number
    const randomNum = Math.floor(100 + Math.random() * 890);
    const noReg = `2026XXX${randomNum}`;
    const newId = `app-new-${Date.now()}`;
    
    // Calculate realistic initial score between 84.50 and 93.50 for demonstration
    const randomScore = parseFloat((84.0 + Math.random() * 8.5).toFixed(2));
    const status: 'Lolos' | 'Waiting List' | 'Tidak Lolos' =
      randomScore >= 87.0 ? 'Lolos' : randomScore >= 82.0 ? 'Waiting List' : 'Tidak Lolos';

    const defaultIpi = draft.fakultas.includes('Kedokteran')
      ? 75000000
      : draft.fakultas.includes('Teknik')
      ? 25000000
      : 15000000;

    const newApp: Applicant = {
      id: newId,
      nomorRegistrasi: noReg,
      nama: draft.nama,
      email: draft.email,
      nomorHp: draft.nomorHp,
      fakultas: draft.fakultas,
      programStudi: draft.programStudi,
      jalur: draft.jalur,
      skorAkhir: randomScore,
      status: status,
      nominalIpi: defaultIpi,
      isVerified: true,
      tanggalDaftar: new Date().toISOString().split('T')[0]
    };

    setApplicants(prev => {
      const combined = [newApp, ...prev];
      return combined.sort((a, b) => b.skorAkhir - a.skorAkhir);
    });

    // Auto set as current logged in user
    const loggedUser: CurrentUser = {
      role: 'Pendaftar',
      applicantId: newId,
      email: draft.email,
      nama: draft.nama
    };
    setCurrentUser(loggedUser);

    showToast(`Registrasi & Aktivasi Berhasil! No. Registrasi: ${noReg}`, 'success');
    return newApp;
  };

  const resetDataToDefault = () => {
    const sorted = [...INITIAL_APPLICANTS].sort((a, b) => b.skorAkhir - a.skorAkhir);
    setApplicants(sorted);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
    showToast('Data leaderboard telah direset ke set awal.', 'info');
  };

  const getApplicantByNoReg = (noReg: string) => {
    const cleanQuery = noReg.trim().toLowerCase();
    return applicants.find(
      app =>
        app.nomorRegistrasi.toLowerCase() === cleanQuery ||
        app.nomorRegistrasi.toLowerCase().includes(cleanQuery)
    );
  };

  const getApplicantRank = (applicantId: string) => {
    // Current rank in overall sorted applicants
    const idx = applicants.findIndex(a => a.id === applicantId);
    return idx >= 0 ? idx + 1 : -1;
  };

  return (
    <AppContext.Provider
      value={{
        applicants,
        currentUser,
        registrationDraft,
        toast,
        showToast,
        hideToast,
        setRegistrationDraft,
        loginUser,
        logout,
        updateApplicant,
        registerAndActivateApplicant,
        resetDataToDefault,
        getApplicantByNoReg,
        getApplicantRank
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
