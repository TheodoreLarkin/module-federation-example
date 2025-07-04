import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  base: '/ui/remote_app/',
  plugins: [
    vue(),
    federation({
      name: 'remote_app',
      filename: 'remoteEntry.js',
      publicPath: '/ui/remote_app/',
      exposes: {
        './HelloWorld': './src/components/HelloWorld.vue',
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
  },
});