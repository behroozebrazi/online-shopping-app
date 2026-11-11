"use server";

import { revalidatePath } from "next/cache";

import { number, z } from "zod";

import { prisma } from "../../lib/prisma";

import { convertToPlainObject } from "../utils";

import { insertProductSchema } from "../validators";

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });
  return convertToPlainObject(data);
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}

export async function getAllProducts({
  query,
  limit = 2,
  page,
  category,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
}) {
  const data = await prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
  const dataCount = await prisma.product.count();
  return { data, totalPages: Math.ceil(dataCount / limit) };
}

export async function deleteProduct(id: string) {
  try {
    const product = await prisma.product.findFirst({ where: { id: id } });
    if (!product) throw new Error("Product not found.");

    await prisma.product.delete({ where: { id: id } });

    revalidatePath("/admin/products");

    return { success: true, message: "Product was deleted." };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    const product = insertProductSchema.parse(data);

    await prisma.product.create({
      data: {
        ...product,
        price: Number(product.price),
      },
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product was created." };
  } catch (error) {
    return { success: false, message: error };
  }
}
