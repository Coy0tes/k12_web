<template>
    <div style="padding:10px;">
        <el-table
        :data="tableData"
        border
        style="width: 100%;margin-top:10px">
        <el-table-column
          prop=""
          label=""
          width='1'
         >
        </el-table-column>  
        <el-table-column
          prop="executeTime"
          label="日期"
          align='center'
          :formatter="dateFormat"
         >
        </el-table-column>
        <el-table-column
          prop="stuName"
          align='center'
          label="姓名"
         >
        </el-table-column>
        <el-table-column
          prop="medicineName"
          align='center'
          label="药品名">
        </el-table-column>
        <el-table-column
          prop="dose"
          align='center'
          label="剂量">
        </el-table-column>

        <el-table-column
          prop="address"
          align='center'
          label="操作">
        <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)"  size="small">服药打卡</el-button>
        <!-- <el-button type="text" size="small">编辑</el-button> -->
      </template>
        </el-table-column>
      </el-table>


                  <el-dialog
                  
                  :visible.sync="dialogVisible"
                  width="600px"
                  :before-close="handleClose">
                  <div class="top">
                 <span class="top_text">服药打卡</span>
                 <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                   <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
                 </div>
                 </div>
                  <div style="width:325px;margin:0 auto;margin-top:-30px">
                    <span style="font-size:15px">服药时间:</span>
                      <li v-for='item in medicineTimeArry' style="list-style:none; border:1px solid #ccc;border-radius: 7px;margin-left:25px;padding-left:10px;line-height:35px;height: 40px;margin-top:5px" v-if='!item.isTake' >
                          {{item.time}} <el-button size='mini' @click='putMedicine(item.id)' style='margin-left:190px'type="primary"> 打卡</el-button>
                      </li>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                    <el-button type="primary" @click="dialogVisible = false" style='margin-right:250px'>确 定</el-button>
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
                medicineId:'',
                medicineTimeArry:[],
            }
        },
        methods:{
            putMedicine(i){
                console.log(i)

                    this.$http({
                    method: 'put',
                    url:this.$getApi+'medicine/management/updateMedicineTime?medicineId='+this.medicineId+'&medicineTimeId='+i,
                      headers: {'Authorization': 'Bearer ' + localStorage.token}
                    
                    
                }).then((res) => { // promise对象
                    console.log('======res=====',res)
                  console.log('------------------',res.body)
                        this.$message({
                      message: '成功',
                      type: 'success'
                    });
                    const {
                        body
                    } = res

                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });


            },
            handleClick(row){
                console.log(row)
                this.medicineId=row.id
                this.dialogVisible=true
                this.medicineTimeArry=row.medicineTime

            },
              dateFormat:function(row, column) {  
                   var date = row[column.property];  
                  if (date == undefined) {  
                     return "";  
                  }  
                  return Moment(date*1000).format("YYYY-MM-DD ");  
                },
                getData(){
                      this.$http({
                    method: 'get',
                    url:   this.$getApi+'medicine/management/findDoneForTeacher?klassId=8&localDate=2018-12-03',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======教师：查询正在进行的=====',res)

                    const {
                        body
                    } = res

                    console.log("===教师：查询正在进行的===",res.body);
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