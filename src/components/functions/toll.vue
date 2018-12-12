<template>
   <el-tabs v-model="activeName" @tab-click="handleClick"  type="card">
    <el-tab-pane label="收费种类" name="first" ><Costcategories></Costcategories></el-tab-pane>
    <!-- <el-tab-pane label="查询班级" name="second"><searchKlass></searchKlass></el-tab-pane> -->
    <!--  <el-tab-pane label="学生管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="艺术团对比表" name="fourth">定时任务补偿</el-tab-pane> -->
   
  </el-tabs>
</template>
<script>
import Costcategories from '../functions/Costcategories.vue';
// import searchKlass from '../functions/searchKlass.vue';
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
      'Costcategories':Costcategories,
      // 'searchKlass':searchKlass,
      
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