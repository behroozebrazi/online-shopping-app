import { z } from "zod";

// validation fetched data from database
export const insertProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  category: z.string(),
  brand: z.string(),
  description: z.string(),
  stock: z.number(),
  image: z.string(),
  price: z.string(),
});
