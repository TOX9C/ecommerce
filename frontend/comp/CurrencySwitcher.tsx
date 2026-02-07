"use client";
import { useCurrency } from "@/context/CurrencyContext";
import { DollarSign } from "lucide-react";

export default function CurrencySwitcher() {
    const { currency, setCurrency, exchangeRate } = useCurrency();

    const toggleCurrency = () => {
        setCurrency(currency === "USD" ? "IQD" : "USD");
    };

    return (
        <button
            onClick={toggleCurrency}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all text-sm font-medium text-[#1d1d1f] border border-gray-200"
            title={`Switch to ${currency === "USD" ? "IQD" : "USD"}`}
        >
            <DollarSign size={16} />
            <span className="hidden sm:inline">{currency}</span>
            <span className="sm:hidden">{currency}</span>
            {currency === "IQD" && (
                <span className="text-xs text-gray-500 hidden md:inline">
                    (1 USD = {exchangeRate.toLocaleString()})
                </span>
            )}
        </button>
    );
}
