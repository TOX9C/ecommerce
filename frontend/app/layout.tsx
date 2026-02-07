"use client";
import "./globals.css";
import Nav from "@/comp/Nav";
import Footer from "@/comp/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { usePathname } from "next/navigation";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname?.startsWith("/auth");
  const hideFooter = pathname?.startsWith("/auth") || pathname?.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNav && <Nav />}
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body className="bg-white/70 font-sans">
        <CurrencyProvider>
          <AuthProvider>
            <CartProvider>
              <LayoutContent>{children}</LayoutContent>
            </CartProvider>
          </AuthProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
