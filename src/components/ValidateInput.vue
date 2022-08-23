<template>
    <div class="validate-input-container pb-3" style="position: relative">
        <input v-if="tag !== 'textarea'" v-bind="arrts" class="form-control" :class="{ 'is-invalid': inputRef.error }"
            v-model="inputRef.val" @blur="validateInput">
        <textarea v-else v-bind="arrts" class="form-control" :class="{ 'is-invalid': inputRef.error }"
            v-model="inputRef.val" @blur="validateInput"></textarea>
        <span v-if="inputRef.error" class="invalid-feedback" style=" position: absolute">{{ inputRef.message }}</span>
    </div>
</template>

<script setup lang="ts">
import { reactive, PropType, defineProps, defineEmits, useAttrs, onMounted, computed } from 'vue'
import emitter from '../ts/mitt'
export interface RuleProp {
    type: 'required' | 'email' | 'passWord' | 'range' | 'custom';
    message?: string;
    min?: {
        message: string,
        length: number
    };
    max?: {
        message: string,
        length: number
    };
    validator?: () => boolean
}
export type TagType = 'input' | 'textarea'
export type RuleProps = RuleProp[]
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const passWordReg = /^\d*$/
const props = defineProps({
    rules: Array as PropType<RuleProps>,
    modelValue: String,
    tag: {
        type: String as PropType<TagType>,
        default: 'input'
    }
})
const inputRef = reactive({
    val: computed({ // computed新写法, input上可以直接写v-model，不用:value和@input事件来更新值
        get: () => props.modelValue || '',
        set: val => {
            emit('update:modelValue', val)
        }
    }),
    error: false,
    message: ''
})
const emit = defineEmits(['update:modelValue', 'form-item-mounted'])
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
                case 'custom':
                    passed = rule.validator ? rule.validator() : true
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
    // inputRef.val = ''
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
