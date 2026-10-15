"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcryptjs";

import { prisma } from "../../lib/prisma";

import { signIn, signOut } from "@/auth";

import { signInFormSchema, signUpFormSchema } from "../validators";
import { success } from "zod";

// Sign Up
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signInFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const hashedPassword = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
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

    await signIn("credentials", user);

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
