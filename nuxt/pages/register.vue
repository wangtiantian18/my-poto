<template>
    <div class="page-register">
        <div class="header">
            <header>
                <a href="/index" class="site-logo" /></a>
                <span class="login">
                    <em class="bold">已有美团账号？</em>
                    <a href="/login">
                        <el-button type="primary" size="small">登录</el-button>
                    </a>
                </span>
            </header>
        </div>
        <section>
            <el-form 
                :model="ruleForm" 
                :rules="rules" 
                ref="ruleForm" 
                label-width="100px" 
                class="demo-ruleForm">
                <el-form-item label="昵称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                    <el-button size="mini" round @click="sendMessage">发送验证码</el-button>
                    <span class="status">{{statusMsg}}</span>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input v-model="ruleForm.code" maxLength="4"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="ruleForm.pwd" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="cpwd">
                    <el-input v-model="ruleForm.cpwd" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register">同意以下协议并注册</el-button>
                    <div class="error">{{errMsg}}</div>
                </el-form-item>
                <el-form-item>
                    <a href="">《美团网用户注册协议》</a>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>
<script>
import { clearInterval } from 'timers'
import CryptoJs from 'crypto-js'
export default {
    layout:'blank',
    data(){
        return {
            statusMsg: '',
            errMsg: '',
            ruleForm: {
                name: '',
                code: '',
                email: '',
                pwd: '',
                cpwd: ''
            },
            rules: {
                name: [{ required: true, message: '请输入昵称！', trigger: 'blur' },],
                email: [{
                    required: true, type: 'email', message: '请输入邮箱！', tigger: 'blur'
                }],
                pwd: [{
                    required: true, type: 'string', message: '请输入密码！', tigger: 'blur'
                }],
                cpwd: [{
                    required: true, type: 'string', message: '请重复输入密码！', tigger: 'blur'
                },{
                    validator:(rule,value,callback)=>{
                        if(value===''){
                            callback(new Error('请再次输入密码！'))
                        }else if(value!==this.ruleForm.pwd){
                            callback(new Error('两次输入密码不一致！'))
                        }else{
                            callback()
                        }
                    }
                },{
                    tigger: 'blur'
                }],
                code: [{
                    required: true, type: 'string', message: '请输入验证码！', tigger: 'blur'
                }],
            }
        }
    },
    methods: {
        sendMessage(){
            let that=this;
            let namePass
            let emainPass
            if(that.timerid){
                return false
            }
            that.$refs.ruleForm.validateField('name',(valid)=>{
                namePass=valid
            })
            that.statusMsg=''
            if(namePass){
                return false
            }
            that.$refs.ruleForm.validateField('email',(valid)=>{
                emainPass=valid
            })
            if(!namePass&&!emainPass){
                that.$axios.post('/users/verify',{
                    username:encodeURIComponent(that.ruleForm.name),
                    email:that.ruleForm.email
                }).then(({status,data})=>{
                    if(status===200&&data&&data.code===0){
                        let count=60;
                        that.statusMsg=`验证码已发送，剩余${count--}秒`
                        that.timerid=setInterval(()=>{
                            that.statusMsg=`验证码已发送，剩余${count--}秒`
                            if(count <= 0){
                                clearInterval(this.timerid);
                            }
                        },1000)
                    }else{
                        that.statusMsg=data.msg;
                    }
                })
            }
        },
        register(){
            this.$refs.ruleForm.validate((valid)=>{
                if(valid){
                    this.$axios.post('/users/signup',{
                        username:window.encodeURIComponent(this.ruleForm.name),
                        password:CryptoJs.MD5(this.ruleForm.pwd).toString(),
                        email:this.ruleForm.email,
                        code:this.ruleForm.code
                    })
                    .then(({status,data})=>{
                        if(status===200){
                            if(data&&data.code===0){
                                console.log(data)
                                location.href='/login'
                            }else{
                                this.error=data.msg
                            }
                        }else{
                            this.error=`服务器出错，错误码:${status}`
                        }
                        setTimeout(()=>{
                            this.error=``
                        },1500)
                    })
                }
            })
        },
    }
}
</script>
<style lang="scss" scope>
    @import "@/assets/css/register/index.scss";
</style>