"use server";

import { cookies } from "next/headers";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { prisma } from "../../lib/prisma";

import { cartItemSchema } from "../validators";

import { CartItem } from "@/types";

export async function addItemToCart(data: CartItem) {
  try {
    // take session from cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Session not found.");

    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    const item = cartItemSchema.parse(data);

    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });
    if (!product) throw new Error("Producy not found.");

    const cart = await getMyCart();
    if (!cart) {
      const newCart = {
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calculatePrice([item]),
      };

      await prisma.cart.create({ data: newCart });

      revalidatePath(`/product/${product.slug}`);
    } else {
      const existItem = (cart.items as CartItem[]).find(
        (p) => p.productId === item.productId,
      );

      if (existItem) {
        if (product.stock < existItem.qty + 1)
          throw new Error("Product not exist.");

        (cart.items as CartItem[]).find(
          (p) => p.productId === item.productId,
        )!.qty = existItem.qty + 1;
      } else {
        if (product.stock < 1) throw new Error("Product not exist.");

        cart.items.push(item);
      }

      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items,
          ...calculatePrice(cart.items as CartItem[]),
        },
      });

      revalidatePath(`/product/${product.slug}`);
    }

    return {
      success: true,
      message: "Product was added.",
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}

export async function removeItemFromCart(productId: string) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not fount.");

    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("Product not found.");

    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found.");

    const existItem = (cart.items as CartItem[]).find(
      (p) => p.productId === productId,
    );
    if (!existItem) throw new Error("Item not found.");

    if (existItem.qty === 1) {
      cart.items = (cart.items as CartItem[]).filter(
        (p) => p.productId !== productId,
      );
    } else {
      (cart.items as CartItem[]).find((p) => p.productId === productId)!.qty =
        existItem.qty - 1;
    }

    await prisma.cart.update({
      where: { id: cart.id },
      data: { items: cart.items, ...calculatePrice(cart.items as CartItem[]) },
    });

    revalidatePath(`/product/${product.slug}`);

    return { success: true, message: "Product was removed." };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function getMyCart() {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Session not found.");

  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  const cart = await prisma.cart.findFirst({
    where: userId ? { userId } : { sessionCartId },
  });
  if (!cart) return undefined;

  return {
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
  };
}

function calculatePrice(items: CartItem[]) {
  const itemsPrice = items.reduce(
    (acc, item) => Number(item.price) * item.qty + acc,
    0,
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 20;

  const totalPrice = itemsPrice + shippingPrice;

  return {
    itemsPrice,
    shippingPrice,
    totalPrice,
  };
}
