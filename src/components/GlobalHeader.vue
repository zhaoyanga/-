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
                <DropDown :title="`你好 ${user.name}`" />
                <!-- <a href="#" class="btn btn-outline-light my-2">你好 {{ user.name }}</a> -->
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits } from 'vue'
import DropDown from './DropDown.vue'
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
const emit = defineEmits(['login'])
const Login = () => {
    emit('login', true)
}
</script>

<style lang="less" scoped>
</style>
