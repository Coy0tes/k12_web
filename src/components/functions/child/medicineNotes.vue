<template>
    <div style="padding:10px;padding-top:15px">
            <el-date-picker
      v-model="value4"
      @change='getData'
      type="date"
      placeholder="选择月">
    </el-date-picker>
          <el-table
            :data="tableData"
            border
            style="width: 100%;margin-top:5px">
            <el-table-column
              prop="date"
              label="日期"
              :formatter="dateFormat"
              align='center'
              >
            </el-table-column>
            <el-table-column
              prop="stuName"
              label="姓名"
              align='center'
              >
            </el-table-column>
            <el-table-column 
              label="操作"
              align='center'>
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)"  size="small">查看</el-button>
               
              </template>
            </el-table-column>
          </el-table>


          <el-dialog
         
            :visible.sync="dialogVisible"
            width="600px"
            :before-close="handleClose">
                 <div class="top">
                 <span class="top_text">查看详情</span>
                 <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                   <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
                 </div>
                 </div>
                  <div style="margin-top:-30px;padding-left:150px; font-size:13px;line-height:40px; border:1px solid #ccc;">
                    <div>
                      <span style="font-size:15px">服药儿童 : </span>{{notesArry.stuName}}  <span style="margin-left:30px;font-size:15px">执行时间 :</span> {{notesArry.executeTime|formatDate}}
                    </div> 

                    <div>
                      <span style="font-size:15px">药品名称 : </span>{{notesArry.medicineName}}
                    </div>
                    <div>
                      <span style="float:left;font-size:15px">服药时间：</span>
                        
                          <li v-for='item in notesArry.medicineTime'style="float:left;list-style:none;">{{item.time}} &nbsp;</li>
                        
                    </div>
                    <br>
                    <div>
                      <span style="font-size:15px">服用剂量  : </span>{{notesArry.dose}}  <span style="margin-left:35px;font-size:15px">服药天数:</span> {{notesArry.days}}天 
                    </div>
                    <div>
                      <span style="font-size:15px">备注 ：</span>{{notesArry.remark}}
                    </div>
                 

                  </div>
            <span slot="footer" class="dialog-footer">
              <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
              <el-button type="primary" @click="sure"style='margin-right:250px' >确 定</el-button>
            </span>
          </el-dialog>
    </div>
</template>
<script>
import Moment from 'moment';
    export default {
        data(){
            return {
                value4:'',
                tableData:[],
                dialogVisible:false,
                notesArry:[],
            }
        },
           filters: {
          formatDate: function (val) {
              console.log(val)
              return Moment(val*1000).format("YYYY-MM-DD ");
          }
      },
        methods:{
              sure(){
                this.dialogVisible=false
              },
            dateFormat:function(row, column) {  
                   var date = row[column.property];  
                  if (date == undefined) {  
                     return "";  
                  }  
                  return Moment(date*1000).format("YYYY-MM-DD ");  
                },
            getData(){
                if (!this.value4) {
                    this.value4=new Date();
                }
                 var date = new Date(this.value4);  
                 var Month=(date.getMonth() + 1);
                 var Month=(date.getMonth() + 1);
                 var Day=date.getDate()
                 var date_value=date.getFullYear() + '-' + (Month>9?Month:('0'+Month)) + '-' +(Day>9?Day:('0'+Day)) 
                 this.$http({
                    method: 'get',
                    url:   this.$getApi+'medicine/management/findBy?code=1&localDate='+date_value ,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res)

                    const {
                        body
                    } = res

                    console.log("===res students===",res.body);
                    this.tableData=res.body
            

                })
            },
            handleClick(row){
                console.log(row)
             this.dialogVisible=true
                 this.$http({
                    method: 'get',
                    url:   this.$getApi+'medicine/management/findOne?id='+row.id,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res)

                    const {
                        body
                    } = res

                    console.log("===res students===",res.body);
                    this.notesArry=res.body
            

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