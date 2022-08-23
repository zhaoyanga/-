<template>
    <div class="container">
        <!-- <Vnode msg="Vnode" /> -->
        <!-- <H1 /> -->
        <GlobalHeader :user="currentUser" />
        <Loader text="加载中" v-if="isLoading" />
        <!-- <input type="file" name="file" @change="handleFileChange"> -->
        <!-- <img :src="url" style="height:100px;width:100px"> -->
        <router-view :key="key"></router-view>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import { computed, onMounted, watch, ref, h } from 'vue'
import GlobalHeader from './components/GlobalHeader.vue'
import Footer from './components/Footer.vue'
import Loader from './components/Loader.vue'
import Vnode from './components/Vnode'
import require from './axios'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
import createMessage from './hooks/createMessage'
import { useRoute } from 'vue-router'
const route = useRoute()
const store = useStore<GlobalDataProps>()
const currentUser = computed(() => store.state.user)
const isLoading = computed(() => store.state.loading)
const error = computed(() => store.state.error)
watch(() => error.value.status, () => {
    const { status, message } = error.value
    if (status && message) {
        createMessage(message, 'error', 2000)
    }
})
const key = computed(() => route.name ? new Date() : new Date().getTime())
// const url = ref('')
// const handleFileChange = (e: Event) => {
//     const target = e.target as HTMLInputElement
//     const files = target.files
//     if (files) {
//         const uploaedFile = files[0]
//         const formData = new FormData()
//         formData.append(uploaedFile.name, uploaedFile)
//         require.post('/upload', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         }).then(res => {
//             url.value = res.data.data.url
//         })
//     }
// }
// const H1 = () => [h('h1', 12), h('div', 34)]
</script>
<style>
</style>
