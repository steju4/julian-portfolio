import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,

    // Kleine Assets bettet Vite standardmäßig als data:-URI ein. Für
    // Schriften ist das hier unerwünscht: Die Content-Security-Policy der
    // Seite erlaubt bewusst nur "font-src 'self'". Schriften werden darum
    // immer als eigene Datei ausgeliefert, alles andere bleibt beim
    // Standardverhalten (Einbetten unter 4 KB).
    assetsInlineLimit(filePath) {
      if (/\.(woff2?|ttf|otf|eot)$/i.test(filePath)) return false
    },
  },
})
