import credlyData from './credlyData.json';

// Daftar sertifikat & badge.
// issuer : 'dicoding' | 'google' | 'credly'  (dipakai untuk filter + ikon)
// date   : 'YYYY-MM-DD' atau 'YYYY-MM'      (diurutkan otomatis, terbaru di atas)
// id     : kode kredensial (Dicoding) → link verifikasi dibuat otomatis
// url    : link verifikasi manual (dipakai kalau tidak ada id, mis. badge Credly)
// image  : gambar sertifikat / badge di public/certs/
//          (versi kecil untuk kartu otomatis diambil dari public/certs/thumbs/)
// org    : opsional — nama organisasi penerbit (mis. 'Google Cloud'), tampil di kartu
// skills : 2–4 tag singkat

export const certificationsData = [
  {
    title: 'Belajar Back-End Pemula dengan JavaScript',
    issuer: 'dicoding',
    date: '2026-10-27',
    id: 'JLX1K49YJP72',
    image: '/certs/backend-pemula-js.webp',
    skills: ['Node.js', 'Hapi', 'REST API', 'AWS EC2'],
  },
  {
    title: 'Belajar Fundamental Aplikasi Web dengan React',
    issuer: 'dicoding',
    date: '2026-10-06',
    id: '72ZDMV6KQZYW',
    image: '/certs/fundamental-react.webp',
    skills: ['React', 'React Router', 'Context', 'Hooks'],
  },
  {
    title: 'Belajar Membuat Aplikasi Web dengan React',
    issuer: 'dicoding',
    date: '2026-09-17',
    id: 'JMZVL1DGOXN9',
    image: '/certs/aplikasi-web-react.webp',
    skills: ['React', 'Components', 'State'],
  },
  {
    title: 'Belajar Membuat Front-End Web untuk Pemula',
    issuer: 'dicoding',
    date: '2026-09-09',
    id: 'MEPJM9WW6P3V',
    image: '/certs/frontend-web-pemula.webp',
    skills: ['JavaScript', 'DOM', 'Web Storage'],
  },
  {
    title: 'Belajar Dasar Pemrograman JavaScript',
    issuer: 'dicoding',
    date: '2026-09-08',
    id: '53XEMQ339PRN',
    image: '/certs/dasar-javascript.webp',
    skills: ['JavaScript', 'Node.js', 'OOP', 'Async'],
  },
  {
    title: 'Belajar Dasar Pemrograman Web',
    issuer: 'dicoding',
    date: '2026-08-28',
    id: '2VX3V4LL4PYQ',
    image: '/certs/dasar-pemrograman-web.webp',
    skills: ['HTML', 'CSS', 'Flexbox'],
  },
  {
    title: 'Belajar Dasar AI',
    issuer: 'dicoding',
    date: '2026-08-25',
    id: '2VX3V40M4PYQ',
    image: '/certs/dasar-ai.webp',
    skills: ['AI', 'Machine Learning', 'Deep Learning'],
  },
  {
    title: 'Pengenalan ke Logika Pemrograman (Programming Logic 101)',
    issuer: 'dicoding',
    date: '2026-08-24',
    id: '98XW850YWPM3',
    image: '/certs/logika-pemrograman.webp',
    skills: ['Logic', 'Computational Thinking'],
  },
  {
    title: 'Memulai Dasar Pemrograman untuk Menjadi Pengembang Software',
    issuer: 'dicoding',
    date: '2026-08-20',
    id: 'N9ZO0YNL8XG5',
    image: '/certs/dasar-pemrograman-software.webp',
    skills: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Belajar Dasar Git dengan GitHub',
    issuer: 'dicoding',
    date: '2026-08-19',
    id: 'ERZR7YLNMZYV',
    image: '/certs/git-github.webp',
    skills: ['Git', 'GitHub'],
  },

  // Badge Credly diambil otomatis: node scripts/fetch-credly.mjs
  ...credlyData,
];

// Label tampilan tiap penerbit (filter hanya muncul kalau ada isinya)
export const issuers = {
  dicoding: 'Dicoding',
  google: 'Google Skills',
  credly: 'Credly',
};

// Link verifikasi: pakai url manual, atau dibuat dari id Dicoding
export const verifyUrl = (cert) =>
  cert.url ?? (cert.issuer === 'dicoding' && cert.id
    ? `https://www.dicoding.com/certificates/${cert.id}`
    : null);
