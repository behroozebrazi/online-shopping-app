"use server";

import { prisma } from "../../lib/prisma";

export async function findMobile(mobile: string) {
  const user = await prisma.user.findUnique({ where: { mobile: mobile } });

  if (user) {
    return user.mobile;
  }

  return null;
}
