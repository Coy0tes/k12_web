<template>
    <div style="padding:10px">

        <div class="line1" style=""> 
           <span style="margin-left:15px;">班级</span> 
                    <el-select v-model="value2" placeholder="请选择班级" @change="chanalue">
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select> 
            
        </div>


              <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%;margin-top:8px;" border ref="multipleTable" @selection-change="changeFun" >
              
            
               
                <el-table-column 
                prop="" 
                label="" 
                width="1"
                sortable >
                </el-table-column>
                <el-table-column prop="id" label="学生ID" width="100"sortable >
                </el-table-column>

                <el-table-column prop="user.username" sortable label="姓名">
                </el-table-column>

                <el-table-column prop="user.gender" 
                :formatter="formatSex"
                sortable
                label="性别">
                </el-table-column> 

                <el-table-column prop="accountName" 
          
                sortable
                label="账户">
                </el-table-column>
                 <el-table-column prop="klassName" 
          
                sortable
                label="班级">
                </el-table-column>

                

                

                <el-table-column label="操作" width="200" align='center'>
                    <template scope="scope">


                        <!-- 家长按钮 -->
                        <el-button size="small" @click="checkDing(scope.$index, scope.row)">授权</el-button>
                     
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



            <!-- style two -->

        <!--         <ul  v-for="item in tableData">
                    <li style="width:200px;height:200px; float:left;">
                       
                        <img :src="'https:'+item.avatar" alt="" style="border-radius: 50%;">
                   
                        
                    </li>
                </ul> -->






            <el-dialog
            
              :visible.sync="dialogVisible"
              width="600px"
              :before-close="handleClose">
                   <el-dialog
                      width="600px"
                      
                      :visible.sync="innerVisible"
                      append-to-body>
                    <div class="top">
                     <span class="top_text">授权</span>
                     <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                       <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="innerVisible = false">
                     </div>
                    </div>
                    <div style="width:600px;height:200px">
                        是否确认{{stuName}} 小朋友的家长视频授权
                        <br>
                        <el-button @click='surePost'>确认授权</el-button>
                    </div>



                    </el-dialog>



                  <div class="top">
                     <span class="top_text">视频授权</span>
                     <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                       <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
                     </div>
                 </div>
                 <!-- body -->
                 <div style="width:368px;margin:0 auto;margin-top:-36px;padding-bottom:20px">
                        <div v-for="item in genderData" style="font-size:16px">
                           {{stuName}} 小朋友的 {{item.relationType|formatStatus}}   手机：{{item.patriarch.actor.user.mobile}} 
                           <el-button size='mini' @click='innerVisible=true'>授权</el-button>
                        </div>
                 </div>
   
              <span slot="footer" class="dialog-footer">
               <!--  <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button> -->
              </span>
            </el-dialog>
    </div>
</template>
<script>
import Moment from 'moment';
// import rate from './rate.vue'
    export default {
        data(){
            return {
                value2:'',
                value1: null,
                tableData:[],
                klassesOptions:[],
                value:'',
                 showSize: 10,
                current_page: 0,
                count: 100,
                currentPage:1,
                 pagesize:10,
                 dialogVisible:false,
                 innerVisible:false,
                 stuName:'',
                 value11:'',
                 value22:'',
                 value33:'',
                 value44:'',
                 value55:'',
                 value66:'',
                 value77:'',
                 value88:'',
                 stuId:'',
                 textarea:'',
                 genderData:[],
                 accessToken:'',
                 accountName:'',
                 password:'',
            }
        },
    //        components: { //2、暴露
  
    //   rate,
    
 
    // },
             filters: {
           formatStatus: function (val) {
              console.log(val)
              return val == 'MOMMY' ? '妈妈' : val == 'DADDY' ? '爸爸' :val == 'GRANDPA' ? '爷爷' : val == "GRANDMA" ? '奶奶' :'未知';
          }
      }, 
        methods:{
            surePost(){
                  this.$http({
                    method: 'post',
                    //localStorage.userId
                    url:  this.$getApi+'hkuser/createhkAccount?userId=1070&stuId='+this.stuId+'&token='+this.accessToken+'&stuName='+this.stuName+'&accountName='+this.accountName+'&password='+this.password,

                      
                      headers:{
                       
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token

                      }
                  
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
            sure(){
                console.log(this.value22)
                       this.$http.post(
                    this.$getApi +'weeklyrRemark/management/created',
                   {
                      "dine": this.value22,
                      "emotion": this.value11,
                      "environment": this.value77,
                      "health": this.value66,
                      "klassId": this.value2,
                      "partner": this.value44,
                      "sanitation": this.value55,
                      "seleep": this.value33,
                      "self": this.value88,
                      "studentId": this.stuId,
                      "tcontext":this.textarea,
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
            },
            changeRate(s) {
                console.log(s)
        this.star = s //更新当前星星数量
        this.$emit('input', s); //将当前星星数量s与v-model绑定
     },

                checkDing(index, row){
                    console.log(row)
                    this.stuName=row.name
                    this.stuId=row.id

                        this.$http({
                    method: 'get',
                    url: this.$getApi + 'management/guardians?schoolId='+ localStorage.schoolsId +'&studentId='+row.id,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res.body);
                        this.genderData=res.body
      
                        })


                    this.dialogVisible=true



                },
               dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return Moment(date*1000).format("YYYY-MM-DD ");  
            },
             formatSex: function (row, column) {
            // console.log('-------formatDate------------',row.periodDiscounts)
                return row.user.gender == "FEMALE" ? '女' : row.user.gender == "MALE" ? '男' : "未知";

            },
                    handleSizeChange: function (size) {
                        this.pagesize = size;
                    },
                    handleCurrentChange: function(currentPage){
                        this.currentPage = currentPage;
                    },

                    getSubToken(){
                        console.log('0000000000000000')
                        // console.log('111111111111',token)

                     this.$http({
                    method: 'get',
                    // url: this.$getApi + 'hkuser/getSubToken',
                    url: this.$getApi + 'hkuser/findByUserId?userId=1070',//+localStorage.userId,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res
                    this.accountName=res.body.accountName
                    this.accountId=res.body.accountId
                    this.password=res.body.password
                    console.log("===getSubToken===",res);
                    console.log("===getSubToken===",);
                    // this.accessToken=res.body.accessToken
                 
                        })
                    },

                    getVideoToken(){
                        

                    this.$http({
                    method: 'get',
                    url: this.$getApi + 'hkuser/gethkToken',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===getVideoToken===",res.body);
                    console.log("===getVideoToken===",res.body.accessToken);
                    this.accessToken=res.body.accessToken
                     console.log("===getVideoToken===",this.accessToken);
                  this.getSubToken();
                        })
               

                    },
                getData() {                
                   this.value2 =this.value2 + 1;
                    this.$http({
                    method: 'get',
                    url:  this.$getApi+'hkuser/findUsers?klassId='+this.value2,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                     // console.log('++++学生生日+++++',res.bodyText);
                  
                     console.log('++++学生id++++++++++++++++++++++++++++++++++',res.body)

                    const {
                        body
                    } = res


                    console.log("===res students===",res.body);

                        // state=1='授权'
                        for (var i = 0; i < res.body.length; i++) {
                                 if (res.body[i].state==0) {
                                this.tableData .push(res.body[i])
                        }
                        }
                       

                    // if (!!body.length) {
                        
                        this.count = body.length



                this.$http({
                    method: 'get',
                    url: this.$getApi + 'management/klasses',

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
                                // alert('err:' + body)
                            }
                        })

                    // } else {
                    //     alert('err:' + body)
                    // }

                })




            },
            chanalue:function(){
              this.value2=this.value2;
         
              console.log(this.value2)




                this.$http({
                    method: 'get',
                    url:   this.$getApi+'hkuser/findUsers?klassId=' + this.value2,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res)

                    const {
                        body
                    } = res

                    console.log("===res students===",res.body);
                      this.tableData = body
                    if (!!body.length) {
                      
                        this.count = body.length


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

                    } else {
                        alert('err:' + body)
                    }

                })





            },
        },
        mounted(){

            this.getData();
            this.getVideoToken();
        }
    }
</script>
<style>
    
</style>