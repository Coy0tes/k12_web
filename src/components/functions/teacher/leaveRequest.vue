<template>
    <div>
   
            <div class="line">
             <div style="width:100.5%;  background-color:#fff;margin-top:-20px;margin-bottom:10px;margin-left:-10px; padding-right:25px; line-height:40px; position: fixed;
  z-index: 0">
                <!-- <el-button type="primary" @click="dutyDialog=true" style="margin-left:10px;margin-top:5px;">职务安排</el-button> -->
                <!-- <el-button type="primary" @click="showDialog" style="float:right;margin-top:5px; position: absolute; margin-left:72.8%;">邀请老师</el-button> -->

            </div>
            <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%; margin-top:10px;" ref="multipleTable" border >
                
                <el-table-column prop="name" align="center" label="园所名">
                </el-table-column> 
                <el-table-column prop="annual" align="center" label="年假时间">
                </el-table-column>
                 <el-table-column prop="sick" align="center" label="病假时间">
                </el-table-column>
                <el-table-column prop="barth" align="center" label="产假时间">
                </el-table-column>
                <el-table-column prop="barthWith" align="center" label="陪产时间">
                </el-table-column> 
                <el-table-column prop="funeral" align="center" label="丧假时间">
                </el-table-column> 
                <el-table-column prop="marry" align="center" label="婚假时间">
                </el-table-column>
                <el-table-column prop="mobile" align="center" label="考勤机id">
                </el-table-column>
               
              


                <el-table-column label="操作" width="200" align="center">
                    <template scope="scope">
                        <el-button size="small" type="primary" @click="putData(scope.$index, scope.row)">编辑</el-button>
                    
                  
                    </template>
                </el-table-column>
            </el-table>

          


 


    <div>
        
                <el-dialog
               
                :visible.sync="dialogVisible"
                width="630px"
                :before-close="handleClose">
             

                    <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">编辑</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
                <div>
                   <el-form ref="form" :model="form" label-width="80px" style="width:450px;margin-left:16%;">
            
                    <el-form-item label="校名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="管理员">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                   <el-form-item label="考勤周期">
                     自 <el-input  placeholder="开始" style="width:120px;" v-model="form.fromDate" type='number'></el-input>号
                    到 <el-input  placeholder="结束" style="width:120px;"v-model="form.ToDate" type='number'></el-input>号
                    
                   
                  
                  </el-form-item>

               
                    <el-form-item label="">
                    年假 <el-input  placeholder="年假" style="width:127px;" v-model="form.annual" type='number'></el-input>天
                    病假 <el-input  placeholder="病假" style="width:127px;"v-model="form.sick" type='number'></el-input>天
                   <!-- 传数字转换秒  8小时-->
                  </el-form-item>

                 
                     <el-form-item label="">
                    
                    
                    产假 <el-input   placeholder="产假" style="width:120px;"v-model="form.barth" type='number'></el-input>天
                     陪产假 <el-input  placeholder="陪产假" style="width:120px;"v-model="form.barthWith" type='number'></el-input>天
                     <!-- 传数字转换秒 8小时 -->
                  </el-form-item>

          
                  <el-form-item label="">
                    
                    
                    丧假 <el-input placeholder="丧假" style="width:127px;"v-model="form.funeral" type='number'></el-input>天
                     婚假 <el-input placeholder="婚假" style="width:127px;"v-model="form.marry" type='number'></el-input>天
                     <!-- 传数字转换秒 8小时 -->
                  </el-form-item>

               
    


                <el-form-item label="描述">
<!-- <UE :defaultMsg=form.content :config=config :id=ue1 ref="ue"></UE> -->
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入内容" v-model="form.description">
                    </el-input>
                </el-form-item>
            </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="putData1">确 定</el-button>
                </span>
              </el-dialog>


    </div>



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
        </div>





    </div>
</template>
<script>
    export default {
        data(){
            return {
                radio:"",
                value2:'',
                value1:'',
                tableData:[],
                showSize: 10,
                current_page: 0,
                 currentPage:1,
                pagesize:10,
                count: 100,
                dialogVisible:false,
                appointDialog:false,
                rowTeacherId:0,
                form:{
                    annualNum:0,

                },
                annualNum:0,
                sickNum:0,
                options:[{

                     value: 'SICK',
                     label: '病假'
                },{

                     value: 'ANNUAL',
                     label: '年休假'
                },{

                     value: 'OTHER',
                     label: '其他假'
                },{

                     value: 'REST',
                     label: '调休'
                },{

                     value: 'AFFAIR',
                     label: '事假'
                },{

                     value: 'INDUCTRIAL',
                     label: '工伤假'
                },{

                     value: 'LACTION',
                     label: '哺乳假'
                },{

                     value: 'MARRUAGE',
                     label: '婚假'
                },{

                     value: 'FUNERAL',
                     label: '丧假'
                },
                ],
                value:'',
                textarea:'',
                    form: {
                    name: '',
                    description: '',
                    username:'',
                    annual:"",
                    sick:"",
                    barth:"",
                    barthWith:"",
                    funeral:"",
                    marry:"",
                    fromDate:'',
                    ToDate:'',
                    ToDate:''


                },

            }
        },
        methods:{
              formatDate: function (row, column) {
           
          return row.periodDiscounts == "YEAR" ? '年' : row.periodDiscounts == "HALF_YEAR" ? '半年' :  row.periodDiscounts == "QUARTER" ? '季' :  row.periodDiscounts == "MONTH" ? '月': row.periodDiscounts == "DAY" ? '日': row.periodDiscounts == "ONCE" ? '一次性':"未知";

        },
            notUse(){
                this.radio="";
            },
            dutyPut(){
                var num= Date.parse(this.value1);
                console.log('11111',this.value)
                // console.log('11111',num)
            },
            
            
            getData(){


                              this.tableData = localStorage.schools
                        this.count = localStorage.schools.length;


                this.$http({
                    method: 'get',
                    url: this.$getApi+'management/schools',
                    headers: {
                        'Authorization': 'Bearer '+ localStorage.token
                    }
                }).then((res) => { // promise对象
                    console.log("======================", res)
                    const {
                        body
                    } = res

                    console.log("=======schools data========",body);
                    console.log("=======schools data========",res.bodyText);
                      // res.body.forEach(function(){
                      //   this.tableData.push{

                      //   }
                      // })
                      var tableData1=[];
                        res.body.forEach(function(item, index, array){
                       tableData1.push({ name: item.name, 
                                            annual:item.annual/28800+' 天', 
                                            sick: item.sick/28800+' 天',
                                            barth:item.barth/28800+' 天',
                                            barthWith:item.barthWith/28800+' 天',
                                            funeral:item.funeral/28800+' 天',
                                           
                                            marry:item.marry/28800+' 天',
                                           
                                          })
                    })
                      
                      this.tableData=tableData1
                    // if (!!body.length) {
                    //     this.tableData = body
                    //     this.count = body.length
                    // } else {
                    //     alert('err:' + body)
                    // }

                })






            },
            putData(index,row){
                this.dialogVisible=true
                this.form.name=row.name
                // form.username
                console.log(row)
            },
            putData1(){
                    this.$http.put(
                     this.$getApi+'management/schools/' + localStorage.schoolsId,
                   {
                    "annual": this.form.annual*28800,
                    "attDeviceIds": [
                      "string"
                    ],
                    "barth": this.form.barth*28800,
                    "barthWith": this.form.barthWith*28800,
                    "description": this.form.description*28800,
                    "formDate": this.form.fromDate,
                    "funeral": this.form.funeral*28800,
                    "marry": this.form.marry*28800,
                    "mobile": this.form.mobile,
                    "name": this.form.name,
                    "sick": this.form.sick*28800,
                    "toDate": this.form.ToDate,
                    "username": this.form.username,
                  },
                    {
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer '+ localStorage.token

                    }
                }
                      
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===body=1111111====",res);
                      this.$message({
                      message: '成功',
                      type: 'success'
                    }); 
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    }); 
                });
                this.getData();
                this.dialogVisible = false
            },
            handleSizeChange: function (size) {
        this.pagesize = size;
        console.log('pagesize',this.pagesize)
        },
        handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            console.log('currentPage',this.currentPage)
        },
        postData(){
             var num= Date.parse(this.value1);
             var num1= Date.parse(this.value2);
             var timeOut=num1-num;
        
        },





        },
         mounted(){
            this.getData();
        },
    }
</script>
<style>
    
</style>