<template>
    <div style="margin-left:-5px; width:100%;background-color:#fff; padding-bottom:25px;">
       
        <template>
  <el-tabs v-model="activeName" @tab-click="handleClick"  type="card">
  
   <!--  <el-tab-pane label="收费计划" name="second">
      <div>
        
        <collectPlan></collectPlan>

      </div>

    </el-tab-pane> -->
    <el-tab-pane label="已交费查询" name="third" style="margin-top:-10px;">
      <div>
        <allerdy></allerdy>


      </div>
    </el-tab-pane>
    <el-tab-pane label="未交费查询" name="fourth" style="margin-top:-10px;">
      <div>
        <havenot></havenot>
      </div>
    </el-tab-pane>
    <el-tab-pane label="欠费查询" name="fiveth" style="margin-top:-10px;">
      
      <div>
        <Arrearage></Arrearage>

      </div>
    </el-tab-pane>
    <el-tab-pane label="当月余额查询" name="sixth" style="margin-top:-10px;">
<div>
  
  <balance></balance>
</div>
    </el-tab-pane> 


   <!--  <el-tab-pane label="学生收费计划" name="seventh" style="margin-top:-10px;">
<div>
  
  <newfeiplan></newfeiplan>
</div>
    </el-tab-pane> -->
  </el-tabs>


</template>
    </div>
</template>
<script>
    import Newfeiplan from '../functions/newfeiplan.vue';
   import allerdy from '../functions/allerdy.vue';
   import havenot from '../functions/havenot.vue';
   import Arrearage from '../functions/Arrearage.vue';
   import balance from '../functions/balance.vue';
   import collectPlan from '../functions/collectPlan.vue';
   import newfeiplan from '../functions/newfeiplan.vue';
   
    export default {
         data() {
      return {
        activeName: 'third'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
    },
     components:{
      'newfeiplan':Newfeiplan,
      'allerdy':allerdy,
      'havenot':havenot,
      'Arrearage':Arrearage,
      'balance':balance,
      'collectPlan':collectPlan
    }

    }
</script>
<style scoped>
 .search{
        width: 100px;
    }
     .newplan{
        float: right;
        margin-right: 30px;
    }
     #content{
        width: 100%;
        /*height: 100px;*/
       /* background-color: red;*/
        margin-top: 20px;
        padding-left: 20px;
    }
    .el-tabs{
      padding-left: 10px;
    }
    .el-tabs__nav-wrap{
      margin-bottom: 25px!important;
    }
</style>