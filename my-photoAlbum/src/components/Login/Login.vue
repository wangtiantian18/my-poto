<!--
 * Author: 王甜甜
 * Date: 2020/01/03
 * Description: 登录页面
 -->
<template>
  <div class="login" :style="bgImg">
    <div class="loginBox">
      <div class="title">时光相册，欢迎您的登录</div>
      <div class="info">
        <form method="get">
          <label for="username">用户名:</label>
          <input id="username" type="text" placeholder="请输入用户名" class="inp" ref="username"/>
          <br/>
          <label for="password">密  码:</label>
          <input id="password" type="password" placeholder="请输入密码" class="inp" ref="password"/>
          <br/>
          <input class="btn subBtn" type="submit" value="点击登录" @click="submit"/>
          <input class="btn" type="reset" value="取消" @click="reset"/>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data(){
      return{
        bgImg: {
          backgroundImage: "url(" + require("../../assets/images/login_bg.gif") + ")",
        },
      }
    },
    methods:{
      submit(){
        console.log('点击登录');
      },
      reset(){
        this.$refs.username.value='';
        this.$refs.password.value='';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    height: 100%;
    .loginBox{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-70%);
      width: 500px;
      height: 350px;
      border-radius: 10px;
      background: #FFFFFF;
      .title{
        height: 150px;
        line-height: 150px;
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        //设置字体渐变属性
        background: linear-gradient(to right, #FFFF00, #8000FF);
        -webkit-background-clip: text;
        color: transparent;
      }
      .info{
        height: 200px;
        padding: 0 50px;
        form{
          label{
            display: inline-block;
            height: 50px;
            font-size: 20px;
          }
          .inp{
            position: relative;
            top: -13px;
            height: 30px;
            width: 300px;
            //去除默认样式
            border: 0px;
            outline: none;
            background:none;
            //添加自己的样式
            border-bottom: 3px solid paleturquoise;
            text-align: center;
            font-size: 16px;
            &::-webkit-input-placeholder{
              color: #D8D8D8;
            }
            &:focus{
              border-bottom: 3px solid green;
            }
          }
          #password{
            margin-left: 9px;
          }
          .btn{
            height: 40px;
            width: 110px;
            background: gainsboro;
            border: 0px;
            border-radius: 20px;
            font-size: 18px;
            cursor: pointer;
            &:hover{
              background: deepskyblue;
              color: #000;
            }
          }
          .subBtn{
            width: 250px;
            margin-right: 20px;
            background: orange;
            color: #fff;
          }
        }
      }
    }
  }
</style>
