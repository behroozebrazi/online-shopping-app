"use server";

import { cookies } from "next/headers";

import { auth } from "@/auth";

import { CartItem } from "@/types";

export async function addItemToCart(data: CartItem) {
  try {
    // take session from cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!sessionCartId) throw new Error("Session not found.");

    // update the session for the userId
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

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
