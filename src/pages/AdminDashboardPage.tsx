import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Edit,
  Save,
  X,
  Trophy,
  Filter,
  DollarSign,
  PlusCircle,
  Building2,
  GraduationCap,
  ArrowUpDown
} from 'lucide-react';
import { FAKULTAS_LIST, JALUR_LIST, Applicant } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const AdminDashboardPage: React.FC = () => {
  const { applicants, updateApplicant, showToast, currentUser } = useApp();

  // Search & Filter state
  const [adminSearch, setAdminSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Lolos' | 'Waiting List' | 'Tidak Lolos'>('All');

  // Edit modal state
  const [editingApplicant, setEditingApplicant] = useState<Applicant | null>(null);
  const [editStatus, setEditStatus] = useState<'Lolos' | 'Waiting List' | 'Tidak Lolos'>('Lolos');
  const [editIpi, setEditIpi] = useState<number>(0);
  const [editFakultas, setEditFakultas] = useState<string>('');
  const [editProdi, setEditProdi] = useState<string>('');
  const [editJalur, setEditJalur] = useState<'Mandiri Rapor' | 'Mandiri SNBT / UTBK'>('Mandiri Rapor');

  // Summary counts
  const totalCount = applicants.length;
  const lolosCount = applicants.filter((a) => a.status === 'Lolos').length;
  const waitingCount = applicants.filter((a) => a.status === 'Waiting List').length;
  const tidakLolosCount = applicants.filter((a) => a.status === 'Tidak Lolos').length;

  const handleOpenEditModal = (app: Applicant) => {
    setEditingApplicant(app);
    setEditStatus(app.status);
    setEditIpi(app.nominalIpi);
    setEditFakultas(app.fakultas);
    setEditProdi(app.programStudi);
    setEditJalur(app.jalur);
  };

  const handleCloseModal = () => {
    setEditingApplicant(null);
  };

  // Dependent prodi list in edit modal
  const activeFaculty = FAKULTAS_LIST.find((f) => f.nama === editFakultas);
  const editProdiOptions = activeFaculty ? activeFaculty.programStudi : [];

  const handleEditFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditFakultas(e.target.value);
    setEditProdi('');
  };

  const handleSaveApplicantEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApplicant) return;

    if (!editFakultas || !editProdi) {
      showToast('Fakultas dan Program Studi wajib dipilih.', 'error');
      return;
    }

    updateApplicant(editingApplicant.id, {
      status: editStatus,
      nominalIpi: Number(editIpi) || 0,
      fakultas: editFakultas,
      programStudi: editProdi,
      jalur: editJalur
    });

    showToast(`Data pendaftar ${editingApplicant.nama} berhasil diperbarui! Leaderboard telah disinkronkan.`, 'success');
    handleCloseModal();
  };

  // Filtered applicants for admin table
  const filteredList = useMemo(() => {
    return applicants.filter((app) => {
      if (statusFilter !== 'All' && app.status !== statusFilter) {
        return false;
      }
      if (adminSearch.trim()) {
        const query = adminSearch.trim().toLowerCase();
        return (
          app.nama.toLowerCase().includes(query) ||
          app.nomorRegistrasi.toLowerCase().includes(query) ||
          app.programStudi.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [applicants, statusFilter, adminSearch]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-xs">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Dashboard Panitia &amp; Admin PMB
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                  Pegawai / Admin
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Kelola status kelolosan, validasi skor, dan penyesuaian nominal IPI pendaftar secara langsung.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/leaderboard"
              className="px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Pantau Leaderboard Publik</span>
            </Link>
          </div>
        </div>

        {/* 4 SUMMARY STATS CARDS (Exact Prompt Requirement) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1. Total Pendaftar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Total Pendaftar</span>
              <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">
                {totalCount}
              </div>
              <span className="text-[11px] text-slate-400">Terdaftar di sistem</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* 2. Lolos (Green) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Lolos Kuota</span>
              <div className="text-2xl font-extrabold font-mono text-emerald-600 mt-1">
                {lolosCount}
              </div>
              <span className="text-[11px] text-emerald-700">Memenuhi kuota awal</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          {/* 3. Waiting List (Yellow/Amber) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Waiting List</span>
              <div className="text-2xl font-extrabold font-mono text-amber-600 mt-1">
                {waitingCount}
              </div>
              <span className="text-[11px] text-amber-700">Daftar tunggu aktif</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* 4. Tidak Lolos (Red) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Tidak Lolos</span>
              <div className="text-2xl font-extrabold font-mono text-rose-600 mt-1">
                {tidakLolosCount}
              </div>
              <span className="text-[11px] text-rose-700">Di bawah ambang batas</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* ADMIN TABLE CARD */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden">
          
          {/* Table Toolbar */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900">
                Manajemen Pendaftar &amp; Penyesuaian Status
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                {filteredList.length} dari {totalCount}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  placeholder="Cari nama / no. reg..."
                  className="pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Status Segmented Filter */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-medium">
                {(['All', 'Lolos', 'Waiting List', 'Tidak Lolos'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      statusFilter === st
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Admin Table (Exact columns: Ranking, No. Registrasi, Nama, Fakultas, Program Studi, Jalur, Skor, IPI, Status, Aksi) */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-center">Rank</th>
                  <th className="py-3.5 px-4">No. Registrasi</th>
                  <th className="py-3.5 px-4">Nama</th>
                  <th className="py-3.5 px-4">Fakultas</th>
                  <th className="py-3.5 px-4">Program Studi</th>
                  <th className="py-3.5 px-4">Jalur</th>
                  <th className="py-3.5 px-4 text-right">Skor</th>
                  <th className="py-3.5 px-4 text-right">IPI</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                {filteredList.map((app) => {
                  const currentRank =
                    applicants.findIndex((a) => a.id === app.id) + 1;

                  return (
                    <tr key={app.id} className="hover:bg-sky-50/40 transition-colors">
                      {/* Ranking */}
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-800">
                        #{currentRank}
                      </td>

                      {/* Nomor Registrasi */}
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-900 whitespace-nowrap">
                        {app.nomorRegistrasi}
                      </td>

                      {/* Nama */}
                      <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                        {app.nama}
                      </td>

                      {/* Fakultas */}
                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                        {app.fakultas}
                      </td>

                      {/* Program Studi */}
                      <td className="py-3.5 px-4 font-medium text-slate-800 whitespace-nowrap">
                        {app.programStudi}
                      </td>

                      {/* Jalur */}
                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                        {app.jalur}
                      </td>

                      {/* Skor */}
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 tabular-nums">
                        {app.skorAkhir.toFixed(2).replace('.', ',')}
                      </td>

                      {/* Nominal IPI */}
                      <td className="py-3.5 px-4 text-right font-mono text-slate-800 whitespace-nowrap tabular-nums">
                        {formatRupiah(app.nominalIpi)}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {app.status === 'Lolos' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Lolos
                          </span>
                        )}
                        {app.status === 'Waiting List' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            <Clock className="w-3 h-3 text-amber-600" />
                            Waiting List
                          </span>
                        )}
                        {app.status === 'Tidak Lolos' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                            <XCircle className="w-3 h-3 text-rose-600" />
                            Tidak Lolos
                          </span>
                        )}
                      </td>

                      {/* Aksi Button */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEditModal(app)}
                          className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 text-xs font-bold transition-colors inline-flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* EDIT MODAL DIALOG (Admin can edit: Status, Nominal IPI, Fakultas, Program Studi, Jalur) */}
        {editingApplicant && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Edit className="w-5 h-5 text-emerald-700" />
                    Edit Data Pendaftar
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-mono">
                    {editingApplicant.nomorRegistrasi} · {editingApplicant.nama}
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSaveApplicantEdit} className="p-6 space-y-4">
                
                {/* 1. Status Selection (Lolos, Waiting List, Tidak Lolos) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Status Kelolosan PMB <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setEditStatus('Lolos')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        editStatus === 'Lolos'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-emerald-50/60 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      ✓ Lolos
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditStatus('Waiting List')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        editStatus === 'Waiting List'
                          ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                          : 'bg-amber-50/60 text-amber-800 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      ⏱ Waiting List
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditStatus('Tidak Lolos')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        editStatus === 'Tidak Lolos'
                          ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                          : 'bg-rose-50/60 text-rose-800 border-rose-200 hover:bg-rose-100'
                      }`}
                    >
                      ✕ Tidak Lolos
                    </button>
                  </div>
                </div>

                {/* 2. Nominal IPI */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                    <span>Nominal IPI (Iuran Pengembangan Institusi)</span>
                    <span className="text-xs text-sky-700 font-mono font-semibold">
                      {formatRupiah(editIpi)}
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">Rp</span>
                    <input
                      type="number"
                      step={500000}
                      value={editIpi}
                      onChange={(e) => setEditIpi(Number(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* 3. Fakultas */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Fakultas</span>
                  </label>
                  <select
                    value={editFakultas}
                    onChange={handleEditFacultyChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    {FAKULTAS_LIST.map((f) => (
                      <option key={f.nama} value={f.nama}>
                        {f.nama}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Program Studi */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    <span>Program Studi (S1)</span>
                  </label>
                  <select
                    value={editProdi}
                    onChange={(e) => setEditProdi(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">-- Pilih Program Studi --</option>
                    {editProdiOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. Jalur Pendaftaran */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Jalur Pendaftaran
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {JALUR_LIST.map((j) => (
                      <label
                        key={j}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer ${
                          editJalur === j
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="editJalur"
                          checked={editJalur === j}
                          onChange={() => setEditJalur(j)}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>{j}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  ⚡ Setiap perubahan yang disimpan akan langsung memperbarui urutan dan status pada Leaderboard publik.
                </div>

                {/* Modal Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
