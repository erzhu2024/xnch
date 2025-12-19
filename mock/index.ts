// xnch/mock/index.ts
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import { autoImportModules } from '@/utils/autoImport'

// 自动扫描 mock 目录下的所有 .ts 文件（排除 index.ts）
export async function setupMockServer() {
    const mockModules = await autoImportModules('mock', ['index.ts'])
    createProdMockServer(mockModules)
}
