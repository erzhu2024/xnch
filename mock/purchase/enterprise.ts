// xnch/mock/purchase/enterprise.ts
export const mockData = {
    code: 200,
    msg: 'success',
    data: {
        list: [
            {
                id: 1,
                name: '优质东北大米',
                image: '/images/products/rice.jpg',
                price: 4.5,
                unit: 'kg',
                stock: 10000,
                spec: '一级籼米'
            },
            {
                id: 2,
                name: '生态小龙虾',
                image: '/images/products/crayfish.jpg',
                price: 38,
                unit: 'kg',
                stock: 5000,
                spec: '5-7钱/只'
            },
            {
                id: 3,
                name: '有机蔬菜礼盒',
                image: '/images/products/vegetable.jpg',
                price: 128,
                unit: '盒',
                stock: 2000,
                spec: '8种蔬菜组合'
            },
            {
                id: 4,
                name: '精品食用油',
                image: '/images/products/oil.jpg',
                price: 89,
                unit: '桶',
                stock: 8000,
                spec: '5L/桶'
            },
            {
                id: 5,
                name: '原生态蜂蜜',
                image: '/images/products/honey.jpg',
                price: 68,
                unit: '瓶',
                stock: 3000,
                spec: '500g/瓶'
            },
            {
                id: 6,
                name: '进口牛肉',
                image: '/images/products/beef.jpg',
                price: 138,
                unit: 'kg',
                stock: 1500,
                spec: '牛腩'
            }
        ],
        total: 60 // 总条数，用于分页
    }
}
