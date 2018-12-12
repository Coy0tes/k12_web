<template>
    <div>
    
              <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%; margin-top:50px;" ref="multipleTable" border :header-cell-class-name="tableheaderClassName" @selection-change="changeFun">
            
                <el-table-column prop="teacherId" align="center"  label="教师ID" width="100">
                </el-table-column>
                <el-table-column prop="name" align="center" label="姓名">
                </el-table-column> 
                
                <el-table-column prop="mobile" align="center" label="联系方式">
                </el-table-column>

                <el-table-column prop="klass" align="center" label="任命班级">
                </el-table-column>


                <el-table-column label="操作" width="350" align="center">
                    <template scope="scope">
                                  <el-button size="small" type="danger" @click="gaveKlass(scope.$index, scope.row)">删除任命</el-button>
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
                    <el-dialog
        
          :visible.sync="deleteTeacherVisible"
          width="30%"
          :before-close="handleClose">
             <!-- <div class="top">
             <span class="top_text">删除</span>
             <img src="../../../assets/close3.png" height="48" width="48" class="add_close"@click="deleteTeacherVisible = false">
          </div> -->

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">删除</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="deleteTeacherVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
          <span style="margin-left:20px;">是否删除此老师的任命班级？</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="deleteTeacherY">是</el-button>
            <el-button @click="deleteTeacherVisible = false">否</el-button>
            
          </span>
        </el-dialog>

    </div>
</template>
<script>
    export default {
        data(){
            return {
                    tableData:[],
                     showSize: 10,
                current_page: 0,
                 currentPage:1,
                      pagesize:10,
                count: 100,
                deleteTeacherVisible:false,
                theacheringId:'',
                teacherIndex:'',
            }
        },
        methods:{
                        handleSizeChange: function (size) {
                            this.pagesize = size;
                        },
                        handleCurrentChange: function(currentPage){
                            this.currentPage = currentPage;
                        },
            getData(){
                   this.$http({
                        method: 'get',
                        url:this.$getApi+'management/teachings',                  
                        headers: {
                            // 'content-type': "multipart/form-data",
                            'Authorization': 'Bearer ' + localStorage.token

                        }
                    }).then((res) => { // promise对象
                            
                        const {
                            body
                        } = res

                        var teacherDate=[];
                          res.body.forEach(function(item, index, array){
                                                           teacherDate.push({
                                                            teacherId:item.teacher.actor.id,
                                                            name:item.teacher.actor.user.username,
                                                            mobile:item.teacher.actor.user.mobile,
                                                            klass:item.klass.name,
                                                            id:item.id,


                                                        })    
                                                      })
                          this.tableData=teacherDate

                       
                    console.log('任命列表',res)
                      
                    })
            },
            gaveKlass(index,row){
                    console.log(row)
                    this.theacheringId=row.id
                    this.deleteTeacherVisible=true
                    this.teacherIndex=index
            },
            deleteTeacherY(){

                  this.$http({
                    method: 'delete',
                    url:this.$getApi+'management/teachings/'+this.theacheringId,

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
                    console.log("===this.rowTeacherId===",this.rowTeacherId);

                     
                  

                  

                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });
                this.tableData.splice(this.teacherIndex, 1)
                this.getData();
                this.deleteTeacherVisible = false
            }
        },
        mounted(){
            this.getData();
        }
    }
</script>
<style>
    
</style>