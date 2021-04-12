<template>
  <div>
    <el-button type="primary"
               @click="openfile"
               size="small" round>
      {{title}}<i class="el-icon-folder el-icon--right"></i>
    </el-button>
    <input  hidden type="file"
            ref="fileInput"
            @change="uploadFile" />
  </div>
</template>

<script>
  import  {fileUpload} from 'network/FileRequest'

  export default {
    name: "file",
    props:{
       title:{
         type:String,
         default:"上传文件"
       },
       fileType:{
         type: Array,
         default(){
            return ['jpg','jpeg','png']
         }

       }
    },
    methods:{
      //文件上传操作
      uploadFile(){
        //从input组件中获取上传的文件对象
        let file = this.$refs.fileInput.files[0];

        //文件格式判断
        let fileType=this.fileType
        let fileName = file.name;
        let suffixName= fileName.split(".")[1].toLowerCase()
        let validateSuffix=false
        fileType.forEach((x=>{
          if(x.toLowerCase()==suffixName){
            validateSuffix=true;
          }
        }))
        if(!validateSuffix){
          this.$message.error({message:"文件格式不对，请选择"+fileType.join(",")})
          this.$refs.fileInput.value=''
          return;
        }

        //上传文件
        let formData = new window.FormData
        formData.append("file",file)
        fileUpload(formData).then(res=>{
          //上传返回的地址返回父组件
         let  fileAddress=res.obj;
          this.$refs.fileInput.value=''
          if(fileAddress){
            this.returnFileAddress(fileAddress);
          }
        })
      },
      //触发input组件上传文件
      openfile(){
        this.$refs.fileInput.dispatchEvent(new MouseEvent('click'))

      },
      //上传文件地址返回
       returnFileAddress(fileAddress){
        this.$emit("get-file-address",fileAddress)
       }
    }
  }
</script>

<style scoped>

</style>