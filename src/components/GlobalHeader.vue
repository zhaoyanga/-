<template>
    <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
        <router-link class="navbar-brand" to="/">春色专栏 {{ Dates }}</router-link>
        <ul v-if="!user.isLogin" class="list-inline mb-0">
            <li class="list-inline-item">
                <router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link>
            </li>
            <li class="list-inline-item">
                <router-link to="/register" class="btn btn-outline-light my-2">注册</router-link>
            </li>
        </ul>
        <ul v-else class="list-inline mb-0">
            <li class="list-inline-item">
                <DropDown :title="user.nickName ? user.nickName : '你好'">
                    <DropDownItem>
                        <router-link to="/create" class="dropdown-item">新建文章</router-link>
                    </DropDownItem>
                    <DropDownItem disabled><a href="#" class="dropdown-item">编辑资料</a></DropDownItem>
                    <DropDownItem><a href="#" class="dropdown-item" @click="store.commit('logOut')">退出登录</a></DropDownItem>
                </DropDown>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref } from 'vue'
import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'
import { UserProps, GlobalDataProps } from '../store'
import { useStore } from 'vuex'
const props = defineProps({
    user: {
        type: Object as PropType<UserProps>,
        required: true
    }
})
const store = useStore<GlobalDataProps>()
const Dates = ref(new Date())
setInterval(() => {
    Dates.value = new Date()
}, 1000)
</script>

<style lang="less" scoped>
</style>
