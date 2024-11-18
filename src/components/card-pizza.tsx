import { Pizza } from "@/types/pizza.type";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const CardPizza = ({ pizza }: { pizza: Pizza }) => {
    // Generate a unique color for each pizza
    const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    
    return (
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full">
          {/* <img
            src={`/placeholder.svg?height=200&width=300&background=${color.slice(1)}`}
            alt={`Image of ${pizza.name} pizza`}
          /> */}
        </div>
        <CardHeader>
          <CardTitle>{pizza.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Base: {pizza.base}</p>
          <p>Ingredients: {pizza.ingredients.join(', ')}</p>
        </CardContent>
      </Card>
    )
  }