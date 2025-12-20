<!-- pc/pages/enterprise/aquatic.vue -->
<template>
    <div class="aquatic-purchase">
        <!-- 筛选区（水产类专属） -->
        <el-card shadow="never" class="mb-4">
            <el-form inline :model="filterForm" size="default">
                <!-- 基础筛选 -->
                <el-form-item label="产品名称">
                    <el-input v-model="filterForm.name" placeholder="搜索水产/农产品" clearable />
                </el-form-item>
                <el-form-item label="采购量">
                    <el-input-number
                        v-model="filterForm.quantity"
                        placeholder="最小采购量(kg)"
                        min="0"
                        step="5"
                    />
                </el-form-item>
                <el-form-item label="价格范围">
                    <el-range-input
                        v-model="filterForm.priceRange"
                        placeholder="请输入价格范围"
                        unit="元/kg"
                    />
                </el-form-item>

                <!-- 水产类专属筛选 -->
                <el-form-item label="产品类型">
                    <el-select v-model="filterForm.category" placeholder="全部" clearable>
                        <el-option label="鲜活水产" value="fresh" />
                        <el-option label="冷冻水产" value="frozen" />
                        <el-option label="干货" value="dried" />
                        <el-option label="特色农产品" value="special" />
                    </el-select>
                </el-form-item>
                <el-form-item label="鲜活度">
                    <el-select v-model="filterForm.freshness" placeholder="全部" clearable>
                        <el-option label="鲜活" value="live" />
                        <el-option label="冰鲜" value="chilled" />
                        <el-option label="冷冻" value="frozen" />
                    </el-select>
                </el-form-item>
                <el-form-item label="配送要求">
                    <el-select v-model="filterForm.delivery" placeholder="全部" clearable>
                        <el-option label="全程冷链" value="coldChain" />
                        <el-option label="普通物流" value="normal" />
                        <el-option label="当日达" value="sameDay" />
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
            <el-button type="success" @click="showBatchBuy = true">
                <el-icon><ShoppingCart /></el-icon> 批量采购
            </el-button>
            <el-button @click="filterForm.isFresh = !filterForm.isFresh">
                <el-icon><IceCream /></el-icon> {{ filterForm.isFresh ? '显示全部' : '只看鲜活品' }}
            </el-button>
            <el-button @click="showNearbySuppliers">
                <el-icon><Map /></el-icon> 附近供应商
            </el-button>
        </div>

        <!-- 产品列表（卡片式更适合展示生鲜） -->
        <el-grid :cols="3" :gutter="20">
            <el-grid-item v-for="item in productList" :key="item.id">
                <el-card :body-style="{ padding: '16px' }" class="product-card">
                    <!-- 鲜活标签 -->
                    <div v-if="item.freshness === 'live'" class="fresh-tag">鲜活</div>

                    <el-image :src="item.image" fit="cover" class="product-img" />

                    <div class="product-info mt-3">
                        <h3 class="product-title">{{ item.name }}</h3>
                        <div class="flex justify-between text-sm text-gray-500 mt-1">
                            <span>规格：{{ item.spec }}</span>
                            <span>产地：{{ item.origin }}</span>
                        </div>
                        <div class="flex justify-between items-center mt-3">
                            <span class="price">¥{{ item.price }}/kg</span>
                            <span class="stock" :class="{ low: item.stock < 50 }">
                                库存：{{ item.stock }}kg {{ item.stock < 50 ? '(库存偏低)' : '' }}
                            </span>
                        </div>
                        <div class="mt-3 flex gap-2">
                            <el-input-number
                                v-model="item.buyQuantity"
                                min="5"
                                step="5"
                                class="flex-1"
                                placeholder="采购量"
                            />
                            <el-button
                                type="primary"
                                @click="addToCart(item)"
                                :disabled="item.stock < item.buyQuantity"
                            >
                                加入采购单
                            </el-button>
                        </div>
                    </div>
                </el-card>
            </el-grid-item>
        </el-grid>

        <!-- 分页 -->
        <el-pagination
            v-model:current-page="pagination.page"
            :page-size="pagination.size"
            :total="pagination.total"
            @current-change="handlePageChange"
            class="mt-4"
        />

        <!-- 批量采购弹窗 -->
        <el-dialog title="批量采购" v-model="showBatchBuy" width="700px">
            <el-table :data="cartList" border>
                <el-table-column prop="name" label="产品名称" />
                <el-table-column prop="freshness" label="鲜活度" />
                <el-table-column label="采购量(kg)">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.buyQuantity" min="5" step="5" />
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="单价(元)" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button
                            type="text"
                            text-color="#ff4d4f"
                            @click="removeFromCart(scope.row.id)"
                        >
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="flex justify-end mt-2">
                <span class="text-lg font-medium">合计：¥{{ totalPrice }}</span>
            </div>
            <template #footer>
                <el-button @click="showBatchBuy = false">取消</el-button>
                <el-button type="primary" @click="submitOrder">提交采购订单</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { ShoppingCart, IceCream, Map } from '@element-plus/icons-vue'
import { getAquaticEnterpriseProducts } from '@/api/purchase'
import feedback from '@/utils/feedback'

// 筛选表单
const filterForm = reactive({
    name: '',
    quantity: 0,
    priceRange: [] as [number, number],
    category: '',
    freshness: '',
    delivery: '',
    isFresh: false // 是否只看鲜活品
})

// 产品列表与分页
const productList = ref([])
const pagination = reactive({
    page: 1,
    size: 9, // 卡片式展示，每页9条
    total: 0
})

// 购物车与批量采购
const cartList = ref([])
const showBatchBuy = ref(false)

// 计算总价
const totalPrice = computed(() => {
    return cartList.value.reduce((sum, item) => sum + item.buyQuantity * item.price, 0).toFixed(2)
})

// 获取产品列表
const getList = async () => {
    const params = {
        ...filterForm,
        page: pagination.page,
        size: pagination.size,
        minPrice: filterForm.priceRange[0] || undefined,
        maxPrice: filterForm.priceRange[1] || undefined,
        // 鲜活品筛选
        ...(filterForm.isFresh && { freshness: 'live' })
    }
    const res = await getAquaticEnterpriseProducts(params)
    productList.value = res.list.map((item) => ({
        ...item,
        buyQuantity: 5 // 水产类默认起订量5kg
    }))
    pagination.total = res.total
}

// 重置筛选
const resetFilter = () => {
    Object.assign(filterForm, {
        name: '',
        quantity: 0,
        priceRange: [],
        category: '',
        freshness: '',
        delivery: '',
        isFresh: false
    })
    getList()
}

// 分页切换
const handlePageChange = (page) => {
    pagination.page = page
    getList()
}

// 加入采购单
const addToCart = (item) => {
    if (item.buyQuantity > item.stock) {
        return feedback.msgError('采购量超过库存')
    }
    // 检查是否已在购物车
    const existing = cartList.value.find((cart) => cart.id === item.id)
    if (existing) {
        existing.buyQuantity += item.buyQuantity
    } else {
        cartList.value.push({ ...item })
    }
    feedback.msgSuccess(`已添加 ${item.name} 到采购单`)
}

// 从购物车移除
const removeFromCart = (id) => {
    cartList.value = cartList.value.filter((item) => item.id !== id)
}

// 显示附近供应商
const showNearbySuppliers = () => {
    // 实际项目中调用地图接口展示附近供应商
    feedback.msgInfo('正在加载附近30公里内的供应商...')
}

// 提交订单
const submitOrder = () => {
    if (cartList.value.length === 0) {
        return feedback.msgError('请添加采购产品')
    }
    // 实际项目中调用下单接口，包含冷链配送等参数
    feedback.msgSuccess(`已提交 ${cartList.value.length} 种产品的采购订单，将为您安排冷链配送`)
    showBatchBuy.value = false
}

// 初始化加载
getList()
</script>

<style scoped>
.product-card {
    position: relative;
    transition: transform 0.2s;
    &:hover {
        transform: translateY(-4px);
    }
}
.product-img {
    width: 100%;
    height: 180px;
    border-radius: 4px;
}
.fresh-tag {
    position: absolute;
    top: 16px;
    left: 16px;
    background: #10b981;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
}
.price {
    color: #f56c6c;
    font-weight: 500;
}
.stock {
    font-size: 12px;
}
.stock.low {
    color: #f56c6c;
}
.quick-actions {
    padding: 10px 0;
}
</style>
