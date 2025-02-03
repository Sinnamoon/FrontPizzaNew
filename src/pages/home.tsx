import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  ShoppingCart,
  Minus,
  Filter,
  X,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { initialPizzas } from "@/constant/initial-pizza";
import { CardPizza } from "@/components/card-pizza";
import { CartItem, Pizza } from "@/types/pizza.type";
import { useCartStore } from "@/store/cart-store";
import { useUserStore } from "@/store/user-store";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { allIngredients } from "@/constant/ingredients";
import { NewPizzaCard } from "@/components/card-new-pizza";
import { useFavoriteStore } from "@/store/favorite-store";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [pizzas, setPizzas] = useState<Pizza[]>(initialPizzas);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [ingredientFilters, setIngredientFilters] = useState<string[]>([]);
  const [filterFavorite, setFilterFavorite] = useState(false);
  const [baseFilter, setBaseFilter] = useState<"all" | "cream" | "tomato">(
    "all"
  );
  const navigate = useNavigate();
  const { currentUser, register, login, logout } = useUserStore();
  const { cart, totalPrice, updateCart } = useCartStore();
  const favoriteStore = useFavoriteStore();

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const handleNewPizza = (newPizza: Pizza) => {
    setPizzas([...pizzas, newPizza]);
  };

  const filteredPizzas = pizzas
    .filter((pizza) => {
      return filterFavorite
        ? favoriteStore.favorite.find((p) => p.id === pizza.id)
        : true;
    })
    .filter((pizza) => {
      const matchesSearch =
        pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pizza.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesBase = baseFilter === "all" || pizza.base === baseFilter;
      const matchesIngredients =
        ingredientFilters.length === 0 ||
        ingredientFilters.every((ing) => pizza.ingredients.includes(ing));
      return matchesSearch && matchesBase && matchesIngredients;
    });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center gap-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search pizzas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Button
          variant="outline"
          onClick={() => setFilterFavorite(!filterFavorite)}
        >
          <Star
            className={cn(
              " h-4 w-4 transition-all duration-300 cursor-pointer",
              filterFavorite && "text-yellow-500 fill-yellow-500"
            )}
          />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className=" h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="flex w-full items-center justify-between">
              <span>Pizza Base</span>
              {baseFilter !== "all" && (
                <X onClick={(e) => setBaseFilter("all")} />
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={baseFilter === "all"}
              onCheckedChange={() => setBaseFilter("all")}
            >
              All
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={baseFilter === "tomato"}
              onCheckedChange={() => setBaseFilter("tomato")}
            >
              Tomato
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={baseFilter === "cream"}
              onCheckedChange={() => setBaseFilter("cream")}
            >
              Cream
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="flex justify-between items-center w-full">
              <span>Ingredients</span>
              {Boolean(ingredientFilters.length) && (
                <X onClick={(e) => setIngredientFilters([])} />
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allIngredients
              .filter(
                (ingredient) =>
                  filteredPizzas.filter((pizza) =>
                    pizza.ingredients.includes(ingredient)
                  ).length > 0
              )
              .map((ingredient) => (
                <DropdownMenuCheckboxItem
                  key={ingredient}
                  checked={ingredientFilters.includes(ingredient)}
                  onCheckedChange={(checked) => {
                    setIngredientFilters((prev) =>
                      checked
                        ? [...prev, ingredient]
                        : prev.filter((i) => i !== ingredient)
                    );
                  }}
                >
                  {ingredient} (
                  {
                    filteredPizzas.filter((pizza) =>
                      pizza.ingredients.includes(ingredient)
                    ).length
                  }
                  )
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cart.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center"
                >
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            {cart.length === 0 ? (
              <p className="text-center mt-4">Your cart is empty</p>
            ) : (
              <div className="mt-4 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCart(item, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCart(item, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div>
                        <span>{item.price * item.quantity}€</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <SheetFooter>
              <Button
                className="mt-4 w-full"
                onClick={() => navigate("/order")}
                disabled={cart.length === 0}
              >
                Proceed to Order
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <Popover>
          <PopoverTrigger className="relative">
            <User className="h-4 w-4" />
          </PopoverTrigger>
          <PopoverContent className="justify-center">
            {currentUser ? (
              <Button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </Button>
            ) : (
              <div className="flex justify-around">
                <Button onClick={() => navigate("/login")}>Login</Button>
                <Button onClick={() => navigate("/register")}>Register</Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPizzas.map((pizza) => (
          <CardPizza key={pizza.id} pizza={pizza} />
        ))}
        <NewPizzaCard onNewPizza={(newPizza) => updateCart(newPizza, 1)} />
      </div>
    </div>
  );
}
