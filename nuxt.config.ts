import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'
import { getEnvConfig } from './nuxt/env'

const envConfig = getEnvConfig()
export default defineNuxtConfig({
    css: ['@/assets/styles/index.scss'],
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@element-plus/nuxt'
        // 开发环境启用 Vite Mock 插件
        //...(process.env.NODE_ENV === 'development' ? ['vite-plugin-mock/nuxt'] : [])
    ],
    app: {
        baseURL: envConfig.baseUrl
    },
    runtimeConfig: {
        public: {
            ...envConfig
        }
    },
    ssr: !!envConfig.ssr,
    // 禁用预渲染（避免500报错）
    nitro: {
        // 使用正确的配置方式禁用预渲染
        prerender: {
            crawlLinks: false
        },
        // 解决兼容性警告
        compatibilityDate: '2025-12-15',
        // 确保静态产物输出到 .output/public
        output: {
            dir: path.resolve(__dirname, '.output/public')
        }
    },
    // 禁用实验性payload提取（避免警告）
    experimental: {
        payloadExtraction: false
    },
    // 新增：Mock 配置
    vite: {
        plugins: [
            // 仅在开发环境配置 Mock 插件
            ...(process.env.NODE_ENV === 'development'
                ? [
                      viteMockServe({
                          mockPath: 'mock', // Mock 文件目录
                          localEnabled: true,
                          prodEnabled: false,
                          // 禁用自动导入，使用手动导入的 Mock 配置
                          watchFiles: false
                      })
                  ]
                : [])
        ]
    }
})
