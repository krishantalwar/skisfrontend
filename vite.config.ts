import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": "/src",
      "@formFields": "/src/components/forms/fields",
      "@covernoteField": "/src/components/forms/covernoteField",
      "@app": "/src/app",
    },
  },
});
