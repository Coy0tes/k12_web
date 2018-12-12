<template>
    <div>
        <div>
               <div id='pic' style="padding-right:5px;padding-left:5px;">
                      <table border="1px solid #ccc" cellspacing="0">
                        <tr>
                          <td colspan="10" style="text-align: center;" class="color"></td>
                        
                        </tr>
                        
                         <tr>
                          <td class="color"></td>
                          <td></td>
                          <td class="color"></td>
                          <td></td>
                          <td class="color"></td>
                          
                          <td colspan="5"></td>
                          
                        </tr>



                         <tr>
                          <td class="color"></td>
                          <td></td>
                          <td class="color"></td>
                          <td>
                          </td>
                          <td style="background-color:#2aa2ff; color:#fff; font-family: '黑体';
      font-size: 15px;font-weight:700;"></td>
                          <td></td>
                          <td class="color"></td>
                          <td colspan="3"></td>
                          
                        </tr>


                       <tr>
                          <td class="color"></td>
                          <td class="color"></td>
                          <td class="color"></td>
                          <td class="color"></td>
                          <td class="color"></td>
                          <!-- <td class="color">请假月份</td> -->
                          <td class="color"></td>
                          <td class="color"></td>
                          <td class="color"></td>
                          <td style="width: 200px;" class="color"></td>
                        </tr>

                      <tr v-for="(item,index) in perArry">
                          <td style="background-color:#2aa2ff; color:#fff; font-family: '黑体';
      font-size: 15px;font-weight:700;height:40px;line-height:40px;"></td>
                          <td></td>
                          <td></td>
                          <td></td><!--  余额 -->
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <!-- <td></td> -->
                        </tr>

                       <tr>
                          <td class="color"></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <!-- <td></td> -->
                        </tr>


                     


                      </table>
                </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        },
        methods:{
          getData(){
             this.$http({
                    method: 'get',
                    url:this.$getApi+'management/ikm/termIncome?firstTime='+  +'&secondTime='+  ,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('--------兴趣班get----------',res)
                        this.tableData=res.body.content
                    const {
                        body
                    } = res
                      

                })
          }
        }
    }
</script>
<style scoped>
    
</style>