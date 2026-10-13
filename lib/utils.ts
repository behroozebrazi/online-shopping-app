export { cn } from "cn";

// Deep Copy from an Object - JSON compatible
// Convert Prisma object to JavaScript object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
