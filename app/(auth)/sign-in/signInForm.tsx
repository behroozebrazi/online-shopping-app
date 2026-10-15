"use client";

import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function SignInForm() {
  return (
    <>
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
          <Button variant="default" className="w-full">
            Sign In
          </Button>
        </div>

        <div className="text-sm text-center">
          <Link href="/sign-up">Register</Link>
        </div>
      </div>
    </>
  );
}

export default SignInForm;
