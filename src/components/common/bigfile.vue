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
      //1、文件上传操作
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
        let shardIndex=1              //分片的索引
        let size =file.size                          //文件的大小
        let shardTotal=Math.ceil(size/shardSize)   //文件分片的总片数

        //上传文件的唯一标识
        let  key = hex_md5(file);

        let param= {
          shardSize: shardSize,
          shardIndex: shardIndex,
          shardTotal: shardTotal,
          user: this.user.name,
          name: fileName,
          suffix: suffixName,
          size: size,
          key: key,
        }

        this.uploadRequest(param)
      },
      //2、获取当前上传的分片
      getFileShard(shardIndex, shardSize) {
        let file = this.$refs.fileInput.files[0];
        let start = (shardIndex - 1) * shardSize //分片的起始位置
        let end = Math.min(file.size, start + shardSize) //分片结束的位置
        let fileShard = file.slice(start, end); //当前分片
        return fileShard;
      },
      //3、上传分片
      uploadRequest(param) {
        //片段转换为Base64
         let fileReader  = new FileReader();  //第一步
         let shardSize   = param.shardSize;
         let shardIndex  = param.shardIndex;
         let shardTotal = param.shardTotal;
         let fileShard = this.getFileShard(shardIndex, shardSize);


        fileReader.onload = (e) => {  //第二步,读取文件内容
          let shardBase64 = e.target.result;
           param.shard = shardBase64

          //上传文件
          fileUpload(param).then(res => {
            //上传返回的地址返回父组件
            let fileAddress = res.obj;
            if(shardIndex<shardTotal){
            param.shardIndex =param.shardIndex+1
             this.uploadRequest(param)
            }else{
              if (fileAddress) {
                this.returnFileAddress(fileAddress);
                this.$refs.fileInput.value = ''
              }
            }
          })
        }

        //第三步读取文件片段
        fileReader.readAsDataURL(fileShard)
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