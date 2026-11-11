import { Suspense } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

import Pagination from "@/components/shared/pagination";
import DeleteDialog from "@/components/shared/deleteDialog";

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

  const productsList = products.data.map((product) => (
    <TableRow key={product.id}>
      <TableCell className="text-left">{formatId(product.id)}</TableCell>
      <TableCell className="text-left">{product.name}</TableCell>
      <TableCell className="text-left">$ {product.price}</TableCell>
      <TableCell className="text-left">{product.category}</TableCell>
      <TableCell className="text-left">{product.stock}</TableCell>
      <TableCell className="text-right">
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="space-y-2">
      <div className="flex flex-col justify-between items-start">
        <div className="flex items-center gap-10">
          <h1 className="font-bold">Products</h1>

          <Button
            render={<Link href="/admin/products/create" />}
            nativeButton={false}
          >
            Create a product
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Id</TableHead>
              <TableHead className="text-left">Title</TableHead>
              <TableHead className="text-left">Price</TableHead>
              <TableHead className="text-left">Category</TableHead>
              <TableHead className="text-left">Stock</TableHead>
              <TableHead className="text-right w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{productsList}</TableBody>
        </Table>

        {products.totalPages > 1 && (
          <Pagination page={page} totalPages={products.totalPages} />
        )}
      </div>
    </div>
  );
}

export default AdminProductPage;
