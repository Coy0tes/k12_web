<template>
    <div style="padding:10px;padding-left:0px;margin-top:10px">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="未授权" name="first">  <showVideoYorN style='margin-top:10px'></showVideoYorN></el-tab-pane>
    <el-tab-pane label="已授权" name="second"><showVideoY style='margin-top:10px'></showVideoY></el-tab-pane>
    <el-tab-pane label="设备列表" name="thrid"><hkDevice style='margin-top:10px'></hkDevice></el-tab-pane>

  </el-tabs>
      
    </div>
</template>
<script>
import showVideoYorN from '../functions/watchVideos/showVideoYorN.vue'
import showVideoY from '../functions/watchVideos/showVideoY.vue'
import hkDevice from '../functions/watchVideos/hkDevice.vue'
    export default {
        data(){
            return {
              activeName2:'first',
            }
        },
             components: { //2、暴露
  
      showVideoYorN,
      showVideoY,
      hkDevice
    
 
    },

    }
</script>
<style>
    
</style>