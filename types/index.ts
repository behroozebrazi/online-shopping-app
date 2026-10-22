import { z } from "zod";

import {
  insertProductSchema,
  cartItemSchema,
  insertCartSchema,
  shippingAddressSchema,
  insertOrderSchema,
  insertOrderItemSchema,
} from "@/lib/validators";

// define a type from insertProductSchema and add id and createdAt types to it.
export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
};

export type CartItem = z.infer<typeof cartItemSchema>;

export type Cart = z.infer<typeof insertCartSchema>;

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;

export type OrderItem = z.infer<typeof insertOrderItemSchema>;

export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  user: { name: string; email: string };
  orderItems: OrderItem[];
  paidAt: Date | null;
  isPaid: boolean;
  deliveredAt: Date | null;
  isDelivered: boolean;
  createAt: Date;
};
