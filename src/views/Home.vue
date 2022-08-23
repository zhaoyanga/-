<template>
    <div class="home-page">
        <Swiper :imglist="imglist" :interval="3000" autoplay type="card" indicator="none" :loop="true" />
        <section class="py-5 text-center container">
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <img src="../assets/column.jpeg" alt="callout" class="w-50">
                    <h2 class="font-weight-light">随心写作，自由表达</h2>
                    <p>
                        <router-link to="/create" class="btn btn-primary my-2">开始写文章</router-link>
                    </p>
                </div>
            </div>
        </section>
        <h4 class="font-weight-bold text-center">发现精彩</h4>
        <ColumnList :list="list" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, getCurrentInstance } from 'vue'
import Swiper from '../components/Swiper.vue'
import ColumnList from '../components/ColumnList.vue'

// 使用方法
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'

// 为了可以更好的补全代码，传入之前定义的全局类型，.之后会自动联想
const store = useStore<GlobalDataProps>()
const list = computed(() => {
    return store.state.columns
})
// const { proxy: { $http } } = getCurrentInstance() as any
onMounted(() => {
    store.dispatch('fetchColumns')
    // store.dispatch('fetchColumns', $http)
})
const imglist = [
    {
        url: 'https://img0.baidu.com/it/u=1075646144,266370573&fm=253&fmt=auto&app=138&f=JPEG',
        id: 1
    },
    {
        url: 'https://img2.baidu.com/it/u=3838008341,1789189214&fm=253&fmt=auto&app=120&f=JPEG',
        id: 2
    },
    {
        url: 'https://img2.baidu.com/it/u=94899473,1482746242&fm=253&fmt=auto&app=138&f=JPEG',
        id: 3
    }
]

</script>

<style lang="less" scoped>
</style>
