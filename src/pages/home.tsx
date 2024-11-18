import { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import { Input } from "@/components/ui/input"

import { Pizza } from '@/types/pizza.type'
import { initialPizzas } from '@/constant/initial-pizza'
import { CardPizza } from '@/components/card-pizza'
import { CardNewPizza } from '@/components/card-add-pizza'

export default function Home() {
  const [pizzas, setPizzas] = useState<Pizza[]>(initialPizzas)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPizzas = pizzas.filter((pizza) =>
    pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pizza.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleNewPizza = (newPizza: Pizza) => {
    setPizzas([...pizzas, newPizza])
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 relative">
        <Input
          type="text"
          placeholder="Search pizzas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPizzas.map((pizza) => (
          <CardPizza key={pizza.id} pizza={pizza} />
        ))}
        <CardNewPizza onNewPizza={handleNewPizza} />
      </div>
    </div>
  )
}