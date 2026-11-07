import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, MapPin, Sparkles, Leaf, Heart,
  ShieldCheck, Utensils, Store, GraduationCap, Hotel,
  ChefHat, Package, Users, Trophy, Flame, Zap, Star,
  CheckCircle2, ChevronRight, Search, ChevronDown, Plus, Minus, Quote, CreditCard,
} from "lucide-react";
import heroImg from "@/assets/hero-illustration.png";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { IndonesiaMapSection } from "@/components/indonesia-map";
import { ShieldAlert } from "lucide-react";

import { Marquee } from "@/components/marquee";
import { KALTENG_FACTS, KALTENG_IKP, NATIONAL_FLW } from "@/lib/kalteng-facts";
import { priorityScore } from "@/lib/format";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PanganPeduli — QRIS & inklusi pangan Kalimantan Tengah" },
      { name: "description", content: "Prototipe uji coba: QRIS untuk surplus hotel/UMKM Palangka Raya dan kanal ambil paket MBG. Mitra fiktif — bukan kemitraan resmi." },
      { property: "og:title", content: "PanganPeduli — QRIS & inklusi pangan Kalteng" },
      { property: "og:description", content: "Bayar surplus murah via QRIS atau ambil paket MBG. Prototipe Tambun Bungai Ideathon 2026, STMIK Palangka Raya." },
    ],
  }),
  component: Landing,
});

function useCountUp(target: number, duration = 2000, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
}

// Nav moved to <SiteNav /> shared component


const HERO_WORDS = ["Makanan", "Kebaikan", "Surplus", "Berkah"];
function useWordCycle(words: string[], interval = 2400) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words, interval]);
  return words[i];
}

function Hero() {
  const word = useWordCycle(HERO_WORDS);
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-mesh)" }} />
      <div
        className="absolute -top-24 -right-24 -z-10 w-[520px] h-[520px] opacity-30 animate-blob"
        style={{ background: "var(--gradient-warm)", filter: "blur(60px)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -left-20 -z-10 w-[420px] h-[420px] opacity-20 animate-blob"
        style={{ background: "var(--gradient-primary)", filter: "blur(70px)", animationDelay: "-9s" }}
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mb-8">
        <Link
          to="/lomba"
          className="flex items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-background/70 backdrop-blur px-4 py-2.5 text-sm hover:bg-primary/10 transition-colors"
        >
          <span>
            <span className="font-semibold text-primary">Paket juri Ideathon</span>
            <span className="hidden sm:inline text-muted-foreground"> — poster A3, proposal, naskah video 5 menit · batas 8 Nov 2026</span>
          </span>
          <span className="shrink-0 font-semibold text-primary">Buka →</span>
        </Link>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-medium mb-6 hover-lift">
            <span className="relative grid place-items-center w-4 h-4">
              <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              <Sparkles className="relative w-3.5 h-3.5 text-primary" />
            </span>
            <span>QRIS &amp; inklusi pangan Kalteng · prototipe uji coba</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Selamatkan{" "}
            <span key={word} className="inline-block text-gradient animate-fade-up">
              {word}
            </span>
            ,<br />
            Bantu Sesama.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            PanganPeduli menyalurkan surplus hotel, warung, dan dapur MBG di Palangka Raya, Sampit, serta Pangkalan Bun
            lewat QRIS sandbox (berbayar) atau ambil gratis (MBG) — sebelum jadi sampah. Mitra uji coba bersifat fiktif.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/cari"
              className="group btn-shine inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[image:var(--gradient-warm)] animate-gradient text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition-all hover:-translate-y-0.5"
            >
              <MapPin className="w-4 h-4" />
              Cari Makanan Terdekat
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/auth"
              search={{ mode: "register" }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-card font-semibold hover-lift"
            >
              Daftar Sebagai Mitra
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex -space-x-3">
              {[
                { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&h=120&fit=crop", alt: "Hotel Kahayan Palangka" },
                { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=120&h=120&fit=crop", alt: "Warung Juhu Kahayan" },
                { src: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=120&h=120&fit=crop", alt: "Restoran Ikan Patin Kahayan" },
                { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=120&h=120&fit=crop", alt: "SPPG Bukit Tunggal Palangka" },
              ].map((p, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden shadow-soft hover:scale-110 hover:z-10 transition-transform">
                  <img src={p.src} alt={p.alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-background bg-[image:var(--gradient-warm)] grid place-items-center text-[10px] font-bold text-primary-foreground shadow-soft">
                14
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_,i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="mt-0.5"><span className="font-semibold text-foreground">14 mitra uji coba</span> di Kalteng</p>
            </div>
          </div>
        </div>
        <div className="relative animate-scale-in">
          <div className="relative aspect-square max-w-xl mx-auto">
            <div className="absolute inset-0 rounded-[3rem] bg-[image:var(--gradient-warm)] opacity-20 blur-3xl animate-glow-pulse" />
            <img src={heroImg} alt="Ilustrasi distribusi makanan PanganPeduli" className="relative w-full h-full object-contain animate-float" />
            <FloatCard className="absolute top-8 -left-2 sm:left-4 animate-float-slow" icon={<Leaf className="w-4 h-4 text-success" />} title="5,09%" subtitle="Miskin Kalteng · BPS 2026" />
            <FloatCard className="absolute bottom-16 -right-2 sm:right-4" style={{ animation: "float 7s ease-in-out infinite" }} icon={<Users className="w-4 h-4 text-primary" />} title="107" subtitle="SPPG aktif · DJPb Agu 2026" />
            <FloatCard className="absolute bottom-0 left-8" style={{ animation: "float 5s ease-in-out infinite" }} icon={<Heart className="w-4 h-4 text-destructive" />} title="41,8%" subtitle="Sisa makanan Palangka" />
          </div>
        </div>
      </div>
      <div className="mt-16 flex justify-center">
        <a
          href="#solusi"
          className="group flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>Gulir untuk menjelajah</span>
          <ChevronDown className="w-4 h-4 animate-bounce-soft" />
        </a>
      </div>
    </section>
  );
}


function FloatCard({ icon, title, subtitle, className = "", style }: { icon: React.ReactNode; title: string; subtitle: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`glass-card rounded-2xl px-4 py-3 shadow-float flex items-center gap-3 min-w-[160px] ${className}`} style={style}>
      <div className="w-9 h-9 grid place-items-center rounded-xl bg-secondary">{icon}</div>
      <div>
        <div className="font-display font-bold text-sm">{title}</div>
        <div className="text-[11px] text-muted-foreground">{subtitle}</div>
      </div>
    </div>
  );
}

function ProblemFacts() {
  return (
    <section id="masalah" className="py-16 lg:py-24 border-y border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Masalah Nyata Kalimantan Tengah</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Makanan terbuang, gizi masih kurang.</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Secara nasional, Bappenas memperkirakan {NATIONAL_FLW.tons} (2019–2023) — FLW historis cukup untuk memberi makan {NATIONAL_FLW.peopleEquivalent}.
            Di Palangka Raya, sisa makanan masih jenis sampah terbesar. Kemiskinan Kalteng naik lagi pada Maret 2026, stunting 22,1% belum ke target 18,8%,
            dan 107 SPPG belum punya kanal digital (QRIS/gratis) untuk kelebihan porsi. Penyaluran sisa MBG di prototipe bersifat uji coba — implementasi nyata butuh izin Satgas MBG/Dinkes.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {KALTENG_FACTS.map((f) => (
            <a key={f.label} href={f.href} target="_blank" rel="noreferrer" className="glass-card rounded-2xl p-6 hover-lift block">
              <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-primary">{f.value}</div>
              <div className="text-sm font-semibold mt-2">{f.label}</div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{f.detail}</p>
              <p className="text-[10px] text-muted-foreground/80 mt-3">Sumber: {f.source}</p>
            </a>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          IKP Provinsi Kalteng 2026: {KALTENG_IKP.province2026.toLocaleString("id-ID")} (peringkat {KALTENG_IKP.provinceRank}, kategori Tahan).
          Antarkabupaten masih timpang: Kotawaringin Timur {KALTENG_IKP.kotim.toLocaleString("id-ID")} vs Murung Raya {KALTENG_IKP.murungRaya.toLocaleString("id-ID")} (IKP kab/kota 2025).
          Angka di atas adalah data resmi, bukan klaim kinerja PanganPeduli.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: ChefHat, title: "Mitra Upload Makanan", desc: "Hotel, warung, restoran, dan SPPG MBG di Kalteng mengunggah surplus beserta lokasi & masa berlaku.", color: "bg-primary/10 text-primary" },
    { icon: MapPin, title: "User Temukan Terdekat", desc: "Geolokasi memprioritaskan makanan dalam radius 1–25 km di Palangka Raya dan kota Kalteng lain.", color: "bg-success/10 text-success" },
    { icon: CreditCard, title: "Bayar via Midtrans", desc: "Makanan berbayar dilunasi QRIS, e-wallet, VA, atau kartu lewat Midtrans sandbox. MBG tetap gratis.", color: "bg-amber-500/10 text-amber-600" },
    { icon: CheckCircle2, title: "Ambil & Konfirmasi", desc: "Pengambilan dikonfirmasi mitra. Makanan terselamatkan, dampak nyata tercatat.", color: "bg-emerald-500/10 text-emerald-600" },
  ];
  return (
    <section id="solusi" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Bagaimana Cara Kerjanya</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold">Dari Surplus Menjadi <span className="text-gradient">Berkah</span>.</h2>
          <p className="mt-4 text-lg text-muted-foreground">Empat langkah sederhana untuk mengubah makanan yang akan terbuang menjadi solusi sosial nyata.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="relative glass-card rounded-2xl p-6 hover-lift tilt-card h-full magnetic-glow"
                onMouseMove={(e) => {
                  const t = e.currentTarget as HTMLElement;
                  const r = t.getBoundingClientRect();
                  t.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  t.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <div className={`w-12 h-12 rounded-xl grid place-items-center ${s.color} mb-4`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-muted-foreground mb-2">STEP {String(i+1).padStart(2,"0")}</div>
                <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                {i < 3 && <ChevronRight className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-border" />}
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { to: "/kategori/mbg", icon: GraduationCap, title: "Dapur MBG / SPPG", desc: "Paket gizi sisa absensi siswa. Radius SPPG 6 km.", count: "3", radius: "Palangka & Sampit", className: "lg:col-span-2 lg:row-span-2", gradient: "from-primary/20 to-primary/5" },
    { to: "/kategori/hotel", icon: Hotel, title: "Hotel", desc: "Surplus breakfast & banquet Palangka, Sampit, Pangkalan Bun.", count: "3", radius: "Ibukota & gerbang wisata", gradient: "from-amber-500/20 to-amber-500/5" },
    { to: "/kategori/restoran", icon: ChefHat, title: "Restoran & Cafe", desc: "Ikan patin, kopi Jalan Jawa, masakan Dayak.", count: "5", radius: "Palangka Raya", gradient: "from-emerald-500/20 to-emerald-500/5" },
    { to: "/kategori/umkm", icon: Store, title: "UMKM & Warung", desc: "Warung juhu, soto, dan catering lokal Kalteng.", count: "3", radius: "Pahandut & Jekan Raya", className: "lg:col-span-2", gradient: "from-rose-500/20 to-rose-500/5" },
  ] as Array<{ to: string; icon: any; title: string; desc: string; count: string; radius: string; className?: string; gradient: string }>;
  return (
    <section id="kategori" className="py-20 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Kategori Mitra</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold">Ekosistem yang <span className="text-gradient">Terhubung</span></h2>
          <p className="mt-3 text-muted-foreground">Klik kategori untuk melihat listing uji coba. Nama mitra fiktif — bukan kemitraan resmi.</p>
        </div>
        <div className="grid lg:grid-cols-4 lg:grid-rows-2 gap-4 sm:gap-6 auto-rows-[200px]">
          {cats.map((c, i) => (
            <Link key={i} to={c.to} className={`group glass-card rounded-3xl p-6 sm:p-8 hover-lift relative overflow-hidden ${c.className || ""}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-60`} />
              <div className="relative h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-background grid place-items-center shadow-soft mb-4">
                  <c.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-xs">{c.desc}</p>
                <div className="mt-auto pt-6 flex items-center justify-between text-sm">
                  <div><span className="font-display font-bold text-2xl text-foreground">{c.count}</span><span className="text-muted-foreground ml-1">mitra</span></div>
                  <div className="flex items-center gap-1 text-primary font-semibold group-hover:translate-x-1 transition-transform">Lihat <ArrowRight className="w-3 h-3" /></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PriorityScore() {
  const exampleExpires = new Date(Date.now() + 45 * 60000).toISOString();
  const score = priorityScore(exampleExpires, 8000);
  return (
    <section id="prioritas" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-mesh)" }} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            ATURAN TRANSPARAN — BUKAN MODEL AI
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            Skor Prioritas <span className="text-gradient">Rescue</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Listing diurutkan dengan rumus terbuka: makin dekat kedaluwarsa, makin tinggi skornya.
            Paket MBG gratis mendapat bonus +12. Tidak ada model machine learning di prototipe ini.
          </p>
          <p className="mt-3 text-sm font-mono text-muted-foreground">skor = min(100, 100 − menit×0,55) + (gratis ? 12 : 0)</p>
          <div className="mt-8 space-y-3">
            {[
              { icon: Flame, label: "Prioritas Tinggi", desc: "Habis ≤ 60 menit — ambil segera" },
              { icon: Zap, label: "Segera Diambil", desc: "Habis 1–2 jam — masih jendela aman" },
              { icon: Trophy, label: "Dampak Sosial", desc: "Paket MBG gratis atau masa berlaku lebih longgar" },
            ].map((b,i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl glass-card hover-lift">
                <div className="w-10 h-10 rounded-xl bg-[image:var(--gradient-warm)] grid place-items-center shrink-0">
                  <b.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold">{b.label}</div>
                  <div className="text-sm text-muted-foreground">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="glass-card rounded-[2.5rem] p-8 shadow-float">
            <div className="flex items-center justify-between mb-6">
              <div className="text-xs font-mono text-muted-foreground">CONTOH · BANQUET 45 MENIT</div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <Flame className="w-3 h-3" /> Prioritas Tinggi
              </div>
            </div>
            <div className="relative aspect-square max-w-[280px] mx-auto">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                <circle cx="100" cy="100" r="85" stroke="currentColor" className="text-secondary" strokeWidth="14" fill="none" />
                <circle cx="100" cy="100" r="85" stroke="url(#grad)" strokeWidth="14" fill="none" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 85}
                  strokeDashoffset={2 * Math.PI * 85 * (1 - score / 100)} />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.58 0.16 45)" />
                    <stop offset="100%" stopColor="oklch(0.78 0.18 60)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="font-display text-6xl font-bold text-gradient">{score}</div>
                  <div className="text-xs text-muted-foreground mt-1">dari 100</div>
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-secondary"><div className="font-display font-bold">QRIS</div><div className="text-[10px] text-muted-foreground">Berbayar ≤10rb</div></div>
              <div className="p-3 rounded-xl bg-secondary"><div className="font-display font-bold">Gratis</div><div className="text-[10px] text-muted-foreground">Paket MBG</div></div>
              <div className="p-3 rounded-xl bg-secondary"><div className="font-display font-bold">60 mnt</div><div className="text-[10px] text-muted-foreground">Timer ambil</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      icon: MapPin,
      title: "Pencarian Berbasis Lokasi",
      desc: "Filter listing berdasarkan kota Kalteng (Palangka Raya, Sampit, Pangkalan Bun) dan kategori mitra.",
    },
    {
      icon: CreditCard,
      title: "Payment Gateway Midtrans",
      desc: "QRIS, e-wallet, VA, dan kartu lewat Midtrans sandbox — selaras tema pembayaran digital BI. Paket MBG tetap gratis.",
    },
    {
      icon: ShieldCheck,
      title: "Verifikasi Mitra oleh Admin",
      desc: "Admin meninjau & menyetujui mitra sebelum boleh publish listing.",
    },
    {
      icon: ShieldAlert,
      title: "Laporan Dua Arah + 3-Strike",
      desc: "User lapor mitra, mitra lapor user. 3 warning → akun otomatis suspended.",
    },
    {
      icon: Users,
      title: "Dashboard Peran",
      desc: "Tampilan berbeda untuk Penerima, Mitra/Donor, dan Admin.",
    },
    {
      icon: Package,
      title: "Riwayat Reservasi",
      desc: "Lacak status: aktif, sudah diambil, dibatalkan, atau kedaluwarsa.",
    },
  ];

  return (
    <section id="impact" className="pt-20 pb-10 lg:pt-28 lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Fitur Lengkap</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold">QRIS, geolokasi, dan <span className="text-gradient">perlindungan pengguna</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                className="group glass-card rounded-2xl p-6 hover-lift tilt-card magnetic-glow h-full"
                onMouseMove={(e) => {
                  const t = e.currentTarget as HTMLElement;
                  const r = t.getBoundingClientRect();
                  t.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  t.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <div className="w-11 h-11 rounded-xl bg-[image:var(--gradient-warm)] grid place-items-center mb-4 shadow-elegant group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <it.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold mb-2">{it.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="mitra" className="pt-4 pb-20 lg:pt-6 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className="relative rounded-[2.5rem] overflow-hidden p-10 sm:p-14 lg:p-20 text-center flex flex-col items-center"
          style={{ background: "var(--gradient-warm)" }}
        >
          <div className="absolute inset-0 -z-0 opacity-30 pointer-events-none" style={{ background: "var(--gradient-mesh)" }} />
          <div className="relative z-10 flex flex-col items-center">
            <Sparkles className="w-10 h-10 text-primary-foreground/90 mb-4 animate-float" />
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground max-w-3xl leading-tight">
              Jadi bagian dari food rescue Kalimantan Tengah.
            </h2>
            <p className="mt-5 text-lg text-primary-foreground/90 max-w-xl">
              Mulai dari Palangka Raya. Setiap porsi yang diselamatkan adalah satu langkah menekan sampah makanan dan stunting.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/cari" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-background text-foreground font-semibold shadow-float hover:scale-105 transition-transform">
                <Search className="w-4 h-4" /> Cari Makanan Sekarang
              </Link>
              <Link to="/auth" search={{ mode: "register" }} className="px-7 py-4 rounded-xl bg-primary-foreground/15 backdrop-blur border border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/25 transition-colors">
                Daftar Sebagai Mitra
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs">
              {[
                { to: "/kategori/mbg", label: "Program MBG" },
                { to: "/kategori/hotel", label: "Hotel" },
                { to: "/kategori/umkm", label: "UMKM" },
                { to: "/kategori/restoran", label: "Restoran" },
              ].map((c) => (
                <Link key={c.to} to={c.to} className="px-3 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur text-primary-foreground hover:bg-primary-foreground/25 transition">{c.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const partners = [
    { name: "Hotel Kahayan Palangka", icon: Hotel },
    { name: "Restoran Ikan Patin Kahayan", icon: ChefHat },
    { name: "SPPG Bukit Tunggal", icon: GraduationCap },
    { name: "Warung Juhu Kahayan", icon: Store },
    { name: "Kopi Jalan Jawa", icon: Utensils },
    { name: "Hotel Mentaya Sampit", icon: Hotel },
    { name: "SPPG Menteng Palangka", icon: GraduationCap },
    { name: "Cafe Tepi Rungan", icon: ChefHat },
    { name: "Catering Betang Lestari", icon: Store },
  ];
  return (
    <section className="py-14 border-y border-border bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
            Mitra uji coba fiktif di Palangka Raya, Sampit, dan Pangkalan Bun
          </p>
        </Reveal>
        <Marquee>
          {partners.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <p.icon className="w-5 h-5 text-primary" />
              <span className="font-display font-semibold text-lg whitespace-nowrap">{p.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "Surplus banquet di tepi Kahayan sering sisa. Prototipe ini bikin stok tersalurkan ke keluarga Pahandut sebelum jadi sampah.",
      name: "Rangga Pratama",
      role: "GM, Hotel Kahayan Palangka (demo)",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop",
    },
    {
      quote:
        "Warung juhu kami kecil. Sisa sore sekarang bisa diambil tetangga, dibayar QRIS, bukan dibuang ke TPS Menteng.",
      name: "Ibu Sari Wulandari",
      role: "Pemilik Warung Juhu Kahayan (demo)",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop",
    },
    {
      quote:
        "SPPG memproduksi ribuan porsi. Absensi siswa selalu sisakan box. Prototipe ini mensimulasikan kelebihan sampai ke keluarga dalam radius 6 km — di lapangan menunggu izin Satgas MBG.",
      name: "Pak Bagus Hidayat",
      role: "Koordinator SPPG Bukit Tunggal (demo)",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop",
    },
  ];
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Cerita Mitra</p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold">
              Suara dari yang <span className="text-gradient">menyelamatkan</span>.
            </h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 120}>
              <figure className="glass-card rounded-3xl p-7 h-full flex flex-col hover-lift tilt-card relative">
                <Quote className="absolute top-5 right-5 w-10 h-10 text-primary/15" />
                <blockquote className="text-[15px] leading-relaxed text-foreground/90">
                  "{it.quote}"
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                  <img
                    src={it.img}
                    alt={it.name}
                    loading="lazy"
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-background shadow-soft"
                  />
                  <div>
                    <div className="font-semibold text-sm">{it.name}</div>
                    <div className="text-xs text-muted-foreground">{it.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Kenapa ini relevan untuk Tambun Bungai Ideathon?",
      a: "Subtema utama: QRIS & inklusi pangan. Hotel/UMKM menerima pembayaran digital untuk surplus murah; keluarga miskin dan penerima MBG mendapat kanal ambil yang jelas. Lintas pelindungan konsumen (lapor + 3-strike) dan bantuan gizi (sisa paket SPPG, uji coba fiktif).",
    },
    {
      q: "Kenapa fokus Kalimantan Tengah?",
      a: "BPS Maret 2026: 146.710 penduduk miskin (5,09%), garis kemiskinan Rp723.149 — 77% belanja makanan. SIPSN: 41,8% sampah Palangka Raya sisa makanan (±67 ton/hari). Stunting 22,1% (SSGI 2024). MBG 233.984 penerima / 107 SPPG (Agustus 2026) belum punya kanal digital untuk kelebihan porsi.",
    },
    {
      q: "Apakah SPPG sudah mitra resmi?",
      a: "Belum. Nama SPPG/hotel/warung di prototipe fiktif untuk uji coba. Penyaluran sisa MBG di dunia nyata membutuhkan izin Satgas MBG dan Dinkes — itu langkah 90 hari pertama, bukan klaim yang sudah terjadi.",
    },
    {
      q: "Apakah platform ini gratis untuk mitra?",
      a: "Ya. Pendaftaran dan distribusi tidak dipungut biaya. Porsi non-MBG dibatasi maksimal Rp10.000 agar tetap sosial, bukan marketplace margin.",
    },
    {
      q: "Bagaimana makanan diprioritaskan jika bukan AI?",
      a: "Skor aturan: min(100, 100 − menit×0,55) + 12 jika gratis. Listing yang hampir kedaluwarsa naik ke atas. Rumusnya terbuka di halaman beranda.",
    },
    {
      q: "Bagaimana jika jaringan di kabupaten terpencil lemah?",
      a: "Pilot fase 1 Palangka Raya (jaringan relatif stabil). Fase 2 Murung Raya/Seruyan: halaman hemat data, ambil dibantu petugas SPPG, dan cadangan SMS. Prototipe belum offline-first.",
    },
    {
      q: "Berapa lama waktu reservasi?",
      a: "Setiap reservasi terkunci selama 60 menit. Jika tidak diambil, stok kembali tersedia untuk pengguna lain — adil dan transparan.",
    },
    {
      q: "Bagaimana pembayaran makanan berbayar?",
      a: "Hotel, restoran, dan UMKM memakai Midtrans sandbox (QRIS, e-wallet, VA, atau kartu). Paket MBG tetap gratis tanpa checkout.",
    },
    {
      q: "Apa saja persyaratan jadi mitra?",
      a: "Mitra cukup melengkapi NPWP/NIB/SK Program (untuk MBG) lalu menunggu verifikasi singkat oleh tim admin PanganPeduli.",
    },
    {
      q: "Apakah ada dashboard untuk melihat dampak?",
      a: "Ya. Dashboard menampilkan porsi diselamatkan, estimasi CO₂, dan papan peringkat mitra uji coba Kalteng. Angka landing page memakai data BPS/SIPSN/BGN, bukan klaim live nasional.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">FAQ</p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold">
              Pertanyaan yang sering ditanyakan
            </h2>
            <p className="mt-3 text-muted-foreground">Belum menemukan jawaban? Hubungi tim mitra kami.</p>
          </div>
        </Reveal>
        <div className="space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 60}>
                <div
                  className={`glass-card rounded-2xl overflow-hidden transition-shadow ${isOpen ? "shadow-elegant" : ""}`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-accent/40 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-semibold">{it.q}</span>
                    <span className="shrink-0 grid place-items-center w-8 h-8 rounded-full bg-[image:var(--gradient-warm)] text-primary-foreground transition-transform duration-300" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-500"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{it.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <Partners />
        <ProblemFacts />
        <IndonesiaMapSection />
        <HowItWorks />
        <Categories />
        <PriorityScore />
        <Features />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}

