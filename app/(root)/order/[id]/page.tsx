import { Suspense } from "react";
import { connection } from "next/server";

import { notFound } from "next/navigation";

import { auth } from "@/auth";

import { getOrderById } from "@/lib/actions/order.actions";

import OrderDetailsTable from "./orderDetailsTable";

import { type ShippingAddress } from "@/types";
import { type Order } from "@/types";

async function OrderDetails({ params }: { params: Promise<{ id: string }> }) {
  await connection();

  const { id } = await params;

  const order = await getOrderById(id);

  if (!order) notFound();

  const session = await auth();

  const isAdmin = session?.user?.role === "admin";

  return (
    <OrderDetailsTable
      order={{
        ...order,
        itemsPrice: order.itemsPrice.toString(),
        shippingPrice: order.shippingPrice.toString(),
        totalPrice: order.totalPrice.toString(),
        orderItems: order.orderItems.map((item) => ({
          ...item,
          price: item.price.toString(),
        })),
        user: {
          ...order.user,
          email: order.user.email || "",
        },
        shippingAddress: order.shippingAddress as ShippingAddress,
        paymentMethod: order.paymentMethod as Order["paymentMethod"],
        createAt: order.createdAt,
      }}
      isAdmin={isAdmin}
    />
  );
}

function OrderDetailsPage(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense
      fallback={<div className="animate-pulse h-64 rounded-md bg-muted" />}
    >
      <OrderDetails params={props.params} />
    </Suspense>
  );
}

export default OrderDetailsPage;
