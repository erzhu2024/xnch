// xnch/mock/index.ts
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import { MockMethod } from 'vite-plugin-mock'

// 自动导入 mock 目录下所有 .ts 文件（排除自身）
const modules = import.meta.glob('./**/*.ts', { eager: true, import: 'default' })

const mockModules: MockMethod[] = []
Object.keys(modules).forEach((key) => {
    if (key === './index.ts') return
    const module = modules[key] as MockMethod[]
    mockModules.push(...module)
})

export function setupMockServer() {
    createProdMockServer(mockModules)
}
