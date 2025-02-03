import {CartItem} from "@/types/pizza.type";

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    history: CartItem[][];
};