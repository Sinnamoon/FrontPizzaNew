import { Pizza } from "@/types/pizza.type";

export const initialPizzas: Pizza[] = [
  {
    id: 1,
    name: "Margherita",
    base: "tomato",
    ingredients: ["mozzarella", "basil"],
    image: "/images/margherite.jpeg",
  },
  {
    id: 2,
    name: "Pepperoni",
    base: "tomato",
    ingredients: ["mozzarella", "pepperoni"],
    image: "/images/pepperoni.jpg",
  },
  {
    id: 3,
    name: "Quattro Formaggi",
    base: "cream",
    ingredients: ["mozzarella", "gorgonzola", "parmesan", "ricotta"],
    image: "/images/quattro-formaggi.jpg",
  },
];
