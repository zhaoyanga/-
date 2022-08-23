<template>
    <el-carousel :interval="interval" height="400px" :indicator-position="indicator" :loop="loop" :autoplay="autoplay"
        @change="changeChart">
        <el-carousel-item v-for="item in imageList" :key="item.id">
            <img :src="item.url" :alt="item.alt" class="w-100" :title="item.alt">
        </el-carousel-item>
    </el-carousel>
</template>

<script setup lang="ts">
import { defineProps, PropType, computed, defineEmits } from 'vue'
export interface imgType {
    id: string | number
    alt?: string
    url: string
}

type indicatorType = 'outside' | 'none'
const props = defineProps({
    // 播放的内容
    imglist: {
        type: Array as PropType<imgType[]>,
        required: true
    },
    // 自动播放
    autoplay: {
        type: Boolean,
        required: false,
        default: false
    },
    // 自动播放间隔
    interval: {
        type: Number,
        required: false,
        default: 1000
    },
    // 循环播放
    loop: {
        type: Boolean,
        required: false,
        default: false
    },
    // 指示器
    indicator: {
        type: String as PropType<indicatorType>,
        required: false,
        default: 'outside'
    }
})
const imageList = computed(() => {
    return props.imglist.map(item => {
        if (!item.alt) {
            item.alt = '这是一张轮播图'
        }
        return item
    })
})
const emits = defineEmits(['onChange'])
const changeChart = (e: number) => {
    emits('onChange', e)
}
</script>

<style lang="less" scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

img {
    height: inherit
}
</style>
