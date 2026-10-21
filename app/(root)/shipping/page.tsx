import { connection } from "next/server";

import { Suspense } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { shippingAddressSchema } from "@/lib/validators";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";

import type { ShippingAddress } from "@/types";

import ShippingForm from "./shippingForm";

const emptyAddress: ShippingAddress = {
  fullName: "",
  streetAddress: "",
  city: "",
  state: "",
  postalCode: "",
};

export default function ShippingPage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <ShippingContent />
    </Suspense>
  );
}

async function ShippingContent() {
  await connection();

  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect("/cart");

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/sign-in"); // redirect instead of throwing

  const user = await getUserById(userId);

  const parsed = shippingAddressSchema.safeParse(user.address);
  const address = parsed.success ? parsed.data : emptyAddress;

  return <ShippingForm address={address} />;
}
