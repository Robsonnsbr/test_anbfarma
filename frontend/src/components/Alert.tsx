"use client";

import { ReactNode } from "react";
import clsx from "clsx";

export default function Alert({
  children,
  variant = "error",
}: {
  children: ReactNode;
  variant?: "error" | "success" | "info" | "warning";
}) {
  const map = {
    error: "bg-red-50 text-red-700 border-red-200",
    success: "bg-green-50 text-green-700 border-green-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  }[variant];

  return (
    <div className={clsx("rounded-xl border px-3 py-2 text-sm", map)}>
      {children}
    </div>
  );
}
