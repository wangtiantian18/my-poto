import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'

import User from '../dbs/modules/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import Axios from './utils/axios'

let router = new Router({
    prefix:'/users'
})

let Store = new Redis().client

//注册接口
router.post('/signup', async (ctx)=>{
    const {username,password,email,code} = ctx.request.body
    //验证  验证码
    if(code){
        //从redies中读取为账户锁存储的验证码和过期时间
        const saveCode = await Store.hget(`nodemail:${username}`,'code')
        const saveExpire = await Store.hget(`nodemail:${username}`,'expire')
        if(code===saveCode){
            if(new Date().getTime()-saveExpire>0){
                ctx.body={
                    code:-1,
                    msg:'验证码已经过期，请重新尝试'
                }
                return false
            }
        }else{
            ctx.body={
                code:-1,
                msg:'请填写正确的验证码'
            }
            return false
        }
    }else{
        ctx.body={
            code:-1,
            msg:'请输入验证码'
        }
        return false
    }

    //验证用户名和密码
    let user=await User.find({username})
    if(user.length){
        ctx.body={
            code:-1,
            msg:'该用户已经注册'
        }
        return false
    }
    //写库
    let newUser = await User.create({
        username,
        password,
        email
    })
    //自动登录
    if(newUser){
        let res = await Axios.post('http://192.168.30.147:3000/users/signin',{
            username,
            password
        })
        if(res.data&&res.data.code===0){
            ctx.body={
                code:0,
                msg:'注册成功',
                user:res.data.user
            }
        }else{
            ctx.body={
                code:-1,
                msg:'注册失败注册失败',
            }
        }
    }else{
        ctx.body={
            code:-1,
            msg:'注册失败',
        }
    }
})
//登录接口
router.post('/signin',async (ctx,next)=>{
    return Passport.authenticate('local',function(err,user,info,status){
        if(err){
            ctx.body={
                code:-1,
                msg:err
            }
        }else{
            if(user){
                ctx.body = {
                    code: 0,
                    msg: '登录成功',
                    user
                }
                return ctx.login(user)
            }else{
                ctx.body={
                    code:1,
                    msg:info
                }
            }
        }
    })(ctx,next)
})
//发送验证码接口
router.post('/verify', async (ctx,next)=>{
    let username=ctx.request.body.username
    if(!ctx.request.body.username||!ctx.request.body.email){
        ctx.body={
            code:-1,
            msg:'请传入用户名和邮箱地址！',
        };
        return;
    }
    const saveExpire = await Store.hget(`nodemail:${username}`,'expire')
    //防止频繁获取验证码
    if(saveExpire&&(new Date().getTime() - saveExpire) < 0){
        ctx.body={
            code:-1,
            msg:'请不要频繁获取验证码，1分钟1次',
        }
        return false
    }
    //发邮件
    let transport = nodeMailer.createTransport({
        //发邮件使用的账户信息
        host:Email.smtp.host,
        port:587,
        secure:false,
        auth:{
            user:Email.smtp.user,
            pass:Email.smtp.pass
        }
    })
    //发送对象
    let ko={
        code:Email.smtp.code(),
        expire:Email.smtp.expirt(),
        email:ctx.request.body.email,
        user:ctx.request.body.username,
    }
    //邮件内容
    let mailOptions={
        from:`"时光相册"<${Email.smtp.user}>`,
        to:ko.email,
        subject:'时光相册注册码',
        html:`您在时光相册中的注册码是：${ko.code}`
    }

    await transport.sendMail(mailOptions,(error,info)=>{
        if(error){
            ctx.body={
                code:-1,
                msg:error,
            }
            return;
        }else{
            //发送成功后，将user为key的键值对存入redies
            Store.hmset(`nodemail:${ko.user}`,'code',ko.code,'expire',ko.expire,'email',ko.email)
        }
    })
    ctx.body={
        code:0,
        msg:'验证码已发送，可能会有延时，有限期一分钟',
    }

})
//退出登录接口
router.get('/exit',async (ctx)=>{
    await ctx.logout()
    if(!ctx.isAuthenticated()){
        ctx.body={
            code:0,
            msg:'退出成功！',
        }
    }else{
        ctx.body={
            code:-1,
            msg:'退出失败',
        }
    }
})
//获取用户名
router.get('/getUser',async (ctx)=>{
    if(ctx.isAuthenticated()){
        const {username,email} = ctx.session.passport.user
        ctx.body={
            code:0,
            user:username,
            email
        }
    }else{
        ctx.body={
            code:-1,
            msg:'请先登录！',
        }
    }
})

export default router