import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

// Adaptor
import { PrismaAdapter } from "@auth/prisma-adapter";
// Prisma Client
import { prisma } from "./lib/prisma";

import { compareSync } from "bcryptjs";

// Config Next Auth
export const config = {
  pages: {
    signIn: "/sign-in", // url
    error: "/sign-in", // url
  },

  session: {
    strategy: "jwt", // Json Web Token
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      // login method: login by email and password
      credentials: { email: { type: "email" }, password: { type: "password" } },

      async authorize(credentials) {
        if (credentials === null) return null;

        // fetch the user info by user's email
        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });

        // compare the given user's password with database
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

        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session, user, trigger, token }: any) {
      session.user.id = token.sub;
      if (trigger === "update") session.user.name = user.name;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
