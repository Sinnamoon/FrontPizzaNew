import { useState } from 'react'
import { Search, Plus, ShoppingCart, Minus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'
import { initialPizzas } from '@/constant/initial-pizza'
import { CardPizza } from '@/components/card-pizza'
import { CartItem } from '@/types/pizza.type'

type Pizza = {
  id: number;
  name: string;
  base: 'cream' | 'tomato';
  ingredients: string[];
}


export default function HomePage() {
  const [pizzas, setPizzas] = useState<Pizza[]>(initialPizzas)
  const [searchTerm, setSearchTerm] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const navigate = useNavigate();

  const filteredPizzas = pizzas.filter((pizza) =>
    pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pizza.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleNewPizza = (newPizza: Pizza) => {
    setPizzas([...pizzas, newPizza])
  }

  const updateCart = (pizza: Pizza, quantity: number) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === pizza.id);
      if (existingItemIndex !== -1) {
        if (quantity === 0) {
          return prevItems.filter(item => item.id !== pizza.id);
        }
        const newItems = [...prevItems];
        newItems[existingItemIndex] = { ...newItems[existingItemIndex], quantity };
        return newItems;
      }
      if (quantity > 0) {
        return [...prevItems, { ...pizza, quantity }];
      }
      return prevItems;
    });
  }

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
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cartItems.length > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            {cartItems.length === 0 ? (
              <p className="text-center mt-4">Your cart is empty</p>
            ) : (
              <div className="mt-4 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => updateCart(item, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => updateCart(item, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <SheetFooter>
              <Button 
                className="mt-4 w-full" 
                onClick={() => navigate('/order')}
                disabled={cartItems.length === 0}
              >
                Proceed to Order
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPizzas.map((pizza) => (
          <CardPizza 
            key={pizza.id} 
            pizza={pizza} 
            cartItem={cartItems.find(item => item.id === pizza.id)}
            onUpdateCart={updateCart} 
          />
        ))}
        {/* <NewPizzaCard onNewPizza={handleNewPizza} /> */}
      </div>
    </div>
  )
}