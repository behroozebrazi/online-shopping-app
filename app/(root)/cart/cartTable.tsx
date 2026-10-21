"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import {
  ShoppingCart,
  ArrowRight,
  Plus,
  Minus,
  CartonIcon,
} from "lucide-react";

import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";

import { type Cart } from "@/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

function CartTable({ cart }: { cart?: Cart }) {
  const router = useRouter();

  const cartTable = (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {cart?.items.map((item) => (
          <TableRow key={item.slug}>
            {/* Product */}
            <TableCell>
              <Link
                href={`/product/${item.slug}`}
                className="flex items-center gap-3"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="h-[100px] w-[100px] object-cover"
                  unoptimized
                  loading="eager"
                />
                <span>{item.name}</span>
              </Link>
            </TableCell>

            {/* Quantity controls */}
            <TableCell>
              <div className="flex items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label={`Remove one ${item.name}`}
                  onClick={() => removeItemFromCart(item.productId)}
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <span className="min-w-8 text-center">{item.qty}</span>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label={`Add one ${item.name}`}
                  onClick={() => addItemToCart(item)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>

            {/* Price */}
            <TableCell className="text-right">${item.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const cartItems =
    cart && cart.items.length > 0 ? (
      <div className="grid grid-cols-4 gap-5">
        <div className="overflow-x-auto col-span-3">{cartTable}</div>

        <Card className="h-40">
          <CardContent className="gap-4 p-4">
            <div className="pb-10 text-xl">
              Total price:
              <span className="pl-2">$ {cart.itemsPrice}</span>
            </div>

            <Button
              className="w-full"
              onClick={() => router.push("/shipping-address")}
            >
              Check out
            </Button>
          </CardContent>
        </Card>
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
      <h1 className="py-4 font-bold">Shopping Cart</h1>
      {cartItems}
    </>
  );
}

export default CartTable;
