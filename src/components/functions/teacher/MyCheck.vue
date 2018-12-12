<template>
    <div style="padding:10px;">
      <el-select v-model="value5" placeholder="请选择时间"@change="selectGet">
    <el-option
      v-for="item in options1"
      :key="item.value5"
      :label="item.label5"
      :value="item.value5">
    </el-option>
  </el-select>
        <el-select v-model="value" placeholder="请选择查询项" style="margin-top:5px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="getData">查询</el-button>
      <!-- <el-button  type="primary"  @click="getduit()">请假</el-button> -->
      <el-table
    :data="tableData3"
    v-show="shenpi"
    border
    style="width: 100%;margin-top:5px;">
    <el-table-column
      prop=""
      label=""
      width="1"
      >
    </el-table-column> 

    <el-table-column
      prop="createTime"
      label="申请日期"
      align="center"
      :formatter="dateFormat">
    </el-table-column>
      <el-table-column
      prop="processType"
      align="center"
      :formatter='formatStyle1'
      label="审批类型">
    </el-table-column>
    

    <el-table-column
      prop="userName"
      align="center"
      label="申请人姓名">
    </el-table-column>

    <el-table-column
      prop="timelong"
      align="center"
      label="申请时常">
    </el-table-column>

    <el-table-column
      prop="isGone"
      align="center"
       :formatter='formatStyle'
      label="审批状态">
    </el-table-column>

   

    

 

 <el-table-column
      prop="masterName"
      align="center"
      label="当前审批者">
    </el-table-column>

    

    <el-table-column
     
      align="center"
      label="审批"
      width="300">
      <template slot-scope="scope">
        
        <el-button @click="all(scope.$index, scope.row)" size="small">详情</el-button>
        <!-- <el-button @click="pass(scope.$index, scope.row)" size="small" v-show="ISShow">审批</el-button> -->
        <!-- <el-button @click="all1(scope.$index, scope.row)" size="small" >查看状态</el-button> -->
      </template>
    </el-table-column>


  </el-table>

       <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pagesize"
              background="false"
              v-show="shenpi"
              layout="total, prev, pager, next"
              :total="tableData3.length"
              style="float:right; margin-top:20px;">
            </el-pagination>

<!-- 申请历史 -->
<el-table
    :data="tableData1.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    border
    v-show="shenqingHistory"
    style="width: 100%;margin-top:4px;">
    <el-table-column
      prop="name"
      label="申请人"
      align="center"
      
      >
    </el-table-column> 
     <el-table-column
      prop="createdAt"
      label="申请日期"
      align="center"
      :formatter="dateFormat2"
      >
    </el-table-column>
    <el-table-column
      prop="fromDate"
      label="开始时间"
       align="center"
      :formatter="dateFormat2"
      >
    </el-table-column>
    <el-table-column
      prop="toDate"
       align="center"
      :formatter="dateFormat2"
      label="结束时间">
    </el-table-column>
    <el-table-column
      prop="reason"
       align="center"
      :formatter='formatStyle2'
      label="原因">
    </el-table-column>
    <el-table-column
      prop="isGone"
       align="center"
        :formatter='formatStyle'
      label="审核状态">
    </el-table-column>
        <el-table-column
     
      align="center"
      label="审批"
      >
      <template slot-scope="scope">
        
        <el-button @click="all(scope.$index, scope.row)" size="small">详情</el-button>
        <!-- <el-button @click="pass(scope.$index, scope.row)" size="small" v-show="ISShow">审批</el-button> -->
        <!-- <el-button @click="all1(scope.$index, scope.row)" size="small" >查看状态</el-button> -->
      </template>
    </el-table-column>
  </el-table>

          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pagesize"
              background="false"
              v-show="shenqingHistory"
              layout="total, prev, pager, next"
              :total="tableData1.length"
              style="float:right; margin-top:20px;">
            </el-pagination>







  <!-- 请假 -->
  <el-dialog :visible.sync="appointDialog"  class="dialogSzie" style="padding-bottom:30px;">
                 <div class="top">
             <span class="top_text">请假</span>
             <img src="../../../assets/close3.png" height="48" width="48" class="add_close"@click="appointDialog = false">
          </div>
<div style="margin-left:35%;margin-bottom:30px;">
    
  <el-form>


  <el-form-item label="开始时间"    style="margin-bottom:20px;">
    <el-date-picker
      v-model="value2"
      type="datetime"
   
      placeholder="选择日期时间">
    </el-date-picker>

   

  </el-form-item>

   <el-form-item label="请假类型"    style="margin-bottom:20px;">
     <el-select v-model="value4" placeholder="请选择">
    <el-option
      v-for="item in options2"
      :key="item.value4"
      :label="item.label4"
      :value="item.value4">
    </el-option>
  </el-select>
  </el-form-item>

  <el-form-item label="结束时间"    style="margin-bottom:20px;">
    <el-date-picker
      v-model="value3"
      type="datetime"
      
      placeholder="选择日期时间"    style="margin-bottom:20px;">
    </el-date-picker>

  </el-form-item>


  <el-form-item label="请假原因"    style="margin-bottom:20px;">
           <el-input
          type="textarea"
          :rows="2"
           style="width:200px;"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
  </el-form-item>
  <el-form-item>
    <!-- <el-button type="primary" @click="onSubmit">查询</el-button> -->
  </el-form-item>
</el-form>

</div>
            
<span slot="footer" class="dialog-footer">
    <el-button @click="appointDialog = false">取 消</el-button>
    <el-button type="primary" @click="postData">确 定</el-button>
  </span>
        </el-dialog>  

<!-- 审批 -->
            <el-dialog
           
            :visible.sync="dialogVisible"
            width="500px"
            :before-close="handleClose">
                <div class="top">
             <span class="top_text">审批</span>
             <img src="../../../assets/close3.png" height="48" width="48" class="add_close"@click="dialogVisible = false" >
          </div>
           <div style="margin-left:20px;padding-left:0%;">
            
             
         
            <div style="margin-top:20px; margin-left:100px;">
                  评论：<el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="textarea"
                  style="width:200px;vertical-align: middle;">
                </el-input>

            </div>


           </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="UNpassput">拒 绝</el-button>
              <el-button type="primary" @click="passPut">通 过</el-button>
            </span>
            </el-dialog>
<!-- 详情 -->

            <el-dialog
            
            :visible.sync="AllVisible"
            width="580px"
            :before-close="handleClose">
            <div class="top">
             <span class="top_text">{{userName}}的{{processType|formatStatu}}申请</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="AllVisible = false">
             </div>
             
          </div>
              <div style="margin-left:75px; margin-top:-40px;margin-bottom:40px;">
                        <span style="margin-left: -37px;display:inline-block">审核状态：{{isPass|}}</span>
                        <br>
                        <span style="margin-left: -37px;display:inline-block">时间: {{vacationFormDate|time}}--{{vacationToDate|time}} </span>
                        <br>
                     <span style="margin-left:10px;display:block;margin-bottom:10px;"></span>
                     <span style="display:inline-block;margin-left: -36px;    position: relative;top:23px;">申请人</span>
                      <ul v-for="(item,index) in getDataArray" style="display:block;line-height:30px;border-radius：50%;font-size:12px; " >
 
                            
                              
                            <li  style="  height:30px; border-radius:25%; font-size:12px;padding-left:10px;margin-top:-10px;">
                                  <span style="display:inline-block;height:40px; width:40px;background-color:#61bfff; line-height:40px;padding:0 5px 0 5px; border-radius:50%; font-size:14px;color:#FFF;vertical-align: middle;text-align: center;">{{item.masterName|format}}</span>

                                  <span class="yellow"  :class="item.auditResult? 'green':'yellow'">{{item.auditResult|formatStatus}}</span><span style="display:inline-block;height:20px;line-height:20px;float:right; padding-right:30px;">{{item.updateTime|time}}</span>

                                  <span style="display:inline-block;margin-top:-20px;position: relative;top:30px; left:-27px;" >
                                   <span v-show="item.comment"> 评论：</span> {{item.comment}}
                                  </span>
                           
                            
                          </li>
                            <span style="margin-left:6%;display:inline-block;width:1px;height:20px;background-color:#000;margin-top: 10px;"></span>
                            
                        
                        </ul>
                              <span style="margin-left:6%;display:inline-block;width:1px;height:20px;background-color:#fff;margin-top: 10px; position: relative;top: -41px;"></span>

                  <div style="margin-top:20px; " v-show="ISShow">
                  评论：<el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="textarea"
                  style="width:420px;vertical-align: middle;">
                </el-input>

            </div>
                 

              </div>
            <span slot="footer" class="dialog-footer">
              <div style="text-align:center;width:100%;">
                <el-button @click="UNpassput"  type="danger" v-show="ISShow">拒 绝</el-button>
                <div style="width:80px;display:inline-block"></div>
              <el-button type="primary" @click="passPut" v-show="ISShow">通 过</el-button>
              </div>
              
             <!-- <div style="width:30px;height:30px;"></div> -->
              
            </span>
            </el-dialog>

            <!-- 查询状态 -->
       <!--      <el-dialog
            
            :visible.sync="searchVisible"
            width="500px"
            :before-close="handleClose">
            <div class="top">
             <span class="top_text">详情</span>
             <img src="../../../assets/close3.png" height="48" width="48" class="add_close"@click="searchVisible = false">
          </div>
              <div style="margin-left:150px;">
                <span>审核是否通过：{{this.isPass|formatStatus}}</span>
                      <span style="margin-left:10px;">审批流程详情</span>
                      <ul v-for="(item,index) in getDataArray" style="display:block;line-height:30px;border-radius：50%;font-size:12px;" >

                            <span style="margin-left:50px;">↓</span>

                            <li  style="  height:30px; border-radius:25%; font-size:12px;padding-left:10px;">
                                  <span>{{item.masterName}}</span>:

                                  <span>
                                    {{item.comment}}
                                  </span>
                           
                            
                          </li>
                          
                         
                        
                        </ul>






              </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="searchVisible = false">取 消</el-button>
              <el-button type="primary" @click="searchVisible = false">确 定</el-button>
            </span>
            </el-dialog> -->



    </div>
</template>
<script>
 import Moment from 'moment';
    export default {
        data(){
            return {
               showSize: 10,
                current_page: 0,
                 currentPage:1,
                      pagesize:10,
                count: 100,
              shenqingHistory:false,
              tableData1:[],
              shengqing:false,
              auditResult:'',
              fontColor:"",
              tableData3:[],
              dialogVisible:false,
              AllVisible:false,
              radio: '',
              rowId:0,
              massageId:0,
              textarea:'',
              ISShow:true,
              searchVisible:false,
              getDataArray:[],
              appointDialog:false,
               flow:[],
              options:[
              {
                 value: 1,
                label: '未审批'
              },{
                 value: 2,
                label: '已审批'
              },{
                 value: 3,
                label: '我的申请'
              },
              ],
              options2:[],
              value:1,
              isPass:'',
              options1:[
                {
                 value5: 1,
                label5: '本月'
              },{
                 value5: 2,
                label5: '上月'
              },


              ],
              value1:'',
              val:'',
              value2:'',
              value3:'',
              value4:'',
              value5:1,
              searchDate:'',
              applyType:"",
              processType:'',
              vacationFormDate:'',
              vacationToDate:'',
              shenpi:true,

            }
        },
      filters: {
        time: function (value) {
          let d = new Date(parseInt(value) * 1000)
          // console.log('dddddddd',d)
           if (d == "Invalid Date") {
               return "";  
              }       
              return (d.getFullYear()) + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
       },  
          
       format: function (val) {
              console.log(val)
              return val == localStorage.userName ? '我' :val;
          },
      formatStatus: function (val) {
              console.log(val)
              // if (val=="PASS") {
              //   console.log("11111111111111111111111111111",e.target)
              // }
              return val == "PASS" ? '通过' : val == "UNPAS" ? '拒绝' :val == 'CHECKED' ? '审核中' : val == "null" ? '待审核' :' 待审核';
          },

           formatStatu: function (val) {
              console.log(val)
               return val == "RETOR" ? '补签' :val == "AFFAIR" ? '事假' :val == "REST" ? '调休':val == "ANNUAL" ? '年休假':val == "SICK" ? '病假':val == "BIRTH" ? '产假':val == "BIRTHWITH" ? '陪产假':val == "MARRIAGE" ? '婚假':val == "FUNERAL" ? '丧假':val == "BUSINESS" ? '出差':val == "OVERTIME" ? '加班':"未知";  
          },
     
  },
        methods:{
       
                formatStyle: function (row, column) {
           
        return row.isGone == "PASS" ? '通过' :row.isGone == "CHECKED" ? '审核中' :row.isGone == "UNPASS" ? '拒绝':"未知";  

    },         formatStyle1: function (row, column) {
           
        return row.processType === "RETOR" ? '补签' :row.processType === "AFFAIR" ? '事假' :row.processType === "REST" ? '调休':row.processType === "ANNUAL" ? '年休假':row.processType === "SICK" ? '病假':row.processType === "BIRTH" ? '产假':row.processType === "BIRTHWITH" ? '陪产假':row.processType === "MARRIAGE" ? '婚假':row.processType === "FUNERAL" ? '丧假':row.processType === "BUSINESS" ? '出差':row.processType === "OVERTIME" ? '加班':"未知";  

    },formatStyle2: function (row, column) {
           
        return row.reason == "RETOR" ? '补签' :row.reason == "AFFAIR" ? '事假' :row.reason == "REST" ? '调休':row.reason == "ANNUAL" ? '年休假':row.reason == "SICK" ? '病假':row.reason == "BIRTH" ? '产假':row.reason == "BIRTHWITH" ? '陪产假':row.reason == "MARRIAGE" ? '婚假':row.reason == "FUNERAL" ? '丧假':row.reason == "BUSINESS" ? '出差':row.reason == "OVERTIME" ? '加班':"未知";  

    },
              dateFormat:function(row, column) {  
               var date = row[column.property];  
              if (date == undefined) {  
                 return "";  
              } 
              
              return Moment(date*1000).format("YYYY-MM-DD ");  
            },
             dateFormat1:function(row, column) {  
               var date = row[column.property];  
              if (date == "null") {  
                 return "";  
              } 
              
              return Moment(date*1000).format("YYYY-MM-DD ");  
            },    dateFormat2:function(row, column) {  
               var date = row[column.property];  
              if (date == "null") {  
                 return "";  
              } 
              
              return Moment(date*1000).format("YYYY-MM-DD ");  
            },
                 postData(){
             var num= Date.parse(this.value2);
             var num1= Date.parse(this.value3);
             var timeOut=num1-num;
             // if (this.radio==1) {
             //    console.log('222',timeOut);
             //    this.annualNum=timeOut;
             //    this.sickNum=0;
             // }else if(this.radio==1){
             //    this.annualNum=0;
             //    this.sickNum=timeOut;
             // }else{
             //    this.annualNum=0;
             //    this.sickNum=0;
             // }


var time=(num1-num)/24*8/1000



            this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'api/vacationTeacher?type=1',
                    {
                      
                      "desc": this.textarea,
                      "fromDate": num,
                      "reasion": this.value4,
                       "portrait": "",
                      "vacationTime": time,
                      "toDate": num1
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
                     this.$message({
                      message: '请假成功',
                      type: 'success'
                    }); 
                    this.getData();
                })
        },
                     handleSizeChange: function (size) {
        this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },
            selectGet(vId){//这个vId也就是value值
                   
                    let obj = {};
                    obj = this.options1.find((item)=>{//这里的userList就是上面遍历的数据源
                        return item.value === vId;//筛选出匹配数据
                    });
                    console.log(obj.label);//我这边的name就是对应label的
                    this.val=obj.label
                  },

                getData(){
                    this.$http({
                        method: 'get',
                        url:this.$getApi+'processNode/management/queryByActorAndType?type=1',                  
                        headers: {
                            // 'content-type': "multipart/form-data",
                            'Authorization': 'Bearer ' + localStorage.token

                        }
                    }).then((res) => { // promise对象
                       
                        const {
                            body
                        } = res
                            this.flow=body.list
                            this.flow1=body.massageCC[0].name
                        console.log("===陪产假剩余====",body);
                        console.log("===陪产假剩余====",this.flow1);
                        console.log("===陪产假剩余====",res);
               
           
                      
                    })
                  

                  if (this.value5==1) {
                    

                     var date = new Date();
                    var seperator1 = "-";
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var strDate = date.getDate();
                    if (month >= 0 && month <= 9) {
                        month = "0" + month;
                    }
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = "0" + strDate;
                    }
                    var currentdate = year + seperator1 + month + seperator1 + strDate;
                    console.log(currentdate)
                    this.searchDate=currentdate





                  }else if (this.value5==2) {

                    var date = new Date();
                    var seperator1 = "-";
                    var year = date.getFullYear();
                    var month = date.getMonth();
                    var strDate = date.getDate();
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = "0" + strDate;
                    }
                    var currentdate = year + seperator1 + month + seperator1 + strDate;
                    console.log(currentdate)

                    this.searchDate=currentdate






                  }


                    //  this.$http({
                    //     method: 'get',
                    //     url:this.$getApi+'ProceaaType/management',                  
                    //     headers: {
                    //         // 'content-type': "multipart/form-data",
                    //         'Authorization': 'Bearer ' + localStorage.token

                    //     }
                    // }).then((res) => { // promise对象
                       
                    //     const {
                    //         body
                    //     } = res

                    //     console.log("===审批类型s====",body);
                    //     console.log("===审批类型====",res);
                    //    var tableData1=[];
                    //     res.body.forEach(function(item, index, array){
                    //    tableData1.push({ label: item.name, 
                    //                         value:item.typeNo
                                           
                    //                       })
                    // })
                      
                    //   this.options1=tableData1
                      
                    // })


                  if (this.value==1) {
                    this.shenqingHistory=false
                    this.shenpi=true

                              this.$http({
                    method: 'get',
                    url:this.$getApi+'applyForVacation/management/query?processType=1&date='+this.searchDate,                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res
                   
                    console.log("===待审批s====",body);
                    console.log("===待审批====",res);
                    console.log("===待审批====",this.value1);
                    var a=this.val
                  var tableData2=[];
                        res.body.forEach(function(item, index, array){
                       tableData2.push({ comment: item.comment, 
                                         createTime:item.createTime,
                                         massageId:item.massageId,
                                         masterName:item.applyForNow.masterName,
                                         processType:item.massageId.reason,//问题所在
                                         id:item.id,
                                         updateTime:item.updateTime,
                                         userName:item.userName,
                                         isGone:item.massageId.isGone,
                                         processInstanceId:item.processInstanceId,
                                         timelong:(item.massageId.vacationTime/28800).toFixed(2) +'天',
                                         fromDate:item.massageId.fromDate,
                                         toDate:item.massageId.toDate
                                            
                                          })
                    })


                        console.log('123123',tableData2)

                  this.tableData3=tableData2
                  this.ISShow=true
                    

                });

                  }else if (this.value==2) {
                     this.shenqingHistory=false
                    this.shenpi=true
                       this.$http({
                        method: 'get',
                        url:this.$getApi+'applyForVacation/management/queryByMonthAndActorId?processType=1&date='+this.searchDate,                  
                        headers: {
                            // 'content-type': "multipart/form-data",
                            'Authorization': 'Bearer ' + localStorage.token

                        }
                    }).then((res) => { // promise对象
                       
                        const {
                            body
                        } = res

                        console.log("===已审批s====",body);
                        console.log("===已审批====",res);
                       var a=this.val
                  var tableData2=[];
                        res.body.forEach(function(item, index, array){
                       tableData2.push({ comment: item.comment, 
                                         createTime:item.createTime,
                                         massageId:item.massageId,
                                         masterName:item.applyForNow.masterName,
                                         processType:item.massageId.reason,//问题所在
                                         
                                         updateTime:item.updateTime,
                                         userName:item.userName,
                                          isGone:item.massageId.isGone,
                                          processInstanceId:item.processInstanceId  
                                          })
                    })


                        console.log('123123',tableData2)

                  this.tableData3=tableData2
                        this.ISShow=false

                    })

                  }else if (this.value==3) {
                     this.shenqingHistory=true
                    this.shenpi=false
                          this.$http({
                        method: 'get',
                        url:this.$getApi+'api/vacationTeacher/queryApply?specialDate='+this.searchDate,                  
                        headers: {
                            // 'content-type': "multipart/form-data",
                            'Authorization': 'Bearer ' + localStorage.token

                        }
                    }).then((res) => { // promise对象
                       
                        const {
                            body
                        } = res
                          var dataArry=[]
                              res.body.forEach(function(item, index, array){
                       dataArry.push({   name: localStorage.userName, 
                                         createdAt:item.createdAt,
                                         fromDate:item.fromDate,
                                         toDate:item.toDate,
                                         reason:item.reason,
                                         isGone:item.isGone,
                                         id:item.id
                                       
                                          })
                    })
                          this.tableData1=dataArry
                        console.log("===申请历史====",dataArry);
                        console.log("===已审批====",res);
                      
                  
                  



             
                        this.ISShow=false

                    })

                  }
                  // 待审批
                 
                      this.$http({
                        method: 'get',
                        url:this.$getApi+'employee/management?actorId='+localStorage.selfId,                  
                        headers: {
                            // 'content-type': "multipart/form-data",
                            'Authorization': 'Bearer ' + localStorage.token

                        }
                    }).then((res) => { // promise对象
                      
                        const {
                            body
                        } = res
                        var opt=[];
                        opt.push({
                            label4:"病假剩余 "+ (body[0].sick/28800).toFixed(0)+"天",
                            value4:"SICK",
                        },{
                             label4:"年假剩余 "+(body[0].annual/28800).toFixed(0)+"天",
                            value4:"ANNUAL",
                        },{
                             label4:"调休剩余 "+(body[0].rest/28800).toFixed(0)+"天",
                            value4:"REST",//，未返回
                        },{
                             label4:"陪产假剩余 "+(body[0].barthWith/28800).toFixed(0)+"天",
                            value4:'BIRTHWITH',
                        },{
                             label4:"产假剩余 "+(body[0].barth/28800).toFixed(0)+"天",
                            value4:'BIRTH',
                        },{
                             label4:"婚假剩余 "+(body[0].marry/28800).toFixed(0)+"天",
                            value4:'MARRUAGE',
                        },{
                             label4:"丧假剩余 "+(body[0].funeral/28800).toFixed(0)+"天",
                            value4:'FUNERAL',
                        })
                        console.log("===陪产假剩余====",body);
                        console.log("===陪产假剩余====",res);
                    console.log("opt",opt)
                      this.options2=opt
           
                      
                    })

               

                // 已审批
              
               
                


                },
                    getduit(index,row){
               
                // this.rowTeacherId=row.teacherId;
                // this.dutyId=row.dutyid
                
                // console.log('++++++++++++++++',row.dutyid)
                // console.log('+++++++teacherId++++++++',row.teacherId)


                      this.$http({
                        method: 'get',
                        url:this.$getApi+'processNode/management/queryByActorAndType?type=1',                  
                        headers: {
                            // 'content-type': "multipart/form-data",
                            'Authorization': 'Bearer ' + localStorage.token

                        }
                    }).then((res) => { // promise对象
                       
                        const {
                            body
                        } = res
                 
                        console.log("===陪产假剩余====",body);
                        console.log("===陪产假剩余====",res);
               
           
                      
                    })




 this.appointDialog = true;



            },
                 pass(index,row){
                  console.log(row);
                  this.rowId=row.id
                   this.massageId=row.massageId.id
                  this.applyType=row.processType
                  console.log(this.applyType)
                  this.dialogVisible=true
                 
                },
                UNpassput(){
                        this.$http.put(
                     this.$getApi+'applyForVacation/management/updateByVacation',
                     {
                         "auditResult": "UNPASS",
                          "comment": this.textarea,
                          "id": this.rowId,
                          "applyType": this.applyType,
                          "messageId": this.massageId,
                          "type": 1,
                    },
                    {
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }
                      
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===body=1111111====",res);
                      this.$message({
                      message: '审核成功',
                      type: 'success'
                    });
                }).catch((res) =>{
                    this.$message({
                      message: '审核失败',
                      type: 'error'
                    }); 
                });
                 this.dialogVisible=false
                },
                passPut(){
                 
                     this.$http.put(
                     this.$getApi+'applyForVacation/management/updateByVacation' ,
                     {
                         "auditResult": "PASS",
                          "comment": this.textarea,
                          "id": this.rowId,
                          "messageId": this.massageId,
                          "applyType": this.applyType,
                          "type": 1
                    },
                    {
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }
                      
                ).then((res) =>{
                    // const {body} = res;
                    this.$message({
                      message: '审核成功',
                      type: 'success'
                    });
                    console.log("===body=1111111====",res);
                     
                }).catch((res) =>{
                    this.$message({
                      message: '审核失败',
                      type: 'error'
                    });
                });
            
              this.AllVisible=false
                   
                },
                all(index,row){
                  console.log('auditResult',row)
                  this.vacationFormDate=row.fromDate
                  this.vacationToDate=row.toDate
                   this.AllVisible=true
                    this.rowId=row.id
                    this.applyType=row.processType
                    console.log(row)
                  
                  var processInstanceId=row.processInstanceId
                     
                    console.log('111111111111111')
                    if (this.value==3) {
                      console.log(row.id)
                       this.$http({
                    method: 'get',
                    url:this.$getApi+'applyForVacation/management/queryApplyDetail?id='+ row.id,                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   console.log('value===============3333333333333')
                    const {
                        body
                    } = res

                    console.log("===已审批s====",body);
                    this.getDataArray=body;
                    for (var i = 0; i < this.getDataArray.length; i++) {
                      this.getDataArray[i]
                    }
                    console.log("===已审批====",res);
                  

                    

                })


                    }else{
                      this.massageId=row.massageId.id
                        this.$http({
                        method: 'get',
                        url:this.$getApi+'api/vacationTeacher/queryOne?id='+this.massageId,                  
                        headers: {
                            // 'content-type': "multipart/form-data",
                            'Authorization': 'Bearer ' + localStorage.token

                        }
                    }).then((res) => { // promise对象
                       
                        const {
                            body
                        } = res
                        this.userName=body.userName
                        this.processType=row.processType

                        console.log("===查询一个====",body.userName);
                        console.log("===查询一个processType====",body.processType);
                        console.log("===查询一个====",res);
                        this.isPass=body.isGone
                          if (this.isPass=="CHECKED") {
                            this.isPass="审核中"
                          }else if (this.isPass=="PASS") {
                             this.isPass="通过"
                         }else if (this.isPass=="UNPASS") {
                            this.isPass="未通过"
                         }
                      
                      console.log('this.isPass',this.isPass)
                        // this.tableData3=body
                        

                    })



                       this.$http({
                    method: 'get',
                    url:this.$getApi+'applyForVacation/management/queryDetail?massageId='+this.massageId+'&processInstanceId='+processInstanceId,                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                    console.log("===已审批s====",body);
                    this.getDataArray=body;
                    for (var i = 0; i < this.getDataArray.length; i++) {
                      this.getDataArray[i]
                    }
                    console.log("===已审批====",res);
                  

                    

                })
                    }
                

                },



            all1(){
                this.searchVisible=true
                    this.rowId=row.id
            
                  this.massageId=row.massageId
            
                    },
                   

              



        },
         mounted() {
            this.getData()

        },





    }
</script>
<style scoped>
  /*  img:hover{
      border-radius: 50%;
      background-color: #23a3fb;
    }*/
    .green{
      color:#56e889 !important;
    }
    .yellow{
         color:#e6a23c; 
    }
    .closeImg{
        margin-left: 7px;
        margin-top: 7px;
    }
    .closeDiv:hover{
      background-color: #23a3fb;
    }
</style>