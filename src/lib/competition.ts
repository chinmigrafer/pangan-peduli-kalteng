/** Materi tahap I Tambun Bungai Ideathon 2026 — bukan klaim kinerja live. */

export const TEAM = [
  { name: "Aris Anly Wardana", role: "Ketua · produk & pitch" },
  { name: "Kevin Berliando Sugandie", role: "Anggota · prototipe" },
  { name: "Praja Anugrah Pratama", role: "Anggota · data & naskah" },
] as const;

/** Judul resmi karya untuk formulir, poster, video, dan proposal. */
export const WORK_TITLE =
  "PanganPeduli: QRIS Surplus Pangan untuk Inklusi Keluarga Miskin di Kalimantan Tengah" as const;

export const WORK_TITLE_SHORT = "PanganPeduli — QRIS Surplus Pangan Kalteng" as const;

export const COMPETITION = {
  title: "Tambun Bungai Ideathon 2026",
  organizer: "Bank Indonesia Kalimantan Tengah · Borneo DECAFEST",
  campus: "STMIK Palangka Raya",
  deadline: "8 November 2026, 23.59 WIB",
  product: "PanganPeduli",
  workTitle: WORK_TITLE,
  workTitleShort: WORK_TITLE_SHORT,
  tagline: "Bayar surplus murah via QRIS, ambil 60 menit — tanpa OTP palsu, tanpa MoU fiktif",
  theme: "QRIS & inklusi pangan Kalimantan Tengah",
  subtema:
    "Lintas subtema TOR: (5/QRIS merchant) surplus hotel-UMKM dibayar digital ≤Rp10.000; (2/inklusi-BSNT) kanal ambil sisa MBG bersyarat izin; (4/pelindungan konsumen) lapor 3-strike, masking HP, edukasi anti-OTP/PIN.",
  instagram: ["@geber_peka_kalteng", "@borneo_decafest"],
} as const;

export const MARKET = {
  tam: {
    label: "TAM",
    value: "±Rp18–30 M/tahun",
    detail:
      "GMV teoretis surplus makanan yang masih layak di Kalteng. Palangka Raya: 41,8% sampah = ±67 t sisa makanan/hari. Jika 2% masih layak dan bisa dijemput dekat lokasi ≈ 3.350 porsi/hari × Rp5.000 × 365 ≈ Rp6,1 miliar/tahun Palangka. Skala 14 kab/kota, konservatif 3–5×.",
  },
  sam: {
    label: "SAM",
    value: "±Rp0,6–1,2 M/tahun",
    detail:
      "Hanya Palangka Raya, radius 6–10 km, mitra hospitality + SPPG yang mau onboarding. Bukan seluruh 67 ton/hari. Tahun 1: 3 hotel + 5 warung/resto + 3 SPPG (jika izin MBG turun).",
  },
  som: {
    label: "SOM 90 hari",
    value: "500 porsi · ±Rp2,5 jt",
    detail:
      "Pilot 11 mitra Palangka. Campuran QRIS berbayar ≤Rp10.000 dan MBG gratis. Tahun 1 (jika 90 hari sukses): ±8.000 porsi, GMV ±Rp40 juta. Angka kecil — sengaja, agar juri tidak mendengar scale nasional.",
  },
} as const;

export const UNIT_ECONOMICS = {
  takeRateY1: "0% — bukan marketplace fee",
  midtrans: "QRIS Snap ~0,7% ditanggung mitra atau hibah",
  opex: "Hosting ±Rp150.000/bulan + 3 mahasiswa operasional",
  revenueY1: "Hibah kampus / CSR BI–Pemda / in-kind mitra",
  year2:
    "Opsi Rp500/transaksi listing berbayar, atau white-label Dinkes. Paket MBG tetap 0%.",
} as const;

export const PILOT_90 = [
  {
    when: "Minggu 1–2",
    what: "Izin tertulis Dinkes Palangka + Satgas MBG untuk sisa porsi. LoI 3 hotel (bukan MoU fiktif).",
  },
  {
    when: "Minggu 3–4",
    what: "SOP higiene, foto, masa berlaku. Onboarding 5 warung Pahandut / Jekan Raya dengan QRIS merchant.",
  },
  {
    when: "Minggu 5–8",
    what: "QRIS live (keluar dari sandbox) di 3 merchant. Jalur SPPG hanya jika izin turun; jika tidak, hotel/UMKM saja.",
  },
  {
    when: "Minggu 9–12",
    what: "Target 500 porsi terselamatkan. Laporan ke KPw BI Kalteng. Keputusan fase 2: Sampit atau Murung Raya (IKP rendah).",
  },
] as const;

export const DEMO_FLOW = [
  { role: "Penerima", email: "user1@demo.id", password: "user123", note: "Budi Santoso · Palangka Raya" },
  { role: "Hotel", email: "hotel1@demo.id", password: "hotel123", note: "Hotel Kahayan Palangka" },
  { role: "UMKM", email: "umkm1@demo.id", password: "umkm123", note: "Warung Juhu Kahayan" },
  { role: "SPPG", email: "mbg1@demo.id", password: "mbg123", note: "SPPG Bukit Tunggal (fiktif)" },
  { role: "Admin", email: "admin@panganpeduli.id", password: "admin123", note: "Moderasi 3-strike" },
] as const;

/** Naskah video ≤5 menit — baca apa adanya; menit 1:30–3:00 rekam layar. */
export const PITCH: { clock: string; title: string; script: string; visual: string }[] = [
  {
    clock: "0:00–0:40",
    title: "Judul, tim, subtema",
    visual: "Cover: judul karya + logo STMIK + tiga nama",
    script:
      "Assalamu’alaikum warahmatullahi wabarakatuh. Kami dari STMIK Palangka Raya: Aris Anly Wardana, Kevin Berliando Sugandie, dan Praja Anugrah Pratama. Karya kami berjudul PanganPeduli: QRIS Surplus Pangan untuk Inklusi Keluarga Miskin di Kalimantan Tengah. Untuk Tambun Bungai Ideathon 2026. Kami lintas tiga subtema TOR: QRIS merchant, inklusi penerima manfaat, dan pelindungan konsumen dalam transaksi digital.",
  },
  {
    clock: "0:40–1:30",
    title: "Masalah Kalteng",
    visual: "Slide angka BPS / SIPSN / SSGI / DJPb — atau beranda prototipe bagian masalah",
    script:
      "Masalahnya lokal dan terukur. BPS Maret 2026: 146.710 penduduk miskin Kalteng, 5,09 persen. Tujuh puluh tujuh persen garis kemiskinan adalah belanja makanan. Di Palangka Raya, 41,8 persen sampah adalah sisa makanan — sekitar 67 ton per hari. Stunting 22,1 persen, belum ke target 18,8. MBG sudah 107 SPPG dan 233.984 penerima, tapi kelebihan porsi tidak punya kanal digital. Hotel dan warung membuang surplus; keluarga di Pahandut masih sulit mengakses pangan murah yang aman.",
  },
  {
    clock: "1:30–2:10",
    title: "Solusi singkat",
    visual: "Diagram 4 langkah atau How it Works di beranda",
    script:
      "Solusi PanganPeduli: mitra mengunggah surplus, penerima mencari dalam radius, membayar paling mahal sepuluh ribu rupiah lewat QRIS Midtrans, lalu mengambil dalam 60 menit. Paket MBG, jika diizinkan Satgas dan Dinkes, tetap gratis. Kami tidak mengklaim sudah bermitra 107 SPPG. Nama di prototipe fiktif. Langkah pertama adalah izin, bukan skala nasional.",
  },
  {
    clock: "2:10–3:20",
    title: "Uji coba layar",
    visual: "Rekam: Cari Palangka → listing Kahayan Rp8.000 → banner anti-OTP → QRIS sandbox → donor mask HP → konfirmasi ambil",
    script:
      "Ini uji coba yang bisa diulang. Budi Santoso, penerima Palangka, memesan nasi box banquet Hotel Kahayan delapan ribu rupiah. Sebelum bayar, sistem mengingatkan: jangan bagikan OTP atau PIN kepada siapa pun, termasuk admin. Pembayaran lewat Midtrans sandbox QRIS. Di sisi hotel, nomor HP penerima tampil ter-masking — privasi tampilan, bukan klaim enkripsi. Hotel konfirmasi sudah diambil. Listing baru muncul di Cari. Skor prioritas bukan AI: rumusnya terbuka, seratus dikurangi menit kali 0,55, plus dua belas jika gratis. Ada laporan dua arah dan tiga peringatan lalu akun ditangguhkan.",
  },
  {
    clock: "3:20–4:20",
    title: "Kelayakan TAM & 90 hari",
    visual: "Slide TAM/SAM/SOM + timeline 90 hari",
    script:
      "Kelayakan. TAM kasar surplus layak Kalteng sekitar 18 sampai 30 miliar rupiah GMV per tahun. SAM kami hanya Palangka hospitality dan SPPG: 0,6 sampai 1,2 miliar. SOM 90 hari: 500 porsi, GMV sekitar 2,5 juta rupiah. Take rate tahun pertama nol persen — biaya hosting dan tiga mahasiswa, pendapatan dari hibah kampus atau CSR, bukan fee marketplace. Jika izin MBG tidak turun dalam 30 hari, jalur SPPG dimatikan; hotel dan UMKM tetap jalan. Itu gerbang gagal yang kami terima.",
  },
  {
    clock: "4:20–5:00",
    title: "Manfaat & penutup",
    visual: "Peta Palangka → Sampit → Murung Raya + ajakan uji coba",
    script:
      "Manfaatnya tiga lapis. Merchant mendapat QRIS untuk surplus yang selama ini dibuang. Keluarga mendapat porsi layak di bawah sepuluh ribu, dekat rumah, dengan edukasi anti-penipuan OTP. Kota mengurangi sebagian dari 67 ton sisa makanan per hari. Fase dua baru ke Sampit, lalu Murung Raya yang IKP-nya 61. Kami mohon kesempatan menguji PanganPeduli 90 hari di Palangka Raya. Wassalamu’alaikum warahmatullahi wabarakatuh.",
  },
];

export const CHECKLIST_STAGE_I = [
  { item: "Proposal 8–12 hlm (judul resmi + TOR)", where: "/proposal", owner: "Praja" },
  { item: "Poster A3 tegak, cetak PDF", where: "/poster", owner: "Aris" },
  { item: "Video ≤5 menit dari naskah", where: "/lomba#naskah", owner: "Kevin + Aris" },
  { item: "Screenshot Palangka / prototipe, bukan Jakarta", where: "/cari", owner: "Kevin" },
  { item: "Kolaborasi Instagram @geber_peka_kalteng + @borneo_decafest", where: "", owner: "Aris" },
  { item: "Formulir Google Form panitia sebelum 8 Nov 23.59 WIB", where: "", owner: "Aris" },
] as const;
