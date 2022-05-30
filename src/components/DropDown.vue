<template>
    <div class="dropdown">
        <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">{{ title }}</a>
        <ul class="dropdown-menu" :style="{ display: 'block' }" v-show="isOpen" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" href="#">新建文章</a></li>
            <li><a class="dropdown-item" href="#">编辑资料</a></li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})
const isOpen = ref(false)
const toggleOpen = () => {
    isOpen.value = !isOpen.value
}
</script>

<style lang="less" scoped>
</style>
