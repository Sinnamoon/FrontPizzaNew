import { Pizza } from "@/types/pizza.type"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Plus } from "lucide-react"
import { DialogFooter, DialogHeader } from "./ui/dialog"
import { Input } from "./ui/input"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { allIngredients } from "@/constant/ingredients"

export const NewPizzaCard = ({ onNewPizza }: { onNewPizza: (pizza: Pizza) => void }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [newPizza, setNewPizza] = useState<Omit<Pizza, 'id'>>({
    name: '',
    base: 'tomato',
    ingredients: [],
    image: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNewPizza({ ...newPizza, id: Date.now() })
    setIsOpen(false)
    setNewPizza({ name: '', base: 'tomato', ingredients: [], image: "" })
  }

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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newPizza.name}
                onChange={(e) => setNewPizza({ ...newPizza, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="base" className="text-right">
                Base
              </Label>
              <RadioGroup
                id="base"
                value={newPizza.base}
                onValueChange={(value) => setNewPizza({ ...newPizza, base: value as 'cream' | 'tomato' })}
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ingredients" className="text-right">
                Ingredients
              </Label>
              <Select
                onValueChange={(value) => setNewPizza({ ...newPizza, ingredients: [...newPizza.ingredients, value] })}
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
            </div>
            {newPizza.ingredients.length > 0 && (
              <div className="col-span-3 col-start-2">
                Selected ingredients: {newPizza.ingredients.join(', ')}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Create Pizza</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}