<template>
    <div class="index-page">
        <!-- 轮播容器：移除多余的block类，直接控制轮播高度 -->
        <div class="carousel-container">
            <el-carousel
                class="jz-carousel"
                height="90vh"
                autoplay
                indicator-position="bottom-right"
                arrow="hover"
            >
                <el-carousel-item v-for="(item, index) in bannerList" :key="index">
                    <!-- 背景图片层：修复style绑定，添加核心样式类 -->
                    <div class="carousel-bg" :style="{ backgroundImage: `url(${item.image})` }">
                        <!-- 备用图片：如果背景图加载失败，el-image作为兜底 -->
                        <el-image :src="item.image" fit="cover" class="w-full h-full" lazy-load />
                    </div>
                    <!-- 内容悬浮层：保留原有内容 -->
                    <div class="carousel-content">
                        <h2 class="carousel-title">{{ item.name || '默认标题' }}</h2>
                        <p class="carousel-subtitle">{{ item.spec || '默认副标题' }}</p>
                        <el-button
                            type="primary"
                            size="large"
                            class="carousel-btn"
                            :to="item.link || '#'"
                        >
                            {{ item.btnText || '立即查看' }}
                        </el-button>
                    </div>
                </el-carousel-item>
            </el-carousel>
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
import { ref } from 'vue'
import { getHomeData } from '@/api/home' // 新增首页API

// 模拟数据（实际项目中通过API获取）
const { data } = await useAsyncData('homeData', () => getHomeData(), {
    default: () => ({
        bannerList: [],
        hotProducts: [],
        suppliers: []
    })
})
//console.log('data', data.value.data.list)
const bannerList = ref(data.value.data.list)
const hotProducts = ref(data.value.hotProducts)
const suppliers = ref(data.value.suppliers)

const addToCart = (item: any) => {
    // 加入采购清单逻辑
    console.log('加入采购清单:', item)
}
</script>

<style lang="scss" scoped>
// 轮播背景图层
.carousel-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover; // 背景图铺满
    background-position: center; // 背景图居中
    z-index: 1;

    // 隐藏el-image的默认占位，仅作为背景图兜底
    .el-image {
        opacity: 0; // 隐藏el-image，只显示background-image
    }
}
// 轮播内容悬浮层
.carousel-content {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    z-index: 10;
    color: #fff;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    max-width: 600px;

    .carousel-title {
        font-size: 48px;
        font-weight: bold;
        margin-bottom: 24px;
    }

    .carousel-subtitle {
        font-size: 18px;
        margin-bottom: 36px;
        opacity: 0.9;
    }

    .carousel-btn {
        padding: 12px 32px;
        font-size: 16px;
        background: #165dff;
        border: none;
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
