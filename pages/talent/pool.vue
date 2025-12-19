<!-- xnch/pages/talent/pool.vue -->
<template>
    <div class="talent-pool">
        <!-- 搜索筛选 -->
        <el-card shadow="never" class="mb-4">
            <el-form inline :model="searchForm">
                <el-form-item label="姓名/职位">
                    <el-input v-model="searchForm.keyword" placeholder="请输入关键词" />
                </el-form-item>
                <el-form-item label="工作经验">
                    <el-select v-model="searchForm.experience" placeholder="全部">
                        <el-option label="1年以内" value="0-1" />
                        <el-option label="1-3年" value="1-3" />
                        <el-option label="3-5年" value="3-5" />
                        <el-option label="5年以上" value="5+" />
                    </el-select>
                </el-form-item>
                <el-form-item label="工作地点">
                    <el-select v-model="searchForm.location" placeholder="全部">
                        <el-option label="北京" value="北京" />
                        <el-option label="上海" value="上海" />
                        <el-option label="广州" value="广州" />
                        <el-option label="深圳" value="深圳" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchTalents">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- 人才列表 -->
        <div class="talent-list">
            <el-card
                shadow="never"
                class="talent-item mb-3"
                v-for="talent in talentList"
                :key="talent.id"
            >
                <div class="talent-header">
                    <h3 class="talent-name">{{ talent.name }} - {{ talent.position }}</h3>
                    <span class="salary">{{ talent.salary }}</span>
                </div>
                <div class="talent-info">
                    <span class="experience">经验：{{ talent.experience }}</span>
                    <span class="education">学历：{{ talent.education }}</span>
                    <span class="location">地点：{{ talent.location }}</span>
                    <span class="update-time">更新：{{ talent.updateTime }}</span>
                </div>
                <div class="talent-skills">
                    <span
                        class="skill-tag"
                        v-for="skill in talent.skill.split('、')"
                        :key="skill"
                        >{{ skill }}</span
                    >
                </div>
                <div class="talent-footer">
                    <el-button type="primary" size="small" @click="contactTalent(talent.id)">
                        联系人才
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
import { getTalentPool } from '@/api/talent' // 需在api/talent.ts中添加该接口定义

const searchForm = reactive({
    keyword: '',
    experience: '',
    location: ''
})

const talentList = ref([])
const pagination = reactive({
    page: 1,
    size: 10,
    total: 0
})

// 获取人才列表
const searchTalents = async () => {
    const res = await getTalentPool({
        ...searchForm,
        page: pagination.page,
        size: pagination.size
    })
    talentList.value = res.list
    pagination.total = res.total
}

const contactTalent = (id) => {
    console.log('联系人才:', id)
}

const handlePageChange = (page) => {
    pagination.page = page
    searchTalents()
}

// 初始化加载
searchTalents()
</script>

<style scoped>
.talent-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}
.talent-name {
    font-size: 18px;
    font-weight: 500;
}
.salary {
    color: #f56c6c;
    font-weight: 500;
}
.talent-info {
    display: flex;
    gap: 20px;
    margin-bottom: 16px;
    color: #666;
}
.talent-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
}
.skill-tag {
    background: #f5f5f5;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
}
.talent-footer {
    text-align: right;
}
</style>
