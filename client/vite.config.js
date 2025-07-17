import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import postcss from "./postcss.config.js";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // or use '0.0.0.0'
  },
  plugins: [react()],
  css: {
    postcss,
  },
});
