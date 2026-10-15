import Link from "next/link";

import SignInForm from "./signInForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <Link href="/">Return to shop</Link>
          <CardTitle className="text-center">Enter</CardTitle>
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
