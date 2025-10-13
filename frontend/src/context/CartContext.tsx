"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Product } from "@/types/Product";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: number) => void;
  clear: () => void;
  total: number; // simple sum
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (p: Product) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === p.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
        return copy;
      }
      return [...prev, { ...p, quantity: 1 }];
    });
  };

  const remove = (id: number) =>
    setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const total = useMemo(
    () => items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, add, remove, clear, total }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
