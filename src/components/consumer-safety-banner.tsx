import { ShieldAlert } from "lucide-react";

/** Edukasi pelindungan konsumen (subtema TOR) — bukan klaim enkripsi. */
export function ConsumerSafetyBanner({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-100 ${
        compact ? "p-2.5 text-[10px]" : "p-3 text-[11px]"
      } leading-relaxed flex gap-2`}
      role="note"
    >
      <ShieldAlert className={`${compact ? "w-3.5 h-3.5" : "w-4 h-4"} shrink-0 mt-0.5 text-amber-600`} />
      <div>
        <p className="font-semibold">Jangan bagikan OTP, PIN, atau kata sandi</p>
        <p className={compact ? "mt-0.5 opacity-90" : "mt-1 opacity-90"}>
          Admin PanganPeduli, mitra hotel, atau pihak lain tidak pernah meminta kode OTP.
          Pembayaran sensitif hanya lewat layar Midtrans. OTP sandbox kartu tes ≠ OTP rekening asli Anda.
        </p>
      </div>
    </div>
  );
}
