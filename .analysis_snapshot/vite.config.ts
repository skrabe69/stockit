import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      routesDirectory: path.resolve(__dirname, './app/routes'),
      generatedRouteTree: path.resolve(__dirname, './app/routes/routeTree.gen.ts'),
    }),
  ],
  root: './app',
  publicDir: '../public',
  envDir: path.resolve(__dirname, '.'),
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
})