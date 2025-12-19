// xnch/mock/app.ts
import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

export default [
    {
        url: '/pc/config', // 匹配 api/app.ts 中的 getConfig 接口
        method: 'get',
        response: () => ({
            code: 1,
            msg: 'success',
            data: {
                domain: 'https://mock-img.com',
                website: {
                    pc_title: '采购平台',
                    pc_ico: '/favicon.ico',
                    pc_keywords: '采购, 国企, 中小企业',
                    pc_desc: '一站式采购服务平台'
                },
                siteStatistics: {
                    clarity_code: 'mock-clarity-code'
                }
            }
        })
    }
] as MockMethod[]
