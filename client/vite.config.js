import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import http from "http";

export default defineConfig({
  plugins: [react()],
  root: "src",
  test: {
    environment: "jsdom",
    setupFiles: "./setup.js",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        agent: new http.Agent(),
      },
    },
  },
});
