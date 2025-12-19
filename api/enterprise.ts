// pc/api/enterprise.ts
import { mockConfig, createMockResponse } from '@/utils/mock'
// 直接导入各子模块数据
import { enterpriseGrainMock } from '@/api/data/enterprise/grain'
import { enterpriseAquaticMock } from '@/api/data/enterprise/aquatic'
import { enterpriseCateringMock } from '@/api/data/enterprise/catering'

// 映射关系对象
const enterpriseDataMap = {
    grain: enterpriseGrainMock,
    aquatic: enterpriseAquaticMock,
    catering: enterpriseCateringMock
}

export async function getEnterpriseProducts(params: any) {
    if (mockConfig.purchase.switch === true) {
        // 默认使用粮食类数据
        const type = params.type || 'grain'
        // 获取对应类型的模拟数据
        const mockData = enterpriseDataMap[type as keyof typeof enterpriseDataMap]
        console.log('mockData', mockData)
        if (mockData) {
            return createMockResponse(mockData)
        }
    }
    return $request.get({ url: '/purchase/enterprise', params })
}

export function getStateOwnMaterials(params: any = {}) {
    return $request.get({ url: '/purchase/state-own', params })
}
