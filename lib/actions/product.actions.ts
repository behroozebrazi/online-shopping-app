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
  price,
  sort,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
  price?: string;
  sort?: string;
}) {
  const queryFilter =
    query && query !== "all" ? { name: { contains: query } } : {};

  const categoryFilter = category && category !== "all" ? { category } : {};

  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            gte: Number(price.split("-")[0]),
            lte: Number(price.split("-")[1]),
          },
        }
      : {};

  const data = await prisma.product.findMany({
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
    },
    orderBy:
      sort === "lowest"
        ? { price: "asc" }
        : sort === "highest"
          ? { price: "desc" }
          : { createdAt: "desc" },
    skip: (page - 1) * 12,
    take: 12,
  });

  const dataCount = await prisma.product.count({
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
    },
  });

  const where = {
    ...(query ? { name: { contains: query } } : {}),
    ...(category ? { category } : {}),
  };

  //   const data = await prisma.product.findMany({
  //   skip: (page - 1) * limit,
  //   take: limit,
  // });
  // return { data, totalPages: Math.ceil(dataCount / limit) };

  return {
    data,
    totalPages: typeof limit === "number" ? Math.ceil(dataCount / limit) : 1,
  };
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

export async function getAllCategories() {
  const data = await prisma.product.groupBy({
    by: ["category"],
    _count: true,
  });

  return data;
}
