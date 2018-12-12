<template>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="园所记录" name="first"><schoolOut></schoolOut></el-tab-pane>
    <el-tab-pane label="班级记录" name="second"><klassOut></klassOut></el-tab-pane>
    
  </el-tabs>
</template>
<script>
import schoolOut from '../Warehouse/schoolOut.vue'
import klassOut from '../Warehouse/klassOut.vue'
  export default {
    data() {
      return {
        activeName2: 'first'
      };
    },
      components: { //2、暴露
  
      schoolOut,
      klassOut
     
 
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>