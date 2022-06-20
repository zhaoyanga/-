<template>
    <div class="container">
        <GlobalHeader :user="currentUser" @login="login" @logOut="logOut" />
        <ColumnList :list="testData" />
        <ValidateForm action="" @form-submit="submitForm">
            <div class="mb-3">
                <label class="form-label">邮箱地址</label>
                <ValidateInput ref="inputRef" placeholder="请输入邮箱地址" type="text" class="hellp treer" :rules="emailRules"
                    v-model="emailValue" />
            </div>
            <div class="mb-3">
                <label class="form-label">密码</label>
                <ValidateInput placeholder="请输入密码" type="password" class="hellp treer" :rules="passWordRules"
                    v-model="passWordValue" />
            </div>
            <template #submit>
                <button type="submit" class="btn btn-danger">保存</button>
            </template>
        </ValidateForm>
    </div>
</template>

<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import { ref, reactive } from 'vue'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ValidateInput, { RuleProps } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'

const currentUser = reactive<UserProps>({
    isLogin: false
})
const testData: ColumnProps[] = [
    {
        id: 1,
        title: 'test1的专栏',
        description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'https://img0.baidu.com/it/u=1075646144,266370573&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
    },
    {
        id: 2,
        title: 'test2的专栏',
        description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧'
        // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
    },
    {
        id: 3,
        title: 'test3的专栏',
        description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'https://img2.baidu.com/it/u=3838008341,1789189214&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800'
    },
    {
        id: 4,
        title: 'test4的专栏',
        description: '这是的test4专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'https://img2.baidu.com/it/u=94899473,1482746242&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
    }
]
const login = (val: boolean) => {
    currentUser.isLogin = val
    currentUser.name = '昭阳'
}
const logOut = (val: boolean) => {
    currentUser.isLogin = val
    currentUser.name = ''
}
const emailRules: RuleProps = [
    { type: 'required', message: '电子邮箱地址不能为空' },
    { type: 'email', message: '请输入正确的电子邮箱格式' }
]
const passWordRules: RuleProps = [
    { type: 'required', message: '密码不能为空' },
    { type: 'passWord', message: '请输入正确的密码' },
    { type: 'range', min: { message: '你的密码至少包括六位，不能含有空格', length: 6 } },
    { type: 'range', max: { message: '你的密码最多包括六位，不能含有空格', length: 6 } }
]
const emailValue = ref()
const passWordValue = ref()

const inputRef = ref<any>()
const submitForm = (result: boolean) => {
    console.log(result)
}
</script>
<style>
</style>
