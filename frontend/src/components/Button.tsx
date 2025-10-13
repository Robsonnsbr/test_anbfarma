"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

export default function Button({
  variant = "primary",
  loading,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring disabled:opacity-60";
  const theme = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-400",
    secondary:
      "bg-neutral-200 text-neutral-900 hover:bg-neutral-300 focus:ring-2 focus:ring-neutral-300",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400",
  }[variant];

  return (
    <button
      className={clsx(base, theme, className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
