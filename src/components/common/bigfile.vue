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
        let shardSize = 20*1024*1024   //文件的大小（20M）
        let shardIndex=1 //分片的索引
        let start = shardIndex*shardSize //分片的起始位置
         //let end =start+shardIndex（这样算结束的位置，会导致最后一片出现错误）
        let end=Math.min(file.size,start+shardSize) //如果结束位置，大于文件的大小，取文件的大小，得到文件结束的位置
        //构建开始位置，结束位置截取文件 slice()方法截取文件
        console.log(start,end)
         let FileSlice = file.slice(start,end);

        //上传文件
        let formData = new window.FormData
        formData.append("file",FileSlice)

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