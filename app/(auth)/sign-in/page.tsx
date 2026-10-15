import { Suspense } from "react";
import { connection } from "next/server";

import Link from "next/link";
import { redirect } from "next/navigation";

import SignInForm from "./signInForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { auth } from "@/auth";

async function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen w-full items-center justify-center text-center">
          Loading ...
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}

async function SignInContent() {
  await connection();

  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <Link href="/">Return to shop</Link>
          <CardTitle className="text-center">Welcome</CardTitle>
          <CardDescription className="text-center">
            Login to account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default SignInPage;
