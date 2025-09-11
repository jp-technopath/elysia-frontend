"use client";

// ----- HTTP base -----
const API_BASE =
  (process.env.NEXT_PUBLIC_API_BASE ?? "https://maatlegal-elysia-backend.onrender.com")
    .replace(/\/+$/, "");

export const host = API_BASE;

// ----- public path (needed by Sidebar etc.) -----
export const public_path =
  process.env.NEXT_PUBLIC_IS_STATIC === "true" ? "/static/" : "/";

// ----- WS base + helpers -----
export const wsBase = API_BASE.startsWith("https://")
  ? API_BASE.replace(/^https:\/\//, "wss://")
  : API_BASE.replace(/^http:\/\//, "ws://");

// For legacy calls like getWebsocketHost() + "process_collection"
export const getWebsocketHost = () => `${wsBase}/ws/`;

// Safer helper when you want to pass full path
export const wsUrl = (path: string) =>
  `${wsBase}${path.startsWith("/") ? path : `/${path}`}`;
