"use server";

import { auth } from "@/auth";

import { prisma } from "../prisma";

import { getMyCart } from "./cart.actions";
import { getUserById } from "./user.actions";

import { insertOrderSchema } from "../validators";

import { convertToPlainObject } from "../utils";

import { PAGE_SIZE } from "../constants";

import { type CartItem } from "@/types";

export async function createOrder() {
  const emptyCart = {
    items: [],
    itemsPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
  };

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

    if (!user.address) {
      return {
        success: false,
        message: "No shipping address.",
        redirect: "/shipping",
      };
    }
    if (!user.paymentMethod) {
      return {
        success: false,
        message: "No payment method.",
        redirect: "/payment-method",
      };
    }

    // create an order object
    const order = insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: user.address,
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
          itemsPrice: Number(order.itemsPrice),
          shippingPrice: Number(order.shippingPrice),
          totalPrice: Number(order.totalPrice),
        },
      });

      for (const item of cart.items as CartItem[]) {
        await tx.orderItem.create({
          data: {
            ...item,
            orderId: insertedOrder.id,
            productId: item.productId,
            name: item.name,
            slug: item.slug,
            qty: item.qty,
            image: item.image,
            price: Number(item.price),
          },
        });
        // await tx.orderItem.create({
        //   data: { ...item, price: item.price, orderId: insertedOrder.id },
        // });
      }

      // update cart (empty cart)
      await tx.cart.update({ where: { id: cart.id }, data: { ...emptyCart } });

      return insertedOrder.id;
    });

    if (!insertOrderId) throw new Error("The order has not been created.");

    return {
      success: true,
      message: "The order has been created.",
      redirect: `/order/${insertOrderId}`,
    };
  } catch (error) {
    // return { success: false, message: error, redirect: "/cart" };
    console.error("createOrder failed:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong.",
      redirect: "/cart",
    };
  }
}

export async function getOrderById(orderId: string) {
  const data = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderItems: true,
      user: { select: { name: true, email: true } },
    },
  });

  return convertToPlainObject(data);
}

export async function getMyOrders({
  limit = PAGE_SIZE,
  page,
}: {
  limit: number;
  page: number;
}) {
  const session = await auth();
  if (!session) throw new Error("User is not authorized");

  const userId = session.user?.id;
  if (!userId) throw new Error("User is not found");

  const data = await prisma.order.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.order.count({
    where: { userId: userId },
  });

  return { data, totalPages: Math.ceil(dataCount / limit) };
}
