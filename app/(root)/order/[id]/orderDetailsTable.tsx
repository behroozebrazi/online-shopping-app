"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { formatId } from "@/lib/utils";

import { type Order } from "@/types";

function OrderDetailsTable({ order }: { order: Order }) {
  const {
    id,
    shippingAddress,
    orderItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    isDelivered,
    isPaid,
    paidAt,
    deliveredAt,
  } = order;

  // Convert format date
  function formatDate(date: Date | null) {
    if (date) {
      return new Date(date).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "";
  }

  return (
    <>
      <h1 className="py-4 text-2xl">Order number: {formatId(id)}</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-y-4 overflow-x-auto">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Payment Method</h2>
              <p className="mb-2">{paymentMethod}</p>
              {isPaid ? (
                <Badge variant="secondary">
                  Payment Date: {formatDate(paidAt)}
                </Badge>
              ) : (
                <Badge variant="destructive">Did not pay</Badge>
              )}
            </CardContent>
          </Card>

          <Card className="my-2">
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Address</h2>
              <p className="mb-2">{shippingAddress.fullName}</p>
              <p className="mb-2">
                {shippingAddress.streetAddress}, {shippingAddress.city},{" "}
                {shippingAddress.state} {shippingAddress.postalCode}
              </p>

              {isDelivered ? (
                <Badge variant="secondary">
                  Delivered Date: {formatDate(deliveredAt)}
                </Badge>
              ) : (
                <Badge variant="destructive">Did not delivered</Badge>
              )}
            </CardContent>
          </Card>

          <Card className="my-2">
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Orders</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">Product</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-left">Price</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell className="text-right">
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center gap-2"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            style={{ width: "100px", height: "auto" }}
                            className="rounded-md"
                          />
                        </Link>
                      </TableCell>

                      <TableCell className="text-center">
                        <span className="px-2">{item.qty}</span>
                      </TableCell>

                      <TableCell className="text-left">
                        <span className="px-2">$ {item.price}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-4 gap-4 space-y-4">
              <div className="flex justify-between">
                <div>Products Price</div>
                <div>$ {itemsPrice}</div>
              </div>

              <div className="flex justify-between">
                <div>Delivery Fee</div>
                <div>$ {shippingPrice}</div>
              </div>

              <div className="flex justify-between">
                <div>Total Price</div>
                <div>$ {totalPrice}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default OrderDetailsTable;
