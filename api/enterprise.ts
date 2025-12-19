// pc/api/enterprise.ts
import { mockConfig } from '@/utils/mock'
// 动态导入中小企业采购数据
const enterpriseDataMap = {
    grain: () => import('@/api/data/enterprise/grain').then((m) => m.enterpriseGrainMock),
    aquatic: () => import('@/api/data/enterprise/aquatic').then((m) => m.enterpriseGrainMock),
    catering: () => import('@/api/data/enterprise/catering').then((m) => m.enterpriseCateringMock)
}

export async function getEnterpriseProducts(params: any) {
    if (mockConfig.purchase.switch === true) {
        const type = params.type || 'grain'
        const loadData = enterpriseDataMap[type as keyof typeof enterpriseDataMap]
        console.log('loadData', loadData)
        if (loadData) {
            const mockData = await loadData()
            return createMockResponse(mockData)
            console.log('mockData', mockData)
        }
    }
    return $request.get({ url: '/purchase/enterprise', params })
}

export function getStateOwnMaterials(params: any = {}) {
    return $request.get({ url: '/purchase/state-own', params })
}
