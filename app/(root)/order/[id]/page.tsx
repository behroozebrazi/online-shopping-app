import { Suspense } from "react";

import { notFound } from "next/navigation";

import { getOrderById } from "@/lib/actions/order.actions";

import OrderDetailsTable from "./orderDetailsTable";

import { type ShippingAddress } from "@/types";
import { type Order } from "@/types";

async function OrderDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const order = await getOrderById(id);

  if (!order) notFound();

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
