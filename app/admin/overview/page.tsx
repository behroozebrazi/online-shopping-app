import { Suspense } from "react";

import Link from "next/link";

import { Users, CreditCard, Barcode } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { requireAdmin } from "@/lib/auth-gaurd";

import { getOrderSummery } from "@/lib/actions/order.actions";

import { formatDate } from "@/lib/utils";

function AdminOverviewPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <OverviewContent />
    </Suspense>
  );
}

async function OverviewContent() {
  await requireAdmin();

  const summery = await getOrderSummery();

  const totalSalesPrice = (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Sales Price</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          $ {summery.totalSales._sum.totalPrice?.toString() || 0}
        </div>
      </CardContent>
    </Card>
  );

  const totalSalesNumber = (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{summery.ordersCount}</div>
      </CardContent>
    </Card>
  );

  const totalUsersNumber = (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{summery.usersCount}</div>
      </CardContent>
    </Card>
  );

  const totalProductsNumber = (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{summery.productsCount}</div>
      </CardContent>
    </Card>
  );

  const lastSalesTable = (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Customer</TableHead>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Total</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {summery.latestSales.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="text-left">{order.user.name}</TableCell>
            <TableCell className="text-center">
              {formatDate(order.createdAt)}
            </TableCell>
            <TableCell className="text-center">$ {order.totalPrice}</TableCell>
            <TableCell className="text-right">
              <Link href={`/order/${order.id}`}>Details</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-2">
      <h1 className="font-bold">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        {totalSalesPrice}
        {totalSalesNumber}
        {totalUsersNumber}
        {totalProductsNumber}
      </div>

      <div className="grid grid-cols-7 gap-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Reports</CardTitle>
          </CardHeader>
          <CardContent>Chart</CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Last Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <CardHeader>{lastSalesTable}</CardHeader>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminOverviewPage;
