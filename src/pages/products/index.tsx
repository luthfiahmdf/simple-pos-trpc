import {
  DashboardDescription,
  DashboardHeader,
  DashboardLayout,
  DashboardTitle,
} from "@/components/layouts/DashboardLayout";
import type { NextPageWithLayout } from "../_app";
import { useState, type ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { ProductCatalogCard } from "@/components/shared/product/ProductCatalogCard";
import { api } from "@/utils/api";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription
} from "@/components/ui/alert-dialog";
import { ProductForm } from "@/components/shared/product/ProductForm";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { productFormSchema, updateProductFormSchema, type ProductFormSchema, type UpdateProductFormSchema, type UpdateProductSchema } from "@/forms/product";
import { zodResolver } from "@hookform/resolvers/zod";

const ProductsPage: NextPageWithLayout = () => {
  const [open, setOpen] = useState<boolean>(false);
  const apiUtils = api.useUtils();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [productDeleteDialog, setProductDeleteDialog] = useState<boolean>(false)

  const [productToEdit, setProductToEdit] = useState<string | null>(null)
  const [productEditDialog, setProductEditDialog] = useState<boolean>(false)

  //Form
  const createProductForm = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
  });
  const updateProductForm = useForm<UpdateProductFormSchema>({
    resolver: zodResolver(updateProductFormSchema)
  })
  //mutate/query
  const { mutate: createProduct } = api.product.createProduct.useMutation({
    onSuccess: async () => {
      await apiUtils.product.getProduct.invalidate();
      setOpen(false);
      createProductForm.reset();
    },
  });

  const { mutate: deleteProduct } = api.product.deleteProductById.useMutation({
    onSuccess: async () => {
      await apiUtils.product.getProduct.invalidate();
      setProductDeleteDialog(false)
    }
  })
  const { mutate: updateProduct } = api.product.updateProductById.useMutation({
    onSuccess: async () => {
      await apiUtils.product.getProduct.invalidate();
      setProductEditDialog(false)
      updateProductForm.reset()
    }
  })
  const { data: product } = api.product.getProduct.useQuery();

  //Handler
  const handleClickProductToDelete = (productId: string) => {
    setProductToDelete(productId);
    setProductDeleteDialog(!productDeleteDialog);
  }
  const handleDeleteProduct = () => {
    deleteProduct({ productId: productToDelete! })
  }

  const handleClickProductToEdit = (product: UpdateProductSchema) => {
    setProductEditDialog(!productEditDialog)
    setProductToEdit(product.id)
    updateProductForm.reset({
      name: product.name,
      categoryId: product.categoryId,
      price: product.price,
    })
  }
  const handleUpdateProduct = (values: UpdateProductFormSchema) => {
    updateProduct({
      id: productToEdit!,
      ...values,
      imageUrl: uploadedImageUrl!
    })
  }
  const handleSubmitCreateProduct = (values: ProductFormSchema) => {
    if (!uploadedImageUrl) {
      alert('upload image first');
      return;
    };
    console.log(values);
    createProduct({
      ...values,
      imageUrl: uploadedImageUrl
    });
  };

  return (
    <>
      <DashboardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <DashboardTitle>Product Management</DashboardTitle>
            <DashboardDescription>
              View, add, edit, and delete products in your inventory.
            </DashboardDescription>
          </div>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button>Add New Product</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>Create Product</AlertDialogHeader>
              <Form {...createProductForm}>
                <ProductForm
                  onSubmit={handleSubmitCreateProduct}
                  onChangeImageUrl={(imageUrl) => setUploadedImageUrl(imageUrl)}
                />
              </Form>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => createProductForm.reset()}>Cancel</AlertDialogCancel>
                <Button type='submit' form="formProduct" onClick={createProductForm.handleSubmit(handleSubmitCreateProduct)}>
                  Create
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={productEditDialog} onOpenChange={setProductEditDialog}>


            <AlertDialogContent>
              <AlertDialogHeader>Create Product</AlertDialogHeader>
              <Form {...updateProductForm}>
                <ProductForm
                  onSubmit={handleSubmitCreateProduct}
                  onChangeImageUrl={(imageUrl) => setUploadedImageUrl(imageUrl)}
                />
              </Form>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => updateProductForm.reset()}>Cancel</AlertDialogCancel>
                <Button type='submit' form="formProduct" onClick={updateProductForm.handleSubmit(handleUpdateProduct)}>
                  Update
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>


          <AlertDialog
            open={productDeleteDialog}
            onOpenChange={setProductDeleteDialog}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Product</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                Are you sure you want to delete this category? This action cannot be
                undone.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant="destructive" onClick={() => handleDeleteProduct()}>Delete</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DashboardHeader>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {product?.map((product) => (
          <ProductCatalogCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.imageUrl ?? ""}
            category={product.category.name}
            onEdit={() => handleClickProductToEdit({ id: product.id, name: product.name, categoryId: product.category.id, price: product.price, })}
            onDelete={() => handleClickProductToDelete(product.id)}

          />
        ))}
      </div>
    </>
  );
};

ProductsPage.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ProductsPage;
