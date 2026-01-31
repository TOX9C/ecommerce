"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import api from "../utils/api";
import { useAuth } from "./AuthContext";

export interface CartItem {
    id?: number;
    productId: number;
    quantity: number;
    product?: {
        name: string;
        price: number;
        category?: string;
        imgUrl?: string[];
        ProductImages?: { url: string }[];
    };
}

interface CartContextType {
    items: CartItem[];
    addToCart: (productId: number, quantity: number) => Promise<void>;
    removeFromCart: (productId: number) => Promise<void>;
    clearCart: () => void;
    isLoading: boolean;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const { user, token } = useAuth();
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Load local cart on mount
    useEffect(() => {
        if (!user) {
            const localCart = localStorage.getItem("cart");
            if (localCart) {
                setItems(JSON.parse(localCart));
            }
        }
    }, [user]);

    // Sync with backend when user logs in
    useEffect(() => {
        if (user && token) {
            syncCart();
        }
    }, [user, token]);

    const syncCart = async () => {
        setIsLoading(true);
        try {
            // 1. Get backend cart
            const res = await api.get("/cart");
            const backendItems = res.data.items.map((item: any) => ({
                productId: item.productId,
                quantity: item.quantity,
                product: item.product
            }));

            // 2. Merge local items if any
            const localCartStr = localStorage.getItem("cart");
            if (localCartStr) {
                const localItems: CartItem[] = JSON.parse(localCartStr);
                for (const localItem of localItems) {
                    // Determine if we need to add to backend
                    // For simplicity, just add them one by one. 
                    // In a real app, we'd batch this or check existence.
                    await api.post("/cart/add", { id: localItem.productId, quantity: localItem.quantity });
                }
                localStorage.removeItem("cart");
                // Re-fetch to get updated state
                const updatedRes = await api.get("/cart");
                setItems(updatedRes.data.items.map((item: any) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    product: item.product
                })));
            } else {
                setItems(backendItems);
            }
        } catch (error) {
            console.error("Failed to sync cart", error);
        } finally {
            setIsLoading(false);
        }
    };

    const addToCart = async (productId: number, quantity: number) => {
        if (user) {
            try {
                await api.post("/cart/add", { id: productId, quantity });
                // Optimistic update or refetch
                syncCart();
            } catch (error) {
                console.error("Add to cart error", error);
            }
        } else {
            setItems(prev => {
                const existing = prev.find(i => i.productId === productId);
                let newItems;
                if (existing) {
                    newItems = prev.map(i => i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i);
                } else {
                    newItems = [...prev, { productId, quantity }];
                }
                localStorage.setItem("cart", JSON.stringify(newItems));
                return newItems;
            });
        }
    };

    const removeFromCart = async (productId: number) => {
        if (user) {
            try {
                await api.post("/cart/remove", { id: productId });
                syncCart();
            } catch (e) {
                console.error(e);
            }
        } else {
            setItems(prev => {
                const newItems = prev.filter(i => i.productId !== productId);
                localStorage.setItem("cart", JSON.stringify(newItems));
                return newItems;
            });
        }
    };

    const clearCart = () => {
        setItems([]);
        if (!user) {
            localStorage.removeItem("cart");
        }
    };

    const total = items.reduce((acc, item) => {
        // Note: Product price might not be available in local cart if we don't store it.
        // We should probably store product details in local cart too.
        return acc + (item.quantity * (item.product?.price || 0));
    }, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, isLoading, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
