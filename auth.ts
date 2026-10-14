import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";

import { compareSync } from "bcryptjs";

// Config Next Auth
export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },

  session: {
    strategy: "jwt", // Json Web Token
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      // login by email and password
      credentials: { email: { type: "email" }, password: { type: "password" } },
      async authorize(credentials) {
        if (credentials === null) return;

        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });

        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password,
          );

          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }

        return;
      },
    }),
  ],

  callbacks: {
    async session({ session, user, trigger, token }: any) {
      session.user.id = token.sub;
      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
