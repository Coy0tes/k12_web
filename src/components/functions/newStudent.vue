<template>
    <div style="padding-right:10px;padding-left:10px;">
        <div style="width:103.5%; height:50px; background-color:#fff;margin-top:-2px;margin-bottom:10px;margin-left:-10px; padding-right:25px; line-height:40px; padding-top:5px; ">



            <el-button type="primary" @click="showDialog" style="float:right; margin-right:20px;">报名</el-button>
            </div>
              <template>
                <el-table
                  :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  style="width: 100%;margin-top:-10px;" border>
                  <el-table-column
                    prop=""
                    label=""
                   width='1'>
                  </el-table-column>

                  <el-table-column
                    prop="id"
                    label="id"
                   align='center'>
                  </el-table-column> 

                  <el-table-column
                    prop="name"
                    label="姓名"
                   align='center'>
                  </el-table-column>
                  <el-table-column
                    prop="enrolmentTime"
                    label="入园日期"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    prop="klassId"
                    label="报名班级"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    prop="money"
                    label="报名费"
                    align='center'
                   >
                  </el-table-column>
                   <el-table-column
                    prop="payTime"
                    label="缴款时间"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    prop="teacherName"
                    label="备注"
                    align='center'
                    >
                  </el-table-column>
                  
                
                  <el-table-column
                    prop=""
                    label="操作"
                    align='center'
                    width="180">
                    <template slot-scope="scope">
           
            <el-button type="primary" size="small" @click="enrolment(scope.$index, scope.row)">入园</el-button>
            <el-button type="danger" size="small" @click="deleteStu(scope.$index, scope.row)">删除</el-button>
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
              </template>

<el-dialog

  :visible.sync="enrolmentVisible"
  width="30%"
  :before-close="handleClose">
 
    <div>
       
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">入园报道</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="enrolmentVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
        <div style="margin-left:150px;">
            
            姓 &nbsp;  名： <el-input v-model="stuName" placeholder="请输入内容" style="display:inline-block;width:36%;"></el-input>
       <br>
       报名费： <el-input v-model="stuMoney" placeholder="请输入内容" style="display:inline-block;width:36%; margin-top:20px;"></el-input>

        </div>
       

    </div>



  <span slot="footer" class="dialog-footer">
    <!-- <el-button @click="enrolmentVisible = false">取 消</el-button> -->
    <el-button type="primary" @click="putKlass">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  
  :visible.sync="deleteVisible"
  width="30%"
  :before-close="handleClose">
  <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">提示</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="deleteVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
  <span>是否删除？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deleteVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteStuSure">确 定</el-button>
  </span>
</el-dialog>


<el-dialog
  
  :visible.sync="dialogVisible"
  width="500px"
  :before-close="handleClose">
 
 <div>
     
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">入园报名</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
<el-form label-width="80px"  style="margin-left:100px;">
  <el-form-item label="入园日期">
        <el-date-picker
      v-model="value1"
      type="date"
      style="width:250px;"
      placeholder="选择日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="报名班级">
   <el-select v-model="value" placeholder="请选择班级" @change="chanalue" style='width:250px;'>
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>
  </el-form-item>
  <el-form-item label="报名费">
    <el-input style="width:250px;" v-model="enrolmentMoney"></el-input>
  </el-form-item> 
  <el-form-item label="幼儿姓名">
    <el-input style="width:250px;" v-model='enrolmentName'></el-input>
  </el-form-item>
  <el-form-item label="幼儿生日">
    <el-date-picker
      v-model="value3"
      type="date"
      style="width:250px;"
      placeholder="选择日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="交款时间">
    <el-date-picker
      v-model="value2"
      type="date"
      style="width:250px;"
      placeholder="选择日期">
    </el-date-picker>
  </el-form-item>
 
 
  <el-form-item label="备注">
    <el-input style="width:250px;" v-model="enrolmentTeacher" type="textarea"></el-input>
  </el-form-item>
</el-form>


 </div>
  <span slot="footer" class="dialog-footer">
    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
    <el-button type="primary" @click="putData">报 名</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            return {
              deleteVisible:false,
              index1:"",
              rowId:'',
                tableData:[],
                 currentPage:1,
                 pagesize:10,

                dialogVisible:false,
                enrolmentVisible:false,
                value:'',
                value1:'',
                value2:'',
                value3:'',
                enrolmentMoney:0,
                enrolmentName:'',
                enrolmentTeacher:'',
                klassesOptions:[],
                enrolmentId:0,
                stuName:'',
                stuMoney:0,
                planId:0,
            }
        },
        methods:{
            getData(){

                 this.$http({
                    method: 'get',
                    url:this.$getApi+'recreit/findAll?page=1&size=10',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('--------兴趣班get----------',res)
                        this.tableData=res.body.content
                    const {
                        body
                    } = res
                      

                })

                this.chanalue();
            },

            putData(){
                    var timestamp3 = new Date(this.value1).getTime();
                    var timestamp4 = new Date(this.value2).getTime();
                    var timestamp5 = new Date(this.value3).getTime();
                    console.log(timestamp3)

                    this.$http.post(
                    this.$getApi +'recreit/create',
                    {
                          "birthday":timestamp5,
                          "enrolmentTime": timestamp3,
                          "klassId": this.value,
                          "money": this.enrolmentMoney-0,
                          "name": this.enrolmentName,
                          "payTime": timestamp4,
                          "studentId": this.enrolmentId-0,
                          "teacherId": 0,
                          "teacherName": this.enrolmentTeacher,

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
                    console.log("===add Student body=000000====",res);
                    // this.getData();
                    console.log('birthday');

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
                this.dialogVisible = false
            },
            enrolment(index,row){

                console.log('111',row.name)
                this.stuName=row.name;
                this.stuMoney=row.money;
                this.planId=row.id;
                this.enrolmentVisible=true;
            },
             handleSizeChange: function (size) {
        this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },
            putKlass( ){
                    this.$http({
                    method: 'put',
                    url:this.$getApi+'recreit/enrolment?id='+this.planId,
               

                    
                      headers: {
                         // 'content-type': "multipart/form-data",
                        // 'Content-Type': 'application/json',
                                            'Authorization': 'Bearer ' + localStorage.token

                                        }
                    
                    
                }).then((res) => { // promise对象
                    console.log('======res=====',res)
                  console.log('------------------',res.body)
                    
                    const {
                        body
                    } = res
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
                this.enrolmentVisible = false
            },
            deleteStu(index, row){

                    // this.tableData.splice(index, 1);
                console.log('*-/-*/-*/-',row.id);
                this.rowId = row.id
                  this.index1=index
                  this.deleteVisible = true
              
            },
            deleteStuSure(){
                  this.tableData.splice(this.index1, 1);
                  this.$http({
                    method: 'delete',
                    url:this.$getApi+'recreit/delete/' + this.rowId ,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('---------兴趣班delete---------',res)
                    
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
                this.deleteVisible = false
            },
            showDialog(){
                this.dialogVisible=true;
            },

                  chanalue:function(){
      
         
                this.$http({
                    method: 'get',
                    url:  this.$getApi+'management/klasses',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res.body);

                    if (!!body.length) {
                        
                          var klassesArray=[];
                          res.body.forEach(function(item, index, array){
                               klassesArray.push({value:item.id,label:item.name})    
                          })
                             //this.value = klassesArray[0].value
                             this.klassesOptions = klassesArray;
                                
                            } else {
                                alert('err:' + body)
                            }
                        })

                        console.log('11111111',this.value)

                


            },




        },
        mounted(){
            this.getData();
        }


    }
</script>
<style>
    
</style>