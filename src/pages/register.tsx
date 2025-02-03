import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {useUserStore} from "@/store/user-store";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";

export function RegisterPage() {
    const {emailExists, register} = useUserStore();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        console.log("Register submitted:", {
            firstname: firstName,
            lastname: lastName,
            email,
            phone: phoneNumber,
            password
        });

        if (emailExists(email)) {
            alert("Email already exists");
            return;
        }

        register({id: 0, firstName, lastName, email, phoneNumber, password, history: []});
        navigate("/");
    }

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
                            <div className="space-y-2">
                                <div>
                                    <Label htmlFor="firstname">First name</Label>
                                    <Input
                                        id="firstname"
                                        type="text"
                                        placeholder="First name"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="lastname">Last name</Label>
                                    <Input
                                        id="lastname"
                                        type="text"
                                        placeholder="Last name"
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="Phone"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <Button type="submit" className="mt-4 w-fit">
                            Register
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}