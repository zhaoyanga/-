<template>
    <div class="dropdown" ref="dropdownRef">
        <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">{{ title }}</a>
        <ul class="dropdown-menu" :style="{ display: 'block' }" v-show="isOpen" aria-labelledby="dropdownMenuLink">
            <slot></slot>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
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
const isClickOutside = useClickOutside(dropdownRef)

watch(isClickOutside, () => {
    if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
    }
})
</script>

<style lang="less" scoped>
</style>
