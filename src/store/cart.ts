import { create } from "zustand";

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

type addToCartItem = Omit<CartItem, "quantity">;

interface CartState {
  items: CartItem[];
  addToCart: (newItem: addToCartItem) => void;
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  addToCart: (newItem) => {
    set((state) => {
      const duplicateItems = [...state.items];

      const existItemIndex = duplicateItems.findIndex(
        (Item) => Item.productId === newItem.productId,
      );

      if (existItemIndex === -1) {
        duplicateItems.push({
          productId: newItem.productId,
          name: newItem.name,
          imageUrl: newItem.imageUrl,
          price: newItem.price,
          quantity: 1,
        });
      } else {
        const itemToUpdate = duplicateItems[existItemIndex];

        if (!itemToUpdate)
          return {
            ...state,
          };

        itemToUpdate.quantity += 1;
      }

      return {
        ...state,
        items: duplicateItems,
      };
    });
  },
}));
