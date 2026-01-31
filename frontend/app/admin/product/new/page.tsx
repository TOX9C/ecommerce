"use client";
import ProductForm from "@/comp/ProductForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NewProductPage() {
    const { isAdmin, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.push("/");
        }
    }, [isLoading, isAdmin, router]);

    if (isLoading || !isAdmin) return <div className="min-h-screen pt-32 text-center">Loading...</div>;

    return (
        <div className="min-h-screen pt-32 px-4 bg-[#f5f5f7] flex justify-center">
            <div className="w-full max-w-3xl">
                <ProductForm />
            </div>
        </div>
    );
}
