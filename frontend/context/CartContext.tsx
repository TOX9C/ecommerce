"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getProducts } from "../utils/mockData";

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
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const loadCart = () => {
            if (typeof window === 'undefined') return;

            const cartStr = localStorage.getItem('mock_cart');
            if (cartStr) {
                try {
                    const cartItems = JSON.parse(cartStr);
                    const products = getProducts();

                    // Populate product details from mock data
                    const itemsWithDetails = cartItems.map((item: any) => {
                        const product = products.find(p => p.id === item.productId);
                        return {
                            productId: item.productId,
                            quantity: item.quantity,
                            product: product ? {
                                name: product.name,
                                price: product.price,
                                category: product.category,
                                ProductImages: product.ProductImages
                            } : null
                        };
                    });

                    setItems(itemsWithDetails);
                } catch (e) {
                    console.error('Failed to load cart', e);
                }
            }
        };

        loadCart();
    }, []);

    const addToCart = async (productId: number, quantity: number) => {
        setIsLoading(true);
        try {
            const products = getProducts();
            const product = products.find(p => p.id === productId);

            if (!product) {
                throw new Error('Product not found');
            }

            setItems(prev => {
                const existing = prev.find(i => i.productId === productId);
                let newItems;

                if (existing) {
                    newItems = prev.map(i =>
                        i.productId === productId
                            ? { ...i, quantity: i.quantity + quantity }
                            : i
                    );
                } else {
                    newItems = [
                        ...prev,
                        {
                            productId,
                            quantity,
                            product: {
                                name: product.name,
                                price: product.price,
                                category: product.category,
                                ProductImages: product.ProductImages
                            }
                        }
                    ];
                }

                // Save to localStorage
                localStorage.setItem('mock_cart', JSON.stringify(
                    newItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))
                ));

                return newItems;
            });
        } catch (error) {
            console.error('Add to cart error', error);
        } finally {
            setIsLoading(false);
        }
    };

    const removeFromCart = async (productId: number) => {
        setIsLoading(true);
        try {
            setItems(prev => {
                const newItems = prev.filter(i => i.productId !== productId);

                // Save to localStorage
                localStorage.setItem('mock_cart', JSON.stringify(
                    newItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))
                ));

                return newItems;
            });
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const clearCart = () => {
        setItems([]);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('mock_cart');
        }
    };

    const total = items.reduce((acc, item) => {
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
