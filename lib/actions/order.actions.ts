"use server";

import { auth } from "@/auth";

import { prisma } from "../prisma";

import { getMyCart } from "./cart.actions";
import { getUserById } from "./user.actions";

import { insertOrderSchema } from "../validators";

import { type CartItem } from "@/types";

const emptyCart = {
  items: [],
  itemsPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
};

export async function createOrder(mobile: string) {
  try {
    const session = await auth();
    if (!session) throw new Error("Session not found.");

    const userId = session.user?.id;
    if (!userId) throw new Error("User id not found.");

    const user = await getUserById(userId);
    if (!user) throw new Error("User not found.");

    const cart = await getMyCart();
    if (!cart || cart.items.length === 0) {
      return { success: false, message: "Cart is empty.", redirect: "/cart" };
    }

    // create an order object
    const order = insertOrderSchema.parse({
      userId: user.id,
      shippimgAddress: user.address,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
    });

    // record the order object in the database
    const insertOrderId: unknown = await prisma.$transaction(async (tx) => {
      const insertedOrder = await tx.order.create({
        data: {
          ...order,
          itemsPrice: parseInt(order.itemsPrice),
          shippingPrice: parseInt(order.shippingPrice),
          totalPrice: parseInt(order.totalPrice),
        },
      });

      for (const item of cart.items as CartItem[]) {
        await tx.orderItem.create({
          data: { ...item, price: item.price, orderId: insertedOrder.id },
        });
      }

      // update cart (empty cart)
      await tx.cart.update({ where: { id: cart.id }, data: { emptyCart } });

      return insertedOrder.id;
    });

    if (!insertOrderId) throw new Error("The order has not been created.");

    return {
      success: true,
      message: "The order has been created.",
      redirect: `/order/${insertOrderId}`,
    };
  } catch (error) {
    return { success: false, message: error, redirect: "/cart" };
  }
}
