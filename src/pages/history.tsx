import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useOrderStore } from "@/store/order-store";

export const HistoryPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const store = useOrderStore();

  const filteredOrders = useMemo(() => {
    return store.getByMail(email);
  }, [email, store]);
  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => navigate("/")} className="mb-4">
        Back to Menu
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div>
              <Label>Enter your email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {filteredOrders.map((order) => (
                <Card key={`${order.totalPrice}-${order.email}`}>
                  <CardHeader>
                    <h2 className="text-xl font-semibold mb-2">
                      Order Summary
                    </h2>
                  </CardHeader>
                  <CardContent>
                    {order.cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center"
                      >
                        <span>
                          {item.name} - {item.price * item.quantity}€
                        </span>
                        <span>x{item.quantity}</span>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        Personal Information
                      </h2>
                      <div className="space-y-2">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            disabled
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
