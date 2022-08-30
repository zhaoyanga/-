<template>
  <div class="create-post-page">
    <h4>{{ isEditMode ? '编辑文章' : '新建文章' }}</h4>
    <Uploader ref="uploader" class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      :action="'/upload'" :beforeUpload="beforeUpload" @file-uploaded="onFileUploaded" @deleteFile="deleteFile"
      @upload-error="onFileError" :uploaded="uploadedData">
      <template #top="{ triggerUpload }">
        <button class="btn btn-primary" @click="triggerUpload">点击上传图片</button>
      </template>
      <template #loading>
        <div class="d-flex align-items-center">
          <div class="spinner-border" role="status"></div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData && dataProps.uploadedData.data.url">
      </template>
      <h2>点击上传头图</h2>
    </Uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <Editor v-model="contentVal" :options="editorOptions" ref="editorRef" />
        <validate-input rows="10" type="text" tag="textarea" placeholder="请输入文章详情" :rules="contentRules"
          v-model="contentVal" />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">{{ isEditMode ? '更新文章' : '发表文章' }}</button>
      </template>
    </validate-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { GlobalDataProps, PostProps, ResType, ImageProps } from '../store'
import ValidateForm from '../components/ValidateForm.vue'
import Uploader from '@/components/Uploader.vue'
import createMessage from '../hooks/createMessage'
import ValidateInput, { RuleProps } from '../components/ValidateInput.vue'
import { beforeUploadCheck } from '../hooks/helper'
// import EasyMDE from 'easymde'
import EasyMde, { Options } from 'easymde'
import Editor from '@/components/Editor.vue'
interface EditorInstance {
  clear: () => void;
  getMdeInstance: () => EasyMde | null;
}
// interface aaaa {
//   deleteFile: () => void;
// }
const uploadedData = ref()
const router = useRouter()
const route = useRoute()
const isEditMode = !!route.query.id
const store = useStore<GlobalDataProps>()
const titleVal = ref('')
// 富文本编辑器
// const textArea = ref<null | HTMLTextAreaElement>(null)
const editorRef = ref<null | EditorInstance>()
let imageId = ''
const editorOptions: Options = {
  spellChecker: false // 拼写检查，没有红线
}
const titleRules: RuleProps = [
  { type: 'required', message: '文章标题不能为空' }
]
const contentVal = ref('')
const contentRules: RuleProps = [
  { type: 'required', message: '文章详情不能为空' }
]
const onFormSubmit = (result: boolean) => {
  if (result) {
    const { column, _id } = store.state.user
    if (column) {
      const newPost: PostProps = {
        title: titleVal.value,
        content: contentVal.value,
        column,
        author: _id
      }
      if (imageId) {
        newPost.image = imageId
      }
      const actionName = isEditMode ? 'updataPost' : 'createPost'
      const sendData = isEditMode ? { id: route.query.id, payload: newPost } : newPost
      store.dispatch(actionName, sendData).then(res => {
        createMessage('发表成功', 'success', 2000)
        router.push({
          name: 'column',
          params: {
            id: column
          }
        })
      })
    }
  }
}
const beforeUpload = (file: File) => {
  const result = beforeUploadCheck(file, { format: ['image/jpg', 'image/png'], size: 1 })
  const { passed, error } = result
  if (error === 'format') {
    createMessage('上传图片只能是JPG/PNG 格式', 'error', 2000)
  }
  if (error === 'size') {
    createMessage('上传图片大小不能超过1M', 'error', 2000)
  }
  return passed
}
const onFileUploaded = (res: ResType<ImageProps>) => {
  if (res.data._id) {
    imageId = res.data._id
  }
  createMessage('上传成功！', 'success', 2000)
}
const onFileError = (error: any) => {
  createMessage(`${error.err}！`, 'error', 2000)
}
const deleteFile = (res: any) => {
  console.log(res)
}
// const uploader = ref<null | aaaa>()
onMounted(() => {
  // if (textArea.value) {
  //   const easyMdeInstance = new EasyMDE({ element: textArea.value })
  // }
  // if (uploader.value) {
  //   console.log(uploader.value)
  // }
  if (editorRef.value) {
    console.log(editorRef.value.getMdeInstance())
  }
  console.log()
  if (isEditMode) {
    store.dispatch('fetchPost', route.query.id).then((res: ResType<PostProps>) => {
      const currentPost = res.data
      if (currentPost.image) {
        uploadedData.value = { data: currentPost.image }
      }
      titleVal.value = currentPost.title
      contentVal.value = currentPost.content || ''
    })
  }
})
</script>

<style lang="less" scoped>
.create-post-page /deep/.file-upload-container {
  height: 200px;
  cursor: pointer;
}

.spinner-border {
  margin-right: 10px;
}

.create-post-page /deep/.file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
