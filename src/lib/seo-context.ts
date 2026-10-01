import { createContext } from "react";
export interface SeoData { title: string; description: string; path: string; image?: string; jsonLd?: object | object[]; noIndex?: boolean; }
export const SeoContext = createContext<((data: SeoData) => void) | null>(null);
