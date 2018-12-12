<template>
    <div>
          <div>
            <div style="width:103.5%; height:50px; background-color:#fff;margin-top:19px;margin-bottom:20px;margin-left:-30px; padding-right:25px; line-height:40px;padding-top:1px; z-index:100">
                 
            <el-button type="primary" @click="showDialog=true" style="float:right; margin-top:-5px; margin-left:74.5%;">添加Wifi</el-button>
            <!-- <el-button type="primary" @click="runScript" style="float:right; margin-top:2px; margin-left:75%;z-index:2000;position:absolute;">运行脚本</el-button> -->
   
            </div>
                
            <div>
            <el-table
            :data="tableData"
            border
            style="width: 100%;margin-top:-28px">
            <el-table-column
              prop="name"
              label="无线 名字"
            >
            </el-table-column>
            <el-table-column
              prop="dIP"
              label="无线 IP"
             >
            </el-table-column>
            <el-table-column
              prop="mac"
              label="无线 mac">
            </el-table-column>

            <el-table-column
              prop="ssrd"
              label="无线 ssrd">
            </el-table-column>
            <el-table-column
              prop=""
              label="操作">
              <template scope="scope"> 
                  <el-button size="small" type='primary'>编辑</el-button>
                  <el-button @click="deleteData(scope.$index, scope.row)" size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>   

   </div>
    <el-dialog

  :visible.sync="showDialog"
  width="600px"
  :before-close="handleClose">
 <div>
<!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">添加wifi</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="showDialog = false">
             </div>
          </div>
          <!-- Newtitle  end-->

     <el-form label-width="90px" :model="form">
  <el-form-item label="无线网名字">
    <el-input v-model="form.name" placeholder="请输入无线网名字" style="width:400px;"></el-input>
  </el-form-item>
  <el-form-item label="无线网IP">
     <el-input v-model="form.dIP" placeholder="请输入无线网IP" style="width:400px;"></el-input>
  </el-form-item>
  <el-form-item label="无线网mac">
    <el-input v-model="form.mac" placeholder="请输入无线网mac"style="width:400px;"> </el-input>

    
  </el-form-item>
  <el-form-item label="无线网ssrd">
    <el-input v-model="form.ssrd" placeholder="请输入无线网ssrd" style="width:400px;"></el-input>
  </el-form-item>
</el-form>



 </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="showDialog = false">取 消</el-button>
    <el-button type="primary" @click="postData">确 定</el-button>
  </span>
</el-dialog>
          
        </div>
    </div>
 
</template>
<script>
    export default {
        data(){
            return {
                tableData:[],
                showDialog:false,
                form:{
                  dIP: "",
                  mac: "",
                  name: "",
                  ssrd: ""
                }
            }
        },
        methods:{
            getData(){
                this.$http({
                    method: 'get',
                    url:this.$getApi+'device/management',                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token  

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                    console.log("===wifi 列表====",body);
                    console.log("===wifi 列表====",res);

                   this.tableData=body

                })
                
            },
            postData(){
                   this.$http.post(
                    this.$getApi+'device/management',
                    //this.$getApi+'management/grades',
                    this.form,
                    {
                      headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+localStorage.token

                      }
                    }
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===device/management====",res);
                    this.$message({
                      message: '成功',
                      type: 'success'
                    }); 
                }).catch((res) =>{
                    this.$message({
                      message: '失败，',
                      type: 'error'
                    }); 
                })
                this.showDialog = false
            },
            deleteData(index,row){
              console.log(row)
                    this.$http({
                    method: 'delete',
                    url:this.$getApi+'device/management/'+row.id ,

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
                      this.tableData.splice(this.index, 1);
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
            }

        },
        mounted(){
            this.getData();
        },
    }
</script>
<style>
    
</style>