<template>
    <div v-loading="loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="table_" style="padding:10px;padding-top:14px;">
           <el-button type="primary" style="float:right;margin-bottom:4px" @click='dialogVisible_add=true'>添加活动</el-button>
              <el-table
              :data="tableData"
              border
              
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                align="center"
                :formatter="dateFormat"
                width="180">
              </el-table-column>
              <el-table-column
                prop="titel"
                label="标题"
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                prop="content"
                align="center"
                label="内容">
              </el-table-column>
               <el-table-column
                  label="详情"
                  align="center"
                  width="300"
                 >
                  <template slot-scope="scope">
                    <el-button size="small" @click="getMain(scope.$index, scope.row)">详情</el-button>
                    <el-button size="small" type="primary" @click="putMain(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="delete_(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>

            <!-- 添加 -->
              <el-dialog
              
                :visible.sync="dialogVisible_add"
                width="600px"
                :before-close="handleClose">
                <div class="top">
             <span class="top_text">添加活动</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible_add = false">
             </div>
            </div>
                <div style="width:100%;height:300px;">
               

                    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" style="margin-left:100px">
                          <el-form-item label="标题">
                            <el-input v-model="formLabelAlign.name" style="width:240px"></el-input>
                          </el-form-item>
                          <el-form-item label="内容">
                            <el-input v-model="formLabelAlign.content" style="width:240px" type="textarea"></el-input>
                          </el-form-item>
                       
                        </el-form>
                  

                </div>
                <span slot="footer" class="dialog-footer">
                  <!-- <el-button @click="dialogVisible_add = false">取 消</el-button> -->
                  <el-button type="primary" @click="addSure">确 定</el-button>
                </span>
              </el-dialog>



  <!-- 编辑           -->
               <el-dialog
              
                      :visible.sync="dialogVisible_add1"
                      width="600px"
                      :before-close="handleClose">
                      <div class="top">
                   <span class="top_text">编辑活动</span>
                   <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                     <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible_add1 = false">
                   </div>
                  </div>
                      <div style="width:100%;height:300px;">
               

                    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" style="margin-left:100px">
                          <el-form-item label="标题">
                            <el-input v-model="formLabelAlign.name" style="width:240px"></el-input>
                          </el-form-item>
                          <el-form-item label="内容">
                            <el-input v-model="formLabelAlign.content" style="width:240px" type="textarea"></el-input>
                          </el-form-item>
                       
                        </el-form>
                  

                </div>
                <span slot="footer" class="dialog-footer">
                  <!-- <el-button @click="dialogVisible_add = false">取 消</el-button> -->
                  <el-button type="primary" @click="putSure">确 定</el-button>
                </span>
              </el-dialog>



<!-- 删除 -->

            <el-dialog
             
              :visible.sync="dialogVisible"
              width="600px"
              :before-close="handleClose">
              <div class="top">
             <span class="top_text">删除</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
              <span style="display:inline-block;margin-left:120px;">是否删除？</span>
              <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="delete_1">确 定</el-button>
              </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import Moment from 'moment';
    export default {
        data(){
            return {
              tableData:[],
              loading:true,
              id:'',
              index:'',
              dialogVisible:false,
              dialogVisible_add:false,
              dialogVisible_add1:false,
              formLabelAlign:{
                name:'',
                content:'',

              },
              ID:'',
            }
        },
        methods:{
          putMain(index,row){
            console.log(row)
            this.formLabelAlign.name =  row.titel
            this.formLabelAlign.content =  row.content
            this.ID=row.id
            this.dialogVisible_add1=true
          },
          putSure(){
                       this.$http.put(
                     this.$getApi+'management/news/'+ this.ID,
                     {
                       "content": "http://"+this.formLabelAlign.content,
                      "schoolId": localStorage.schoolsId,
                      "title": this.formLabelAlign.name

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
                this.dialogVisible_add1=false


          },
          addSure(){
              this.$http.post(
                    this.$getApi +'management/news',
                    {
                       
                      "content": "http://"+this.formLabelAlign.content,
                      "schoolId": localStorage.schoolsId,
                      "title": this.formLabelAlign.name

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
                      message: '成功',
                      type: 'success'
                    });
                 
                    console.log('birthday');
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });
                this.dialogVisible_add = false
                this.getData();
          },
          getMain(index,row){
            window.location.href = row.content 
          },
                 dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return Moment(date*1000).format("YYYY-MM-DD ");  
            },
            getData(){
                this.$http({
                    method: 'get',
                    url:this.$getApi+'management/news?fromDate=0&schoolId='+localStorage.schoolsId,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======management/news=====',res);
                  console.log('--------management/news----------',res)
                    this.loading=false
                    const {
                        body
                    } = res
                      

                    var  a=res.body.createds
                    var  b=[];
                    console.log("===res management/news===",res.body);
                    for (var i = 0; i < a.length; i++) {
                        if (a[i]==null) {
                          console.log('1111111111111')
                        }else {
                          b.push(a[i])
                        }
                      
                    }
                   
                    console.log(b)
                    var c=[]
                      b.forEach(function(item,index,array){
                      c.push({
                        id:item.id,
                        date:item.createdAt,
                        titel:item.title,
                        content:item.content
                      })
                    });
                      this.tableData=c

                  

                })
            },
            delete_(index,row){
              this.id=row.id
              this.index=index
              this.dialogVisible=true
            },
            delete_1(){
              this.tableData.splice(this.index, 1)
                     this.$http({
                    method: 'delete',
                    url:this.$getApi+'management/news/' + this.id ,

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


                    if (!!body.length) {
                        this.tableData = body.content
                        this.count = body.length
                    } else {
                        // alert('err:' + body)
                    }

                  

                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });
                this.dialogVisible=false
            },
        },
        mounted(){
            this.getData();
        }
    }
</script>
<style>
    
</style>