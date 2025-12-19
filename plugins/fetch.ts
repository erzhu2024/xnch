import { createRequest } from '~~/utils/http'
import { getEnvConfig } from '~/nuxt/env'
// 获取环境变量配置
const envConfig = getEnvConfig()

export default defineNuxtPlugin(() => {
    const request = createRequest()
    //@ts-ignore 添加
    globalThis.$request = request

    const $fetchOriginal = globalThis.$fetch
    const $fetch: any = (url: string, opts?: any) => {
        opts = opts ?? {}
        // 若启用Mock，使用原生$fetch让Mock插件拦截
        if (envConfig.useMock) {
            return $fetchOriginal(url, opts)
        }
        // 否则使用真实请求
        opts.url = url
        return request.request(opts, opts.requestOptions)
    }
    $fetch.raw = $fetchOriginal.raw
    $fetch.create = $fetchOriginal.create
    //@ts-ignore 重写$fetch
    globalThis.$fetch = $fetch
})
