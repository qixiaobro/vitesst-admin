/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
  // 别名
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  // 插件
  plugins: [
    Vue({
      reactivityTransform: true,
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
        'pinia',
        {
          '@iconify/vue': [
            'Icon',
          ],
        },
      ],
      dts: true,
      resolvers: [
        ElementPlusResolver(),
      ],
      dirs: [
        './src/composables/modules',
        './src/api',
        './src/router',
        './src/store/modules',
      ],
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      resolvers: [
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({}),
      ],
    }),

    Icons(),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/vbenjs/vite-plugin-compression/blob/main/README.zh_CN.md
    // gzip
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],

  // 测试 https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },

  // css
  css: {
    preprocessorOptions: {
      // 全局引入了 scss 的文件
      scss: {
        additionalData: `
        @use "~/styles/variables.scss" as *;
        @use "~/styles/element/index.scss" as *;
      `,
        javascriptEnabled: true,
      },
    },
  },

  // 本地服务
  server: {
    host: true,
    port: 8080,
    open: true,
    cors: true,
    // 代理
    proxy: {
      '/adminapi': {
        target: 'https://devlmcs.dp123.com/',
        changeOrigin: true,
        // rewrite: path => path.replace('/api/', '/'),
      },
    },
  },

  // 构建
  build: {
    brotliSize: false,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 2000,
    // 在生产环境移除console.log
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    assetsDir: 'static/assets',
    // 静态资源打包到dist下的不同目录
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
})
