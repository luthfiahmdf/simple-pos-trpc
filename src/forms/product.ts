import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(3, 'minimal 3 karakter').max(50),
  price: z.coerce.number({ message: "Price is required" }).min(1000),
  categoryId: z.string({ message: "Category is required" }),

});

export type ProductFormSchema = z.infer<typeof productFormSchema>;
