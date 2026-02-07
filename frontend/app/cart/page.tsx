"use client";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import Skeleton from "@/comp/Skeleton";

export default function CartPage() {
    const { items, removeFromCart, addToCart, total, clearCart, isLoading } = useCart();
    const { user } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 px-6 bg-[#f5f5f7]">
                <div className="max-w-4xl mx-auto">
                    <Skeleton className="h-10 w-48 mx-auto mb-12" />
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-8 p-8 space-y-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex gap-6">
                                <Skeleton className="w-32 h-32 rounded-lg" />
                                <div className="flex-1 space-y-4">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-10 w-32" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-32 px-6 bg-[#f5f5f7] flex flex-col items-center justify-center">
                <h1 className="text-3xl font-semibold mb-4 text-[#1d1d1f]">Your bag is empty.</h1>
                <p className="text-gray-500 mb-8">Free delivery and free returns.</p>
                <Link href="/">
                    <button className="bg-[#0071e3] hover:bg-[#0077ed] text-white px-8 py-3 rounded-full font-medium transition-all">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 px-4 md:px-6 bg-[#f5f5f7]">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-semibold mb-8 md:mb-12 text-[#1d1d1f] text-center">Review your bag.</h1>

                <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-8">
                    {items.map((item) => (
                        <div key={item.productId} className="flex flex-col md:flex-row items-center gap-6 p-8 border-b border-gray-100 last:border-0">
                            <div className="w-32 h-32 relative">
                                <Image
                                    src={item.product?.ProductImages?.[0]?.url || "https://dummyimage.com/150x150/ccc/000.png&text=Product"}
                                    alt={item.product?.name || "Product"}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 150px"
                                />
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-2xl font-semibold text-[#1d1d1f]">{item.product?.name}</h3>
                                    <p className="text-xl font-medium text-[#1d1d1f]">
                                        ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                                <p className="text-gray-500 mb-4">{item.product?.category || "Category"}</p>

                                <div className="flex items-center justify-center md:justify-start gap-4">
                                    <div className="flex items-center border border-gray-300 rounded-full">
                                        <button
                                            onClick={() => item.quantity > 1 ? addToCart(item.productId, -1) : removeFromCart(item.productId)}
                                            className="p-2 hover:bg-gray-50 rounded-l-full"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => addToCart(item.productId, 1)}
                                            className="p-2 hover:bg-gray-50 rounded-r-full"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.productId)}
                                        className="text-blue-500 hover:underline text-sm font-medium"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-end gap-4 mb-20">
                    <div className="flex justify-between w-full md:w-1/3 text-xl font-medium border-t border-gray-300 pt-4">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto mt-4">
                        <button
                            onClick={clearCart}
                            className="px-8 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all flex-1 md:flex-none text-center"
                        >
                            Clear Bag
                        </button>
                        {user ? (
                            <Link href="/checkout" className="flex-1 md:flex-none">
                                <button className="w-full bg-[#0071e3] hover:bg-[#0077ed] text-white px-10 py-3 rounded-full font-medium transition-all shadow-lg shadow-blue-500/30">
                                    Check Out
                                </button>
                            </Link>
                        ) : (
                            <Link href="/auth/login?redirect=/checkout" className="flex-1 md:flex-none">
                                <button className="w-full bg-[#0071e3] hover:bg-[#0077ed] text-white px-10 py-3 rounded-full font-medium transition-all shadow-lg shadow-blue-500/30">
                                    Sign In to Check Out
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
