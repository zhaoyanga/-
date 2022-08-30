<template>
    <div class="vue-easymde-editor">
        <textarea ref="textArea"></textarea>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, onUnmounted, defineExpose } from 'vue'
import EasyMDE, { Options } from 'easymde'
// 需要哪些属性，类型
interface EditorProps {
    modelValue?: string;
    options?: Options;
}
// 需要哪些事件
interface EditorEvents {
    (type: 'update:modelValue', value: string): void;
    (type: 'change', value: string): void;
    (type: 'blur'): void;
}
const props = defineProps<EditorProps>()
const emits = defineEmits<EditorEvents>()
// 有了模板我们需要一些初始的数据
// 1 暴露对应的方法
// 2 结合页面实现验证的功能
const textArea = ref<null | HTMLTextAreaElement>(null) // 拿取textArea的ref
let easymdeInstance: EasyMDE | null = null // 编辑器的类型
const innerValue = ref(props.modelValue || '') // 初始值

onMounted(() => {
    if (textArea.value) {
        // 组装 options
        const config: Options = {
            ...(props.options || {}),
            element: textArea.value,
            initialValue: innerValue.value
        }
        // 初始化 EasyMDE
        easymdeInstance = new EasyMDE(config)
        // 监控对应的事件
        easymdeInstance.codemirror.on('change', () => {
            if (easymdeInstance) {
                // 拿到当前的值,传入就是赋值，不传就是取当前的值
                const updatedValue = easymdeInstance.value()
                innerValue.value = updatedValue
                emits('update:modelValue', updatedValue)
                emits('change', updatedValue)
            }
        })
        easymdeInstance.codemirror.on('blur', () => {
            if (easymdeInstance) {
                emits('blur')
            }
        })
    }
})
// 销毁对应的实例
onUnmounted(() => {
    if (easymdeInstance) {
        easymdeInstance.cleanup()
    }
    easymdeInstance = null
})
const clear = () => {
    if (easymdeInstance) {
        easymdeInstance.value('')
    }
}
const getMdeInstance = () => {
    return easymdeInstance
}
// 暴露出去
defineExpose({
    clear,
    getMdeInstance
})
</script>

<style lang="less" scoped>
</style>
