// mock/index.ts
const mockModules = import.meta.glob('./**/*.ts', { eager: true })
const mockMap = new Map<string, any>()

// 遍历所有mock文件，生成路径映射
Object.keys(mockModules).forEach((filePath) => {
    // 解析文件路径为接口路径（如：mock/purchase/enterprise.ts → /purchase/enterprise）
    const apiPath = filePath
        .replace(/^mock\//, '') // 去掉mock前缀
        .replace(/\.ts$/, '') // 去掉文件后缀
        .replace(/\/index$/, '') // 支持index.ts作为目录默认接口
        .replace(/\\/g, '/') // 处理windows路径

    // 导入mock数据（要求每个文件必须导出mockData）
    const module = mockModules[filePath] as { mockData: any }
    if (module.mockData) {
        mockMap.set(`/${apiPath}`, module.mockData)
    }
})

export default mockMap
