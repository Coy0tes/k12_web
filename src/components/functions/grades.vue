<template>
    <div v-loading="loading2"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
          <div class="line"> 
                <div style="width:103.5%;  background-color:#fff;margin-top:-10px;margin-bottom:10px;margin-left:-28px;padding-left:28px; padding-right:25px; line-height:40px;">


                    <el-button type="primary" @click="showDialog=true" style="float:right;margin-top:3px;margin-bottom:3px;">新增年级</el-button>
            </div>

                   

        </div>
       <el-table
            :data="tableData"
            stripe
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="id"
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="name"
              label="年级"
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="description"
              align="center"
              label="描述">
            </el-table-column>

            <el-table-column
              prop=""
              align="center"
              label="操作">
              <template scope="scope">
                  <el-button size="small" type="primary" @click="showPut(scope.$index, scope.row)">编辑</el-button>
              </template>
            </el-table-column>
        </el-table>

            <el-dialog
            
              :visible.sync="showDialog"
              width="570px"
              :before-close="handleClose">
       <!--  <div class="top" style="width:100%;">
             <span class="top_text">新增年级</span>
             <img src="../../assets/close3.png" height="48" width="48" class="add_close"@click="showDialog = false">
          </div> -->
            <div class="top">
             <span class="top_text">新增年级</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="showDialog = false">
             </div>
          </div>
            <div style="margin-left:120px;">
                <div style="margin-bottom:30px;">班级名:<el-input style="width:200px;" v-model="KlassName"></el-input></div> 
                <div>描述：<el-input type="textarea" style="width:200px;" v-model="KlassDesc"></el-input></div> 
                

            </div>
              <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="showDialog = false">取 消</el-button> -->
                <el-button type="primary" @click="postData">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog
            
              :visible.sync="PutDialog"
              width="570px"
              :before-close="handleClose">
        <!-- <div class="top" style="width:100%;">
             <span class="top_text">修改年级</span>
             <img src="../../assets/close3.png" height="48" width="48" class="add_close"@click="PutDialog = false">
          </div> -->
           <div class="top">
             <span class="top_text">修改年级</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="PutDialog = false">
             </div>
          </div>
            <div style="margin-left:120px;">
                <div style="margin-bottom:30px;">班级名:<el-input style="width:200px;" v-model="KlassName"></el-input></div> 
                <div>描述：<el-input type="textarea" style="width:200px;" v-model="KlassDesc"></el-input></div> 
                

            </div>
              <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="PutDialog = false">取 消</el-button> -->
                <el-button type="primary" @click="putData">确 定</el-button>
              </span>
            </el-dialog>

    </div>
</template>
<script>
    export default {
        data(){
            return {
                tableData:[],
                showDialog:false,
                PutDialog:false,
                KlassName:'',
                KlassDesc:'',
                rowId:'',
                loading2:true,
            }
        },
        methods:{
            getData(){
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
                    this.loading2=false
                        console.log(res)
                        this.tableData=res.body
                });


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
                        console.log('毕业的班级',res)
                        
                });
            },
            postData(){
                       this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'management/grades',
                   {
                      "description":this.KlassDesc,
                      "name": this.KlassName,
                      "schoolId": localStorage.schoolsId
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
                this.showDialog=false
            },
            showPut(index,row){
                console.log(row.id)
                this.rowId=row.id
                this.PutDialog=true
            },
            putData(){
                  this.$http.put(
                     this.$getApi+'management/grades/' + this.rowId,
                     {
                        "description":this.KlassDesc,
                        "name": this.KlassName,
                        "schoolId": localStorage.schoolsId
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
                 this.PutDialog=false
            }
        },
        mounted(){
            this.getData();
        }
    }
</script>
<style>
    
</style>