"use client";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminDashboard() {
    const { user, isLoading, isAdmin } = useAuth();
    const [products, setProducts] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.push("/");
        }
    }, [isLoading, isAdmin, router]);

    const fetchProducts = async () => {
        try {
            const res = await api.get("/product/get");
            setProducts(res.data.items || []);
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    useEffect(() => {
        if (isAdmin) {
            fetchProducts();
        }
    }, [isAdmin]);

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                // Assuming delete endpoint exists or using update to disable? 
                // Based on API_ENDPOINTS.md, no delete endpoint. 
                // I will assume we might need to add one or just hide it. 
                // For now, let's implement a delete assuming I added it or will add it.
                // Wait, I didn't add delete to backend implementation plan. 
                // I should probably skip delete for now or fully implement it.
                // Let's implement it in backend too if I can, but strict plan adherence means I should stick to plan.
                // Plan said: "Implement Delete Product". So I need to add it.
                await api.delete(`/product/${id}`);
                fetchProducts();
            } catch (error) {
                console.error("Failed to delete product", error);
                alert("Failed to delete product. Ensure you have admin rights.");
            }
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (!isAdmin) return null;

    return (
        <div className="min-h-screen pt-32 px-10 bg-[#f5f5f7]">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-semibold text-[#1d1d1f]">Product Management</h1>
                <Link href="/admin/product/new">
                    <button className="flex items-center gap-2 bg-[#0071e3] hover:bg-[#0077ed] text-white px-4 py-2 rounded-full font-medium transition-all">
                        <Plus size={18} /> Add Product
                    </button>
                </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-100 text-[#86868b]">
                            <th className="py-4 font-medium">Image</th>
                            <th className="py-4 font-medium">Name</th>
                            <th className="py-4 font-medium">Category</th>
                            <th className="py-4 font-medium">Price</th>
                            <th className="py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                                <td className="py-4">
                                    <img
                                        src={product.ProductImages?.[0]?.url || "https://dummyimage.com/50x50/ccc/000.png&text=X"}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover rounded-lg"
                                    />
                                </td>
                                <td className="py-4 font-medium text-[#1d1d1f]">{product.name}</td>
                                <td className="py-4 text-[#86868b]">{product.category}</td>
                                <td className="py-4 font-medium">${product.price}</td>
                                <td className="py-4 text-right">
                                    <div className="flex gap-2 justify-end">
                                        <Link href={`/admin/product/${product.id}`}>
                                            <button className="p-2 text-gray-500 hover:text-[#0071e3] hover:bg-blue-50 rounded-full transition-all">
                                                <Edit size={18} />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
