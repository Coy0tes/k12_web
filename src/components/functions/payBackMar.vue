<template>
   <el-tabs v-model="activeName" @tab-click="handleClick"  type="card">
    <el-tab-pane label="费种转入" name="first" ><refund></refund></el-tab-pane>
    <el-tab-pane label="退学费用结算" name="second"><returnmoney></returnmoney></el-tab-pane>
     
   
  </el-tabs>
</template>
<script>
import refund from '../functions/returnPremium/refund.vue';
import returnmoney from '../functions/returnPremium/returnmoney.vue';
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
      'refund':refund,
      'returnmoney':returnmoney,
      
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