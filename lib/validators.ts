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

// validation sign in form
export const signInFormSchema = z.object({
  email: z.string().email("Wrong email!"),
  password: z.string().min(5, "Password should be more 5 or more characters."),
});
