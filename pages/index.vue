<!-- pc pc/pages/index.vue -->
<template>
    <div class="index-page">
        <!-- 头部轮播 -->
        <el-carousel height="500px" class="home-carousel">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
                <el-image :src="item.image" fit="cover" class="w-full h-full" />
                <div class="carousel-desc">
                    <h2>{{ item.title }}</h2>
                    <p>{{ item.subtitle }}</p>
                    <el-button type="primary" size="large" :to="item.link"> 立即查看 </el-button>
                </div>
            </el-carousel-item>
        </el-carousel>

        <!-- 资讯板块（从index copy.vue迁移） -->
        <div class="container mx-auto py-16">
            <div class="flex">
                <div class="w-[750px] h-[340px] flex-none mr-5">
                    <ElCarousel
                        v-if="getSwiperData.enabled"
                        class="w-full"
                        trigger="click"
                        height="340px"
                    >
                        <ElCarouselItem v-for="item in showList" :key="item.id">
                            <NuxtLink :to="item.link.path" target="_blank">
                                <ElImage
                                    class="w-full h-full rounded-[8px] bg-white overflow-hidden"
                                    :src="appStore.getImageUrl(item.image)"
                                    fit="contain"
                                />
                            </NuxtLink>
                        </ElCarouselItem>
                    </ElCarousel>
                </div>
                <InformationCard
                    link="/information/new"
                    class="flex-1 min-w-0"
                    header="最新资讯"
                    :data="pageData.new"
                    :show-time="false"
                />
            </div>

            <div class="mt-5 flex">
                <InformationCard
                    link="/information"
                    class="w-[750px] flex-none mr-5"
                    header="全部资讯"
                    :data="pageData.all"
                    :only-title="false"
                />
                <InformationCard
                    link="/information/hot"
                    class="flex-1"
                    header="热门资讯"
                    :data="pageData.hot"
                    :only-title="false"
                    image-size="mini"
                    :show-author="false"
                    :show-desc="false"
                    :show-click="false"
                    :border="false"
                    :title-line="2"
                />
            </div>
        </div>

        <!-- 核心业务板块 -->
        <div class="business-section container mx-auto py-16">
            <h2 class="text-3xl font-bold text-center mb-12">核心采购业务</h2>

            <div class="grid grid-cols-3 gap-8">
                <!-- 中小企业采购板块 -->
                <el-card class="business-card hover:shadow-lg transition-shadow">
                    <div class="business-icon bg-green-100 text-green-600">
                        <icon name="el-icon-Goods" size="32" />
                    </div>
                    <h3 class="text-xl font-semibold mt-4">中小企业采购</h3>
                    <p class="text-gray-600 mt-2">专注粮食类、水产及特色农产品、文旅餐饮物资供应</p>
                    <div class="mt-6">
                        <el-button
                            type="primary"
                            @click="$router.push('/enterprise')"
                            class="w-full"
                        >
                            进入采购中心
                        </el-button>
                        <div class="mt-4 flex justify-between">
                            <router-link
                                to="/enterprise/grain"
                                class="text-blue-600 hover:underline"
                                >粮食类</router-link
                            >
                            <router-link
                                to="/enterprise/aquatic"
                                class="text-blue-600 hover:underline"
                                >水产品</router-link
                            >
                            <router-link
                                to="/enterprise/catering"
                                class="text-blue-600 hover:underline"
                                >餐饮物资</router-link
                            >
                        </div>
                    </div>
                </el-card>

                <!-- 国企央企采购板块 -->
                <el-card class="business-card hover:shadow-lg transition-shadow">
                    <div class="business-icon bg-blue-100 text-blue-600">
                        <icon name="el-icon-Building" size="32" />
                    </div>
                    <h3 class="text-xl font-semibold mt-4">国企央企采购</h3>
                    <p class="text-gray-600 mt-2">提供园区工程、工业原材料、建材资源定制化采购</p>
                    <div class="mt-6">
                        <el-button
                            type="primary"
                            @click="$router.push('/state-own')"
                            class="w-full"
                        >
                            定制采购方案
                        </el-button>
                        <div class="mt-4 flex justify-between">
                            <router-link to="/state-own/park" class="text-blue-600 hover:underline"
                                >工程材料</router-link
                            >
                            <router-link
                                to="/state-own/industrial"
                                class="text-blue-600 hover:underline"
                                >工业原料</router-link
                            >
                            <router-link
                                to="/state-own/building"
                                class="text-blue-600 hover:underline"
                                >建材资源</router-link
                            >
                        </div>
                    </div>
                </el-card>

                <!-- 人才供应板块 -->
                <el-card class="business-card hover:shadow-lg transition-shadow">
                    <div class="business-icon bg-orange-100 text-orange-600">
                        <icon name="el-icon-User" size="32" />
                    </div>
                    <h3 class="text-xl font-semibold mt-4">人才供应</h3>
                    <p class="text-gray-600 mt-2">连接上下游企业优质岗位与专业人才</p>
                    <div class="mt-6">
                        <el-button type="primary" @click="$router.push('/talent')" class="w-full">
                            浏览优质岗位
                        </el-button>
                        <div class="mt-4 flex justify-between">
                            <router-link to="/talent/jobs" class="text-blue-600 hover:underline"
                                >岗位列表</router-link
                            >
                            <router-link to="/talent/recruit" class="text-blue-600 hover:underline"
                                >企业招聘</router-link
                            >
                            <router-link to="/talent/pool" class="text-blue-600 hover:underline"
                                >人才库</router-link
                            >
                        </div>
                    </div>
                </el-card>
            </div>
        </div>

        <!-- 热门采购商品 -->
        <div class="hot-products bg-gray-50 py-16">
            <div class="container mx-auto">
                <h2 class="text-3xl font-bold text-center mb-12">热门采购商品</h2>
                <div class="grid grid-cols-4 gap-6">
                    <el-card v-for="item in hotProducts" :key="item.id" class="product-card">
                        <el-image :src="item.image" fit="cover" class="product-img" />
                        <div class="product-info mt-4">
                            <h4 class="font-medium">{{ item.name }}</h4>
                            <p class="text-red-500 mt-2">¥{{ item.price }}/{{ item.unit }}</p>
                            <el-button
                                type="primary"
                                size="small"
                                class="mt-3 w-full"
                                @click="addToCart(item)"
                            >
                                加入采购清单
                            </el-button>
                        </div>
                    </el-card>
                </div>
                <div class="text-center mt-8">
                    <el-button type="text" @click="$router.push('/enterprise')">
                        查看更多商品 <icon name="el-icon-ArrowRight" />
                    </el-button>
                </div>
            </div>
        </div>

        <!-- 供应商推荐 -->
        <div class="suppliers container mx-auto py-16">
            <h2 class="text-3xl font-bold text-center mb-12">优质供应商</h2>
            <el-row :gutter="20">
                <el-col :span="6" v-for="supplier in suppliers" :key="supplier.id">
                    <div class="supplier-card text-center p-6 border rounded-lg">
                        <el-avatar :src="supplier.logo" size="80" class="mx-auto" />
                        <h4 class="mt-4 font-medium">{{ supplier.name }}</h4>
                        <div class="flex-star text-yellow-400 mt-2">
                            <icon name="el-icon-Star" v-for="n in 5" :key="n" />
                        </div>
                        <p class="text-gray-600 text-sm mt-2">
                            {{ supplier.certified ? '已认证' : '未认证' }}
                        </p>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { getHomeData } from '@/api/home' // 新增首页API
import { getIndex } from '@/api/shop' // 保留原有shop接口
import { ElCarousel, ElCarouselItem, ElImage } from 'element-plus'
import InformationCard from '@/components/information/card.vue'
import { useAppStore } from '~~/stores/app'

// 获取首页主数据
const { data: homeData } = await useAsyncData('homeData', () => getHomeData(), {
    default: () => ({
        bannerList: [],
        hotProducts: [],
        suppliers: []
    })
})

// 获取资讯相关数据（从index copy.vue迁移）
const { data: pageData } = await useAsyncData('pageData', () => getIndex(), {
    default: () => ({
        all: [],
        hot: [],
        new: [],
        page: {}
    })
})

// 轮播图数据
const bannerList = ref(homeData.value.bannerList)
const hotProducts = ref(homeData.value.hotProducts)
const suppliers = ref(homeData.value.suppliers)

// 处理资讯轮播数据（从index copy.vue迁移）
const appStore = useAppStore()
const getSwiperData = computed(() => {
    try {
        const data = JSON.parse(pageData.value.page.data)
        return data.find((item) => item.name === 'pc-banner')?.content || {}
    } catch (error) {
        return {}
    }
})

const showList = computed(() => {
    return getSwiperData.value?.data || []
})

const addToCart = (item) => {
    // 加入采购清单逻辑
    console.log('加入采购清单:', item)
}
</script>

<style lang="scss" scoped>
.home-carousel {
    position: relative;
    .carousel-desc {
        position: absolute;
        left: 10%;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        h2 {
            font-size: 40px;
            margin-bottom: 20px;
        }
        p {
            font-size: 18px;
            margin-bottom: 30px;
            max-width: 600px;
        }
    }
}

.business-card {
    .business-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.product-card {
    .product-img {
        width: 100%;
        height: 200px;
    }
}
</style>
