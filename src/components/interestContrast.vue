<template>
    <div>
        <!-- 艺术团对比表 -->
        <div>
               <div style="width:103.5%; height:50px;padding-top:3px; background-color:#fff;margin-top:-0px;margin-bottom:10px;margin-left:-30px; padding-right:25px; line-height:40px; ">
                <span>
                     <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择开始日期"
                      style="margin-left:40px;">
                    </el-date-picker> 至
                    <el-date-picker
                      v-model="value2"
                      type="date"
                      placeholder="选择结束日期">
                    </el-date-picker>
                    <el-button type="primary" @click='getData'>查询</el-button>
                </span> 
           
            </div>
            <!-- 开始时间 -->
                <div id='pic' style="padding-right:5px;padding-left:5px; width:50%;float:right; display:inline-block;">
                      <table cellspacing="0">
                        <tr>
                          <td colspan="4" style="text-align: center;" class="color">艺术团收入表</td>
                        
                        </tr>
                        
                         <tr>
                          <td class="color"  rowspan="1">
                              序号
                            </td>
                          <td class="color">课程名称</td>
                          <td style="width:25%;">
                            <th colspan="4" style="border-bottom:1px solid #000;">收入</th>
                            <tr align="center" >
                                 <th colspan="2" width="20%" style="border-right:1px solid #000">报班人数</th>
                               <th  colspan="2"width="20%">收费标准/人</th>
                              </tr>
                            </td>
                          
                          
                          <td class="color">备注</td>
                          
                          
                          
                        </tr>



                         <tr>
                          
                          <td rowspan="4"></td>
            
                          <td></td>
                          <td>
                              <tr align="center" >
                                 <th colspan="2" width="20%" style="border-right:1px solid #000">1-4-1</th>
                               <th width="20%">1-4-2</th>
                              </tr>
                          </td>
                          <td></td>
                      
                          
                        </tr>



                    

                       <tr>
                          <td class="color">小计</td>
                          <td>
                               <tr align="center" >
                                 <th colspan="2" width="20%" style="border-right:1px solid #000"></th>
                               <th width="20%"></th>
                              </tr>
                          </td>
                          <td></td>
                         
                         
                         
                          <!-- <td></td> -->
                        </tr>


                     


                      </table>
                </div>
            <!-- 结束时间 -->
                <div id='pic' style="padding-right:5px;padding-left:5px; width:50%;float:right;display:inline-block;">
                      <table cellspacing="0">
                        <tr>
                          <td colspan="4" style="text-align: center;" class="color">艺术团收入表</td>
                        
                        </tr>
                        
                         <tr>
                          <td class="color"  rowspan="1">
                        序号
                      </td>
                          <td class="color">课程名称</td>
                          <td style="width:25%;">
                            <th colspan="4" style="border-bottom:1px solid #000;">收入</th>
                            <tr align="center" >
                                 <th colspan="2" width="20%" style="border-right:1px solid #000">报班人数</th>
                               <th  colspan="2"width="20%">收费标准/人</th>
                              </tr>
                            </td>
                          
                          
                          <td class="color">备注</td>
                          
                          
                          
                        </tr>



                         <tr v-for="(item,index) in tableData1">
                          
                          <td >{{item.id}}</td>
            
                          <td>{{item.name}}</td>
                          <td>
                              <tr align="center" >
                                 <th colspan="2" width="20%" style="border-right:1px solid #000"><span style="padding-right:15px;padding-left:15px;">{{item.stuCount}}</span></th>
                               <th colspan="2" width="20%">{{item.income}}</th>
                              </tr>
                          </td>
                          <td>备注111</td>
                      
                          
                        </tr>



                    

                       <tr>
                          <td class="color">小计</td>
                          <td>
                               <tr align="center" >
                                 <th colspan="2" width="20%" style="border-right:1px solid #000"></th>
                               <th width="20%"></th>
                              </tr>
                          </td>
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
                value1:'',
                value2:'',
                tableData1:[],
                tableData2:[],
            }
        },
        methods:{
          getData(){
             var timestamp3 = new Date(this.value1).getTime();
             var timestamp4 = new Date(this.value2).getTime();
            console.log('1111111',timestamp3)
             this.$http({
                    method: 'get',
                    url:this.$getApi+'management/ikm/termIncome?firstTime='+timestamp3+'&secondTime='+timestamp4,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('--------兴趣班get----------',res);
                  console.log('--------兴趣班get11111----------',res.body[0].infoList);
                  console.log('--------兴趣班get22222----------',res.body[1].infoList);
                  // console.log('--------兴趣班get11111----------',res.[0].infoList);
                  // console.log('--------兴趣班get22222----------',res.[1].infoList);
                  this.tableData1=res.body[1].infoList;
                  this.tableData2=res.body[0].infoList;
console.log()
                       
                    const {
                        body
                    } = res
                      

                })
          }
        }
    }
</script>
<style scoped>
     table{
      border: 1px solid #000;
      text-align: center;
      width: 100%;
      font-family: "宋体";
    }
    tr{
        /*border: 1px solid #000;*/
        text-align: center;
    }
    th{
        /*border: 1px solid #000;*/
        /*border-left: 1px solid #000;*/
        text-align: center;
    }
    td{
        border: 1px solid #000;
        text-align: center;
        line-height: 30px;
         height: 30px;
    }
    .color{
      background-color:#8ccdf9;
      color: #fff;

    }

</style>