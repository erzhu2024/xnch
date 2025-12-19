// xnch/mock/index.ts

// 手动导入所有 Mock 文件（根据实际文件结构调整）
import appMock from './app'
//import accountMock from './account.ts'
//import userMock from './user.ts'

const mockModules = [
    ...appMock
    //...shopMock,
    //...userMock,
    //...accountMock,
    //...newsMock
]

// 导出完整的Mock配置
export default mockModules
