import { CartItem, Pizza } from "@/types/pizza.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoriteStore = create(
  persist<{
    favorite: Pizza[];
    clearStore: () => void;
    handleFavorite: (pizza: Pizza) => void;
  }>(
    (set, get) => ({
      favorite: [],
      handleFavorite: (pizza: Pizza) => {
        set((state) => {
          if (state.favorite.find((item) => item.id === pizza.id)) {
            return {
              favorite: state.favorite.filter((item) => item.id !== pizza.id),
            };
          }
          //Add to favorite
          return { favorite: [...state.favorite, pizza] };
        });
      },
      clearStore: () => {
        set({ favorite: [] });
      },
    }),
    {
      name: "pizza-favorite", // name of the item in the storage (must be unique)
    }
  )
);
