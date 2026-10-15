import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { auth } from "@/auth";

import SignUpForm from "./signUpForm";

async function SignUpPage(props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const session = await auth();

  const { callbackUrl } = await props.searchParams;

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full ">
      <Card className="max-w-md w-full px-5">
        <CardHeader className="space-y-4">
          <CardTitle className="tect-center">Register</CardTitle>
        </CardHeader>
        <SignUpForm />
        <CardContent className="space-y-4"></CardContent>
      </Card>
    </div>
  );
}
export default SignUpPage;
