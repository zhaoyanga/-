<template>
    <div class="post-list">
        <article v-for="post in postList" :key="post._id" class="card mb-3 shadow-sm">
            <div class="card-body">
                <h4><router-link :to="`/posts/${post._id}`">{{ post.title }}</router-link></h4>
                <div class="row my-3 align-items-center">
                    <div v-if="post.image && typeof post.image !== 'string'" class="col-3">
                        <img :src="post.image && post.image.url" :alt="post.title" class="rounded-lg w-100">
                    </div>
                    <p :class="{ 'col-8': post.image }" class="text-muted">{{ post.excerpt }}</p>
                </div>
                <span class="text-muted">{{ post.createdAt }}</span>
            </div>
        </article>
    </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, computed } from 'vue'
import { PostProps, ImageProps } from '../store'
import { generateFitUrl } from '../hooks/helper'
const props = defineProps({
    list: {
        required: true,
        type: Array as PropType<PostProps[]>
    }
})
const postList = computed(() => {
    return props.list.map(item => {
        generateFitUrl(item.image as ImageProps, 200, 110, ['m_fill'])
        return item
    })
})
</script>

<style lang="less" scoped>
</style>
