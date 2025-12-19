// xnch/mock/home.ts
import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

export default [
    {
        url: '/home/data', // 对应 api/home.ts 中的 getHomeData
        method: 'get',
        response: () => ({
            code: 1,
            msg: 'success',
            data: {
                // 轮播图数据（匹配首页轮播组件）
                bannerList: Mock.mock({
                    'items|3': [
                        {
                            id: '@id',
                            image: '@image(1200x500, @color, 采购平台)',
                            title: '@ctitle(8, 12)',
                            subtitle: '@csentence(15, 30)',
                            link: '/enterprise' // 跳转链接
                        }
                    ]
                }).items,
                // 热门商品（匹配热门采购商品区块）
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
                // 供应商数据（匹配供应商推荐区块）
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
