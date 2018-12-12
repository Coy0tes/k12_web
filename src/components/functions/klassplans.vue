<template>
    <div class="picture">

        
        <div class="line"> 
                <div style="width:100%; height:50px;padding-top:4px;margin-left:-0px;">
                <el-select v-model="value" placeholder="请选择班级" visible-change=''   >
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select> 
                  
                  <el-select v-model="plantypevalue" placeholder="请选择类型">
                      <el-option
                        v-for="item in planTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select> 
                  
                  <el-button type="primary" @click="getData">查 询</el-button>
                  <!-- <el-button type="primary" @click="showDialog">新增班级计划</el-button> -->

                    <el-button type="primary" @click="showDialog" style="float:right;margin-right:0px;">新增计划</el-button>
            </div>
                    
                                
        </div>

        <div class="line" style="margin-top:-20px;">
            <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%; " ref="multipleTable" border>
                <el-table-column prop="id" label="ID" width="100" align="center">
                </el-table-column>
                <el-table-column prop="title" label="标题" align="center">
                </el-table-column>
                <el-table-column prop="" label="内容" align="center">
                </el-table-column>
                 <el-table-column prop="planType" label="类型" align="center"  :formatter="formatDate">
                </el-table-column>

                <el-table-column label="操作" width="" align="center">
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


        <div class="line pr">
            
           
        </div>



        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose(dialogVisible)"  width="960px" class="dialogSzie">
         
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">新增班级计划</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->

            <el-form ref="form" :model="form" label-width="80px" style="margin-left:120px;">

             <el-form-item label="选择班级" style="width:400px;">
                  <el-select v-model="value" placeholder="请选择班级" style="width:328px;">
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select> 
                </el-form-item>

                <el-form-item label="选择类型" style="width:400px;" >
                  <el-select v-model="plantypevalue" placeholder="请选择类型" style="width:328px;">
                      <el-option
                        v-for="item in planTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select> 
             </el-form-item>       

                <el-form-item label="标题" style="width:400px;">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>

                <el-form-item label="内容" style="width:408px;">
                    <UE :defaultMsg=defaultMsg :config=config :id=ue ref="ue"></UE>
                   
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="isAdd(1)" >关 闭</el-button>
                <el-button @click="isAdd(0)" type="primary">确 定</el-button>
            </span>

        </el-dialog>


       <el-dialog :visible.sync="editDialogVisible" :before-close="handleClose(dialogVisible)" class="dialogSzie" width="960px">
       
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">编辑班级计划</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="editDialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->

            <el-form ref="form" :model="form" label-width="80px">

             <el-form-item label="选择班级">
                  <el-select v-model="value" placeholder="请选择班级">
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select> 
                </el-form-item>

                <el-form-item label="选择类型">
                  <el-select v-model="plantypevalue" placeholder="请选择类型">
                      <el-option
                        v-for="item in planTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select> 
             </el-form-item>       

                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>

                <el-form-item label="内容">
                    <!-- <el-input v-model="form.content"></el-input> -->
                    <!-- <el-input v-html="form.content"></el-input> -->
                    <template v-html="form.content">
                        <UE :defaultMsg=defaultMsg  :config=config  :id=ue1 ref="ue"></UE>
                    </template>

                    </el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="isAdd(1)" >关 闭</el-button>
                <el-button @click="isAdd(2)" type="primary">确 定</el-button>
            </span>

        </el-dialog>

        <!-- 查看内容 -->
        <el-dialog  :visible.sync="editDialog" :before-close="handleClose(editDialog)" class="dialogSzie" width="1000px">
          <!--     <div class="top">
             <span class="top_text">编辑食谱</span>
             <img src="../../assets/close3.png" height="48" width="48" class="add_close"@click="isAdd">
          </div> -->

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">详情</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="isAdd">
             </div>
          </div>
          <!-- Newtitle  end-->

            <el-form ref="form" :model="form" label-width="80px">

                
                 <el-form-item label="标题" style="padding-right:30px;">
                    <el-input v-model="form.title"></el-input>
                </el-form-item> 


                <el-form-item  style="padding-right:30px;">
                  <div class="upload">
                  <div class="oss_file">
                    <input type="file" class="upload_id" @change="doUpload"/>
             
                  </div>
                </div>
                </el-form-item>
                                  
                <el-form-item label="内容">
                    <div style="padding-right:30px;">
                        
                        
                    </div>
                
                    <!-- <el-input v-model="form.content"></el-input>
                    </el-input> -->
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="GisAdd(1)" >关 闭</el-button> -->
                <el-button @click="isAdd(0)" type="primary" >确 定</el-button>

                <el-button @click="getUEContent" type="primary" >获取内容</el-button>
                <!-- <el-button @click="UESetContent" type="primary" >放入图片</el-button> -->
            </span>

        </el-dialog>

    </div>

</template>

<script>
import UE from '../ue/ue.vue'; 
    export default {
      name: 'ue',
         components: {UE},
     
        data() {
            return {
              editDialog:false,
                  ue1: "ue1", // 不同编辑器必须不同的id
                  config: {
                  initialFrameWidth: null,
                  initialFrameHeight: 350
                },
                tableData: [
                    {
                     id:'',
                     name:'',
                     content:'', 
                     planType:'',
                     title:"",

                    }


                ],
                pId:"",
                Name: "",


                dialogVisible: false, // 学校
                dialogUsage: 0, // 0 新增 1编辑
                dialogIndex: '',

                editDialogVisible: false,


                GradeDialog: false, // 年级 
                GradeUsage: 0, // 0 新增 1编辑
                GradeIndex: '',

                isResetG: false, // dialog内修改年级
                 currentPage:1,
                 pagesize:10,

                showSize: 10,
                current_page: 0,
                count: 100,

                form: {
                    username: '',
                    mobile: '',
                },

                gradeList: [],

                newGrade: '',
                newDescription: '',

                mobile:'',
                username:'',

                 klassesOptions: [],
                 value: '',


                 planTypeOptions:[
                 {
                    label: '周',
                    value: 'WEEK',
                 },
                 {
                    label: '月',
                    value: 'MONTH',
                 },
                 {
                    label: '通知',
                    value: 'NOTICE',
                 },
                 {
                    label: '家庭作业',
                    value: 'HOMEWORK',
                 }
                 ],
                 plantypevalue: 'MONTH'

            }
        },
        watch: {
            current_page(now, old) {
                this.getData()
            },
        },
        methods: {
                 formatDate: function (row, column) {
            // console.log('-------formatDate------------',row.periodDiscounts)
        return row.planType == "WEEK" ? '周' : row.planType == "MONTH" ? '月' :  row.planType == "NOTICE" ? '通知' :  row.planType == "HOMEWORK" ? '家庭作业': "未知";

    },
            message() {
                this.$message('这是一条消息提示');
            },
            handleSizeChange: function (size) {
               this.pagesize = size;
            },
              UESetContent(){
                if (this.imgUrl=='') {
                  var upImg=this.imgUrl
        this.$store.commit('imgUrl',upImg);
        console.log('0000000000000000000000',this.imgUrl)
                }
        
         // this.ue1.setContent('<p>new text</p>', true);
         let content1 = this.$refs.ue.setUEContent();

       console.log(content1)
       // ue.execCommand('inserthtml', this.imgUrl);
          // this.defaultMsg=this.imgUrl
          console.log("defaultMsg",this.defaultMsg)
                },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
            },
                   doUpload () {
        const _this = this
        const urls = [];
        this.$http({
                    method: 'get',
                    url: this.$getApi + 'api/tp/aliyun/bd-token',
                    headers: {'Authorization': 'Bearer '+localStorage.token}
                }).then((result) => {
                  console.log(result)
          const client = new OSS.Wrapper({
            region: "oss-cn-beijing",
            accessKeyId: result.body.accessKeyId,
            accessKeySecret: result.body.accessKeySecret,
            stsToken: result.body.token,
            bucket: "bdtext"
          })
          _this.percentage = 0;
          const files = document.getElementsByClassName("upload_id");
          console.log("files",files[0].files)
          if (files[0].files) {
            const fileLen = document.getElementsByClassName("upload_id")[0].files
            console.log("fileLen",fileLen)
            let resultUpload = ''
            for (let i = 0; i < fileLen.length; i++) {
              const file = fileLen[i]
              console.log("file",file)
              // 随机命名
              let random_name = this.random_string(6) + '_' + new Date().getTime() + '.' + file.name.split('.').pop()
              console.log("random_name",random_name)
              console.log("random_name",file)
              // 上传
              console.log(client.multipartUpload(random_name,file))
              client.multipartUpload(random_name, file, {
               // console.log(random_name,file)
              }).then((results) => {
                // 上传完成
                const url = 'https://bdtext.oss-cn-beijing.aliyuncs.com/'+ results.name;
                _this.url = url;
                console.log(results.name);
                console.log(url);
                var imgurl= '<img src=' +'"'+ url +'"' +'><br/><br/>'
                this.imgUrl=imgurl
                console.log('imgurl',this.imgUrl)
               
                if (this.imgUrl) {
                  this.UESetContent();
                }
              }).catch((err) => {
                console.log(err)
              })
            }
          }
        })
      },
            getData() {
              var klassId =  1
               if (this.value==='') {
                  klassId=1
               }else{
                klassId=this.value
               }
                this.$http({
                    method: 'get',
                    url: this.$getApi+'management/klass-plans?klassId='+ klassId +'&planType=' + this.plantypevalue,
                    headers: {
                        'Authorization': 'Bearer '+localStorage.token
                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res
                    console.log("=============================", 'https://k12.vwico.com/management/klass-plans?klassId='+ this.value + '&planType=' + this.plantypevalue)

                    console.log("====get klass-plans body ======",res.body);

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

                             
                                    
                                      var klassesArray=[];
                                      res.body.forEach(function(item, index, array){
                                           klassesArray.push({value: item.id,label: item.name})    
                                      })
                                         //this.value = klassesArray[0].value
                                         this.klassesOptions = klassesArray;
                                            
                                      
                                    })
                     

                    if (!!body.length) {
                        this.tableData = res.body;
                        this.count = res.body.length;

                    } else {
                        // this.klassesOptions=[];
                    }

                })
            },
            handleClose(dialogName) {
                this[dialogName] = false
            },
            showDialog(path) {
                // this.path = path

                this.form.title = ''
                this.form.content = ''
                this.dialogVisible = true
                this.dialogUsage = 0

            },
             query() {
                

                

            },
            handleCurrentChange(val) {
                this.current_page = val
            },
            handleEdit(index, row) {
                // this.UESetContent();
                console.log('===edit=====index====',index)
                console.log('===edit=====index====',row)
                this.editDialogVisible = true;

                this.dialogVisible = false;
                this.dialogUsage = 1;
                this.dialogIndex = index;
                this.planId = row.id;
                this.kgName = row.name;

                this.form = Object.assign({}, row)
                this.defaultMsg = row.content
            },
            handleDelete(index, row) {
                this.tableData.splice(index, 1)
            },
            isAdd(tag) { // 0 添加    1 取消
                this.dialogVisible = false;
                this.editDialogVisible = false;

                if (tag === 0 && this.dialogUsage == 0) {
                   this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'management/klass-plans',
                    {
                        "title": this.form.title,
                        "content": this.form.content,
                        "klassId": this.value,
                        "type": this.plantypevalue
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
                    console.log("===body=add==klassPlans====",res.body);
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

                if (tag === 2) {
                    console.log("====this.value===this.plantypevalue====",this.value,this.plantypevalue);
                    this.$http.put(
                     this.$getApi+'management/klass-plans/' + this.planId,
                     {
                        "title": this.form.title,
                        "content": this.form.content,
                        "klassId": this.value,
                        "type": this.plantypevalue

                    },
                    {
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }
                      
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===put klassPlans====",res.body);
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
                      message: '失败',
                      type: 'error'
                    });
                });
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
                        // alert('err res:' + res)
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
                      message: '失败',
                      type: 'error'
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
        }
    }
</script>
<style scoped>
    /*#mainContent {*/
    /*width: 1000px;*/
    /*margin: 10px;*/
    /*}*/

    .picture {
        margin-left: -10px;
        width: 100.6% !important;
        height: 100%;
    }

    .line {
        padding: 10px;
        padding-left: 20px;
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
</style>