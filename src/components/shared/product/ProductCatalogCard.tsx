import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { toRupiah } from "@/utils/toRupiah";

export interface ProductCatalogCardProps {
  name: string;
  price: number;
  image?: string;
  category: string;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export const ProductCatalogCard: React.FC<ProductCatalogCardProps> = ({
  name,
  price,
  image,
  category,
  onEdit,
  onDelete,
  className,
}) => {
  return (
    <Card className={cn("pt-0 overflow-hidden", className)}>
      <div className="relative h-48 w-full overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="bg-muted flex h-full w-full items-center justify-center">
            No image
          </div>
        )}
      </div>

      <CardContent>
        <div className="mb-1 text-lg font-medium">{name}</div>
        <div className="text-primary text-xl font-semibold">
          {toRupiah(price)}
        </div>
        <div className="text-muted-foreground mt-1 text-sm">
          Category: {category}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-center gap-2">
        <Button className="flex-1" variant="outline" size="sm" onClick={onEdit}>
          <Pencil className="mr-2 h-4 w-4" />
        </Button>
        <Button
          className="flex-1"
          variant="destructive"
          size="sm"
          onClick={onDelete}
        >
          <Trash className="mr-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
