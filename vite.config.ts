import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import analyze from 'rollup-plugin-analyzer'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        babelrc: true,
      },
      jsxRuntime: 'automatic',
      jsxImportSource: '@emotion/react',
    }),
  ],
  esbuild: {
    jsxFactory: 'jsx',
    jsxFragment: 'Fragment',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: true,
    rollupOptions: {
      plugins: [
        analyze({
          summaryOnly: true,
          filter: ({ size }) => size > 5000,
          filterSummary: true,
        }),
      ],
    },
    lib: {
      entry: path.resolve('./src/PlasmaChatClient.tsx'),
      name: 'PlasmaChat',
      formats: ['es'],
      fileName: () => 'plasma-chat-client.standalone.js',
    },
  },
})
