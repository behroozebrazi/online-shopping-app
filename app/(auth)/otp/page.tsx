import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { auth } from "@/auth";

import OtpForm from "./OtpForm";

async function SignInPage(props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const { callbackUrl } = await props.searchParams;

  // create a session
  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-full max-w-md p-5">
        <CardHeader className="space-y-4">
          <CardTitle className="text-center">Login with Mobile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <OtpForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default SignInPage;
