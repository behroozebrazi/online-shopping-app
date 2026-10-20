"use client";

import { useRouter } from "next/router";
import { Plus, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";

import { CartItem, Cart } from "@/types";

function AddToCart({ item, cart }: { item: CartItem; cart?: Cart }) {
  const router = useRouter();

  async function addToCartHandler() {
    const response = await addItemToCart(item);
  }

  async function removeFromCartHandler() {
    const response = await removeItemFromCart(item.productId);
  }

  const existItem =
    cart && cart.items.find((p) => p.productId === item.productId);

  return existItem ? (
    <div>
      <Button onClick={removeFromCartHandler} type="button" variant="outline">
        <Minus className="w-4 h-4" />
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button onClick={addToCartHandler} type="button" variant="outline">
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  ) : (
    <Button onClick={addToCartHandler} type="button" className="w-full">
      Add to cart
    </Button>
  );
}

export default AddToCart;
