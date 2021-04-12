import  vue from 'vue'
import vuex  from 'vuex'


vue.use(vuex)

let store = new vuex.Store({
    state:{
     menus:[]
    },
    getters:{

    },
    mutations:{
     menus(state,data){
      state.menus=data;
     }
    },
    actions:{
      setMenus(context,data){
       context.commit("menus",data)
      }
    },
    modules:{

    }
})


export default store

