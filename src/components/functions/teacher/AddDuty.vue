<template>
   <div v-loading="loading2"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
       <div style="width:100%;height:50px; margin-top:10px;">
            <el-button type="primary" style="margin-top:5px; float:right;margin-right:10px;"@click="dialogVisible=true">增加排班</el-button>
            
              <el-select v-model="value" placeholder="请选择" style="margin-left:10px;margin-top:4px;">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              <el-button type="primary"  @click="get" >查询</el-button>
       </div>
          <div style="padding:0px 10px;">
        <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            border
            style="width: 100%;">
            <el-table-column
              prop=""
              label=""
              width="1">
            </el-table-column>
             <el-table-column
              prop="id"
              label="id"
              >
            </el-table-column>
            <el-table-column
              prop="name"
              label="班次名称"
              >
            </el-table-column>

            <el-table-column
              prop="AMstart"
              label="上午开始"
              >
            </el-table-column>
            <el-table-column
              prop="AMend"
              label="上午结束"
              >
            </el-table-column>
            <el-table-column
              prop="PMstart"
              label="下午开始">
            </el-table-column>
             <el-table-column
              prop="PMend"
              label="下午结束">
            </el-table-column>
            <el-table-column
            
              width="250">
              <template scope="scope">
                       
                        <el-button size="small" type="primary" @click="paiBan(scope.$index, scope.row)">排班</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button size="small" type="warning" @click="getPutId(scope.$index, scope.row)">修改</el-button>
                   
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

    </div> 

                <el-dialog
  
              :visible.sync="dialogVisible"
              width="570px"
              :before-close="handleClose">
              
                <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">增加排班</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
              <div style="padding-left:20%;">
                  <el-form   >
                  <el-form-item label="排班班次名称">
                    <el-input  placeholder="班次名称" style="width:250px;" v-model="form.name"></el-input>
                  </el-form-item>

                  <el-form-item label="排班班次类型">
                   <el-select v-model="form.schedulingType" placeholder="请选择班次类型">
                          <el-option label="两班" value="2"></el-option>
                          <el-option label="四班" value="1"></el-option>
                        </el-select>
                  </el-form-item>

              <!--     <el-form-item label="上午最早时间">
                    <el-time-picker
                        v-model="form.amStartTimeOk"
                        :picker-options="{
                          selectableRange: '06:30:00 - 22:30:00'
                        }"
                        placeholder="任意时间点">
                      </el-time-picker>
                  </el-form-item> -->

                  <el-form-item label="上午开始时间">
                     <el-time-picker
                        v-model="form.amStartTime"
                        :picker-options="{
                          selectableRange: '06:30:00 - 22:30:00'
                        }"
                        placeholder="任意时间点">
                      </el-time-picker>
                  </el-form-item>

                  <el-form-item label="上午结束时间">
                     <el-time-picker
                        v-model="form.amEndTime"
                        :picker-options="{
                          selectableRange: '06:30:00 - 22:30:00'
                        }"
                        placeholder="任意时间点">
                      </el-time-picker>
                  </el-form-item>

                  

          <!--         <el-form-item label="下午最晚时间">
                     <el-time-picker
                        v-model="form.pmEndTimeOk"
                        :picker-options="{
                          selectableRange: '06:30:00 - 22:30:00'
                        }"
                        placeholder="任意时间点">
                      </el-time-picker>
                  </el-form-item> -->

                  <el-form-item label="下午开始时间">
                     <el-time-picker
                        v-model="form.pmStartTime"
                        :picker-options="{
                          selectableRange: '06:30:00 - 22:30:00'
                        }"
                        placeholder="任意时间点">
                      </el-time-picker>
                  </el-form-item>

                   <el-form-item label="下午结束时间">
                     <el-time-picker
                        v-model="form.pmEndTime"
                        :picker-options="{
                          selectableRange: '06:30:00 - 22:30:00'
                        }"
                        placeholder="任意时间点">
                      </el-time-picker>
                  </el-form-item>

                  
                </el-form>

              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="postData">确 定</el-button>
              </span>
            </el-dialog>

            <!-- 修改排班 -->
                <el-dialog
  
              :visible.sync="putDialog"
              width="570px"
              :before-close="handleClose">
                
                <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">修改排班</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="putDialog = false">
             </div>
          </div>
          <!-- Newtitle  end-->
              <div style="padding-left:20%;">
                  <el-form   >
                  <el-form-item label="排班班次名称">
                    <el-input  placeholder="班次名称" style="width:250px;" v-model="form.name"></el-input>
                  </el-form-item>

                  <el-form-item label="排班班次类型">
                   <el-select v-model="form.schedulingType" placeholder="请选择活动区域">
                          <el-option label="两班" value="2"></el-option>
                          <el-option label="四班" value="1"></el-option>
                        </el-select>
                  </el-form-item>

                <!--   <el-form-item label="上午最早时间">
                    <el-time-picker
                        v-model="form.amStartTimeOk"
                        :picker-options="{
                          selectableRange: '06:30:00 - 22:30:00'
                        }"
                        placeholder="任意时间点">
                      </el-time-picker>
                  </el-form-item> -->

                  <el-form-item label="上午开始时间">
                     <el-time-picker
                        v-model="form.amStartTime"
                        :picker-options="{
                          selectableRange: '06:30:00 - 22:30:00'
                        }"
                        placeholder="任意时间点">
                      </el-time-picker>
                  </el-form-item>

                  <el-form-item label="上午结束时间">
                     <el-time-picker
                        v-model="form.amEndTime"
                        :picker-options="{
                          selectableRange: '06:30:00 - 22:30:00'
                        }"
                        placeholder="任意时间点">
                      </el-time-picker>
                  </el-form-item>

                  

                 <!--  <el-form-item label="下午最晚时间">
                     <el-time-picker
                        v-model="form.pmEndTimeOk"
                        :picker-options="{
                          selectableRange: '06:30:00 - 22:30:00'
                        }"
                        placeholder="任意时间点">
                      </el-time-picker>
                  </el-form-item> -->

                  <el-form-item label="下午开始时间">
                     <el-time-picker
                        v-model="form.pmStartTime"
                        :picker-options="{
                          selectableRange: '06:30:00 - 22:30:00'
                        }"
                        placeholder="任意时间点">
                      </el-time-picker>
                  </el-form-item>

                   <el-form-item label="下午结束时间">
                     <el-time-picker
                        v-model="form.pmEndTime"
                        :picker-options="{
                          selectableRange: '06:30:00 - 22:30:00'
                        }"
                        placeholder="任意时间点">
                      </el-time-picker>
                  </el-form-item>

            

            
           



               
                  
                </el-form>

              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="putDialog = false">取 消</el-button>
                <el-button type="primary" @click="putData">确 定</el-button>
              </span>
            </el-dialog>

<!-- 删除提示 -->
            <el-dialog
                  
                  :visible.sync="deleteVisible"
                  width="30%"
                  :before-close="handleClose">
               
                <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">删除排班</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="deleteVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
                  <span >是否删除？</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteVisible = false">取 消</el-button>
                    <el-button type="primary" @click="Delete">确 定</el-button>
                  </span>
                </el-dialog>

                <el-dialog
                  
                  :visible.sync="paiBanVisible"
                  width="30%"
                  :before-close="handleClose">
              
                <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">排班</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="paiBanVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
                  <div style="margin-left:100px">
                       <span>是否为以下老师排班？</span>
                       <div>
                           <el-tag
                          :key="tag"
                          v-for="tag in teacherOptions"
                          closable
                          :disable-transitions="false"
                          @close="handleClose(tag)">
                          {{tag.name}}
                        </el-tag>
                       </div>

                  </div>
                 
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="paiBanVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sure">确 定</el-button>
                  </span>
                </el-dialog>
   </div>

</template>
<script>
    export default {
        data(){
            return {
              rowIndex:0,
                showSize: 10,
                current_page: 0,
                 currentPage:1,
                      pagesize:10,
                count: 100,
                paiBanVisible:false,
                teacherOptions:[],
                tableData:[],
                dialogVisible:false,
                deleteVisible:false,
                value2:new Date(),
                putDialog:false,
                rowId:'',
                userIds:'',
                options:[{
                    value: 2,
                    label: '两班'
                },{
                     value: 1,
                    label: '四班'
                }],
                value:'',
               
                form:{
                   
                    amStartTime:new Date(),
                    amEndTime:new Date(),
                    pmStartTime:new Date(),
                
                    pmEndTime:new Date(),
                    schedulingType:"",
                    name:'',
                    annual:0,
                    sick:0,
                    barth: 0,
                    barthWith: 0,
                    funeral: 0,
                    marry: 0,
                    loading2:true,

                }
                
            }
        },
        methods:{
            getData(){
                 this.$http({
                    method: 'get',
                    url:this.$getApi+'scheduling/management',                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res
                    this.loading2=false
                    console.log("===get grades====",body);
                    console.log("===get grades====",res);
                    var newData=[];
                    body.forEach(function(item, index, array){

                    
                          var amstarH=item.amStartTime[0]<10?'0'+item.amStartTime[0]:item.amStartTime[0];
                          var amstarM=item.amStartTime[1]<10?'0'+item.amStartTime[1]:item.amStartTime[1];
                          var amendH=item.amEndTime[0]<10?'0'+item.amEndTime[0]:item.amEndTime[0];
                          var amendM=item.amEndTime[1]<10?'0'+item.amEndTime[1]:item.amEndTime[1];
                          var pmstarH=item.pmStartTime[0]<10?'0'+item.pmStartTime[0]:item.pmStartTime[0];
                          var pmstarM=item.pmStartTime[1]<10?'0'+item.pmStartTime[1]:item.pmStartTime[1];
                          var pmendH=item.pmEndTime[0]<10?'0'+item.pmEndTime[0]:item.pmEndTime[0];
                          var pmendM=item.pmEndTime[1]<10?'0'+item.pmEndTime[1]:item.pmEndTime[1];
                        



                        newData.push({
                            id:item.id,
                            AMstart:amstarH +':'+ amstarM,
                            AMend:amendH+':'+ amendM,
                            PMstart:pmstarH+':'+pmstarM,
                            PMend:pmendH+':'+ pmendM,
                            name:item.name



                        })

                    });



 this.tableData=newData;
                    
                  

                  

                })
            },
            getData1(){
                var klassName = this.$store.state.cost
                        // this.tableData = localStorage.schools
                        // this.count = localStorage.schools.length;
                        console.log('+++++++    拿到的数据+++++++++',klassName);
                         if (klassName==undefined) {
                            this.paiBanVisible=false;
                             console.log('+++++++    qqqqqqqqqqqqqqqqqqqq+++++++++',klassName);
                        }
                        console.log('+++++++    拿到的数据1111+++++++++',klassName.cost[0].id);
                        this.target=klassName.cost[0].id
                        let counst=klassName.cost;
                       
                        // console.log('+++++++    拿到的数据**********',counst);
                        // for(var i=0;i<counst.length;i++){
                        //     console.log(counst[i]);
                        // }

                        if (klassName==undefined) {
                            this.paiBanVisible=false
                        }
                        var qwer = this.$store.state
                      console.log("guardian log is：",qwer )









                              var klassArray=[];
                          counst.forEach(function(item, index, array){
                               klassArray.push({name:item.name,id:item.teacherId})    
                          })
                             //this.value = klassesArray[0].value
                             this.teacherOptions = klassArray;
                             var str="";
                        for (var i = 0; i < counst.length; i++) {
                            console.log('12312312313123',counst[i].id) 
                            str += counst[i].id+ ",";
                        }
                        console.log('str',str)
                        this.userIds=str
                   
            },
             handleSizeChange: function (size) {
        this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },
            paiBan(index,row){
                this.paiBanVisible=true;
                  this.rowId=row.id
                
                this.$router.push({
              path: '/teachers'
            })
            },

            get(){
              //   // 转换时间格式为08：00 start
              //   console.log("111111",this.value2);
              //  var Hours=this.value2.getHours();
              // var newHours = (Hours>=10) ? Hours : "0"+Hours;
              //   this.value2.getMinutes();
              // var getDate=newHours+':'+this.value2.getMinutes()
              //   console.log('2222222222222222',getDate);
                // 转换时间格式为08：00 end
            

                    console.log('value',this.value)
                     this.$http({
                    method: 'get',
                    url:this.$getApi+'scheduling/management/queryByType?schedulingType='+this.value,                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                    console.log("===get grades====",body);
                    console.log("===get grades====",res);
                    var newData=[];
                    body.forEach(function(item, index, array){
                        newData.push({
                            id:item.id,
                            AMstart:item.amStartTime[0]+':'+item.amStartTime[1],
                            AMend:item.amEndTime[0]+':'+item.amEndTime[1],
                            PMstart:item.pmStartTime[0]+':'+item.pmStartTime[1],
                            PMend:item.pmEndTime[0]+':'+item.pmEndTime[1],
                            name:item.name



                        })

                    });



                     this.tableData=newData;
                    
                  

                  

                })













            },
            getPutId(index,row){
                this.putDialog=true,
                this.rowId=row.id
            },
            putData(){
                                    console.log(".........",this.form)


// amStartTime
                var Hours1=this.form.amStartTime.getHours();
              var newHours1 = (Hours1>=10) ? Hours1 : "0"+Hours1;
                this.form.amStartTime.getMinutes();
                 var Min1 = (this.form.amStartTime.getMinutes()>=10) ? this.form.amStartTime.getMinutes(): "0"+this.form.amStartTime.getMinutes();
              var getDate1=newHours1+':'+Min1
console.log('233333333333',getDate1);

// amEndTime
            var Hours2=this.form.amEndTime.getHours();
              var newHours2 = (Hours2>=10) ? Hours2 : "0"+Hours2;
                this.form.amEndTime.getMinutes();
                 var Min2 = (this.form.amEndTime.getMinutes()>=10) ? this.form.amEndTime.getMinutes(): "0"+this.form.amEndTime.getMinutes();
              var getDate2=newHours2+':'+Min2
console.log('23333333333311',getDate2);

// pmStartTime

                 var Hours3=this.form.pmStartTime.getHours();
              var newHours3 = (Hours3>=10) ? Hours3 : "0"+Hours3;
                this.form.pmStartTime.getMinutes();
                 var Min3 = (this.form.pmStartTime.getMinutes()>=10) ? this.form.pmStartTime.getMinutes(): "0"+this.form.pmStartTime.getMinutes();
              var getDate3=newHours3+':'+Min3
console.log('23333333333311',getDate3);


// pmEndTime
// 

 var Hours5=this.form.pmEndTime.getHours();
              var newHours5 = (Hours5>=10) ? Hours5 : "0"+Hours5;
                this.form.pmEndTime.getMinutes();
                 var Min5 = (this.form.pmEndTime.getMinutes()>=10) ? this.form.pmEndTime.getMinutes(): "0"+this.form.pmEndTime.getMinutes();
              var getDate5=newHours5+':'+Min5
console.log('pmEndTime',getDate5);

                var formData={
                   
                    'amStartTime':getDate1,
                    'amEndTime':getDate2,
                    'pmStartTime':getDate3,
                    'pmEndTime':getDate5,
                    'schedulingType':this.form.schedulingType,
                    'name':this.form.name,
                    'annual':this.form.annual*28800,
                    'sick':this.form.sick*28800,
                    "barth":this.form.barth*28800,
                    "barthWith": this.form.barthWith*28800,
                    "funeral": this.form.funeral*28800,
                    "marry": this.form.marry*28800,
                };
           
                console.log('12312312312',formData)




                   this.$http.put(
                    this.$getApi +'scheduling/management?schedulingId='+this.rowId,
                    formData,
                    {
                      headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token

                      }
                    }
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===add Student body=000000====",res.body);
                   
                   this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                    console.log('birthday');
                }).catch((res) =>{
                    // const {body} = res;
                    console.log("===add Student body=000000====",res.body);
                   
                   this.$message({
                      message: '修改失败',
                      type: 'error'
                    });
                    console.log('birthday');
                });
                this.getData();
                this.putDialog = false;
            },
            postData(){

                    console.log(".........",this.form)


// amStartTime
                var Hours1=this.form.amStartTime.getHours();
              var newHours1 = (Hours1>=10) ? Hours1 : "0"+Hours1;
                this.form.amStartTime.getMinutes();
                 var Min1 = (this.form.amStartTime.getMinutes()>=10) ? this.form.amStartTime.getMinutes(): "0"+this.form.amStartTime.getMinutes();
              var getDate1=newHours1+':'+Min1
console.log('233333333333',getDate1);

// amEndTime
            var Hours2=this.form.amEndTime.getHours();
              var newHours2 = (Hours2>=10) ? Hours2 : "0"+Hours2;
                this.form.amEndTime.getMinutes();
                 var Min2 = (this.form.amEndTime.getMinutes()>=10) ? this.form.amEndTime.getMinutes(): "0"+this.form.amEndTime.getMinutes();
              var getDate2=newHours2+':'+Min2
console.log('23333333333311',getDate2);

// pmStartTime

                 var Hours3=this.form.pmStartTime.getHours();
              var newHours3 = (Hours3>=10) ? Hours3 : "0"+Hours3;
                this.form.pmStartTime.getMinutes();
                 var Min3 = (this.form.pmStartTime.getMinutes()>=10) ? this.form.pmStartTime.getMinutes(): "0"+this.form.pmStartTime.getMinutes();
              var getDate3=newHours3+':'+Min3
console.log('23333333333311',getDate3);




// pmEndTime
// 

 var Hours5=this.form.pmEndTime.getHours();
              var newHours5 = (Hours5>=10) ? Hours5 : "0"+Hours5;
                this.form.pmEndTime.getMinutes();
                 var Min5 = (this.form.pmEndTime.getMinutes()>=10) ? this.form.pmEndTime.getMinutes(): "0"+this.form.pmEndTime.getMinutes();
              var getDate5=newHours5+':'+Min5
console.log('pmEndTime',getDate5);

                var formData={
               
                    'amStartTime':getDate1,
                    'amEndTime':getDate2,
                    'pmStartTime':getDate3,
        
                    'pmEndTime':getDate5,
                    'schedulingType':this.form.schedulingType,
                    'name':this.form.name,
                    'annual':this.form.annual*28800,
                    'sick':this.form.sick*28800,
                    "barth": this.form.barth*28800,
                    "barthWith": this.form.barthWith*28800,
                    "funeral": this.form.funeral*28800,
                    "marry": this.form.marry*28800,
                };
                 
             
                console.log('12312312312',formData)




                   this.$http.post(
                    this.$getApi +'scheduling/management',
                    formData,
                    {
                      headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token

                      }
                    }
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===add Student body=000000====",res.body);
                   

                    this.getData();
                     this.open2();
                    console.log('birthday');
                    this.dialogVisible = false;
                }).catch((res) =>{
                    this.$message({
                      message: '失败，',
                      type: 'error'
                    }); 
                });
                
            },
             open2() {
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        },      open3() {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        },
        open3() {
          this.$message({
            message: '添加失败',
            type: 'error'
          });
        },
              handleDelete(index,row){
                this.deleteVisible=true
                console.log(row.id)
                this.rowId=row.id
                this.rowIndex=index
                console.log(index)

            },
            Delete(){
                
                     this.$http({
                    method: 'delete',
                    url:this.$getApi+'scheduling/management/'+this.rowId ,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                
                    
                    const {
                        body
                    } = res
                      
                     this.tableData.splice(this.rowIndex, 1);

                    console.log("===res students===",res.body);
                     this.$message({
                      message: '删除成功',
                      type: 'success'
                       }); 
                    }).catch((res) =>{
                    this.$message({
                      message: '删除失败',
                      type: 'error'
                    }); 
                });

                  

              
               
                this.deleteVisible=false;
            },
            sure(){

                   this.$http.post(
                    this.$getApi +'scheduilingPerson/management',
                    {
                        "schedulingId": this.rowId,
                        "userIds":this.userIds
                    },
                    {
                      headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token

                      }
                    }
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===add Student body=000000====",res.body);
                    this.$message({
                      message: '排班成功',
                      type: 'success'
                    });
                    this.getData();
                    console.log('birthday');
                }).catch((res) =>{
                    this.$message({
                      message: '排班失败，请确认当前老师中是否有排班',
                      type: 'error'
                    }); 
                });
                this.paiBanVisible=false;
            },
        },
        mounted(){
            this.getData();
        },
        activated(){
            this.getData1()
        }
    }
</script>
<style>
    
</style>