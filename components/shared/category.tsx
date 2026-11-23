import Link from "next/link";

import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getAllCategories } from "@/lib/actions/product.actions";

async function Category() {
  const categories = await getAllCategories();

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" className="ml-2 rounded-md" />}
        >
          <MenuIcon />
          <span>Categories</span>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-36 m-2" align="end">
          <>
            {categories.map((item) => (
              <DropdownMenuItem
                key={item.category}
                className="w-full py-4 px-2 justify-start"
              >
                <Link href={`/search?category=${item.category}`}>
                  {item.category}
                </Link>
              </DropdownMenuItem>
            ))}
          </>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Category;
