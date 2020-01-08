<template>
    <el-container class="layout-default">
        <el-header>
          <my-header></my-header>  
        </el-header>
        <el-main>
            <nuxt />
        </el-main>
        <el-footer height="100%">
          <my-footer></my-footer>
        </el-footer>
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
