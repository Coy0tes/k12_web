<template style="height: 100%">
  <el-menu class="MenuBarLeft" theme="#4e5486;" @open="handleOpen" @close="handleClose" unique-opened='true'>
    <div class="title_box">
      <router-link :to="{path:'/dataStatistics'}">
        <img class="logo" src="../assets/logo.png" alt="logo" style="width:185px">
      </router-link>
    </div>
  <!-- 初始化 -->
        



      <router-link :to="{path:'/kindergarten'}" v-if='isShow'>
        <el-menu-item index="9-1" @click="setUnitName('园区管理')"> <img src="../assets/yuanquguanli.png" height="29" width="29"  class="tatle_img">园区管理</el-menu-item>
      </router-link>
      <router-link :to="{path:'/grades'}">
        <el-menu-item index="9-2" @click="setUnitName('年级管理')"> <img src="../assets/nianjiguanli.png" height="30" width="29"  class="tatle_img">年级管理</el-menu-item>
      </router-link>
     <!--  <router-link :to="{path:'/courses'}">
        <el-menu-item index="9-3" @click="setUnitName('课程管理')"> <img src="../assets/kechengguanli.png" height="29" width="29"  class="tatle_img">课程管理</el-menu-item>
      </router-link> -->
      <!-- <router-link :to="{path:'/cookbook'}">
        <el-menu-item index="9-4" @click="setUnitName('食谱管理')"> <img src="../assets/shipuguanli.png" height="30" width="29"  class="tatle_img">食谱管理</el-menu-item>
      </router-link> -->

       <el-submenu index="1" v-if='isShow'>
      <template slot="title" >
       
      <img src="../assets/jiaoshiguanli.png" height="29" width="29"  class="tatle_img"><span class="test">教师管理</span></template>
       <router-link :to="{path:'/teacherGer'}">
        <el-menu-item index="1" @click="setUnitName('教师管理')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>教师管理</el-menu-item>
      </router-link>

      <!-- <router-link :to="{path:'/teacherWorkAttendance'}">
        <el-menu-item index="1.1" @click="setUnitName('教师管理')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>教师考勤</el-menu-item>
      </router-link> -->

<!--       <router-link :to="{path:'/teacherSecurity'}">
        <el-menu-item index="1.2" @click="setUnitName('教师管理')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>教师薪资</el-menu-item>
      </router-link> -->


    
       <router-link :to="{path:'/Check'}">
        <el-menu-item index="1.8" @click="setUnitName('考勤')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>教师考勤</el-menu-item>
      </router-link>




      <!-- <router-link :to="{path:'/teaching'}">
        <el-menu-item index="1-1" @click="setUnitName('教师管理')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>任命教师管理</el-menu-item>
      </router-link> -->
      </el-submenu>










      
    <el-submenu index="2">
      <template slot="title"><img src="../assets/banjiguanli.png" height="29" width="29"  class="tatle_img"><span class="test">班级管理</span></template>


     
       
    
       <router-link :to="{path:'/klassGer'}">
        <el-menu-item index="2-1" @click="setUnitName('班级管理')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>班级管理</el-menu-item>
      </router-link> <router-link :to="{path:'/downInage'}">
        <el-menu-item index="16-1" @click="setUnitName('班级管理')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>图片下载</el-menu-item>
      </router-link>

     
      <!-- <router-link :to="{path:'/downInage'}">
        <el-menu-item index="16-1" @click="setUnitName('amendCy')">图片下载</el-menu-item>
      </router-link> -->


       <!-- <router-link :to="{path:'/checking'}">
        <el-menu-item index="2-4" @click="setUnitName('班级管理')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>出勤管理</el-menu-item>
      </router-link>  -->





     


    </el-submenu>
     <el-submenu index="11">
        <template slot="title"><img src="../assets/jiaoshiguanli.png" height="29" width="29"  class="tatle_img"><span class="test"></span>艺术团管理</span></template>
      <router-link :to="{path:'interestClass'}">
        <el-menu-item index="11-1" @click="setUnitName('兴趣班管理')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>班级管理</el-menu-item>
      </router-link> 
      
       <router-link :to="{path:'searchKlass'}">
        <el-menu-item index="11-3" @click="setUnitName('查询兴趣班')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>查询班级</el-menu-item>
      </router-link> 

       <router-link :to="{path:'iklassstu'}">
        <el-menu-item index="11-2" @click="setUnitName('艺术团学生管理')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>学生管理</el-menu-item>
      </router-link>

      <router-link :to="{path:'intrestContrast'}">
        <el-menu-item index="11-4" @click="setUnitName('艺术团对比表')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>艺术团对比表</el-menu-item>
      </router-link> 

     
      <!-- <router-link :to="{path:'/intrestContrast'}">
          <el-menu-item index="11-4" @click="setUnitName('艺术团对比表')">艺术团对比表</el-menu-item>
      </router-link> -->

      </el-submenu>


   <el-submenu index="3" v-if='isShow'>
      <template slot="title"><img src="../assets/caiwuguanli.png" height="29" width="29"  class="tatle_img"><span class="test">财务管理</span></template>


   <router-link :to="{path:'/toll'}">
        <el-menu-item index="3-2" @click="setUnitName('费种管理')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>收费管理</el-menu-item>
      </router-link>





    
      <router-link :to="{path:'moneyplans'}">
        <el-menu-item index="3-1" @click="setUnitName('收费计划')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>收费计划管理</el-menu-item>
      </router-link>
<!-- 支付宝支付 -->
      <router-link :to="{path:'aliApply'}">
        <el-menu-item index="3-10" @click="setUnitName('收费计划')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>签约支付</el-menu-item>
      </router-link> 


      <router-link :to="{path:'searchPay'}">
        <el-menu-item index="3-3" @click="setUnitName('收费计划')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>缴费查询</el-menu-item>
      </router-link> 
      <router-link :to="{path:'payBackMar'}">
        <el-menu-item index="3-4" @click="setUnitName('payBackMar')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>退费管理</el-menu-item>
      </router-link>

      

        <!-- <el-submenu index="15">
        <template slot="title"><span class="test"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>退费管理</span></template>
  
         <router-link :to="{path:'/refund'}">
        <el-menu-item index="3-6" @click="setUnitName('费种转入')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>费种转入</el-menu-item>
      </router-link>

        <router-link :to="{path:'/returnmoney'}">
        <el-menu-item index="3-10" @click="setUnitName('费种转入')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>退学费用结算</el-menu-item>
       </router-link>
      

      </el-submenu> -->

       

     


   <el-submenu index="16">
        <template slot="title"><span class="test"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>营收管理</span></template>
  
      
      <router-link :to="{path:'/mainIncome'}">
        <!-- <i class="cercl">0 </i> -->
        <el-menu-item index="4-8" @click="setUnitName('characteristic')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>收入汇总</el-menu-item>
      </router-link>
       <router-link :to="{path:'/spendingSummary'}">
        <!-- <i class="cercl">0 </i> -->
        <el-menu-item index="4-8.5" @click="setUnitName('characteristic')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>支出汇总</el-menu-item>
      </router-link> 

      <router-link :to="{path:'/minorIncome'}">
        <!-- <i class="cercl">0 </i> -->
        <el-menu-item index="4-9" @click="setUnitName('characteristic')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>营收汇总</el-menu-item>
      </router-link>

      </el-submenu>








    
       
   


     <!--   <router-link :to="{path:'/receivable'}">
        <! <i class="cercl">0 </i> -->
 <!--        <el-menu-item index="4-7" @click="setUnitName('characteristic')"><span>&nbsp;&nbsp;&nbsp;</span>预收费查询</el-menu-item>
      </router-link> -->


       <!-- <router-link :to="{path:'/characteristic'}"> -->
        <!-- <i class="cercl">0 </i> -->
       <!--  <el-menu-item index="4-0" @click="setUnitName('characteristic')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>收费提醒</el-menu-item>
      </router-link>
 -->
     
     

    </el-submenu>


<el-submenu index="4">
      <template slot="title"><img src="../assets/xueshengguanli.png" height="29" width="29"  class="tatle_img"><span class="test">学生管理</span></template>

      <router-link :to="{path:'/studentGer'}">
        <el-menu-item index="9-5" @click="setUnitName('学生管理')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>学生管理</el-menu-item>
      </router-link>

     <!--   <router-link :to="{path:'/guardian'}">
        <el-menu-item index="9-6" @click="setUnitName('家长管理')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>家长管理</el-menu-item>
      </router-link> -->
    <router-link :to="{path:'/newStudent'}">
         <el-menu-item index="9-8" @click="vacations('testone')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>预交费</el-menu-item>
      </router-link>
       <router-link :to="{path:'/healthy'}">
         <el-menu-item index="9-11" @click="vacations('testone')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>健康检查</el-menu-item>
      </router-link>
       <router-link :to="{path:'/childCheck'}">
        <el-menu-item index="15-4" @click="setUnitName('test')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>儿童体检</el-menu-item>
      </router-link>
        <router-link :to="{path:'/attentChildren'}">
        <el-menu-item index="15-6" @click="setUnitName('test')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>儿童出勤</el-menu-item>
      </router-link>
      <router-link :to="{path:'/takeMedicine'}">
        <el-menu-item index="15-9" @click="setUnitName('test')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>儿童喂药</el-menu-item>
      </router-link>  

       <router-link :to="{path:'/remain'}">
        <el-menu-item index="15-1" @click="setUnitName('test')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>招生模块</el-menu-item>
      </router-link> 




     <!--  <router-link :to="{path:'/remain'}">
        <el-menu-item index="15-1" @click="setUnitName('amendCy')">招生模块</el-menu-item>
      </router-link>  -->
    </router-link>
        <router-link :to="{path:'/weekCheck'}">
        <el-menu-item index="15-7" @click="setUnitName('test')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>一周点评</el-menu-item>
      </router-link>



    </el-submenu>
        <el-submenu index="17">
        <template slot="title"><img src="../assets/cangku.jpg" height="29" width="29"  class="tatle_img" style="border-radius: 50%;"><span class="test"><span ></span>库存管理</span></template>
  
      
      <router-link :to="{path:'/purchase'}">
       
        <el-menu-item index="17-0" @click="setUnitName('characteristic')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>固定资产</el-menu-item>
      
      </router-link>
      <router-link :to="{path:'/inWarehouse'}">
       
        <el-menu-item index="17-1" @click="setUnitName('characteristic')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>入库记录</el-menu-item>
      
      </router-link>
       <router-link :to="{path:'/outWarehouse'}">
       
        <el-menu-item index="17-2" @click="setUnitName('characteristic')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>领取记录</el-menu-item>
      
      </router-link> 
    <!--   <router-link :to="{path:'/applyFor'}">
       
        <el-menu-item index="17-3" @click="setUnitName('characteristic')"><span class="nbsp">&nbsp;&nbsp;&nbsp;</span>申领</el-menu-item>
      
      </router-link> -->
       

      </el-submenu>

<el-submenu index="5">
    <template slot="title"><i class="el-icon-upload"></i><span class="test">初始化</span></template>


      <router-link :to="{path:'/initialize'}">
          <el-menu-item index="9-9" @click="setUnitName('初始化')"> 初始化</el-menu-item>
      </router-link>
</el-submenu>


     
 <router-link :to="{path:'/vacations'}">
       
      </router-link>


        







     


 <!-- <router-link :to="{path:'/OssUpload'}">
        <el-menu-item index="15-2" @click="setUnitName('test')">视频监控</el-menu-item>
      </router-link>  -->
     <!--  <router-link :to="{path:'/groupManager'}">
        <el-menu-item index="15-3" @click="setUnitName('test')">集團管理</el-menu-item>
      </router-link> -->
     

    


      <!-- <router-link :to="{path:'/newSchool'}">
        <el-menu-item index="9-7" @click="setUnitName('test')">newSchool</el-menu-item>
      </router-link> -->

      
     <!--    <router-link :to="{path:'/test'}">
        <el-menu-item index="0-7" @click="setUnitName('test')">test</el-menu-item>
      </router-link>
      <router-link :to="{path:'/testone'}">
        <el-menu-item index="0-8" @click="setUnitName('test')">testone</el-menu-item>
      </router-link> -->
     
       

    </el-submenu>


  </el-menu>
</template>
<script>
  export default {
      data(){
            return {
            
            isShow:false,

            }
        },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      setUnitName(unitName) {
        localStorage.setItem('unitName', unitName);
        console.log(localStorage.unitName)
      }

    },
    mounted(){
         if (localStorage.actorType=="TEACHER") {
                this.isShow=false
              }else{
                this.isShow=true
              }
    }

  }

</script>
<style scoped>
  .MenuBarLeft {
    position: fixed;
    width: 16.6666%;
    height: 100%;
    background-color: #fff;
    overflow: scroll;
    z-index: 999;
  }

  .title_box {
    text-align: center;
    height: 60px;
    padding-bottom: 114px;
  }

  .title {
    color: rgba(255, 255, 255, 0.7);
    font-weight: 400;
    font-size: 22px;
    letter-spacing: 1.5px;
  }

  .logo {
    width: 30px;
    margin-top: 37px;
    margin-right: 40px;
    margin-bottom: -8px;
  }
  img{
    margin-left: 20px;
  }

    ::-webkit-scrollbar {
    display: none
  }
  .cercl{
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 7px;
    background-color: red;
    color: #fff;
    position: relative;
    text-align: center;
    top: 23px;
    left: 95px;
  }
  /*hover 字体*/
  .el-submenu .el-menu-item:hover, .el-submenu__title:hover{
    /*background-color: #9edDf6*/
    color: #4c59cc;
  }
  .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
    /*background-color: #c9dbff;*/
     color: #2f7de7;
  }
  .el-submenu is-active{
    /*background-color: #ebeffb;*/
  }
  .el-submenu .el-menu{
    color: #6d6f71;
  }
  .el-menu-item, .el-submenu__title{
    color: #6d6f71;
    font-weight: 700;
  }
li:hover{
    /*background-color: #c9dbff;*/
}
.el-submenu .el-menu{
  /*background-color: #e0e8f7;*/
}
.tatle_img{
  margin-right: 24px;
}
.el-submenu__title{
  color: #6d6f71;
  font-weight: 700;
}
.test{
  font-weight: 700;
  color: #6d6f71;
}

  .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{

        border-right: 6px solid #2f7de7;
      
        
    }
    .el-menu-item.is-active{
      background-color: #c9dbff;
    }
    .nbsp{
      display: inline-block;
      width: 4.1rem;
      height: 1px;
    }
    .el-submenu.is-active .el-submenu__title{
      background-color: #2f7de7;
    }
</style>
