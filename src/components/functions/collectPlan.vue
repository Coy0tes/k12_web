<template>
    <div style="margin-top:-16px;">
       <div>
            <div class="header" >
                <!-- <span>指定条件</span> -->
                  <el-select v-model="value" placeholder="请选择查询条件">
                 <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        <!-- <el-input v-model="input" placeholder="请输入查询条件" class="search"></el-input> -->
        <!-- <el-button type="primary"  @click="refer">查询</el-button> -->
        <!-- <el-button type="primary"  @click="monthrefer">当月查询</el-button> -->
        <!-- <el-button type="primary"  @click="monthrefer">当月查询</el-button> -->
        
        <el-button type="primary" @click="newVisible1=true">收费计划导入</el-button>
        <el-button type="primary" class="newplan" @click="newVisible=true" id="newplan" style="margin-bottom:10px;">新增收费计划</el-button>
            </div>
       <div id="content">
             <el-table
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    border
    style="width:99%;margin-top:-15px;margin-left:10px;">
    <el-table-column
      
      prop=""
      label=""
      align="center"
      width="1">
    </el-table-column>
    <el-table-column
      
      prop="id"
      label="id"
      align="center"
      width="70">
    </el-table-column>

<el-table-column
    <el-table-column
      prop="planid"
      align="center"
      label="费种id"
      width="100">
    </el-table-column>



    <el-table-column
     
   
    <el-table-column
      prop="name"
      align="center"
      label="名称"
      width="100">
    </el-table-column>
 
  <!--  -->
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
      label="周期折扣(%)"
      width='130'
     >
    </el-table-column>
    <el-table-column
      prop="identType"
      align="center"
      label="应用类型"
      width='130'
      :formatter="formatStyl"
    >
    </el-table-column>
    <el-table-column
      prop="totleDis"
      align="center"
      label="应用类型折扣(%)"
      width="150"
     >
    </el-table-column>
     <el-table-column
      prop="money"
      label="本期实收"
      align="center"
     >
    </el-table-column>
     <el-table-column
      prop="createAt"
      align="center"
      label="收费时间"
      width='130'
 :formatter= "dateFormat"
    >
    </el-table-column> 
    <el-table-column
      prop="endAt"
      align="center"
      label="截止时间"
      width='130'
      :formatter= "dateFormat"
     >
    </el-table-column>
     

 <el-table-column
      
      align="center"
      label="操作"
      width="200"
    >
      <template slot-scope="scope">



       <el-button @click="handleClick(scope.$index, scope.row)" type="primary" size="small">编辑</el-button>
        <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
    


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
              style="float:right; margin-top:20px;margin-right:10px;">
            </el-pagination>



<!-- 新增收费计划 -->
<el-dialog
  
  :visible.sync="newVisible"
  width="520px"

  :before-close="handleClose">

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">新增收费计划</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="newVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
 <Newchargesplan></Newchargesplan>
  <span slot="footer" class="dialog-footer">
  <!--   <el-button @click="newVisible = false">取 消</el-button>
    <el-button type="primary" @click="newVisible = false">确 定</el-button> -->
  </span>
</el-dialog>

<el-dialog
  
  :visible.sync="newVisible1"
  width="520px"

  :before-close="handleClose">

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">批量导入收费计划</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="newVisible1 = false">
             </div>
          </div>
          <!-- Newtitle  end-->
          <div style="padding-bottom:30px;width: 250px;margin: 0 auto;">

          <div @click='stu' style="display:inline-block"><vue-xlsx-table  @on-select-file="handleSelectedFile">学生导入</vue-xlsx-table></div>
          <div @click='klass' style="display:inline-block"><vue-xlsx-table  @on-select-file="handleSelectedFile">班级导入</vue-xlsx-table></div>
          <div @click='iklass' style="display:inline-block"><vue-xlsx-table  @on-select-file="handleSelectedFile">兴趣班导入</vue-xlsx-table></div>
              
               
          </div>
 
  <span slot="footer" class="dialog-footer">
  <!--   <el-button @click="newVisible = false">取 消</el-button>
    <el-button type="primary" @click="newVisible = false">确 定</el-button> -->
  </span>
</el-dialog>
<!-- 弹出框 -->


<el-dialog

  :visible.sync="dialogVisible"
  width="520px"
  :before-close="handleClose">

 

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">编辑</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
 <el-form ref="form" :model="form" label-width="80px" class='el_content
       '>
    

     <el-form-item label="费 种:">
        <el-input  class="costKind_input1" v-model="form.name"></el-input>
     
      </el-form-item>


 


    <el-form-item label="周 期:">
        <el-select v-model="valu"  placeholder="业主" class="costKind_input" >
        <el-option
          v-for="item in option"
          :key="item.valu"
          :label="item.label"
          :value="item.valu">
        </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="应用类型:">
        <el-select v-model="valued"   placeholder="业主" class="costKind_input" >
        <el-option
          v-for="item in optionss"
          :key="item.label"
          :label="item.label"
          :value="item.valued"
          >
        </el-option>
        </el-select>
      </el-form-item>

   

      <el-form-item label="最终金额:">
              <el-input  class="costKind_input1" v-model="form.money"></el-input>
      </el-form-item>


      
      <el-form-item label="应用对象:">
        <el-select v-model="val"  placeholder="普通班" class="costKind_input"@change="changeId" >
        <el-option
          v-for="item in opt"
          :key="item.val"
          
          :label="item.labeld"
          :value="item.val">
        </el-option>
        </el-select>
      </el-form-item>


       <el-form-item label="截止时间:">
        <el-date-picker
      v-model="endAt"
      type="date"
      placeholder="选择日期"
      style="width:290px;"
     >
    </el-date-picker>
      </el-form-item>

    



</el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handlePut">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
title="提示"
  :visible.sync="messageDialog"
  width="30%"
  :before-close="handleClose">
 

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">删除</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="messageDialog = false">
             </div>
          </div>
          <!-- Newtitle  end-->
  <span>是否确定删除此计划？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="messageDialog = false">取 消</el-button>
    <el-button type="primary" @click="Delete">确 定</el-button>
  </span>
</el-dialog>
</div>



</div>

    </div>
</template>
<script>
import NewcharCy from '../functions/NewcharCy.vue';
import Moment from 'moment';
import Newchargesplan from '../functions/Newchargesplan.vue';
    export default {
        data(){
            return {currentPage:1,
                 pagesize:10,
                  showSize: 10,
                current_page: 0,
                count: 100,
                      tableData:[],
                      newVisible:false,
                      newVisible1:false,
                      // cycleId: 0,
                      endAt: '',
                      expenseId: 0,
                      identityId: 0,
                      money: 0,
                      target: "",
                      targetType: 0,
                      targetType1: '',
                      dialogVisible: false,
                      messageDialog:false,
                      options: [{
                      value: '选项1',
                      label: '指定班级'
                    }, {
                      value: '选项2',
                      label: '指定儿童'
                    }, {
                      value: '选项3',
                      label: '指定id'
                    }],
                      value:'',

                      form:{
                        name:'',
                        money:'',
                      },

                       option: [{
                        valu: 'YEAR',
                        label: '年'
                      }, {
                        valu: 'HALF_YEAR',
                        label: '半年'
                      }, {
                         
                        valu: 'QUARTER',
                        label: '季'
                      }, {
                         
                        valu: 'MONTH',
                        label: '月'
                      }, {
                         
                        valu: 'DAY',
                        label: '日'
                      }, {
                         
                        valu: 'ONCE',
                        label: '一次性'
                      }],
                      valu: '', 



                       optionss: [{
                        
                        valued: 'PROPRIETOR',
                        label: '业主'
                      }, {
                        
                        valued: 'MEMBER',
                        label: '员工'
                      }, {
                      
                        valued: 'USER',
                        label: '普通'
                      }],
                      valued: '',

                       opt: [{
                        val:"0",      //数字 0 页面显示空
                        id:'COMMON_KLASS',
                        labeld: '普通班'
                      }, {
                        val:1,
                        id:'INTEREST_KLASS',
                        labeld: '兴趣班'
                      }, {
                        val:3,
                        id:'STUDENT',
                        labeld: '指定儿童'
                      }],
                      val: '',
                      cycleId:0,
                      target:0,



                          
            }
        },
         components:{
          'NewcharCy':NewcharCy,
          'Newchargesplan':Newchargesplan



         },
        methods:{
            inSchoolDate(dateStr){
            var strtime = dateStr;
                var date = new Date(strtime); 
                //传入一个时间格式，如果不传入就是获取现在的时间了，这样做不兼容火狐。
                // 可以这样做
                var date = new Date(strtime.replace(/-/g, '/'));
                 
                
               var time1 = date.getTime();
               
                console.log(time1)
                return time1
          },
              stu(){  
                console.log('student1111111111111111111111')
                this.targetType1='3'
                console.log(this.targetType1)
                        
                  
              },
              klass(){
                console.log('klass1111111111111')
                this.targetType1='0'
              },
              iklass(){
                console.log('iklass111111111111111')
                this.targetType1='1'
              },


                  handleSelectedFile (convertedData) {
                    // console.log(val)
      console.log(convertedData)
           var a=convertedData.body
              console.log(a)

          console.log('1111111111',this.targetType1)
                var typeArray=[]
                var d=this.targetType1
                a.forEach(function(item, index, array){
                               typeArray.push({
                                cycleId:item.折扣,
                                endAt:item.收费截至日期,
                                expenseName: item.费用名称,
                                identityId: item.身份折扣,
                                money: item.金额,
                                target: item.收费对象,
                                targetType:d,
                                cycleType: item.费用周期,
                               identityType: item.身份类型,
                                // targetType:this.targetType1
                                  
                          })
                             })

                console.log('typeArray',typeArray)

                    for (var c = 0; c < typeArray.length; c++) {
                  var a=typeArray[c].endAt
          
                  typeArray[c].endAt=this.inSchoolDate(a)
                  if (true) {}
           
                  
                }
                 console.log('typeArray1111111',typeArray)
                  this.$http.post(
         
           this.$getApi + 'charge/createMany',
 
          typeArray,
                                               
          {
          headers:{
                      
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }

                    }
        ).then((res) => { // promise对象
            this.$message({
                      message: '添加成功',
                      type: 'success'
                    });
          console.log("===regist==== res=====",res);
          if(res.ok){
           console.log('------------',res)

          }else{
            this.$router.push({path:'newschool'});
            console.log('---------',err)
          }
          
    
        }).catch((res) =>{
                    this.$message({
                      message: '添加失败',
                      type: 'error'
                    }); 
                });
    },
            chanalue(){
                console.log("val",this.val)
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
            getData(){
                    var timestamp3 = new Date().getTime();

              this.$http({
                    method: 'get',
                    url:this.$getApi+'charge/findPlan?startTime='+timestamp3+'&page='+ (this.currentPage-1)+'&size=10',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('--------收费计划----------',res.body.content)
                    
                    const {
                        body
                    } = res
                      
  console.log('------------------',JSON.parse(res.bodyText));

                    // console.log("===res students===",res.body.content);
if (!!res.body.content) {
                        this.tableData = body.content 
                        this.count = body.content.length

                        // console.log('+++++++++++++++++++++++++',this.tableData)
                    } else {
                        alert('err:' + body)
                    }
                   
                    var constArray=[];
                    res.body.content.forEach(function(item, index, array){




                        constArray.push({
                           id:item.id,
                          
                          planid:item.expenseEntry.id,

                           name:item.expenseEntry.name,

                           periodType:item.periodDiscount.periodType,

                           pDiscountRate:item.periodDiscount.discountRate+'%',

                           identType:item.identDiscount.identType,

                           totleDis:item.identDiscount.discountRate+"%",

                           money:item.money,

                           createAt:item.createAt,

                           endAt:item.endAt,

                          cycleId:item.periodDiscount.id,
                          identId:item.identDiscount.id,

                           // paymentAt:item.paymentAt,

                           
                           
                         })
                        
                    })

                    console.log("------constArray------",constArray);
                    // console.log("------tableData------",tableData);

                    if (body.content.length) {
                        this.tableData = constArray
                        this.count = constArray.length
                        // console.log('-=-=-=-=-=-=-=-=-')
                    } else {
                        // alert('err:' + body)
                    }
                  

                })



                        var klassName = this.$store.state.cost
                        // this.tableData = localStorage.schools
                        // this.count = localStorage.schools.length;
                        console.log('+++++++    拿到的数据+++++++++',klassName);
                        console.log('+++++++    拿到的数据1111+++++++++',klassName.cost[0].id);
                        this.target=klassName.cost[0].id
                        let counst=klassName.cost;


        },
        handleSizeChange: function (size) {
        this.pagesize = size;

    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },
          refer(){

              this.$http({
                    method: 'get',
                    url:this.$getApi+'charge/findStuPlan?studentId=1',

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
            $('#affirm').css("display","block");
           

        },
         changeId(){
          console.log('执行了');
          console.log('执行了',this.expenseId);
         // this.$store.commit("jia")
          if(this.val==0){
            this.$router.push({path:'klasses'});
            this.$store.state.check=true;
            console.log('-------',this.$store.state.check)
          }else if (this.val==1) {
           this.$store.state.check=true;
          this.$router.push({path:'interestClass'});
                      console.log('-------',this.$store.state.check)


          }else if(this.val==3){
             this.$router.push({path:'students'});
             this.$store.state.check=true;
             console.log('-------',this.$store.state.check)

          }

        },
         verify(){
            $('#affirm').css("display","none")
            $('#affirm_1').css("display","none");


              this.$http({
                    method: 'put',
                    url:this.$getApi+'charge/update/1',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('--------单个学生的收费信息----------',res)
                    
                    const {
                        body
                    } = res
                      
                      this.$message({
                      message: '成功',
                      type: 'success'
                    });

                    console.log("===res students===",res.body);



                  

                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });










        },
        handleClick(index,row){
          this.dialogVisible = true
                console.log(row);
                    this.dialogVisible = true
                // console.log(row.name)
                

                this.kgId = row.id;
                this.kgName = row.name;
                this.kgmoney= row.money
                this.form = Object.assign({}, row)
                this.cycleId=row.cycleId
                this.expenseId=row.planid
                this.identityId=row.identId

                console.log("cycleId",this.cycleId)

        },
         handlePut(){
            this.endAt=new Date().getTime()
            console.log('*******',this.cycleId)
          
                  this.$http.put(
         
           this.$getApi + 'charge/update/'+this.kgId,
 
          {
              "cycleId":this.cycleId,
              "endAt":this.endAt,
              "expenseId": this.expenseId,
              "identityId": this.identityId,
              "money":this.form.money,
              "target": this.target,
              "targetType": this.val
            
          },
                                            
      
          {
          headers:{
                      
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }

                    }
        ).then((res) => { // promise对象
            this.$message({
                      message: '修改成功',
                      type: 'success'
                    });
          console.log("===regist==== res=====",res);
          if(res.ok){
           console.log('------------',res)
          }else{
            // this.$router.push({path:'newschool'});
            console.log('---------',err)
          }
          
    
        }).catch((res) =>{
                    this.$message({
                      message: '修改失败',
                      type: 'error'
                    }); 
                });
        
        this.dialogVisible = false
        this.newVisible=false;
        this.getData();
          },

        Delete(){
           var jhDelId = this.$store.state.jhId
           var jhDid=jhDelId.jhid
              console.log(jhDid);

                       this.$http({
                    method: 'delete',
                    url:this.$getApi+'charge/delete/'+jhDid,


                    

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('---------删除---------',res)
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


              this.messageDialog=false
        },



        // 删除
        handleDelete(row){
                this.messageDialog=true
                console.log(row.id);
                var jhRowId=row.id
                this.$store.commit('sfjhRowId',{jhid:jhRowId}); 

            





        },
        // changeFun(row){

         
        //      this.$http({
        //             method: 'put',
        //             url:this.$getApi+'charge/payed?id='+row.id,

        //             headers: {
        //                 'Authorization': 'Bearer ' + localStorage.token

        //             }
        //         }).then((res) => { // promise对象
        //             console.log('======res=====',res);
        //           console.log('---------未缴费---------',res)
                    
        //             const {
        //                 body
        //             } = res
                      


        //             console.log("===res students===",res.body);


        //             if (!!body.length) {
        //                 this.tableData = body.content
        //                 this.count = body.length
        //             } else {
        //                 // alert('err:' + body)
        //             }

                  

        //         })





        // },
        // handleQuery(row){

        //          this.$http({
        //             method: 'put',
        //             url:this.$getApi+'charge/check?id='+row.id,

        //             headers: {
        //                 'Authorization': 'Bearer ' + localStorage.token

        //             }
        //         }).then((res) => { // promise对象
        //             console.log('======res=====',res);
        //           console.log('---------未缴费---------',res)
                    
        //             const {
        //                 body
        //             } = res
                      


        //             console.log("===res students===",res.body);


        //             if (!!body.length) {
        //                 this.tableData = body.content
        //                 this.count = body.length
        //             } else {
        //                 // alert('err:' + body)
        //             }

                  

        //         })



        // }

          






        },
      




      


         mounted(){
            console.log('---------mounted--------------');
            this.getData();
            
          }


       
    }
</script>
<style scoped>
    .header{
    margin-left: 10px;
    margin-top: 30px;

    }
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
        /*margin-top: 20px;*/
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
        height: 80%;
        padding-left: 100px;
        border: 1px solid #ccc;
        margin-left: 200px;
        position: relative;
        top: 50px;
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
    .tag_body{
      width: 83%;
      /*height: 100%;*/
      background-color: rgba(0,0,0,0.3);
      position: absolute;
      top: 60px;
      z-index: 100;
      display: none;
    }
    .verify{
      position: relative;
      bottom: 50px;
      left: 24%;
    }
    .costKind_input{
      width: 290px;
      padding-bottom: 20px;
    }
    .costKind_input1{
      width: 290px;
      padding-bottom: 20px;
    }
    .dateKind{
      width: 290px;
    }
    .el_content{
      margin-left: 80px;
    }
    .top{
      width: 100%!important;
    }
    
</style>
  

