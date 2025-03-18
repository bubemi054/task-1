import { defineConfig } from "vite";
import type { UserConfig } from "vite";
import type { UserConfig as VitestUserConfig } from "vitest";

export default defineConfig({
  test: {
    environment: "jsdom",
  },
} as UserConfig & VitestUserConfig);
