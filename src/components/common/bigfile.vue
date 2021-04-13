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
  import {hex_md5} from '../../utils/md5'

  export default {
    name: "big-file",
    props:{
       title:{
         type:String,
         default:"上传大文件"
       },
       fileType:{
         type: Array,
         default(){
            return ['jpg','jpeg','png']
         }

       }
    },
    data(){
        return{
          user:{}
        }
    },
    created() {
     this.user =JSON.parse(window.sessionStorage.getItem("user"))
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
        //文件分片
        let shardSize = 20*1024*1024    //分片文件的大小（20M）
        let shardIndex=0                //分片的索引
        let start = shardIndex*shardSize //分片的起始位置
        let end=Math.min(file.size,start+shardSize) //分片结束的位置
        let size =file.size                          //文件的大小
        let shardTotal=Math.ceil(size/shardSize)   //文件分片的总片数

        //上传文件的唯一标识
        let  key = hex_md5(file);
         console.log(key)

        //构建开始位置，结束位置截取文件 slice()方法截取文件
         let fileShard = file.slice(start,end); //当前分片

        //上传文件
        let formData = new window.FormData
        formData.append("shard",fileShard)//当前片段
        formData.append("shardSize",shardSize)//片段大小
        formData.append("shardIndex",shardIndex)//上传的分片索引
        formData.append("shardTotal",shardTotal)//文件分片总数
        formData.append("user",this.user.name)//上传文件的人
        formData.append("name",fileName)//文件的名
        formData.append("suffix",suffixName)//文件后缀
        formData.append("size",size)//文件大小
        formData.append("key",key)//文件大小


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
        this.$emit("get-bigfile-address",fileAddress)
       }
    }
  }
</script>

<style scoped>

</style>