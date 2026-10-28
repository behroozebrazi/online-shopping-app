import { Suspense } from "react";

import Link from "next/link";

import { getMyOrders } from "@/lib/actions/order.actions";

import { formatId, formatDate, formatCurrency } from "@/lib/utils";

import Pagination from "@/components/shared/pagination";

import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

type SearchParams = Promise<{ page?: string }>;

function OrdersPage(props: { searchParams: SearchParams }) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Orders</h2>
      <Suspense fallback={<div>Loading orders...</div>}>
        <OrdersContent searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}

async function OrdersContent({ searchParams }: { searchParams: SearchParams }) {
  const { page } = await searchParams;

  const orders = await getMyOrders({ page: Number(page) || 1 });

  const tableBody = orders.data.map((order) => (
    <TableRow key={order.id} className="align-top">
      <TableCell className="text-left">{formatId(order.id)}</TableCell>
      <TableCell className="text-left">{formatDate(order.createdAt)}</TableCell>
      <TableCell className="text-center">
        {formatCurrency(order.totalPrice)}
      </TableCell>
      <TableCell className="text-center">
        {order.isPaid ? "Paid" : "Unpaid"}
      </TableCell>
      <TableCell className="text-center">
        {order.isDelivered ? "Delivered" : "Not delivered"}
      </TableCell>
      <TableCell className="text-center">
        <Link href={`/order/${order.id}`}>
          <span className="px-2">View details</span>
        </Link>
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <div className="space-y-2">
        <h2 className="font-bold">Orders</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Payment</TableHead>
                <TableHead className="text-center">Delivery</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>{tableBody}</TableBody>
          </Table>

          {orders.totalPages > 1 && (
            <Pagination
              page={Number(page) || 1}
              totalPages={orders.totalPages || 1}
              urlParamName=""
            ></Pagination>
          )}
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
