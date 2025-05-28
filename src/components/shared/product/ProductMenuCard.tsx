import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import { type Product } from "@/data/mock/products";

interface ProductMenuCardProps {
  product: Product;
  onAddToCart: (id: string) => void;
}

export const ProductMenuCard: React.FC<ProductMenuCardProps> = ({
  product,
  onAddToCart,
}) => {
  // Format price in Rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="hover:bg-accent/10 relative flex flex-col rounded-lg border p-4 transition-colors">
      {product.image && (
        <div className="mb-3 h-32 w-full overflow-hidden rounded-md relative">
          <Image
            unoptimized
            fill
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="line-clamp-2 font-medium">{product.name}</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            {formatPrice(product.price)}
          </p>
        </div>

        <Button
          size="icon"
          // variant="secondary"
          onClick={() => onAddToCart(product.id)}
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
