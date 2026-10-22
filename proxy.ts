import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((req) => {
  const sessionCartId = req.cookies.get("sessionCartId")?.value;

  if (!sessionCartId) {
    const response = NextResponse.redirect(new URL(req.url));

    response.cookies.set("sessionCartId", crypto.randomUUID(), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });

    return response;
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)",
  ],
};
