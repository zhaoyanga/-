<template>
    <div class="column-detail-page w-75 mx-auto">
        <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
            <div class="col-3 text-center">
                <img style="width: 100%" :src="column.avatar && column.avatar.fitUrl" :alt="column.title"
                    class="rounded-circle border w-100">
            </div>
            <div class="col-9">
                <h4>{{ column.title }}</h4>
                <p class="text-muted">{{ column.description }}</p>
            </div>
        </div>
        <PostList :list="list" />
    </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { GlobalDataProps, ColumnProps } from '@/store'
import { useStore } from 'vuex'
import PostList from '../components/PostList.vue'
import { addColumnAvatar } from '../hooks/helper'
const route = useRoute()
const store = useStore<GlobalDataProps>()
const currentId = route.params.id
const { proxy: { $http } } = getCurrentInstance() as any
const list = computed(() => store.getters.getPostByCid(currentId))
const column = computed(() => {
    let selectColumn = store.getters.getColumnById(currentId) as ColumnProps | undefined
    if (selectColumn) {
        addColumnAvatar(selectColumn, 100, 100)
    }
    return selectColumn
})
onMounted(() => {
    store.dispatch('fetchColumn', currentId)
    store.dispatch('fetchPosts', currentId)
})
</script>

<style lang="less" scoped>
</style>
