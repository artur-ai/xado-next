"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = {
    id: string;
    category: string;
    name: string;
    price: string;
    volume: string;
    image: string;
    quantity: number;
};

type CartContextValue = {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: string, category: string) => void;
    updateQuantity: (id: string, category: string, quantity: number) => void;
    totalCount: number;
    totalPrice: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "xado-cart";

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) setItems(JSON.parse(stored));
        } catch {
            // corrupted storage, ignore and start fresh
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addItem = (item: Omit<CartItem, "quantity">) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === item.id && i.category === item.category);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id && i.category === item.category ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeItem = (id: string, category: string) => {
        setItems((prev) => prev.filter((i) => !(i.id === id && i.category === category)));
    };

    const updateQuantity = (id: string, category: string, quantity: number) => {
        if (quantity < 1) {
            removeItem(id, category);
            return;
        }
        setItems((prev) =>
            prev.map((i) => (i.id === id && i.category === category ? { ...i, quantity } : i))
        );
    };

    const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce(
        (sum, i) => sum + (parseFloat(i.price.replace(",", ".")) || 0) * i.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, totalCount, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}