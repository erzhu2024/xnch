// xnch/mock/app.ts
import { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/pc/config', // 对应 api/app.ts 中的 getConfig
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
                },
                copyright: [
                    { key: '版权所有', value: '#' },
                    { key: '备案号', value: '#' }
                ],
                qrcode: {
                    mnp: '/images/mnp-qrcode.png', // 小程序码
                    oa: '/images/oa-qrcode.png' // 公众号码
                }
            }
        })
    }
] as MockMethod[]
