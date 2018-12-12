<template>
    <div class="picture">

        
        <div class="line"> 
                <div style="width:103.5%; height:50px; background-color:#fff;margin-top:-10px;margin-bottom:10px;margin-left:-28px;padding-left:28px; padding-right:25px; line-height:40px;">


                    <el-button type="primary" icon="el-icon-arrow-left" @click="goback"  style="margin-top:3px;">  上一页</el-button>
                    <el-button type="primary" @click="showDialog" style="float:right;margin-top:4px;">邀请家长</el-button>
            </div>

                   

        </div>

        <div class="line">
            <el-table :data="tableData" stripe style="width: 100%;margin-top:-20px;" ref="multipleTable" border>
                <el-table-column prop="id" label="家长ID" width="100">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="mobile" label="联系方式">
                </el-table-column>
                </el-table-column>
                <el-table-column prop="studentName" label="学生姓名">
                </el-table-column>
                </el-table-column>
                <el-table-column prop="relationship" label="关系">
                </el-table-column>
                 </el-table-column>
                <el-table-column prop="klass" label="班级">
                </el-table-column>



                <el-table-column label="操作" width="">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>


        <div class="line pr">
            
            <el-pagination layout="prev, pager, next" :total="count" @current-change="handleCurrentChange">
            </el-pagination>
        </div>



        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose(dialogVisible)" class="dialogSzie">
            <div class="top">
             <span class="top_text">邀请家长</span>
             <img src="../../assets/close3.png" height="48" width="48" class="add_close"@click="dialogVisible = false">
          </div>
            <el-form ref="form" :model="form" label-width="80px" style="padding-left: 200px;">

            <!--    <el-form-item label="学生">
                  <el-input v-model="stuName"></el-input>
               </el-form-item> -->

                <el-form-item label="关系" >
                   <el-select v-model="form.relationship" placeholder="父亲" style='width: 300px;'>
                    <el-option label="父亲" value="DADDY"></el-option>
                    <el-option label="母亲" value="MOMMY"></el-option>
                    <el-option label="爷爷" value="GRANDPA"></el-option>
                    <el-option label="奶奶" value="GRANDMA"></el-option>
                   </el-select>
               </el-form-item>

                <el-form-item label="手机号">
                    <el-input v-model="form.mobile" style="width:300px"></el-input>
                </el-form-item>

                <el-form-item label="姓名">
                    <el-input v-model="form.username" style="width:300px"></el-input>
                    </el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="isAdd(1)" >关 闭</el-button> -->
                <el-button @click="isAdd(0)" type="primary" style='margin-right:380px'>确 定</el-button>
            </span>

        </el-dialog>


        <el-dialog title="年级操作" :visible.sync="GradeDialog" :before-close="handleClose(GradeDialog)" class="dialogSzie">

            <el-form ref="form" :model="form" label-width="80px">

                <el-form-item label="学校">
                     {{this.kgName}}
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
        

    </div>

</template>

<script>
    export default {
        name: 'picture',
        data() {
            return {
                tableData: [],
                kgId:"",
                kgName: "",

                dialogVisible: false, // 学校
                dialogUsage: 0, // 0 新增 1编辑
                dialogIndex: '',


                GradeDialog: false, // 年级 
                GradeUsage: 0, // 0 新增 1编辑
                GradeIndex: '',

                isResetG: false, // dialog内修改年级


                showSize: 10,
                // current_page: 0,
                count: 100,
                stuId:'',

                form: {
                    username: '',
                    mobile: '',
                },

                gradeList: [],

                newGrade: '',
                newDescription: '',

                mobile:'',
                username:'',
                stuName:'',

                 klassesOptions: [],
                 value:''
            }
        },
        // computed:{
        //     currentPage :function(){
        //         console.log('--------currentPage---------',current_page)
        //         return this.$store.state.studentId;
        //            // current_page=10;
        //     }
        // },
        watch: {
          
            studentId(now, old) {
                this.getData()
            },
        },
        methods: {
            message() {
                this.$message('这是一条消息提示');
            },
            getData() {

                
                var studentId = this.$store.state.studentId
                this.stuId=studentId
                console.log("guardian log is：",studentId )

                console.log("guardian  getData " );

                this.$http({
                    method: 'get',
                    url: this.$getApi +'management/guardians?schoolId=' + localStorage.schoolsId + '&studentId=' + studentId, //studentId??????????  任何参数都可以
                    headers: {
                        'Authorization': 'Bearer '+localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log("===========",res)
                    const {
                        body
                    } = res

                    console.log("====get guardians body ======",res.body);

                    //判断内容为空
                    if (res.body.length==0) {

                        console.log('------------res.body.length==0------------');
                    }
                    var guardianArray=[];
                     // location.reload();

                    res.body.forEach(function(item, index, array){
                        guardianArray.push({id: item.patriarch.actor.user.id, name: item.patriarch.actor.user.username,
                            mobile: item.patriarch.actor.user.mobile, studentName: item.patriarch.guardians[0].student.name,
                            klass: item.klass.name, relationship: item.relationType})
                    })

                    if (body.length) {
                        this.tableData = guardianArray;
                        this.count = guardianArray.length;

                          // this.$http({
                          //       method: 'get',
                          //       url: 'https://k12.vwico.com/management/klasses',

                          //       headers: {
                          //           'Authorization': 'Bearer ' + localStorage.token

                          //       }
                          //   }).then((res) => { // promise对象
                          //       const {
                          //           body
                          //       } = res

                          //       console.log("===res getKlassData===",res.body);

                          //       if (!!body.length) {
                                    
                          //             var klassesArray=[];
                          //             res.body.forEach(function(item, index, array){
                          //                  klassesArray.push({value:item.id,label:item.name})    
                          //             })
                          //                //this.value = klassesArray[0].value
                          //                this.klassesOptions = klassesArray;
                                            
                          //               } else {
                          //                   alert('err:' + body)
                          //               }
                          //           })

                    } else {
                        this.tableData=[];
                        this.count = guardianArray.length;
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

                this.dialogVisible = true
                this.dialogUsage = 0

            },
            handleCurrentChange(val) {
                this.current_page = val
            },
            handleEdit(index, row) {

                console.log('===edit=====index====',index)

                this.dialogVisible = true
                this.dialogUsage = 1
                this.dialogIndex = index
                this.kgId = row.id;
                this.kgName = row.name;

                this.form = Object.assign({}, row)
            },
            handleDelete(index, row) {
                this.tableData.splice(index, 1)
            },
            isAdd(tag) { // 0 添加    1 取消
                this.dialogVisible = false

                if (tag === 0 && this.dialogUsage == 0) {
                   this.$http.post(
                    this.$getApi +'management/invitations/guardian',
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    // 'https://k12.vwico.com/management/invitations/guardians',
                    {
                        "mobile": this.form.mobile,
                        "username": this.form.username,
                        "relationType":this.form.relationship,
                        "kidId": this.stuId
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
                    console.log("===body=add==guardians====",res);
                    this.getData();
                })

                }

                if (tag === 0 && this.dialogUsage == 1) {
                    this.$http.put(
                     this.$getApi +'management/kindergartens/' + this.kgId,
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
                this.kgName = row.name
                this.newKgId = row.id
                this.gradeId = 1


                this.$http({
                    method: 'get',
                    url:this.$getApi+'management/grades?kgId='+this.gradeId,                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                    console.log("===get grades====",body);

                    if(!res.ok){
                        console,log('err res:' + res)
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
            goback(){
                 // location.reload();
                // history.go(-1);
                
                this.$router.push({path:'students'})
                // current_page=10;
                 // location.reload();

            },
            addGrade() {

                let _this = this
                this.$http.post(
                    'https://k12.vwico.com/management/grades/',
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
        beforeCreate(){
            console.log('beforeCreate');
        },
        created(){
            console.log('created');
        },
        beforeMount() {
               // var studentId = this.$store.state.studentId
               // console.log("mounted guardian log is：",studentId )
                console.log('beforeMount');
        },
        mounted() {

            console.log('mounted');
        this.getData()
         // location.reload();
        },
        deactivated(){
            // console.log('88888888888888888888888')
            // location.reload();
            // $distroy
        },
        // updated(){
        //     // location.reload();
        // }
        activated(){
            this.getData()
        }
    }
</script>
<style scoped>
    /*#mainContent {*/
    /*width: 1000px;*/
    /*margin: 10px;*/
    /*}*/

    .picture {
        /*margin-left: -10px;*/
        padding-left: -20px;
        width: 98%;
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
    .el-table th{
        padding: 0!important;
    }
</style>