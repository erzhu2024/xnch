// xnch/mock/home.ts
import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

export default [
    {
        url: '/pc/index', // 匹配 api/shop.ts 中的 getIndex 接口
        method: 'get',
        response: () => ({
            code: 1,
            msg: 'success',
            data: {
                bannerList: Mock.mock({
                    'items|3': [
                        {
                            id: '@id',
                            image: '@image(1200x500, @color, 采购平台)',
                            title: '@ctitle(8, 12)',
                            subtitle: '@csentence(15, 30)',
                            link: '@url'
                        }
                    ]
                }).items,
                hotProducts: Mock.mock({
                    'items|4': [
                        {
                            id: '@id',
                            name: '@ctitle(5, 8)',
                            image: '@image(300x200, @color, 商品)',
                            price: '@float(10, 1000, 2, 2)',
                            unit: '@pick(["kg", "件", "套", "吨"])'
                        }
                    ]
                }).items,
                suppliers: Mock.mock({
                    'items|4': [
                        {
                            id: '@id',
                            name: '@company()',
                            logo: '@image(80x80, @color, 企业)',
                            certified: '@boolean'
                        }
                    ]
                }).items
            }
        })
    }
] as MockMethod[]
