<template>
    <el-container class="layout-blank">
        <el-main>
            <nuxt />
        </el-main>
    </el-container>
</template>
<script>
import MyHeader from '@/components/public/header/index'
import MyFooter from '@/components/public/footer/index'
export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>


<style lang="scss">
@import "@/assets/css/public/layout.scss";

</style>
