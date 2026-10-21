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
  price: z.coerce.number(),
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

// validation one card item
export const cartItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  slug: z.string(),
  qty: z.number().int(),
  image: z.string(),
  price: z.coerce.number(),
});

// validation card items
export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: z.string(),
  shippingPrice: z.string(),
  totalPrice: z.string(),
  // define/manage card in session
  sessionCartId: z.string(),
  userId: z.string().optional().nullable(),
});
