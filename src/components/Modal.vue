<template>
    <teleport to="#modal">
        <div class="modal modal-mask" tabindex="-1" v-if="visible" @click.self="modalMaskClick">
            <div class="modal-dialog">
                <div class="modal-content" :style="{ width: modalWidth, height: modalHeight }">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ title }}</h5>
                        <button type="button" @click="onClose" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="modalFooter">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                @click="onClose">取消</button>
                            <button type="button" class="btn btn-primary" @click="onConfirm">确认</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue'
import useDomCreate from '../hooks/useDomCreate'
const props = defineProps({
    title: String, // 标题
    visible: { // 控制开关
        type: Boolean,
        default: false
    },
    modalWidth: { // 宽度
        type: String,
        default: '400px'
    },
    modalHeight: { // 高度
        type: String,
        default: 'none'
    },
    markModal: { // 点击遮罩层是否关闭
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['modal-on-close', 'modal-on-confirm'])
useDomCreate('modal')
const onClose = () => {
    emits('modal-on-close')
}
const onConfirm = () => {
    emits('modal-on-confirm')
}
const modalMaskClick = () => {
    if (props.markModal) {
        emits('modal-on-close')
    }
}
watch(() => props.visible, (newVal) => {
    if (newVal) {
        document.getElementsByTagName('body')[0].className = 'modal-open'
    } else {
        document.getElementsByTagName('body')[0].className = ''
    }
})

</script>

<style lang="less" scoped>
.modal-mask {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 3000;
}
</style>
