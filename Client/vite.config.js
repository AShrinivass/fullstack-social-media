import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/post": "http://localhost:3000",
      "/auth": "http://localhost:3000",
      "/images": "http://localhost:3000",
    },
  },
});
