<template>
    <div style="padding:10px;">
         <el-table
            :data="tableData"
            border
            style="width: 100%; ">

            <el-table-column
              prop="theYearMonth"
              align="center"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="studentName"
              align="center"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="theYearMonth"
              align="center"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="money"
             align="center"
              label="实收">
            </el-table-column>
            <el-table-column
              prop="refundMoney"
              align="center"
              label="本期退费">
            </el-table-column>
          </el-table>
    </div>
</template>
<script>
 import Moment from 'moment';
    export default {
        data(){
            return {
                tableData:[],
            }
        },
        methods:{
                dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return Moment(date*1000).format("YYYY-MM-DD ");  
            },
            getData(){
                 var remianId = this.$store.state.remianId //拿

                     this.$http.get(
                
                    this.$getApi+'revenue/income/findDetail?id=1',
                   
                    {
                      headers:{
                        
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                    
                    console.log("===revenue/income/findDetail====",res);
                    this.tableData=res.body
                 
                       
                    
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