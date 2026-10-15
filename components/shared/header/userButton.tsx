import Link from "next/link";

import { UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { auth } from "@/auth";

import { signOutUser } from "@/lib/actions/user.actions";

async function UserButton() {
  const session = await auth();

  // No logins for this account
  if (!session) {
    return (
      <Button nativeButton={false} render={<Link href="/sign-in" />}>
        <UserIcon /> Account
      </Button>
    );
  }

  const username = session.user?.name ?? "Account";

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" className="rounded-md ml-2">
              {username}
            </Button>
          }
        />

        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuItem className="p-0 mb-1">
            <form action={signOutUser} className="w-full">
              <Button
                type="submit"
                variant="ghost"
                className="w-full py-4 px-2 h-4 justify-end"
              >
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserButton;
