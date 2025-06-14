// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3005, // <<<---- Adicione ou modifique esta linha para a porta desejada
    // host: true, // Opcional: se quiser que seja acessível na rede local pelo IP
  },
});
