import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
  // ---------- Pages
  pages: {
    signIn: "/sign-in", // url
    error: "/sign-in", // url
  },

  // ---------- Session
  session: {
    strategy: "jwt", // Json Web Token
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // ---------- Adaptor
  adapter: PrismaAdapter(prisma),

  // ---------- Providers
  providers: [
    // ------------------------------ Login Method 1: login by Email and Password
    CredentialsProvider({
      id: "email-login",
      name: "Email Login",
      credentials: { email: { type: "email" }, password: { type: "password" } },

      async authorize(credentials) {
        if (credentials === null) return null;

        // fetch the user info by user's email
        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });

        // return user info
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

    // ------------------------------ Login Method 2: login by Mobile
    CredentialsProvider({
      id: "mobile-name",
      name: "Mobile Login",
      credentials: { mobile: { type: "text", label: "mobile" } },

      async authorize(credentials) {
        if (credentials?.mobile === null) return null;

        // fetch the user info by user's email
        const user = await prisma.user.findUnique({
          where: { mobile: credentials.mobile as string },
        });

        // return user info
        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }
        return null;
      },
    }),
  ],

  // ---------- Callback
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      session.user.id = token.sub;
      session.user.role = token.role;

      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },

    //
    async jwt({ session, user, trigger, token }: any) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    // take session from cookie
    authorized({ request, auth }: any) {
      // create sessionCartId if it doesn't exist
      if (!request.cookies.get("sessionCartId")) {
        const sessionCartId = crypto.randomUUID();

        // take request from header
        const newRequestHeaders = new Headers(request.headers);

        // update header using NextResponse
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });
        return response;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
