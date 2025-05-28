import { Button } from "@/components/ui/button";

export interface Order {
  id: string;
  totalAmount: number;
  totalItems: number;
  status: "Processing" | "Finished";
}

interface OrderCardProps {
  order: Order;
  onFinishOrder?: (orderId: string) => void;
}

export const OrderCard = ({ order, onFinishOrder }: OrderCardProps) => {
  const handleFinishOrder = () => {
    if (onFinishOrder) {
      onFinishOrder(order.id);
    }
  };

  return (
    <div className="rounded-lg border p-4 shadow-sm bg-card">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium text-sm text-muted-foreground">Order ID</h4>
          <p className="font-mono text-sm">{order.id}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          order.status === "Processing" 
            ? "bg-yellow-100 text-yellow-800" 
            : "bg-green-100 text-green-800"
        }`}>
          {order.status}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-medium text-sm text-muted-foreground">Total Amount</h4>
          <p className="text-lg font-bold">${order.totalAmount.toFixed(2)}</p>
        </div>
        <div>
          <h4 className="font-medium text-sm text-muted-foreground">Total Items</h4>
          <p className="text-lg font-bold">{order.totalItems}</p>
        </div>
      </div>

      {order.status === "Processing" && (
        <Button 
          onClick={handleFinishOrder}
          className="w-full"
          size="sm"
        >
          Finish Order
        </Button>
      )}
    </div>
  );
}; 