import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3001,
    strictPort: true, // Para que falle si el puerto está ocupado en lugar de buscar otro
    open: true, // Abre el navegador automáticamente al iniciar
  },
})