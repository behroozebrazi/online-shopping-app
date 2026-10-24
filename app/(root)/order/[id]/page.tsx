import { notFound } from "next/navigation";

import { getOrderById } from "@/lib/actions/order.actions";

async function OrderDetailsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const order = await getOrderById(id);

  if (!order) notFound();

  return <div>{order.totalPrice}</div>;
}

export default OrderDetailsPage;
