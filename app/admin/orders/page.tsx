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

  return (
    <>
      <div className="space-y-2">
        <h2 className="font-bold">Ordes</h2>
        <div className="overflow-x-auto">
          <Table className="w-full text-right">
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Order Number</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Payment</TableHead>
                <TableHead className="text-center">Delivery</TableHead>
                <TableHead className="text-right pr-4">Details</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.data.map((order) => (
                <TableRow key={order.id} className="align-top">
                  <TableCell className="text-left">
                    {formatId(order.id)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell className="text-center">
                    $ {order.totalPrice}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.isPaid ? "Paid" : "Unpaid"}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.isDelivered ? "Delivered" : "Not delivered"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      nativeButton={false}
                      render={<Link href={`/order/${order.id}`} />}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {orders.totalPages > 1 && (
            <Pagination
              page={Number(page) || 1}
              totalPages={orders.totalPages}
              urlParamName=""
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminOrdersPage;
