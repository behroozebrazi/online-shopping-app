import { Suspense } from "react";

import Link from "next/link";

import { ShoppingCart, GlobeCheck } from "lucide-react";
import { UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import ThemeToggle from "./themeToggle";

import UserButton from "./userButton";

function Header() {
  return (
    <header className="w-full border-b">
      <div className="flex flex-1 justify-between items-center max-w-7xl w-full py-5 px-10 mx-auto">
        <div className="flex justify-start items-center">
          <Link href="/" className="flex justify-start items-center gap-3">
            <span>
              <GlobeCheck />
            </span>
            <span className="block font-bold text-2xl mr-3">Store</span>
          </Link>
        </div>

        <div className="space-x-2">
          <ThemeToggle />

          <Button nativeButton={false} render={<Link href="/cart" />}>
            <ShoppingCart /> Cart
          </Button>

          <Suspense
            fallback={
              <Button disabled>
                <UserIcon /> Account
              </Button>
            }
          >
            <UserButton />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

export default Header;
