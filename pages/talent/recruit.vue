<!-- xnch/pages/talent/recruit.vue -->
<template>
    <div class="talent-recruit">
        <!-- 搜索筛选 -->
        <el-card shadow="never" class="mb-4">
            <el-form inline :model="searchForm">
                <el-form-item label="企业名称">
                    <el-input v-model="searchForm.company" placeholder="请输入企业名称" />
                </el-form-item>
                <el-form-item label="行业类型">
                    <el-select v-model="searchForm.industry" placeholder="全部">
                        <el-option label="农产品加工" value="农产品加工" />
                        <el-option label="建筑建材" value="建筑建材" />
                        <el-option label="食品贸易" value="食品贸易" />
                        <el-option label="物流运输" value="物流运输" />
                    </el-select>
                </el-form-item>
                <el-form-item label="企业规模">
                    <el-select v-model="searchForm.scale" placeholder="全部">
                        <el-option label="100人以下" value="0-100" />
                        <el-option label="100-500人" value="100-500" />
                        <el-option label="500-1000人" value="500-1000" />
                        <el-option label="1000人以上" value="1000+" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchCompanies">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- 企业列表 -->
        <div class="company-list">
            <el-card
                shadow="never"
                class="company-item mb-4"
                v-for="company in companyList"
                :key="company.id"
            >
                <div class="company-header">
                    <el-image :src="company.logo" fit="cover" class="company-logo" />
                    <div class="company-info">
                        <h3 class="company-name">{{ company.company }}</h3>
                        <div class="company-meta">
                            <span class="industry">{{ company.industry }}</span>
                            <span class="scale">{{ company.scale }}人</span>
                            <span class="location">{{ company.location }}</span>
                            <span class="recruit-count"
                                >正在招聘 {{ company.recruitCount }} 个职位</span
                            >
                        </div>
                    </div>
                </div>
                <div class="company-desc">{{ company.desc }}</div>
                <div class="company-jobs">
                    <span>热门职位：</span>
                    <router-link
                        v-for="job in company.hotJobs"
                        :key="job"
                        :to="`/talent/jobs?keyword=${job}`"
                        class="job-link"
                    >
                        {{ job }}
                    </router-link>
                </div>
                <div class="company-footer">
                    <el-button type="primary" size="small" @click="viewCompanyJobs(company.id)">
                        查看全部职位
                    </el-button>
                </div>
            </el-card>
        </div>

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
import { getRecruitCompanies } from '@/api/talent' // 需在api/talent.ts中添加该接口定义

const searchForm = reactive({
    company: '',
    industry: '',
    scale: ''
})

const companyList = ref([])
const pagination = reactive({
    page: 1,
    size: 8,
    total: 0
})

// 获取企业招聘列表
const searchCompanies = async () => {
    const res = await getRecruitCompanies({
        ...searchForm,
        page: pagination.page,
        size: pagination.size
    })
    companyList.value = res.list
    pagination.total = res.total
}

const viewCompanyJobs = (id) => {
    console.log('查看企业职位:', id)
    // 实际项目中可跳转到该企业的职位列表页
}

const handlePageChange = (page) => {
    pagination.page = page
    searchCompanies()
}

// 初始化加载
searchCompanies()
</script>

<style scoped>
.company-header {
    display: flex;
    margin-bottom: 16px;
}
.company-logo {
    width: 80px;
    height: 80px;
    margin-right: 16px;
    border-radius: 4px;
}
.company-name {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
}
.company-meta {
    display: flex;
    gap: 16px;
    color: #666;
    font-size: 14px;
}
.company-desc {
    margin-bottom: 16px;
    color: #333;
    line-height: 1.6;
}
.company-jobs {
    margin-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
}
.job-link {
    color: #409eff;
    cursor: pointer;
}
.job-link:hover {
    text-decoration: underline;
}
.company-footer {
    text-align: right;
}
</style>
