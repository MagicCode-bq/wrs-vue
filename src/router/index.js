import vue from 'vue'
import vueRouter from 'vue-router'
import store from '../store/index'

vue.use(vueRouter)

import  login from 'views/login'
import  Home from 'views/Home'
import  initMenu  from 'network/menu'


let routes=[
  {
    path:'/',
    redirect:'/login',
    hidden:true
  },{
    path:'/login',
    name:'login',
    component:login,
    hidden:true
  },
  {
    path:'/home',
    name:"Home",
    component:Home
  }
]


let router= new vueRouter({
     routes
})

router.beforeEach((to,from,next)=>{
      if(to.path=='/login'){
        next();
      }else{
        if(window.sessionStorage.getItem("user")){
            initMenu(store,router)
             next();
        }else{
             next(false);
        }
      }
})

export default router