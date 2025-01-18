import { defineConfig } from "vite"
import uni from "@dcloudio/vite-plugin-uni"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0", // 允许外部访问
    port: 5173,
    cors: true, // 允许跨域
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
    proxy: {
      "/api/bizhi": {
        target: "https://tea.qingnian8.com", // 修改为基础域名
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path, // 不需要重写路径
      },
    },
  },
})
