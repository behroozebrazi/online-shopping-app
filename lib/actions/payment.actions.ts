"use server";

import ZarinpalCheckout from "zarinpal-checkout";

import { prisma } from "@/lib/prisma";

import { getOrderById } from "./order.actions";

// this is a code from a bank or a payment portal provider
const ZARINPAL_MERCHANT_ID = "TEST";

const ZARINPAL_CALLBACK_URL = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/verify`
  : "http://localhost:3000/api/payment/verify";

const zarinpal = ZarinpalCheckout.create(ZARINPAL_MERCHANT_ID, true);

export async function requestZarinpalPayment(
  orderId: string,
  userEmail?: string,
) {
  try {
    const order = await getOrderById(orderId);

    if (!order) {
      return { success: false, message: "Order not found." };
    }

    const amount = order.totalPrice;

    const description = `Payment for order ${order.id}`;

    const email = userEmail || order.user?.email || "";

    const mobile = "";

    const response = await zarinpal.PaymentRequest({
      Amount: amount,
      CallbackURL: ZARINPAL_CALLBACK_URL + `?orderIDd=${order.id}`,
      Description: description,
      Email: email,
      Mobile: mobile,
    });

    if (response.status === 100 && response.url) {
      return { success: true, message: response.url };
    } else {
      return {
        success: false,
        message: response || "Error on bank connection.",
      };
    }
  } catch (error) {
    return { success: false, message: error };
  }
}
