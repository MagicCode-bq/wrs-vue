import request from "./request";
import da from "element-ui/src/locale/lang/da";

export  default  function initMenu(store,router) {

   //如果VUEX中存在菜单则不往VUEX中添加菜单
   if(store.state.menus.length>0){
     return;
   }
  request({
    url:"/menu"
  }).then(data=>{
      if(data){
        //格式化菜单
        let fmRouter = formatMenu(data)
        //添加到router路由中
        router.addRoutes(fmRouter)
        //添加到Vuex中
        store.dispatch("setMenus",fmRouter)
      }else{
        console.log("没有加载")
      }
    })
}

function formatMenu(data){

  let fmRouter=[];

  data.forEach((router=>{
    let {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    }=router

    //判断是否有子路由，有则重新进行格式化
    if(children&&children instanceof Array){
      children = formatMenu(children)
    }

    //格式化菜单
    let fmData={
      path,
      name,
      meta,
      iconCls,
      children,
      component:(resolve)=>{
        if (component.startsWith("Home")) {
          require(['views/' + component], resolve);

        } else if (component.startsWith("Emp")) {
          require(['views/emp/' + component + '.vue'], resolve);

        } else if (component.startsWith("Per")) {
          require(['views/per/' + component + '.vue'], resolve);

        } else if (component.startsWith("Sal")) {
          require(['views/sal/' + component + '.vue'], resolve);

        } else if (component.startsWith("Sta")) {
          require(['views/sta/' + component + '.vue'], resolve);

        } else if (component.startsWith("Sys")) {
          require(['views/sys/' + component + '.vue'], resolve);

        } else if (component.startsWith("Oth")) {
          require(['views/oth/' + component + '.vue'], resolve);
        }
      }
    }

    fmRouter.push(fmData)

  }))

   return fmRouter;
}



