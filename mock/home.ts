// 首页模拟数据
export default {
    // 获取首页数据
    'get /pc/home': () => {
        return {
            code: 200,
            data: {
                // 轮播图数据
                bannerList: [
                    {
                        id: 1,
                        image: '/images/banner1.jpg',
                        title: '2023年农产品采购节',
                        subtitle: '精选全国优质农产品，一站式采购解决方案',
                        link: '/enterprise'
                    },
                    {
                        id: 2,
                        image: '/images/banner2.jpg',
                        title: '国企采购专区上线',
                        subtitle: '定制化工业原材料采购服务，满足大型项目需求',
                        link: '/state-own'
                    },
                    {
                        id: 3,
                        image: '/images/banner3.jpg',
                        title: '人才对接计划',
                        subtitle: '千余家企业招聘中，专业人才快速匹配',
                        link: '/talent'
                    }
                ],
                // 热门商品数据
                hotProducts: [
                    {
                        id: 1,
                        name: '东北优质大米',
                        price: 45.9,
                        unit: '袋',
                        image: '/images/rice.jpg'
                    },
                    {
                        id: 2,
                        name: '深海冷冻虾',
                        price: 89.0,
                        unit: 'kg',
                        image: '/images/shrimp.jpg'
                    },
                    {
                        id: 3,
                        name: '特级面粉',
                        price: 32.5,
                        unit: '袋',
                        image: '/images/flour.jpg'
                    },
                    {
                        id: 4,
                        name: '天然矿泉水',
                        price: 1.5,
                        unit: '瓶',
                        image: '/images/water.jpg'
                    }
                ],
                // 供应商数据
                suppliers: [
                    {
                        id: 1,
                        name: '绿源农产品有限公司',
                        logo: '/images/supplier1.png',
                        certified: true
                    },
                    {
                        id: 2,
                        name: '工业材料集团',
                        logo: '/images/supplier2.png',
                        certified: true
                    },
                    {
                        id: 3,
                        name: '诚信水产养殖基地',
                        logo: '/images/supplier3.png',
                        certified: false
                    },
                    {
                        id: 4,
                        name: '智慧餐饮供应链',
                        logo: '/images/supplier4.png',
                        certified: true
                    }
                ]
            }
        }
    }
}
