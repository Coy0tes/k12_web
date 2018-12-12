<template>
    <div>
      <div style="width:102.5%; height:50px; background-color:#fff;margin-top:-0px;margin-left:-30px; padding-right:25px;padding-left:30px; line-height:40px;">
           <div class="header">
                <span>指定条件</span>
                  <el-select v-model="value" placeholder="学生id">
                 <el-option
              v-for="item in option"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        <el-input v-model="input" placeholder="请输入内容" class="search"></el-input>
        <el-button type="primary"  @click="refer">查询</el-button>
        <el-button type="primary"  @click="monthrefer">当月查询</el-button>
        <!-- <el-button type="primary"  @click="monthrefer">当月查询</el-button> -->
        <el-button type="primary" class="newplan" @click="addplan" id="newplan">新增收费计划</el-button>
            </div>
         
       </div>
       <div>
          
        <div id="content">
             <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      
      prop="document"
      label="单据id"
      width="100">
    </el-table-column>
    <el-table-column
      prop="students"
      label="学生id"
      width="100">
    </el-table-column>
    <el-table-column
      prop="names"
      label="名称"
      width="100">
    </el-table-column>
    <el-table-column
      prop="class"
      label="班级"
      width="100">
    </el-table-column>
    <el-table-column
      prop="Feeof"
      label="费种"
      width="100">
    </el-table-column>
    <el-table-column
      prop="cycle"
      label="周期"
      width="100">
    </el-table-column>
    <el-table-column
      prop="cyclediscount"
      label="周期折扣"
      width="120">
    </el-table-column>
    <el-table-column
      prop="applicationtype"
      label="应用类型"
      width="100">
    </el-table-column>
    <el-table-column
      prop="volumediscount"
      label="总折扣"
      width="100">
    </el-table-column>
     <el-table-column
      prop="finalprice"
      label="最终价"
      width="80">
    </el-table-column>
     <el-table-column
      prop="chargingtime"
      label="收费时间"
      width="120">
    </el-table-column> 
    <el-table-column
      prop="endtime"
      label="截止时间"
      width="120">
    </el-table-column>

 <el-table-column
      fixed="right"
      label="操作"
      width="277">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
      </template>
    </el-table-column>
   
  </el-table>

<el-pagination
  small
  layout="prev, pager, next"
  :total="50"
  id="fenye">
</el-pagination>
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
    export default {
        data(){
            return {
              
                    tableData: [{
                    document:'0001',
                    students:'001',
                    names:'二狗',
                    class:'1',
                    Feeof:'保育费',
                    cycle:'半年',
                    cyclediscount:'30%',
                    applicationtype:'员工',
                    volumediscount:'50%',
                    finalprice:'6000',
                    chargingtime:'2017-1-15',
                    endtime:'2017-5-03'  
        }],

                      cycleId: 0,
                      endAt: 0,
                      expenseId: 0,
                      identityId: 0,
                      money: 0,
                      target: "",
                      targetType: 0
                           
            }
        },
        methods:{
            getData(){


              this.$http({
                    method: 'get',
                    url:'https://k12.vwico.com/charge/findAllStuPlan?startTime=0',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('--------收费计划----------',res)
                    
                    const {
                        body
                    } = res
                      


                    console.log("===res students===",res.body);



                  

                })


        },
          refer(){

              this.$http({
                    method: 'get',
                    url:'https://k12.vwico.com/charge/findStuPlan?studentId=1',

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



                  

                })
          },

          monthrefer(){
              this.$http({
                    method: 'get',
                    url:'https://k12.vwico.com/charge/findPlan',

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
        margin-top: 20px;
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
    
</style>