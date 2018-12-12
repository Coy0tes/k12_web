<template>
   <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="收入汇总" name="first" ><mainIncome></mainIncome></el-tab-pane>
    <el-tab-pane label="支出汇总" name="second"><spendingSummary></spendingSummary></el-tab-pane>
    <el-tab-pane label="收支汇总" name="thirde"><minorIncome></minorIncome></el-tab-pane>
     
   
  </el-tabs>
</template>
<script>
import mainIncome from '../finance/mianIncome.vue';
import spendingSummary from '../finance/spendingSummary.vue';
import minorIncome from '../finance/minorIncome.vue'
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
      'mainIncome':mainIncome,
      'spendingSummary':spendingSummary,
      'minorIncome':minorIncome
      
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
    .el-tabs__content{
      margin-top:-35px!important;
    }
</style>