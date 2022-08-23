<template>
    <div class="user-profile-component">
        <div class="d-flex align-items-center">
            <img :src="fitUrl" :alt="user.nickName" class="rounded-circle img-thumbnail">
            <div class="detail ml-2">
                <h6 class="d-block mb-0">{{ user.nickName }}</h6>
                <span class="text-truncate text-muted d-block">{{ user.description }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, PropType, defineProps } from 'vue'
import { UserProps } from '../store'
import { addColumnAvatar } from '../hooks/helper'
const props = defineProps({
    user: {
        type: Object as PropType<UserProps>,
        required: true
    }
})
const fitUrl = computed(() => {
    addColumnAvatar(props.user, 50, 50)
    const { avatar } = props.user
    return avatar && avatar.fitUrl
})
</script>

<style lang="less" scoped>
</style>
