"use client";

import { useActionState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { signUpUser } from "@/lib/actions/user.actions";

function SignUpForm() {
  const router = useRouter();

  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  if (data && data.success) {
    router.push(callbackUrl);
  }

  return (
    <>
      <form action={action}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="mb-2">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
            />
          </div>

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
            <Label htmlFor="mobile" className="mb-2">
              Mobile
            </Label>
            <Input id="mobile" name="mobile" type="text" required />
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
            <Label htmlFor="confirmPassword" className="mb-2">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              autoComplete="confirmPassword"
            />
          </div>

          <div>
            <Button type="submit" variant="default" className="w-full">
              Sign Up
            </Button>
          </div>

          <div className="text-center text-destructive">
            {data && !data.success && data.message}
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUpForm;
