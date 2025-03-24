import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.BYBIT_API_KEY": JSON.stringify(process.env.BYBIT_API_KEY),
    "process.env.BYBIT_API_SECRET": JSON.stringify(
      process.env.BYBIT_API_SECRET
    ),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // Your library's entry point
      name: "aex-library", // The global variable name
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "axios",
      ], // Prevent bundling React and ReactDOM
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          axios: "axios",
        },
      },
    },
  },
});
