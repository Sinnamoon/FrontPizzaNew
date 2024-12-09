export type Pizza = {
  id: number;
  name: string;
  base: "cream" | "tomato";
  ingredients: string[];
  image?: string;
};

export type CartItem = Pizza & { quantity: number };
