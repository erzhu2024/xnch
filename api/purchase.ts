// pc/api/purchase.ts
export function getEnterpriseProducts(params: any) {
    return $request.get({ url: '/purchase/enterprise', params })
}

export function getStateOwnMaterials(params: any = {}) {
    return $request.get({ url: '/purchase/state-own', params })
}
