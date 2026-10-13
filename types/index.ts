import { z } from "zod";

import { insertProductSchema } from "@/lib/validators";

// define a type from insertProductSchema and add id and createdAt types to it.
export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
};
