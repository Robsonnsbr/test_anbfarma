"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const { items } = useCart();

  const qty = items.reduce((a, i) => a + i.quantity, 0);

  return (
    <header className="mb-6 flex items-center justify-between">
      <Link href="/" className="text-xl font-semibold">
        Frutaria<span className="text-green-600">Store</span>
      </Link>

      <nav className="flex items-center gap-4 text-sm">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Login</Link>
        <span className="rounded-full bg-green-100 px-2 py-1 text-green-700">
          Carrinho: {qty}
        </span>
        {isAuthenticated && (
          <button
            onClick={logout}
            className="rounded-lg bg-red-600 px-3 py-1 text-white hover:bg-red-700"
          >
            Sair
          </button>
        )}
      </nav>
    </header>
  );
}
