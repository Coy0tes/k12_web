<template>
    <div class="picture" v-loading="loading2"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">

        <div class="line">
             <div style="width:84%; height:50px;margin-top:s0px;margin-bottom:10px;margin-left:-10px; padding-right:25px; line-height:40px; position: fixed;
  z-index: 100">
                <el-button type="primary" @click="dutyDialog=true" style="margin-left:10px;margin-top:5px;">职务安排</el-button>
                <!-- <el-button type="primary" @click="dutyPut1" style="margin-left:10px;margin-top:5px;">职务安排11</el-button> -->
                <el-button type="primary" @click="showDialog" style="float:right;margin-top:5px;  margin-left:72.8%;">邀请老师</el-button>
            </div>
            <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%; margin-top:50px;" ref="multipleTable" border :header-cell-class-name="tableheaderClassName" @selection-change="changeFun">
               <el-table-column
                  type="selection"
                  width="55"
                  v-show='false'
                  class="chacked">
                </el-table-column>
                <el-table-column prop="teacherId" align="center"  label="教师ID" width="100">
                </el-table-column>
                <el-table-column prop="name" align="center" label="姓名">
                </el-table-column> 
                <el-table-column prop="duty" align="center" label="职务">
                </el-table-column>
                <el-table-column prop="mobile" align="center" label="联系方式">
                </el-table-column>
                <el-table-column prop="klass" align="center" label="任命班级">
                </el-table-column>


                <el-table-column label="操作" width="450" align="center">
                    <template scope="scope">
                        <el-button size="small" type="primary" class="rmbtn" @click="getduit(scope.$index, scope.row)">分配职务</el-button>
                        <el-button size="small" type="primary" class="rmbtn" @click="getduit2(scope.$index, scope.row)">分配班级</el-button>
                        
                        <el-button size="small" type="success" @click="getduit1(scope.$index, scope.row)">指定上下级</el-button>

                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
             
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
             <!-- <el-button type="primary" @click="dutyPut111" style="margin-left:10px;margin-top:5px;">职务安排11</el-button> -->
        </div>

        <div class="line pr">
            <!-- <el-button type="primary" @click="showDialog">邀请老师</el-button> -->


        </div>

<!-- 任命职务 -->
         <el-dialog :visible.sync="appointDialog" :before-close="handleClose(appointDialog)" class="dialogSzie" style="padding-bottom:30px;" width="960px">
        
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">任命职务</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="appointDialog = false">
             </div>
          </div>
          <!-- Newtitle  end-->
          
<div style="margin-left:15%;margin-bottom:30px;">
    
    为{{rowName}}老师分配职务：
             <el-select
                v-model="value10"
            
                filterable
                allow-create
                default-first-option
                placeholder="请输入职务">
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

<!-- <el-button type="primary" @click="ket">添加</el-button> -->
<el-button type="primary" @click="putduty">修改/任命</el-button>
<el-button type="danger" @click="deleteDUty">去掉职务</el-button>


</div>
            
<span slot="footer" class="dialog-footer">
    <el-button @click="appointDialog = false">取 消</el-button>
    <el-button type="primary" @click="dutyPut">确 定</el-button>
  </span>
        </el-dialog>  

        <!-- 指定上下级 -->
         <el-dialog :visible.sync="addLeadDialog" :before-close="handleClose(addLeadDialog)" class="dialogSzie" style="padding-bottom:30px;">
        

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">指定上下级</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="addLeadDialog = false">
             </div>
          </div>
          <!-- Newtitle  end-->
<div style="margin-left:35%;margin-bottom:30px;">
     指定上级领导：<el-button @click="goTo">选择老师</el-button>
   
            <el-tag
              :key="tag"
              v-for="tag in teacherOptions"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag.name}}
            </el-tag>

<!-- <el-button type="primary" @click="ket">添加</el-button>
<el-button type="primary" @click="putduty">修改</el-button>
<el-button type="danger" @click="deleteKet">删除</el-button>
 -->

</div>
            
<span slot="footer" class="dialog-footer">
    <el-button @click="addLeadDialog = false">取 消</el-button>
    <el-button type="primary" @click="assign">确 定</el-button>
  </span>
        </el-dialog>   


          <el-dialog :visible.sync="dutyDialog" :before-close="handleClose(dutyDialog)" class="dialogSzie" style="padding-bottom:30px;">
           <!--       <div class="top">
             <span class="top_text">职务安排</span>
             <img src="../../../assets/close3.png" height="48" width="48" class="add_close"@click="dutyDialog = false">
          </div> -->
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">职务安排</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dutyDialog = false">
             </div>
          </div>
          <!-- Newtitle  end-->
<div style="margin-left:20%;margin-bottom:30px;">
    
    职务名称：
             <el-select
                v-model="value10"
            
                filterable
                allow-create
                default-first-option
                placeholder="请选择文章标签">
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <br>
              是否基层职务：
              <el-radio v-model="radio1" label="1">是</el-radio>
              <el-radio v-model="radio1" label="2">否</el-radio>

<el-button type="primary" @click="ket" style="margin-left:100px;">添加</el-button>
<!-- <el-button type="primary" @click="putduty">修改</el-button> -->





</div>
<div style="width:530px;margin-left:20%;">
    <el-table
    :data="options5"
    border
    
    style="width: 100%">
    <el-table-column
      prop="value"
      label="职务ID"
     >
    </el-table-column>
    <el-table-column
      prop="label"
      label="职务名称">
    </el-table-column>
    <el-table-column
      prop=""
      label="操作">
      <template scope="scope">
          <el-button type="danger" size="small" @click="deleteKet(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
 
  </el-table>
</div>
            
<span slot="footer" class="dialog-footer">
    <el-button @click="dutyDialog = false">取 消</el-button>
    <el-button type="primary" @click="dutyDialog = false">确 定</el-button>
  </span>
        </el-dialog>



        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose(dialogVisible)"   width="638px" class="dialogSzie">
            <!--     <div class="top">
             <span class="top_text">邀请老师</span>
             <img src="../../../assets/close3.png" height="48" width="48" class="add_close"@click="dialogVisible = false">
          </div>
 -->
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">邀请老师</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
                <el-switch
                  v-model="value3"
                  active-text="邀请管理员"
                  inactive-text="邀请老师"
                  style="margin-left:150px;margin-bottom:30px;"
                  @change="swich">
                </el-switch> 
                <el-switch
                  v-model="value20"
                  active-text="入职"
                  inactive-text="试用"
                  style="margin-left:50px;margin-bottom:30px;"
                  @change="swich1"
                  >
                </el-switch> 
                  
        <br>
                  
              <el-switch
                  v-model="value19"
                  active-text=" 有毕业证"
                  inactive-text="没有毕业证"
                  style="margin-left:150px;margin-bottom:30px;"
                  >
                </el-switch>
    

                <el-switch
                  v-model="value21"
                  active-text="毕业"
                  inactive-text="在校"
                  style="margin-left:50px;margin-bottom:30px;"
                  >
                </el-switch>
                <br>
            <el-form ref="form" :model="form" label-width="80px" style="margin-left:120px;">
                <el-form-item label="手机号" style="width:360px;">
                    <el-input v-model="mobile"></el-input>
                </el-form-item>
                <el-form-item label="姓名" style="width:360px;">
                    <el-input v-model="username"></el-input>
                    </el-input>
                </el-form-item>

                <el-form-item label="薪资" style="width:360px;">
                    <el-input v-model="paymoney"></el-input>
                    </el-input>
                </el-form-item> 
                <el-form-item label="试用期" style="width:360px;">
                    <el-input v-model="probation"></el-input>
                    </el-input>
                </el-form-item> 

                <el-form-item label="职务" style="width:360px;" v-show="dutyShow">
                    <el-select v-model="value10" placeholder="请选择" style="width: 280px;">
                    <el-option
                      v-for="item in options5"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                     </el-select>
                </el-form-item>

                <el-form-item label="班级" style="width:360px;" v-show="dutyShow">
                    <el-select v-model="value12" placeholder="请选择" style="width: 280px;">
                    <el-option
                      v-for="item in options11"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                     </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="isAdd(1)" >关 闭</el-button>
                <el-button @click="isAdd(0)" type="primary">确 定</el-button>
            </span>

        </el-dialog>


        <el-dialog title="年级操作" :visible.sync="GradeDialog" :before-close="handleClose(GradeDialog)" class="dialogSzie">

            <el-form ref="form" :model="form" label-width="80px">

                <el-form-item label="学校">
                     {{this.teacherName}}
                  </el-form-item>

                <el-form-item label="">
                    <div v-for="(item,index) in gradeList">
                        <div class="grade">年级：{{item.name}}，描述： {{item.description}} <span class="del" @click="resetGrade(index)">X</span></div>
                    </div>
                </el-form-item>

                <el-form-item label="新增">
                    <div class="line">
                        <el-input v-model="newGrade" placeholder="请输入年级"></el-input>
                    </div>
                    <div class="line">
                        <el-input v-model="newDescription" placeholder="请输入描述"></el-input>
                    </div>
                    <div class="line">
                        <el-button type="primary" @click="addGrade">确定</el-button>
                    </div>
                </el-form-item>
            </el-form>



            <span slot="footer" class="dialog-footer">
                <el-button @click="GisAdd(1)" >关 闭</el-button>
                <el-button @click="GisAdd(0)" type="primary">确 定</el-button>
            </span>

        </el-dialog>
        <el-dialog
        
          :visible.sync="deleteTeacherVisible"
          width="30%"
          :before-close="handleClose">
             <!-- <div class="top">
             <span class="top_text">删除</span>
             <img src="../../../assets/close3.png" height="48" width="48" class="add_close"@click="deleteTeacherVisible = false">
          </div> -->

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">删除</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="deleteTeacherVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
          <span style="margin-left:20px;">是否删除这位老师？</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="deleteTeacherY">是</el-button>
            <el-button @click="deleteTeacherVisible = false">否</el-button>
            
          </span>
        </el-dialog>


              <el-dialog
        
          :visible.sync="deleteTeacherVisible"
          width="30%"
          :before-close="handleClose">
             <!-- <div class="top">
             <span class="top_text">删除</span>
             <img src="../../../assets/close3.png" height="48" width="48" class="add_close"@click="deleteTeacherVisible = false">
          </div> -->

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">删除</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="deleteTeacherVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
          <span style="margin-left:20px;">是否删除这位老师？</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="deleteTeacherY">是</el-button>
            <el-button @click="deleteTeacherVisible = false">否</el-button>
            
          </span>

        </el-dialog>

        <!-- 任命班级 -->
               <el-dialog :visible.sync="appointDialog1" :before-close="handleClose(appointDialog1)" class="dialogSzie" style="padding-bottom:30px;">
                 <div class="top">
             <span class="top_text">任命班级</span>
             <img src="../../../assets/close3.png" height="48" width="48" class="add_close"@click="appointDialog1 = false">
          </div>
<div style="margin-left:35%;margin-bottom:30px;">
    
    班级名称：
             <el-select
                v-model="value12"
            
                filterable
                allow-create
                default-first-option
                placeholder="请选择班级">
                <el-option
                  v-for="item in options11"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>  
<br>


<!-- <el-button type="primary" @click="ket">添加</el-button> -->




</div>
            
<span slot="footer" class="dialog-footer">
 
    <el-button type="primary" @click="dutyPut2">确 定</el-button>
  </span>
        </el-dialog> 
<!-- 教师打卡 -->
    <!--     <el-dialog
              title="打卡"
              :visible.sync="putCardDialog"
              width="30%"
              :before-close="handleClose">
              <div>
                   <span>是否打卡（补签）</span>
                  <el-button type="primary" @click="putCardY">打卡</el-button>
                    <el-button type="success" @click="putCardAgain">补签</el-button>

              </div>
             
              <span slot="footer" class="dialog-footer">
                <el-button @click="putCardDialog = false">取 消</el-button>
                <el-button type="primary" @click="putCardDialog = false">确 定</el-button>
              </span>
            </el-dialog> -->

    </div>

</template>

<script>
    export default {
        name: 'picture',
        data() {
            return {
                dutyShow:true,
                loading2:true,
                rowName:'',
                teacherOptions:[],
                addLeadDialog:false,
                dutyDialog:false,
                putCardDialog:false,
                value11:'',
                value12:'',
                options5:[],
                value10:'',
                deleteTeacherIndex:0,
                deleteTeacherId:0,
                deleteTeacherVisible:false,
                tableData: [],
                teacherId:"",
                teacherName: "",

                dialogVisible: false, // 学校
                dialogUsage: 0, // 0 新增 1编辑
                dialogIndex: '',

                klassValue:'',
                courseValue: '',

                appointDialog: false, //任命老师
                appointDialog1: false, //任命班级
                klassOptions: [],
                courseOptions: [],

                GradeDialog: false, // 年级 
                GradeUsage: 0, // 0 新增 1编辑
                GradeIndex: '',

                isResetG: false, // dialog内修改年级


                showSize: 10,
                current_page: 0,
                 currentPage:1,
                      pagesize:10,
                count: 100,

                form: {
                    name: '',
                    description: '',
                },

                gradeList: [],

                newGrade: '',
                newDescription: '',

                mobile:'',
                username:'',
                rowTeacherId:0,
                dutyId:0,
                actorid:0,
                radio1:"1",
                value3:"",
                value19:"",
                value20:"",
                value21:"",
                dutyTeacherId:'',
                paymoney:0,
                probation:0,
            }
        },
        watch: {
            current_page(now, old) {
                this.getData();
                this.initCourse();
            },
        },
        methods: {
              gaveKlass(){

              },
              getduit2(index,row){
                this.appointDialog1 = true;
                this.rowTeacherId=row.teacherId;
                this.dutyId=row.dutyid
                this.dutyTeacherId=row.teacherId
              },
            test(){
                 this.$http({
                                method: 'get',
                                url: this.$getApi+'processNode/management',

                                headers: {
                                    'Authorization': 'Bearer '+ localStorage.token

                                }
                            }).then((res) => { // promise对象
                                const {
                                    body
                                } = res

                                console.log("===res getCoursesData===",res.body);

                    
                                    })

            },
            goTo(){
                this.$router.push({
              path: '/ledarTeacher'
            })
            },
              
             tableheaderClassName({ row, rowIndex }) {
          return "table-head-th";
        },
            message() {
                this.$message('这是一条消息提示');
            },
            getduit(index,row){
                this.appointDialog = true;
                this.rowTeacherId=row.teacherId;
                this.dutyId=row.dutyid
                this.rowName=row.name
            
                console.log('++++++++++++++++',row)

            }, getduit1(index,row){
               
                this.rowTeacherId=row.teacherId;
             
            
                console.log('++++++++++++++++',row)
                this.addLeadDialog=true
            },
            
            // 指定上下级
        assign(){
               this.$http.put(
                 
                    this.$getApi+'employee/management/'+this.rowTeacherId +'?actorId='+this.actorid,//还没写，
                    
                       {
                          "actorId": this.rowTeacherId,
                          "dutyId": this.value10
                        },
                    
                    {
                      headers:{
                      
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===body=add==teacher====",res);
                    this.$message({
                      message: '指定成功',
                      type: 'success'
                    }); 
                   
                }).catch((res) =>{
                    this.$message({
                      message: '指定失败，',
                      type: 'error'
                    }); 
                })
            this.addLeadDialog = false
        },
          changeFun:function(val){




                 this.multipleSelection = val;
                
                console.log('-----------------',this.multipleSelection)

                    var newsArry=[];
                    this.multipleSelection.forEach(function(item, index, array){
                        newsArry.push({name:item.name,id:item.teacherId,klassId:item.klassId,dutyid:item.dutyid,duty:item.id})

                    })
                    console.log(newsArry);
                    console.log(this.multipleSelection)

                        this.$store.commit('nameOpt',{cost:newsArry});

                  
                 
                         if (this.multipleSelection.length) {
                          this.addSth=true
                          this.backTo=false
                       }else if (!!this.multipleSelection.length) {
                           this.addSth=false
                          this.backTo=true
                       }




            },
        putCard(row){
            console.log('wwwwwwwwwwwwwwwwww',row);
            // alert("1231231231")
            this.putCardDialog=true
        },  
        putCardY(){




                      this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'management/attendancesTeachers',
                    {},
                      
                    
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
                      message: '成功',
                      type: 'success'
                    });
                    // this.getData();
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });

















               // this.$http.put(
               //      //'http://k12soft.vwico.com:8080/management/kindergartens/',
               //      this.$getApi+'management/attendancesTeachers',
                    
               //         {
               //              "actorId": 0,
               //              "annual": 0,
               //              "attendanceTeacherId": 0,
               //              "desc": "string",
               //              "endTime": 0,
               //              "portrait": "string",
               //              "retroType": "SICK",
               //              "sick": 0,
               //              "startTime": 0,
               //              "temperature": 0
               //         },
                    
               //      {
               //        headers:{
               //          // 'content-type': "multipart/form-data",
               //          'Content-Type': 'application/json',
               //          'Authorization': 'Bearer '+ localStorage.token

               //        }
               //      }
               //  ).then((res) =>{
               //      // const {body} = res;
               //      console.log("===body=add==teacher====",res);
               //      // this.getData();
               //  })
        },
        putCardAgain(){



               this.$http.put(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'management/attendancesTeachers',
                    
                       {
                          "actorId": 1112,
                          "annual": 515,
                          "attendanceTeacherId": 1112,
                          "desc": "string",
                          "endTime": 0,
                          "portrait": "string",
                          "retroType": "AFFAIR",
                          "sick": 0,
                          "startTime": 0,
                          "temperature": 0
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
                      message: '成功',
                      type: 'success'
                    });
                    // this.getData();
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });










        },
            putduty(){

                      this.$http.put(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'/employee/management/updateDuty?id='+this.dutyId,
                    
                       {
                          "actorId": this.rowTeacherId,
                          "dutyId": this.value10
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
                      message: '修改/任命成功',
                      type: 'success'
                    }); 
                    
                }).catch((res) =>{
                    this.$message({
                      message: '修改/任命失败，',
                      type: 'error'
                    }); 
                })

                this.appointDialog=false
            },
            deleteDUty(){


                      this.$http({
                    method: 'delete',
                    url:this.$getApi+'employee/management/delete/'+this.rowTeacherId,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                
                    
                    const {
                        body
                    } = res
                      
                       this.$message({
                      message: '成功',
                      type: 'success'
                    });

                    console.log("===res students===",res.body);
                    console.log("===this.rowTeacherId===",this.rowTeacherId);


                  

                  

                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });
                this.getData();
                this.appointDialog = false
            },
            dutyPut(){




                      this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'employee/management',
                    
                       {
                          "actorId": this.rowTeacherId,
                          "dutyId": this.value10
                        },
                    
                    {
                      headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                  this.$message({
                      message: '成功',
                      type: 'success'
                    });
                    // const {body} = res;
                    this.getData();
                    console.log("===body=add==teacher====",res);
                    // this.getData();
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    }); 
                    this.getData();
                })








                    this.getData();
                this.appointDialog = false;
               
            },  dutyPut1(){




                      this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'ProceaaType/management',
                    
                       {
                         "name": "审批流程"
                        },
                    
                    {
                      headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                  this.$message({
                      message: '成功',
                      type: 'success'
                    });
                    // const {body} = res;
                    this.getData();
                    console.log("===body=add==teacher====",res);
                    // this.getData();
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    }); 
                    this.getData();
                })








                    this.getData();
                this.appointDialog = false;
               
            },
            dutyPut(){



                      this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'management/teachings',
                    
                       {
                          "courseId": 1,
                          "klassId": this.value10,
                          "teacherId": this.dutyTeacherId
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
                    // this.getData();\
                       this.$message({
                      message: '任命成功',
                      type: 'success'
                    });
                }).catch((res) =>{
                    this.$message({
                      message: '任命失败',
                      type: 'error'
                    });
                     })








                    this.getData();
                this.appointDialog1 = false;
            },
            ket(){
                console.log('11111111',this.value10)
                var burl=''
                if (this.radio1=="1") {
                  burl ='TRUE'
                  console.log(burl)
                }else if (this.radio1=="2") {
                   burl ='FALSE'
                    console.log(burl)
                }



                      this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'/duty/management',
                    
                       [
                          {
                            "isSubstratum": burl,
                            "name": this.value10
                          }
                        ],
                    
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
                      message: '成功',
                      type: 'success'
                    }); 
                         this.getData();
                        this.dutyDialog=false
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    }); 
                    this.getData();
                })






                













            },
            deleteKet(index,row){
              console.log(row)
                        this.$http({
                    method: 'delete',
                    url:this.$getApi+'duty/management/'+row.value,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                
                         this.$message({
                      message: '删除成功',
                      type: 'success'
                    }); 
                         this.options5.splice(index, 1);
                         console.log('```````````````````',index)

                    const {
                        body
                    } = res
                      
              
              

                    console.log("===res students===",res.body);

                    this.dutyDialog=false
                  

                  

                }).catch((res) =>{
                    this.$message({
                      message: '失败，此职位有人任命',
                      type: 'error'
                    }); 
                })
                this.getData();
            },
            getData() {
                // console.log("132165465146516516==============" , localStorage.token);
                // console.log("132165465146516516==============" , localStorage.schoolsId);
                // console.log("132165465146516516==============" , JSON.parse(localStorage.actor).school.id);

                this.$http({
                    method: 'get',
                    // url: 'https://k12.vwico.com/management/teachers?schoolId='+JSON.parse(localStorage.actor).school.id,
                    url:this.$getApi+ 'employee/management/queryAll',
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token
                       

                    }
                }).then((res) => { // promise对象
                    console.log('===============hello;===============');
                    const {body} = res
                    this.loading2=false
                    console.log("====get teachersbody111111111 ======",res.body);
                    console.log("====get teachersbody ======",res);

                    

console.log('=========token+schoolsId=====================',localStorage.token);
console.log('=========token+schoolsId=====================',localStorage.schoolsId);
                var bodyDate=[];
                    for (var i = 0; i < res.body.length; i++) {
                      if(res.body[i].duty==null){
                          res.body[i].duty={id:'',name:''}
                          console.log(res.body[i])
                      }else if(res.body[i].teachings==[]||res.body[i].teachings=="null"){
                        res.body[i].teachings=[{klass:{name:''}}]
                       
                      }else{
                           res.body[i].duty=res.body[i].duty
                           res.body[i].teachings=res.body[i].teachings
                      }
                    }
                    
                    var teacherArray=[];
                    res.body.forEach(function(item, index, array){
                        teacherArray.push({ 
                          teacherId: item.actorId, 
                          name: item.userName, 
                          mobile: item.mobile,
                          duty: item.duty.name,
                          dutyid: item.duty.id,
                          klass:item.klassName
                        })
                        // console.log("duty",item.duty.name)  //问题在次/////////////////////////////////////
                        
                    }) 
                    this.tableData = teacherArray

                    console.log("------teacherArray------",teacherArray);


                });
                  this.$http({
                    method: 'get',
                    url:this.$getApi+'duty/management/queryAll',                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                    console.log("===get grades====",body);
                    var newData=[];

                    body.forEach(function(item,index,array){
                        newData.push({
                            value:item.id,
                            label:item.name
                        })
                    })

                    this.options5=newData;

                    console.log("===duty/management====",newData);

                  

                  

                })

                      this.$http({

                    method: 'get',
                    url: this.$getApi+'management/klasses',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("=====get classes111111aaaaaaaaaaaaa===",res.body); 
                    var klasssArray=[];                     
                 res.body.forEach(function(item, index, array){
                                                           klasssArray.push({
                                                            label:item.name,
                                                            value:item.id,
                                                        


                                                        })    
                                                      })
                 this.options11=klasssArray
                 
                })

              


            },
            getData1(){
                   var klassName = this.$store.state.cost
                        // this.tableData = localStorage.schools
                        // this.count = localStorage.schools.length;
                        console.log('+++++++    拿到的数据+++++++++',klassName);
                         this.actorid=klassName.cost[0].id

                        console.log('+++++++    拿到的数据1111+++++++++',klassName.cost[0].id);
                        this.target=klassName.cost[0].id
                        let counst=klassName.cost;
                       
                        // console.log('+++++++    拿到的数据**********',counst);
                        // for(var i=0;i<counst.length;i++){
                        //     console.log(counst[i]);
                        // }


                        var qwer = this.$store.state
                      console.log("guardian log is：",qwer )









                              var klassArray=[];
                          counst.forEach(function(item, index, array){
                               klassArray.push({name:item.name,id:item.teacherId})    
                          })
                             //this.value = klassesArray[0].value
                             this.teacherOptions = klassArray;


            },
            initCourse(){
                console.log("------initCourseinitCourse------")
                 this.$http({
                                method: 'get',
                                url: this.$getApi+'management/courses',

                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.token

                                }
                            }).then((res) => { // promise对象
                                const {
                                    body
                                } = res

                                console.log("===res getCoursesData===",res.body);

                                if (!!body.length) {
                                    
                                      var courseArray=[];
                                      res.body.forEach(function(item, index, array){
                                           courseArray.push({value:item.id,label:item.name})    
                                      })
                                         //this.courseValue = courseArray[0].value;
                                         this.courseOptions = courseArray;
                                            
                                        } else {
                                            alert('err:' + body)
                                        }
                                    })
            },
            handleClose(dialogName) {
                this[dialogName] = false
            },
            showDialog(path) {
                // this.path = path

                this.form.name = ''
                this.form.description = ''

                this.dialogVisible = true;
                this.appointDialog = false;
                this.dialogUsage = 0

            },
               handleSizeChange: function (size) {
        this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },
            // handleCurrentChange(val) {
            //     this.current_page = val
            // },
            handleEdit(index, row) {


                this.dialogVisible = false;
                this.appointDialog = true;
                this.dialogIndex = index;
                this.teacherId = row.teacherId;
                this.teacherName = row.name;
                this.form = Object.assign({}, row);

                            this.$http({
                                method: 'get',
                                url: this.$getApi+'management/klasses',

                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.token

                                }
                            }).then((res) => { // promise对象
                                const {
                                    body
                                } = res

                                console.log("===res getKlassData===",res.body);

                                    if (!!body.length) {
                                    
                                      var klassArray=[];
                                      res.body.forEach(function(item, index, array){
                                           klassArray.push({value:item.id,label:item.name})    
                                      })
                                         //this.klassValue = klassArray[0].value;
                                         this.klassOptions = klassArray;

                                          this.$http({
                                                method: 'get',
                                                url: this.$getApi+'management/courses',

                                                headers: {
                                                    'Authorization': 'Bearer ' + localStorage.token

                                                }
                                            }).then((res) => { // promise对象
                                                const {
                                                    body
                                                } = res

                                                console.log("===res getCoursesData===",res.body);

                                                if (!!body.length) {
                                                    
                                                      var courseArray=[];
                                                      res.body.forEach(function(item, index, array){
                                                           courseArray.push({value:item.id,label:item.name})    
                                                      })
                                                         //this.courseValue = courseArray[0].value;
                                                         this.courseOptions = courseArray;
                                                            
                                                        } else {
                                                            alert('err:' + body)
                                                        }
                                                    })
                                            
                                        } else {
                                            alert('err:' + body)
                                        }
                                    })

            },
            handleDelete(index, row) {
                // this.tableData.splice(index, 1)
                this.deleteTeacherIndex=row.index
                this.deleteTeacherId=row.teacherId
                console.log(index);
                this.deleteTeacherVisible=true;

            },
            deleteTeacherY(){
                 this.tableData.splice(this.deleteTeacherIndex, 1);

                     this.$http({
                    method: 'delete',
                    url:this.$getApi+'management/teachers/'+this.deleteTeacherId ,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                
                    
                    const {
                        body
                    } = res
                      
                    this.$message({
                      message: '删除成功',
                      type: 'success'
                    }); 

                    console.log("===res students===",res.body);


                    if (!!body.length) {
                        this.tableData = body.content
                        this.count = body.length
                    } else {
                        // alert('err:' + body)
                    }

                  

                }).catch((res) =>{
                    this.$message({
                      message: '失败，',
                      type: 'error'
                    }); 
                })
                  this.deleteTeacherVisible=false;
            },
            dutyPut111(){
              
                       this.$http.get(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'employee/management/queryAll',
                  
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
            
                })
            },
            swich(){
              if (this.value3) {
                this.dutyShow=false
                console.log("true",this.value3)
              }else{
                  this.dutyShow=true
              }
            }, 
             swich1(val){
              
               if (this.value20) {
                console.log("true",val)
              }else{
                   console.log("false",val)
              }
            },
            isAdd(tag) { // 0 添加    1 取消  2 任命老师
                this.dialogVisible = false;
                this.appointDialog = false;
                console.log("value3",this.value3)
                if (this.value3&&tag === 0) {
                    
                        this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'management/invitations/manager',
                    {
                        "mobile": this.mobile,
                        "username": this.username,
                       
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
                      message: '成功',
                      type: 'success'
                    });
                    
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });






                }else{
                  
                if (tag === 0 && (this.value3==false)) {
                   this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'management/invitations/teacher/test?dutyId='+this.value10,
                    {
                        "mobile": this.mobile,
                        "username": this.username,
                        "joinTime":'0',
                          "isGraduate": this.value21,
                          "isOfficial": this.value20,
                  
                    
                          "probation": this.probation,
                          "salary": this.paymoney,
                      
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
                }

                if (tag === 2 ) {

                    console.log("===this.klassValue====",this.klassValue);
                    console.log("===this.courseValue====",this.courseValue);

                    this.$http.post(
                    this.$getApi+'management/teachings',
                     {
                        "klassId": this.klassValue,
                        "courseId": this.courseValue,
                        "teacherId": this.teacherId
                    },
                    {
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }
                      
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===body=teacheing==body==",res.body);
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
                }

                if (tag === 0 && this.dialogUsage == 1) {
                    this.$http.put(
                     this.$getApi+'management/kindergartens/' + this.teacherId,
                     {
                        "description": this.form.description,
                        "name": this.form.name
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
                }
                }




                this.form = {}

            },
            GisAdd(tag) { // 0 添加    1 取消
                this.GradeDialog = false
            },
            addItem() {
                this.$http({
                    method: 'post',
                    url: this.$getApi + '/image/add_extend',
                    params: {
                        // urls: this.checkList
                    },
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

               
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });

                        alert('err:' + body.meta.message)
                        this.$message({
                            message: '添加失败：' + body.meta.message,
                            type: 'error'
                        });
                    

                }).catch((res) =>{
                    this.$message({
                      message: '审核失败',
                      type: 'error'
                    });
                });
            },
            editGrade(index, row) {
                this.GradeDialog = true
                this.teacherName = row.name
                this.newKgId = row.id
                this.gradeId = 1


                this.$http({
                    method: 'get',
                    url:this.$getApi+'management/grades?kgId='+this.gradeId,                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                    console.log("===get grades====",body);

                    if(!res.ok){
                        alert('err res:' + res)
                    }

                    if (!!body.length) {
                        this.gradeList = body

                    } else {
                        this.gradeList = []
                    }

                })


            },
            resetGrade(index) {
                this.isResetG = true

                this.gradeList.splice(index, 1)

            },
            addGrade() {

                let _this = this
                this.$http.post(
                    this.$getApi+'management/grades/',
                    //this.$getApi+'management/grades',
                    {
                        "description": this.newDescription,
                        "name": this.newGrade,
                        "kindergartenId": _this.newKgId
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
                    console.log("===add grades=res====",res);
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

                // this.gradeList.push({
                //     grade: this.newGrade,
                //     description: this.newDescription

                // })
                this.newGrade = ''
                this.newDescription = ''
            }
        },
        beforeMount() {

        },
        mounted() {
            this.getData()

        },
        activated(){
            // this.getData1()
        }
    }
</script>
<style>
    /*#mainContent {*/
    /*width: 1000px;*/
    /*margin: 10px;*/
    /*}*/
    .el-table td{
        border:1px solid #9ed0f6;
    }
    .el-table--border,.el-table--border{
        border:1px solid #9ed0f6;
    }
    .el-table--border td, .el-table--border th{
        font-family: "思源黑体";
        font-size: 16px;
        /*border-right: red;*/
    }
    .picture {
        /*margin-left: 10px;*/
        width: 100%;
        height: 100%;
    }

    .line {
        padding: 10px;
    }

    .pr {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .line .el-pagination {
        padding: 0;
        display: inline-block;
    }

    .imgStyle {
        display: block;
        width: 500px;
        height: auto;
        margin: 10px auto;
    }

    .preImg {
        display: block;
        width: 100px;
        height: auto;
        margin: 0 auto;
    }

    .del {
        padding: 5px;
        color: red;
        cursor: pointer;
        transition: all .3s;
    }

    .del:hover {
        background: #333;
    }

    .grade {
        padding: 4px;

        /*border: 1px solid #33cccc;*/
    }
    .picture{
        background-color: #e6edf5;
    }
    .header-row-class-name{
        background-color: red;
    }
    .el-table__header-wrapper thead div {
        background-color:#9ed0f6;
    }
    .el-table th{
         background-color:#9ed0f6;
    }
    .el-table .table-head-th{
        /*background-color:red;*/
        
    }
  

</style>