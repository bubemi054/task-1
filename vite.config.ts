import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import commonjs from "vite-plugin-commonjs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [commonjs(), react(), tailwindcss()],
  build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						return id.toString().split("node_modules/")[1].split("/")[0].toString();
					}
				},
			},
		},
		commonjsOptions: {
			transformMixedEsModules: true,
		}
	},
	resolve: {
		alias: {
			"./runtimeConfig": "./runtimeConfig.browser",
		},
	},
});
