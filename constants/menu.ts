export const NAVBAR = [
    {
        name: '首页',
        path: '/'
    },
    {
        name: '中小企业采购',
        path: '/enterprise',
        children: [
            { name: '粮食类', path: 'grain' }, // 修复：去掉重复的/enterprise前缀
            { name: '水产及特色农产品', path: 'aquatic' },
            { name: '文旅餐饮物资', path: 'catering' }
        ]
    },
    {
        name: '国企央企采购',
        path: '/state-own',
        children: [
            { name: '园区工程材料', path: 'park' }, // 修复：路径不再嵌套父级
            { name: '工业原材料', path: 'industrial' },
            { name: '建材资源', path: 'building' }
        ]
    },
    {
        name: '人才供应',
        path: '/talent',
        children: [
            { name: '优质岗位', path: '/talent/jobs' },
            { name: '企业招聘', path: '/talent/recruit' },
            { name: '人才库', path: '/talent/pool' }
        ]
    },
    {
        name: '供应商中心',
        path: '/supplier',
        component: 'supplier'
    },
    {
        name: '资讯中心',
        path: '/information',
        component: 'information'
    },
    {
        name: '关于我们',
        path: '/about',
        component: 'about'
    },
    {
        name: '移动端',
        path: '/mobile',
        component: 'mobile'
    },
    {
        name: '管理后台',
        path: '/admin',
        component: 'admin'
    }
]

export const SIDEBAR = [
    {
        module: 'personal',
        hidden: true,
        children: [
            {
                name: '个人中心',
                path: '/user',
                children: [
                    {
                        name: '个人信息',
                        path: 'info'
                    },
                    {
                        name: '我的收藏',
                        path: 'collection'
                    }
                ]
            },

            {
                name: '账户设置',
                path: '/account',
                children: [
                    {
                        name: '账户安全',
                        path: 'security'
                    }
                ]
            }
        ]
    }
]
