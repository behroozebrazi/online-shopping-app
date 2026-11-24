import { Suspense } from "react";

import Link from "next/link";

import {
  getAllProducts,
  getAllCategories,
} from "@/lib/actions/product.actions";

import ProductCard from "@/components/shared/product/productCard";

const prices = [
  { name: "under $20", value: "0-20" },
  { name: "$20 - $50", value: "20-50" },
  { name: "$50 - $100", value: "50-100" },
  { name: "$100 - $150", value: "100-150" },
  { name: "$150 - $200", value: "150-200" },
  { name: "$200 - $300", value: "200-300" },
  { name: "$300 - $500", value: "300-500" },
  { name: "above $500", value: "500-" },
];

type SearchParams = Promise<{
  q?: string;
  category?: string;
  price?: string;
  sort?: string;
  page?: string;
}>;

export default function SearchPage(props: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <SearchResults searchParams={props.searchParams} />
    </Suspense>
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

  function getFilterUrl({
    c,
    p,
    s,
    pg,
  }: {
    c?: string;
    p?: string;
    s?: string;
    pg?: string;
  }) {
    const params = { q, category, price, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (s) params.sort = s;
    if (pg) params.page = pg;
    return `/search/${new URLSearchParams(params).toString()}`;
  }

  const [products, categories] = await Promise.all([
    getAllProducts({ query: q, category, price, sort, page: Number(page) }),
    getAllCategories(),
  ]);

  const showCategories = categories.map((c) => (
    <li key={c.category}>
      <Link
        href={getFilterUrl({ c: c.category })}
        className={`${category === c.category && "font-bold"}`}
      >
        {c.category}
      </Link>
    </li>
  ));

  const showPrices = prices.map((p) => (
    <li key={p.value}>
      <Link
        href={getFilterUrl({ p: p.value })}
        className={`${price === p.value && "font-bold"}`}
      >
        {p.name}
      </Link>
    </li>
  ));

  return (
    <div className="grid grid-cols-5 gap-2">
      <div>
        {/* Category */}
        <div className="text-xl mb-2 mt-3">Category</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                href={getFilterUrl({ c: "all" })}
                className={`${(category === "" || category === "all") && "font-bold"}`}
              >
                All
              </Link>
            </li>
            {showCategories}
          </ul>
        </div>

        {/* Price */}
        <div className="text-xl mb-2 mt-8">Price</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                href={getFilterUrl({ p: "all" })}
                className={`${price === "all" && "font-bold"}`}
              >
                All
              </Link>
            </li>
            {showPrices}
          </ul>
        </div>
      </div>

      <div className="col-span-4 space-y-4">
        <div className="grid gap-4 grid-cols-3">
          {products.data.length === 0 && <div>Products not found.</div>}
          {products.data.map((item) => (
            <ProductCard
              key={item.id}
              product={{ ...item, price: item.price }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
