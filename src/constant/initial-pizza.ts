import { Pizza } from "@/types/pizza.type";

export const initialPizzas: Pizza[] = [
  {
    id: 1,
    name: "Margherita",
    base: "tomato",
    ingredients: ["mozzarella", "basil"],
  },
  {
    id: 2,
    name: "Pepperoni",
    base: "tomato",
    ingredients: ["mozzarella", "pepperoni"],
  },
  {
    id: 3,
    name: "Quattro Formaggi",
    base: "cream",
    ingredients: ["mozzarella", "gorgonzola", "parmesan", "ricotta"],
  },
];
