<template>
        <div style="width:100%;">
             <div style="width:100%;height:20px; ">
       
       </div>
          <div style="padding-right:10px;width:100%;padding-left:10px;">
            
         
            <el-table
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                border
                style="width: 100%;">
                <el-table-column
                  prop="id"
                  label="id"
                  align="center"
                  >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  align="center"
                  >
                </el-table-column>
                <el-table-column
                  prop="className"
                  align="center"
                  label="班次名">
                </el-table-column>
                <el-table-column
                  prop="className"
                  align="center"
                  label="班次名">
                   <template scope="scope">
              
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button size="small" type="warning" @click="getPutId(scope.$index, scope.row)">修改</el-button>
                   
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
               <el-dialog
               
                  :visible.sync="deleteVisible"
                  width="600px"
                  :before-close="handleClose">
                
                    <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">删除</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="deleteVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
                  <span style="margin-left:50px;">是否删除次班次？</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteVisible = false">取 消</el-button>
                    <el-button type="primary" @click="Delete">确 定</el-button>
                  </span>
                </el-dialog>

                <el-dialog
                
                  :visible.sync="putDialog"
                  width="600px"
                  :before-close="handleClose">
                  <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">修改班次</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="putDialog = false">
             </div>
          </div>
          <!-- Newtitle  end-->
                 <div style="margin-left:150px;">
                   修改为 <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in tableData1"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>

                 </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="putDialog = false">取 消</el-button>
                    <el-button type="primary" @click="Put">确 定</el-button>
                  </span>
                </el-dialog>
        </div>
</template>
<script>
    export default {
        data(){
            return {
                tableData:[],
                tableData1:[],
                rowId:'',
                deleteVisible:false,
                putDialog:false,
                value:'',
                UserId:'',
                showSize: 10,
                current_page: 0,
                 currentPage:1,
                 pagesize:10,
                count: 100,
            }
        },
        methods:{
             getData(){
                 this.$http({
                    method: 'get',
                    url:this.$getApi+'scheduilingPerson/management',                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                    console.log("===get grades====",body);
                    console.log("===get grades====",res);
                   
                              var newData=[];
                    body.forEach(function(item, index, array){
                        newData.push({
                            id:item.id,
                            name:item.username,
                            className:item.schedulingId.name,
                            userId:item.actorId,


                        })

                    });



 this.tableData=newData;




                  

                  

                })
               this.getData1(); 
            },
             getData1(){
                 this.$http({
                    method: 'get',
                    url:this.$getApi+'scheduling/management',                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                    console.log("===get grades====",body);
                    console.log("===get grades====",res);
                    var newData=[];
                    body.forEach(function(item, index, array){
                        newData.push({
                            value:item.id,
                            label:item.name,
                            



                        })

                    });



 this.tableData1=newData;
                    
                  

                  

                })
            },
            handleDelete(index,row){
                this.deleteVisible=true
                console.log(row.id)
                this.rowId=row.id

            },
            Delete(){
                this.deleteVisible=false;
                     this.$http({
                    method: 'delete',
                    url:this.$getApi+'scheduilingPerson/management/'+this.rowId ,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                this.$message({
                       message: '成功',
                     type: 'success'
                    }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    }); 
                });
                    const {
                        body
                    } = res
                      


                    console.log("===res students===",res.body);


                  

                })
                this.tableData.splice(this.index, 1);
            },
             getPutId(index,row){
                this.putDialog=true,
                this.rowId=row.id
                this.UserId=row.userId
                console.log('11111111',row)
            },
             handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
            },
            Put(){

                console.log('value',this.value)
                   this.$http.put(
                    this.$getApi +'scheduilingPerson/management/'+this.rowId,
                    {
                         "schedulingId": this.value,
                         "userIds": this.UserId
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
                    this.getData();
                    console.log('birthday');
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    }); 
                });
                this.putDialog = false;


            },

        },

         mounted(){
            this.getData();
        },
    }
</script>
<style>
    
</style>
