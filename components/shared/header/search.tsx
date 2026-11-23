import { SearchIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getAllCategories } from "@/lib/actions/product.actions";

async function Search() {
  const categories = await getAllCategories();

  return (
    <form action="/search" method="GET">
      <div className="flex w-full max-w-sm items-center gap-2">
        <Select name="category">
          <SelectTrigger className="w-[180px] text-right justify-end">
            <SelectValue placeholder="Categories" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((item) => (
              <SelectItem key={item.category} value={item.category}>
                {item.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          name="q"
          type="text"
          placeholder="Search"
          className="w-[300px] text-right"
        />

        <Button>
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
}

export default Search;
