<template>
    <div style="padding:10px;">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="进行中" name="first"><takeMedi></takeMedi></el-tab-pane>
            <el-tab-pane label="喂药记录" name="second"><medicineNotes></medicineNotes></el-tab-pane>
            <!-- <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
  </el-tabs>
    </div>
</template>
<script>
import takeMedi from './takeMedi.vue'
import medicineNotes from './medicineNotes.vue'


    export default {
        data(){
            return {
                activeName2:'first',
            }
        },
              components:{
                takeMedi,
                medicineNotes
   
      
    }
    }
</script>
<style>
    
</style>