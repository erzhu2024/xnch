// xnch/mock/talent/jobs.ts
export const mockData = {
    code: 200,
    msg: 'success',
    data: {
        list: [
            {
                id: 1,
                title: '采购经理',
                salary: '15k-25k',
                company: '绿源农产品有限公司',
                location: '北京',
                experience: '3-5年',
                education: '本科',
                desc: '负责公司采购策略制定，供应商管理及采购流程优化，要求有农产品行业经验优先。',
                publishTime: '2023-10-15'
            },
            {
                id: 2,
                title: '供应链专员',
                salary: '8k-12k',
                company: '中建物资集团',
                location: '上海',
                experience: '1-3年',
                education: '大专',
                desc: '负责物资调度及库存管理，熟练使用ERP系统，具备良好的沟通能力。',
                publishTime: '2023-10-12'
            },
            {
                id: 3,
                title: '人事主管',
                salary: '12k-18k',
                company: '恒信粮油贸易',
                location: '广州',
                experience: '5年以上',
                education: '本科',
                desc: '负责人力资源全模块管理，侧重招聘与绩效体系搭建，有快消行业经验者优先。',
                publishTime: '2023-10-10'
            }
        ],
        total: 20
    }
}
