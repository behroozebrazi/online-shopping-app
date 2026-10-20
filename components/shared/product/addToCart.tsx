"use client";

import { useRouter } from "next/router";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CartItem } from "@/types";

function AddToCart({ item }: { item: CartItem }) {
  const router = useRouter();

  async function addToCartHandler() {}

  return (
    <Button onClick={addToCartHandler} type="button" className="w-full">
      Add to cart
    </Button>
  );
}

export default AddToCart;
