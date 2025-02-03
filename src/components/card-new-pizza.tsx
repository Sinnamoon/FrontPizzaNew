import { Pizza } from "@/types/pizza.type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useMemo, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Plus } from "lucide-react";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "./ui/select";
import { allIngredients } from "@/constant/ingredients";
import { Button } from "./ui/button";
import { initialPizzas } from "@/constant/initial-pizza";
import { CardPizza } from "./card-pizza";

export const NewPizzaCard = ({
  onNewPizza,
}: {
  onNewPizza: (pizza: Pizza) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newPizza, setNewPizza] = useState<Omit<Pizza, "id" | "image">>({
    name: "",
    base: "tomato",
    ingredients: [],
    price: 10,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNewPizza({ ...newPizza, id: Date.now() });
    setIsOpen(false);
    setNewPizza({
      name: "",
      base: "tomato",
      ingredients: [],
      price: 10,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:bg-gray-100 transition-colors">
          <CardContent className="flex items-center justify-center h-full">
            <Plus className="w-12 h-12 text-gray-400" />
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a New Pizza</DialogTitle>
            <DialogDescription>Add a new pizza to the menu.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="">
                Name
              </Label>
              <Input
                id="name"
                value={newPizza.name}
                onChange={(e) =>
                  setNewPizza({ ...newPizza, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="base" className="">
                Base
              </Label>
              <RadioGroup
                id="base"
                value={newPizza.base}
                onValueChange={(value) =>
                  setNewPizza({
                    ...newPizza,
                    base: value as "cream" | "tomato",
                  })
                }
                className="col-span-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tomato" id="tomato" />
                  <Label htmlFor="tomato">Tomato</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cream" id="cream" />
                  <Label htmlFor="cream">Cream</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="ingredients" className="text-right">
                Ingredients
              </Label>
              <Select
                onValueChange={(value) =>
                  setNewPizza({
                    ...newPizza,
                    ingredients: [...newPizza.ingredients, value],
                    price: newPizza.ingredients.includes(value)
                      ? newPizza.price - 1
                      : newPizza.price + 1,
                  })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select ingredients" />
                </SelectTrigger>
                <SelectContent>
                  {allIngredients.map((ingredient) => (
                    <SelectItem key={ingredient} value={ingredient}>
                      {ingredient}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {newPizza.ingredients.length > 0 && (
                <div className="text-sm">
                  Selected ingredients: {newPizza.ingredients.join(", ")}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Suggested Pizzas :</Label>
              <div className="grid overflow-auto max-h-[350px] gap-3">
                {initialPizzas
                  .filter((pizza) =>
                    pizza.ingredients.some((i) =>
                      newPizza.ingredients.includes(i)
                    )
                  )
                  .map((pizza) => (
                    <CardPizza key={pizza.id} pizza={pizza} />
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Total</Label>
              <div>{newPizza.price}€</div>
            </div>
          </div>

          <DialogFooter className="mt-5">
            <Button type="submit">Add Pizza</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
