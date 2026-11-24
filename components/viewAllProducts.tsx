import Link from "next/link";

import { Button } from "./ui/button";

function ViewAllProducts() {
  return (
    <div className="flex justify-center items-center my-8">
      <Button className="font-semibold text-lg px-8 py-5">
        <Link href="/search">All Products</Link>
      </Button>
    </div>
  );
}

export default ViewAllProducts;
