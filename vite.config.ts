import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/fridgewise/",
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Vite 8의 Rolldown 빌더 설정 옵션 추가
    rolldownOptions: {
      external: ["react-is"],
    },
  },
});