/**
 * Fakta masalah pangan Kalimantan Tengah — sumber resmi terbaru.
 * Dipakai di landing sebagai konteks masalah, bukan klaim kinerja platform.
 * Semua mitra/listing di prototipe bersifat fiktif untuk uji coba.
 * Diperbarui: November 2026.
 */
export const KALTENG_FACTS = [
  {
    value: "146.710",
    label: "Penduduk miskin Kalteng",
    detail: "5,09% pada Maret 2026 — naik dari 4,94% (Sep 2025). Garis kemiskinan Rp723.149/kapita/bulan, 77% di antaranya belanja makanan. Palangka Raya 3,62% (2025).",
    source: "BPS Provinsi Kalimantan Tengah, Maret 2026",
    href: "https://kalteng.bps.go.id/id/pressrelease/2026/08/05/1652/persentase-penduduk-miskin-kalimantan-tengah-maret-2026-naik-menjadi-5-09-persen.html",
  },
  {
    value: "22,1%",
    label: "Prevalensi stunting",
    detail: "SSGI 2024 masih rujukan resmi (SSGI 2025 belum rilis). Barito Selatan 33,3%, Seruyan 32,2%. Target Pemprov 2026: 18,8%.",
    source: "SSGI 2024 · Dinas P3APPKB Kalteng, Feb 2026",
    href: "https://kalteng.tribunnews.com/palangka-raya/227734/angka-stunting-kalteng-221-persen-barito-selatan-dan-seruyan-catat-prevalensi-paling-tinggi",
  },
  {
    value: "41,8%",
    label: "Sampah sisa makanan",
    detail: "Komposisi SIPSN terbaru Kota Palangka Raya (tahun data 2024). Setara ±67 ton/hari dari 160,25 ton timbulan. Volume terangkut 2025 naik jadi 41.538 ton (DLH).",
    source: "SIPSN KLHK · DLH Palangka Raya 2025",
    href: "https://sipsn.menlhk.go.id/sipsn/public/data/komposisi",
  },
  {
    value: "233.984",
    label: "Penerima manfaat MBG",
    detail: "107 SPPG aktif per 31 Agustus 2026. Palangka Raya 71.489 penerima (30,55%). Kelebihan porsi & wilayah bantaran sungai belum tersambung kanal digital.",
    source: "Kanwil DJPb Kalteng, 31 Agustus 2026",
    href: "https://www.antaranews.com/berita/5769032/djpb-kalteng-mbg-serap-ribuan-naker-dan-gerakkan-ratusan-pemasok",
  },
] as const;

export const KALTENG_IKP = {
  province2026: 76.93,
  provinceRank: 13,
  palangka: 76.05,
  kotim: 81.35,
  murungRaya: 61.09,
  seruyan: 64.72,
  source: "IKP Provinsi 2026 & IKP Kabupaten/Kota 2025, Badan Pangan Nasional",
  href: "https://data.badanpangan.go.id/datasetpublications/8cf/ikp-provinsi-2026",
} as const;

export const NATIONAL_FLW = {
  tons: "22–23 juta ton/tahun sampah makanan",
  perCapita: "115–184 kg/kapita/tahun (FLW)",
  peopleEquivalent: "61–125 juta orang",
  economy: "Rp213–551 triliun/tahun",
  source: "Peta Jalan SSP Bappenas 2024 (estimasi SIPSN 2019–2023) & kajian FLW 2000–2019",
  href: "https://www.gainhealth.org/sites/default/files/publications/roadmap-indonesia.pdf",
} as const;

export const MBG_KALTENG = {
  launch: "13 Januari 2025 di Palangka Raya (16 sekolah, 3 SPPG)",
  sppgActive: "107 SPPG aktif per 31 Agustus 2026",
  beneficiaries: "233.984 penerima manfaat",
  palangkaShare: "71.489 penerima di Palangka Raya (30,55%)",
  radius: "Maksimal 6 km atau 30 menit",
  source: "Kanwil DJPb Kalteng via ANTARA, 2 Oktober 2026",
} as const;
