"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { ShoppingCart, ArrowRight, Plus, Minus } from "lucide-react";

import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";

import { type Cart } from "@/types";

function CartTable({ cart }: { cart?: Cart }) {
  const router = useRouter();

  const cartItems =
    cart && cart.items.length > 0 ? (
      <div className="grid grid-cols-4 gap-5">
        <div className="overflow-x-auto col-span-3">Table</div>
      </div>
    ) : (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <div className="rounded-full bg-gray-100 p-6">
          <ShoppingCart className="h-10 w-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="max-w-sm text-gray-500">
          Browse our products and add something you love.
        </p>
        <Link href="/" className="hover:opacity-80">
          Continue shopping
        </Link>
      </div>
    );

  return (
    <>
      <h1 className="py-4 font-bold">{cartItems}</h1>
    </>
  );
}

export default CartTable;
