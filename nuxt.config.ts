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
            // 只有当 NUXT_PUBLIC_USE_MOCK 为 true 时才启用 mock 插件
            envConfig.useMock &&
                viteMockServe({
                    mockPath: 'mock', // 固定指向 mock 目录
                    localEnabled: true, // 由环境变量控制总开关，这里固定为 true
                    prodEnabled: false, // 生产环境始终禁用（即使 useMock 为 true）
                    injectCode: `
          import { setupMockServer } from './mock/index';
          setupMockServer();
        `
                })
        ].filter(Boolean) // 过滤掉 false 值，避免插件报错
    }
})
