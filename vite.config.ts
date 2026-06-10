import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * The repository name used for the `base` path.
 * Replace `your-repo-name` with the actual repo name if you publish to GitHub Pages.
 * For local development a simple slash works fine.
 */
const REPO_NAME = ""; // empty string → base = "/"

export default defineConfig(() => ({
  base: REPO_NAME ? `/${REPO_NAME}/` : "/", // fallback to root for dev
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));