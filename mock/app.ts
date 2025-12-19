// xnch/mock/app.ts（示例）
import { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/pc/config', // 必须与页面请求的接口路径完全一致
        method: 'get',
        response: () => ({
            code: 1,
            msg: 'success',
            data: {
                domain: 'https://mock-img.com',
                website: {
                    pc_title: '采购平台（Mock数据）',
                    pc_ico: '/favicon.ico'
                }
            }
        })
    }
] as MockMethod[]
