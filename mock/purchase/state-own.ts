// xnch/mock/purchase/state-own.ts
export const mockData = {
    code: 200,
    msg: 'success',
    data: {
        list: [
            {
                id: 1,
                name: '高强度钢筋',
                spec: 'HRB400E φ20mm',
                standard: 'GB/T 1499.2-2018',
                price: 4800,
                supplier: '中建钢铁集团'
            },
            {
                id: 2,
                name: '混凝土',
                spec: 'C30',
                standard: 'GB/T 14902-2012',
                price: 420,
                supplier: '城建建材有限公司'
            },
            {
                id: 3,
                name: '铝合金型材',
                spec: '6061-T6',
                standard: 'GB/T 6892-2015',
                price: 23.5,
                supplier: '远大铝业'
            },
            {
                id: 4,
                name: '钢化化玻璃',
                spec: '5mm 透明',
                standard: 'GB 11614-2009',
                price: 85,
                supplier: '耀皮玻璃'
            },
            {
                id: 5,
                name: '电缆',
                spec: 'YJV-0.6/1kV 4×120',
                standard: 'GB/T 12706-2020',
                price: 18.6,
                supplier: '远东电缆'
            }
        ],
        total: 30
    }
}
