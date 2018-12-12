<template>
    <div class="picture">

        <!-- <div class="line">
            <el-button type="primary" @click="showDialog">新增班级</el-button>
        </div> -->

        <div class="line">
             <div style="width:103.5%; height:50px;padding-top:3px;margin-left:-30px; padding-right:25px; line-height:40px; ">
                 
            
           
     <el-button type="primary" class="query" v-show="check" @click="query" style="margin-top:2px; width:100px;margin-left:30px;">返回</el-button> 
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
                  v-if="check">
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
                multipleSelection:[]

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
                  
                    }).catch((res) =>{
                    this.$message({
                      message: '升班失败',
                      type: 'error'
                    });
                     })
                       this.getData();

            },
            getData() {

          


                this.$http({

                    method: 'get',
                    url: this.$getApi+'management/klasses/goup',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("=====get classes===",res.body);






                      
                    if (!!body.length) {
                        this.tableData = body
                        this.count = body.length
                    } else {
                        alert('err:' + body)
                    };

                    //  var constArray=[];
                    // res.body.forEach(function(item, index, array){




                    //     constArray.push({
                    //         id:item.id,
                         
                    //      })
                    //     console.log('-----constArray-----',item.periodDiscounts[0])
                    // })

                    // console.log("------constArray------",constArray);

                    // if (!!body.length) {
                    //     this.tableData = constArray
                    //     this.count = constArray.length
                    // } else {
                    //     alert('err:' + body)
                    // }


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

                this.dialogVisible = true
                this.dialogUsage = 0

                

         

                console.log('===gradesArray==', gradesArray);

             
              
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
                this.gradeId=row.grade.id
                 console.log('===handleEdit==',index,row, this.kgId, this.kgName)

                this.form = Object.assign({}, row)
            },






            deleteBtn(){
                
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
                      


                    console.log("===res students===",res.body);

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









                this.klassVisible=false
            },

            handleDelete(index, row) {
               this.klassVisible=true
                this.tableData.splice(index, 1)
                console.log(row.id)
                var klassId=row.id
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

                this.form = {}
                 this.dialogVisible = false;

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