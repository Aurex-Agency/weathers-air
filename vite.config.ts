import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), {
    name: "production-analytics",
    transformIndexHtml(html) {
      const tag = process.env.VERCEL_ENV === "production" ? `<script async src="https://www.googletagmanager.com/gtag/js?id=G-SPW5VJH2GF"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-SPW5VJH2GF');</script>` : "";
      return html.replace("<!-- production-analytics -->", tag);
    },
  }],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: isSsrBuild ? undefined : {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
}));
