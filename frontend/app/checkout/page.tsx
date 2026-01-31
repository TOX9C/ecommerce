"use client";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import AuthForm from "@/comp/AuthForm";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/utils/api";
import Image from "next/image";

export default function CheckoutPage() {
    const { user, isLoading } = useAuth();
    const { items, total, clearCart } = useCart();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [authMode, setAuthMode] = useState<"login" | "register">("login");
    const [placingOrder, setPlacingOrder] = useState(false);

    useEffect(() => {
        const mode = searchParams.get("mode");
        if (mode === "register") setAuthMode("register");
        else setAuthMode("login");
    }, [searchParams]);

    const handlePlaceOrder = async () => {
        setPlacingOrder(true);
        try {
            await api.post("/order/make");
            clearCart();
            alert("Order placed successfully!");
            router.push("/");
        } catch (error) {
            console.error("Failed to place order", error);
            alert("Failed to place order.");
        } finally {
            setPlacingOrder(false);
        }
    };

    if (isLoading) return <div className="min-h-screen pt-32 text-center">Loading...</div>;

    if (items.length === 0 && !placingOrder) {
        return (
            <div className="min-h-screen pt-32 text-center px-4">
                <h1 className="text-2xl font-bold mb-4">Your bag is empty</h1>
                <button onClick={() => router.push("/")} className="text-blue-500 hover:underline">Continue Shopping</button>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-32 px-6 bg-[#f5f5f7] flex justify-center pb-20">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Col: Auth or Shipping Info (Mocked) */}
                <div>
                    {!user ? (
                        <div>
                            <h2 className="text-2xl font-semibold mb-6">{authMode === 'login' ? 'Sign In' : 'Create Account'} to Checkout</h2>
                            <AuthForm mode={authMode} isInline={true} />
                            <div className="mt-4 text-center text-sm">
                                {authMode === 'login' ? (
                                    <button onClick={() => setAuthMode("register")} className="text-blue-500 hover:underline">
                                        Need an account? Sign Up
                                    </button>
                                ) : (
                                    <button onClick={() => setAuthMode("login")} className="text-blue-500 hover:underline">
                                        Already have an account? Sign In
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
                            <div className="space-y-4">
                                <p className="text-gray-600">Logged in as <span className="font-semibold text-gray-900">{user.username || "User"}</span></p>
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-500">
                                    NOTE: This is a demo. No real shipping information is collected due to current constraints.
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Col: Order Summary */}
                <div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 sticky top-32">
                        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                            {items.map(item => (
                                <div key={item.productId} className="flex justify-between items-start">
                                    <div className="flex gap-3">
                                        <div className="bg-gray-100 rounded-md w-12 h-12 flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                                            <Image
                                                src={item.product?.imgUrl?.[0] || "https://dummyimage.com/50x50/ccc/000.png&text=X"}
                                                alt={item.product?.name || "Product"}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{item.product?.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-medium text-sm">${((item.product?.price || 0) * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 pt-4 space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>FREE</span>
                            </div>
                            <div className="flex justify-between text-xl font-semibold text-[#1d1d1f] pt-2">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={!user || placingOrder}
                            className="w-full mt-8 bg-[#0071e3] hover:bg-[#0077ed] text-white py-4 rounded-full font-medium transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {placingOrder ? "Placing Order..." : user ? "Place Order" : "Sign In to Continue"}
                        </button>
                        {!user && <p className="text-center text-xs text-gray-400 mt-2">You must be logged in to complete checkout.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
