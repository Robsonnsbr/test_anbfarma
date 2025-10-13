"use client";

import { Product } from "@/types/Product";
import Link from "next/link";
import Button from "@/components/Button";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="aspect-square overflow-hidden rounded-xl bg-neutral-100">
        {/* Use fallback if no image */}
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-400">
            No image
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <Link
          href={`/product/${product.id}`}
          className="block text-base font-semibold hover:underline"
        >
          {product.name}
        </Link>
        <p className="text-sm text-neutral-600">{product.category}</p>
        <p className="text-lg font-semibold">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>

      <div className="mt-3">
        <Button onClick={() => add(product)} className="w-full">
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  );
}
