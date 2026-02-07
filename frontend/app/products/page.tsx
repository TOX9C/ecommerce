"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "../../utils/api";
import ItemsCard from "../../comp/ItemCard";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

const ProductsContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get("search") || "";

    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [sortBy, setSortBy] = useState("newest");

    const [categories, setCategories] = useState<string[]>(["All"]);

    // Update searchQuery if URL param changes
    useEffect(() => {
        const query = searchParams.get("search");
        if (query) {
            setSearchQuery(query);
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch a large number to ensure we get a good set of categories
                // Ideally, we'd have a separate /categories endpoint
                const res = await api.get("/product/get?limit=100");
                const items = res.data.items || [];
                setProducts(items);
                setFilteredProducts(items);

                // Extract unique categories
                const uniqueCats = Array.from(new Set(items.map((p: any) => p.category))).filter(Boolean) as string[];
                setCategories(["All", ...uniqueCats]);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = [...products];

        // Category filter
        if (selectedCategory !== "All") {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Price range filter
        if (priceRange.min) {
            filtered = filtered.filter(p => p.price >= parseFloat(priceRange.min));
        }
        if (priceRange.max) {
            filtered = filtered.filter(p => p.price <= parseFloat(priceRange.max));
        }

        // Sorting
        switch (sortBy) {
            case "price-low":
                filtered.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                filtered.sort((a, b) => b.price - a.price);
                break;
            case "name":
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "newest":
            default:
                filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                break;
        }

        setFilteredProducts(filtered);
    }, [searchQuery, selectedCategory, priceRange, sortBy, products]);

    if (loading) return <div className="min-h-screen pt-32 text-center">Loading...</div>;

    return (
        <div className="min-h-screen pt-32 px-4 md:px-6 bg-[#f5f5f7]">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-8 select-none">Browse Products</h1>

                {/* Filters Section */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200 mb-8 select-none">
                    <div className="flex items-center gap-2 mb-4">
                        <SlidersHorizontal size={20} className="text-gray-600" />
                        <h2 className="text-lg font-semibold text-[#1d1d1f]">Filters & Sorting</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                            <div className="relative">
                                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Search products..."
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                    className="w-1/2 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Min"
                                    min="0"
                                />
                                <input
                                    type="number"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                    className="w-1/2 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Max"
                                    min="0"
                                />
                            </div>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                            <div className="relative">
                                <ArrowUpDown size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name">Name: A to Z</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Clear Filters */}
                    <div className="mt-4 flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                            Showing {filteredProducts.length} of {products.length} products
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("All");
                                setPriceRange({ min: "", max: "" });
                                setSortBy("newest");
                                router.push("/products");
                            }}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Clear All Filters
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="select-none">
                    {filteredProducts.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
                            <p className="text-lg">No products found matching your criteria</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ItemsCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    category={product.category}
                                    ProductImages={product.ProductImages}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-32 text-center">Loading...</div>}>
            <ProductsContent />
        </Suspense>
    );
}
