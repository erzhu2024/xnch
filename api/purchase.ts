// pc/api/purchase.ts
import { createMockResponseObject, mockConfig } from '@/utils/mock'
import { purchaseGrainData } from '@/api/data/purchase'

export function getEnterpriseProducts(params: any) {
    if (mockConfig.purchase.switch === true) {
        return createMockResponseObject(purchaseGrainData)
    }
    return $request.get({ url: '/purchase/enterprise', params })
}

export function getStateOwnMaterials(params: any = {}) {
    return $request.get({ url: '/purchase/state-own', params })
}
