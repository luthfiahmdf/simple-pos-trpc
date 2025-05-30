import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(3, 'minimal 3 karakter').max(50),
  price: z.coerce.number({ message: "Price is required" }).min(1000),
  categoryId: z.string({ message: "Category is required" }),

});
export const updateProductSchema = z.object({
  id: z.string({ message: "id is required" }),
  name: z.string().min(3),
  price: z.coerce.number({ message: "price is Required" }).min(1000),
  categoryId: z.string({ message: "Category is required" }),
})
export type ProductFormSchema = z.infer<typeof productFormSchema>;
export const updateProductFormSchema = updateProductSchema.omit({ id: true })
export type UpdateProductFormSchema = Omit<z.infer<typeof updateProductSchema>, "id">;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>
