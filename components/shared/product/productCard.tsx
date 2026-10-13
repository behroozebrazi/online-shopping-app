import Link from "next/link";
import Image from "next/image";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Product } from "@/types";

function ProductCard({ product }: { product: Product }) {
  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader className="p-0 items-center">
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.image}
              alt={product.name}
              height={300}
              width={300}
              priority={true}
            />
          </Link>
        </CardHeader>

        <CardContent className="grid gap-4 p-4">
          <div className="text-xs">{product.brand}</div>

          <Link href={`/product/${product.slug}`}>
            <h2 className="text-sm font-medium">{product.name}</h2>
          </Link>

          <div className="flex justify-between items-center gap-4">
            {product.stock > 0 ? (
              <p className="font-bold">$ {product.price}</p>
            ) : (
              <p>Out of stock</p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default ProductCard;
