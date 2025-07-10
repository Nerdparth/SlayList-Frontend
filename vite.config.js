import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/task-api': {
        target: 'https://nerdparth2.pythonanywhere.com',  // your backend
        changeOrigin: true,
        
      },
    },
  },
});
