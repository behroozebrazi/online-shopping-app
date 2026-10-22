import { auth } from "@/auth";

import { getUserById } from "@/lib/actions/user.actions";

import CheckoutSteps from "@/components/shared/checkoutSteps";

async function PaymentMethodPage() {
  // take user id
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("User not found.");
  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps currentStep={2} />
      <div>form</div>
    </>
  );
}

export default PaymentMethodPage;
