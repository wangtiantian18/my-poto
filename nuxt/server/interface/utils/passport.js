import passport from 'koa-passport'
//本地策略
import LocalStrategy from 'passport-local'

import UserModel from '../../dbs/modules/users'         

//验证密码
// 调用use()来为passport新增一个可用的策略
passport.use(new LocalStrategy(async function(username,password,done){
    let where = {
        username
    }
    let result = await UserModel.findOne(where)
    if(result!=null){
        if(result.password===password){
            return done(null,result)
        }else {
            return done(null,false,'密码错误！')
        }
    }else{
        return done(null,false,'用户不存在！')
    }
}))

//序列化，用户进来使用session验证
passport.serializeUser(function(user,done){
    done(null,user)
})
//反序列化
passport.deserializeUser(function(user,done){
    return done(null,user)
})


export default passport