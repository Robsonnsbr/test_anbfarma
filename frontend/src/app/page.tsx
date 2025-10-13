"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { Product } from "@/types/Product";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Alert from "@/components/Alert";
import { USE_LOCAL_MOCKS } from "@/utils/env";
import mockProducts from "@/mocks/products.json";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (USE_LOCAL_MOCKS) {
          setProducts(mockProducts as Product[]);
        } else {
          const res = await api.get("/products");
          setProducts(res.data as Product[]);
        }
      } catch {
        setError("Não foi possível carregar os produtos.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <ProtectedRoute>
      <Header />
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Frutas fresquinhas</h1>
        <p className="text-sm text-neutral-600">
          Seleção do dia — adicione ao carrinho e simule sua compra.
        </p>

        {error && <Alert variant="error">{error}</Alert>}
        {loading && (
          <div className="text-sm text-neutral-500">Carregando...</div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
      <Footer />
    </ProtectedRoute>
  );
}
