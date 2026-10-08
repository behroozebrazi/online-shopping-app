import Link from "next/link";
import { ShoppingCart, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

function Header() {
  return (
    <header className="w-full border-b">
      <div className="flex flex-1 justify-between items-center max-w-7xl w-full py-5 px-10 mx-auto">
        <div className="flex justify-start items-center">
          <Link href="/" className="flex justify-start items-center">
            <span>Logo</span>
            <span className="block font-bold text-2xl mr-3">Store</span>
          </Link>
        </div>

        <div className="space-x-2">
          <Button render={<Link href="/cart" />}>
            <ShoppingCart /> Cart
          </Button>

          <Button render={<Link href="/sign-in" />}>
            <UserIcon /> Account
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
