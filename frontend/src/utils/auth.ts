// Small helpers for token persistence
export function saveToken(token: string) {
  if (typeof window === "undefined") return; // prevent SSR error
  localStorage.setItem("token", token);
}

export function clearToken() {
  if (typeof window === "undefined") return; // prevent SSR error
  localStorage.removeItem("token");
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null; // prevent SSR error
  return localStorage.getItem("token");
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false; // prevent SSR error
  return Boolean(getToken());
}
