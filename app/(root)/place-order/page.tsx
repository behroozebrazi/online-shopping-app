import { connection } from "next/server";
import { Suspense } from "react";

import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { auth } from "@/auth";

import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

import CheckoutSteps from "@/components/shared/checkoutSteps";
import PlaceOrderForm from "./placeOrderForm";

import { type ShippingAddress } from "@/types";

function PlaceOrderPage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <PlaceOrderContent />
    </Suspense>
  );
}

async function PlaceOrderContent() {
  await connection();

  // take user id
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("User not found.");
  // take user address and payment method
  const user = await getUserById(userId);
  const userAddress = user?.address as ShippingAddress;
  const userPaymentMethod = user?.paymentMethod;
  // take cart items
  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect("/cart");

  const userAddressDom = userAddress ? (
    <>
      <p>{userAddress.fullName}</p>
      <p>
        {userAddress.streetAddress}, {userAddress.city}
      </p>
      <p>
        {userAddress.state} {userAddress.postalCode}
      </p>
    </>
  ) : (
    <p>No delivery address has been provided.</p>
  );

  const paymentMethodDom = userPaymentMethod ? (
    <p>{userPaymentMethod}</p>
  ) : (
    <p>No payment method has been selected.</p>
  );

  const tableContentDom = cart.items.map((item) => (
    <TableRow key={item.slug}>
      <TableCell className="text-right">
        <Link
          href={`/product/${item.slug}`}
          className="flex items-center gap-2"
        >
          <Image
            src={item.image}
            alt={item.name}
            width={100}
            height={100}
            loading="eager"
            className="rounded-md object-cover size-20"
          />
        </Link>
      </TableCell>
      <TableCell className="text-center px-2">{item.qty}</TableCell>
      <TableCell className="text-left">$ {item.price}</TableCell>
    </TableRow>
  ));

  return (
    <>
      <CheckoutSteps currentStep={3} />

      <h1 className="text-2xl py-4">Place order</h1>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 overflow-x-auto space-y-4">
          {/* Address */}
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Address</h2>
              {userAddressDom}
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Payment Method</h2>
              {paymentMethodDom}
            </CardContent>
          </Card>

          {/* Order */}
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Order</h2>

              <Table>
                {/* Table Header */}
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">Product</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-left">Price</TableHead>
                  </TableRow>
                </TableHeader>
                {/* Table Body */}
                <TableBody>{tableContentDom}</TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Result */}
        <div>
          <Card>
            <CardContent className="p-4 gap-4 space-y-4">
              <div className="flex justify-between">
                <div>Product(s) Price</div>
                <div>$ {cart.itemsPrice}</div>
              </div>

              <div className="flex justify-between">
                <div>Shipping Fee</div>
                <div>$ {cart.shippingPrice}</div>
              </div>

              <div className="flex justify-between">
                <div>Total Payment</div>
                <div>$ {cart.totalPrice}</div>
              </div>

              <PlaceOrderForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default PlaceOrderPage;
