//引入路由
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import Home from '../components/Home/Home'
import Person from '../components/Person/Person'
import Exchange from '../components/Exchange/Exchange'
import NotFound from '../components/NotFound/NotFound'
import FindPassword from '../components/FindPassword/FindPassword'
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//配置要使用的工具
import Vue from 'vue'
//vue-router
import Router from 'vue-router'
Vue.use(Router)
//====================================================================================
export default new Router({
  mode:'history',
  routes: [
    //配置路由
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path:'/',
      name:'Home',
      component:Home
    },
    {
      path:'/person',
      name:'Person',
      component:Person
    },
    {
      path:'/exchange',
      name:'Exchange',
      component:Exchange
    },
    {
      path:'/findPassword',
      name:'FindPassword',
      component:FindPassword
    },
    {
      path:'*',
      name:'NotFound',
      component:NotFound
    }
  ]
})
