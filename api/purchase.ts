// pc/api/purchase.ts
import { enterpriseProductsMock } from '@/api/data/purchase'

export function getEnterpriseProducts(params: any) {
    return $request.get({ url: '/purchase/enterprise', params })
}

export function getStateOwnMaterials(params: any = {}) {
    return $request.get({ url: '/purchase/state-own', params })
}
