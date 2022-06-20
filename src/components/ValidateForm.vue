<template>
    <form class="validate-form-container" @submit.prevent="submitForm">
        <slot name="default"></slot>
        <div class="submit-area">
            <slot name="submit">
                <button type="submit" class="btn btn-primary">提交</button>
            </slot>
        </div>
    </form>
</template>

<script setup lang="ts">
import { defineEmits, onUnmounted } from 'vue'
import emitter, { validateFunc } from '../ts/mitt'
const emit = defineEmits(['form-submit'])
const submitForm = () => {
    const result = funcArr.map(func => func()).every(i => i)
    emit('form-submit', result)
    inputVals.forEach(func => func())
}

let funcArr: validateFunc[] = []
let inputVals: validateFunc[] = []
const callback = (func?: validateFunc) => {
    if (func) {
        funcArr.push(func)
    }
}
const clear = (inputRef?: validateFunc) => {
    if (inputRef) {
        inputVals.push(inputRef)
    }
}
emitter.on('form-item-created', callback)
emitter.on('clear', clear)
onUnmounted(() => {
    emitter.off('form-item-created', callback)
    funcArr = []
    emitter.off('clear', clear)
    inputVals = []
})
</script>
<style lang="less" scoped>
</style>
