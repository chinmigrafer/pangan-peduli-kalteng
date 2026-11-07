export const CATEGORY_LABEL: Record<string, string> = {
  mbg: "Program MBG",
  hotel: "Hotel",
  umkm: "UMKM & Warung",
  restoran: "Restoran & Cafe",
};

export const CATEGORY_DESC: Record<string, string> = {
  mbg: "Dapur SPPG uji coba Program Makan Bergizi Gratis di Kalimantan Tengah",
  hotel: "Hotel Palangka Raya, Sampit, dan Pangkalan Bun dengan surplus harian",
  umkm: "Warung & catering lokal Kalteng — juhu, soto, nasi rames",
  restoran: "Restoran & kedai kopi Palangka Raya serta Sampit",
};

export function priorityFromScore(score: number): string {
  if (score >= 85) return "🔥 Prioritas Tinggi";
  if (score >= 70) return "⚡ Segera Diambil";
  return "🌟 Dampak Sosial Tinggi";
}

/** Aturan transparan, bukan model AI: makin dekat kedaluwarsa, makin tinggi. Paket gratis (MBG) +12. */
export function priorityScore(expiresAtIso: string, price: number): number {
  const mins = minutesUntil(expiresAtIso);
  const time = Math.max(0, Math.min(100, Math.round(100 - mins * 0.55)));
  const social = price <= 0 ? 12 : 0;
  return Math.min(100, time + social);
}

export function minutesUntil(iso: string): number {
  return Math.max(0, Math.floor((new Date(iso).getTime() - Date.now()) / 60000));
}

export function formatCountdown(iso: string): string {
  const ms = new Date(iso).getTime() - Date.now();
  if (ms <= 0) return "Kedaluwarsa";
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const h = Math.floor(m / 60);
  if (h > 0) return `${h}j ${m % 60}m`;
  return `${m}m ${String(s).padStart(2, "0")}s`;
}

/** Masking tampilan — bukan enkripsi. Mitra hanya butuh menghubungi, bukan menyimpan nomor penuh di layar. */
export function maskPhone(raw?: string | null): string {
  if (!raw || !raw.trim()) return "Belum tersedia";
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 6) return "••••";
  const head = digits.slice(0, 4);
  const tail = digits.slice(-3);
  return `${head}-••••-${tail}`;
}
