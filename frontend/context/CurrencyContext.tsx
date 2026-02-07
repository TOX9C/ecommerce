"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Currency = "USD" | "IQD";

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    convertPrice: (priceInUSD: number) => number;
    formatPrice: (priceInUSD: number) => string;
    getCurrencySymbol: () => string;
    exchangeRate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Exchange rate: 1 USD = 1310 IQD (approximate)
const USD_TO_IQD_RATE = 1310;

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currency, setCurrencyState] = useState<Currency>("USD");

    // Load currency preference from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("preferred-currency");
        if (saved === "USD" || saved === "IQD") {
            setCurrencyState(saved);
        }
    }, []);

    const setCurrency = (newCurrency: Currency) => {
        setCurrencyState(newCurrency);
        localStorage.setItem("preferred-currency", newCurrency);
    };

    const convertPrice = (priceInUSD: number): number => {
        if (currency === "IQD") {
            return Math.round(priceInUSD * USD_TO_IQD_RATE);
        }
        return priceInUSD;
    };

    const formatPrice = (priceInUSD: number): string => {
        const converted = convertPrice(priceInUSD);
        if (currency === "IQD") {
            return `${converted.toLocaleString()} IQD`;
        }
        return `$${converted.toFixed(2)}`;
    };

    const getCurrencySymbol = (): string => {
        return currency === "USD" ? "$" : "IQD";
    };

    return (
        <CurrencyContext.Provider
            value={{
                currency,
                setCurrency,
                convertPrice,
                formatPrice,
                getCurrencySymbol,
                exchangeRate: USD_TO_IQD_RATE,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
}
