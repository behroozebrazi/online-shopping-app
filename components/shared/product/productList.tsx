import ProductCard from "./productCard";

import { Product } from "@/types";

function ProductList({
  data,
  title,
  limit,
}: {
  data: Product[];
  title?: string;
  limit?: number;
}) {
  const limitedProducts = limit ? data.slice(0, limit) : data;
  const products =
    data?.length > 0 ? (
      limitedProducts.map((item: Product, index: number) => {
        return <ProductCard key={index} product={item} />;
        // return <div key={index}>{item.name}</div>;
      })
    ) : (
      <div>There is no product.</div>
    );

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl mb-4">{title}</h2>
      <div className="grid grid-cols-4 gap-4">{products}</div>
    </div>
  );
}

export default ProductList;
