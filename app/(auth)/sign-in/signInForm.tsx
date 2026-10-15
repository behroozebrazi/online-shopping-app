"use client";

import { useActionState } from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { signInWithCredentials } from "@/lib/actions/user.actions";

function SignInForm() {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  return (
    <>
      <form action={action}>
        <div className="space-y-6">
          <div>
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <Label htmlFor="password" className="mb-2">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="password"
            />
          </div>

          <div>
            <Button type="submit" variant="default" className="w-full">
              Sign In
            </Button>
          </div>

          <div className="text-center text-destructive">
            {data && !data.success && data.message}
          </div>

          <div className="text-sm text-center">
            <Link href="/sign-up">Register</Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignInForm;
