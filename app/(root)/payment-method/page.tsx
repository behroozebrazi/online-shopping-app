import { connection } from "next/server";
import { Suspense } from "react";

import { auth } from "@/auth";

import { getUserById } from "@/lib/actions/user.actions";

import CheckoutSteps from "@/components/shared/checkoutSteps";

import PaymentMethodForm from "./paymentMethodForm";
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants";

function PaymentMethodPage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <PaymentContent />
    </Suspense>
  );
}

async function PaymentContent() {
  await connection();

  // take user id
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("User not found.");
  // take user
  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps currentStep={2} />

      <PaymentMethodForm
        preferredPaymentMethod={user.paymentMethod ?? DEFAULT_PAYMENT_METHOD}
        paymentMethods={PAYMENT_METHODS || []}
      />
    </>
  );
}

export default PaymentMethodPage;
