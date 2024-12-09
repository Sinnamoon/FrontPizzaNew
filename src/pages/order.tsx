import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from 'react-router-dom'
import { CartItem } from '@/types/pizza.type'
import { initialPizzas } from '@/constant/initial-pizza'
import { useCartStore } from '@/store/cart-store'

export const OrderPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const {cart, totalPrice, clearCart} = useCartStore()


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the order to your backend
    console.log('Order submitted:', { cart, email, phone, pickupTime })
    // Redirect to a confirmation page or show a success message

    clearCart()
    setEmail('')
    setPhone('')
    setPickupTime('')

  }

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => navigate('/')} className="mb-4">
        Back to Menu
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Your Order</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span>{item.name} - {item.price*item.quantity}€</span>
                    <span>x{item.quantity}</span>
                  </div>
                ))}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Restaurant Information</h2>
                <div>
                  <Label htmlFor="pickupTime">Pickup Time</Label>
                  <Select value={pickupTime} onValueChange={setPickupTime}>
                    <SelectTrigger id="pickupTime">
                      <SelectValue placeholder="Select pickup time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18:00">18:00</SelectItem>
                      <SelectItem value="18:30">18:30</SelectItem>
                      <SelectItem value="19:00">19:00</SelectItem>
                      <SelectItem value="19:30">19:30</SelectItem>
                      <SelectItem value="20:00">20:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            {/* <div className='flex mt-5 justify-between items-center'>
              <span className='text-end font-bold'>Total: {totalPrice}€</span>
            </div> */}
            <Button type="submit" className="mt-4 w-fit">
              Place Order
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}