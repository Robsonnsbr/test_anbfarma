"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { Product } from "@/types/Product";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import ProductForm from "@/components/ProductForm";
import { USE_LOCAL_MOCKS } from "@/utils/env";
import mockProducts from "@/mocks/products.json";

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [products, search]);

  useEffect(() => {
    if (!isAuthenticated) return;
    (async () => {
      try {
        if (USE_LOCAL_MOCKS) {
          setProducts(mockProducts as Product[]);
        } else {
          const res = await api.get("/products");
          setProducts(res.data as Product[]);
        }
      } catch {
        setError("Falha ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    })();
  }, [isAuthenticated]);

  const createProduct = async (
    data: Omit<Product, "id" | "created_at" | "updated_at">
  ) => {
    setSubmitting(true);
    try {
      if (USE_LOCAL_MOCKS) {
        const newId = Math.max(0, ...products.map((p) => p.id)) + 1;
        const newProduct: Product = { id: newId, ...data };
        setProducts((p) => [newProduct, ...p]);
        setEditItem(null);
      } else {
        const res = await api.post("/products", data);
        setProducts((p) => [res.data as Product, ...p]);
        setEditItem(null);
      }
    } catch {
      setError("Erro ao criar produto.");
    } finally {
      setSubmitting(false);
    }
  };

  const updateProduct = async (
    data: Omit<Product, "id" | "created_at" | "updated_at">
  ) => {
    if (!editItem) return;
    setSubmitting(true);
    try {
      if (USE_LOCAL_MOCKS) {
        const updated: Product = { ...editItem, ...data };
        setProducts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
        setEditItem(null);
      } else {
        const res = await api.put(`/products/${editItem.id}`, data);
        const updated = res.data as Product;
        setProducts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
        setEditItem(null);
      }
    } catch {
      setError("Erro ao atualizar produto.");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Excluir este produto?")) return;
    try {
      if (USE_LOCAL_MOCKS) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        await api.delete(`/products/${id}`);
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      setError("Erro ao excluir produto.");
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Alert variant="warning">
          Acesso restrito. Faça login para gerenciar produtos.
        </Alert>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="grid gap-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-neutral-600">
              Gerencie os produtos da frutaria.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              className="rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Buscar por nome/categoria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {error && <Alert variant="error">{error}</Alert>}
        {loading && (
          <div className="text-sm text-neutral-500">Carregando...</div>
        )}

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">
            {editItem ? "Editar produto" : "Novo produto"}
          </h2>
          <ProductForm
            initial={editItem}
            onSubmit={editItem ? updateProduct : createProduct}
            submitting={submitting}
          />
        </div>

        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-4 py-3 text-left">Produto</th>
                <th className="px-4 py-3 text-left">Categoria</th>
                <th className="px-4 py-3 text-left">Preço</th>
                <th className="px-4 py-3 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3">{p.name}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">
                    {p.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => setEditItem(p)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteProduct(p.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-neutral-500"
                    colSpan={4}
                  >
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
}
