"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import api from "@/services/api";
import { User } from "@/types/User";
import {
  saveToken,
  clearToken,
  getToken,
  isAuthenticated as isAuth,
} from "@/utils/auth";
import { USE_LOCAL_MOCKS } from "@/utils/env";
import mockUser from "@/mocks/user.json";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_LOCAL_MOCKS) {
      // mock session bootstrap
      const token = getToken();
      if (token) {
        setUser({
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
        });
      }
      setLoading(false);
      return;
    }

    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data as User);
      } catch {
        clearToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loading && isAuth() && pathname === "/login") {
      router.replace("/");
    }
  }, [loading, pathname, router]);

  const login = async (email: string, password: string) => {
    if (USE_LOCAL_MOCKS) {
      // accept anything in dev; if quiser, valide email/senha aqui
      saveToken(mockUser.token);
      setUser({
        id: mockUser.id,
        name: mockUser.name,
        email: email || mockUser.email,
      });
      router.replace("/dashboard");
      return;
    }

    const res = await api.post("/login", { email, password });
    const { token, user } = res.data;
    saveToken(token);
    setUser(user);
    router.replace("/dashboard");
  };

  const logout = () => {
    clearToken();
    setUser(null);
    router.replace("/login");
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user) || isAuth(),
      login,
      logout,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
