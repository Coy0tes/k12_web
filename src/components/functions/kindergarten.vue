<template>
   <el-tabs v-model="activeName" @tab-click="handleClick"  type="card" >
    <el-tab-pane label="园所活动" name="first" ><kindergartenWork></kindergartenWork></el-tab-pane>
    <el-tab-pane label="园所食谱" name="second"><cookbook></cookbook></el-tab-pane>
     <el-tab-pane label="假期设置" name="eighth"><leaveRequest></leaveRequest></el-tab-pane>
     <el-tab-pane label="打卡WiFi" name="seventh"><wifiList></wifiList></el-tab-pane>
     <el-tab-pane label="视频监控" name="third"><OssUpload></OssUpload></el-tab-pane>
    
    
   
  </el-tabs>
</template>
<script>
import cookbook from './cookbook.vue';
import kindergartenWork from './kindergartenWork.vue';
import leaveRequest from '../functions/teacher/leaveRequest.vue';
import wifiList from '../functions/teacher/wifiList.vue';
import OssUpload from '../functions/OssUpload.vue';

// import chackSearch from '../teacher/chackSearch.vue';
// import leaveRequest from '../teacher/leaveRequest.vue';
// import approvalProcess from '../teacher/approvalProcess.vue';
// import MyCheck from '../teacher/MyCheck.vue';
// import wifiList from '../teacher/wifiList.vue';
// import employeeHolidy from '../teacher/employeeHolidy.vue';
    export default {
        data(){
            return {
               activeName: 'first',
               loading:true,
            }
        },
           methods: {
           handleClick(tab, event) {
              console.log(tab, event);
            }
    },
    mounted(){

    },
    components:{
      'cookbook':cookbook,
      'kindergartenWork':kindergartenWork,
      // 'chackSearch':chackSearch,
      'leaveRequest':leaveRequest,
      // 'approvalProcess':approvalProcess,
      // 'MyCheck':MyCheck,
      'wifiList':wifiList,
      'OssUpload':OssUpload,
      // 'employeeHolidy':employeeHolidy,
      
    }
    }
</script>
<style scoped>
    .el-tabs--bottom:not(.el-tabs--border-card):not(.el-tabs--card) .el-tabs__item:nth-child(), .el-tabs--top:not(.el-tabs--border-card):not(.el-tabs--card) .el-tabs__item:nth-child(){
      font-weight: 700!important;
    }
    .el-tabs__item{
      font-weight: 700!important;
    }
    .el-tabs__content{
      margin-top:18px!important;
    }
</style>