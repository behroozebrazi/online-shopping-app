"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { createOrder } from "@/lib/actions/order.actions";

function PlaceOrderForm() {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const response = await createOrder();
    if (response.redirect) router.push(response.redirect);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Button type="submit" className="w-full">
        Place order
      </Button>
    </form>
  );
}

export default PlaceOrderForm;
