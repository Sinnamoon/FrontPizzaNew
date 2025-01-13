import { CartItem } from "@/types/pizza.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Order = {
  cart: CartItem[];
  totalPrice: number;
  email?: string;
  phone?: string;
  pickupTime?: string;
};

export const useOrderStore = create(
  persist<{
    orders: Order[];
    addOrder: (order: Order) => void;
    getByMail: (mail: string) => Order[];
  }>(
    (set, get) => ({
      orders: [],
      addOrder: (order) => {
        set((state) => {
          return { ...state, orders: [...state.orders, order] };
        });
      },
      getByMail: (mail) => {
        return get().orders.filter((order) => order.email === mail);
      },
    }),
    {
      name: "order-storage", // name of the item in the storage (must be unique)
    }
  )
);
