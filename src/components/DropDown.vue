<template>
    <div class="dropdown" ref="dropdownRef">
        <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">{{ title }}</a>
        <ul class="dropdown-menu" :style="{ display: 'block' }" v-show="isOpen" aria-labelledby="dropdownMenuLink">
            <slot></slot>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted, defineExpose } from 'vue'
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
const dropdownRef = ref<null | HTMLElement>(null)
const handler = (e: MouseEvent) => {
    if (dropdownRef.value) {
        if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen.value) {
            isOpen.value = false
        }
    }
}
onMounted(() => {
    document.addEventListener('click', handler)
})
onUnmounted(() => {
    document.removeEventListener('click', handler)
})

</script>

<style lang="less" scoped>
</style>
