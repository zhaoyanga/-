<template>
  <div class="post-detail-page">
    <Modal :visible="modalIsVisibel" title="删除文章" @modal-on-close="modalIsVisibel = false"
      @modal-on-confirm="hideAndDelete">
      <p>确定要删除这篇文章吗?</p>
      <template #modalFooter>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
          @click="modalIsVisibel = false">取消</button>
        <button type="button" class="btn btn-primary" @click="hideAndDelete">确认</button>
      </template>
    </Modal>
    <article class="w-75 mx-auto mb-5 pb-3" v-if="posts">
      <h2 class="mb-4">{{ posts.title }}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <UserProfile :user="posts.author" v-if="typeof posts.author === 'object'" />
        </div>
        <span class="text-muted text-right font-italic">发表于：{{ posts.createdAt }}</span>
      </div>
      <img :src="currentImageUrl" :alt="posts.title" class="rounded-lg img-fluid my-4" v-if="currentImageUrl">
      <div v-html="postHtml"></div>
      <div v-if="showEdit" class="btn-group mt-5">
        <router-link type="button" :to="{ name: 'create', query: { id: posts._id } }" class="btn btn-success">编辑
        </router-link>
        <button type="button" class="btn btn-danger" @click.prevent="modalIsVisibel = true">删除</button>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { GlobalDataProps, PostProps, ImageProps, UserProps, ResType } from '../store'
import UserProfile from '../components/UserProfile.vue'
import MarkdownIt from 'markdown-it'
import Modal from '../components/Modal.vue'
import createMessage from '@/hooks/createMessage'
const store = useStore<GlobalDataProps>()
const route = useRoute()
const router = useRouter()
const modalIsVisibel = ref(false)
const currentId = route.params.id
const md = new MarkdownIt()

const posts = computed<PostProps>(() => {
  return store.getters.getPostDetail(currentId)
})
const postHtml = computed(() => {
  if (posts.value && posts.value.content) {
    return posts.value.isHTML ? posts.value.content : md.render(posts.value.content)
  } else {
    return ''
  }
})
const currentImageUrl = computed(() => {
  if (posts.value && posts.value.image) {
    const { image } = posts.value
    return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
  } else {
    return null
  }
})
const hideAndDelete = () => {
  modalIsVisibel.value = false
  store.dispatch('deletePost', currentId).then((res: ResType<PostProps>) => {
    createMessage('删除成功', 'success', 2000)
    router.push({
      name: 'column',
      params: {
        id: res.data.column
      }
    })
  })
}
const showEdit = computed(() => {
  const { isLogin, _id } = store.state.user
  if (posts.value && posts.value.author && isLogin) {
    const postAuthor = posts.value.author as UserProps
    return postAuthor._id === _id
  } else {
    return false
  }
})
onMounted(() => {
  store.dispatch('fetchPost', currentId)
})
</script>

<style lang="less" scoped>
</style>
