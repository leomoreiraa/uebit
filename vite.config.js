import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Base relativa para funcionar no GitHub Pages (site servido em /<repo>/)
  base: './',
  cacheDir: mode === 'e2e' ? 'node_modules/.vite-e2e' : 'node_modules/.vite',
  optimizeDeps: { include: ['monaco-editor', '@monaco-editor/react', 'postcss', 'jszip', 'file-saver', 'blockly/core', 'blockly/blocks', 'blockly/javascript', 'blockly/msg/pt-br', 'react-blockly'] },
  plugins: [react(), tailwindcss()],
}))
