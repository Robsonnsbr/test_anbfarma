import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Frutaria Store",
  description: "Dev mode e-commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-dvh bg-gradient-to-b from-emerald-50 to-white text-neutral-900 antialiased">
        <AuthProvider>
          <CartProvider>
            <div className="mx-auto max-w-5xl px-4 py-6">{children}</div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
