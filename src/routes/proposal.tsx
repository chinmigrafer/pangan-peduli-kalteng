import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PrintToolbar } from "@/components/print-toolbar";
import {
  COMPETITION,
  DEMO_FLOW,
  MARKET,
  PITCH,
  PILOT_90,
  TEAM,
  UNIT_ECONOMICS,
  WORK_TITLE,
} from "@/lib/competition";
import { KALTENG_FACTS, KALTENG_IKP, MBG_KALTENG, NATIONAL_FLW } from "@/lib/kalteng-facts";

export const Route = createFileRoute("/proposal")({
  head: () => ({
    meta: [{ title: "Proposal — PanganPeduli · Tambun Bungai Ideathon 2026" }],
  }),
  component: ProposalPage,
});

function Sheet({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <article
      className={`print-sheet-a4 bg-white text-[#1c1917] shadow-xl mx-auto mb-8 print:mb-0 print:shadow-none ${className}`}
      style={{ width: "210mm", minHeight: "297mm", padding: "18mm 18mm 16mm" }}
    >
      {children}
    </article>
  );
}

function Running({ page, total = 9 }: { page: number; total?: number }) {
  return (
    <div className="mt-auto pt-6 flex justify-between text-[10px] text-stone-500 border-t border-stone-200">
      <span>PanganPeduli · {COMPETITION.title} · {COMPETITION.campus}</span>
      <span>
        {page} / {total}
      </span>
    </div>
  );
}

function H({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-[18px] font-bold text-[#c45c26] mt-5 mb-2">{children}</h2>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-[12px] leading-[1.55] text-stone-800 text-justify">{children}</p>;
}

function ProposalPage() {
  return (
    <div className="min-h-screen bg-zinc-300 print:bg-white">
      <style>{`@media print { @page { size: A4 portrait; margin: 0; } }`}</style>
      <PrintToolbar title="Proposal A4 · Save as PDF · Paper: A4 · Margin: default" />
      <div className="py-8 print:py-0">
        <Sheet className="flex flex-col">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#c45c26] font-semibold">
            {COMPETITION.title}
          </p>
          <p className="text-[11px] text-stone-600 mt-1">{COMPETITION.organizer}</p>
          <h1 className="font-display text-[22px] font-extrabold leading-snug mt-8">
            {WORK_TITLE}
          </h1>
          <p className="text-[14px] mt-3 font-medium text-stone-700">
            {COMPETITION.tagline}
          </p>
          <div className="mt-8 rounded-xl bg-stone-100 p-4 text-[12px] leading-relaxed">
            <div><strong>Subtema TOR:</strong> {COMPETITION.theme}</div>
            <div className="mt-1">{COMPETITION.subtema}</div>
          </div>
          <div className="mt-10">
            <div className="text-[11px] uppercase tracking-wider text-stone-500">Diajukan oleh</div>
            <ul className="mt-2 text-[13px] space-y-1">
              {TEAM.map((m) => (
                <li key={m.name}>
                  <strong>{m.name}</strong> — {m.role}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12px]">{COMPETITION.campus}</p>
            <p className="text-[12px] text-stone-600">November 2026 · batas unggah {COMPETITION.deadline}</p>
          </div>
          <p className="mt-10 text-[11px] text-stone-600 leading-relaxed">
            Dokumen ini menggantikan naskah lama bermerek lain. Seluruh mitra, listing, dan angka dampak
            di prototipe bersifat uji coba fiktif. Angka kemiskinan, stunting, sampah, dan MBG merujuk sumber resmi.
          </p>
          <Running page={1} />
        </Sheet>

        <Sheet className="flex flex-col">
          <H>1. Ringkasan eksekutif</H>
          <P>
            Kalimantan Tengah punya dua fakta yang jarang dipertemukan dalam satu kanal digital: makanan terbuang
            dalam jumlah besar di Palangka Raya, dan rumah tangga miskin yang 77% garis kemiskinannya adalah belanja
            makanan. Bank Indonesia mendorong QRIS. Program Makan Bergizi Gratis (MBG) sudah berjalan lewat 107 SPPG,
            tetapi kelebihan porsi tidak punya jalur resmi yang aman. PanganPeduli adalah prototipe uji coba yang
            menghubungkan surplus hotel/UMKM (dibayar QRIS, harga maksimum Rp10.000) dengan keluarga di radius dekat,
            plus jalur ambil gratis untuk sisa paket MBG — jalur kedua hanya dijalankan setelah izin Satgas MBG dan
            Dinas Kesehatan, bukan klaim kemitraan yang sudah ada.
          </P>
          <P>
            Tahap I Ideathon tidak mensyaratkan aplikasi jadi. Kami tetap menyertakan prototipe hidup (Midtrans
            sandbox, lima peran, timer 60 menit, moderasi 3-strike) sebagai bonus uji coba. Yang kami minta dari
            juri bukan kepercayaan pada skala nasional, melainkan izin mental untuk uji 90 hari di Palangka Raya:
            3 hotel, 5 warung, 3 SPPG jika izin turun, target 500 porsi.
          </P>
          <H>2. Kesesuaian tema</H>
          <P>
            Food rescue bukan subtema TOR. Kami tidak memaksakannya sebagai judul. Bingkai karya adalah{" "}
            <strong>QRIS sebagai alat inklusi pangan</strong>: merchant baru di warung tepi Kahayan menerima
            pembayaran digital untuk barang yang selama ini dibuang; penerima manfaat mendapat harga yang masuk
            akal bagi rumah tangga di bawah garis kemiskinan Rp723.149/kapita/bulan. Lintas pelindungan konsumen
            (lapor dua arah) dan bantuan gizi (sisa MBG, bersyarat izin).
          </P>
          <P>
            IKP Provinsi Kalteng 2026 bernilai {KALTENG_IKP.province2026.toLocaleString("id-ID")} (peringkat {KALTENG_IKP.provinceRank},
            kategori Tahan), tetapi antarkabupaten timpang: Kotawaringin Timur {KALTENG_IKP.kotim.toLocaleString("id-ID")} versus Murung
            Raya {KALTENG_IKP.murungRaya.toLocaleString("id-ID")} ({KALTENG_IKP.source}). QRIS yang hanya hidup di mall Palangka tidak
            menyelesaikan ketimpangan itu. Pilot kami mulai di ibukota karena jaringan dan merchant QRIS sudah ada,
            lalu merangkak ke wilayah IKP rendah — bukan sebaliknya.
          </P>
          <Running page={2} />
        </Sheet>

        <Sheet className="flex flex-col">
          <H>3. Masalah</H>
          <P>
            Nasional, {NATIONAL_FLW.source} memperkirakan {NATIONAL_FLW.tons}, setara pangan bagi{" "}
            {NATIONAL_FLW.peopleEquivalent}, kerugian ekonomi {NATIONAL_FLW.economy}. Itu latar. Masalah yang kami
            kerjakan adalah Kalteng.
          </P>
          <ul className="mt-3 space-y-2">
            {KALTENG_FACTS.map((f) => (
              <li key={f.label} className="text-[12px] leading-[1.5]">
                <strong>{f.value} — {f.label}.</strong> {f.detail} <span className="text-stone-500">({f.source})</span>
              </li>
            ))}
          </ul>
          <P>
            MBG diluncurkan {MBG_KALTENG.launch}. Status terkini: {MBG_KALTENG.sppgActive}, {MBG_KALTENG.beneficiaries},{" "}
            {MBG_KALTENG.palangkaShare}. Radius dapur {MBG_KALTENG.radius}. Absensi siswa dan sisa produksi menghasilkan
            box yang hari ini tidak punya kanal
            digital. Menyalurkannya tanpa izin adalah risiko hukum; membiarkannya terbuang sementara stunting 22,1%
            adalah pemborosan gizi. Prototipe kami merancang alurnya, lalu berhenti di garis izin.
          </P>
          <H>4. Pengguna</H>
          <P>
            (1) Penerima: rumah tangga miskin Palangka, pekerja informal Pahandut, keluarga di sekitar SPPG.
            (2) Merchant QRIS: F&amp;B hotel, warung juhu, resto ikan patin, catering. (3) Operator SPPG, jika dan
            hanya jika Satgas/Dinkes mengizinkan sisa porsi. (4) Admin platform: mahasiswa + pendamping kampus,
            nanti Dinkes jika white-label.
          </P>
          <Running page={3} />
        </Sheet>

        <Sheet className="flex flex-col">
          <H>5. Solusi dan cara kerja</H>
          <ol className="text-[12px] leading-[1.55] list-decimal pl-4 space-y-1.5">
            <li>Mitra mengunggah surplus: foto, porsi, lokasi, masa berlaku. Harga non-MBG dibatasi Rp10.000.</li>
            <li>Penerima mencari berdasarkan kota Kalteng dan radius 1–25 km (geolokasi atau pilih kota).</li>
            <li>Listing diurutkan rumus terbuka: min(100, 100 − menit×0,55) + 12 jika gratis. Bukan model AI.</li>
            <li>Pembayaran QRIS / e-wallet / VA / kartu lewat Midtrans. Saat ini sandbox. Paket MBG tidak di-checkout.</li>
            <li>Reservasi terkunci 60 menit. Mitra konfirmasi “sudah diambil”. Tidak diambil → stok kembali.</li>
            <li>Lapor dua arah. Tiga peringatan → akun ditangguhkan. Admin meninjau.</li>
          </ol>
          <H>6. Orisinalitas (bukan Too Good To Go)</H>
          <P>
            Too Good To Go adalah surprise bag berbayar di kota besar. Kami berbeda pada lima titik yang relevan
            untuk BI Kalteng: (1) harga sosial terpasang, bukan diskon gourmet; (2) jalur MBG gratis terpisah,
            dengan disclaimer izin; (3) konteks sungai, IKP timpang, dan radius SPPG 6 km; (4) pelindungan konsumen
            3-strike yang cocok untuk uji coba kampus tanpa CS 24 jam; (5) take rate tahun pertama nol — model
            hibah, bukan GMV fee. Kami tidak mengklaim kecerdasan buatan. Juri yang menusuk “AI Score 87” akan
            melihat rumus di beranda.
          </P>
          <H>7. Status prototipe</H>
          <P>
            Frontend TanStack Start, penyimpanan lokal, akun demo, Midtrans Snap sandbox dengan cadangan popup jika
            kunci kosong. Bukan backend produksi. Bukan kemitraan hotel sungguhan. Simulasi 2 November 2026: akun
            Budi Santoso memesan banquet Hotel Kahayan Rp8.000, QRIS sandbox lunas, hotel mengonfirmasi pengambilan,
            listing baru muncul di Cari Palangka Raya. Itu bukti alur, bukan bukti pasar.
          </P>
          <Running page={4} />
        </Sheet>

        <Sheet className="flex flex-col">
          <H>8. Kelayakan pasar — TAM, SAM, SOM</H>
          <P>
            Angka berikut kasar dan sengaja konservatif. Kami lebih siap dikoreksi ke bawah daripada ketahuan
            mengarang TAM nasional.
          </P>
          <div className="mt-3 space-y-3">
            {[MARKET.tam, MARKET.sam, MARKET.som].map((m) => (
              <div key={m.label} className="border border-stone-200 rounded-lg p-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#c45c26]">{m.label} — {m.value}</div>
                <p className="text-[12px] leading-[1.5] mt-1">{m.detail}</p>
              </div>
            ))}
          </div>
          <H>9. Unit economics</H>
          <ul className="text-[12px] leading-[1.55] list-disc pl-4 space-y-1">
            <li>Take rate tahun 1: {UNIT_ECONOMICS.takeRateY1}.</li>
            <li>Biaya pembayaran: {UNIT_ECONOMICS.midtrans}.</li>
            <li>Opex: {UNIT_ECONOMICS.opex}.</li>
            <li>Pendapatan tahun 1: {UNIT_ECONOMICS.revenueY1}.</li>
            <li>Opsi tahun 2: {UNIT_ECONOMICS.year2}</li>
          </ul>
          <P>
            Ini bukan startup yang “sudah unit-profitable”. Ini karya mahasiswa yang jujur soal siapa yang bayar
            server. Jika KPw BI Kalteng atau Pemda ingin menguji QRIS merchant mikro di F&amp;B surplus, biaya
            tahun pertama adalah hibah uji coba, bukan equity story.
          </P>
          <Running page={5} />
        </Sheet>

        <Sheet className="flex flex-col">
          <H>10. Rencana 90 hari (Palangka Raya)</H>
          <table className="w-full text-[11.5px] leading-[1.45] mt-1">
            <thead>
              <tr className="text-left border-b border-stone-300">
                <th className="py-1.5 pr-2 w-28">Waktu</th>
                <th className="py-1.5">Kegiatan dan gerbang</th>
              </tr>
            </thead>
            <tbody>
              {PILOT_90.map((s) => (
                <tr key={s.when} className="border-b border-stone-200 align-top">
                  <td className="py-2 pr-2 font-semibold">{s.when}</td>
                  <td className="py-2">{s.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <P>
            Gerbang gagal yang kami terima: jika izin sisa MBG tidak keluar dalam 30 hari, jalur SPPG dimatikan
            dan KPI 500 porsi dihitung hanya dari hotel/UMKM. Itu lebih baik daripada menyalurkan makanan program
            pemerintah tanpa dasar hukum.
          </P>
          <H>11. Manfaat</H>
          <P>
            Merchant: sisa banquet tidak murni jadi biaya sampah; QRIS terpakai di transaksi mikro. Penerima:
            porsi layak di bawah Rp10.000, dekat rumah, timer jelas. Kota: sebagian dari ±67 t/hari sisa makanan
            tidak masuk TPA. Pemda/BI: uji inklusi QRIS di sektor yang biasanya tunai. Jika izin MBG ada: gizi
            yang sudah dibayar negara tidak dibuang sementara stunting belum ke 18,8%.
          </P>
          <P>
            Fase berikutnya hanya jika 90 hari tercapai: Sampit (IKP tinggi, gerbang industri), lalu Murung Raya
            dan Seruyan (IKP rendah, jaringan lemah — halaman hemat data, ambil dibantu petugas, cadangan SMS).
            Prototipe hari ini belum offline-first.
          </P>
          <Running page={6} />
        </Sheet>

        <Sheet className="flex flex-col">
          <H>12. Risiko dan mitigasi</H>
          <table className="w-full text-[11.5px] leading-[1.45]">
            <thead>
              <tr className="text-left border-b border-stone-300">
                <th className="py-1.5 pr-2">Risiko</th>
                <th className="py-1.5">Mitigasi</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Sisa MBG tanpa izin = pelanggaran program", "Disclaimer di listing. Jalur SPPG off sampai surat izin. Pilot tetap hotel/UMKM."],
                ["Keracunan makanan surplus", "SOP masa berlaku, foto, konfirmasi mitra, lapor 3-strike, asuransi uji coba kampus/Dinkes."],
                ["Tidak ada LoI hotel", "90 hari dimulai dari 3 hotel yang sudah kami petakan di Palangka; jika 0 LoI, karya berhenti di prototipe."],
                ["Jaringan kabupaten terpencil", "Tidak dijanjikan tahun 1. Murung Raya = fase 2."],
                ["Take rate 0% tidak sustainable", "Disepakati. Tahun 1 hibah. Tahun 2 opsi Rp500/transaksi berbayar."],
                ["Klaim AI / kemitraan fiktif", "Sudah dihapus dari produk. Rumus skor ditampilkan di beranda."],
              ].map(([r, m]) => (
                <tr key={r} className="border-b border-stone-200 align-top">
                  <td className="py-2 pr-2 font-semibold w-[42%]">{r}</td>
                  <td className="py-2">{m}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <H>13. Penutup</H>
          <P>
            Kami tidak meminta juri percaya bahwa PanganPeduli sudah menyelamatkan Kalteng. Kami meminta juri
            menilai bahwa masalahnya nyata (BPS, SIPSN, SSGI, DJPb), solusinya pas dengan tema QRIS, uji cobanya
            bisa dijalankan di depan layar, dan rencana 90 harinya punya gerbang gagal yang dewasa. Jika lolos,
            kerja berikutnya bukan menambah fitur AI — melainkan surat izin, LoI hotel, dan 500 porsi pertama
            yang benar-benar terambil di Palangka Raya.
          </P>
          <p className="mt-4 text-[12px]">Hormat kami,</p>
          <p className="mt-6 text-[12px] font-semibold">
            {TEAM.map((m) => m.name).join(" · ")}
          </p>
          <p className="text-[11px] text-stone-600">{COMPETITION.campus}</p>
          <Running page={7} />
        </Sheet>

        <Sheet className="flex flex-col">
          <H>Lampiran A — Sumber data</H>
          <ul className="text-[11.5px] leading-[1.5] list-disc pl-4 space-y-1">
            {KALTENG_FACTS.map((f) => (
              <li key={f.label}>
                {f.source} — {f.label}. {f.href}
              </li>
            ))}
            <li>
              {KALTENG_IKP.source}. {KALTENG_IKP.href}
            </li>
            <li>
              {NATIONAL_FLW.source}. {NATIONAL_FLW.href}
            </li>
            <li>{MBG_KALTENG.source}.</li>
          </ul>
          <H>Lampiran B — Akun uji coba prototipe</H>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="text-left border-b border-stone-300">
                <th className="py-1">Peran</th>
                <th className="py-1">Email</th>
                <th className="py-1">Sandi</th>
                <th className="py-1">Catatan</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_FLOW.map((a) => (
                <tr key={a.email} className="border-b border-stone-200">
                  <td className="py-1.5">{a.role}</td>
                  <td className="py-1.5 font-mono">{a.email}</td>
                  <td className="py-1.5 font-mono">{a.password}</td>
                  <td className="py-1.5">{a.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-[11px] text-stone-600">
            Alur demo 4 menit: penerima → Cari Palangka Raya → Nasi Box Ayam Banquet Kahayan Rp8.000 → QRIS
            sandbox → hotel konfirmasi diambil → unggah listing baru.
          </p>
          <Running page={8} />
        </Sheet>

        <Sheet className="flex flex-col">
          <H>Lampiran C — Naskah video 5 menit</H>
          <p className="text-[11px] text-stone-600 mb-3">
            Rekaman layar hanya Palangka / prototipe ini. Dilarang menyebut AI, MoU 107 SPPG, atau screenshot Jakarta.
            Tag Instagram {COMPETITION.instagram.join(" dan ")} sesuai ketentuan panitia.
          </p>
          {PITCH.map((p) => (
            <div key={p.clock} className="mb-3">
              <div className="text-[11px] font-bold text-[#c45c26]">
                {p.clock} — {p.title}
              </div>
              <p className="text-[10px] text-stone-500 mt-0.5 italic">Layar: {p.visual}</p>
              <p className="text-[12px] leading-[1.5] mt-0.5">{p.script}</p>
            </div>
          ))}
          <Running page={9} />
        </Sheet>
      </div>
    </div>
  );
}
