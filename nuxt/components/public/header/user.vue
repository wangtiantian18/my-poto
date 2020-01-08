<template>
  <div class="m-user">
    <template v-if="user">
      欢迎您，<span class="username">{{ user }}</span>
      [<span style="color:#41B883" @click="exit">退出</span>]
    </template>
    <template v-else>
      <nuxt-link
        to="/login"
        class="login">立即登录</nuxt-link>
      <nuxt-link
        class="register"
        to="/register">注册</nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
    data(){
        return {
            user:''
        }
    },
    mounted () {
      this.getUser()
    },
    methods:{
      async getUser(){
        let {status,data}= await this.$axios.get('/users/getUser')
        console.log(status,data)
        if(status===200&&data.code===0){
          this.user=data.user
        }
      },
      async exit(){
        let {status,data}= await this.$axios.get('/users/exit')
        console.log(status,data)
        if(status===200&&data.code===0){
          window.location='/'
        }
      }
    }
}
</script>

<style lang="css">
</style>