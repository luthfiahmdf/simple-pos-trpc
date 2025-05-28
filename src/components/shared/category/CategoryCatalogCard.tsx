import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

export interface CategoryCatalogCardProps {
  name: string;
  productCount: number;
  isSelected?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export const CategoryCatalogCard: React.FC<CategoryCatalogCardProps> = ({
  name,
  productCount,
  isSelected = false,
  onEdit,
  onDelete,
  className,
}) => {
  return (
    <Card
      className={cn(
        "hover:bg-muted/50 transition-colors",
        isSelected ? "border-primary bg-primary/10" : "",
        className,
      )}
    >
      <CardContent className="flex flex-col items-center justify-center p-4 text-center">
        <div className="text-lg font-medium">{name}</div>
        <div className="text-muted-foreground text-sm">
          {productCount} {productCount === 1 ? "Product" : "Products"}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-center gap-2">
        <Button className="flex-1" variant="outline" size="icon" onClick={onEdit}>
          <Pencil />
        </Button>
        <Button className="flex-1" variant="destructive" size="icon" onClick={onDelete}>
          <Trash />
        </Button>
      </CardFooter>
    </Card>
  );
};
