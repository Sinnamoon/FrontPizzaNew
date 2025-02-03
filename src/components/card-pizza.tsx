import { Minus, Plus, Star } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Pizza } from "@/types/pizza.type";
import { useCartStore } from "@/store/cart-store";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useFavoriteStore } from "@/store/favorite-store";

export const CardPizza: React.FC<{
  pizza: Pizza;
}> = ({ pizza }) => {
  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const { updateCart, cart } = useCartStore();
  const favoriteStore = useFavoriteStore((state) => state);

  const isFavorite = useMemo(() => {
    return favoriteStore.favorite.find((item) => item.id === pizza.id);
  }, [favoriteStore.favorite, pizza.id]);

  const cartItem = useMemo(() => {
    return cart.find((item) => item.id === pizza.id);
  }, [cart]);

  const handleFavorite = () => {
    console.log("clicked favorite");
    favoriteStore.handleFavorite(pizza);
    console.log(favoriteStore.favorite);
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative w-full">
        <img
          src={pizza.image}
          alt={`${pizza.name} pizza`}
          className="h-48 w-full object-cover"
        />
        <Star
          onClick={() => handleFavorite()}
          className={cn(
            "absolute top-4 right-4 hover:text-yellow-500 hover:fill-yellow-500 transition-all duration-300 cursor-pointer",
            isFavorite && "text-yellow-500 fill-yellow-500"
          )}
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
