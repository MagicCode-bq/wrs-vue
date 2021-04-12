import axios from "axios";
import {Message} from 'element-ui'


export  default  function request(config) {

  let  instance = new axios.create({
   timeout:5000
  });

 instance.interceptors.response.use((succeed)=>{
   //拦截服务端返回的错误
   if(succeed.data.status==200){
     Message.success({message:succeed.data.message})
   }else if (succeed.data.status==500){
      Message.error({message:succeed.data.message})
     return;
   }
   return succeed.data;

 },(error)=>{
   //拦截服务器访问错误
   if(error.response.status==404||error.response.status==504){
     Message.error({message:'服务器丢了，请稍后再试'});
   }else if(error.response.status==403){
     Message.error({message:"权限不足，请联系管理员"});
   }else if(error.response.status==401){
     Message.error({message:"您未登陆，请求资源失败"});
   }else {
     if(error.response.data.message){
       console.log(error)
       Message.error({message:error.message});
     }else{
       Message.error({message:"未知错误"});
     }
   }
 })

  return instance(config)
}




