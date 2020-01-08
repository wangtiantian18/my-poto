export default {
    dbs: 'mongodb://127.0.0.1:27017/student',       //数据库地址|名称
    redis:{                                         //redis地址(只读写法)
        get host(){
            return '127.0.0.1'
        },
        get port(){
            return 6379
        }
    },
    smtp: {                                     //smtp服务地址(只读写法)
        get host(){                             //smtp服务是邮箱提供的外部收发邮件服务（使用node发邮件）
            return 'smtp.qq.com'
        }, 
        get user(){
            return '906730588@qq.com'
        },
        get pass(){                              //授权码
            return 'lrffupgiepsnbegh'
        },
        //生成验证码(返回一个函数保证每次都不一样，如果直接返回，是一个常量)
        get code(){                                 
            return ()=>{
                return Math.random().toString(16).slice(2,6).toUpperCase()
            }
        },
        //验证码过期时间
        get expirt(){
            return ()=>{
                return new Date().getTime() + 60 * 1000
            }
        }
    },

}