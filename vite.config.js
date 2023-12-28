import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add an alias for @fortawesome/fontawesome-svg-core
      "@fortawesome/fontawesome-svg-core": "@fortawesome/fontawesome-svg-core",
      // Add aliases for each package in @fortawesome/free-brands-svg-icons
      "@fortawesome/free-brands-svg-icons":
        "@fortawesome/free-brands-svg-icons",
      "@fortawesome/free-solid-svg-icons": "@fortawesome/free-solid-svg-icons",
      "@fortawesome/react-fontawesome": "@fortawesome/react-fontawesome",
    },
  },
});
