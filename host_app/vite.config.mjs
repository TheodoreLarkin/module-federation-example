import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host_app',
      remotes: {
        remote_app: '/ui/remote_app/assets/remoteEntry.js',
      },

      shared: {
          vue: {
            singleton: true
          }
      },
    }),
  ],
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    base: '/',
  },
});