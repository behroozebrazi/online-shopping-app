import { prisma } from "../lib/prisma";

import data from "./products";

async function seedProduct() {
  const { products } = data;

  await prisma.product.deleteMany();

  await prisma.product.createMany({ data: products });

  console.log("Products added.");
}

seedProduct();

// How to run only this file in the terminal:
// npx tsx ./data/seedProduct.ts
