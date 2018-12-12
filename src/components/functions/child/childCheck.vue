 <!-- //儿童体检 -->
<template>

    <div>
   
      <el-tabs v-model="activeName" @tab-click="handleClick"  type="card">
        <el-tab-pane label="晨检" name="first" style="margin-top:20px;"><morning></morning></el-tab-pane>
        <el-tab-pane label="午检" name="second" style="margin-top:20px;"><noon></noon></el-tab-pane>
        <el-tab-pane label="晚检" name="third" style="margin-top:20px;"><night></night></el-tab-pane>
        <el-tab-pane label="发布记录" name="forth" style="margin-top:20px;"><healthFindPeriod></healthFindPeriod></el-tab-pane>
        
      </el-tabs>
    </div>
</template>
<script>
import morning from '../child/morning.vue'
import noon from '../child/noon.vue'
import night from '../child/night.vue'
import healthFindPeriod from '../child/healthFindPeriod.vue'

    export default {
        data(){
            return {
                 activeName: 'first'
            }
        },
        components: { //2、暴露
  
      morning,
      noon,
      night,
      healthFindPeriod,
 
    },
        methods:{
            getData(){
                this.$http({
                    method: 'get',
                    url:this.$getApi +'empFlowRate/management/findRateLeaveCity?folwEnum=LEAVEBY',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res
                 
                    console.log('8888888888888888888888',res)
                    console.log('8888888888888888888888',body)

                })
            }
        },
        mounted(){
            this.getData();
        }
    }
</script>
<style>
    
</style>