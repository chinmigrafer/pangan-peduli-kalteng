import { useEffect, useMemo, useState } from "react";
import { CreditCard, Loader2, QrCode, ShieldCheck, Smartphone, University, X } from "lucide-react";
import { formatIDR } from "@/lib/demo-data";
import { ConsumerSafetyBanner } from "@/components/consumer-safety-banner";

export type CheckoutOutcome = "success" | "pending" | "error" | "closed";

type Method = "qris" | "gopay" | "va" | "card";

type Payload = {
  orderId: string;
  listingTitle: string;
  amount: number;
  customerName: string;
  resolve: (outcome: CheckoutOutcome) => void;
};

const TEST_CARD = "4811111111111114";
const TEST_CVV = "123";
const TEST_OTP = "112233";

function digits(value: string) {
  return value.replace(/\D/g, "");
}

export function openLocalSnap(input: Omit<Payload, "resolve">): Promise<CheckoutOutcome> {
  return new Promise((resolve) => {
    window.dispatchEvent(new CustomEvent("pp-midtrans-open", { detail: { ...input, resolve } }));
  });
}

export function MidtransSandboxHost() {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [method, setMethod] = useState<Method>("qris");
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState<"pay" | "otp" | "done">("pay");
  const [card, setCard] = useState("4811 1111 1111 1114");
  const [exp, setExp] = useState("12/28");
  const [cvv, setCvv] = useState("123");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<Payload>).detail;
      setPayload(detail);
      setMethod("qris");
      setBusy(false);
      setStep("pay");
      setCard("4811 1111 1111 1114");
      setExp("12/28");
      setCvv("123");
      setOtp("");
      setError("");
    };
    window.addEventListener("pp-midtrans-open", onOpen);
    return () => window.removeEventListener("pp-midtrans-open", onOpen);
  }, []);

  const vaNumber = useMemo(() => {
    if (!payload) return "";
    return `70012${payload.orderId.replace(/\D/g, "").slice(-8).padStart(8, "8")}`;
  }, [payload]);

  if (!payload) return null;

  const finish = (outcome: CheckoutOutcome, paymentMethod?: string) => {
    payload.resolve(outcome);
    if (paymentMethod && outcome === "success") {
      /* reservation update handled by caller after promise resolves */
    }
    setPayload(null);
  };

  const close = () => finish("closed");

  const payNow = async (selected: Method) => {
    setError("");
    if (selected === "card") {
      if (digits(card) !== TEST_CARD) {
        setError("Gunakan kartu tes sandbox 4811 1111 1111 1114");
        return;
      }
      if (digits(cvv) !== TEST_CVV) {
        setError("CVV tes sandbox: 123");
        return;
      }
      setStep("otp");
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 900));
    setBusy(false);
    setStep("done");
    setTimeout(() => finish("success"), 700);
  };

  const confirmOtp = async () => {
    if (otp.trim() !== TEST_OTP) {
      setError("OTP tes sandbox: 112233");
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 700));
    setBusy(false);
    setStep("done");
    setTimeout(() => finish("success"), 700);
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/55 p-4" role="dialog" aria-modal="true" aria-label="Midtrans Snap Sandbox">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white text-zinc-900 shadow-2xl">
        <div className="flex items-center justify-between bg-[#11264b] px-4 py-3 text-white">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-sky-200">Midtrans Snap</div>
            <div className="text-sm font-semibold">Sandbox · PanganPeduli</div>
          </div>
          <button type="button" onClick={close} className="rounded-lg p-1.5 hover:bg-white/10" aria-label="Tutup">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-zinc-100 px-4 py-3">
          <div className="text-xs text-zinc-500">{payload.listingTitle}</div>
          <div className="mt-1 font-display text-2xl font-bold">{formatIDR(payload.amount)}</div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" /> Mode sandbox — tidak ada uang sungguhan
          </div>
          <div className="mt-3">
            <ConsumerSafetyBanner compact />
          </div>
        </div>

        {step === "done" ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-700">✓</div>
            <div className="font-semibold">Pembayaran berhasil</div>
            <p className="mt-1 text-sm text-zinc-500">Reservasi dikonfirmasi. Timer pengambilan 60 menit dimulai.</p>
          </div>
        ) : step === "otp" ? (
          <div className="space-y-3 p-4">
            <ConsumerSafetyBanner compact />
            <p className="text-sm text-zinc-600">Masukkan OTP 3DS <strong>sandbox</strong> (112233) di layar Midtrans ini saja — bukan OTP SMS bank Anda.</p>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="112233"
              className="w-full rounded-xl border border-zinc-200 px-3 py-2 font-mono text-lg tracking-[0.4em]"
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button type="button" onClick={confirmOtp} disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a72dd] py-3 text-sm font-semibold text-white disabled:opacity-60">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Konfirmasi OTP
            </button>
          </div>
        ) : (
          <div className="p-4">
            <div className="mb-3 grid grid-cols-4 gap-2">
              <MethodBtn active={method === "qris"} onClick={() => setMethod("qris")} icon={QrCode} label="QRIS" />
              <MethodBtn active={method === "gopay"} onClick={() => setMethod("gopay")} icon={Smartphone} label="GoPay" />
              <MethodBtn active={method === "va"} onClick={() => setMethod("va")} icon={University} label="VA" />
              <MethodBtn active={method === "card"} onClick={() => setMethod("card")} icon={CreditCard} label="Kartu" />
            </div>

            {method === "qris" && (
              <div className="rounded-xl border border-zinc-200 p-4 text-center">
                <div className="mx-auto grid h-36 w-36 place-items-center rounded-lg bg-[repeating-linear-gradient(90deg,#111_0_8px,#fff_8px_16px),repeating-linear-gradient(0deg,#111_0_8px,#fff_8px_16px)] bg-[length:36px_36px]">
                  <div className="grid h-20 w-20 place-items-center rounded bg-white text-[10px] font-bold text-[#11264b]">QRIS<br />SANDBOX</div>
                </div>
                <p className="mt-3 text-xs text-zinc-500">Scan QR tes, atau tekan bayar untuk simulasi berhasil.</p>
              </div>
            )}

            {method === "gopay" && (
              <div className="rounded-xl border border-zinc-200 p-4 text-sm text-zinc-600">
                Pembayaran GoPay sandbox akan dikonfirmasi otomatis. Tidak perlu aplikasi Gojek.
              </div>
            )}

            {method === "va" && (
              <div className="rounded-xl border border-zinc-200 p-4">
                <div className="text-xs text-zinc-500">Nomor VA BCA Sandbox</div>
                <div className="mt-1 font-mono text-lg font-semibold tracking-wide">{vaNumber}</div>
                <p className="mt-2 text-xs text-zinc-500">Tekan bayar untuk menandai transfer VA berhasil.</p>
              </div>
            )}

            {method === "card" && (
              <div className="space-y-2">
                <input value={card} onChange={(e) => setCard(e.target.value)} className="w-full rounded-xl border border-zinc-200 px-3 py-2 font-mono text-sm" placeholder="Nomor kartu" />
                <div className="grid grid-cols-2 gap-2">
                  <input value={exp} onChange={(e) => setExp(e.target.value)} className="rounded-xl border border-zinc-200 px-3 py-2 text-sm" placeholder="MM/YY" />
                  <input value={cvv} onChange={(e) => setCvv(e.target.value)} className="rounded-xl border border-zinc-200 px-3 py-2 text-sm" placeholder="CVV" />
                </div>
                <p className="text-[11px] text-zinc-500">Kartu tes: 4811 1111 1111 1114 · CVV 123 · OTP 112233</p>
              </div>
            )}

            {error && <p className="mt-2 text-xs text-red-600">{error}</p>}

            <button
              type="button"
              onClick={() => payNow(method)}
              disabled={busy}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a72dd] py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Bayar {formatIDR(payload.amount)}
            </button>
            <p className="mt-2 text-center text-[10px] text-zinc-400">Order {payload.orderId} · {payload.customerName}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MethodBtn({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof QrCode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-1 py-2 text-[10px] font-semibold ${active ? "border-[#1a72dd] bg-sky-50 text-[#1a72dd]" : "border-zinc-200 text-zinc-600"}`}
    >
      <Icon className="mx-auto mb-1 h-4 w-4" />
      {label}
    </button>
  );
}
