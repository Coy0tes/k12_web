<template>
   <el-tabs v-model="activeName" @tab-click="handleClick"  type="card">
    <el-tab-pane label="考勤查询" name="first" ><demand></demand></el-tab-pane>
    <el-tab-pane label="请假查询" name="second"><attendance></attendance></el-tab-pane>
   
  </el-tabs>
</template>
<script>
import demand from './attendances/demand.vue';
import attendance from './attendances/attendance.vue';
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
      'demand':demand,
      'attendance':attendance,
      
    }
    }
</script>
<style scoped>
    .el-tabs--bottom:not(.el-tabs--border-card):not(.el-tabs--card) .el-tabs__item:nth-child(2), .el-tabs--top:not(.el-tabs--border-card):not(.el-tabs--card) .el-tabs__item:nth-child(2){
      font-weight: 700!important;
    }
    .el-tabs__item{
      font-weight: 700!important;
    }
</style>