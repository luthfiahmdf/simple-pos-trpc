import { PaymentRequest } from "xendit-node";
import { addMinutes } from "date-fns";

export const xenditPaymentRequestClient = new PaymentRequest({
  secretKey: process.env.XENDIT_MONEY_IN_KEY!,
});

type createQRISParams = {
  amount: number;
  orderId: string;
  expirasAt?: Date;
};

export const createQRIS = async (params: createQRISParams) => {
  const paymentRequest = await xenditPaymentRequestClient.createPaymentRequest({
    data: {
      currency: "IDR",
      amount: params.amount,
      referenceId: params.orderId,
      paymentMethod: {
        reusability: "ONE_TIME_USE",
        type: "QR_CODE",
        qrCode: {
          channelCode: "DANA",
          channelProperties: {
            expiresAt: params.expirasAt ?? addMinutes(new Date(), 15),
          },
        },
        referenceId: params.orderId,
      },
    },
  });

  return paymentRequest;
};
