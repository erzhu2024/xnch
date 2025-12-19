// pc/api/enterprise.ts
import { mockConfig, createMockResponse } from '@/utils/mock'
// 分别导入各类别模拟数据
import { enterpriseGrainMock } from '@/api/data/enterprise/grain'
import { enterpriseAquaticMock } from '@/api/data/enterprise/aquatic'
import { enterpriseCateringMock } from '@/api/data/enterprise/catering'

/**
 * 获取粮食类企业产品数据
 * @param params 请求参数
 * @returns 产品数据
 */
export async function getGrainEnterpriseProducts(params: any) {
    if (mockConfig.purchase.switch === true) {
        return createMockResponse(enterpriseGrainMock)
    }
    return $request.get({ url: '/purchase/enterprise', params: { ...params, type: 'grain' } })
}

/**
 * 获取水产类企业产品数据
 * @param params 请求参数
 * @returns 产品数据
 */
export async function getAquaticEnterpriseProducts(params: any) {
    if (mockConfig.purchase.switch === true) {
        return createMockResponse(enterpriseAquaticMock)
    }
    return $request.get({ url: '/purchase/enterprise', params: { ...params, type: 'aquatic' } })
}

/**
 * 获取餐饮类企业产品数据
 * @param params 请求参数
 * @returns 产品数据
 */
export async function getCateringEnterpriseProducts(params: any) {
    if (mockConfig.purchase.switch === true) {
        return createMockResponse(enterpriseCateringMock)
    }
    return $request.get({ url: '/purchase/enterprise', params: { ...params, type: 'catering' } })
}
