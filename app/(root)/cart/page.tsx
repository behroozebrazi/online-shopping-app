import { Suspense } from "react";
import CartTable from "./cartTable";
import { getMyCart } from "@/lib/actions/cart.actions";

async function CartContent() {
  const cart = await getMyCart();
  return <CartTable cart={cart} />;
}

function CartSkeleton() {
  return <div className="animate-pulse h-64 rounded-md bg-muted" />;
}

function CartPage() {
  return (
    <Suspense fallback={<CartSkeleton />}>
      <CartContent />
    </Suspense>
  );
}

export default CartPage;
