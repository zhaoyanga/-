<template>
    <teleport to="#back">
        <div class="d-flex justify-content-center align-items-center h-100 loading-container"
            :style="{ background: background || '' }">
            <div class="loading-content">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">{{ text || 'loading' }}</span>
                </div>
                <p v-if="text" class="text-primary small">{{ text }}</p>
            </div>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import { defineProps, onUnmounted } from 'vue'
import useDomCreate from '../hooks/useDomCreate'
const props = defineProps({
    text: {
        type: String
    },
    background: {
        type: String
    }
})
useDomCreate('back')
</script>

<style lang="less" scoped>
.loading-container {
    background: rgba(255, 255, 255, .5);
    z-index: 100;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.loading-container {
    text-align: center;
}
</style>
