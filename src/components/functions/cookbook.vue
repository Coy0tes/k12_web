<template>
    <div class="picture">

        
        

        <div class="line">
             <div style="width:83.5%; height:50px; margin-top:-20px;margin-bottom:10px; padding-right:25px; line-height:40px;padding-top:3px;   position: fixed; z-index:100;">
                 
             <el-button type="primary" @click="showDialog" style="float:right;margin-top:20px;">添加食谱</el-button>
   
            </div>
            <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%; margin-top:48px;" ref="multipleTable" border>
                <el-table-column prop="id" label="ID" width="100" align="center" style="border-right:1px solid #fff">
                </el-table-column>
                <el-table-column prop="title" label="菜单" align="center">
                </el-table-column>
                <el-table-column prop="content" label="内容" align="center">
                <template scope="scope">
                    <img :src="scope.row.content" width="100%" alt="">
                </template>
                </el-table-column>
              
                <el-table-column label="操作" width="" align="center">
                    <template scope="scope">
                        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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


        <div style="margin-top:20px;">
         
            
        </div>



        <el-dialog  :visible.sync="addDialog" :before-close="handleClose(addDialog)" class="dialogSzie">
           <!--   <div class="top">
             <span class="top_text">添加食谱</span>
             <img src="../../assets/close3.png" height="48" width="48" class="add_close"@click="isAdd">
          </div> -->

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">添加食谱</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="isAdd">
             </div>
          </div>
          <!-- Newtitle  end-->

            <el-form ref="form" :model="form" label-width="80px">
 

                <el-form-item label="菜名" style="padding-right:30px;">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                
                
                <el-form-item  style="padding-right:30px;">
                  <div class="upload">
                  <div class="oss_file">
                    <input type="file" class="upload_id" @change="doUpload"/>
                  </div>
                </div>
                </el-form-item>


                <el-form-item label="内容" style="padding-right:30px;">
                    <UE :defaultMsg=defaultMsg :config=config :id=ue ref="ue"></UE>




                    </el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="GisAdd(0)" >关 闭</el-button> -->
                <el-button @click="postData" type="primary">确 定</el-button>
            </span>

        </el-dialog>
<!-- 嵌套弹出层 -->
   



        <el-dialog  :visible.sync="editDialog" :before-close="handleClose(editDialog)" class="dialogSzie" width="1000px">
          <!--     <div class="top">
             <span class="top_text">编辑食谱</span>
             <img src="../../assets/close3.png" height="48" width="48" class="add_close"@click="isAdd">
          </div> -->

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">编辑食谱</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="isAdd">
             </div>
          </div>
          <!-- Newtitle  end-->

            <el-form ref="form" :model="form" label-width="80px">

                
                 <el-form-item label="菜名" style="padding-right:30px;">
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
                        
                        <UE :defaultMsg=defaultMsg  :config=config  :id=ue1 ref="ue"></UE>
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
                text1:'',
                // defaultMsg :"",
                accessKeyId:'',
                accessKeySecret:'',
                stsToken:'',
                currentPage:1,
                 pagesize:10,
                config: {
                  initialFrameWidth: null,
                  initialFrameHeight: 350
                },
                ue1: "ue1", // 不同编辑器必须不同的id
                ue1: "ue2", // 不同编辑器必须不同的id
                tableData: [],
                kgId:"",
                kgName: "",

                addDialog: false, // 学校
                editDialog:false,

                dialogUsage: 0, // 0 新增 1编辑
                dialogIndex: '',


                GradeDialog: false, // 年级 
                GradeUsage: 0, // 0 新增 1编辑
                GradeIndex: '',

                isResetG: false, // dialog内修改年级


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
                 value:'',
                 content:'',
                 defaultMsg:'',
                 imgUrl:'',
                 content:'',
            }
        },
        watch: {
            current_page(now, old) {
                this.getData()
            },
            url(val){ if(val){ this.urls.push(val); } }
        },
        methods: {
          upError(file,name){
            console.log(file,name)
          },
             handlePreview(file) {
              console.log(file);
            },    handleRemove(file, fileList) {
                  console.log(file, fileList);
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

// 随机生成文件名 
 random_string(len) { 　　len = len || 32; 　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; 　　var maxPos = chars.length; 　　var pwd = ''; 　　for (let i = 0; i < len; i++) { 　　pwd += chars.charAt(Math.floor(Math.random() * maxPos)); } return pwd; } , 
 
              getUEContent() {
        let content = this.$refs.ue.getUEContent(); // 调用子组件方法
        // this.$notify({
        //   title: '获取成功，可在控制台查看！',
        //   message: content,
        //   type: 'success'
        // });
        console.log(content)
        this.content=content
       
                   

      },



      UESetContent(){
        var upImg=this.imgUrl
        this.$store.commit('imgUrl',upImg);
        console.log('0000000000000000000000',this.imgUrl)
         // this.ue1.setContent('<p>new text</p>', true);
         let content1 = this.$refs.ue.setUEContent();

       console.log(content1)
       // ue.execCommand('inserthtml', this.imgUrl);
          // this.defaultMsg=this.imgUrl
          console.log("defaultMsg",this.defaultMsg)
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
            getData() {
             var date= Math.round(new Date('2018-08-08 08:30'))
             console.log('111111111111111111111111111111111111111111111111111',date)
                this.$http({
                    method: 'get',
                    url: this.$getApi + 'management/cookbooks?schoolId=' + localStorage.schoolsId,
                    headers: {
                        'Authorization': 'Bearer '+localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("====get cookbooks body ======",res.body);
                    // console.log("====get cookbooks body ===0000===",res.body[0].content);

                     var cookArray=[];
                    res.body.forEach(function(item, index, array){
                        cookArray.push({
                            id: item.id,
                         title:item.title,
                         content:item.content
                          // content: item.content.match(/<br\/> <img src="(\S+)"><br\/>/)[1]
                      })
                        // console.log("defaultMsg",defaultMsg)
                    })
                  

                    
                    if(res.body.length){
                         this.tableData = res.body;
                         this.count = res.body.length;
                    }else {
                        alert('err:' + body)
                    }

                })      

                 this.$http({
                    method: 'get',
                    url: this.$getApi + 'api/tp/aliyun/bd-token',
                    headers: {
                        'Authorization': 'Bearer '+localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {body} = res
                    console.log("api/tp/aliyun/bd-token",res)
                    this.accessKeyId=res.body.accessKeyId
                    this.accessKeySecret=res.body.accessKeySecret
                    this.stsToken=res.body.token
                })







            },
            reloade(){
                 // editDialog = false;
                 location.reload();
            },
            handleClose(dialogName) {
                // location.reload();
                this[dialogName] = false;
                
            },
            showDialog(path) {
                // this.path = path

                this.form.name = ''
                this.form.description = ''

                this.addDialog = true;
                this.editDialog = false;
                this.dialogUsage = 0

            },
            handleCurrentChange(val) {
                this.current_page = val
            },
            handleEdit(index, row) {
                // this.getData();
                console.log('===edit=====index====',index)
                // console.log('======res======',cookArray)
               
                this.editDialog = true;
                this.dialogUsage = 1
                this.dialogIndex = index
                this.kgId = row.id;
                this.kgName = row.name;

                this.form = Object.assign({}, row);
                console.log("this.from",this.form.content)
                console.log("this.from",this.form)
                this.defaultMsg = this.form.content
            },
            handleDelete(index, row) {
                this.tableData.splice(index, 1)
            },
            isAdd(tag) { // 0 编辑    2 加新的
               location.reload();
               console.log("刷新");

                if (tag === 0 ) {
                     this.editDialog = false
                   this.$http.put(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'management/cookbooks/'+ this.kgId,
                    {
                       "content": this.form.content,
                        "title": this.form.title,
                        "schoolId": JSON.parse(localStorage.actor).school.id
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
                  this.getUEContent();
                   
                    this.$http.post(
                     this.$getApi+'management/cookbooks/',
                     {
                        "content": this.content,
                        "title": this.form.title,
                        "schoolId": JSON.parse(localStorage.actor).school.id
                    },
                    {
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }
                      
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===body=add cookbooks====",res);
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
                 this.addDialog = false;
                }

                this.form = {};


            },
            postData(){
                this.getUEContent();
                   this.$http.post(
                     this.$getApi+'management/cookbooks/',
                     {
                        "content": this.content,
                        "title": this.form.title,
                        "schoolId": localStorage.schoolsId
                    },
                    {
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }
                      
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===body=add cookbooks====",res);
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
            GisAdd(tag) { // 0 添加    1 取消
                location.reload();
                if(tag == 0){
                    this.addDialog = false;
                }else{
                    this.editDialog = false
                }
                
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
                        alert('err res:' + res)
                    }

                    if (!!body.length) {
                        this.gradeList = body

                    } else {
                        this.gradeList = []
                    }

                })


            },
            //点击确定刷新页面
            replaced(){
                console.log("刷新")
               
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
            this.getData();
        },
        created(){
            // this.handleEdit()
        },
        
    }
</script>
<style scoped>
    /*#mainContent {*/
    /*width: 1000px;*/
    /*margin: 10px;*/
    /*}*/

    .picture {
        padding-left: 0px;
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
    .top{
        width: 100% !important;


    }
</style>