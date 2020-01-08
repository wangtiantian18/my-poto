// const Koa = require('koa')
import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

import mongoose from 'mongoose'
import bodyParse from 'koa-bodyparser'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'

import cors from 'koa2-cors';

//导入数据库相关配置
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'

const app = new Koa()

// 设置中间件
app.keys=['mt','keyskeys']
app.proxy=true
app.use(session({
  key:'mt',
  prefix:'mt:uid',
  store: new Redis()
}))

app.use(cors({
  origin: function (ctx) {
      // if (ctx.url === '/test') {
      //     return "*"; // 允许来自所有域名请求
      // }
      return "*"; // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(bodyParse({
  extendTypes:['json','from','text']
}))

app.use(json())
app.use(passport.initialize())
app.use(passport.session())
//链接数据库
mongoose.connect(dbConfig.dbs,{ 
  useNewUrlParse: true
})


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = '192.168.30.147',
    port = process.env.PORT || 3000
  } = nuxt.options.server



  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  //接口路由
  app.use(users.routes()).use(users.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://192.168.30.147:${port}`,
    badge: true
  })
}

start()
