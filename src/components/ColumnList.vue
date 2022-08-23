<template>
    <div class="row">
        <div class="col-4 mb-4" v-for="column in columnList" :key="column._id">
            <div class="card h-100 shadow-sm">
                <div class="card-body text-center">
                    <img :src="column.avatar && column.avatar.fitUrl" class="rounded-circle border border-light my-3"
                        :alt="column.title">
                    <h5 class="card-title">{{ column.title }}</h5>
                    <p class="card-text text-left">{{ column.description }}</p>
                    <!-- 模板字符串传query -->
                    <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary">进入专栏
                    </router-link>
                    <!-- 对象传query -->
                    <!-- <router-link :to="{name: 'column', params: { id: column.id }}" class="btn btn-outline-primary">
                        进入专栏
                    </router-link> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, computed } from 'vue'
import { ColumnProps, ImageProps } from '../store'
import { generateFitUrl } from '../hooks/helper'
const props = defineProps({
    list: {
        type: Array as PropType<ColumnProps[]>,
        required: true
    }
})
const columnList = computed(() => {
    return props.list.map(item => {
        generateFitUrl(item.avatar as ImageProps, 200, 110, ['m_fill'])
        return item
    })
})
</script>

<style lang="less" scoped>
.card-body img {
    width: 50px;
    height: 50px;
}
</style>
