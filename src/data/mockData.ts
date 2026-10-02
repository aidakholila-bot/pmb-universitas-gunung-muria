export interface Applicant {
  id: string;
  nomorRegistrasi: string;
  nama: string;
  email: string;
  nomorHp: string;
  fakultas: string;
  programStudi: string;
  jalur: 'Mandiri Rapor' | 'Mandiri SNBT / UTBK';
  skorAkhir: number;
  status: 'Lolos' | 'Waiting List' | 'Tidak Lolos';
  nominalIpi: number; // in IDR
  isVerified: boolean;
  tanggalDaftar: string;
  fotoUrl?: string;
  catatanAdmin?: string;
}

export interface FacultyData {
  nama: string;
  programStudi: string[];
}

export const FAKULTAS_LIST: FacultyData[] = [
  {
    nama: 'Fakultas Pertanian',
    programStudi: ['S1 Agroteknologi', 'S1 Agribisnis', 'S1 Proteksi Tanaman']
  },
  {
    nama: 'Fakultas Biologi',
    programStudi: ['S1 Biologi']
  },
  {
    nama: 'Fakultas Ekonomi dan Bisnis',
    programStudi: ['S1 Manajemen', 'S1 Akuntansi', 'S1 Ilmu Ekonomi & Studi Pembangunan']
  },
  {
    nama: 'Fakultas Peternakan',
    programStudi: ['S1 Peternakan']
  },
  {
    nama: 'Fakultas Hukum',
    programStudi: ['S1 Ilmu Hukum']
  },
  {
    nama: 'Fakultas Ilmu Sosial dan Ilmu Politik (FISIP)',
    programStudi: [
      'S1 Ilmu Komunikasi',
      'S1 Sosiologi',
      'S1 Ilmu Administrasi Negara',
      'S1 Hubungan Internasional',
      'S1 Ilmu Politik'
    ]
  },
  {
    nama: 'Fakultas Kedokteran',
    programStudi: ['S1 Pendidikan Dokter', 'S1 Kedokteran Gigi']
  },
  {
    nama: 'Fakultas Teknik',
    programStudi: [
      'S1 Teknik Informatika',
      'S1 Teknik Elektro',
      'S1 Teknik Sipil',
      'S1 Teknik Geologi',
      'S1 Teknik Industri'
    ]
  },
  {
    nama: 'Fakultas Ilmu-ilmu Kesehatan',
    programStudi: [
      'S1 Keperawatan',
      'S1 Farmasi',
      'S1 Ilmu Gizi',
      'S1 Kesehatan Masyarakat',
      'S1 Pendidikan Jasmani'
    ]
  },
  {
    nama: 'Fakultas Ilmu Budaya',
    programStudi: [
      'S1 Sastra Inggris',
      'S1 Sastra Indonesia',
      'S1 Sastra Jepang',
      'S1 Pendidikan Bahasa Indonesia',
      'S1 Pendidikan Bahasa Inggris'
    ]
  },
  {
    nama: 'Fakultas Matematika dan Ilmu Pengetahuan Alam (MIPA)',
    programStudi: ['S1 Biologi', 'S1 Kimia', 'S1 Matematika', 'S1 Fisika']
  },
  {
    nama: 'Fakultas Perikanan dan Ilmu Kelautan',
    programStudi: [
      'S1 Akuakultur',
      'S1 Manajemen Sumberdaya Perairan',
      'S1 Ilmu Kelautan'
    ]
  }
];

export const JALUR_LIST: ('Mandiri Rapor' | 'Mandiri SNBT / UTBK')[] = [
  'Mandiri Rapor',
  'Mandiri SNBT / UTBK'
];

export const INITIAL_APPLICANTS: Applicant[] = [
  {
    id: 'app-01',
    nomorRegistrasi: '2026XXX001',
    nama: 'Ahmad Raihan Pratama',
    email: 'raihan.pratama@gmail.com',
    nomorHp: '081234567890',
    fakultas: 'Fakultas Ekonomi dan Bisnis',
    programStudi: 'S1 Manajemen',
    jalur: 'Mandiri SNBT / UTBK',
    skorAkhir: 92.45,
    status: 'Lolos',
    nominalIpi: 25000000,
    isVerified: true,
    tanggalDaftar: '2026-09-12'
  },
  {
    id: 'app-02',
    nomorRegistrasi: '2026XXX023',
    nama: 'Siti Nurhaliza Putri',
    email: 'siti.nurhaliza@gmail.com',
    nomorHp: '081398765432',
    fakultas: 'Fakultas Hukum',
    programStudi: 'S1 Ilmu Hukum',
    jalur: 'Mandiri Rapor',
    skorAkhir: 91.20,
    status: 'Lolos',
    nominalIpi: 20000000,
    isVerified: true,
    tanggalDaftar: '2026-09-14'
  },
  {
    id: 'app-03',
    nomorRegistrasi: '2026XXX045',
    nama: 'Dimas Satria Wibowo',
    email: 'dimas.satria@gmail.com',
    nomorHp: '082155671234',
    fakultas: 'Fakultas Teknik',
    programStudi: 'S1 Teknik Informatika',
    jalur: 'Mandiri SNBT / UTBK',
    skorAkhir: 89.76,
    status: 'Lolos',
    nominalIpi: 30000000,
    isVerified: true,
    tanggalDaftar: '2026-09-15'
  },
  {
    id: 'app-04',
    nomorRegistrasi: '2026XXX067',
    nama: 'Anindya Larasati',
    email: 'anindya.larasati@gmail.com',
    nomorHp: '085712349988',
    fakultas: 'Fakultas Ilmu Sosial dan Ilmu Politik (FISIP)',
    programStudi: 'S1 Ilmu Komunikasi',
    jalur: 'Mandiri Rapor',
    skorAkhir: 88.32,
    status: 'Lolos',
    nominalIpi: 15000000,
    isVerified: true,
    tanggalDaftar: '2026-09-16'
  },
  {
    id: 'app-05',
    nomorRegistrasi: '2026XXX089',
    nama: 'Bagus Tri Pamungkas',
    email: 'bagus.pamungkas@gmail.com',
    nomorHp: '081299887766',
    fakultas: 'Fakultas Pertanian',
    programStudi: 'S1 Agroteknologi',
    jalur: 'Mandiri SNBT / UTBK',
    skorAkhir: 87.10,
    status: 'Lolos',
    nominalIpi: 10000000,
    isVerified: true,
    tanggalDaftar: '2026-09-17'
  },
  {
    id: 'app-06',
    nomorRegistrasi: '2026XXX103',
    nama: 'Clarissa Maharani',
    email: 'clarissa.maharani@gmail.com',
    nomorHp: '087812984532',
    fakultas: 'Fakultas Kedokteran',
    programStudi: 'S1 Pendidikan Dokter',
    jalur: 'Mandiri Rapor',
    skorAkhir: 85.67,
    status: 'Waiting List',
    nominalIpi: 75000000,
    isVerified: true,
    tanggalDaftar: '2026-09-18'
  },
  {
    id: 'app-07',
    nomorRegistrasi: '2026XXX118',
    nama: 'Fajar Nugroho',
    email: 'fajar.nugroho@gmail.com',
    nomorHp: '081377884411',
    fakultas: 'Fakultas Matematika dan Ilmu Pengetahuan Alam (MIPA)',
    programStudi: 'S1 Biologi',
    jalur: 'Mandiri SNBT / UTBK',
    skorAkhir: 83.45,
    status: 'Waiting List',
    nominalIpi: 12500000,
    isVerified: true,
    tanggalDaftar: '2026-09-19'
  },
  {
    id: 'app-08',
    nomorRegistrasi: '2026XXX132',
    nama: 'Gilang Ramadhan',
    email: 'gilang.ramadhan@gmail.com',
    nomorHp: '082266554433',
    fakultas: 'Fakultas Peternakan',
    programStudi: 'S1 Peternakan',
    jalur: 'Mandiri Rapor',
    skorAkhir: 81.23,
    status: 'Tidak Lolos',
    nominalIpi: 10000000,
    isVerified: true,
    tanggalDaftar: '2026-09-20'
  },
  {
    id: 'app-09',
    nomorRegistrasi: '2026XXX147',
    nama: 'Hafizah Zahra',
    email: 'hafizah.zahra@gmail.com',
    nomorHp: '085811223344',
    fakultas: 'Fakultas Perikanan dan Ilmu Kelautan',
    programStudi: 'S1 Ilmu Kelautan',
    jalur: 'Mandiri SNBT / UTBK',
    skorAkhir: 78.90,
    status: 'Tidak Lolos',
    nominalIpi: 12000000,
    isVerified: true,
    tanggalDaftar: '2026-09-21'
  },
  {
    id: 'app-10',
    nomorRegistrasi: '2026XXX160',
    nama: 'Indah Kusuma Wardani',
    email: 'indah.wardani@gmail.com',
    nomorHp: '081344556677',
    fakultas: 'Fakultas Ilmu Budaya',
    programStudi: 'S1 Sastra Inggris',
    jalur: 'Mandiri Rapor',
    skorAkhir: 76.34,
    status: 'Tidak Lolos',
    nominalIpi: 10000000,
    isVerified: true,
    tanggalDaftar: '2026-09-22'
  },
  {
    id: 'app-11',
    nomorRegistrasi: '2026XXX175',
    nama: 'Joko Wicaksono',
    email: 'joko.wicaksono@gmail.com',
    nomorHp: '081255443322',
    fakultas: 'Fakultas Teknik',
    programStudi: 'S1 Teknik Sipil',
    jalur: 'Mandiri SNBT / UTBK',
    skorAkhir: 90.15,
    status: 'Lolos',
    nominalIpi: 25000000,
    isVerified: true,
    tanggalDaftar: '2026-09-13'
  },
  {
    id: 'app-12',
    nomorRegistrasi: '2026XXX189',
    nama: 'Kurniawan Dwi Yulianto',
    email: 'kurniawan.dwi@gmail.com',
    nomorHp: '087788990011',
    fakultas: 'Fakultas Kedokteran',
    programStudi: 'S1 Pendidikan Dokter',
    jalur: 'Mandiri SNBT / UTBK',
    skorAkhir: 93.80,
    status: 'Lolos',
    nominalIpi: 85000000,
    isVerified: true,
    tanggalDaftar: '2026-09-11'
  },
  {
    id: 'app-13',
    nomorRegistrasi: '2026XXX202',
    nama: 'Lestari Ayu Puspita',
    email: 'lestari.ayu@gmail.com',
    nomorHp: '081900112233',
    fakultas: 'Fakultas Ilmu-ilmu Kesehatan',
    programStudi: 'S1 Farmasi',
    jalur: 'Mandiri Rapor',
    skorAkhir: 89.10,
    status: 'Lolos',
    nominalIpi: 35000000,
    isVerified: true,
    tanggalDaftar: '2026-09-15'
  },
  {
    id: 'app-14',
    nomorRegistrasi: '2026XXX216',
    nama: 'Muhammad Rizky Aditya',
    email: 'rizky.aditya@gmail.com',
    nomorHp: '085233445566',
    fakultas: 'Fakultas Teknik',
    programStudi: 'S1 Teknik Informatika',
    jalur: 'Mandiri Rapor',
    skorAkhir: 86.40,
    status: 'Waiting List',
    nominalIpi: 28000000,
    isVerified: true,
    tanggalDaftar: '2026-09-17'
  },
  {
    id: 'app-15',
    nomorRegistrasi: '2026XXX229',
    nama: 'Nabila Syahrani',
    email: 'nabila.syahrani@gmail.com',
    nomorHp: '081377665544',
    fakultas: 'Fakultas Ekonomi dan Bisnis',
    programStudi: 'S1 Akuntansi',
    jalur: 'Mandiri SNBT / UTBK',
    skorAkhir: 88.05,
    status: 'Lolos',
    nominalIpi: 20000000,
    isVerified: true,
    tanggalDaftar: '2026-09-16'
  },
  {
    id: 'app-16',
    nomorRegistrasi: '2026XXX241',
    nama: 'Oki Setiawan',
    email: 'oki.setiawan@gmail.com',
    nomorHp: '082199881122',
    fakultas: 'Fakultas Ilmu-ilmu Kesehatan',
    programStudi: 'S1 Keperawatan',
    jalur: 'Mandiri Rapor',
    skorAkhir: 84.75,
    status: 'Waiting List',
    nominalIpi: 18000000,
    isVerified: true,
    tanggalDaftar: '2026-09-18'
  },
  {
    id: 'app-17',
    nomorRegistrasi: '2026XXX255',
    nama: 'Putri Amelia Salsabila',
    email: 'putri.amelia@gmail.com',
    nomorHp: '081288776655',
    fakultas: 'Fakultas Biologi',
    programStudi: 'S1 Biologi',
    jalur: 'Mandiri SNBT / UTBK',
    skorAkhir: 87.50,
    status: 'Lolos',
    nominalIpi: 15000000,
    isVerified: true,
    tanggalDaftar: '2026-09-16'
  },
  {
    id: 'app-18',
    nomorRegistrasi: '2026XXX268',
    nama: 'Raden Mas Danang',
    email: 'danang.rm@gmail.com',
    nomorHp: '085699001122',
    fakultas: 'Fakultas Hukum',
    programStudi: 'S1 Ilmu Hukum',
    jalur: 'Mandiri SNBT / UTBK',
    skorAkhir: 82.90,
    status: 'Waiting List',
    nominalIpi: 22000000,
    isVerified: true,
    tanggalDaftar: '2026-09-19'
  },
  {
    id: 'app-19',
    nomorRegistrasi: '2026XXX282',
    nama: 'Safira Aulia',
    email: 'safira.aulia@gmail.com',
    nomorHp: '087855443322',
    fakultas: 'Fakultas Ilmu Sosial dan Ilmu Politik (FISIP)',
    programStudi: 'S1 Hubungan Internasional',
    jalur: 'Mandiri SNBT / UTBK',
    skorAkhir: 91.85,
    status: 'Lolos',
    nominalIpi: 20000000,
    isVerified: true,
    tanggalDaftar: '2026-09-13'
  },
  {
    id: 'app-20',
    nomorRegistrasi: '2026XXX295',
    nama: 'Taufiq Hidayat',
    email: 'taufiq.hidayat@gmail.com',
    nomorHp: '081322334455',
    fakultas: 'Fakultas Ilmu-ilmu Kesehatan',
    programStudi: 'S1 Pendidikan Jasmani',
    jalur: 'Mandiri Rapor',
    skorAkhir: 79.50,
    status: 'Tidak Lolos',
    nominalIpi: 10000000,
    isVerified: true,
    tanggalDaftar: '2026-09-20'
  },
  {
    id: 'app-21',
    nomorRegistrasi: '2026XXX308',
    nama: 'Utari Wulandari',
    email: 'utari.wulan@gmail.com',
    nomorHp: '082344556677',
    fakultas: 'Fakultas Pertanian',
    programStudi: 'S1 Agribisnis',
    jalur: 'Mandiri Rapor',
    skorAkhir: 86.80,
    status: 'Lolos',
    nominalIpi: 12000000,
    isVerified: true,
    tanggalDaftar: '2026-09-17'
  },
  {
    id: 'app-22',
    nomorRegistrasi: '2026XXX321',
    nama: 'Vicky Prasetya',
    email: 'vicky.prasetya@gmail.com',
    nomorHp: '085788991122',
    fakultas: 'Fakultas Teknik',
    programStudi: 'S1 Teknik Elektro',
    jalur: 'Mandiri SNBT / UTBK',
    skorAkhir: 85.10,
    status: 'Waiting List',
    nominalIpi: 24000000,
    isVerified: true,
    tanggalDaftar: '2026-09-18'
  },
  {
    id: 'app-23',
    nomorRegistrasi: '2026XXX334',
    nama: 'Wahyu Hidayatullah',
    email: 'wahyu.h@gmail.com',
    nomorHp: '081277889900',
    fakultas: 'Fakultas Matematika dan Ilmu Pengetahuan Alam (MIPA)',
    programStudi: 'S1 Kimia',
    jalur: 'Mandiri Rapor',
    skorAkhir: 80.20,
    status: 'Tidak Lolos',
    nominalIpi: 12000000,
    isVerified: true,
    tanggalDaftar: '2026-09-21'
  },
  {
    id: 'app-24',
    nomorRegistrasi: '2026XXX347',
    nama: 'Yasmin Khairunisa',
    email: 'yasmin.k@gmail.com',
    nomorHp: '087766554433',
    fakultas: 'Fakultas Kedokteran',
    programStudi: 'S1 Kedokteran Gigi',
    jalur: 'Mandiri SNBT / UTBK',
    skorAkhir: 91.00,
    status: 'Lolos',
    nominalIpi: 60000000,
    isVerified: true,
    tanggalDaftar: '2026-09-14'
  },
  {
    id: 'app-25',
    nomorRegistrasi: '2026XXX360',
    nama: 'Zulfikar Maulana',
    email: 'zulfikar.m@gmail.com',
    nomorHp: '081399001122',
    fakultas: 'Fakultas Ekonomi dan Bisnis',
    programStudi: 'S1 Ilmu Ekonomi & Studi Pembangunan',
    jalur: 'Mandiri Rapor',
    skorAkhir: 84.15,
    status: 'Waiting List',
    nominalIpi: 17500000,
    isVerified: true,
    tanggalDaftar: '2026-09-19'
  },
  {
    id: 'app-26',
    nomorRegistrasi: '2026XXX373',
    nama: 'Ade Kurniawati',
    email: 'ade.kurnia@gmail.com',
    nomorHp: '085811229988',
    fakultas: 'Fakultas Ilmu Budaya',
    programStudi: 'S1 Sastra Jepang',
    jalur: 'Mandiri SNBT / UTBK',
    skorAkhir: 83.70,
    status: 'Waiting List',
    nominalIpi: 15000000,
    isVerified: true,
    tanggalDaftar: '2026-09-19'
  },
  {
    id: 'app-27',
    nomorRegistrasi: '2026XXX386',
    nama: 'Bayu Aji Pangestu',
    email: 'bayu.aji@gmail.com',
    nomorHp: '081200114455',
    fakultas: 'Fakultas Perikanan dan Ilmu Kelautan',
    programStudi: 'S1 Akuakultur',
    jalur: 'Mandiri Rapor',
    skorAkhir: 77.40,
    status: 'Tidak Lolos',
    nominalIpi: 10000000,
    isVerified: true,
    tanggalDaftar: '2026-09-22'
  },
  {
    id: 'app-28',
    nomorRegistrasi: '2026XXX399',
    nama: 'Citra Dewi Lestari',
    email: 'citra.dewi@gmail.com',
    nomorHp: '082166778899',
    fakultas: 'Fakultas Ilmu-ilmu Kesehatan',
    programStudi: 'S1 Ilmu Gizi',
    jalur: 'Mandiri SNBT / UTBK',
    skorAkhir: 88.90,
    status: 'Lolos',
    nominalIpi: 22000000,
    isVerified: true,
    tanggalDaftar: '2026-09-15'
  },
  {
    id: 'app-29',
    nomorRegistrasi: '2026XXX412',
    nama: 'Dodi Firmansyah',
    email: 'dodi.firmansyah@gmail.com',
    nomorHp: '087822334455',
    fakultas: 'Fakultas Teknik',
    programStudi: 'S1 Teknik Industri',
    jalur: 'Mandiri Rapor',
    skorAkhir: 82.10,
    status: 'Waiting List',
    nominalIpi: 20000000,
    isVerified: true,
    tanggalDaftar: '2026-09-19'
  },
  {
    id: 'app-30',
    nomorRegistrasi: '2026XXX425',
    nama: 'Eka Nurjanah',
    email: 'eka.nurjanah@gmail.com',
    nomorHp: '085299008877',
    fakultas: 'Fakultas Ilmu Sosial dan Ilmu Politik (FISIP)',
    programStudi: 'S1 Ilmu Administrasi Negara',
    jalur: 'Mandiri SNBT / UTBK',
    skorAkhir: 87.25,
    status: 'Lolos',
    nominalIpi: 15000000,
    isVerified: true,
    tanggalDaftar: '2026-09-17'
  },
  {
    id: 'app-31',
    nomorRegistrasi: '2026XXX438',
    nama: 'Farhan Maulana',
    email: 'farhan.m@gmail.com',
    nomorHp: '081355442211',
    fakultas: 'Fakultas Peternakan',
    programStudi: 'S1 Peternakan',
    jalur: 'Mandiri SNBT / UTBK',
    skorAkhir: 85.50,
    status: 'Waiting List',
    nominalIpi: 12000000,
    isVerified: true,
    tanggalDaftar: '2026-09-18'
  },
  {
    id: 'app-32',
    nomorRegistrasi: '2026XXX451',
    nama: 'Gita Permatasari',
    email: 'gita.permata@gmail.com',
    nomorHp: '082211335577',
    fakultas: 'Fakultas Pertanian',
    programStudi: 'S1 Proteksi Tanaman',
    jalur: 'Mandiri Rapor',
    skorAkhir: 75.80,
    status: 'Tidak Lolos',
    nominalIpi: 8000000,
    isVerified: true,
    tanggalDaftar: '2026-09-22'
  }
];

export const DEMO_ADMIN = {
  nama: 'Drs. Hendro Wibowo, M.Kom.',
  nip: '197805122003121002',
  email: 'admin.pmb@gunungmuria.ac.id',
  role: 'Pegawai / Admin',
  unitKerja: 'Panitia Seleksi PMB Universitas Gunung Muria'
};
