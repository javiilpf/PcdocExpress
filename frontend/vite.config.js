import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const apiUrl = mode === 'production' 
    ? '/api'  // En producción, usamos una ruta relativa
    : 'http://localhost:8000/api';

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl)
    },
    server: {
      host: true,
      port: 3000,
      watch: {
        usePolling: true
      }
    },
    base: '/' // Aseguramos que los assets se cargan correctamente
  }
})
