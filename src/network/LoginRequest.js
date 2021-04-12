import request from "./request";


export function login(params) {
 return   request({
   method: 'post',
   url: '/dologin',
   data: params,
   transformRequest: [function (data) {
     let ret = '';
     for (let i in data) {
       ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
     }
     return ret;
   }],
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded'
   }
   })
}

export  function logout() {
  return request({
       url:'/logout'
  })
}