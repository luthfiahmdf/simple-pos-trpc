import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type CategoryFormSchema } from "@/forms/category";
import { useFormContext } from "react-hook-form";

interface CategoryFormProps {
  onSubmit: (data: CategoryFormSchema) => void;
  submitText: string;
}

export const CategoryForm = ({ onSubmit, submitText }: CategoryFormProps) => {
  const form = useFormContext<CategoryFormSchema>();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
};
