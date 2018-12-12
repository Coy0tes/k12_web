<template>
    <div class="picture" v-loading="loading2"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">

        <!-- <div class="line">
            <el-button type="primary" @click="showDialog">新增班级</el-button>
        </div> -->

        <div class="line">
          
           <div style="width:103.5%; height:40px; background-color:#fff;margin-top:-10px;margin-bottom:10px;margin-left:-40px; padding-right:25px; line-height:40px; padding-top:5px; ">
            <el-button type="primary" @click="showDialog" style="float:right; margin-right:-5px;">新增班级</el-button>
            <vue-xlsx-table @on-select-file="handleSelectedFile" style="margin-left:40px">excel导入</vue-xlsx-table>
            </div>
            <el-table 
             :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe style="width: 100%;" border ref="multipleTable"  @selection-change="changeFun">
                 <el-table-column
                  type="selection"
                  width="55"

                  >
                </el-table-column>
                <el-table-column prop="" label="" width="1" >
                  
                </el-table-column>
                <el-table-column prop="id" label="班级ID" width="100" align='center'>
                </el-table-column>
                <el-table-column prop="name" label="班级名" align='center'>
                </el-table-column>
                <el-table-column prop="description" label="描述" align='center' >
                </el-table-column>
                <el-table-column label="操作" width="" align='center'>
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button size="small" type="success" @click="handelAdd(scope.$index, scope.row)">添加学生</el-button>
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

        
        <div class="line pr">
            <!-- <el-button type="primary" @click="showDialog" v-if="newAdCls">新增班级</el-button>  -->
            <el-button type="primary" class="query"  @click="query">返回</el-button>
            
        </div>


        <el-dialog  :visible.sync="dialogVisible" :before-close="handleClo(dialogVisible)" class="dialogSzie"  width="600px">
   
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">编辑班级</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
            <el-form ref="form" :model="form" label-width="80px" style='margin-left:100px;'>
                <!--   <el-form-item label="年级" style="width:41%;">
                    <template>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in typeOptions"
                          :key="item.value"
                          :label="item.value"
                          :value="item.label">
                        </el-option>
                      </el-select>
                    </template>
                  </el-form-item> -->

                <el-form-item label="班级名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>


                <el-form-item label="周期">
                    <el-date-picker
                      v-model="form.value1"
                      type="date"
                      @change="logTimeChange"
                      placeholder="选择日期">
                    </el-date-picker>
                   <br><span style="margin-left:120px;">至</span><br>
                     <el-date-picker
                      v-model="form.value2"
                      @change="logTimeChange1"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                

                <el-form-item label="课时">
                    <el-input v-model="form.lesPeriod"></el-input>
                </el-form-item>
                
                <el-form-item label="课程总数">
                    <el-input v-model="form.Count"></el-input>
                </el-form-item>

                <el-form-item label="班级类型" >
                     <el-select v-model="val" placeholder="请选择"  style="width:260px;">
                        <el-option
                          v-for="item in options"
                          :key="item.val"
                          :label="item.val"
                          :value="item.lab">
                        </el-option>
                      </el-select>
                </el-form-item>


                <el-form-item label="描述">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入内容" v-model="form.description" style="width:260px;">
                    </el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="isAdd(1)" >关 闭</el-button>
                <el-button @click="isAdd(0)" type="primary">确 定</el-button>
            </span>

        </el-dialog>


       <el-dialog  :visible.sync="putVisible" :before-close="handleClo(putVisible)" class="dialogSzie"   width="600px" >
         


          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">新增兴趣班</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="putVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
            <el-form ref="form" :model="form" label-width="80px" style='margin-left:100px;'>
                 <!--  <el-form-item label="年级">
                    <template>
                      <el-select v-model="value" placeholder="请选择" style="width:260px;">
                        <el-option
                          v-for="item in typeOptions"
                          :key="item.value"
                          :label="item.value"
                          :value="item.label">
                        </el-option>
                      </el-select>
                    </template>
                  </el-form-item> -->

                <el-form-item label="班级名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>


                <el-form-item label="周期">
                    <el-date-picker
                      v-model="form.value1"
                      type="date"
                      @change="logTimeChange"
                      placeholder="选择日期">
                    </el-date-picker>
                   <br><span style="margin-left:120px;">至</span><br>
                     <el-date-picker
                      v-model="form.value2"
                      @change="logTimeChange1"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                

                <el-form-item label="课时">
                    <el-input v-model="form.lesPeriod"></el-input>
                </el-form-item>
                
                <el-form-item label="课程总数">
                    <el-input v-model="form.Count"></el-input>
                </el-form-item>

                <el-form-item label="班级类型" >
                     <el-select v-model="val" placeholder="请选择"  style="width:260px;">
                        <el-option
                          v-for="item in options"
                          :key="item.val"
                          :label="item.val"
                          :value="item.lab">
                        </el-option>
                      </el-select>
                </el-form-item>


                <el-form-item label="描述">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入内容" v-model="form.description" style="width:260px;">
                    </el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" >关 闭</el-button>
                <el-button @click="Add" type="primary">确 定</el-button>
            </span>

        </el-dialog>



         <el-dialog
       
          :visible.sync="addVisible"
          width="600px"
          :before-close="handleC">
      
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">添加学生</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="addVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->

 <vue-xlsx-table @on-select-file="handleSelectedFile" style="margin-left:40px">excel导入</vue-xlsx-table>
              
         <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" class="addklas">
             <el-form-item label="">
                    <div v-for="(item,index) in gradeList">
                        <div class="grade">年级：{{item.name}}，描述： {{item.description}} <span class="del" @click="resetGrade(index)">X</span></div>
                    </div>
                </el-form-item>

          <el-form-item label="兴趣班id">
              
                <el-input class="int_inpt" v-model="classID"  style="width:216px;"></el-input>
              
          </el-form-item>

          <el-form-item label="学生信息">
             <el-select v-model="value" placeholder="请选择" @visible-change="changeId" style="width:216px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
             
          </el-form-item>

           <el-form-item label="备注">
              
                <el-input class="int_inpt" v-model="note" type="textarea"></el-input>
              
          </el-form-item>


       
        </el-form>

         <div class="tag">

              <el-tag
                  :key="tag"
                  v-for="tag in klassOptions"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag.name}}
             </el-tag>

           <!--   <el-tag closable>默认标签</el-tag> -->
        </div>


          <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="handelClick">确 定</el-button>
            <!-- <el-button type="primary" @click="test">测试</el-button> -->
          </span>
        </el-dialog>
        <el-dialog
     
          :visible.sync="dialogDelete"
          width="600px"
          :before-close="handleClose">
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">提示</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogDelete = false">
             </div>
          </div>
          <!-- Newtitle  end-->
          <span style="display:inline-block;margin-left:100px;">是否删除此班级</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDelete = false">取 消</el-button>
            <el-button type="primary" @click="deleteTrue">确 定</el-button>
          </span>
        </el-dialog>
    <!-- {{this.$store.state.check}} -->
    </div>

</template>

<script>
    export default {
        name: 'picture',
        data() {
            return {
                dialogDelete:false,
                rowId:"",
                note:'',
                tableData: [],
                kgId:"",
                kgName: "",

                dialogVisible: false, // 学校
                dialogUsage: 0, // 0 新增 1编辑
                dialogIndex: '',
                
                putVisible:false,

                GradeDialog: false, // 年级 
                GradeUsage: 0, // 0 新增 1编辑
                GradeIndex: '',

                isResetG: false, // dialog内修改年级

                addVisible:false,

            

                form: {
                    name: '',
                    description: '',
                    value1: '',
                    value2: '',
                    Count:0,
                    lesPeriod:0,
                    type:0,
                    
                },

                gradeList: [],

                newGrade: '',
                newDescription: '',


                typeOptions:[],
                gradeOptions: [],
                klassOptions:[],
                value: '',
                newAdCls:true,   //默认添加班级
                // check:this.$store.state.check,
                options:[{
                    val:"大班(一对多)",
                    lab:0
                },{
                    val:"小班(一对一)",
                    lab:1
                }],
                val:'',
                lab:'',
                classID:'',
                starTime:0,
                endTime:0,

                 current_page: 0,
                 currentPage:1,
                      pagesize:10,
                count: 100,

                rowindex:"",
                iKlassid:'',
                loading2:true,

                 

            }
        },
        watch: {
            current_page(now, old) {
                this.getData()
            },
        },
        methods: {
                handleSelectedFile (convertedData) {
                  console.log(this.iKlassid,)
                console.log(convertedData)
                console.log(convertedData.body)
                var a=convertedData.body
                var typeArray=[]
                a.forEach(function(item, index, array){
                               typeArray.push({
                                iklassName:item.兴趣班名字,
                                stuInfos:[{
                                  note:item.备注,stuId:item.学号,stuName:item.姓名  
                                }]
                                  
                          })
                             })

                // var iKlassId=this.iKlassid
                // for (var i = 0; i < typeArray.length; i++) {
                //   typeArray[i].push(iklassId=this.iKlassid)
                // }

console.log('22222222',typeArray)
console.log(this.iKlassid,)
                // [
                          //   {
                          //     "iklassId": 0,
                          //     "stuInfos": [
                          //       {
                          //         "note": "string",
                          //         "stuId": 0,
                          //         "stuName": "string"
                          //       }
                          //     ]
                          //   }
                          // ]
                console.log('11111111',typeArray)

                  if (typeArray) {
                        this.$http.post(
                    this.$getApi +'management/ikm/addStudentMany',
                   typeArray,
            
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
                    console.log("===add Student body=000000====",res);
                    // this.getData();
                    console.log('birthday');

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
                  }

                







                  // { 

                  //           // 备注
                  //           "note":this.note,
                  //           "stuId": stuid,
                  //           "stuName": stuname
                  //         }



              },
            message() {
                this.$message('这是一条消息提示');
            },
               handleSizeChange: function (size) {
                      this.pagesize = size;
                    },
                    handleCurrentChange: function(currentPage){
                        this.currentPage = currentPage;
                    },

            // get获取
            getData() {
                  // var klasssId = this.$store.state.gradeId;
                  //   var gradeId =klasssId.klassID
                  //   console.log('gradeId',gradeId)



                 this.$http({
                    method: 'get',
                    url:this.$getApi+'management/ikm',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('--------兴趣班get----------',res)
                    
                    const {
                        body
                    } = res
                      

                    this.loading2=false
                    console.log("===兴趣班get===",res.body);
                    var classArray=[];
                    res.body.forEach(function(item,index,array){
                            classArray.push({
                                value:item.name,
                                label:item.id,
                            })
                    })
                    console.log("classArray",classArray)
                    this.$store.commit('iClassArray',{iklassArray:classArray});



                    if (!!body.length) {
                        this.tableData = body
                        this.count = body.length
                    } else {
                        // alert('err:' + body)
                    }
                           var typeArray=[];
                          this.tableData.forEach(function(item, index, array){
                               typeArray.push({value:item.name,label:item.id})    
                          })
                             //this.value = klassesArray[0].value
                             this.typeOptions = typeArray;

                  

                })
            },
            
            Add(){
                console.log(this.form.description)
                    this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'management/ikm',
                    {
                        "description": this.form.description,
                        "name": this.form.name,
                        "gradeId": 8,
                        "type": this.val,
                        "startLesAt": this.starTime,
                        "endLesAt": this.endTime,
                        "lesPeriod": this.form.lesPeriod-0,
                        "lessonCount": this.form.Count-0,
                    },
                    {
                      headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' +localStorage.token

                      }
                    }
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===兴趣班post====",res);
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



              this.putVisible=false;
            },

            logTimeChange(val) { //把时间转换为毫秒数

                var formatTimeS = new Date(val).getTime();
            this.starTime=formatTimeS
        },
        logTimeChange1(val) { //把时间转换为毫秒数

                var formatTimeS1 = new Date(val).getTime();
                this.endTime=formatTimeS1
        },
         changeFun:function(val){




                 this.multipleSelection = val;
                console.log('-----------------',this.multipleSelection)

                    var newsArry=[];
                    this.multipleSelection.forEach(function(item, index, array){
                        newsArry.push({name:item.name,id:item.id})

                    })
                    console.log(newsArry);

                    // 有数组了
                    
                        
                        // this.$store.commit('assign',{id:studentId});
                        this.$store.commit('nameOpt',{cost:newsArry});
                        // console.log(cost)
                 





            },

             changeId(){
                console.log('-=-=-=-=--=-=');
                this.$router.push({path:'students'});
                this.$store.state.check=true;
                
            },
             setData(){

                // var iKlassId=this.$store.state.iklassId
                // var iklassid=iKlassId.id
                // console.log("iKlassId",iklassid)



                 var klassName = this.$store.state.cost
                        // this.tableData = localStorage.schools
                        // this.count = localStorage.schools.length;
                        console.log('+++++++    拿到的数据+++++++++',klassName);
                        let counst=klassName.cost;


                  var klassArray=[];
                          counst.forEach(function(item, index, array){
                               klassArray.push({name:item.name,id:item.id})    
                          })
                             //this.value = klassesArray[0].value
                             this.klassOptions = klassArray;

                             for(var i=0;i<klassArray.length;i++){
                                    var stuname=klassArray[i].name;
                                    var stuid=klassArray[i].id;
                                    console.log("stuname",stuname)
                                    console.log('stuid',stuid)
                             }
                             console.log('data.array',this.klassOptions)
            },
            handleC(){
                 this.addVisible=false
            },
            handleClo(dialogName) {
                this[dialogName] = false
            },
             handleClose(tag) {
          console.log(tag)
        this.klassOptions.splice(this.klassOptions.indexOf(tag), 1);
      },
            test(){

                var iKlassId=this.$store.state.iklassId
                  console.log("iKlassId",iklassid)



            },
            handelAdd(index,row){
                this.addVisible = true
                this.classID=row.name
               var intklassid=row.id;
               this.$store.commit('iklassId',{id:intklassid});
                console.log(intklassid);
                this.iKlassid=intklassid

            },
             handelClick(){
                // console.log('this.lab',lab)
                this.addVisible = false
    
                    var iKlassId=this.$store.state.iklassId
                var iklassid=iKlassId.id
                    console.log('this.input',iklassid*1);
                    var klasid =iklassid*1; //klasssid
                    this.iKlassId=klasid
                     var klassName = this.$store.state.cost
                       
                        console.log('+++++++    拿到的数据+++++++++',klassName);
                        let counst=klassName.cost;//要添加的学生数据
                        console.log('................',counst)
                         var klassArray=[];
                          counst.forEach(function(item, index, array){
                               klassArray.push({name:item.name,id:item.id})    
                          })
                             //this.value = klassesArray[0].value
                             this.klassOptions = klassArray;

                             for(var i=0;i<klassArray.length;i++){
                                    var stuname=klassArray[i].name;
                                    var stuid=klassArray[i].id;
                                    console.log("stuname",stuname)
                                    console.log('stuid',stuid)
                             }
                             console.log('data.array',this.klassOptions)


                    this.$http.post(
                    this.$getApi +'management/ikm/addStudent',
                    {

                        "iklassId":klasid,
                        "stuInfos":[
                          { 

                            // 备注
                            "note":this.note,
                            "stuId": stuid,
                            "stuName": stuname
                          }
                        ]

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
                    console.log("===add Student body=000000====",res);
                    // this.getData();
                    console.log('birthday');

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

            },
            showDialog() {
                // this.path = path

                this.form.name = ''
                this.form.description = ''

                this.putVisible = true
                this.dialogUsage = 0

                

                var gradeArray=[];

                var gradesArray = JSON.parse(localStorage.schools)[0].grades;

                console.log('===gradesArray==', gradesArray);

                gradesArray.forEach(function(item, index, array){
                    gradeArray.push({value: item.id, label: item.name});

                })
                this.value = gradeArray[0].value;

                this.gradeOptions = gradeArray;

            },
            handleCurrentChange(val) {
                this.current_page = val
            },
            handleEdit(index, row) {

                this.dialogVisible = true
                this.dialogUsage = 1
                this.dialogIndex = index
                this.kgId = row.id;
                this.kgName = row.name;

                 console.log('===handleEdit==',index,row, this.kgId, this.kgName)
                 var rowid=this.kgId;
                 

                this.form = Object.assign({}, row)
            },
            // 添加学生
            handleAdd(index, row){
                console.log("row.id",row.id);
                var iklassId=row.id;
                this.$store.commit('iklassId',{id:iklassId});
                this.$router.push({path:'iklassstu'});

            },


            // delete删除
            handleDelete(index, row) {
                
                console.log('*-/-*/-*/-',row.id);
                this.rowId = row.id
                this.rowindex = index
            
                this.dialogDelete=true
            },
            deleteTrue(){
                   this.$http({
                    method: 'delete',
                    url:this.$getApi+'management/ikm/' + this.rowId ,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('---------兴趣班delete---------',res)
                    
                    const {
                        body
                    } = res
                      


                    console.log("===res students===",res.body);
                    this.$message({
                      message: '成功',
                      type: 'success'
                    });

                    if (!!body.length) {
                        this.tableData = body.content
                        this.count = body.length
                    } else {
                        // alert('err:' + body)
                    }

                  this.tableData.splice(rowindex, 1);

                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });
                this.dialogDelete=false
              },
            // post添加
            isAdd(tag) { // 0 添加    1 取消
                this.dialogVisible = false;

              

              


                if (tag === 0 && this.dialogUsage == 1) {
                    this.$http.put(
                     this.$getApi+'management/ikm/' + this.kgId,
                     {
                        "gradeId": this.gradeId,
                        "description": this.form.description,
                        "name": this.form.name
                    },
                    {
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer '+ localStorage.token

                    }
                }
                      
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===兴趣班post====",res);
                     this.$message({
                      message: '失败',
                      type: 'error'
                    });
                    
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });
                this.getData();
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

                   
                }).catch((res) =>{
                    this.$message({
                      message: '审核失败',
                      type: 'error'
                    });
                });
            },
            editGrade(index, row) {
                this.GradeDialog = true
                this.kgName = row.name
                this.newKgId = row.id
                this.gradeId = row.id


                this.$http({
                    method: 'get',
                    url:'http://k12soft.vwico.com:8080/management/grades?kgId='+this.gradeId,                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer '+ localStorage.token

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
             query(){
                window.history.go(-1);
                this.$store.state.chack===0;
                chack===0
            },
            addGrade() {

                let _this = this
                this.$http.post(
                    this.$getApi+'management/ikm',
                    //this.$getApi+'management/grades',
                    {
                        "description": this.newDescription,
                        "name": this.newGrade,
                        "kindergartenId": _this.newKgId,
                        "type": 3
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
                this.getData();
                
                this.newGrade = ''
                this.newDescription = ''
            }
        },
        beforeMount() {

        },
        mounted() {
            this.getData();
        },
         activated(){
            check:this.$store.state.check;

            this.setData()
        
        },
        deactivated(){
             this.$store.state.chack===0;
             chack==0
        },

    }
</script>
<style scoped>


    .picture {
        /*margin-left: -10px;*/
        width: 98%;
        height: 100%;
    }

    .line {
        padding: 10px;
        padding-left: 10px;
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
    .query{
        position: relative;
        right: 630px;
    }
    .addklas{
        margin-left: 100px;
        width: 80%;
        height: 50%;
    }
    .int_inpt{
        width: 216px;
    }
    .tag{
        width: 300px;
        height: 50px;
        margin-left: 310px;
        padding-left: 70px;
        /*background-color: red;*/
    }
    .el-dialog--small{
        width: 70%;
        height: 50%;
    }
  /*  .int_inpt{
        width: 65%;
    }*/
    .el-input{
        width:260px;
    }
</style>


