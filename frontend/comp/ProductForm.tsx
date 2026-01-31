"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

interface ProductFormProps {
    initialData?: {
        id?: number;
        name: string;
        category: string;
        price: number;
        description: string;
        imgUrl: string[];
    };
    isEdit?: boolean;
}

const PRESET_CATEGORIES = [
    "Electronics",
    "Computers & Laptops",
    "Smartphones & Tablets",
    "Audio & Headphones",
    "Cameras & Photography",
    "Gaming",
    "Home & Kitchen",
    "Fashion & Apparel",
    "Sports & Outdoors",
    "Books & Media",
    "Custom"
];

export default function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
    const router = useRouter();
    const { user, isAdmin } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        description: "",
    });
    const [imageUrls, setImageUrls] = useState<string[]>([""]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [customCategory, setCustomCategory] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                category: initialData.category,
                price: initialData.price.toString(),
                description: initialData.description || "",
            });
            setImageUrls(initialData.imgUrl?.length ? initialData.imgUrl : [""]);

            // Set category dropdown
            if (PRESET_CATEGORIES.includes(initialData.category)) {
                setSelectedCategory(initialData.category);
            } else {
                setSelectedCategory("Custom");
                setCustomCategory(initialData.category);
            }
        }
    }, [initialData]);

    const handleAddImage = () => {
        setImageUrls([...imageUrls, ""]);
    };

    const handleRemoveImage = (index: number) => {
        if (imageUrls.length > 1) {
            setImageUrls(imageUrls.filter((_, i) => i !== index));
        }
    };

    const handleImageChange = (index: number, value: string) => {
        const newUrls = [...imageUrls];
        newUrls[index] = value;
        setImageUrls(newUrls);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAdmin) return;

        setLoading(true);
        setError("");

        try {
            // Determine final category value
            const finalCategory = selectedCategory === "Custom" ? customCategory : selectedCategory;

            // Filter out empty URLs
            const validUrls = imageUrls.filter(url => url.trim() !== "");

            if (validUrls.length === 0) {
                setError("Please add at least one image URL");
                setLoading(false);
                return;
            }

            const payload = {
                ...formData,
                category: finalCategory,
                price: parseFloat(formData.price),
                imgUrl: validUrls,
                ...(isEdit && initialData?.id ? { id: initialData.id } : {}),
            };

            if (isEdit) {
                await api.post("/product/update", payload);
            } else {
                await api.post("/product/make", payload);
            }

            router.push("/admin");
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-[#1d1d1f]">
                {isEdit ? "Edit Product" : "Add New Product"}
            </h2>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="e.g. MacBook Pro"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            required
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        >
                            <option value="">Select a category</option>
                            {PRESET_CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>

                        {selectedCategory === "Custom" && (
                            <input
                                type="text"
                                required
                                value={customCategory}
                                onChange={(e) => setCustomCategory(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all mt-2"
                                placeholder="Enter custom category"
                            />
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">Product Images</label>
                        <button
                            type="button"
                            onClick={handleAddImage}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            + Add Image
                        </button>
                    </div>

                    <div className="space-y-3">
                        {imageUrls.map((url, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder={`Image URL ${index + 1}`}
                                />
                                {imageUrls.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {imageUrls.some(url => url.trim()) && (
                        <div className="mt-3 flex gap-2 flex-wrap">
                            {imageUrls.filter(url => url.trim()).map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Preview ${index + 1}`}
                                    className="h-16 w-16 object-cover rounded border"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Product details..."
                    />
                </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 rounded-full bg-[#0071e3] text-white font-medium hover:bg-[#0077ed] transition-all disabled:opacity-50"
                >
                    {loading ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
                </button>
            </div>
        </form>
    );
}
