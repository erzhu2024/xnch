// xnch/mock/purchase.ts
import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

export default [
    {
        url: '/purchase/enterprise', // 中小企业采购接口
        method: 'get',
        response: () => ({
            code: 1,
            msg: 'success',
            data: {
                list: Mock.mock({
                    'items|10': [
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
                total: 100
            }
        })
    },
    {
        url: '/purchase/state-own', // 国企采购接口
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
                            image: '@image(200x200, @color, 建材)',
                            price: '@float(100, 5000, 2, 2)',
                            unit: '@pick(["吨", "立方", "套"])',
                            stock: '@integer(50, 5000)',
                            spec: '@csentence(5, 10)'
                        }
                    ]
                }).items,
                total: 80
            }
        })
    }
] as MockMethod[]
