import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
});
export const deleteCategoryFormSchema = z.object({
  categoryId: z.string()
})
export type CategoryFormSchema = z.infer<typeof categoryFormSchema>;
export type DeleteCategoryFormSchema = z.infer<typeof deleteCategoryFormSchema>;
