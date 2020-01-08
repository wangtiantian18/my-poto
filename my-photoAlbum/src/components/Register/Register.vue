<!--
 * Author: 王甜甜
 * Date: 2020/01/02
 * Description: 注册页面
 -->
<template>
    <div class="register" :style="bgImg">
      <div class="registerBox">
        <div class="title">时光相册</div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "Register",
      data(){
        return{
          bgImg: {
            backgroundImage: "url(" + require("../../assets/images/002.png") + ")",
          },
        }
      }
    }
</script>

<style scoped lang="scss">
  .register{
    height: 100%;
    background: paleturquoise;
    .registerBox{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 500px;
      height: 400px;
      transform: translate(-50%,-50%);
      background: #fff;
      border-radius: 10px;
      .title{
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
    }
  }
</style>
