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

// validation sign up form (register)
export const signUpFormSchema = z.object({
  name: z.string().min(2, "Name should be 2 or more characters."),
  email: z.string(),
  mobile: z.string(),
  password: z.string().min(5, "Password should be 5 or more characters."),
  confirmPassword: z
    .string()
    .min(5, "Password should be 5 or more characters."),
});
