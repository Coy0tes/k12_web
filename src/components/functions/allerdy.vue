<template>
    <div >
        <template>
    <div style="margin-left:10px;">
       <div style="width:102.5%; height:50px; background-color:#fff;margin-top:-10px;padding-top:4px; margin-bottom:10px;margin-left:-30px; padding-right:25px;padding-left:30px; line-height:40px;position: fixed; z-index:100;">
         

   <el-select v-model="value" placeholder="选择查询条件" @change="search">
                 <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
            </el-option>
          </el-select>
             
            <!-- <el-input v-model="input" placeholder="请输入内容"  @select="handleSelect" class="search"></el-input> -->
            <el-date-picker
      v-model="endAt"
      type="date"
      placeholder="选择日期"
      >
    </el-date-picker>
 <el-button type="primary" @click='getData'>查询</el-button>
       </div>
    
    <div class="tab">


 <el-table
   :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
       border
       
    style="width: 100%;margin-top:-18px;">
    <el-table-column
      prop="studentId"
      label="学生id"
      width="180"
      align="center"
      
     >
    </el-table-column>
    <el-table-column
      prop="studentName"
      label="姓名"
      width="180"
       align="center">
    </el-table-column>
    <el-table-column
      prop="klass"
      label="班级"
       align="center">
    </el-table-column>
     <el-table-column
      prop="name"
      label="费种"
      width="180"
       align="center">
    </el-table-column>
    <el-table-column
      prop="createAt"
     
      label="收费时间"
      width="180"
       align="center">
    </el-table-column>
    <el-table-column
      prop="checkAt"
    
      label="缴费时间"
       align="center">
    </el-table-column>

    
 <!--    <el-table-column
    
      label="状态"
      width="180">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small" @click="handleClose(scope.$index, scope.row)">编辑</el-button>
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
    <el-button type="primary" @click="dialogVisible = true">确 定</el-button>
  </span>
</el-dialog>

</div>


<div class="block">
  <!-- <span class="demonstration">页数较少时的效果</span> -->
   
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

</template>

    </div>
</template>
<script>
 import Moment from 'moment';
    export default {

        data(){
            return {
              tableData:[
                {
                  studentId:'1',
                  studentName:'殷子瑶',
                  klass:'奇思班',
                  name:'保育保教费',
                  createAt:'2018-05-01',
                  checkAt:'2018-05-10',

                }, {
                  studentId:'2',
                  studentName:'敖德萨',
                  klass:'奇思班',
                  name:'保育保教费',
                  createAt:'2018-05-01',
                  checkAt:'2018-05-10',

                }, {
                  studentId:'3',
                  studentName:'撒旦',
                  klass:'奇思班',
                  name:'保育保教费',
                  createAt:'2018-05-01',
                  checkAt:'2018-05-10',

                }, {
                  studentId:'4',
                  studentName:'周传雄',
                  klass:'奇思班',
                  name:'保育保教费',
                  createAt:'2018-05-01',
                  checkAt:'2018-05-10',

                },

              ],
              currentPage:1,
                 pagesize:10,
                  showSize: 10,
                current_page: 0,
                count: 100,
              ISshow:false,
              
               options: [{
                      value: 1,
                      label: '指定班级'
                    }, {
                      value: 2,
                      label: '指定儿童'
                    }, ],
                      value:'',
                      dialogVisible: false,
                      endAt:'',
            }
        },
        methods:{
          search(){
            console.log(this.value)

              if(this.value==1){
          
                this.$router.push({path:'klasses'});
                this.$store.state.check=true;
                this.stuId='';
                this.klasId=this.target;
                console.log(this.target)
              }else if(this.value==2){

                this.$router.push({path:'students'});
                this.$store.state.check=true;
                 this.stuId=this.target;
                this.klasId='';
              }

              









          },
         dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return Moment(date*1000).format("YYYY-MM-DD ");  
            } ,

                 getData(){
                   
                  var klassName = this.$store.state.cost
                        // this.tableData = localStorage.schools
                        // this.count = localStorage.schools.length;
                        console.log('+++++++    拿到的数据+++++++++',klassName);
                        console.log('+++++++    拿到的数据1111+++++++++',klassName.cost[0].id);
                        this.target=klassName.cost[0].id
                        let counst=klassName.cost;

                

                          if(this.value==1){
          
                            // this.$router.push({path:'klasses'});
                            // this.$store.state.check=true;
                            this.stuId='';
                            this.klasId=this.target;
                            console.log(this.target)
                          }else if(this.value==2){

                            // this.$router.push({path:'students'});
                            // this.$store.state.check=true;
                             this.stuId=this.target;
                            this.klasId='';
                          }



                let result = new Date(this.endAt).getTime();






                  console.log('endAt',result)
                console.log('==============')
             this.$http({
                    method: 'get',
                    url:this.$getApi+'charge/findPaid?startTime='+result+'&klassId='+this.klasId+'&studentId='+this.stuId,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('--------已缴费----------',res.body)
                    
                    const {
                        body
                    } = res
                      


                    console.log("===已缴费===",res);
                    if(body.length==0){
                      this.ISshow=false
                    }else{
                      this.ISshow=true
                    }





                    if (!!body.length) {
                        this.tableData = body
                        this.count = body.length
                         this.endAt = new Date().getTime();
                    } else {
                        // alert('err:' + body)
                         // this.endAt = new Date().getTime();
                    }

                    var constArray=[];
                    res.body.forEach(function(item, index, array){

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

                    if (!!body.length) {
                        this.tableData = constArray
                        this.count = constArray.length
                    } else {
                        // alert('err:' + body)
                    }

                  

                })


      },
         handleClose(index,row) {
          this.dialogVisible = true
        
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },

     
          


          

        },
         mounted(){
            console.log('---------mounted--------------');
            this.getData();
    
          },
       
    }
</script>
<style scoped>
    .tab{
      margin-top: 30px;
      padding-top: 58px;
      padding-right: 10px;
    }
     .block{
        float: right;
    }
    .search{
      width: 300px;
      display: inline-block;
    }
    .el-table .cell{
      padding-bottom: 5px !important;
      padding-top: 5px!important;
    }
</style>
<!-- {
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
  } -->