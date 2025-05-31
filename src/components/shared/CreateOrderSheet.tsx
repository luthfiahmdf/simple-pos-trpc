import { Button } from "../ui/button";

import { PRODUCTS } from "@/data/mock";
import { toRupiah } from "@/utils/toRupiah";
import { CheckCircle2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "../ui/alert-dialog";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { PaymentQRCode } from "./PaymentQrCode";
import { useCartStore } from "@/store/cart";
import { api } from "@/utils/api";

type OrderItemProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

const OrderItem = ({ id, name, price, quantity, imageUrl }: OrderItemProps) => {
  return (
    <div className="flex gap-3" key={id}>
      <div className="relative aspect-square h-20 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={imageUrl ?? ""}
          alt={name}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col">
          <p>{name}</p>
          <p className="text-muted-foreground text-sm">
            {toRupiah(price)} x {quantity}
          </p>
        </div>

        <div className="flex w-full justify-between">
          <p className="font-medium">{toRupiah(quantity * price)}</p>

          <div className="flex items-center gap-3">
            <button className="bg-secondary hover:bg-secondary/80 cursor-pointer rounded-full p-1">
              <Minus className="h-4 w-4" />
            </button>

            <span className="text-sm">{quantity}</span>

            <button className="bg-secondary hover:bg-secondary/80 cursor-pointer rounded-full p-1">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

type CreateOrderSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateOrderSheet = ({
  open,
  onOpenChange,
}: CreateOrderSheetProps) => {
  const cartStore = useCartStore();

  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentInfoLoading, setPaymentInfoLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const subTotal = cartStore.items.reduce((a, b) => {
    return a + b.price * b.quantity;
  }, 0);

  const tax = useMemo(() => subTotal * 0.1, [subTotal]);
  const grandTotal = useMemo(() => subTotal + tax, [subTotal, tax]);

  const { mutate: createOrder, data: createOrderResponse } =
    api.order.createOrder.useMutation({
      onSuccess: () => {
        setPaymentDialogOpen(true);
      },
    });

  const handleCreateOrder = () => {
    createOrder({
      orderItems: cartStore.items.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      }),
    });
    // setPaymentDialogOpen(true);
    // setPaymentInfoLoading(true);

    // setTimeout(() => {
    //   setPaymentInfoLoading(false);
    // }, 3000);
  };

  const handleRefresh = () => {
    setPaymentSuccess(true);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full">
          <SheetHeader>
            <SheetTitle className="text-2xl">Create New Order</SheetTitle>
            <SheetDescription>
              Add products to your cart and create a new order.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 overflow-y-scroll p-4">
            <h1 className="text-xl font-medium">Order Items</h1>
            <div className="flex flex-col gap-6">
              {cartStore.items.map((item) => (
                <OrderItem
                  key={item.productId}
                  id={item.productId}
                  name={item.name}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  quantity={item.quantity}
                />
              ))}
            </div>
          </div>

          <SheetFooter>
            <h3 className="text-lg font-medium">Payment Details</h3>

            <div className="grid grid-cols-2 gap-2">
              <p>Subtotal</p>
              <p className="place-self-end">{toRupiah(subTotal)}</p>

              <p>Tax</p>
              <p className="place-self-end">{toRupiah(tax)}</p>

              <Separator className="col-span-2" />

              <p>Total</p>

              <p className="place-self-end">{toRupiah(grandTotal)}</p>
            </div>

            <Button
              size="lg"
              className="mt-8 w-full"
              onClick={handleCreateOrder}
            >
              Create Order
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <AlertDialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <AlertDialogContent>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-lg font-medium">Finish Payment</p>

            {paymentInfoLoading ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="border-primary h-10 w-10 animate-spin rounded-full border-t-2 border-b-2 border-l-2" />

                <p>Loading...</p>
              </div>
            ) : (
              <>
                <Button variant="link" onClick={handleRefresh}>
                  Refresh
                </Button>

                {!paymentSuccess ? (
                  <PaymentQRCode
                    qrString={createOrderResponse?.qrString ?? ""}
                  />
                ) : (
                  <CheckCircle2 className="size-80 text-green-500" />
                )}

                <p className="text-3xl font-medium">
                  {toRupiah(createOrderResponse?.order.grandTotal ?? 0)}
                </p>

                <p className="text-muted-foreground text-sm">
                  Transaction ID: {createOrderResponse?.order.id}
                </p>
              </>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button
                disabled={paymentInfoLoading}
                variant="outline"
                className="w-full"
              >
                Done
              </Button>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
