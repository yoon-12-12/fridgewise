import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/fridgewise/",
  plugins: [
    react(),
    tailwindcss(),
  ],
  // 💡 최신 Vite 8 + Recharts 최적화 꼬임 해결 설정
  optimizeDeps: {
    include: ["react-is", "recharts"],
  },
});