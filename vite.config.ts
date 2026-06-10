import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * IMPORTANT:
 *   Replace `your-repo-name` with the exact name of the GitHub repository
 *   (the part after `github.com/your‑user/`).
 *   Example: if the repo URL is https://github.com/jdoe/animator‑sim,
 *   set base to "/animator-sim/".
 */
const REPO_NAME = "your-repo-name";

export default defineConfig(() => ({
  base: `/${REPO_NAME}/`,          // <-- tells Vite to prefix all assets
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