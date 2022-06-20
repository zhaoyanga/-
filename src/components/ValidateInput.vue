<template>
    <div class="validate-input-container pb-3">
        <input v-bind="arrts" class="form-control" :class="{ 'is-invalid': inputRef.error }" :value="inputRef.val"
            @blur="validateInput" @input="updateValue">
        <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
    </div>
</template>

<script setup lang="ts">
import { reactive, PropType, defineProps, defineEmits, useAttrs, onMounted } from 'vue'
import emitter from '../ts/mitt'
export interface RuleProp {
    type: 'required' | 'email' | 'passWord' | 'range',
    message?: string,
    min?: {
        message: string,
        length: number
    },
    max?: {
        message: string,
        length: number
    }
}

export type RuleProps = RuleProp[]
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const passWordReg = /^[0-9]*$/
const props = defineProps({
    rules: Array as PropType<RuleProps>,
    modelValue: String
})
const inputRef = reactive({
    val: props.modelValue || '',
    error: false,
    message: ''
})
const emit = defineEmits(['update:modelValue', 'form-item-mounted'])
const updateValue = (e: Event) => {
    const targetValue = (e.target as HTMLInputElement).value
    inputRef.val = targetValue
    emit('update:modelValue', targetValue)
}
const validateInput = () => {
    if (props.rules) {
        const allPassed = props.rules.every(rule => {
            let passed = true
            inputRef.message = rule.message as string
            switch (rule.type) {
                case 'required':
                    passed = (inputRef.val.trim() !== '')
                    break
                case 'email':
                    passed = emailReg.test(inputRef.val)
                    break
                case 'passWord':
                    passed = passWordReg.test(inputRef.val)
                    break
                case 'range':
                    if (rule.min) {
                        passed = inputRef.val.length >= 6
                        inputRef.message = rule.min?.message as string
                    } else if (rule.max) {
                        passed = inputRef.val.length <= 6
                        inputRef.message = rule.max?.message as string
                    }
                    break
                default:
                    break
            }
            return passed
        })
        inputRef.error = !allPassed
        return allPassed
    }
    return true
}
const arrts = useAttrs()
const clearInput = () => {
    inputRef.val = ''
}
onMounted(() => {
    emitter.emit('form-item-created', validateInput)
    emitter.emit('clear', clearInput)
})
</script>
<script lang="ts">
export default {
    inheritAttrs: false
}
</script>
<style lang="less" scoped>
</style>
