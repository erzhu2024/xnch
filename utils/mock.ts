export const mockConfig = {
    // 接口模块开关配置
    home: {
        switch: true // 开启此接口的本地模拟
    },
    purchase: {
        switch: true // 开启此接口的本地模拟
    },
    user: {
        getUserInfo: false
    }
    // 其他模块接口配置...
}

export function createMockResponse(mockData: any[], delay = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                code: 200,
                msg: 'success',
                data: {
                    list: mockData,
                    total: mockData.length
                }
            })
        }, delay)
    })
}

export function createMockResponseObject(mockData: any, delay = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData)
        }, delay)
    })
}
