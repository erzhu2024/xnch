// xnch/mock/talent/pool.ts
export const mockData = {
    code: 200,
    msg: 'success',
    data: {
        list: [
            {
                id: 1,
                name: '张三',
                position: '采购工程师',
                experience: '5年',
                education: '本科',
                location: '北京',
                salary: '15k-20k',
                skill: '供应商管理、招投标流程、ERP系统',
                updateTime: '2023-10-14'
            },
            {
                id: 2,
                name: '李四',
                position: '供应链经理',
                experience: '8年',
                education: '硕士',
                location: '上海',
                salary: '25k-35k',
                skill: '供应链优化、库存管理、跨境物流',
                updateTime: '2023-10-13'
            },
            {
                id: 3,
                name: '王五',
                position: '人力资源总监',
                experience: '10年',
                education: '本科',
                location: '广州',
                salary: '30k-50k',
                skill: '组织架构设计、绩效管理、人才发展',
                updateTime: '2023-10-11'
            }
        ],
        total: 35
    }
}
