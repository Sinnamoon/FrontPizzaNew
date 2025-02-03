import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {useUserStore} from "@/store/user-store";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";

export function LoginPage() {
    const {login} = useUserStore();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        console.log("Login submitted:", {email, password});

        if (login(email, password)) {
            navigate("/");
        } else {
            alert("Bad credentials.");
        }
    }

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
                            <div className="space-y-2">
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
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}