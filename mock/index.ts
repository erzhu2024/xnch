// xnch/mock/index.ts
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import { MockMethod } from 'vite-plugin-mock'

// 自动导入 mock 目录下所有 .ts 文件（排除 index.ts 自身）
const modules = import.meta.glob('./**/*.ts', { eager: true, import: 'default' })

// 收集所有 Mock 接口
const mockModules: MockMethod[] = []
Object.keys(modules).forEach((key) => {
    if (key === './index.ts') return // 跳过入口文件
    const module = modules[key] as MockMethod[]
    mockModules.push(...module)
})

// 创建 Mock 服务
export function setupMockServer() {
    createProdMockServer(mockModules)
}
