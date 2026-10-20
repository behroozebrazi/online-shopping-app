import { z } from "zod";

import {
  insertProductSchema,
  cartItemSchema,
  insertCartSchema,
} from "@/lib/validators";

// define a type from insertProductSchema and add id and createdAt types to it.
export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
};

export type CartItem = z.infer<typeof cartItemSchema>;

export type Cart = z.infer<typeof insertCartSchema>;
