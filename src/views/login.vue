<template>
   <div class="login-dev">
    <el-form :model="user"
             :rules="rules"
             ref="ruleForm"
             class="fromClass"
            >
      <h3 class="fromTitle">系统登陆</h3>
       <el-form-item  prop="username">
          <el-input type="text" v-model="user.username"  auto-complete="false" placeholder="请输入用户名" />
       </el-form-item>
       <el-form-item  prop="password">
          <el-input  type="text" v-model="user.password"  auto-complete="false"  placeholder="请输入密码" />
       </el-form-item>

       <el-button type="primary"  style="width: 100%" @click="submitForm('ruleForm')">登陆</el-button>
    </el-form>
   </div>
</template>

<script>
  import  {login} from 'network/LoginRequest.js'
  import  {getMenu} from "network/menu";

  export default {
    name: "login",
     data(){
       return{
          code:'',
          user:{
             username:'',
             password:'',
          },
          rules:{
             username: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
             ],
             password:[
                { required: true, message: '请输入密码', trigger: 'blur' }
             ]
          }
       }
     },
     methods:{
        submitForm(formName) {
           this.$refs[formName].validate((valid) => {
              if (valid) {
                 login(this.user).then(res=>{
                 window.sessionStorage.setItem("user",JSON.stringify(res.obj))
                 this.$router.replace("/home")
               })
              } else {
                 console.log('登陆失败');
                 return false;
              }
           });
        }
     }
  }
</script>

<style scoped>
   .fromClass{
      width: 350px;
     border-radius: 15px;
     margin: 180px auto;
     padding: 15px 35px 15px 35px;
     background: #fff;
     border: 1px solid #eaeaea;
     box-shadow: 0 0 25px #cac6;
   }
  .fromTitle{
    margin: 15px auto 20px auto;
    text-align: center;
    color: #505458;
  }


</style>