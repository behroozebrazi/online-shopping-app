import { prisma } from "../lib/prisma";

import productsData from "./products";
import usersData from "./users";

// How to run only this file in the terminal:
// npx tsx ./data/seed.ts

async function seed() {
  const { products } = productsData;
  const { users } = usersData;

  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({ data: products });
  console.log("Products added.");

  await prisma.user.createMany({ data: users });
  console.log("Users added.");
}

seed();
