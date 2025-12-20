<!-- pc/pages/enterprise/catering.vue -->
<template>
    <div class="catering-purchase">
        <!-- 筛选区（餐饮类专属） -->
        <el-card shadow="never" class="mb-4">
            <el-form inline :model="filterForm" size="default">
                <!-- 基础筛选 -->
                <el-form-item label="物资名称">
                    <el-input v-model="filterForm.name" placeholder="搜索餐饮物资" clearable />
                </el-form-item>
                <el-form-item label="供应商">
                    <el-select v-model="filterForm.supplier" placeholder="选择供应商" clearable>
                        <el-option
                            v-for="supplier in supplierList"
                            :key="supplier.id"
                            :label="supplier.name"
                            :value="supplier.id"
                        />
                    </el-select>
                </el-form-item>

                <!-- 餐饮类专属筛选 -->
                <el-form-item label="物资类型">
                    <el-select v-model="filterForm.category" placeholder="全部" clearable>
                        <el-option label="一次性餐具" value="disposable" />
                        <el-option label="厨房设备" value="equipment" />
                        <el-option label="食材原料" value="ingredients" />
                        <el-option label="文旅纪念品" value="souvenir" />
                    </el-select>
                </el-form-item>
                <el-form-item label="起订量">
                    <el-select v-model="filterForm.minOrder" placeholder="全部" clearable>
                        <el-option label="100件以下" value="100" />
                        <el-option label="100-500件" value="500" />
                        <el-option label="500件以上" value="1000" />
                    </el-select>
                </el-form-item>
                <el-form-item label="配送时效">
                    <el-select v-model="filterForm.deliveryTime" placeholder="全部" clearable>
                        <el-option label="24小时内" value="24h" />
                        <el-option label="3天内" value="3d" />
                        <el-option label="7天内" value="7d" />
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
            <el-button type="success" @click="showTemplateOrder = true">
                <el-icon><FileText /></el-icon> 模板下单
            </el-button>
            <el-button @click="showHistoryPackages">
                <el-icon><Box /></el-icon> 历史套餐
            </el-button>
            <el-button @click="filterForm.isUrgent = !filterForm.isUrgent">
                <el-icon><AlarmClock /></el-icon>
                {{ filterForm.isUrgent ? '显示全部' : '只看加急件' }}
            </el-button>
        </div>

        <!-- 产品列表（突出套餐和起订量） -->
        <el-table :data="productList" border :row-key="(row) => row.id">
            <el-table-column prop="name" label="物资名称" width="200">
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
            <el-table-column prop="category" label="物资类型" />
            <el-table-column prop="spec" label="规格" />
            <el-table-column prop="supplier" label="供应商" />
            <el-table-column prop="minOrder" label="起订量" />
            <el-table-column prop="price" label="单价(元)" />
            <el-table-column prop="deliveryTime" label="配送时效" />
            <el-table-column
                label="加急费"
                v-if="filterForm.isUrgent"
                :formatter="(row) => row.urgentFee || '无'"
            />
            <el-table-column label="操作" width="200">
                <template #default="scope">
                    <el-input-number
                        v-model="scope.row.buyNum"
                        :min="scope.row.minOrder"
                        step="10"
                        class="w-32 inline-block mr-2"
                    />
                    <el-button type="primary" size="small" @click="addToOrder(scope.row)">
                        加入订单
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

        <!-- 模板下单弹窗 -->
        <el-dialog title="选择采购模板" v-model="showTemplateOrder" width="600px">
            <el-radio-group v-model="selectedTemplate">
                <el-radio
                    v-for="template in orderTemplates"
                    :key="template.id"
                    :label="template.id"
                >
                    <div class="template-item">
                        <h4>{{ template.name }}</h4>
                        <p class="text-sm text-gray-500">
                            包含 {{ template.items.length }} 种物资 | 上次使用：{{
                                template.lastUsed
                            }}
                        </p>
                        <el-button type="text" @click.stop="previewTemplate(template)">
                            预览详情
                        </el-button>
                    </div>
                </el-radio>
            </el-radio-group>
            <template #footer>
                <el-button @click="showTemplateOrder = false">取消</el-button>
                <el-button type="primary" @click="useTemplate" :disabled="!selectedTemplate">
                    使用此模板
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { FileText, Box, AlarmClock } from '@element-plus/icons-vue'
import { getCateringEnterpriseProducts, getSuppliers, getOrderTemplates } from '@/api/purchase'
import feedback from '@/utils/feedback'

interface Supplier {
    id: string | number
    name: string
}

// 筛选表单
const filterForm = reactive({
    name: '',
    supplier: '',
    category: '',
    minOrder: '',
    deliveryTime: '',
    isUrgent: false // 是否只看加急件
})

// 产品列表与分页
const productList = ref([])
const pagination = reactive({
    page: 1,
    size: 10,
    total: 0
})

// 供应商列表（用于筛选）
const supplierList = ref<Supplier[]>([])

// 模板下单相关
const orderTemplates = ref([])
const showTemplateOrder = ref(false)
const selectedTemplate = ref('')

// 获取产品列表
const getList = async () => {
    const params = {
        ...filterForm,
        page: pagination.page,
        size: pagination.size,
        ...(filterForm.isUrgent && { urgent: true })
    }
    const res = await getCateringEnterpriseProducts(params)
    productList.value = res.list.map((item) => ({
        ...item,
        buyNum: item.minOrder // 默认按起订量采购
    }))
    pagination.total = res.total
}

// 获取供应商列表
const getSuppliersList = async () => {
    const res = await getSuppliers({ type: 'catering' })
    supplierList.value = res.list
}

// 获取订单模板
const getTemplates = async () => {
    const res = await getOrderTemplates()
    orderTemplates.value = res.list
}

// 重置筛选
const resetFilter = () => {
    Object.assign(filterForm, {
        name: '',
        supplier: '',
        category: '',
        minOrder: '',
        deliveryTime: '',
        isUrgent: false
    })
    getList()
}

// 分页切换
const handlePageChange = (page) => {
    pagination.page = page
    getList()
}

// 加入订单
const addToOrder = (item) => {
    if (item.buyNum < item.minOrder) {
        return feedback.msgError(`起订量为 ${item.minOrder} 件`)
    }
    // 实际项目中调用订单接口
    feedback.msgSuccess(`${item.name} 已加入订单（${item.buyNum}件）`)
}

// 预览模板
const previewTemplate = (template) => {
    feedback.msgInfo(`模板包含：${template.items.map((i) => i.name).join('、')}`)
}

// 使用模板下单
const useTemplate = () => {
    const template = orderTemplates.value.find((t) => t.id === selectedTemplate.value)
    if (template) {
        // 实际项目中根据模板填充订单
        feedback.msgSuccess(`已使用 ${template.name} 模板，共 ${template.items.length} 种物资`)
        showTemplateOrder.value = false
    }
}

// 显示历史套餐
const showHistoryPackages = () => {
    feedback.msgInfo('加载历史采购套餐...')
}

// 初始化加载
getList()
getSuppliersList()
getTemplates()
</script>

<style scoped>
.quick-actions {
    padding: 10px 0;
}
.template-item {
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 12px;
    margin-bottom: 8px;
}
</style>
