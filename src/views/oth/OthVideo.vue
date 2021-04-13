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
          <div class="upload-div">
            <file title="上传文件"
                  :file-type="['jpg','jpeg','png']"
                  @get-file-address="getFileAddress">
            </file>
            <img :src="fileAddress">
          </div>
         <div class="upload-div">
           <bigfile title="分片上传视频"
                 :file-type="['mp4']"
                 @get-bigfile-address="getBigFileAddress">
           </bigfile>
           <video ref="video" :src="bigfileAddress" controls></video>
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
  import file  from 'components/common/file'
  import bigfile  from 'components/common/bigfile'

  export default {
    name: "OthVideo",
    data() {
      return {
        currentDate: new Date().toLocaleDateString(),
        dialogVisible: false,
        //上传文件返回地址
        fileAddress:"",
        bigfileAddress:""

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
      //获取file组件返回上传的地址
      getFileAddress(fileAddress){
       this.fileAddress=fileAddress;
      },
      //获取bigfile组件返回上传的地址
      getBigFileAddress(fileAddress){
        this.bigfileAddress=fileAddress;
        this.getTime()
      },
      getTime(){
        console.log(this.$refs.video.duration)
      }
    },
    components:{
      file,
      bigfile
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
  .upload-div{
    margin-top: 10px;
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