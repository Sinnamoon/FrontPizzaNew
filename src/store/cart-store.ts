import { CartItem, Pizza } from "@/types/pizza.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist<{
    cart: CartItem[];
    totalPrice: number;
    updateCart: (pizza: Pizza, quantity: number) => void;
    clearCart: () => void;
  }>(
    (set, get) => ({
      cart: [],
      totalPrice: 0,
      updateCart: (pizza: Pizza, quantity: number) => {
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (item) => item.id === pizza.id
          );
          if (existingItemIndex !== -1) {
            if (quantity === 0) {
              return {
                cart: state.cart.filter((item) => item.id !== pizza.id),
                totalPrice: state.totalPrice - pizza.price,
              };
            }
            const newItems = [...state.cart];
            newItems[existingItemIndex] = {
              ...newItems[existingItemIndex],
              quantity,
            };
            return {
              cart: newItems,
              totalPrice: state.totalPrice + pizza.price * quantity,
            };
          }
          if (quantity > 0) {
            return {
              cart: [...state.cart, { ...pizza, quantity }],
              totalPrice: state.totalPrice + pizza.price * quantity,
            };
          }
          return {
            cart: state.cart.map((item) =>
              item.id === pizza.id ? { ...item, quantity } : item
            ),
            totalPrice: state.totalPrice,
          };
        });
      },
      clearCart: () => {
        set({ cart: [], totalPrice: 0 });
      },
    }),
    {
      name: "pizza-storage", // name of the item in the storage (must be unique)
    }
  )
);
