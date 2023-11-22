import { z } from 'zod';

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string().min(1).max(20),
    lastName: z.string().min(1).max(20),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
  }),
});

export const orderValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number(),
  quantity: z.number(),
});
