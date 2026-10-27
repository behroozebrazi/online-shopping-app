"use client";

import { useSearchParams } from "next/navigation";

function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  let message = "";

  switch (status) {
    case "ok":
      message = "OK";
      break;

    case "failed":
      message = "Failed";
      break;

    case "canceled":
      message = "Canceled";
      break;

    case "notfound":
      message = "Not Found";
      break;
    default:
      message = "Error";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-4">Payment result</h1>
      <p className="text-lg text-center">{message}</p>
    </div>
  );
}

export default PaymentSuccessPage;
