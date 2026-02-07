"use client";
import Link from "next/link";
import { ShoppingBag, User, LogOut, Shield, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CurrencySwitcher from "./CurrencySwitcher";

const Nav = () => {
  const { user, isAdmin, logout } = useAuth();
  const { items } = useCart();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Optional: clear after search or keep it
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`z-50 fixed w-full transition-all duration-300 animate-fade-in-down ${scrolled
        ? "bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm"
        : "bg-white/50 backdrop-blur-sm"
        }`}
    >
      <div className="flex justify-between px-4 md:px-8 py-4 items-center max-w-7xl mx-auto">
        <Link href="/">
          <p className="text-xl md:text-2xl font-bold text-[#1d1d1f] tracking-tight cursor-pointer hover:text-[#0071e3] transition-colors">
            Store
          </p>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64 focus-within:ring-2 focus-within:ring-[#0071e3] transition-all">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm text-gray-700 w-full placeholder-gray-500"
          />
        </div>

        <div className="flex gap-3 md:gap-6 items-center">
          {/* Products Link */}
          <Link href="/products">
            <button className="text-sm font-medium text-gray-700 hover:text-[#0071e3] transition-colors">
              Products
            </button>
          </Link>

          {/* Currency Switcher */}
          <CurrencySwitcher />

          {/* Cart */}
          <Link href="/cart">
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-all">
              <ShoppingBag size={22} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0071e3] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>
          </Link>

          {/* Admin Dashboard */}
          {isAdmin && (
            <>
              <Link href="/admin">
                <button className="flex items-center gap-2  py-2  text-purple-700 cursor-pointer rounded-full  transition-all font-medium text-sm">
                  <Shield size={16} />
                  <span className="hidden md:inline">Products</span>
                </button>
              </Link>
              <Link href="/admin/orders">
                <button className="flex items-center gap-2  py-2 cursor-pointer  text-blue-700 rounded-full  transition-all font-medium text-sm">
                  <ShoppingBag size={16} />
                  <span className="hidden md:inline">Orders</span>
                </button>
              </Link>
            </>
          )}

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 hidden md:inline">
                Hi,{" "}
                <span className="font-semibold text-gray-900">
                  {user.username}
                </span>
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all text-gray-700 text-sm font-medium"
              >
                <LogOut size={16} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link href="/auth/login">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full transition-all font-medium text-sm shadow-md shadow-blue-500/20">
                <User size={16} />
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
