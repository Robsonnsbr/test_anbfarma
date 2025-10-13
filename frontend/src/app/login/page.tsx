"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Alert from "@/components/Alert";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});

  const emailError =
    touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? "Informe um e-mail válido"
      : undefined;
  const passwordError =
    touched.password && password.length < 4
      ? "Senha precisa ter ao menos 4 caracteres"
      : undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (emailError || passwordError) return;

    setError(null);
    setFormLoading(true);
    try {
      await login(email, password);
      // Success: redireciona no contexto
    } catch (err: any) {
      // Keep messages generic to avoid leaking info
      setError("Falha ao autenticar. Verifique suas credenciais.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-md gap-6 rounded-2xl bg-white p-6 shadow-sm">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Entrar</h1>
        <p className="text-sm text-neutral-600">
          Acesse o painel para gerenciar os produtos.
        </p>
      </div>

      {error && <Alert variant="error">{error}</Alert>}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <Input
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((s) => ({ ...s, email: true }))}
          placeholder="voce@exemplo.com"
          autoComplete="email"
          error={emailError}
        />
        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((s) => ({ ...s, password: true }))}
          placeholder="••••••••"
          autoComplete="current-password"
          error={passwordError}
        />

        <Button type="submit" loading={formLoading || loading} className="mt-2">
          Entrar
        </Button>
      </form>

      <div className="text-center text-xs text-neutral-500">
        Ambiente de desenvolvimento • Tokens salvos no navegador
      </div>
    </div>
  );
}
