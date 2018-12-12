<template>
    <div style="padding:10px;">
     
            <div style="width:100.5%; height:50px; background-color:#fff;margin-top:-19px;margin-bottom:20px;margin-left:-10px; padding-right:25px; line-height:40px;padding-top:1px;position:fixed; z-index:100">
                 
            <el-button type="primary" @click="goBack" style="float:right; margin-top:4px;z-index:2000;position:absolute;margin-left:10px;">返回</el-button>
            <!-- <el-button type="primary" @click="runScript" style="float:right; margin-top:2px; margin-left:75%;z-index:2000;position:absolute;">运行脚本</el-button> -->
   
            </div>
            
       
            <el-table
              :data="tableData"
              style="width: 100%;margin-top:50px;"
              border>
              <el-table-column
                prop="createdAt"
                label="日期"
                :formatter="dateFormat"
                width="180">
              </el-table-column>
              <el-table-column
                prop="amStartTime"
                :formatter="dateFormat"
                label="上午开始时间"
                width="180">
              </el-table-column>
              <el-table-column
                prop="amEndTime"
                :formatter="dateFormat"
                label="上午结束时间">
              </el-table-column>
              <el-table-column
                prop="pmStartTime"
                :formatter="dateFormat"
                label="下午开始时间">
              </el-table-column>
              <el-table-column
                prop="pmEndTime"
                :formatter="dateFormat"
                label="下午结束时间">
              </el-table-column>
               <el-table-column
                prop=""
                label="操作" 
               >
                <template  scope='scope'>
                    <el-button size="small" type="warning" @click="check(scope.$index, scope.row)">补签</el-button>
                </template>
              </el-table-column>
            </el-table>


                <el-dialog
                  title="提示"
                  :visible.sync="dialogVisible"
                  width="30%"
                  :before-close="handleClose">
                  <div>
                    开始时间：
                           <el-date-picker
                          v-model="value2"
                          type="datetime"
                          placeholder="选择开始时间">
                        </el-date-picker>
                      <br>

                    结束时间：
                          <el-date-picker
                          v-model="value3"
                          type="datetime"
                          placeholder="选择结束时间">
                        </el-date-picker>

                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="putCardAgain">确 定</el-button>
                  </span>
            </el-dialog>
    </div>
</template>
<script>
import Moment from 'moment';
    export default {
        data(){
            return {
                tableData:[],
                dialogVisible:false,
                value2:'',
                value3:'',
                rowId:0,
            }
        },
        methods:{
                 dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return Moment(date*1000).format("YYYY-MM-DD HH:mm ");  
            },
            getData(){
                  this.$http({
                    method: 'get',
                    url:this.$getApi+'management/attendancesTeachers/period?schoolId=4&periodType=MONTH&specialDate=2018-07-10',                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token  

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                    console.log("===教师周期查询===",body);
                    console.log("===wifi 列表====",res);

                   this.tableData=body

                })
            },
            goBack(){
                 history.go(-1);
            },
            check(index,row){
                console.log(row);
                this.dialogVisible=true
                this.rowId=row.id
            },
            putCardAgain(){
                 console.log(this.value3)
                console.log(this.value2)
                 var date= Date.parse(this.value2);
                 var date1= Date.parse(this.value3);
console.log(date)
console.log(date1)
                    this.$http.put(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'management/attendancesTeachers',
                    
                       {
                          "actorId": localStorage.selfId,
                      
                          "attendanceTeacherId": this.rowId,
                          "desc": "",
                          "endTime": date1,
                          "portrait": "",//半身像
                          "retroType": "RETOR",
                         
                          "startTime": date,
                          "temperature": 0//体温
                        },
                    
                    {
                      headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===body=add==teacher====",res);
                    // this.getData();
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