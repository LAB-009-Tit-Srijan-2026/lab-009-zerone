import { defineConfig } from 'vite'
import path from 'path'
<<<<<<< HEAD
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

=======
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
>>>>>>> dd389dfef8810a6390c2959c0d88349de8a7124a

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
<<<<<<< HEAD
    resolveId(id) {
=======
    resolveId(id: string) {
>>>>>>> dd389dfef8810a6390c2959c0d88349de8a7124a
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
