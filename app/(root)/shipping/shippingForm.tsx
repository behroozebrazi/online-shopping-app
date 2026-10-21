"use client";

import { useRouter } from "next/navigation";

import { shippingAddressSchema } from "@/lib/validators";

import { type ShippingAddress } from "@/types";

function ShippingForm({ address }: { address: ShippingAddress }) {
  const router = useRouter();

  return <div>Form</div>;
}

export default ShippingForm;
