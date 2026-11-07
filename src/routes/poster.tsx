import { createFileRoute } from "@tanstack/react-router";
import { PrintToolbar } from "@/components/print-toolbar";
import { COMPETITION, MARKET, TEAM, WORK_TITLE } from "@/lib/competition";
import { Leaf } from "lucide-react";

export const Route = createFileRoute("/poster")({
  head: () => ({
    meta: [{ title: `Poster A3 — ${COMPETITION.workTitleShort}` }],
  }),
  component: PosterPage,
});

const FACTS = [
  { v: "146.710", l: "miskin Kalteng", s: "BPS Mar 2026 · 5,09%" },
  { v: "41,8%", l: "sisa makanan Palangka", s: "SIPSN · ±67 t/hari" },
  { v: "22,1%", l: "stunting", s: "SSGI 2024 · target 18,8%" },
  { v: "107", l: "SPPG MBG", s: "DJPb 31 Agu 2026" },
];

const STEPS = [
  { n: "01", t: "Mitra unggah surplus", d: "Hotel, warung, SPPG — foto, porsi, masa berlaku." },
  { n: "02", t: "Cari radius 1–25 km", d: "Prioritas kedaluwarsa — rumus terbuka, bukan AI." },
  { n: "03", t: "Bayar QRIS ≤ Rp10.000", d: "Midtrans. Banner anti-OTP. MBG gratis." },
  { n: "04", t: "Ambil 60 menit", d: "HP ter-masking. Lapor 3× → suspend." },
];

function PosterPage() {
  return (
    <div className="min-h-screen bg-zinc-200 print:bg-white">
      <style>{`@media print { @page { size: A3 portrait; margin: 0; } }`}</style>
      <PrintToolbar title="Poster A3 tegak · Save as PDF · Paper: A3" />
      <div className="py-8 print:py-0 flex justify-center">
        <article
          className="print-sheet-a3 bg-[#fffaf3] text-[#2a2118] shadow-2xl flex flex-col"
          style={{ width: "297mm", minHeight: "420mm", padding: "11mm 13mm" }}
        >
          <header className="flex items-start justify-between gap-4 border-b-2 border-[#c45c26] pb-2.5">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-11 h-11 rounded-xl bg-[image:var(--gradient-warm)]">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display text-xl font-extrabold tracking-tight">
                  Pangan<span className="text-[#c45c26]">Peduli</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#7a5c45]">
                  {COMPETITION.campus}
                </div>
              </div>
            </div>
            <div className="text-right text-[10px] leading-snug max-w-[46%]">
              <div className="font-semibold">{COMPETITION.title}</div>
              <div>{COMPETITION.organizer}</div>
              <div className="mt-1 text-[#c45c26] font-semibold">
                Lintas: QRIS · inklusi MBG · pelindungan konsumen
              </div>
            </div>
          </header>

          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c45c26]">
            Judul karya
          </p>
          <h1 className="mt-1 font-display text-[26px] leading-[1.15] font-extrabold tracking-tight">
            {WORK_TITLE}
          </h1>
          <p className="mt-2 text-[12px] leading-relaxed text-[#5c4636] max-w-[96%]">
            {COMPETITION.tagline}. Hotel/warung Palangka menerima QRIS untuk sisa porsi;
            keluarga miskin mendapat kanal ambil jelas. Uji coba fiktif — izin Satgas/Dinkes belum ada.
          </p>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {FACTS.map((f) => (
              <div key={f.l} className="rounded-xl bg-white border border-[#ead9c8] px-3 py-2">
                <div className="font-display text-[20px] font-extrabold text-[#c45c26] leading-none">{f.v}</div>
                <div className="mt-1 text-[11px] font-semibold leading-tight">{f.l}</div>
                <div className="text-[9px] text-[#7a5c45] mt-0.5">{f.s}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#c45c26]">Cara kerja</h2>
              <ol className="mt-1.5 space-y-1.5">
                {STEPS.map((s) => (
                  <li key={s.n} className="flex gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#c45c26] pt-0.5">{s.n}</span>
                    <div>
                      <div className="text-[12px] font-bold leading-tight">{s.t}</div>
                      <div className="text-[10px] text-[#5c4636]">{s.d}</div>
                    </div>
                  </li>
                ))}
              </ol>

              <h2 className="mt-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#c45c26]">
                Lintas subtema TOR
              </h2>
              <ul className="mt-1.5 text-[11px] space-y-1 leading-snug">
                <li>• <strong>QRIS:</strong> merchant surplus ≤ Rp10.000 via Midtrans.</li>
                <li>• <strong>Inklusi:</strong> kanal MBG gratis (izin dulu — belum ada).</li>
                <li>• <strong>Pelindungan:</strong> anti-OTP, masking HP, lapor 3-strike.</li>
                <li>• Skor prioritas rumus terbuka — <strong>bukan AI</strong>.</li>
                <li>• Pilot Palangka → Sampit → Murung Raya (IKP 61,09).</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-[#2a2118] text-[#fffaf3] p-3.5 flex flex-col">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f0b27a]">
                Pasar kasar (jujur)
              </h2>
              <div className="mt-2.5 space-y-2.5">
                {[MARKET.tam, MARKET.sam, MARKET.som].map((m) => (
                  <div key={m.label}>
                    <div className="text-[9px] uppercase tracking-wider text-[#f0b27a]">{m.label}</div>
                    <div className="font-display text-[16px] font-bold leading-tight">{m.value}</div>
                    <p className="text-[9px] leading-snug text-[#e8d5c4] mt-0.5">
                      {m.label === "TAM" && "2% sisa makanan layak Kalteng, GMV teoretis."}
                      {m.label === "SAM" && "Hanya Palangka, hospitality + SPPG 6–10 km."}
                      {m.label === "SOM 90 hari" && "11 mitra uji coba. Take rate tahun 1 = 0%."}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-2.5 border-t border-white/15 text-[10px] leading-snug">
                <strong>90 hari:</strong> izin Dinkes/Satgas → LoI 3 hotel + 5 warung → QRIS live → 500 porsi.
                Tanpa izin MBG → hotel/UMKM saja.
              </div>
            </div>
          </div>

          <footer className="mt-auto pt-3 border-t border-[#ead9c8] flex items-end justify-between gap-3">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-[#7a5c45]">Tim</div>
              <div className="text-[11px] font-semibold leading-snug">
                {TEAM.map((m) => m.name).join("  ·  ")}
              </div>
              <div className="text-[9px] text-[#7a5c45] mt-1">
                Mitra fiktif. Bukan MoU 107 SPPG. IG {COMPETITION.instagram.join(" ")}.
              </div>
            </div>
            <div className="text-right text-[10px] leading-snug">
              <div className="font-bold text-[#c45c26]">Prototipe uji coba</div>
              <div>/lomba · Midtrans sandbox</div>
              <div>Batas unggah {COMPETITION.deadline}</div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
