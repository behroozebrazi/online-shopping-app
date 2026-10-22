"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcryptjs";

import { z } from "zod";

import { prisma } from "../../lib/prisma";

import { auth, signIn, signOut } from "@/auth";

import {
  signInFormSchema,
  signUpFormSchema,
  shippingAddressSchema,
  paymentMethodSchema,
} from "../validators";

import { type ShippingAddress } from "@/types";
import { success } from "zod";

// Sign Up
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      mobile: formData.get("mobile"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const hashedPassword = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: user.password,
    });

    return { success: true, message: "Registered" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Not registered" };
  }
}

// Sign In
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData,
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("email-login", user);
    // await signIn("credentials", user);

    return { success: true, message: "Signed in" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Wrong password" };
  }
}

// Sign Out
export async function signOutUser() {
  await signOut();
}

// Get an user by id
export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({ where: { id: userId } });

  if (!user) throw new Error("User not found.");

  return user;
}

// Update user address
export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new Error("Not authenticated");

    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) throw new Error("User not found.");

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({ where: { id: user.id }, data: { address } });

    return { success: true, message: "User address was updated." };
  } catch (error) {
    return { success: false, message: error };
  }
}

// Update user's payment method
export async function updateUserPaymentMethod(
  data: z.infer<typeof paymentMethodSchema>,
) {
  try {
    // find user
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });
    if (!currentUser) throw new Error("User not found");

    // update user payment
    const paymentMethod = paymentMethodSchema.parse(data);
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { paymentMethod: paymentMethod.type },
    });

    return { success: true, message: "User payment method was updated." };
  } catch (error) {
    return { success: false, message: error };
  }
}
