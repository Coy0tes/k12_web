<template>
    <div>
       <div style="margin-left:-20px;">
    <div style="width:101.9%; height:50px; background-color:#fff;margin-top:-0px;margin-bottom:10px;margin-left:-30px; padding-right:25px; line-height:40px; z-index:200;padding-top:3px;margin-top:30px">
  <el-select v-model="value12" placeholder="请选择班级" filterable style="margin-left:60px;">
    <el-option
      v-for="item in klassArry"
      :key="item.value"
      :label="item.value"
      :value="item.label"
      style="width：162px!important;">
    </el-option>
      
  </el-select> 

  <el-select v-model="value13" placeholder="请选择费种" filterable style="margin-left:0px;">
    <el-option
      v-for="item in expenseArry"
      :key="item.value"
      :label="item.value"
      :value="item.label"
      style="width：162px!important;">
    </el-option>
      
  </el-select>
  <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
   <el-button type="primary" @click='refer'>查询</el-button>
   <!-- <el-button type="primary" @click='getData'>全部</el-button> -->
  </div><!-- 
            <div class="header">
             
            </div> -->
        <div id="content">
             <el-table
             style="width:100%; margin-right:10px;"
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    border
    >
    <el-table-column
      
      prop="id"
      label="id"
      align="center"
      width="70">
    </el-table-column>
    <el-table-column
      
      prop="planId"
      label="费用id"
      align="center"
      width="100">
    </el-table-column>
    <el-table-column
      prop="studentId"
      label="学生id"
      align="center"
      width="100">
    </el-table-column>
    <el-table-column
      prop="studentName"
      align="center"
      label="名称"
      width="100">
    </el-table-column>
    <el-table-column
      prop="klassId"
      align="center"
      label="班级"
      width="80">
    </el-table-column>
    <el-table-column
      prop="name"
      label="费种"
      align="center"
      width="100">
    </el-table-column>
    <el-table-column
      prop="periodType"
      label="周期"
      align="center"

      :formatter="formatStyle"
      width="70">
    </el-table-column>
    <el-table-column
      prop="pDiscountRate"
      align="center"
      label="周期折扣"
      width="100">
    </el-table-column>
    <el-table-column
      prop="identType"
      align="center"
      label="应用类型"
      :formatter="formatStyl"
      width="120">
    </el-table-column>
    <el-table-column
      prop="totleDis"
      align="center"
      label="应用类型折扣"
      width="130">
    </el-table-column>
     <el-table-column
      prop="amount"
      label="应收"
      align="center"
      width="80">
    </el-table-column>
    <el-table-column
      prop="money"
      label="实收"
      align="center"
      width="80">
    </el-table-column>
     <el-table-column
      prop="createAt"
      align="center"
      label="收费时间"
 :formatter= "dateFormat"
      width="150">
    </el-table-column> 
    <el-table-column
      prop="endAt"
      align="center"
      label="截止时间"
      :formatter= "dateFormat"
      width="150">
    </el-table-column>
     <el-table-column
      prop="paymentAt"
      align="center"
      label="收款时间"
      :formatter= "dateFormat"
      width="150">
    </el-table-column>


<!-- <el-table-column
      type="selection"
      width="55">
    </el-table-column> -->

 <el-table-column
      fixed="right"
      align="center"
      label="操作"
      width="200">
      <template slot-scope="scope">



                <el-checkbox 
      
                id="cbox"
                @change="receipt(scope.$index, scope.row)">
                 已收款</el-checkbox>
        <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        <el-button type="primary" @click="handleQuery(scope.row)"  size="mini">确认</el-button>
        
        

      </template>
    </el-table-column>
   
  </el-table>

<el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pagesize"
              background="false"
              layout="total, prev, pager, next"
              :total="tableData.length"
              style="float:right; margin-top:20px;">
            </el-pagination>

<!-- <div>
  <h2 style="margin-top:20px;">伙食费</h2>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="班级"
      align="center"
     >
    </el-table-column>
    <el-table-column
      prop="name"
      label="序号"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      align="center"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="address"
      align="center"
      label="收费标准">
    </el-table-column>
    <el-table-column
      prop="address"
      align="center"
      label="本期退费">
    </el-table-column>
    <el-table-column
      prop="address"
      align="center"
      label="本期实收">
    </el-table-column>
  </el-table>
</div> -->
<el-dialog
  

  :visible.sync="dialogVisible"
  width="590px"
  :before-close="handleClose">
     

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">已收款</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->

<div style="margin-left:30%;">
    <div class="payMoney">
      <span>预交款余额</span> <el-input style="width:200px;" v-model="beforeGet"></el-input>
    </div>
         
        <div class="payMoney">
          <span>应 收 金 额 </span> <el-input style="width:200px;" v-model='beforeResidue'></el-input>
        </div>
         
        <div class="payMoney">
           <template>
                  <span>是否优先使用预交款</span>
               <!--  <el-radio v-model="radio" label="1">是</el-radio>
                <el-radio v-model="radio" label="2">否</el-radio> -->

                 <el-radio-group v-model="radio" @change="radios">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                  <!-- <el-radio :label="9">备选项</el-radio> -->
                </el-radio-group>
              </template>
        </div>
               

        <div class="payMoney">
          <span style="margin-left:2px;">实 缴 金 额 </span> <el-input style="width:200px;" v-model='balance'></el-input>
        </div>
         
  

</div>









  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="changeFun1">确 定</el-button>
  </span>
</el-dialog>
<!-- 弹出框 -->
        <div class="tag_content" v-if="true" id="affirm">
        <p>确认收款</p>
        <div class="margin">
            收费对象 <span> <el-input v-model="input" placeholder="姓名" class="input_tag"></el-input> </span>
        </div>
        <div class="margin">
            费&nbsp;&nbsp;种 <el-select v-model="value" placeholder="请选择" type="input">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
        </div>
                <span>周&nbsp;&nbsp;期 <li> 000000000000</li></span>
        <div class="margin">   

        <div class="margin">
            应用类型{{业主}}
        </div>
        

        <div class="margin">
            
            最终折扣 <el-input v-model="input" placeholder="30%" class="input_tag"></el-input>
        </div>

        <div class="margin">
            最终金额 <el-input v-model="input" placeholder="3600" class="input_tag"></el-input>
        </div>
        
        <div class="margin">
            截止时间 <div class="block">
                        
                        <el-date-picker
                          v-model="value"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>
                      </div>
        </div>


        <div class="margin">
          
         <el-button type="primary" class="getmoney" id="refalse" @click="reg(1)">确认收款</el-button>



        </div>



        </div>






    </div>


</div>



</div>

    </div>
</template>
<script>
 
import Moment from 'moment';
    export default {
        data(){
            return {  plan:0,
                      shijiao:0,
                      balance:'',
                      beforeResidue:0,
                      beforeGet:0,
                       radio: 0,

                      tableData:[],
                      currentPage:1,
                      pagesize:10,
                      cycleId: 0,
                      endAt: 0,
                      expenseId: 0,
                      identityId: 0,
                      money: 0,
                      target: "",
                      targetType: 0,
                      dialogVisible: false,
                      count:'',
                      check:false,
                      value11:'',
                      stuArry:[],
                      rowId:0,
                      klassArry:[],
                      value12:'',
                      value1:'',
                      expenseArry:[],
                      value13:'',
                         
            }
        },
        methods:{
          radios(value){
            var yujiaoMoney=this.beforeGet
            console.log("yujiaoMoney",yujiaoMoney)
              if(value==1){
                
                console.log('log 11111',value);
              // this.beforeGet=this.beforeGet-this.beforeResidue
              var num111=(this.beforeGet)-(this.beforeResidue);
             
              if(num111>0){
                  // this.shijiao=num111;
                 this.beforeGet=num111;
                 this.balance=0;
                  console.log('num111 大于0 剩余',num111)
              }else if(num111<=0){
                  this.balance=Math.abs(num111);;
                  this.beforeGet=0;

              };
              // this.balance=Math.abs(num111);
              console.log('222222222',this.balance);




                  










              }else if(value==2){
                
                this.balance=this.beforeResidue




              }


          },



           dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return Moment(date*1000).format("YYYY-MM-DD ");  
            } ,


           formatStyle: function (row, column) {
            // console.log('-------formatDate------------',row.periodDiscounts)
        return row.periodType == "YEAR" ? '年':row.periodType == "QUARTER" ? '季':row.periodType == "HALF_YEAR" ? '半年':row.periodType == "MONTH" ? '月':"未知";  

    },
             formatStyl: function (row, column) {
                    // console.log('-------formatDate------------',row.periodDiscounts)
                return row.identType == "PROPRIETOR" ? '业主':row.identType == "MEMBER" ? '员工':row.identType == "USER" ? '普通':"未知";  

            },
            //  formatStyl: function (row, column) {
            //         // console.log('-------formatDate------------',row.periodDiscounts)
            //     return row.identType == "PROPRIETOR" ? '业主':row.identType == "MEMBER" ? '员工':row.identType == "USER" ? '普通':"未知";  

            // },

              changeFun1(){
                  this.changeFun();
                   this.$http({
                    method: 'put',
                    url:this.$getApi+'charge/updatePrePay?studentId='+ this.rowId+'&money='+this.beforeGet,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                    this.$message({
                      message: '成功',
                      type: 'success'
                    }); 

                  // this.getData();
                    
                    const {
                        body
                    } = res
                      


                    console.log("===res students===",res.body);



                  

                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    }); 
                });
                location.reload();

              },
            getData(){


                this.$http({
                    method: 'get',
                    url:this.$getApi+'expense/entry',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======expense=====',res);
                  console.log('--------expense----------',res)
                    
                    const {
                        body
                    } = res
                      


                    console.log("===res students===",res.body);
                      var expenseArry=[];
                    res.body.forEach(function(item,index,array){
                      expenseArry.push({
                        value:item.name,
                        label:item.id,
                      })
                    });
                    console.log('11111111',expenseArry)
                 this.expenseArry=expenseArry
                      


                  

                })








              console.log(this.value12)
                     this.$http({
                    method: 'get',
                    url:this.$getApi+'management/klasses',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('--------单个学生的收费信息----------',res)
                    
                    const {
                        body
                    } = res
                      


                    console.log("===res students===",res.body);
                      var klassArry=[];
                    res.body.forEach(function(item,index,array){
                      klassArry.push({
                        value:item.name,
                        label:item.id,
                      })
                    });
                    console.log('11111111',klassArry)
                    this.klassArry=klassArry
                      


                  

                })









               var myDate = Date.parse(new Date());
                console.log('aaaaa',myDate)
              this.$http({
                    method: 'get',
                    url:this.$getApi+'charge/findAllStuPlan?startTime='+ myDate,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('--------收费计划----------',res)
                    
                    const {
                        body
                    } = res
                      
  console.log('------------------',JSON.parse(res.bodyText));

                    console.log("===res students===",res);
if (!!body.length) {
                        this.tableData = body
                        this.count = body.length
                    } else {
                        // alert('err:' + body)
                    }

                    // 过滤数据
                   








                    var stuSth=[];
                    res.body.forEach(function(item,index,array){
                      stuSth.push({
                        value11:item.studentName,
                        label11:item.studentId,
                      })
                    });
                    this.stuArry=stuSth;




                    var constArray=[];
                    res.body.forEach(function(item, index, array){




                        constArray.push({
                           id:item.id,
                          
                           planId:item.planId,

                           studentId:item.studentId,

                           studentName:item.studentName,

                           klassId:item.klassId,

                           name:item.expenseEntry.name,

                           periodType:item.periodDiscount.periodType,

                           pDiscountRate:item.periodDiscount.discountRate+"%",

                           identType:item.identDiscount.identType,

                           totleDis:item.identDiscount.discountRate+"%",

                           money:item.money,

                           createAt:item.createAt,

                           endAt:item.endAt,

                           paymentAt:item.paymentAt,

                           amount:item.expenseEntry.amount,

                           // checker:item.checker.user.username,
                           
                           
                         })
                        
                     
                         if(!!item.paymentAt){
                          console.log('----------------------0000',item)
                          // item.check=true
                         // $('#cbox').checked=true
                          // this.item
                  

                         }
                        
                    })

                    
                       

                    if (!!body.length) {
                        this.tableData = constArray
                        this.count = constArray.length

                    } else {
                        // alert('err:' + body)
                    }
                  

                })


        },
        receipt(index,row){
          // this.multipleSelection = val;
          this.rowId=row.studentId
           console.log('1111111111',row);
           this.beforeResidue=row.money
         this.dialogVisible=true;
          this.plan=row.id


          
                this.$http({

                    method: 'put',
                    url:this.$getApi+'/charge/payed?id='+this.plan,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                
                    const {
                        body
                    } = res
                      
                  
                    console.log("===大额预交款===",res.body.money);
                    // this.beforeGet=res.body.money


                  

                });
                  this.$http({

                    method: 'get',
                    url:this.$getApi+'charge/findAccount?studentId='+this.rowId,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                
                    const {
                        body
                    } = res
                        this.$message({
                      message: '成功',
                      type: 'success'
                    });
                  
                    console.log("===大额预交款===",res.body.money);
                    this.beforeGet=res.body.money


                  

                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });








         
        },
          refer(){
                var myDate = Date.parse(this.value1);
              this.$http({
                    method: 'get',
                    url:this.$getApi+'charge/findStuPlanByKlass?startTime='+ myDate +'&klassId='+this.value12+'&expenseId='+this.value13,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('--------单个学生的收费信息----------',res)
                    
                    const {
                        body
                    } = res
                      


                    console.log("===res students===",res.body);
                      var constArray=[];
                    res.body.forEach(function(item, index, array){




                        constArray.push({
                           id:item.id,
                          
                           planId:item.planId,

                           studentId:item.studentId,

                           studentName:item.studentName,

                           klassId:item.klassId,

                           name:item.expenseEntry.name,

                           periodType:item.periodDiscount.periodType,

                           pDiscountRate:item.periodDiscount.discountRate+"%",

                           identType:item.identDiscount.identType,

                           totleDis:item.identDiscount.discountRate+"%",

                           money:item.money,

                           createAt:item.createAt,

                           endAt:item.endAt,

                           paymentAt:item.paymentAt,

                           // checker:item.checker.user.username,
                           
                           
                         })
                        
                     
                         if(!!item.paymentAt){
                          console.log('----------------------0000',item)
                          // item.check=true
                         // $('#cbox').checked=true
                          // this.item
                  

                         }
                        
                    })

                    
                       

                    if (!!body.length) {
                        this.tableData = constArray
                        this.count = constArray.length

                    } else {
                        // alert('err:' + body)
                    }


                  

                })
          },
          handleSizeChange: function (size) {
        this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },

          monthrefer(){
              this.$http({
                    method: 'get',
                    url:this.getApi+'/charge/findPlan',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('--------当月收费计划----------',res)
                    
                    const {
                        body
                    } = res
                      


                    console.log("===res students===",res.body);



                  

                })
          },

         addplan(){
            $('#affirm').css("display","block")
        },
         verify(){
            $('#affirm').css("display","none")
        },



        // 删除
        handleDelete(row){
                console.log(row.planId);
                   this.$http({
                    method: 'delete',
                    url:this.$getApi+'charge/delete/'+row.planId,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('---------未缴费---------',res)
                        this.$message({
                      message: '删除成功',
                      type: 'success'
                    }); 
                    const {
                        body
                    } = res
                      


                    console.log("===res students===",res.body);


                    if (!!body.length) {
                        this.tableData = body.content
                        this.count = body.length
                    } else {
                        // alert('err:' + body)
                    }

                  

                }).catch((res) =>{
                    this.$message({
                      message: '删除失败',
                      type: 'error'
                    }); 
                });





        },
        changeFun(){

         
             this.$http({
                    method: 'put',
                    url:this.$getApi+'charge/payed?id='+this.rwoId,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('---------未缴费---------',res)
                       this.$message({
                      message: '成功',
                      type: 'success'
                    });
                    const {
                        body
                    } = res
                      


                    console.log("===res students===",res.body);


                    if (!!body.length) {
                        this.tableData = body.content
                        this.count = body.length
                    } else {
                        // alert('err:' + body)
                    }

                  

                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    }); 
                });

            this.dialogVisible = false
              

        },
        handleQuery(row){

                 this.$http({
                    method: 'put',
                    url:this.$getApi+'charge/check?id='+row.id,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('---------未缴费---------',res);
                   this.$message({
                      message: '成功',
                      type: 'success'
                    });
                  // this.getData();
                    
                    const {
                        body
                    } = res
                      


                    console.log("===res students===",res.body);


                    if (!!body.length) {
                        this.tableData = body.content
                        this.count = body.length
                    } else {
                        // alert('err:' + body)
                    }

                  

                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    }); 
                });



        }

          







        },
      




      


         mounted(){
            console.log('---------mounted--------------');
            this.getData();
            
          }


       
    }
</script>
<style scoped>
    .search{
        width: 100px;
    }
     .newplan{
        float: right;
        margin-right: 30px;

    }
     #content{
        width: 100%;
        /*height: 100px;*/
       /* background-color: red;*/
        margin-top: 10px;
        margin-right: 10px;
        padding-left: 30px;
        padding-right: 10px;
        padding-top: 1px;
    }
    #fenye{
      float: right;
    }
    .tantag{
      width: 600px;
      height: 500px;
      background-color: #fff;
      position: relative;
      left: 30%;
      top: -50px;
      z-index: 200;
      padding-top: 20px;
      border: 2px solid #000;
    }
    .tantag h4{
      text-align: center;
      font-weight: 700;
      /*margin-top: 25px;*/
    }
    .sfobj{
      width: 100% ;
      height: 20px;
      /*background-color: green;*/
      margin-top: 10px;
      margin-left: 25px;
    }
    #inpt_sele{
      width: 80px;
      height: 25px;
    }
    .zqli{
      display: inline-block;
      list-style: none;
    }
    .zqul{
      display: inline-block;
      list-style: none;
    }
    #zzinp{
      display: inline-block;
      height: 20px !important;
      width: 200px;
    }
    .el-input__inner{
      height: 20px !important;
    }
    ..el-input{
      height: 20px;
    }
    .block{
      margin-top: 10px;
      margin-right:130px;
    }
    ..el-button--primary{
      margin-left: 145px;
      margin-top: 15px;
    }




    li{
        list-style: none;
        display: inline-block;
    }
    .block{
        display: inline-block;
    }
    .input_tag{
        width: 250px;
    }
    .margin{
        margin-top: 20px;
        margin-bottom: 15px;
    }
    .getmoney{
        margin-left: 30%;
        /*display: none;*/
    }
    .tag_content{
        width: 550px;
        height: 450px;
        padding-left: 100px;
        border: 1px solid #ccc;
        margin-left: 200px;
        position: relative;
        top: -30px;
        left: 200px;
        background-color: #fff;
        z-index: 100;
        padding-top: 25px;
        display: none;
    }
    .tag_content p{
        font-weight: 700;
        font-size: 20px;
        text-align: center;
        margin-left: -100px;
    }
    .el-checkbox__inner{
      width: 15px;
      height: 15px;
    }
    .payMoney{
      margin-top: 20px;
    }
    .el-select-dropdown >.el-popper{
      margin-left: 350px !important;
      width:220px !important;
    }
     .el-popper{
      margin-left: 350px !important;
      width:220px !important;
      left: 0px !important;
    }
    
    
</style>
  

<!-- // [
//   {
//     "checkAt": 0,   //标识
//     "createAt": 0,  //收费时间
//     "endAt": 0,     //截至时间
//     "expenseEntry": {   //消费
//       "amount": 0,      //总额
//       "delayCharge": true,
//       "id": 0,  
//       "identDiscounts": [   //类型折扣
//         {
//           "discountRate": 0,  //折扣数
//           "id": 0,
//           "identType": "USER",  //应用类型
//           "schoolId": 0
//         }
//       ],
//       "name": "string",     //费用名称
//       "periodDiscounts": [  //周期折扣
//         {
//           "discountRate": 0,  //
//           "id": 0,
//           "periodType": "YEAR",   //周期
//           "schoolId": 0
//         }
//       ],
//       "periodType": "YEAR",   //金额周期
//       "schoolId": 0           //学校iD
//     },
//     "id": 0,
//     "identDiscount": {
//       "discountRate": 0,  //总折扣
//       "id": 0,
//       "identType": "USER",
//       "schoolId": 0
//     },
//     "klassId": 0,   //班级id
//     "klassType": "COMMON",
//     "money": 0,   //最终金额
//     "paymentAt": 0,   //付款时间
//     "periodDate": 0,  
//     "periodDeduct": true,
//     "periodDiscount": {
//       "discountRate": 0,
//       "id": 0,
//       "periodType": "YEAR",
//       "schoolId": 0
//     },
//     "planId": 0,    //单据id
//     "remainMoney": 0,   //剩余金额
//     "studentId": 0,     //学生id
//     "studentName": "string"  //学生名字
//   }
// ]
 -->

