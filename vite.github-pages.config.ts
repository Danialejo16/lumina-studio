import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  define: {
    "process.env.SUPABASE_URL": JSON.stringify(process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "https://aifafaejccexuornxsac.supabase.co"),
    "process.env.SUPABASE_PUBLISHABLE_KEY": JSON.stringify(process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpZmFmYWVqY2NleHVvcm54c2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NDk3MjgsImV4cCI6MjA5NTUyNTcyOH0.z1i1gM8evPqz9OEb3aLBYol22rlIaMY8iNdmclMOWlE"),
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});