<template>
  <div class="home">
    <el-container>
      <el-header class="header">
        <div class="hidden-title">
          个人技术集合
        </div>
        <div class="hidden-menu">
          <el-dropdown @command="dropdownClick">
            <span class="el-dropdown-link">
             <img :src="this.user.userface">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled>{{this.user.username}}</el-dropdown-item>
              <el-dropdown-item divided command="userMessage">个人</el-dropdown-item>
              <el-dropdown-item divided command="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-container class="container">
        <el-aside class="aside" width="200px">
              <el-menu
                      background-color="#336666"
                      text-color="#fff"
                      @select="menuItem"
                      active-text-color="#CC9933">
                <el-submenu :index="index+''" v-for="(item,index) in this.$store.state.menus" v-if="!item.hidden">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{item.name}}</span>
                  </template >
                    <el-menu-item  v-for="(item1,index1) in item.children"  :index="item1.path">{{item1.name}}</el-menu-item>
                </el-submenu>
              </el-menu>

        </el-aside>
        <el-main class="main">
          <router-view/>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
  import {logout} from "../network/LoginRequest";

  export default {
    name: "Home",
    data(){
      return {
        user:{}
      }
    },
    created() {
       //加载当前登陆用户信息
      this.user=JSON.parse(window.sessionStorage.getItem("user"));
    },
    methods:{
      dropdownClick(cmd){
       if("logout"===cmd){
         this.$confirm('您确定退出当前登陆用户吗?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
            logout().then(res=>{
              window.sessionStorage.removeItem("user")
              this.$store.dispatch("setMenus",[])
              this.$router.replace("/login")
            })
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '已取消'
           });
         });
       }
      },
      menuItem(index,indexPath){
      this.$router.replace(index)
     }
    }
  }
</script>

<style scoped>
  .header{
    background-color: #339999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #CCFFFF;
    box-sizing: border-box;
    padding: 0px 15px;

  }
  .hidden-title{
    font-size: 20px;
    font-weight: 700;
    margin-left: 66px;
    letter-spacing:5px
  }
  .hidden-menu{
    border-radius: 25px;
    overflow: hidden;
    margin-right: 10px;
  }
  .hidden-menu img{
    width: 35px;
    height: 35px;
  }

  .aside{
    background-color: #66CCCC;
  }
  .main{
    background-color: #CCFFFF;
  }

</style>