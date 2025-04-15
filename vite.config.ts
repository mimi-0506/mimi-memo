import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [react(), svgr()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      preload: path.resolve(__dirname, "main/preload.ts"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      external: ["electron"],
    },
  },
  define: { "process.env": {} },
});
