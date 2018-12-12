<template>
    <div class="picture">

        <div class="line">
             <div style="width:100.5%; height:50px; margin-top:0px;margin-bottom:10px;margin-left:-10px; padding-right:25px; line-height:40px; position: fixed;
  z-index: 100">
                <el-button type="primary" @click="goBack" style="margin-left:10px;margin-top:5px;" v-show="addSth">添加</el-button>
                <!-- <el-button type="primary" @click="goBack" style="margin-left:10px;margin-top:5px;" v-show="backTo">返回</el-button> -->
                <!-- <el-button type="primary" @click="showDialog" style="float:right;margin-top:5px; position: absolute; margin-left:72.8%;">邀请老师</el-button> -->
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
                
                <el-table-column prop="mobile" align="center" label="联系方式">
                </el-table-column>


                <el-table-column label="操作" width="350" align="center">
                    <template scope="scope">
                                  <el-button size="small" type="primary" @click="getduit(scope.$index, scope.row)">分配班级</el-button>
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
            <!-- <el-button type="primary" @click="showDialog">邀请老师</el-button> -->


        </div>

<!-- 任命班级-->
         <el-dialog :visible.sync="appointDialog1" :before-close="handleClose(appointDialog1)" class="dialogSzie" style="padding-bottom:30px;">
                 <div class="top">
             <span class="top_text">任命班级</span>
             <img src="../../../assets/close3.png" height="48" width="48" class="add_close"@click="appointDialog1 = false">
          </div>
<div style="margin-left:35%;margin-bottom:30px;">
    
    班级名称：
             <el-select
                v-model="value10"
            
                filterable
                allow-create
                default-first-option
                placeholder="请选择班级">
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>  
<br>


<!-- <el-button type="primary" @click="ket">添加</el-button> -->




</div>
            
<span slot="footer" class="dialog-footer">
 
    <el-button type="primary" @click="dutyPut">确 定</el-button>
  </span>
        </el-dialog>  





    

    </div>

</template>

<script>
    export default {
        name: 'picture',
        data() {
            return {
              options6:[
                  {
                    value:1,
                    label:"主班老师"
                  },{
                    value:2,
                    label:"副班老师"
                  },{
                    value:3,
                    label:"保育员"
                  },
              ],
              value12:'',
                addSth:false,
                backTo:true,
                addLeadDialog:false,
                dutyDialog:false,
                value11:'',
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
                dutyTeacherId:'',
            }
        },
        watch: {
            current_page(now, old) {
                this.getData();
                this.initCourse();
            },
            changeFun(val){
              console.log(val)
              
            }
        },
        methods: {
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
                this.dutyTeacherId=row.teacherId
            
                console.log('++++++++++++++++',row)

            },
            goBack(){
                 this.$router.go(-1)
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
                    // this.getData();
                })


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
                      


                    console.log("===res students===",res.body);
                    console.log("===this.rowTeacherId===",this.rowTeacherId);


                  

                  

                });
                this.getData();
                this.appointDialog = false
            },
            dutyPut(){
                  console.log(this.value10)



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
                this.appointDialog = false;
               
            },
            ket(){
                console.log('11111111',this.value10)





                      this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'/duty/management',
                    
                       [
                          {
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
                    // this.getData();
                })






                this.getData();













            },
            deleteKet(){
                        this.$http({
                    method: 'delete',
                    url:this.$getApi+'duty/management/'+this.value10,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                
                    
                    const {
                        body
                    } = res
                      


                    console.log("===res students===",res.body);


                  

                  

                })
            },
            getData() {
                // console.log("132165465146516516==============" , localStorage.token);
                // console.log("132165465146516516==============" , localStorage.schoolsId);
                // console.log("132165465146516516==============" , JSON.parse(localStorage.actor).school.id);

                this.$http({
                    method: 'get',
                    // url: 'https://k12.vwico.com/management/teachers?schoolId='+JSON.parse(localStorage.actor).school.id,
                    url:this.$getApi+ 'management/teachers?schoolId='+localStorage.schoolsId,
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token
                       

                    }
                }).then((res) => { // promise对象
                    console.log('===============hello;===============');
                    const {body} = res

                    console.log("====get teachersbody ======",res.body);

                    

console.log('=========token+schoolsId=====================',localStorage.token);
console.log('=========token+schoolsId=====================',localStorage.schoolsId);

                    var teacherArray=[];
                    res.body.forEach(function(item, index, array){
                        teacherArray.push({teacherId: item.actor.id, 
                                            name:item.actor.user.username, 
                                            mobile: item.actor.user.mobile,
                                            // duty:item.dutyDTO.name,
                                            // dutyid:item.dutyDTO.id
                                          })
                    })

                    console.log("------teacherArray------",teacherArray);

                    if (!!body.length) {
                        this.tableData = teacherArray
                        this.count = teacherArray.length
                    } else {
                        alert('err:' + body)
                    }

                });
                  this.$http({
                    method: 'get',
                    url:this.$getApi+'duty/management',                  
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
                 this.options5=klasssArray
                 
                })
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
                      


                    console.log("===res students===",res.body);


                    if (!!body.length) {
                        this.tableData = body.content
                        this.count = body.length
                    } else {
                        // alert('err:' + body)
                    }

                  

                })
                  this.deleteTeacherVisible=false;
            },
            isAdd(tag) { // 0 添加    1 取消  2 任命老师
                this.dialogVisible = false;
                this.appointDialog = false;

                if (tag === 0 && this.dialogUsage == 0) {
                   this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'management/invitations/teacher?dutyId='+this.value10,
                    {
                        "mobile": this.form.mobile,
                        "username": this.form.username,
                        "joinTime":'0'
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
                    this.getData();
                })

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
                    if(res.body){
                        alert("任命成功!");
                         this.getData();
                    }
                })
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
                     this.getData();
                })
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

                    if (body.meta.code === 0) {
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });

                    } else {
                        alert('err:' + body.meta.message)
                        this.$message({
                            message: '添加失败：' + body.meta.message,
                            type: 'error'
                        });
                    }

                })
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
                })

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
        background-color: #fff;
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