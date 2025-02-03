import {persist} from "zustand/middleware";
import {create} from "zustand";
import {User} from "@/types/user.type";

export const useUserStore = create(
    persist<{
        idSequence: number;
        users: User[];
        currentUser: User | null;
        emailExists: (email: string) => boolean;
        register: (user: User) => void;
        login: (email: string, password: string) => boolean;
        logout: () => void;
    }>(
        (set, get) => ({
            idSequence: 1,
            users: [],
            currentUser: null,
            emailExists: (email: string): boolean => {
                const {users} = get();

                return !!users.find(user => user.email === email);
            },
            register: (user: User) => {
                set(state => {
                    user.id = state.idSequence++
                    state.users.push(user);
                    state.currentUser = user;

                    return state;
                });
            },
            login: (email: string, password: string): boolean => {
                let success = false;

                set(state => {
                    const user = state.users.find(user => user.email === email && user.password === password);
                    if (user) {
                        state.currentUser = user;
                        success = true;
                    }

                    return state;
                });

                return success;
            },
            logout: () => {
                console.info("Logging out ..."); // TODO: remove
                set(state => {
                    state.currentUser = null;
                    return state;
                })
            }
        }),
        {
            name: "user-storage",
        }
    )
);