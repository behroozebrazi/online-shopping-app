import { Suspense } from "react";

import {
  getAllProducts,
  getAllCategories,
} from "@/lib/actions/product.actions";

import ProductCard from "@/components/shared/product/productCard";

type SearchParams = Promise<{
  q?: string;
  category?: string;
  price?: string;
  sort?: string;
  page?: string;
}>;

export default function SearchPage(props: { searchParams: SearchParams }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      <div>Link</div>

      <div className="col-span-4 space-y-4">
        <Suspense fallback={<div>Loading products...</div>}>
          <SearchResults searchParams={props.searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function SearchResults({ searchParams }: { searchParams: SearchParams }) {
  const {
    q = "all",
    category = "all",
    price = "all",
    sort = "newest",
    page = "1",
  } = await searchParams;

  const [products, categories] = await Promise.all([
    getAllProducts({ query: q, category, price, sort, page: Number(page) }),
    getAllCategories(),
  ]);

  return (
    <div className="grid gap-4 grid-cols-3">
      {products.data.length === 0 && <div>Products not found.</div>}
      {products.data.map((item) => (
        <ProductCard key={item.id} product={{ ...item, price: item.price }} />
      ))}
    </div>
  );
}
