import { defineConfig } from 'vinxi/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  apps: {
    web: {
      name: 'web',
      type: 'spa',
      entry: './index.html',
      base: '/',
      plugins: [react()],
      vite: {
        resolve: {
          alias: {
            '~': path.resolve(__dirname, './app'),
          },
        },
      },
      server: {
        port: 3000,
      },
    },
  },
})