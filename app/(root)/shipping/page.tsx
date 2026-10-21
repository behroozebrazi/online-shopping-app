import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";

import ShippingForm from "./shippingForm";

import { type ShippingAddress } from "@/types";

async function ShippingPage() {
  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect("/");

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("No user id");

  const user = await getUserById(userId);

  return (
    <div>
      <ShippingForm address={user?.address as ShippingAddress} />
    </div>
  );
}

export default ShippingPage;
