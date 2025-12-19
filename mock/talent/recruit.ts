// xnch/mock/talent/recruit.ts
export const mockData = {
    code: 200,
    msg: 'success',
    data: {
        list: [
            {
                id: 1,
                company: '绿源农产品有限公司',
                logo: '/images/companies/logo1.png',
                scale: '500-1000人',
                industry: '农产品加工',
                location: '北京',
                recruitCount: 15,
                hotJobs: ['采购经理', '质检专员', '仓储主管'],
                desc: '专注于有机农产品生产与销售的国家级农业产业化龙头企业'
            },
            {
                id: 2,
                company: '中建物资集团',
                logo: '/images/companies/logo2.png',
                scale: '1000-5000人',
                industry: '建筑建材',
                location: '上海',
                recruitCount: 28,
                hotJobs: ['供应链专员', '材料工程师', '招投标专员'],
                desc: '为大型基建项目提供一站式物资供应服务的综合性企业'
            },
            {
                id: 3,
                company: '恒信粮油贸易',
                logo: '/images/companies/logo3.png',
                scale: '100-500人',
                industry: '食品贸易',
                location: '广州',
                recruitCount: 8,
                hotJobs: ['人事主管', '财务经理', '市场专员'],
                desc: '专业从事粮油进出口贸易的综合性商贸企业'
            }
        ],
        total: 18
    }
}
