<template>
    <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
        <a class="navbar-brand" href="#">春色专栏</a>
        <ul v-if="!user.isLogin" class="list-inline mb-0">
            <li class="list-inline-item">
                <a href="#" class="btn btn-outline-light my-2" @click="Login">登陆</a>
            </li>
            <li class="list-inline-item">
                <a href="#" class="btn btn-outline-light my-2">注册</a>
            </li>
        </ul>
        <ul v-else class="list-inline mb-0">
            <li class="list-inline-item">
                <DropDown :title="`你好 ${user.name}`">
                    <DropDownItem><a href="#" class="dropdown-item">新建文章</a></DropDownItem>
                    <DropDownItem disabled ><a href="#" class="dropdown-item">编辑资料</a></DropDownItem>
                    <DropDownItem><a href="#" class="dropdown-item" @click="logOut">退出登录</a></DropDownItem>
                </DropDown>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits } from 'vue'
import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'
export interface UserProps {
    isLogin: boolean;
    name?: string;
    id?: number;
}
const props = defineProps({
    user: {
        type: Object as PropType<UserProps>,
        required: true
    }
})
const emit = defineEmits(['login', 'logOut'])
const Login = () => {
    emit('login', true)
}
const logOut = () => {
    emit('logOut', false)
}
</script>

<style lang="less" scoped>
</style>
