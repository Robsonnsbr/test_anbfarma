"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/services/api";
import { Product } from "@/types/Product";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import { useCart } from "@/context/CartContext";
import { USE_LOCAL_MOCKS } from "@/utils/env";
import mockProducts from "@/mocks/products.json";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();

  useEffect(() => {
    (async () => {
      try {
        if (USE_LOCAL_MOCKS) {
          const p =
            (mockProducts as Product[]).find((x) => x.id === id) || null;
          setProduct(p);
        } else {
          const res = await api.get(`/products/${id}`);
          setProduct(res.data as Product);
        }
      } catch {
        setError("Produto não encontrado.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  return (
    <ProtectedRoute>
      <Header />

      {loading && <div className="text-sm text-neutral-500">Carregando...</div>}
      {error && <Alert variant="error">{error}</Alert>}

      {product && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-white p-3 shadow-sm">
            <div className="aspect-square overflow-hidden rounded-xl bg-neutral-100">
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
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <p className="text-sm text-neutral-600">{product.category}</p>
            <p className="mt-2 text-xl font-semibold">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>

            <p className="mt-4 text-sm text-neutral-700">
              {product.description}
            </p>

            <div className="mt-6">
              <Button onClick={() => add(product)} className="w-full md:w-auto">
                Adicionar ao carrinho
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </ProtectedRoute>
  );
}
