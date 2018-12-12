<template>
    <div class="picture"v-loading="loading2"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">

        <!-- <div class="line">
            <el-button type="primary" @click="showDialog">新增班级</el-button>
        </div> -->

        <div class="line">
             <div style="width:103.5%; height:50px;padding-top:3px;margin-left:-30px; padding-right:25px; line-height:40px; ">
                 
            
            <el-button type="primary" @click="showDialog" v-if="newAdCls" style="float:right; margin-top:2px; ">新增班级</el-button> 
            <!-- <el-button type="primary" @click="showDialog1"  style="float:right; margin-top:2px; margin-right:30px;">升班</el-button>  -->
     <el-button type="primary" class="query"  @click="query" style="margin-top:2px; width:100px;margin-left:30px;">返回</el-button> 
            </div>
            <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
             stripe 
             style="width: 100%;  margin-right:10px;" 
             ref="multipleTable" 
             @selection-change="changeFun"
              border max-height="40px;">
             
                 <el-table-column
                  type="selection"
                  width="55"
                  align="center"
                  >
                </el-table-column>
                <el-table-column prop="" label="" width="1">
                     </el-table-column>
                <el-table-column prop="id" label="班级ID" width="100"  align="center" style="border-right：1px solid #fff">
                </el-table-column>
                <el-table-column prop="name" label="班级名"  align="center">
                </el-table-column>
                <el-table-column prop="grade.name" label="年级"  align="center">
                </el-table-column>

                <el-table-column prop="graduateOfYear" label="级"  align="center">
                </el-table-column>

                <el-table-column prop="joinOfYear" label="届"  align="center">
                </el-table-column>
                <el-table-column prop="description" label="描述"  align="center">
                </el-table-column>
                <el-table-column label="操作" width=""  align="center">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        </div>

        
       <!--  <div class="line pr">
            
          
            <el-pagination layout="prev, pager, next" :total="count" @current-change="handleCurrentChange" style="float:right">
            </el-pagination>
        </div>
 -->

        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose(dialogVisible)" class="dialogSzie" width="600px">
           

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">编辑班级</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
            <el-form ref="form" :model="form" label-width="80px" style="width:400px;margin-left:16%;">
                  <el-form-item label="年级" >
                    <template>
                      <el-select v-model="value" placeholder="请选择" style="width:318px;">
                        <el-option
                          v-for="item in gradeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-form-item>

                <el-form-item label="班级名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="描述">



                    <!-- <UE :defaultMsg=form.content :config=config :id=ue1 ref="ue"></UE> -->
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入内容" v-model="form.description">
                    </el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="isAdd(1)" >关 闭</el-button>
                <el-button @click="isAdd(0)" type="primary">确 定</el-button>
            </span>

        </el-dialog> 


        <el-dialog :visible.sync="dialogVisible1" :before-close="handleClose(dialogVisible)" class="dialogSzie" width="600px">
           

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">编辑班级</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible1 = false">
             </div>
          </div>
          <!-- Newtitle  end-->
            <el-form ref="form" :model="form" label-width="80px" style="width:400px;margin-left:16%;">
                  <el-form-item label="年级" >
                    <template>
                      <el-select v-model="value" placeholder="请选择" style="width:318px;">
                        <el-option
                          v-for="item in gradeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-form-item>

                <el-form-item label="班级名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="描述">



                    <!-- <UE :defaultMsg=form.content :config=config :id=ue1 ref="ue"></UE> -->
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入内容" v-model="form.description">
                    </el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="isAdd(1)" >关 闭</el-button> -->
                <el-button @click="GisAdd" type="primary">确 定</el-button>
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
                <el-button @click="isAdd(0)" type="primary">确 定</el-button>
            </span>
            
        </el-dialog>
        <el-dialog
         
          :visible.sync="klassVisible"
          width="600px"
          :before-close="handleClose">
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">提示</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="klassVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
          <span style="display:inline-block;text-align:center;width:100%;"> 是否确认删除此班级？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="klassVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteBtn">确 定</el-button>
          </span>
        </el-dialog>
    <!-- {{this.$store.state.check}} -->
    </div>

</template>

<script>
import UE from '../ue/ue.vue'; 

    export default {
        name: 'picture',
         components: {UE},
        data() {
            return {
                 currentPage:1,
                 pagesize:10,
                defaultMsg: '',
                config: {
                initialFrameWidth: null,
                initialFrameHeight: 550
                },
                ue1: "ue1", // 不同编辑器必须不同的id
                ue1: "ue2", // 不同编辑器必须不同的id
                tableData: [],
                kgId:"",
                kgName: "",

                dialogVisible: false, // 学校
                dialogVisible1:false,
                dialogUsage: 0, // 0 新增 1编辑
                dialogIndex: '',


                GradeDialog: false, // 年级 
                GradeUsage: 0, // 0 新增 1编辑
                GradeIndex: '',

                isResetG: false, // dialog内修改年级


                klassVisible:false,

                showSize: 10,
                current_page: 0,
                count: 100,

                form: {
                    name: '',
                    description: '',
                },

                gradeList: [],

                newGrade: '',
                newDescription: '',


                
                gradeOptions: [],
                value: '',
                newAdCls:true,   //默认添加班级
                check:false,
                multipleSelection:[],
                index11:'',
                loading2:true,

            }
        },
        watch: {
            current_page(now, old) {
                this.getData()
            },
        },
        methods: {
            message() {
                this.$message('这是一条消息提示');
            },
            showDialog1(){
                       this.$http.put(
                     this.$getApi+'management/klasses/goup?schoolId=' + localStorage.schoolsId,
                     {
                        "gradeId": this.value,
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
                    console.log("===body=1111111====",res);
                     this.$message({
                      message: '升班成功',
                      type: 'success'
                    });
                      this.getData();
                                 }).catch((res) =>{
                            this.$message({
                              message: '升班失败',
                              type: 'error'
                    });
                     })
                   

            },
            getData() {

                 this.$http({

                    method: 'get',
                    url: this.$getApi+'management/grades?schoolId='+localStorage.schoolsId,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res
                       var dataArry=[];
                       res.body.forEach(function(item, index, array){
                            dataArry.push({
                                label:item.name,
                                value:item.id
                            })



                       })
                       this.gradeOptions=dataArry
                });


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
                    this.loading2=false
                    console.log("=====get classes111111===",res.body);






                      
                    if (!!body.length) {
                        this.tableData = body
                        this.count = body.length
                    } else {
                        alert('err:' + body)
                    };



                    var klasssId = this.$store.state.gradeId;
                    var gradeId =klasssId.klassID
                    console.log('gradeId',gradeId)


                    if (this.$store.state.check) {
                        console.log('check 为 true 了')
                    }

                })
            },
             handleSizeChange: function (size) {
        this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },
            handleClose(dialogName) {
                this[dialogName] = false
            },
            showDialog(path) {
                // this.path = path

                this.form.name = ''
                this.form.description = ''

                this.dialogVisible1 = true
                this.dialogUsage = 0

                

         

                console.log('===gradesArray==', gradesArray);

             
              
            },
            handleCurrentChange(val) {
                this.current_page = val
            },
            handleEdit(index, row) {
                console.log(row)
                this.dialogVisible = true
                this.dialogUsage = 1
                this.dialogIndex = index
                this.kgId = row.id;
                this.kgName = row.name;
                this.value=row.grade.name
                this.gradeId=row.grade.id
                 console.log('===handleEdit==',index,row, this.kgId, this.kgName)

                this.form = Object.assign({}, row)
            },






            deleteBtn(){
                this.tableData.splice(this.index11, 1)
                var kId= this.$store.state.klasId
                var klaId=kId.kId
                // console.log(klassId);


                  this.$http({
                    method: 'delete',
                    url:this.$getApi+'management/klasses/'+ klaId,


                    

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('---------删除---------',res)
                    
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









                this.klassVisible=false
            },

            handleDelete(index, row) {
               this.klassVisible=true
                
                console.log(row.id)
                var klassId=row.id
                this.index11=index
                this.$store.commit('klassId',{kId:klassId}); 

            },



            isAdd(tag) { // 0 添加    1 取消
               
                console.log(this.value)
                if (tag === 0 && this.dialogUsage == 0) {
                   this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'management/klasses',
                    {
                        "description": this.form.description,
                        "name": this.form.name,
                        "gradeId": this.value
                    },
                    {
                      headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' +localStorage.token

                      }
                    }
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===body=add==klasses====",res);
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
                     this.$getApi+'management/klasses/' + this.kgId,
                     {
                        "gradeId": this.value,
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
              this.getData();
                          this.form = {}
                 this.dialogVisible = false;

            },
            GisAdd(tag) { // 0 添加    1 取消
                 this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'management/klasses',
                    {
                        "description": this.form.description,
                        "name": this.form.name,
                        "gradeId": this.value
                    },
                    {
                      headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' +localStorage.token

                      }
                    }
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===body=add==klasses====",res);
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
                this.dialogVisible1 = false
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
                      message: '添加失败',
                      type: 'error'
                    }); 
                });
            },
            editGrade(index, row) {
                this.GradeDialog = true
                this.kgName = row.name
                this.newKgId = row.id
               


                this.$http({
                    method: 'get',
                    url:'management/grades?kgId='+this.gradeId,                  
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
            resetGrade(index) {
                this.isResetG = true

                this.gradeList.splice(index, 1)

            },
             query(){
                // localStorage.multipleSelection=this.multipleSelection;
                this.$router.go(-1)

                this.$store.state.chack===0;
                chack===0
            },
            addGrade() {

                let _this = this
                this.$http.post(
                    this.$getAPi+'management/grades/',
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
                      message: '审核失败',
                      type: 'error'
                    });
                    
                }).catch((res) =>{
                    this.$message({
                      message: '审核失败',
                      type: 'error'
                    });
                });
                this.getData();
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
            check:this.$store.state.check;
        },
        deactivated(){
             this.$store.state.chack===0;
             chack==0
        },

    }
</script>
<style scoped>
    /*#mainContent {*/
    /*width: 1000px;*/
    /*margin: 10px;*/
    /*}*/

    .picture {
        /*margin-left: 10px;*/
        width: 100%;
        height: 100%;
        padding-left: 10px;

    }

    .line {
        padding: 10px;
        margin-left:-8px;
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
        /*position: relative;
        right: 26%;*/
    }
    .top{
        margin-top: -60px;
    }
    .add_close{
        top:-22px;
        right: 8px;
    }
    .el-scrollbar__view .el-select-dropdown__list{
        display: none;
    }
    .el-select-dropdown__wrap .el-scrollbar__wrap{
        display: none;
    }
    .el-select-dropdown .el-popper{
        margin-left: 366px !important;
    }
</style>