"use client";

import { useEffect, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Product } from "@/types/Product";

type FormData = Omit<Product, "id" | "created_at" | "updated_at">;

export default function ProductForm({
  initial,
  onSubmit,
  submitting,
}: {
  initial?: Product | null;
  onSubmit: (data: FormData) => Promise<void>;
  submitting?: boolean;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (initial) {
      setName(initial.name ?? "");
      setDescription(initial.description ?? "");
      setPrice(initial.price ?? 0);
      setCategory(initial.category ?? "");
      setImageUrl(initial.image_url ?? "");
    }
  }, [initial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      name,
      description,
      price: Number(price),
      category,
      image_url: imageUrl || undefined,
    } as FormData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Input
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <Input
        label="Preço (BRL)"
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
      />
      <Input
        label="URL da imagem"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <label className="block">
        <span className="mb-1 block text-sm text-neutral-700">Descrição</span>
        <textarea
          className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <Button type="submit" loading={submitting} className="mt-2">
        {initial ? "Salvar alterações" : "Criar produto"}
      </Button>
    </form>
  );
}
