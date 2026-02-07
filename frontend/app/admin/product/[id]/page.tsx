"use client";
import ProductForm from "@/comp/ProductForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function EditProductPage() {
    const { isAdmin, isLoading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const [product, setProduct] = useState<any>(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.push("/");
        }
    }, [isLoading, isAdmin, router]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const id = params.id;
                const res = await api.get(`/product/${id}`);
                setProduct(res.data.product);
            } catch (error) {
                console.error("Failed to fetch product", error);
                router.push("/admin");
            } finally {
                setFetching(false);
            }
        };

        if (isAdmin && params.id) {
            fetchProduct();
        }
    }, [isAdmin, params.id, router]);

    if (isLoading || !isAdmin || fetching) return <div className="min-h-screen pt-32 text-center">Loading...</div>;

    return (
        <div className="min-h-screen pt-32 px-4 bg-[#f5f5f7] flex justify-center">
            <div className="w-full max-w-3xl">
                {product && (
                    <ProductForm
                        initialData={{
                            ...product,
                            imgUrl: product.ProductImages?.map((img: any) => img.url) || []
                        }}
                        isEdit={true}
                    />
                )}
            </div>
        </div>
    );
}
