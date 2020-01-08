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
          <div class="tabWay">
            <span class="wayStyle" :class="wayFlag?'wayStyle2':''" @click="way1">账号登录</span>
            <span class="wayStyle" :class="!wayFlag?'wayStyle2':''" @click="way2">验证码登录</span>
          </div>
          <div class="way1" v-if="wayFlag">
            <input type="text" placeholder="请输入用户名或邮箱" class="inp" ref="username"/>
            <br/>
            <input type="password" placeholder="请输入密码" class="inp" ref="password"/>
            <br/>
            <a class="found">忘记密码</a>
          </div>
          <div class="way2" v-if="!wayFlag">
            <input type="text" placeholder="请输入你的邮箱" class="inp" ref="useremail"/>
            <br/>
            <input type="text" placeholder="请输入验证码" class="inp inpcode" ref="code"/>
            <button class="btnCode">获取验证码</button>
          </div>
          <input class="btn subBtn" type="submit" value="点击登录" @click="submit"/>
          <input class="btn" type="reset" value="取消" @click="reset"/>
        </form>
      </div>
      <p class="toRegister">没有账号？<a>立即注册</a></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data(){
      return{
        wayFlag:true,
        bgImg: {
          backgroundImage: "url(" + require("../../assets/images/005.jpg") + ")",
          backgroundRepeat:'no-repeat',
          backgroundSize:'100% 100%'
        },
      }
    },
    methods:{
      way1(){
        this.wayFlag=true;
      },
      way2(){
        this.wayFlag=false;
      },
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
    background: #000;
    .loginBox{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-70%);
      width: 500px;
      height: 450px;
      border-radius: 10px;
      background: #FFFFFF;
      .title{
        height: 100px;
        line-height: 100px;
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        //设置字体渐变属性
        background: linear-gradient(to right, #FFFF00, #8000FF);
        -webkit-background-clip: text;
        color: transparent;
      }
      .info{
        height: 140px;
        padding: 0 50px;
        form{
          .tabWay{
            height: 30px;
            margin-bottom: 20px;
            line-height: 30px;
            text-align: center;
            font-size: 20px;
            .wayStyle{
              display: inline-block;
              cursor: pointer;
              &:first-child{
                margin-right: 50px;
              }
            }
            .wayStyle2{
              color: deepskyblue;
              border-bottom: 2px solid deepskyblue;
            }
          }
          .inp{
            position: relative;
            height: 30px;
            width: 100%;
            //去除默认样式
            border: 0px;
            outline: none;
            background:none;
            //添加自己的样式
            border: 2px solid #dcdcdc;
            text-align: center;
            font-size: 16px;
            margin-bottom: 20px;
            &::-webkit-input-placeholder{
              color: #D8D8D8;
            }
            &:focus{
              border: 2px solid green;
            }
          }
          .inpcode{
            width: 278px;
          }
          .way1{
            position: relative;
            .found{
              position: absolute;
              right: 0;
              bottom: 20px;
              cursor: pointer;
              height: 20px;
              &:hover{
                color: deepskyblue;
              }
            }
          }
          .btnCode{
            height: 40px;
            width: 110px;
            border-radius: 20px;
            cursor: pointer;
            border: none;
            background: #d8d8d8;
          }
          #password{
            margin-left: 9px;
          }
          .btn{
            height: 40px;
            width: 110px;
            background: gainsboro;
            border: none;
            outline: none;
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
            margin-right: 32px;
            background: orange;
            color: #fff;
          }
        }
      }
      .toRegister{
        text-align: right;
        padding-right: 50px;
        margin-top: 120px;
        height: 30px;
        line-height: 30px;
        a{
          color: deepskyblue;
          cursor: pointer;
        }
      }
    }
  }
</style>
