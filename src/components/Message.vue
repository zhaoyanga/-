<template>
    <div v-if="isVisible" class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
        :style="backgroundObject">
        <span>{{ message }}</span>
        <button type="button" class="btn-close" aria-label="Close" @click.prevent="hide"></button>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, PropType, defineEmits } from 'vue'
import useDomCreate from '../hooks/useDomCreate'
export type Messagetype = 'success' | 'error' | 'default'
const props = defineProps({
    message: String,
    type: {
        type: String as PropType<Messagetype>,
        default: 'default'
    }
})
const emits = defineEmits(['close-message'])
useDomCreate('message')
const isVisible = ref(true)
let colors = {
    success: '#67C23A',
    error: '#F56C6C',
    default: '#909399'
}
const backgroundObject = {
    background: colors[props.type]
}
const hide = () => {
    isVisible.value = false
    emits('close-message', true)
}
</script>

<style lang="less" scoped>
</style>
