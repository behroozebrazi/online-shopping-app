import { Suspense } from "react";

import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";

import ProfileForm from "./profileForm";

function ProfilePage() {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="font-bold">User Profile</h2>
      <Suspense fallback={<p className="text-sm">Loading profile…</p>}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}

async function ProfileContent() {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <ProfileForm />
    </SessionProvider>
  );
}

export default ProfilePage;
