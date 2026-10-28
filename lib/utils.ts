// Helper functions

// export { cn } from "cn";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function formatId(id: string) {
  return `..${id.substring(id.length - 6)}`;
}

export function formatDate(date: Date | null) {
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

export function formatCurrency(
  amount: number | string | null | undefined,
  currency = "USD",
) {
  const value = Number(amount);

  if (amount == null || Number.isNaN(value)) return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value);
}

export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string | null;
}) {
  const query = qs.parse(params);

  query[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: query,
    },
    {
      skipNull: true,
    },
  );
}
