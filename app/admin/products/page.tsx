import { Suspense } from "react";

import Link from "next/link";

import { getAllProducts } from "@/lib/actions/product.actions";

import { requireAdmin } from "@/lib/auth-gaurd";

import { formatId } from "@/lib/utils";

type SearchParams = Promise<{ page: string; query: string; category: string }>;

function AdminProductPage(props: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AdminProductContent searchParams={props.searchParams} />
    </Suspense>
  );
}

async function AdminProductContent(props: { searchParams: SearchParams }) {
  await requireAdmin();

  const searchPropms = await props.searchParams;

  const page = Number(searchPropms.page) || 1;
  const searchText = searchPropms.query || "";
  const category = searchPropms.category || "";

  const products = await getAllProducts({ query: searchText, page, category });

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="font-bold">Products</h1>
        </div>
      </div>
    </div>
  );
}

export default AdminProductPage;
