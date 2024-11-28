import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    teardownTimeout: 5000,
  },
  build: {
    target: "esnext",

    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "today-util",
      // the proper extensions will be added
      fileName: "today-util",
    },
    rollupOptions: {
      // external: ["jsdom"],
    },
  },
});
