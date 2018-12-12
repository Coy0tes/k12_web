<template>
    <div>
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="儿童出勤" name="first"><childrenAttent></childrenAttent></el-tab-pane>
            <el-tab-pane label="儿童缺勤" name="second"><childrenAttentOut></childrenAttentOut></el-tab-pane>
            <el-tab-pane label="出勤数据" name="third"><childAttentEchars></childAttentEchars></el-tab-pane>

          </el-tabs>
    </div>
</template>
<script>
import childrenAttent from './childrenAttent.vue'
import childrenAttentOut from './childrenAttentOut.vue'
import childAttentEchars from './childAttentEchars.vue'
    export default {
        data(){
            return {
              activeName2:'first',
            }
        },
         components:{
      'childrenAttent':childrenAttent,
      'childrenAttentOut':childrenAttentOut,
      'childAttentEchars':childAttentEchars,
   
      
    }
    }
</script>
<style>
    
</style>