<template>
    <div class="file-upload">
        <div @click.stop="deleteFile" v-if="false">
            <slot name="delete" v-if="fileStatus === 'success'">
                <button class="btn btn-danger">删除</button>
            </slot>
        </div>
        <div>
            <slot name="top" :triggerUpload="triggerUpload">
                <button class="btn btn-primary" @click.prevent="triggerUpload">点击上传</button>
            </slot>
        </div>
        <div class="file-upload-container" v-bind="$attrs" @click.prevent="triggerUpload">
            <slot name="loading" v-if="fileStatus === 'loading'">
                <button class="btn btn-primary" disabled>正在上传</button>
            </slot>
            <slot name="uploaded" :uploadedData="uploadedData" v-else-if="fileStatus === 'success'">
                <button class="btn btn-primary">上传成功</button>
            </slot>
            <slot v-else name="default">
                <button class="btn btn-primary">点击上传</button>
            </slot>
        </div>
        <input type="file" class="file-input d-none" ref="fileInput" @change="hanleFileChange">
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, PropType, defineEmits, watch, defineExpose } from 'vue'
import require from '../axios'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
const props = defineProps({
    action: {
        type: String,
        required: true
    },
    beforeUpload: {
        type: Function as PropType<CheckFunction>
    },
    uploaded: {
        type: Object
    }
})
const emits = defineEmits(['file-uploaded', 'upload-error', 'deleteFile'])
// 拿取DOM节点
const fileInput = ref<null | HTMLInputElement>(null)
const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready')
const uploadedData = ref(props.uploaded)
watch(() => props.uploaded, (newVal) => {
    if (newVal) {
        fileStatus.value = 'success'
        uploadedData.value = newVal
    }
})
// d点击按钮模拟input点击事件，触发上传文件操作
const triggerUpload = () => {
    if (fileInput.value) {
        fileInput.value.click()
    }
}
// 选择文件事件
const hanleFileChange = (e: Event) => {
    // 断言 e.target断言成inputDOM节点
    const currentTarget = e.target as HTMLInputElement
    if (currentTarget.files) {
        const files = Array.from(currentTarget.files)
        if (props.beforeUpload) {
            const result = props.beforeUpload(files[0])
            if (!result) {
                if (fileInput.value) {
                    fileInput.value.value = ''
                }
                return
            }
        }
        fileStatus.value = 'loading'
        // currentTarget.files是伪数组，这里把他转换成真数组

        const formData = new FormData()
        formData.append('file', files[0])
        require.post(props.action, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            fileStatus.value = 'success'
            uploadedData.value = res.data
            emits('file-uploaded', res.data)
        }).catch((err) => {
            fileStatus.value = 'error'
            emits('upload-error', { err })
        }).finally(() => { // 不管成功还是失败都会触发
            if (fileInput.value) {
                fileInput.value.value = ''
            }
        })
    }
}
// 删除文件
const deleteFile = () => {
    if (fileInput.value) {
        fileInput.value.value = ''
        fileStatus.value = 'ready'
        emits('deleteFile', true)
    }
}
// defineExpose({
//     deleteFile
// })
</script>
<script lang="ts">
export default {
    inheritAttrs: false
}
</script>
<style lang="less" scoped>
</style>
