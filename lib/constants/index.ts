export const PAYMENT_METHODS = [
  "Paypal",
  "Credit Card",
  "Bank Transfer",
  "Cash On Delivery",
] as const;

export const DEFAULT_PAYMENT_METHOD = "Credit Card";

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 2;
