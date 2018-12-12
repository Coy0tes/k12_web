<template>
   <el-tabs v-model="activeName" @tab-click="handleClick"  type="card">
    <el-tab-pane label="班级管理" name="first" ><klasses></klasses></el-tab-pane>
    <el-tab-pane label="班级计划" name="second"><klassplans></klassplans></el-tab-pane>
    <el-tab-pane label="毕业班级" name="thrid"><oldKlass></oldKlass></el-tab-pane>
    <el-tab-pane label="亲子作业" name="fourth"><homeWork></homeWork></el-tab-pane>   
   
  </el-tabs>
</template>
<script>
import klasses from '../functions/klasses.vue';
import klassplans from '../functions/klassplans.vue';
import oldKlass from '../functions/oldKlass.vue';
import homeWork from '../functions/homeWork.vue';
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
      'klasses':klasses,
      'klassplans':klassplans,
      'oldKlass':oldKlass,
      'homeWork':homeWork,
      
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