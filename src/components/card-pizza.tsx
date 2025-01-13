import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CartItem, Pizza } from "@/types/pizza.type";
import { useCartStore } from "@/store/cart-store";
import { useMemo } from "react";

export const CardPizza = ({ pizza }: { pizza: Pizza }) => {
  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const { updateCart, cart } = useCartStore();

  const cartItem = useMemo(() => {
    return cart.find((item) => item.id === pizza.id);
  }, [cart]);

  return (
    <Card className="overflow-hidden">
      <div className="relative w-full">
        <img
          src={pizza.image}
          alt={`${pizza.name} pizza`}
          className="h-48 w-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{pizza.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Base: {pizza.base}</p>
        <p>Ingredients: {pizza.ingredients.join(", ")}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        {cartItem ? (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateCart(pizza, cartItem.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span>{cartItem.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateCart(pizza, cartItem.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button onClick={() => updateCart(pizza, 1)}>Add to Cart</Button>
        )}

        <div>
          <span>{pizza.price}€</span>
        </div>
      </CardFooter>
    </Card>
  );
};
