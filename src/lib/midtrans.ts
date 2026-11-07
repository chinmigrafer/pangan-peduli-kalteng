import { createSnapToken } from "@/lib/api/midtrans.functions";
import { openLocalSnap, type CheckoutOutcome } from "@/components/midtrans-sandbox";
import { updateReservation, type PaymentStatus } from "@/lib/demo-data";

export type { CheckoutOutcome };

const SNAP_SANDBOX_SRC = "https://app.sandbox.midtrans.com/snap/snap.js";
const SNAP_PROD_SRC = "https://app.midtrans.com/snap/snap.js";

export function paymentLabel(status: PaymentStatus) {
  if (status === "paid") return "Lunas";
  if (status === "pending") return "Menunggu bayar";
  if (status === "failed") return "Gagal";
  if (status === "expired") return "Bayar kedaluwarsa";
  if (status === "free") return "Gratis";
  return "Belum bayar";
}

export function paymentTone(status: PaymentStatus) {
  if (status === "paid" || status === "free") return "bg-success/10 text-success";
  if (status === "pending") return "bg-amber-500/10 text-amber-700";
  if (status === "failed" || status === "expired") return "bg-destructive/10 text-destructive";
  return "bg-primary/10 text-primary";
}

export async function loadSnap(clientKey: string, sandbox = true) {
  if (typeof window === "undefined") return;
  if (window.snap) return;
  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-midtrans-snap]");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Gagal memuat Midtrans Snap")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = sandbox ? SNAP_SANDBOX_SRC : SNAP_PROD_SRC;
    script.setAttribute("data-client-key", clientKey);
    script.setAttribute("data-midtrans-snap", "true");
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Gagal memuat Midtrans Snap"));
    document.body.appendChild(script);
  });
}

export function makeOrderId(reservationId: string) {
  const compact = reservationId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 18);
  return `PP-${compact}-${Date.now().toString(36)}`.slice(0, 50);
}

async function completeLocalPay(input: {
  reservationId: string;
  listingTitle: string;
  price: number;
  portions: number;
  customerName: string;
  orderId: string;
}): Promise<CheckoutOutcome> {
  const outcome = await openLocalSnap({
    orderId: input.orderId,
    listingTitle: input.listingTitle,
    amount: input.price * input.portions,
    customerName: input.customerName,
  });
  if (outcome === "success") {
    updateReservation(input.reservationId, {
      paymentStatus: "paid",
      paymentOrderId: input.orderId,
      paymentMethod: "midtrans_sandbox",
      paymentPaidAt: Date.now(),
    });
  } else if (outcome === "pending") {
    updateReservation(input.reservationId, {
      paymentStatus: "pending",
      paymentOrderId: input.orderId,
      paymentMethod: "midtrans_sandbox",
    });
  }
  return outcome;
}

export async function startMidtransCheckout(input: {
  reservationId: string;
  listingId: string;
  listingTitle: string;
  price: number;
  portions: number;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
}): Promise<CheckoutOutcome> {
  const orderId = makeOrderId(input.reservationId);
  updateReservation(input.reservationId, {
    paymentOrderId: orderId,
    paymentStatus: "unpaid",
  });

  let snap: Awaited<ReturnType<typeof createSnapToken>> | null = null;
  try {
    snap = await createSnapToken({
      data: {
        orderId,
        listingId: input.listingId,
        listingTitle: input.listingTitle,
        price: input.price,
        portions: input.portions,
        customerName: input.customerName,
        customerEmail: input.customerEmail,
        customerPhone: input.customerPhone,
      },
    });
  } catch {
    snap = null;
  }

  if (!snap || snap.local || !snap.token) {
    return completeLocalPay({ ...input, orderId });
  }

  try {
    await loadSnap(snap.clientKey, snap.sandbox);
    if (!window.snap) return completeLocalPay({ ...input, orderId });
  } catch {
    return completeLocalPay({ ...input, orderId });
  }

  return new Promise((resolve) => {
    window.snap!.pay(snap.token, {
      onSuccess: (result) => {
        updateReservation(input.reservationId, {
          paymentStatus: "paid",
          paymentOrderId: result.order_id ?? snap.orderId,
          paymentMethod: result.payment_type,
          paymentPaidAt: Date.now(),
        });
        resolve("success");
      },
      onPending: (result) => {
        updateReservation(input.reservationId, {
          paymentStatus: "pending",
          paymentOrderId: result.order_id ?? snap.orderId,
          paymentMethod: result.payment_type,
        });
        resolve("pending");
      },
      onError: () => {
        updateReservation(input.reservationId, { paymentStatus: "failed" });
        resolve("error");
      },
      onClose: () => resolve("closed"),
    });
  });
}
