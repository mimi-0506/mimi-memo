import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      preload: path.resolve(__dirname, "main/preload.ts"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      external: ["electron"], // <- 이거 꼭 필요!
    },
  },
  define: { "process.env": {} },
});
