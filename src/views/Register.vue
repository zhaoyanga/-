<template>
    <div class="login-page">
        <ValidateForm @form-submit="submitForm">
            <div class="mb-3">
                <label class="form-label">邮箱地址</label>
                <ValidateInput :rules="emailRules" v-model="formData.email" placeholder="请输入邮箱地址" type="text"
                    ref="inputRef" />
            </div>
            <div class="mb-3">
                <label class="form-label">昵称</label>
                <ValidateInput :rules="nameRules" v-model="formData.nickName" placeholder="请输入昵称" type="text"
                    ref="inputRef" />
            </div>
            <div class="mb-3">
                <label class="form-label">密码</label>
                <ValidateInput type="password" placeholder="请输入密码" :rules="passWordRules" v-model="formData.passWord" />
            </div>
            <div class="mb-3">
                <label class="form-label">重复密码</label>
                <ValidateInput type="password" placeholder="请再次输入密码" :rules="repeatPassWordRules"
                    v-model="formData.repeatPassWord" />
            </div>
            <template #submit>
                <button type="submit" class="btn btn-danger">注册新用户</button>
            </template>
        </ValidateForm>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RuleProps } from '@/components/ValidateInput.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import createMessage from '../hooks/createMessage'
const router = useRouter()
const store = useStore()
const formData = reactive({
    email: '',
    nickName: '',
    passWord: '',
    repeatPassWord: ''
})
const emailRules: RuleProps = [
    { type: 'required', message: '电子邮箱地址不能为空' },
    { type: 'email', message: '请输入正确的电子邮箱格式' }
]
const nameRules: RuleProps = [
    { type: 'required', message: '昵称不能为空' }
]
const passWordRules: RuleProps = [
    { type: 'required', message: '密码不能为空' },
    { type: 'passWord', message: '请输入正确的密码' },
    { type: 'range', min: { message: '你的密码至少包括六位，不能含有空格', length: 6 } },
    { type: 'range', max: { message: '你的密码最多包括六位，不能含有空格', length: 6 } }
]
const repeatPassWordRules: RuleProps = [
    { type: 'required', message: '重复密码不能为空' },
    {
        type: 'custom',
        validator: () => {
            return formData.passWord === formData.repeatPassWord
        },
        message: '密码不相同'
    }
]
const submitForm = (result: boolean) => {
    if (result) {
        const payload = {
            email: formData.email,
            nickName: formData.nickName,
            password: formData.passWord
        }
        store.dispatch('register', payload).then(res => {
            createMessage('注册成功，即将跳转到登录页面', 'success', 2000)
            setTimeout(() => {
                router.push('/login')
            })
        }).catch(e => {
            console.log(e)
        })
        // store.dispatch('loginAndFetch', payload).then(res => {
        //     createMessage('登录成功', 'success', 2000)
        //     router.push('/')
        // }).catch(e => {
        //     console.log(e)
        // })
    }
}
</script>

<style lang="less" scoped>
</style>
