<!-- pc/pages/enterprise/[type].vue -->
<template>
    <div class="enterprise-purchase">
        <!-- 筛选区 -->
        <el-card shadow="never" class="mb-4">
            <el-form inline :model="filterForm">
                <el-form-item label="产品类型">
                    <el-select v-model="filterForm.category" placeholder="全部">
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
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getEnterpriseProducts } from '~/api/enterprise' // 模拟接口

const route = useRoute()
const filterForm = reactive({
    category: route.params.type,
    quantity: 0
})

const productList = ref([])
const pagination = reactive({
    page: 1,
    size: 12,
    total: 0
})

// 模拟数据获取
const getList = async () => {
    const res = await getEnterpriseProducts({
        ...filterForm,
        page: pagination.page,
        size: pagination.size
    })
    productList.value = res.list
    pagination.total = res.total
}

const addToCart = (item) => {
    // 加入采购清单逻辑
    console.log('加入采购清单:', item)
}

const handlePageChange = (page) => {
    pagination.page = page
    getList()
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
