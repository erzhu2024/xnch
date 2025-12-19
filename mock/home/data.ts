// xnch/mock/home/data.ts
export const mockData = {
    code: 200,
    msg: 'success',
    data: {
        bannerList: [
            {
                id: 1,
                title: '中小企业采购节',
                subtitle: '全场优质商品8折起',
                image: '/images/banners/banner1.jpg',
                link: '/enterprise'
            },
            {
                id: 2,
                title: '国企定制采购服务',
                subtitle: '专属客户经理1对1对接',
                image: '/images/banners/banner2.jpg',
                link: '/state-own'
            },
            {
                id: 3,
                title: '春季人才招聘会',
                subtitle: '千企万岗等你来',
                image: '/images/banners/banner3.jpg',
                link: '/talent/jobs'
            }
        ],
        hotProducts: [
            { id: 1, name: '东北大米', price: 4.5, unit: 'kg', image: '/images/products/rice.jpg' },
            {
                id: 2,
                name: '生态小龙虾',
                price: 38,
                unit: 'kg',
                image: '/images/products/crayfish.jpg'
            },
            {
                id: 3,
                name: '有机蔬菜礼盒',
                price: 128,
                unit: '盒',
                image: '/images/products/vegetable.jpg'
            },
            { id: 4, name: '精品食用油', price: 89, unit: '桶', image: '/images/products/oil.jpg' }
        ],
        suppliers: [
            {
                id: 1,
                name: '绿源农产品有限公司',
                logo: '/images/suppliers/logo1.png',
                certified: true
            },
            { id: 2, name: '中建物资集团', logo: '/images/suppliers/logo2.png', certified: true },
            { id: 3, name: '恒信粮油贸易', logo: '/images/suppliers/logo3.png', certified: false },
            { id: 4, name: '远大食材供应链', logo: '/images/suppliers/logo4.png', certified: true }
        ]
    }
}
