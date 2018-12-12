<template>
   <el-tabs v-model="activeName" @tab-click="handleClick"  type="card">
    <el-tab-pane label="教师考勤" name="first" ><addDuty></addDuty></el-tab-pane>
    <el-tab-pane label="教师排班" name="second"><teacherClass></teacherClass></el-tab-pane>
    <el-tab-pane label="考勤查询" name="third"><chackSearch></chackSearch></el-tab-pane>   
    <el-tab-pane label="审批流程" name="fifth"><approvalProcess></approvalProcess></el-tab-pane>
    <el-tab-pane label="请假审批" name="sixth"><MyCheck></MyCheck></el-tab-pane>
     <el-tab-pane label="员工假期" name="fourth"><employeeHolidy></employeeHolidy></el-tab-pane>
    
     <el-tab-pane label="考勤统计" name="eightth"><teacherSingoCount></teacherSingoCount></el-tab-pane>
   
  </el-tabs>
</template>
<script>
import addDuty from '../teacher/AddDuty.vue';
import teacherClass from '../teacher/teacherClass.vue';
import chackSearch from '../teacher/chackSearch.vue';

import approvalProcess from '../teacher/approvalProcess.vue';
import MyCheck from '../teacher/MyCheck.vue';

import employeeHolidy from '../teacher/employeeHolidy.vue';
import teacherSingoCount from '../teacher/teacherSingoCount.vue';
    export default {
        data(){
            return {
               activeName: 'first'
            }
        },
           methods: {
           handleClick(tab, event) {
              console.log(tab, event);
            }
    },
    components:{
      'addDuty':addDuty,
      'teacherClass':teacherClass,
      'chackSearch':chackSearch,
      // 'leaveRequest':leaveRequest,
      'approvalProcess':approvalProcess,
      'MyCheck':MyCheck,
      // 'wifiList':wifiList,
      'employeeHolidy':employeeHolidy,
      'teacherSingoCount':teacherSingoCount,
      
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
</style>