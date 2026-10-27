import { NextRequest, NextResponse } from "next/server";

import ZarinpalCheckout from "zarinpal-checkout";

import { prisma } from "@/lib/prisma";

// this is a code from a bank or a payment portal provider
const ZARINPAL_MERCHANT_ID = "TEST";

const zarinpal = ZarinpalCheckout.create(ZARINPAL_MERCHANT_ID, true);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const authority = searchParams.get("Authority");
    const status = searchParams.get("Status");
    const orderId = searchParams.get("orderId");

    if (!authority || !orderId) {
      return NextResponse.redirect("/payment-success?status=error");
    }

    const order = await prisma.order.findFirst({ where: { id: orderId } });

    if (!order) {
      return NextResponse.redirect("/payment-success?status=notfound");
    }

    if (status === "OK") {
      const result = await zarinpal.PaymentVerification({
        Amount: order.totalPrice,
        Authority: authority,
      });

      if (result.status === 100) {
        await prisma.order.update({
          where: { id: orderId },
          data: {
            isPaid: true,
            paidAt: new Date(),
            paymentResult: {
              refId: result.refId,
              authority: authority,
              status: result.status,
            },
          },
        });

        return NextResponse.redirect("/payment-success?status=ok");
      } else {
        return NextResponse.redirect("/payment-success?status=faild");
      }
    } else {
      return NextResponse.redirect("/payment-success?status=canceled");
    }
  } catch (error) {
    return NextResponse.redirect("/payment-success?status=error");
  }
}
