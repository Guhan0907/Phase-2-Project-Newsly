import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setUpTests.ts",
    coverage: {
      exclude: [
        "src/main.tsx",
        "vite.config.ts",
        "eslint.config.js",
        "vitest.config.ts",
        "vite-env.d.ts",
      ],
    },
  },
});
