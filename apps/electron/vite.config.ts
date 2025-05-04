import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, "../../"));

  return {
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
    define: {
      "process.env": Object.fromEntries(
        Object.entries(env).map(([key, val]) => [key, JSON.stringify(val)])
      ),
    },
  };
});
