<template>
   <el-tabs v-model="activeName" @tab-click="handleClick"  type="card">
    <el-tab-pane label="幼儿管理" name="first" ><students></students></el-tab-pane>
    <el-tab-pane label="幼儿出勤" name="second"><studentSingoCount></studentSingoCount></el-tab-pane>
   
  </el-tabs>
</template>
<script>
import students from '../functions/students.vue';
import studentSingoCount from '../functions/studentSingoCount.vue';

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
      'students':students,
      'studentSingoCount':studentSingoCount,
 
      
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