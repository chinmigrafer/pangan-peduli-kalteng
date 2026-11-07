import { CreditCard, QrCode, ShieldCheck, Smartphone, University } from "lucide-react";
import { formatIDR } from "@/lib/demo-data";
import { ConsumerSafetyBanner } from "@/components/consumer-safety-banner";

const METHODS = [
  { icon: QrCode, label: "QRIS" },
  { icon: Smartphone, label: "GoPay / ShopeePay" },
  { icon: University, label: "VA Bank" },
  { icon: CreditCard, label: "Kartu" },
];

export function PaymentPanel({
  unitPrice,
  portions,
}: {
  unitPrice: number;
  portions: number;
}) {
  const total = unitPrice * portions;
  if (total <= 0) {
    return (
      <div className="space-y-2">
        <div className="rounded-xl border border-success/30 bg-success/10 p-3 text-xs text-success">
          Program MBG — pengambilan gratis, tanpa pembayaran.
        </div>
        <ConsumerSafetyBanner compact />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-3 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary">
          <ShieldCheck className="w-3.5 h-3.5" /> Midtrans Sandbox
        </div>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">QRIS · e-wallet · VA · kartu</span>
      </div>
      <ConsumerSafetyBanner compact />
      <div className="grid grid-cols-2 gap-1.5">
        {METHODS.map((m) => (
          <div key={m.label} className="flex items-center gap-1.5 rounded-lg bg-background px-2 py-1.5 text-[11px] font-medium">
            <m.icon className="w-3.5 h-3.5 text-primary" /> {m.label}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{portions} porsi × {formatIDR(unitPrice)}</span>
        <span className="font-display font-bold">{formatIDR(total)}</span>
      </div>
      <p className="text-[10px] text-muted-foreground leading-relaxed">
        Sandbox tanpa kunci merchant. Kartu tes Midtrans: <span className="font-mono">4811 1111 1111 1114</span> · CVV 123 · OTP sandbox 112233 (hanya di layar resmi Midtrans).
      </p>
    </div>
  );
}
