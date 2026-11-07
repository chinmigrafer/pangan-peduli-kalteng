// =====================================================
// FRONTEND-ONLY DEMO DATA (tanpa backend)
// =====================================================
import { useEffect, useState } from "react";

export type Category = "mbg" | "hotel" | "umkm" | "restoran";
export type Priority = "🔥 Prioritas Tinggi" | "⚡ Segera Diambil" | "🌟 Dampak Sosial Tinggi";

export type Partner = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  city: string;
  address: string;
  description: string;
  cover_url: string;
  verified: boolean;
  rating: number;
  total_rescued: number;
  lat: number;
  lng: number;
};

export type Listing = {
  id: string;
  partner_id: string;
  title: string;
  description: string;
  image_url: string;
  portions_total: number;
  price: number; // IDR. 0 = gratis (MBG)
  expires_in_min: number; // saat di-seed
  expires_at: string; // dihitung saat init
  pickup_address: string;
  category: Category;
  priority_label: Priority;
};

export const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  "Palangka Raya": { lat: -2.210, lng: 113.921 },
  Sampit: { lat: -2.539, lng: 112.950 },
  "Pangkalan Bun": { lat: -2.683, lng: 111.623 },
  "Kuala Kapuas": { lat: -3.010, lng: 114.388 },
  "Muara Teweh": { lat: -0.954, lng: 114.891 },
};

export const DEFAULT_CITY = "Palangka Raya";

export const PARTNERS: Partner[] = [
  // MBG — nama fiktif, lokasi nyata. 1 SPPG riil memproduksi ≥3.000 porsi/hari (radius 6 km).
  { id: "p-mbg-1", slug: "sppg-bukit-tunggal-palangka", name: "SPPG Bukit Tunggal Palangka", category: "mbg", city: "Palangka Raya", address: "Jl. G. Obos, Bukit Tunggal, Palangka Raya", description: "Dapur uji coba MBG di Jekan Raya. Menyalurkan kelebihan paket gizi harian dalam radius 6 km.", cover_url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800", verified: true, rating: 4.9, total_rescued: 420, lat: -2.207, lng: 113.901 },
  { id: "p-mbg-2", slug: "sppg-menteng-palangka", name: "SPPG Menteng Palangka", category: "mbg", city: "Palangka Raya", address: "Jl. Menteng, Palangka Raya", description: "Dapur MBG uji coba di kawasan Menteng. Paket sisa absensi siswa disalurkan sore hari.", cover_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800", verified: true, rating: 4.8, total_rescued: 310, lat: -2.216, lng: 113.931 },
  { id: "p-mbg-3", slug: "sppg-sampit-mentaya", name: "SPPG Sampit Mentaya", category: "mbg", city: "Sampit", address: "Jl. HM Arsyad, Sampit", description: "Dapur MBG uji coba Kotawaringin Timur — kabupaten dengan jumlah penduduk miskin tertinggi di Kalteng.", cover_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800", verified: true, rating: 4.7, total_rescued: 265, lat: -2.535, lng: 112.955 },

  // Hotel
  { id: "p-htl-1", slug: "hotel-kahayan-palangka", name: "Hotel Kahayan Palangka", category: "hotel", city: "Palangka Raya", address: "Jl. Tjilik Riwut Km. 1, Palangka Raya", description: "Hotel uji coba di tepi Kahayan dengan surplus breakfast & banquet harian.", cover_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", verified: true, rating: 4.8, total_rescued: 380, lat: -2.208, lng: 113.918 },
  { id: "p-htl-2", slug: "hotel-pasir-panjang", name: "Hotel Pasir Panjang Pangkalan Bun", category: "hotel", city: "Pangkalan Bun", address: "Jl. Pangeran Antasari, Pangkalan Bun", description: "Hotel gerbang Taman Nasional Tanjung Puting. Surplus prasmanan tamu wisata.", cover_url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800", verified: true, rating: 4.7, total_rescued: 240, lat: -2.685, lng: 111.628 },
  { id: "p-htl-3", slug: "hotel-mentaya-sampit", name: "Hotel Mentaya Sampit", category: "hotel", city: "Sampit", address: "Jl. Pelita, Sampit", description: "Hotel bisnis tepi Sungai Mentaya dengan donasi sisa room service.", cover_url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800", verified: true, rating: 4.6, total_rescued: 190, lat: -2.541, lng: 112.948 },

  // UMKM
  { id: "p-umkm-1", slug: "warung-juhu-kahayan", name: "Warung Juhu Kahayan", category: "umkm", city: "Palangka Raya", address: "Jl. Yos Sudarso, Pahandut, Palangka Raya", description: "Warung masakan Dayak. Menyalurkan sisa juhu singkah & nasi rames sore hari.", cover_url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800", verified: true, rating: 4.7, total_rescued: 165, lat: -2.213, lng: 113.928 },
  { id: "p-umkm-2", slug: "catering-betang-lestari", name: "Catering Betang Lestari", category: "umkm", city: "Palangka Raya", address: "Jl. Ahmad Yani, Palangka Raya", description: "Catering rumahan untuk acara kantor & keluarga. Kelebihan box disalurkan sore.", cover_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800", verified: true, rating: 4.8, total_rescued: 210, lat: -2.209, lng: 113.912 },
  { id: "p-umkm-3", slug: "warung-soto-palangka", name: "Warung Soto Palangka", category: "umkm", city: "Palangka Raya", address: "Jl. Java, Palangka Raya", description: "Soto Banjar & nasi kuning. Surplus tiap sore di kawasan kuliner Jalan Jawa.", cover_url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800", verified: false, rating: 4.5, total_rescued: 95, lat: -2.218, lng: 113.915 },

  // Restoran
  { id: "p-rst-1", slug: "resto-ikan-patin-kahayan", name: "Restoran Ikan Patin Kahayan", category: "restoran", city: "Palangka Raya", address: "Jl. RTA Milono, Palangka Raya", description: "Restoran ikan patin bakar & pais. Donasi menu akhir hari ke penerima terdekat.", cover_url: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800", verified: true, rating: 4.7, total_rescued: 280, lat: -2.221, lng: 113.920 },
  { id: "p-rst-2", slug: "kopi-jalan-jawa", name: "Kopi Jalan Jawa Palangka", category: "restoran", city: "Palangka Raya", address: "Jl. Java No. 12, Palangka Raya", description: "Kedai kopi lokal. Mendonasikan roti kukus & pastry sisa sore.", cover_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800", verified: true, rating: 4.6, total_rescued: 140, lat: -2.217, lng: 113.914 },
  { id: "p-rst-3", slug: "rumah-makan-dayak-rungan", name: "Rumah Makan Dayak Rungan", category: "restoran", city: "Palangka Raya", address: "Jl. Tjilik Riwut Km. 4, Palangka Raya", description: "Masakan Dayak Ngaju. Surplus juhu mandai & kalumpe setiap malam.", cover_url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800", verified: true, rating: 4.6, total_rescued: 155, lat: -2.198, lng: 113.905 },
  { id: "p-rst-4", slug: "cafe-tepi-rungan", name: "Cafe Tepi Rungan", category: "restoran", city: "Palangka Raya", address: "Jl. Danau Raya, Palangka Raya", description: "Cafe tepi danau. Surplus sandwich & kue untuk pengambilan sore.", cover_url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800", verified: true, rating: 4.5, total_rescued: 120, lat: -2.225, lng: 113.895 },
  { id: "p-rst-5", slug: "resto-keluarga-sampit", name: "Resto Keluarga Sampit", category: "restoran", city: "Sampit", address: "Jl. HM Arsyad No. 45, Sampit", description: "Restoran keluarga tepi Mentaya dengan paket prasmanan harian.", cover_url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800", verified: false, rating: 4.4, total_rescued: 88, lat: -2.537, lng: 112.960 },
];

const img = {
  nasiBox: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800",
  pastry: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
  mbg: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
  sate: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800",
  nasiGoreng: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
  bakso: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800",
  bento: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
  ayam: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800",
};

// Catatan: harga selain MBG max Rp 10.000
const SEED: Omit<Listing, "expires_at">[] = [
  // MBG (gratis) — sisa paket karena absensi siswa, skenario nyata SPPG
  { id: "l-1", partner_id: "p-mbg-1", title: "Paket MBG Sisa Absensi (Nasi + Sayur + Ayam)", description: "Kelebihan porsi karena siswa tidak hadir. Masih hangat, ambil di dapur Bukit Tunggal.", image_url: img.mbg, portions_total: 20, price: 0, expires_in_min: 55, pickup_address: "Jl. G. Obos, Bukit Tunggal, Palangka Raya", category: "mbg", priority_label: "🔥 Prioritas Tinggi" },
  { id: "l-2", partner_id: "p-mbg-2", title: "Nasi Box MBG Menteng (Telur Balado)", description: "Sisa distribusi MBG hari ini. Higienis, radius 6 km dari SPPG Menteng.", image_url: img.nasiBox, portions_total: 15, price: 0, expires_in_min: 90, pickup_address: "Jl. Menteng, Palangka Raya", category: "mbg", priority_label: "⚡ Segera Diambil" },
  { id: "l-3", partner_id: "p-mbg-3", title: "Paket Gizi MBG Sampit", description: "Sisa dapur SPPG Mentaya. Gratis untuk keluarga di sekitar Sampit.", image_url: img.pastry, portions_total: 24, price: 0, expires_in_min: 180, pickup_address: "Jl. HM Arsyad, Sampit", category: "mbg", priority_label: "🌟 Dampak Sosial Tinggi" },

  // Hotel (max 10.000)
  { id: "l-4", partner_id: "p-htl-1", title: "Nasi Box Ayam Banquet Kahayan", description: "Sisa banquet hotel di Jl. Tjilik Riwut. Kemasan rapi, masih layak.", image_url: img.ayam, portions_total: 25, price: 8000, expires_in_min: 45, pickup_address: "Jl. Tjilik Riwut Km. 1, Palangka Raya", category: "hotel", priority_label: "🔥 Prioritas Tinggi" },
  { id: "l-5", partner_id: "p-htl-1", title: "Roti & Pastry Breakfast", description: "Pastry sisa prasmanan sarapan Hotel Kahayan.", image_url: img.pastry, portions_total: 40, price: 5000, expires_in_min: 120, pickup_address: "Jl. Tjilik Riwut Km. 1, Palangka Raya", category: "hotel", priority_label: "⚡ Segera Diambil" },
  { id: "l-6", partner_id: "p-htl-2", title: "Nasi Campur Tamu Wisata", description: "Surplus prasmanan tamu Tanjung Puting di Pangkalan Bun.", image_url: img.nasiBox, portions_total: 18, price: 10000, expires_in_min: 60, pickup_address: "Jl. Pangeran Antasari, Pangkalan Bun", category: "hotel", priority_label: "🔥 Prioritas Tinggi" },
  { id: "l-7", partner_id: "p-htl-3", title: "Nasi Box Hotel Mentaya", description: "Sisa room service hotel bisnis Sampit.", image_url: img.bento, portions_total: 12, price: 9000, expires_in_min: 150, pickup_address: "Jl. Pelita, Sampit", category: "hotel", priority_label: "🌟 Dampak Sosial Tinggi" },

  // UMKM (max 10.000)
  { id: "l-8", partner_id: "p-umkm-1", title: "Nasi Rames + Juhu Singkah", description: "Nasi + lauk Dayak sisa warung sore di Pahandut.", image_url: img.nasiBox, portions_total: 10, price: 7000, expires_in_min: 75, pickup_address: "Jl. Yos Sudarso, Pahandut, Palangka Raya", category: "umkm", priority_label: "⚡ Segera Diambil" },
  { id: "l-9", partner_id: "p-umkm-2", title: "Catering Box Sisa Acara Kantor", description: "Box catering sisa rapat dinas / acara keluarga Palangka.", image_url: img.bento, portions_total: 22, price: 6500, expires_in_min: 100, pickup_address: "Jl. Ahmad Yani, Palangka Raya", category: "umkm", priority_label: "⚡ Segera Diambil" },
  { id: "l-10", partner_id: "p-umkm-3", title: "Soto Banjar Sisa Sore", description: "Soto kuah hangat sisa Warung Soto Palangka, Jalan Jawa.", image_url: img.bakso, portions_total: 8, price: 8000, expires_in_min: 50, pickup_address: "Jl. Java, Palangka Raya", category: "umkm", priority_label: "🔥 Prioritas Tinggi" },

  // Restoran (max 10.000)
  { id: "l-11", partner_id: "p-rst-1", title: "Ikan Patin Bakar Akhir Hari", description: "Patin bakar sisa stok restoran tepi Kahayan.", image_url: img.sate, portions_total: 14, price: 10000, expires_in_min: 40, pickup_address: "Jl. RTA Milono, Palangka Raya", category: "restoran", priority_label: "🔥 Prioritas Tinggi" },
  { id: "l-12", partner_id: "p-rst-2", title: "Roti Kukus & Pastry Kedai", description: "Roti kukus sisa sore Kopi Jalan Jawa.", image_url: img.pastry, portions_total: 18, price: 5000, expires_in_min: 90, pickup_address: "Jl. Java No. 12, Palangka Raya", category: "restoran", priority_label: "⚡ Segera Diambil" },
  { id: "l-13", partner_id: "p-rst-3", title: "Nasi + Kalumpe Sisa Dapur", description: "Masakan Dayak sisa Rumah Makan Rungan.", image_url: img.nasiGoreng, portions_total: 16, price: 9000, expires_in_min: 130, pickup_address: "Jl. Tjilik Riwut Km. 4, Palangka Raya", category: "restoran", priority_label: "🌟 Dampak Sosial Tinggi" },
];

// Compute expires_at saat module load
const SEED_BOOTSTRAPPED_AT = Date.now();
export const LISTINGS: Listing[] = SEED.map((l) => ({ ...l, expires_at: new Date(SEED_BOOTSTRAPPED_AT + l.expires_in_min * 60000).toISOString() }));

// =====================================================
// CLIENT-SIDE STORE
// =====================================================
const RES_KEY = "panganpeduli_reservations_v2";
const PORT_KEY = "panganpeduli_portions_v2";
const USER_LIST_KEY = "panganpeduli_user_listings_v2";

const listeners = new Set<() => void>();
function emit() { listeners.forEach((l) => l()); }

export function useDemoStore() {
  const [, set] = useState(0);
  useEffect(() => {
    const l = () => set((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
}

/** Re-render setiap detik untuk countdown real-time. */
export function useTick(ms = 1000) {
  const [, set] = useState(0);
  useEffect(() => {
    const i = setInterval(() => set((n) => n + 1), ms);
    return () => clearInterval(i);
  }, [ms]);
}

function readLS<T>(k: string, fallback: T): T {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : fallback; } catch { return fallback; }
}
function writeLS(k: string, v: unknown) {
  try { localStorage.setItem(k, JSON.stringify(v)); emit(); } catch {}
}

export type PaymentStatus = "unpaid" | "pending" | "paid" | "failed" | "expired" | "free";

export type Reservation = {
  id: string;
  listingId: string;
  listingTitle: string;
  partnerId: string;
  partnerName: string;
  image: string;
  pickupAddress: string;
  priority: Priority;
  price: number;
  userId: string;
  userName: string;
  userEmail?: string;
  userPhone?: string;
  portions: number;
  createdAt: number;
  expiresAt: number;
  status: "active" | "picked_up" | "cancelled" | "expired";
  paymentStatus: PaymentStatus;
  paymentOrderId?: string;
  paymentMethod?: string;
  paymentPaidAt?: number;
  /** Penjual mengklaim sudah diambil — menunggu konfirmasi pembeli. */
  sellerClaim?: { at: number; note?: string } | null;
};

export function getPaymentStatus(r: Reservation): PaymentStatus {
  if (r.paymentStatus) return r.paymentStatus;
  return r.price <= 0 ? "free" : "unpaid";
}

export function isPaymentComplete(r: Reservation) {
  const status = getPaymentStatus(r);
  return status === "paid" || status === "free";
}

export function getReservations(): Reservation[] {
  if (typeof window === "undefined") return [];
  return readLS<Reservation[]>(RES_KEY, []);
}

export function reserveListing(listing: Listing, partner: Partner | undefined, user: { id: string; name: string; email?: string; phone?: string }, portions: number) {
  const remaining = getRemaining(listing.id);
  if (portions < 1) return { ok: false as const, error: "Jumlah porsi tidak valid" };
  if (portions > remaining) return { ok: false as const, error: `Hanya tersisa ${remaining} porsi` };
  const now = Date.now();
  const r: Reservation = {
    id: crypto.randomUUID(),
    listingId: listing.id,
    listingTitle: listing.title,
    partnerId: listing.partner_id,
    partnerName: partner?.name ?? listing.pickup_address.split(",")[0]?.trim() ?? "Mitra PanganPeduli",
    image: listing.image_url,
    pickupAddress: listing.pickup_address,
    priority: listing.priority_label,
    price: listing.price,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    userPhone: user.phone,
    portions,
    createdAt: now,
    expiresAt: now + 60 * 60 * 1000,
    status: "active",
    paymentStatus: listing.price <= 0 ? "free" : "unpaid",
  };
  writeLS(RES_KEY, [r, ...getReservations()]);
  setRemaining(listing.id, remaining - portions);
  return { ok: true as const, reservation: r };
}

export function updateReservation(id: string, patch: Partial<Reservation>) {
  const next = getReservations().map((r) => (r.id === id ? { ...r, ...patch } : r));
  writeLS(RES_KEY, next);
}

export function cancelReservation(id: string) {
  const r = getReservations().find((x) => x.id === id);
  if (!r) return;
  if (r.status === "active") {
    // kembalikan porsi
    setRemaining(r.listingId, getRemaining(r.listingId) + r.portions);
  }
  updateReservation(id, { status: "cancelled", sellerClaim: null });
}

/**
 * Penjual mengkonfirmasi pengambilan FINAL. Hanya penjual yang berhak mengubah
 * status ke "picked_up" — pembeli TIDAK punya tombol konfirmasi agar tidak ada
 * yang iseng mengurangi stok tanpa benar-benar mengambil.
 * Stok sudah berkurang sejak reservasi dibuat, jadi di sini hanya finalisasi.
 */
export function sellerConfirmPickup(id: string): { ok: boolean; error?: string } {
  const r = getReservations().find((x) => x.id === id);
  if (!r) return { ok: false, error: "Reservasi tidak ditemukan" };
  if (r.status !== "active") return { ok: false, error: "Reservasi tidak aktif" };
  if (!isPaymentComplete(r)) return { ok: false, error: "Pembeli belum menyelesaikan pembayaran Midtrans" };
  updateReservation(id, { status: "picked_up", sellerClaim: null });
  return { ok: true };
}

/** Alias lama — sekarang langsung finalisasi. */
export const sellerClaimPickup = sellerConfirmPickup;
export function buyerAcceptSellerClaim(_id: string) { /* deprecated: otoritas di penjual */ }
export function buyerRejectSellerClaim(_id: string) { /* deprecated: otoritas di penjual */ }

/**
 * Penjual menandai pembeli "tidak hadir / bermasalah".
 * Status -> expired DAN stok dikembalikan. Penjual adalah satu-satunya pihak
 * yang menentukan stok berkurang atau dikembalikan.
 */
export function sellerMarkProblem(id: string): { ok: boolean; error?: string } {
  const r = getReservations().find((x) => x.id === id);
  if (!r) return { ok: false, error: "Reservasi tidak ditemukan" };
  if (r.status !== "active") return { ok: false, error: "Reservasi tidak aktif" };
  setRemaining(r.listingId, getRemaining(r.listingId) + r.portions);
  updateReservation(id, { status: "expired", sellerClaim: null });
  return { ok: true };
}

export function getRemaining(listingId: string): number {
  if (typeof window === "undefined") {
    const l = getAllListings().find((x) => x.id === listingId);
    return l?.portions_total ?? 0;
  }
  const map = readLS<Record<string, number>>(PORT_KEY, {});
  if (listingId in map) return map[listingId];
  const l = getAllListings().find((x) => x.id === listingId);
  return l?.portions_total ?? 0;
}

function setRemaining(listingId: string, n: number) {
  const map = readLS<Record<string, number>>(PORT_KEY, {});
  map[listingId] = Math.max(0, n);
  writeLS(PORT_KEY, map);
}

// User listings (donor upload)
export function getUserListings(): Listing[] {
  if (typeof window === "undefined") return [];
  return readLS<Listing[]>(USER_LIST_KEY, []);
}
export function addUserListing(l: Listing) {
  writeLS(USER_LIST_KEY, [l, ...getUserListings()]);
}
export function removeUserListing(id: string) {
  writeLS(USER_LIST_KEY, getUserListings().filter((l) => l.id !== id));
}

export function getAllListings(): Listing[] {
  return [...getUserListings(), ...LISTINGS];
}
export function getListingById(id: string): Listing | undefined {
  return getAllListings().find((l) => l.id === id);
}
export function getPartnerById(id: string): Partner | undefined {
  return PARTNERS.find((p) => p.id === id);
}
/** Listing unggahan donor memakai id akun (hotel-1) atau nama di alamat jemput. */
export function resolvePartner(listing: Listing): Partner | undefined {
  const byId = getPartnerById(listing.partner_id);
  if (byId) return byId;
  const addr = listing.pickup_address.toLowerCase();
  return PARTNERS.find((p) => addr.includes(p.name.toLowerCase()));
}
export function getPartnerBySlug(slug: string): Partner | undefined {
  return PARTNERS.find((p) => p.slug === slug);
}

// Haversine (km)
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

export function formatIDR(n: number): string {
  if (n <= 0) return "Gratis";
  return "Rp " + n.toLocaleString("id-ID");
}
