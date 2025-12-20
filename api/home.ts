import { mockConfig, createMockResponse } from '@/utils/mock'
import { homeBannerMock } from '@/api/data/home/index'
export function getHomeData() {
    if (mockConfig.home.switch === true) {
        return createMockResponse(homeBannerMock)
    }
    return $request.get({ url: '/pc/home' })
}
