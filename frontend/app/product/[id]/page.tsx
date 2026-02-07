"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Minus, Plus, ShoppingBag } from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const id = params.id;
        const res = await api.get(`/product/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    await addToCart(product.id, quantity);
    setAdding(false);
    alert("Added to cart!");
  };

  if (loading) return <div className="min-h-screen pt-32 text-center">Loading...</div>;
  if (!product) return <div className="min-h-screen pt-32 text-center">Product not found</div>;

  return (
    <div className="min-h-screen pt-32 px-4 md:px-6 pb-16 bg-[#f5f5f7] flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm flex flex-col items-center justify-center h-fit select-none">
          <div className="w-full max-w-md h-64 md:h-96 flex items-center justify-center mb-4">
            <img
              src={product.ProductImages?.[0]?.url || "https://dummyimage.com/600x600/ccc/000.png&text=Product+Image"}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          {product.ProductImages && product.ProductImages.length > 1 && (
            <div className="flex gap-2 mt-4">
              {product.ProductImages.map((img: any, idx: number) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`${product.name} ${idx + 1}`}
                  className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200 hover:border-blue-500 cursor-pointer transition-all"
                  onClick={(e) => {
                    const mainImg = e.currentTarget.parentElement?.parentElement?.querySelector('img');
                    if (mainImg) mainImg.src = img.url;
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-center select-none">
          <span className="text-orange-600 font-semibold mb-2">{product.category}</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-4 tracking-tight">
            {product.name}
          </h1>
          <p className="text-2xl md:text-3xl font-medium text-[#1d1d1f] mb-8">{formatPrice(product.price)}</p>

          <div className="prose prose-lg text-gray-500 mb-10">
            <p>{product.description}</p>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center bg-white rounded-full border border-gray-300">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-50 rounded-l-full transition-colors"
              >
                <Minus size={20} className="text-gray-600" />
              </button>
              <span className="w-12 text-center font-medium text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-gray-50 rounded-r-full transition-colors"
              >
                <Plus size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="w-full md:w-auto bg-[#0071e3] hover:bg-[#0077ed] text-white text-lg font-medium px-10 py-4 rounded-full transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {adding ? "Adding..." : (
              <>
                <ShoppingBag size={22} />
                Add to Bag
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
