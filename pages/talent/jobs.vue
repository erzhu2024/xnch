<!-- pc/pages/talent/jobs.vue -->
<template>
    <div class="talent-jobs container mx-auto">
        <!-- 搜索筛选 -->
        <el-card shadow="never" class="mb-4">
            <el-form inline :model="searchForm">
                <el-form-item label="岗位名称">
                    <el-input v-model="searchForm.keyword" placeholder="请输入岗位名称" />
                </el-form-item>
                <el-form-item label="工作地点">
                    <el-select v-model="searchForm.location" placeholder="全部">
                        <el-option label="北京" value="beijing" />
                        <el-option label="上海" value="shanghai" />
                        <!-- 更多城市 -->
                    </el-select>
                </el-form-item>
                <el-form-item label="薪资范围">
                    <el-select v-model="searchForm.salary" placeholder="全部">
                        <el-option label="5k以下" value="0-5000" />
                        <el-option label="5k-10k" value="5000-10000" />
                        <!-- 更多范围 -->
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchJobs">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- 岗位列表 -->
        <div class="job-list">
            <el-card shadow="never" class="job-item mb-3" v-for="job in jobList" :key="job.id">
                <div class="job-header">
                    <h3 class="job-title">{{ job.title }}</h3>
                    <span class="salary">{{ job.salary }}</span>
                </div>
                <div class="job-info">
                    <span class="company">{{ job.company }}</span>
                    <span class="location">{{ job.location }}</span>
                    <span class="experience">{{ job.experience }}</span>
                    <span class="education">{{ job.education }}</span>
                </div>
                <div class="job-desc">{{ job.desc }}</div>
                <div class="job-footer">
                    <span class="publish-time">{{ job.publishTime }}</span>
                    <el-button type="primary" size="small" @click="applyJob(job.id)">
                        立即申请
                    </el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { getJobList } from '@/api/talent' // 模拟接口

const searchForm = reactive({
    keyword: '',
    location: '',
    salary: ''
})

const jobList = ref([])

// 模拟数据加载
const searchJobs = async () => {
    const res = await getJobList(searchForm)
    jobList.value = res.list
}

const applyJob = (id) => {
    // 申请职位逻辑
    console.log('申请职位:', id)
}

// 初始化加载
searchJobs()
</script>
