// xnch/mock/index.ts
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 动态导入 mock 目录下所有 .ts 文件（排除自身 index.ts）
const mockModules = import.meta.glob('./**/*.ts', {
    eager: true, // 立即加载模块
    exclude: './index.ts' // 排除当前文件
})

// 收集所有 Mock 接口配置
const mockRoutes: any[] = []
Object.values(mockModules).forEach((module: any) => {
    // 假设模块默认导出为 Mock 接口数组（如 export default [/* 接口配置 */]）
    if (Array.isArray(module.default)) {
        mockRoutes.push(...module.default)
    }
})

// 创建 Mock 服务
export function setupMockServer() {
    createProdMockServer(mockRoutes)
}
