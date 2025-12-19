<!-- pc/pages/state-own/[type].vue -->
<template>
    <div class="state-own-purchase">
        <!-- 定制采购入口 -->
        <el-card shadow="never" class="custom-purchase-card mb-6">
            <div class="flex justify-between items-center">
                <div>
                    <h2>国企央企定制化采购服务</h2>
                    <p class="text-gray-500">专属客户经理全程对接 · 批量采购享额外折扣</p>
                </div>
                <el-button type="primary" size="large" @click="showCustomDialog = true">
                    申请定制采购方案
                </el-button>
            </div>
        </el-card>

        <!-- 材料列表（带规格参数） -->
        <el-table :data="materialList" border>
            <el-table-column prop="name" label="材料名称" width="200" />
            <el-table-column prop="spec" label="规格参数" />
            <el-table-column prop="standard" label="执行标准" />
            <el-table-column prop="price" label="单价(元)" />
            <el-table-column prop="supplier" label="供应商" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="text" @click="showDetail(scope.row)"> 查看详情 </el-button>
                    <el-button type="primary" size="small" @click="addPurchase(scope.row)">
                        加入采购单
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 定制采购弹窗 -->
        <el-dialog title="定制采购方案申请" v-model="showCustomDialog" width="600px">
            <el-form :model="customForm" label-width="120px">
                <el-form-item label="采购类型" prop="type">
                    <el-select v-model="customForm.type" placeholder="请选择">
                        <el-option label="园区工程材料" value="park" />
                        <el-option label="工业原材料" value="industrial" />
                        <el-option label="建材资源" value="building" />
                    </el-select>
                </el-form-item>
                <el-form-item label="预估采购量" prop="quantity">
                    <el-input v-model="customForm.quantity" placeholder="请输入预估采购量" />
                </el-form-item>
                <el-form-item label="期望交付期" prop="deliveryDate">
                    <el-date-picker v-model="customForm.deliveryDate" type="date" />
                </el-form-item>
                <el-form-item label="联系方式" prop="contact">
                    <el-input v-model="customForm.contact" placeholder="请输入联系人及电话" />
                </el-form-item>
                <el-form-item label="备注说明">
                    <el-input type="textarea" v-model="customForm.remark" rows="4" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="showCustomDialog = false">取消</el-button>
                <el-button type="primary" @click="submitCustomForm">提交申请</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { getStateOwnMaterials } from '@/api/purchase' // 模拟接口

const showCustomDialog = ref(false)
const customForm = reactive({
    type: '',
    quantity: '',
    deliveryDate: '',
    contact: '',
    remark: ''
})

const materialList = ref([])

// 模拟数据加载
const loadMaterials = async () => {
    const res = await getStateOwnMaterials()
    materialList.value = res.list
}

const showDetail = (row) => {
    // 查看详情逻辑
}

const addPurchase = (row) => {
    // 加入采购单逻辑
}

const submitCustomForm = () => {
    // 提交定制采购申请
    console.log('提交定制方案:', customForm)
    showCustomDialog.value = false
}

// 初始化加载
loadMaterials()
</script>
