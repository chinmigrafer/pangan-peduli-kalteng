import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import {
  CHECKLIST_STAGE_I,
  COMPETITION,
  DEMO_FLOW,
  MARKET,
  PITCH,
  PILOT_90,
  TEAM,
  UNIT_ECONOMICS,
} from "@/lib/competition";
import { Clock, FileText, Image, MapPin, Printer, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/lomba")({
  head: () => ({
    meta: [
      { title: "Paket juri — PanganPeduli · Tambun Bungai Ideathon 2026" },
      { name: "description", content: "Poster A3, proposal, naskah video 5 menit, dan akun uji coba untuk dewan juri." },
    ],
  }),
  component: LombaPage,
});

function LombaPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pt-28 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">{COMPETITION.title}</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold leading-tight">
            Paket tahap I untuk juri
          </h1>
          <p className="mt-3 text-lg font-semibold text-foreground max-w-3xl leading-snug">
            {COMPETITION.workTitle}
          </p>
          <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
            {COMPETITION.campus} · {COMPETITION.organizer}. {COMPETITION.tagline}.
            Batas unggah <strong className="text-foreground">{COMPETITION.deadline}</strong>.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            {[
              { to: "/poster", icon: Image, label: "Poster A3", hint: "Cetak PDF tegak" },
              { to: "/proposal", icon: FileText, label: "Proposal A4", hint: "8–12 halaman TOR" },
              { to: "/cari", icon: MapPin, label: "Uji coba hidup", hint: "QRIS sandbox Palangka" },
            ].map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="glass-card rounded-2xl p-5 hover-lift flex items-start gap-3"
              >
                <c.icon className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="font-display font-bold">{c.label}</div>
                  <div className="text-xs text-muted-foreground">{c.hint}</div>
                </div>
              </Link>
            ))}
          </div>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold">Tim</h2>
            <ul className="mt-4 grid sm:grid-cols-3 gap-3">
              {TEAM.map((m) => (
                <li key={m.name} className="glass-card rounded-2xl p-4">
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{m.role}</div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold">Yang harus dikumpulkan (bukan prototipe)</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              TOR menilai video, poster, dan materi. Aplikasi hanya bonus uji coba. Instagram dan Google Form tidak bisa diisi dari sini — itu kerja tim sebelum 8 Nov.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                    <th className="py-2 pr-3">Berkas</th>
                    <th className="py-2 pr-3">PIC</th>
                    <th className="py-2">Sumber</th>
                  </tr>
                </thead>
                <tbody>
                  {CHECKLIST_STAGE_I.map((row) => (
                    <tr key={row.item} className="border-b border-border/60">
                      <td className="py-3 pr-3">{row.item}</td>
                      <td className="py-3 pr-3 text-muted-foreground">{row.owner}</td>
                      <td className="py-3">
                        {row.where ? (
                          <a href={row.where} className="text-primary font-medium hover:underline">
                            {row.where}
                          </a>
                        ) : (
                          <span className="text-muted-foreground">di luar aplikasi</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="naskah" className="mt-12">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="font-display text-2xl font-bold">Naskah video ≤ 5 menit</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Baca apa adanya. Menit 1:30–3:00 rekam layar prototipe (Palangka, QRIS, bukan Jakarta). Jangan sebut AI, MoU SPPG, atau skala nasional.
            </p>
            <ol className="mt-5 space-y-4">
              {PITCH.map((p) => (
                <li key={p.clock} className="glass-card rounded-2xl p-5">
                  <div className="text-xs font-mono text-primary">{p.clock} · {p.title}</div>
                  <p className="mt-1 text-[11px] text-muted-foreground italic">Layar: {p.visual}</p>
                  <p className="mt-2 text-sm leading-relaxed">{p.script}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold">TAM / SAM / SOM (kasar, jujur)</h2>
            <div className="mt-4 grid md:grid-cols-3 gap-3">
              {[MARKET.tam, MARKET.sam, MARKET.som].map((m) => (
                <div key={m.label} className="glass-card rounded-2xl p-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">{m.label}</div>
                  <div className="font-display text-2xl font-bold mt-1">{m.value}</div>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{m.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Take rate tahun 1: {UNIT_ECONOMICS.takeRateY1}. Opex: {UNIT_ECONOMICS.opex}. Pendapatan: {UNIT_ECONOMICS.revenueY1}.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold">Pilot 90 hari Palangka Raya</h2>
            <ul className="mt-4 space-y-3">
              {PILOT_90.map((s) => (
                <li key={s.when} className="flex gap-4">
                  <span className="shrink-0 w-28 text-xs font-semibold text-primary pt-1">{s.when}</span>
                  <span className="text-sm leading-relaxed">{s.what}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold">Akun uji coba</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                    <th className="py-2 pr-3">Peran</th>
                    <th className="py-2 pr-3">Email</th>
                    <th className="py-2 pr-3">Sandi</th>
                    <th className="py-2">Catatan</th>
                  </tr>
                </thead>
                <tbody>
                  {DEMO_FLOW.map((a) => (
                    <tr key={a.email} className="border-b border-border/60">
                      <td className="py-2 pr-3 font-medium">{a.role}</td>
                      <td className="py-2 pr-3 font-mono text-xs">{a.email}</td>
                      <td className="py-2 pr-3 font-mono text-xs">{a.password}</td>
                      <td className="py-2 text-muted-foreground">{a.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Alur 4 menit: masuk penerima → Cari Palangka → nasi box Kahayan Rp8.000 → QRIS sandbox → hotel konfirmasi diambil → unggah listing baru.
            </p>
          </section>

          <section className="mt-12 glass-card rounded-2xl p-5 flex gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm leading-relaxed">
              <strong>Batas jujur di depan juri.</strong> Mitra di prototipe fiktif. Sisa MBG butuh izin Satgas/Dinkes.
              Skor prioritas bukan model AI. Take rate belum ada. Instagram {COMPETITION.instagram.join(" dan ")} harus di-tag manual.
              Jangan unggah screenshot Jakarta atau proposal bermerek lain.
            </div>
          </section>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/poster"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground font-semibold"
            >
              <Printer className="w-4 h-4" /> Cetak poster A3
            </Link>
            <Link to="/proposal" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-card font-semibold">
              Buka proposal
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
