// pc/api/purchase.ts
export function getEnterpriseProducts(params: any) {
    return $request.get({ url: '/purchase/enterprise', params })
}

export function getStateOwnMaterials(params: any = {}) {
    return $request.get({ url: '/purchase/state-own', params })
}

// 模拟数据响应示例（实际项目中由后端提供）
// {
//   "code": 200,
//   "msg": "success",
//   "data": {
//     "list": [
//       {
//         "id": 1,
//         "name": "优质大米",
//         "image": "/images/products/rice.jpg",
//         "price": 4.5,
//         "unit": "kg",
//         "stock": 10000,
//         "spec": "一级籼米"
//       }
//     ],
//     "total": 100
//   }
// }
