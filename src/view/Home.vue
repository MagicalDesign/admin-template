<template>
    <div>{{ user.userInfo.value.name }}</div>
    <div>{{ user.userInfo.value.hobbies }}</div>
    <div>{{ config.config }}</div>
    <el-row>
        <el-button plain>朴素按钮</el-button>
        <el-button type="primary" plain>主要按钮</el-button>
        <el-button type="success" plain>成功按钮</el-button>
        <el-button type="info" plain>信息按钮</el-button>
        <el-button type="warning" plain>警告按钮</el-button>
        <el-button type="danger" plain>危险按钮</el-button>
    </el-row>

    <HelloWorld></HelloWorld>

    <Greeting></Greeting>
    <SimpleGreeting name="pyx"></SimpleGreeting>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useConfig } from "./composable/useConfig";
import { useUser } from "./composable/useUser";
import { Greeting, SimpleGreeting } from "./component/TsxHelloWorld"
import HelloWorld from "./component/HelloWorld.vue"
export default defineComponent({
    components: {
        HelloWorld,
        Greeting,
        SimpleGreeting,
    },
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