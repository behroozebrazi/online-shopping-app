import { Suspense } from "react";

import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { getAllOrders } from "@/lib/actions/order.actions";
import { requireAdmin } from "@/lib/auth-gaurd";

import Pagination from "@/components/shared/pagination";

import { formatId, formatDate } from "@/lib/utils";

type SearchParams = Promise<{ page?: string }>;

function AdminOrdersPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AdminOrdersContent searchParams={searchParams} />
    </Suspense>
  );
}

async function AdminOrdersContent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await requireAdmin();

  const { page = "1" } = await searchParams;

  const orders = await getAllOrders({ page: Number(page), limit: 10 });

  return <div></div>;
}

export default AdminOrdersPage;
