"use client";
import { useState, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import AuthForm from "@/comp/AuthForm";
import api from "@/utils/api";

function CheckoutContent() {
    const router = useRouter();
    const { user, isLoading: authLoading } = useAuth();
    const { items, total, clearCart } = useCart();
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode") || "login";

    const [orderLoading, setOrderLoading] = useState(false);

    const handleCheckout = async () => {
        if (!user) {
            alert("Please sign in to complete your order");
            return;
        }

        try {
            setOrderLoading(true);
            await api.post("/order/make");
            clearCart();
            router.push("/");
            alert("Order placed successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to place order");
        } finally {
            setOrderLoading(false);
        }
    };

    if (authLoading) return <div className="min-h-screen pt-32 text-center">Loading...</div>;
    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-32 px-6 bg-[#f5f5f7] flex justify-center pb-20">
                <div className="max-w-4xl w-full text-center">
                    <h1 className="text-4xl font-semibold mb-4 text-[#1d1d1f]">Your cart is empty</h1>
                    <button
                        onClick={() => router.push("/products")}
                        className="bg-[#0071e3] hover:bg-[#0077ed] text-white px-6 py-3 rounded-full font-medium transition-all"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 px-4 md:px-6 bg-[#f5f5f7] flex justify-center pb-20">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Left: Auth or Shipping */}
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold mb-6 text-[#1d1d1f]">
                        {user ? "Review Your Order" : "Sign In or Continue as Guest"}
                    </h1>
                    {!user ? (
                        <AuthForm mode={mode === "register" ? "register" : "login"} redirectOnSuccess="/checkout" isInline />
                    ) : (
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                            <p className="text-[#86868b] mb-2">Logged in as:</p>
                            <p className="font-medium text-[#1d1d1f]">{user.username}</p>
                        </div>
                    )}
                </div>

                {/* Right: Order Summary */}
                <div>
                    <h2 className="text-xl md:text-2xl font-semibold mb-6 text-[#1d1d1f]">Order Summary</h2>
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 sticky top-32">
                        <div className="space-y-4 mb-6">
                            {items.map((item) => (
                                <div key={item.productId} className="flex gap-4">
                                    <img
                                        src={
                                            item.product?.ProductImages?.[0]?.url ||
                                            item.product?.imgUrl?.[0] ||
                                            "https://dummyimage.com/80x80/ccc/000.png&text=Product"
                                        }
                                        alt={item.product?.name || "Product"}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-[#1d1d1f]">{item.product?.name || "Product"}</p>
                                        <p className="text-sm text-[#86868b]">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold text-[#1d1d1f]">
                                        ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 pt-4 mb-6">
                            <div className="flex justify-between text-xl font-semibold text-[#1d1d1f]">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={!user || orderLoading}
                            className="w-full bg-[#0071e3] hover:bg-[#0077ed] text-white py-3 rounded-full font-medium transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {orderLoading ? "Processing..." : user ? "Place Order" : "Sign in to checkout"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-32 text-center">Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
