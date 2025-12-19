// xnch/mock/purchase.ts
import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

export default [
    // 中小企业采购接口（匹配 enterprise/[type].vue）
    {
        url: '/purchase/enterprise',
        method: 'get',
        response: ({ query }) => ({
            code: 1,
            msg: 'success',
            data: {
                list: Mock.mock({
                    [`items|${query.size || 12}`]: [
                        {
                            id: '@id',
                            name: '@ctitle(3, 6)',
                            image: '@image(200x200, @color, 产品)',
                            price: '@float(10, 100, 2, 2)',
                            unit: 'kg',
                            stock: '@integer(100, 10000)',
                            spec: '@csentence(5, 10)'
                        }
                    ]
                }).items,
                total: 100 // 总条数（用于分页）
            }
        })
    },
    // 国企采购接口（匹配 state-own/[type].vue）
    {
        url: '/purchase/state-own',
        method: 'get',
        response: () => ({
            code: 1,
            msg: 'success',
            data: {
                list: Mock.mock({
                    'items|8': [
                        {
                            id: '@id',
                            name: '@ctitle(3, 6)',
                            spec: '@csentence(10, 20)', // 规格参数
                            standard: '@csentence(5, 10)', // 执行标准
                            price: '@float(100, 5000, 2, 2)',
                            supplier: '@company()' // 供应商
                        }
                    ]
                }).items
            }
        })
    }
] as MockMethod[]
