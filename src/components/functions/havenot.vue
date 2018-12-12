<template>
    <div>
            <div class="content1">
               <div style="width:102.5%; height:50px; background-color:#fff;padding-top:4px; margin-top:-10px;margin-bottom:10px;margin-left:-30px; padding-right:25px;padding-left:30px; line-height:40px; position: fixed; z-index:100;">
                    <span></span><el-select v-model="value" placeholder="请选择查询条件">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
<!--         <el-input v-model="input" placeholder="请输入内容" id="input"></el-input>
         <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-button type="primary">查询</el-button> -->
                 
               </div>
     
    <div class="tab">
        <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top:-18px;">
      <el-table-column
        prop="studentId"
        label="学生ID"
        width="120"
        align='center'>
      </el-table-column>
      <el-table-column
        prop="studentName"
        label="姓名"
        width="120"
        align='center'>
      </el-table-column>
      <el-table-column
        prop="klass"
        label="班级"
        align='center'>
      </el-table-column>
      <el-table-column
        prop="name"
        label="费种"
        align='center'>
      </el-table-column>
      <el-table-column
        prop="createAt"
        :formatter= "dateFormat"
        label="收费时间"
        align='center'>
      </el-table-column>
      <el-table-column
        prop="checkAt"
        :formatter= "dateFormat"
        label="缴费时间"
        align='center'>
      </el-table-column>

  <!--       <el-table-column
      fixed="right"
      label="状态"
      width="170"
      align='center'>
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small" @click="dialogVisible = true">编辑</el-button>
      </template>
    </el-table-column> -->




    </el-table>
<el-dialog
  title="编辑"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">





  <span>编辑页面...</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleClose(scope.$index, scope.row)">确 定</el-button>
  </span>
</el-dialog>


    </div>

    <div class="block">
 
    <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pagesize"
              background="false"
              layout="total, prev, pager, next"
              :total="tableData.length"
               v-show="ISshow"
              style="float:right; margin-top:20px;">
            </el-pagination>
</div>
    </div>


    </div>
</template>
<script>
 import Moment from 'moment';
    export default {
        data(){
            return {
              ISshow:false,
                tableData:[],
                value1:'',
                dialogVisible: false,
            }
        },
        methods:{

                dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return Moment(date*1000).format("YYYY-MM-DD ");  
            } ,

                  getData(){
                console.log('==============')
             this.$http({
                    method: 'get',
                    url:this.$getApi+'charge/findNotPaid?startTime=1519833600000&klassId=3&studentId=&page=1',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('---------未缴费---------',res)
                    
                    const {
                        body
                    } = res
                      
                    if(body.content.length==0){
                      this.ISshow=false
                    }else{
                      this.ISshow=true
                    }


                    console.log("===未缴费 res.body===",res.body);


                    if (!!body.content.length) {
                        this.tableData = body.content
                        this.count = body.length
                    } else {
                        // alert('err:' + body)
                    }

                    var constArray=[];
                    res.body.content.forEach(function(item, index, array){

                        constArray.push({
                         
                         checkAt:item.checkAt,
                         createAt:item.createAt,
                         studentId:item.studentId,
                         studentName:item.studentName,
                         klass:item.klassId,
                         name:item.expenseEntry.name






                           
                         })
                        
                    })

                    
                        console.log("------constArray------",constArray);

                    if (!!body.content.length) {
                        this.tableData = constArray
                        this.count = constArray.length
                    } else {
                        // alert('err:' + body)
                    }

                  

                })


      },
      handleClose(index, row) {
          this.dialogVisible = true
        
      },






        },

          mounted(){
            console.log('---------mounted--------------');
            this.getData();
    
          },
    }
</script>
<style scoped>
    
    .content1{
        width: 100%;
        /*height: 400px;*/
        /*margin-top: 30px;*/
        /*background-color: red;*/
    }
    #input{
      display: inline-block;
      width: 200px;
    }
    
    .block{
        float: right;
    }
    .tab{
      margin-top: 30px;
      padding-top: 60px;
      padding-right: 17px;
    }
</style>
<!-- {
  "content": [
    {
      "checkAt": 0,
      "createAt": 0,
      "endAt": 0,
      "expenseEntry": {
        "amount": 0,
        "delayCharge": true,
        "id": 0,
        "identDiscounts": [
          {
            "discountRate": 0,
            "id": 0,
            "identType": "USER",
            "schoolId": 0
          }
        ],
        "name": "string",
        "periodDiscounts": [
          {
            "discountRate": 0,
            "id": 0,
            "periodType": "YEAR",
            "schoolId": 0
          }
        ],
        "periodType": "YEAR",
        "schoolId": 0
      },
      "id": 0,
      "identDiscount": {
        "discountRate": 0,
        "id": 0,
        "identType": "USER",
        "schoolId": 0
      },
      "klassId": 0,
      "klassType": "COMMON",
      "money": 0,
      "paymentAt": 0,
      "periodDate": 0,
      "periodDeduct": true,
      "periodDiscount": {
        "discountRate": 0,
        "id": 0,
        "periodType": "YEAR",
        "schoolId": 0
      },
      "planId": 0,
      "remainMoney": 0,
      "studentId": 0,
      "studentName": "string"
    }
  ],
  "first": true,
  "last": true,
  "number": 0,
  "numberOfElements": 0,
  "size": 0,
  "sort": {},
  "totalElements": 0,
  "totalPages": 0
} -->