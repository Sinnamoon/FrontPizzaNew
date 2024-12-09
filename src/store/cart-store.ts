import { CartItem } from "@/types/pizza.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBearStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item: CartItem) => {
        set((state) => ({
          items: [...state.items, item],
        }));
      },
      removeItem: (item: CartItem) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== item.id),
        }));
      },
      clearItems: () => {
        set({ items: [] });
      },
    }),
    {
      name: "pizza-storage", // name of the item in the storage (must be unique)
    }
  )
);
