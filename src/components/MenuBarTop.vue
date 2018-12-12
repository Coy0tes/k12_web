<template>
    <el-menu :default-active="activeIndex" mode="horizontal" class="MenuBarTop">
        <el-row type="flex" align="middle">
            <el-col :span="3">
               <!--  <el-breadcrumb separator=">" style="padding-left: 10px;width:500px; margin-top:30px;">
                    <el-breadcrumb-item :to="{path:'/dataStatistics'}">
                        <span @click="toHome">首页</span>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>{{breadcrumb}}</el-breadcrumb-item>
                </el-breadcrumb> -->



            </el-col>
            <el-col style="float:right;margin-left:68.5%;" :offset="15" >
                
                    <template slot="title">{{name}}</template>
                    <div style="float:right;">
                    <!--   <el-menu-item index="2-1" @click="toHomeReload"><img src="../assets/touxiang.png" height="44" width="44" alt="" style="margin-top:25%"> <br><span style="margin-top:-40px;display:inline-block">admin</span></el-menu-item> -->
                    <el-menu-item index="2-1" @click="toHomeReload"><img src="../assets/touxiang.png" height="44" width="44" alt="" style="margin-top:15%"> <span style="display:inline-block;margin-top:20px;">admin</span></el-menu-item>
                   
                    <el-menu-item index="2-2" @click="setting"><img src="../assets/tongzhi.png" height="20" width="18" alt="" style="margin-top:170%"></el-menu-item>
                    <el-menu-item index="2-2" @click="setting"><img src="../assets/shezhi.png" height="20" width="20" alt="" style="margin-top:150%"></el-menu-item>
                    <el-menu-item index="2-3" @click="logout"><img src="../assets/tuichu.png" height="20" width="20" alt="" style="margin-top:140%"></el-menu-item>
                    </div>
                    
             
            </el-col>
        </el-row>
    </el-menu>
</template>
<script>
export default {
    computed: {},
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            isShowBread: true,
            breadcrumb: '',
            userName:'',
            touxiang:'',
            name: JSON.parse(localStorage.actor).user.username
        };
    },
    watch: {
        $route(now, old) {
            this.breadcrumb = localStorage.unitName
            console.log(this.breadcrumb);
        }
    },
    methods: {
        toHome: function() {
            this.isShowBread = false;
            this.$emit('isNotTouchLeft', 0);
        },

        toHomeReload(){
          this.$router.push({
            path:'/dataStatistics'
          })

        },
        setting() {
            alert('该功能尚未上线，敬请期待！')
        },

        logout(){
          localStorage.loginStatus = 'logout';
          this.$router.push({
            path:'/login'
          })

        }
    },
    mounted() {
      this.touxiang='https:' +localStorage.avatar
       this.userName = localStorage.userName
       console.log("this.userName",this.userName)
        if (localStorage.unitName) {
            this.breadcrumb = localStorage.unitName
            this.userName = localStorage.userName
        }
    },
     activated(){
            this.userName = localStorage.userName
            console.log("this.userName",this.userName)
        }
}
</script>
<style scoped>
  .MenuBarTop{
    position: fixed;
    width: 83.3%;
    z-index: 20;
    color: red;
  }
  .el-row--flex.is-align-middle{
    background-color: #3ca0ec;
    height: 90px;
     background-image:url(../assets/top.png);
     background-repeat:no-repeat;

  }
  .el-menu li{
    color: #fff;
    height: 90px;
  }
 
.el-menu-item:hover{

   background-color: rgba(9,132,226,.5);;
   /*border-radius: 10px;*/
}
 .el-menu--horizontal .el-menu-item:focus, .el-menu--horizontal {
    
        background-color: rgba(9,132,226,1);
 }
</style>
