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
    commonjsOptions: {
      // CommonJS 형태의 내부 의존성(react-is)까지 강제로 ESM으로 변환하여 번들에 포함시킵니다.
      include: [/react-is/, /node_modules/],
    },
  },
  // 개발 서버와 빌드 단계 모두에서 react-is를 사전 최적화 항목으로 강제 고정합니다.
  optimizeDeps: {
    include: ["react-is", "recharts"],
  },
});