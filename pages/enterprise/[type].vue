<!-- pc/pages/enterprise/[type].vue -->
<template>
    <div class="enterprise-purchase container mx-auto">
        <!-- 筛选区 -->
        <el-card shadow="never" class="mb-4">
            <el-form inline :model="filterForm">
                <el-form-item label="产品类型">
                    <el-select
                        v-model="filterForm.category"
                        placeholder="全部"
                        @change="handleCategoryChange"
                    >
                        <el-option label="粮食类" value="grain" />
                        <el-option label="水产及特色农产品" value="aquatic" />
                        <el-option label="文旅餐饮物资" value="catering" />
                    </el-select>
                </el-form-item>
                <el-form-item label="采购量">
                    <el-input-number v-model="filterForm.quantity" placeholder="最小采购量" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- 产品列表 -->
        <el-grid :cols="3" :gutter="20">
            <el-grid-item v-for="item in productList" :key="item.id">
                <el-card :body-style="{ padding: '16px' }">
                    <el-image :src="item.image" fit="cover" class="product-img" />
                    <h3 class="product-title">{{ item.name }}</h3>
                    <div class="product-info">
                        <span class="price">¥{{ item.price }}/{{ item.unit }}</span>
                        <span class="stock">库存: {{ item.stock }}</span>
                    </div>
                    <el-button type="primary" class="add-cart" @click="addToCart(item)">
                        加入采购清单
                    </el-button>
                </el-card>
            </el-grid-item>
        </el-grid>

        <!-- 分页 -->
        <el-pagination
            v-model:current-page="pagination.page"
            :page-size="pagination.size"
            :total="pagination.total"
            @current-change="handlePageChange"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// 导入细化后的接口方法
import {
    getGrainEnterpriseProducts,
    getAquaticEnterpriseProducts,
    getCateringEnterpriseProducts
} from '@/api/enterprise'

// 定义产品类型
interface Product {
    id: number
    name: string
    image: string
    price: number
    unit: string
    stock: number
    spec?: string
}

const route = useRoute()
const router = useRouter()

// 根据路由参数确定当前分类
const filterForm = reactive({
    category: route.params.type as string,
    quantity: 0
})

const productList = ref<Product[]>([])
const pagination = reactive({
    page: 1,
    size: 12,
    total: 0
})

// 根据分类获取对应接口方法
const getApiMethod = () => {
    switch (filterForm.category) {
        case 'grain':
            console.log('粮食类接口')
            return getGrainEnterpriseProducts
        case 'aquatic':
            return getAquaticEnterpriseProducts
        case 'catering':
            return getCateringEnterpriseProducts
        default:
            return getGrainEnterpriseProducts // 默认返回粮食类接口
    }
}

// 获取列表数据
const getList = async () => {
    const apiMethod = getApiMethod()
    try {
        const res = await apiMethod({
            ...filterForm,
            page: pagination.page,
            size: pagination.size
        })
        productList.value = res.data.list || []
        pagination.total = res.data.total || 0
    } catch (err) {
        console.error('接口调用失败:', err) // 捕获错误
    }
}

// 处理分类切换
const handleCategoryChange = (value: any) => {
    // 切换分类时更新路由参数
    router.push(`/enterprise/${value}`)
    // 重置分页并重新获取数据
    pagination.page = 1
    getList()
}

// 处理分页变化
const handlePageChange = (page: any) => {
    pagination.page = page
    getList()
}

// 监听路由参数变化，更新数据
watch(
    () => route.params.type,
    (newType) => {
        console.log('路由参数变化:', newType)
        filterForm.category = newType as string
        pagination.page = 1 // 重置分页
        getList()
    }
)

const addToCart = (item: any) => {
    // 加入采购清单逻辑
    console.log('加入采购清单:', item)
}

// 初始化加载
getList()
</script>

<style scoped>
.product-img {
    width: 100%;
    height: 200px;
    border-radius: 4px;
}
.product-title {
    margin: 12px 0;
    font-size: 16px;
    font-weight: 500;
}
.product-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
}
.price {
    color: #f56c6c;
    font-weight: 500;
}
.add-cart {
    width: 100%;
}
</style>
