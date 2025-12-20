<!-- pc/pages/enterprise/grain.vue -->
<template>
    <div class="grain-purchase">
        <!-- 筛选区（粮食类专属） -->
        <el-card shadow="never" class="mb-4">
            <el-form inline :model="filterForm" size="default">
                <!-- 基础筛选 -->
                <el-form-item label="产品名称">
                    <el-input v-model="filterForm.name" placeholder="搜索产品" clearable />
                </el-form-item>
                <el-form-item label="采购量">
                    <el-input-number
                        v-model="filterForm.quantity"
                        placeholder="最小采购量(kg)"
                        min="0"
                        step="10"
                    />
                </el-form-item>
                <el-form-item label="价格范围">
                    <el-range-input
                        v-model="filterForm.priceRange"
                        placeholder="请输入价格范围"
                        unit="元/kg"
                    />
                </el-form-item>

                <!-- 粮食类专属筛选 -->
                <el-form-item label="产地">
                    <el-select v-model="filterForm.origin" placeholder="全部" clearable>
                        <el-option label="黑龙江" value="heilongjiang" />
                        <el-option label="吉林" value="jilin" />
                        <el-option label="河南" value="henan" />
                        <el-option label="山东" value="shandong" />
                    </el-select>
                </el-form-item>
                <el-form-item label="保质期">
                    <el-select v-model="filterForm.shelfLife" placeholder="全部" clearable>
                        <el-option label="6个月以内" value="halfYear" />
                        <el-option label="6-12个月" value="oneYear" />
                        <el-option label="1年以上" value="moreThanOneYear" />
                    </el-select>
                </el-form-item>
                <el-form-item label="认证类型">
                    <el-select v-model="filterForm.certification" placeholder="全部" clearable>
                        <el-option label="有机认证" value="organic" />
                        <el-option label="绿色食品" value="green" />
                        <el-option label="无公害" value="pollutionFree" />
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="getList">搜索</el-button>
                    <el-button @click="resetFilter">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- 快捷操作区 -->
        <div class="quick-actions mb-4 flex gap-2">
            <el-button type="success" @click="showBulkOrder = true">
                <el-icon><ShoppingCart /></el-icon> 批量下单
            </el-button>
            <el-button @click="filterForm.isCommon = !filterForm.isCommon">
                <el-icon><Star /></el-icon> {{ filterForm.isCommon ? '显示全部' : '只看常用品' }}
            </el-button>
            <el-button @click="reuseHistoryOrder">
                <el-icon><RefreshLeft /></el-icon> 复用历史订单
            </el-button>
        </div>

        <!-- 产品列表 -->
        <el-table
            :data="productList"
            border
            :row-key="(row) => row.id"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="50" />
            <el-table-column prop="name" label="产品名称" width="200">
                <template #default="scope">
                    <div class="flex items-center">
                        <el-image
                            :src="scope.row.image"
                            fit="cover"
                            class="w-10 h-10 mr-2 rounded"
                        />
                        <span>{{ scope.row.name }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="spec" label="规格" />
            <el-table-column prop="origin" label="产地" />
            <el-table-column prop="shelfLife" label="保质期" />
            <el-table-column prop="price" label="单价(元/kg)" />
            <el-table-column prop="stock" label="库存(kg)" />
            <el-table-column prop="certification" label="认证类型" />
            <el-table-column label="操作" width="200">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="addToCart(scope.row, 100)">
                        加入采购单
                    </el-button>
                    <el-button size="small" @click="toggleCommon(scope.row.id)">
                        <el-icon
                            ><Star :fill="scope.row.isCommon ? '#f59e0b' : 'transparent'"
                        /></el-icon>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
            v-model:current-page="pagination.page"
            :page-size="pagination.size"
            :total="pagination.total"
            @current-change="handlePageChange"
            class="mt-4"
        />

        <!-- 批量下单弹窗 -->
        <el-dialog title="批量下单" v-model="showBulkOrder" width="600px">
            <el-table :data="selectedProducts" border>
                <el-table-column prop="name" label="产品名称" />
                <el-table-column label="采购量(kg)">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.buyQuantity" min="100" step="50" />
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="单价(元)" />
                <el-table-column
                    label="小计(元)"
                    :formatter="(row) => row.buyQuantity * row.price"
                />
            </el-table>
            <template #footer>
                <el-button @click="showBulkOrder = false">取消</el-button>
                <el-button type="primary" @click="submitBulkOrder">提交订单</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { ShoppingCart, Star, RefreshLeft } from '@element-plus/icons-vue'
import { getGrainEnterpriseProducts } from '@/api/purchase'
import { getHistoryOrders } from '@/api/order' // 假设的历史订单接口
import feedback from '@/utils/feedback'

// 筛选表单
const filterForm = reactive({
    name: '',
    quantity: 0,
    priceRange: [] as [number, number],
    origin: '',
    shelfLife: '',
    certification: '',
    isCommon: false // 是否只看常用品
})

// 产品列表与分页
const productList = ref([])
const pagination = reactive({
    page: 1,
    size: 10,
    total: 0
})

// 批量选择相关
const selectedProducts = ref([])
const showBulkOrder = ref(false)

// 获取产品列表
const getList = async () => {
    const params = {
        ...filterForm,
        page: pagination.page,
        size: pagination.size,
        // 处理价格范围参数
        minPrice: filterForm.priceRange[0] || undefined,
        maxPrice: filterForm.priceRange[1] || undefined
    }
    const res = await getGrainEnterpriseProducts(params)
    productList.value = res.list.map((item) => ({
        ...item,
        buyQuantity: 100 // 默认采购量
    }))
    pagination.total = res.total
}

// 重置筛选条件
const resetFilter = () => {
    Object.assign(filterForm, {
        name: '',
        quantity: 0,
        priceRange: [],
        origin: '',
        shelfLife: '',
        certification: '',
        isCommon: false
    })
    getList()
}

// 分页切换
const handlePageChange = (page) => {
    pagination.page = page
    getList()
}

// 批量选择
const handleSelectionChange = (rows) => {
    selectedProducts.value = rows.map((row) => ({ ...row, buyQuantity: 100 }))
}

// 加入采购单
const addToCart = (item, quantity) => {
    // 实际项目中调用购物车接口
    feedback.msgSuccess(`${item.name} 已加入采购单（${quantity}kg）`)
}

// 切换常用品
const toggleCommon = (id) => {
    const item = productList.value.find((item) => item.id === id)
    if (item) {
        item.isCommon = !item.isCommon
        feedback.msgSuccess(item.isCommon ? '已添加到常用品' : '已移除常用品')
    }
}

// 复用历史订单
const reuseHistoryOrder = async () => {
    try {
        const res = await getHistoryOrders({ type: 'grain', limit: 1 })
        if (res.list.length) {
            const latestOrder = res.list[0]
            // 填充历史订单的产品到当前选择
            selectedProducts.value = latestOrder.items.map((item) => ({
                ...item,
                buyQuantity: item.quantity // 复用历史采购量
            }))
            showBulkOrder.value = true
        } else {
            feedback.msgInfo('暂无历史订单')
        }
    } catch (err) {
        feedback.msgError('获取历史订单失败')
    }
}

// 提交批量订单
const submitBulkOrder = () => {
    // 实际项目中调用下单接口
    feedback.msgSuccess(`已提交 ${selectedProducts.value.length} 种产品的采购订单`)
    showBulkOrder.value = false
}

// 初始化加载
getList()
</script>

<style scoped>
.quick-actions {
    padding: 10px 0;
}
</style>
