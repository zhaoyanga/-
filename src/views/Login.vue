<template>
    <div class="login-page">
        <ValidateForm @form-submit="submitForm">
            <div class="mb-3">
                <label class="form-label">邮箱地址</label>
                <ValidateInput :rules="emailRules" v-model="emailValue" placeholder="请输入邮箱地址" type="text"
                    ref="inputRef" />
            </div>
            <div class="mb-3">
                <label class="form-label">密码</label>
                <ValidateInput type="password" placeholder="请输入密码" :rules="passWordRules" v-model="passWordValue" />
            </div>
            <template #submit>
                <button type="submit" class="btn btn-danger">保存</button>
            </template>
        </ValidateForm>
    </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RuleProps } from '../components/ValidateInput.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import createMessage from '../hooks/createMessage'
const router = useRouter()
const emailValue = ref()
const store = useStore()

const emailRules: RuleProps = [
    { type: 'required', message: '电子邮箱地址不能为空' },
    { type: 'email', message: '请输入正确的电子邮箱格式' }
]

const passWordValue = ref()
const passWordRules: RuleProps = [
    { type: 'required', message: '密码不能为空' },
    { type: 'passWord', message: '请输入正确的密码' },
    { type: 'range', min: { message: '你的密码至少包括六位，不能含有空格', length: 6 } },
    { type: 'range', max: { message: '你的密码最多包括六位，不能含有空格', length: 6 } }
]
const { proxy: { $http } } = getCurrentInstance() as any
const submitForm = (result: boolean) => {
    if (result) {
        const payload = {
            email: emailValue.value,
            password: passWordValue.value
        }
        store.dispatch('loginAndFetch', payload).then(res => {
            createMessage('登录成功', 'success', 2000)
            router.push('/')
        }).catch(e => {
            console.log(e)
        })
    }
}
</script>

<style lang="less" scoped>
</style>
