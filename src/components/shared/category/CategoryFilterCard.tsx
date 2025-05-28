type CategoryFilterCardProps = {
  name: string;
  productCount: number;
  isSelected: boolean;
  onClick: () => void;
};

export const CategoryFilterCard = ({
  name,
  productCount,
  isSelected,
  onClick,
}: CategoryFilterCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-muted/50 flex min-w-[210px] flex-col items-center justify-center rounded-lg border p-4 text-center transition-colors ${
        isSelected ? "border-primary bg-primary/10" : ""
      }`}
    >
      <div className="text-lg font-medium">{name}</div>
      <div className="text-muted-foreground text-sm">
        {productCount} Product{productCount === 1 ? "" : "s"}
      </div>
    </button>
  );
};
