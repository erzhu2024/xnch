import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'
import { getEnvConfig } from './nuxt/env'

const envConfig = getEnvConfig()
export default defineNuxtConfig({
    css: ['@/assets/styles/index.scss'],
    modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@element-plus/nuxt'],
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
        prerender: {
            enabled: false
        },
        // 解决兼容性警告
        compatibilityDate: '2025-12-15'
    },
    // 禁用实验性payload提取（避免警告）
    experimental: {
        payloadExtraction: false
    },
    // 确保静态产物输出到 .output/public
    output: {
        publicDir: path.resolve(__dirname, '.output/public')
    },
    // 新增：Mock 配置
    vite: {
        plugins: [
            // 环境变量控制是否启用 mock
            envConfig.useMock &&
                viteMockServe({
                    mockPath: 'mock', // mock 文件目录
                    devEnabled: true, // 开发环境启用（替代 localEnabled）
                    prodEnabled: false, // 生产环境禁用
                    injectCode: `
          import { setupMockServer } from './mock/index';
          setupMockServer();
        `
                })
        ].filter(Boolean) // 过滤 false 值
    }
})
