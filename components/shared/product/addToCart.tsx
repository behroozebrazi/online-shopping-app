"use client";

import { useRouter } from "next/router";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { addItemToCart } from "@/lib/actions/cart.actions";

import { CartItem } from "@/types";

function AddToCart({ item }: { item: CartItem }) {
  const router = useRouter();

  async function addToCartHandler() {
    const response = await addItemToCart(item);
  }

  return (
    <Button onClick={addToCartHandler} type="button" className="w-full">
      Add to cart
    </Button>
  );
}

export default AddToCart;
