import request from "./request";

export  function fileUpload(fileData) {

   return  request({
     url:'/file/upload',
     method:'post',
     data:fileData
   })
}