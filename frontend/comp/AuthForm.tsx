"use client";
import { useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

interface AuthFormProps {
    mode: "login" | "register";
    redirectOnSuccess?: string;
    isInline?: boolean; // For use inside checkout
}

export default function AuthForm({ mode, redirectOnSuccess = "/", isInline = false }: AuthFormProps) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        phoneNumber: "",
        street: "",
        city: "",
        town: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
            const res = await api.post(endpoint, formData);

            if (res.data.token) {
                login(res.data.token);
                if (redirectOnSuccess) {
                    router.push(redirectOnSuccess);
                }
            }
        } catch (err: any) {
            // Only log actual system errors, not validation errors (400)
            if (!err.response || err.response.status >= 500) {
                console.error("Auth Error:", err);
            }
            setError(err.response?.data?.message || err.response?.data?.errors?.issue?.[0]?.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    const Container = isInline ? "div" : "div";
    const containerClass = isInline
        ? "w-full max-w-md mx-auto"
        : "min-h-screen pt-32 px-6 bg-[#f5f5f7] flex justify-center pb-20";

    const innerClass = isInline
        ? "bg-white p-8 rounded-2xl shadow-sm border border-gray-200"
        : "w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200 h-fit";

    return (
        <Container className={containerClass}>
            <div className={innerClass}>
                <h1 className="text-3xl font-semibold mb-6 text-center text-[#1d1d1f]">
                    {mode === "login" ? "Sign In" : "Create Account"}
                </h1>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {mode === "login" ? "Username or Phone Number" : "Username"}
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder={mode === "login" ? "Username or Phone" : "Username"}
                        />
                    </div>

                    {mode === "register" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder="0501234567"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.street}
                                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder="Street Address"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="City"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Town</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.town}
                                        onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="Town"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-12"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0071e3] hover:bg-[#0077ed] text-white py-3 rounded-full font-medium transition-all shadow-lg shadow-blue-500/30 disabled:opacity-70"
                    >
                        {loading ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    {mode === "login" ? (
                        <>
                            Don't have an account?{" "}
                            <Link href={isInline ? "/checkout?mode=register" : "/auth/register"} className="text-[#0071e3] hover:underline">
                                Sign up
                            </Link>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <Link href={isInline ? "/checkout?mode=login" : "/auth/login"} className="text-[#0071e3] hover:underline">
                                Sign in
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </Container>
    );
}
