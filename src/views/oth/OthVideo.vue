<template>
  <div>
<!--   按钮组-->
    <div class="button-div">
      <el-button type="success"  size="small" icon="el-icon-refresh" round>刷新</el-button>
      <el-button type="primary"
                 @click="showDialog"
                 size="small" round>
        上传<i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </div>
<!--   视频Item -->
    <div class="video-item">
      <el-row>
        <el-col :span="5" v-for="(o, index) in 2" :key="o" >
          <el-card class="card" :body-style="{ padding: '3px' }">
            <el-image
                    style="width: 100%;
                    height: 200px"
                    src="https://suibingbing.oss-cn-shenzhen.aliyuncs.com/videoImage.jpg"
                    fit="cover"></el-image>
            <div style="padding: 5px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button class="delete-button" type="danger" icon="el-icon-delete" circle></el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>

<!--  Dialog 弹出层  -->
     <div>
       <el-dialog
               title="提示"
               :visible="dialogVisible"
                width="40%"
               :show-close="false"
               :close="cloesDialog">
          <div>
             <el-button type="primary"
                       @click="openfile"
                       size="small" round>
              选择文件<i class="el-icon-folder el-icon--right"></i>
            </el-button>
             <input  hidden type="file"  id="fileInput"  ref="fileInput" @change="uploadImage" />
             <img :src="Vides.image">
          </div>
         <span slot="footer"
               class="dialog-footer">
                <el-button @click="cloesDialog">取 消</el-button>
                <el-button type="primary" @click="cloesDialog('save')">确 定</el-button>
         </span>
       </el-dialog>
  </div>
  </div>
</template>

<script>
  import  {fileUpload} from 'network/FileRequest'


  export default {
    name: "OthVideo",
    data() {
      return {
        currentDate: new Date().toLocaleDateString(),
        dialogVisible: false,
        fileList: [],  //文件集合,
        Vides:{
            image:''
        }
      }
    },
    methods:{
      //Dialog操作
      showDialog(){
       this.dialogVisible=true
      },
      cloesDialog(type){
       if("save"==type){
         this.dialogVisible=false
       }else{
         this.dialogVisible=false
       }
      },
      //文件上传操作
      uploadImage(){
        let file = this.$refs.fileInput.files[0];

        //文件格式判断
        let fileType=['jpg','jpeg','png']
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
          return;
        }

        //上传文件
        let formData = new window.FormData
        formData.append("file",file)
        fileUpload(formData).then(res=>{
         this.Vides.image=res.obj
        })
      },
      openfile(){
        this.$refs.fileInput.dispatchEvent(new MouseEvent('click'))
      }
    }
  }
</script>

<style scoped>
  .button-div{
    display: flex;
    padding: 5px;
    justify-content: flex-end
  }


  .card{
   margin-left: 5px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }


  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }


  .image {
    width: 100%;
    height: 200px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .delete-button{
    padding: 5px;
    float: right;
  }

</style>