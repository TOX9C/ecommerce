"use client";
import { useEffect, useState } from "react";
import ItemsCard from "@/comp/ItemCard";
import api from "../utils/api";
import Link from "next/link";
import Skeleton from "@/comp/Skeleton";

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Fetch only 8 latest items for landing page
        const res = await api.get("/product/get?limit=8");
        setProducts(res.data.items || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col mb-12 md:mb-20 items-center justify-end min-h-[30vh] md:h-[40vh] pt-32 px-4">
        <p className="text-[#1d1d1f] font-semibold text-4xl md:text-6xl mb-2 tracking-tight text-center">
          Simply Better.
        </p>
        <p className="text-lg md:text-2xl font-medium text-[#86868b] tracking-tight leading-relaxed max-w-2xl text-center px-4">
          A curated selection of the world's best essentials.
        </p>
        <p className="text-lg md:text-2xl mb-6 md:mb-8 font-medium text-[#86868b] tracking-tight leading-relaxed max-w-2xl text-center px-4">
          Designed for the way you live
        </p>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 w-full sm:w-auto px-4">
          <Link href="/products" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-[17px] px-6 py-2.5 font-medium transition-all cursor-pointer">
              Shop Everything
            </button>
          </Link>
          <button className="w-full sm:w-auto font-medium cursor-pointer text-[#0071e3] text-lg md:text-[20px] hover:underline text-center">
            View lookbook {">"}
          </button>
        </div>
      </div>
      <div className="bg-[#f5f5f7] flex flex-col p-4 md:p-10 min-h-screen select-none">
        <div>
          <p className="font-semibold text-2xl md:text-3xl my-6 md:my-8 ml-2 md:ml-5">
            The Latest Arrivals
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-[28px] p-8 h-[400px] flex flex-col">
                  <Skeleton className="w-full aspect-square rounded-[20px] mb-8" />
                  <div className="mt-auto space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-5 w-1/4" />
                  </div>
                </div>
              ))
            ) : (
              products.map((product) => (
                <ItemsCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  category={product.category}
                  ProductImages={product.ProductImages}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
