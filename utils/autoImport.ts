// xnch/utils/autoImport.ts
import fs from 'fs'
import path from 'path'

/**
 * 动态扫描 动态扫描目录并自动导入模块
 * @param dir 目标目录（相对于项目根目录）
 * @param exclude 排除的文件名（如 index.ts）
 */
export async function autoImportModules(dir: string, exclude: string[] = []) {
    const fullDir = path.resolve(process.cwd(), dir)
    const modules: any[] = []

    // 读取目录下的所有文件
    const files = fs.readdirSync(fullDir, { withFileTypes: true })

    for (const file of files) {
        const filePath = path.join(fullDir, file.name)
        // 排除指定文件和目录
        if (exclude.includes(file.name) || file.isDirectory()) continue
        // 只处理 .ts 文件
        if (file.name.endsWith('.ts')) {
            // 动态导入模块
            const module = await import(`~/` + path.relative(process.cwd(), filePath))
            // 假设模块默认导出为数组（如 Mock 接口配置）
            if (Array.isArray(module.default)) {
                modules.push(...module.default)
            }
        }
    }

    return modules
}
