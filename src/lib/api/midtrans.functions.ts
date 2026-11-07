import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getServerConfig } from "../config.server";

const snapInput = z.object({
  orderId: z.string().min(1).max(50),
  listingId: z.string().min(1),
  listingTitle: z.string().min(1).max(80),
  price: z.number().int().positive(),
  portions: z.number().int().positive(),
  customerName: z.string().min(1).max(80),
  customerEmail: z.string().email().optional(),
  customerPhone: z.string().optional(),
});

function basicAuth(serverKey: string) {
  return `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`;
}

function clip(value: string, max: number) {
  return value.length > max ? value.slice(0, max) : value;
}

export const createSnapToken = createServerFn({ method: "POST" })
  .inputValidator(snapInput)
  .handler(async ({ data }) => {
    const { midtrans } = getServerConfig();
    if (!midtrans.serverKey || !midtrans.clientKey) {
      return {
        token: "",
        redirectUrl: "",
        clientKey: "",
        orderId: data.orderId,
        sandbox: true,
        local: true,
      };
    }

    const grossAmount = data.price * data.portions;
    const payload = {
      transaction_details: {
        order_id: data.orderId,
        gross_amount: grossAmount,
      },
      credit_card: { secure: true },
      item_details: [
        {
          id: clip(data.listingId, 50),
          price: data.price,
          quantity: data.portions,
          name: clip(data.listingTitle, 50),
        },
      ],
      customer_details: {
        first_name: clip(data.customerName, 50),
        email: data.customerEmail || "penerima@panganpeduli.id",
        phone: (data.customerPhone ?? "").replace(/[^\d+]/g, "") || "081234567890",
      },
      callbacks: {
        finish: "/dashboard",
      },
      expiry: {
        unit: "minute",
        duration: 60,
      },
    };

    const response = await fetch(midtrans.snapUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: basicAuth(midtrans.serverKey),
      },
      body: JSON.stringify(payload),
    });

    const body = (await response.json()) as {
      token?: string;
      redirect_url?: string;
      error_messages?: string[];
      status_message?: string;
    };

    if (!response.ok || !body.token) {
      const detail = body.error_messages?.join(", ") || body.status_message || `HTTP ${response.status}`;
      throw new Error(`Gagal membuat token Midtrans: ${detail}`);
    }

    return {
      token: body.token,
      redirectUrl: body.redirect_url ?? "",
      clientKey: midtrans.clientKey,
      orderId: data.orderId,
      sandbox: !midtrans.isProduction,
      local: false,
    };
  });
