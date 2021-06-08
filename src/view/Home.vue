<template>
    <div>{{ user.userInfo.value.name }}</div>
    <div>{{ user.userInfo.value.hobbies }}</div>
    <div>{{ config.config }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useConfig } from "./composable/useConfig";
import { useUser } from "./composable/useUser";
export default defineComponent({
    setup() {
        const user = useUser()
        const config = useConfig()
        return {
            user,
            config

        }
    }
})
</script>