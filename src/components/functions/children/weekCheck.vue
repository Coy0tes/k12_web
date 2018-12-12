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


              <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%;margin-top:8px;" border ref="multipleTable" @selection-change="changeFun">
              
            
               
                <el-table-column 
                prop="" 
                label="" 
                width="1"
                sortable >
                </el-table-column>
                <el-table-column prop="id" label="学生ID" width="100"sortable >
                </el-table-column>

                <el-table-column prop="name" sortable label="姓名">
                </el-table-column>

                <el-table-column prop="gender" 
                :formatter="formatSex"
                sortable
                label="性别">
                </el-table-column>

                <el-table-column prop="birthday" label="生日"  sortable :formatter="dateFormat" >
                </el-table-column>

                <el-table-column prop="joinedAt" label="入校时间" sortable :formatter="dateFormat">
                </el-table-column>

                <el-table-column label="操作" width="200" align='center'>
                    <template scope="scope">


                        <!-- 家长按钮 -->
                        <el-button size="small" @click="checkDing(scope.$index, scope.row)">点评</el-button>
                        <el-button size="small" @click="checkDing1(scope.$index, scope.row)">历史</el-button>
                     
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
            
              :visible.sync="dialogVisible"
              width="600px"
              :before-close="handleClose">
                  <div class="top">
                     <span class="top_text">本周点评</span>
                     <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                       <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
                     </div>
                 </div>
                 <!-- body -->
                      <div style="width:172px;margin:0 auto;">
                         <div>
                                <div style="font-size:18px">{{stuName}} 小朋友</div>
                              <ul style="vertical-align: middle;">
                                  <li style="font-size:16px;vertical-align: middle;"><span style="display:inline-block;    position: relative;
    top: -5px;left:20px"> 情 绪:</span><rate style="color: rgb(247, 186, 42); display:inline-block;margin-top:3px;margin-left:30px" v-model='value11' ></rate></li>

                                  <li style="font-size:16px;vertical-align: middle;"><span style="display:inline-block;    position: relative;
    top: -5px;left:20px"> 进  餐:</span><rate style="color: rgb(247, 186, 42);display:inline-block;margin-left:30px" v-model='value22' ></rate></li>
                                  <li style="font-size:16px"><span style="display:inline-block;    position: relative;
    top: -5px;left:20px"> 睡 眠:</span><rate style="color: rgb(247, 186, 42);display:inline-block;margin-left:30px" v-model='value33' ></rate></li>
                                  <li style="font-size:16px"><span style="display:inline-block;    position: relative;
    top: -5px;">同伴相处:</span><rate style="color: rgb(247, 186, 42);display:inline-block" v-model='value44' ></rate></li>
                                  <li style="font-size:16px"><span style="display:inline-block;    position: relative;
    top: -5px;">卫生习惯:</span><rate style="color: rgb(247, 186, 42);display:inline-block" v-model='value55' ></rate></li>
                                  <li style="font-size:16px"><span style="display:inline-block;    position: relative;
    top: -5px;">身体状况:</span><rate style="color: rgb(247, 186, 42);display:inline-block" v-model='value66' ></rate></li>
                                  <li style="font-size:16px"><span style="display:inline-block;    position: relative;
    top: -5px;">适应环境:</span><rate style="color: rgb(247, 186, 42);display:inline-block" v-model='value77' ></rate></li>
                                  <li style="font-size:16px"><span style="display:inline-block;    position: relative;
    top: -5px;">自理能力:</span><rate style="color: rgb(247, 186, 42);display:inline-block" v-model='value88' ></rate></li>
                              </ul>  
                         </div>
                         <div style="width:400px;height:200px;margin-left:-100px">
                             <div style="font-size:18px">老师的话:(本周进步，学习情况)</div>
                             <el-input
                              type="textarea"
                              :rows="5"
                              placeholder="请输入内容"
                              v-model="textarea">
                            </el-input>

                         </div>
                              
                     
                           

                      </div>
              <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="sure" style='margin-right:252px'>确 定</el-button>
              </span>
            </el-dialog>       


              <el-dialog
            
              :visible.sync="dialogVisible1"
              width="600px"
              :before-close="handleClose">
                  <div class="top">
                     <span class="top_text">点评反馈</span>
                     <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                       <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible1 = false">
                     </div>
                 </div>
                 <!-- body -->
                 <div style="font-size:18px;margin-left:90px;margin-top:-40px"><span>学生</span>：{{stuName}} 
                    &nbsp;&nbsp;日期： <el-select v-model="value00" placeholder="请选择" @change='choseData'>
                            <el-option
                              v-for="item in DataArray"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                      </div>
                     


                      <span style="margin-left:90px;font-size:18px;position:relitive;top:5px;display:inline-block;">评价</span>
                      <div style="width:172px;margin:0 auto;">
                         <div>
                          
                              <ul style="vertical-align: middle;">
                                  <li style="font-size:16px;vertical-align: middle;margin-top:3px">
                                    <span style="display:inline-block;    position: relative;top: -5px;left:20px"> 情 绪:</span>
                                    
                                       <div style="display:inline-block;margin-left:22px;">
                                            <li v-for="s in value111" style="float:left;margin-right:5px;display:inline-block;">
                                                  <i class="el-icon-star-on" style='color: rgb(247, 186, 42);display:inline-block;margin-left:5px;font-size:20px;'>
                                                      
                                                  </i>
                                            </li>



                                       </div>  

                                     
                                             
                                    </li>

                                  <li style="font-size:16px;vertical-align: middle;margin-top:3px"><span style="display:inline-block;    position: relative;
    top: -5px;left:20px"> 进  餐:</span>
                                    <div style="display:inline-block;margin-left:22px;">
                                            <li v-for="s in value222" style="float:left;margin-right:5px;display:inline-block;">
                                                  <i class="el-icon-star-on" style='color: rgb(247, 186, 42);display:inline-block;margin-left:5px;font-size:20px;'>
                                                      
                                                  </i>
                                            </li>



                                       </div> 
                                    </li>
                                  <li style="font-size:16px;margin-top:3px"><span style="display:inline-block;    position: relative;
    top: -5px;left:20px"> 睡  眠:</span><div style="display:inline-block;margin-left:27px;">
                                            <li v-for="s in value333" style="float:left;margin-right:5px;display:inline-block;">
                                                  <i class="el-icon-star-on" style='color: rgb(247, 186, 42);display:inline-block;margin-left:5px;font-size:20px;'>
                                                      
                                                  </i>
                                            </li>



                                       </div> </li>
                                  <li style="font-size:16px;margin-top:3px"><span style="display:inline-block;    position: relative;
    top: -5px;">同伴相处:</span><div style="display:inline-block;margin-left:0px;">
                                            <li v-for="s in value444" style="float:left;margin-right:5px;display:inline-block;">
                                                  <i class="el-icon-star-on" style='color: rgb(247, 186, 42);display:inline-block;margin-left:5px;font-size:20px;'>
                                                      
                                                  </i>
                                            </li>



                                       </div> </li>
                                  <li style="font-size:16px;margin-top:3px"><span style="display:inline-block;    position: relative;
    top: -5px;">卫生习惯:</span><div style="display:inline-block;margin-left:0px;">
                                            <li v-for="s in value555" style="float:left;margin-right:5px;display:inline-block;">
                                                  <i class="el-icon-star-on" style='color: rgb(247, 186, 42);display:inline-block;margin-left:5px;font-size:20px;'>
                                                      
                                                  </i>
                                            </li>



                                       </div> </li>
                                  <li style="font-size:16px;margin-top:3px"><span style="display:inline-block;    position: relative;
    top: -5px;">身体状况:</span><div style="display:inline-block;margin-left:0px;">
                                            <li v-for="s in value666" style="float:left;margin-right:5px;display:inline-block;">
                                                  <i class="el-icon-star-on" style='color: rgb(247, 186, 42);display:inline-block;margin-left:5px;font-size:20px;'>
                                                      
                                                  </i>
                                            </li>



                                       </div> </li>
                                  <li style="font-size:16px;margin-top:3px"><span style="display:inline-block;    position: relative;
    top: -5px;">适应环境:</span><div style="display:inline-block;margin-left:0px;">
                                            <li v-for="s in value777" style="float:left;margin-right:5px;display:inline-block;">
                                                  <i class="el-icon-star-on" style='color: rgb(247, 186, 42);display:inline-block;margin-left:5px;font-size:20px;'>
                                                      
                                                  </i>
                                            </li>



                                       </div> </li>
                                  <li style="font-size:16px;margin-top:3px"><span style="display:inline-block;    position: relative;
    top: -5px;">自理能力:</span><div style="display:inline-block;margin-left:0px;">
                                            <li v-for="s in value888" style="float:left;margin-right:5px;display:inline-block;">
                                                  <i class="el-icon-star-on" style='color: rgb(247, 186, 42);display:inline-block;margin-left:5px;font-size:20px;'>
                                                      
                                                  </i>
                                            </li>



                                       </div> </li>
                              </ul>  
                         </div>
                         <div style="width:400px;height:100px;margin-left:-100px">
                             <div style="font-size:18px;margin-left:-20px;margin-top:10px">老师反馈</div>
                            <div style="width:350px;height:80px;border:1px solid #ccc;margin-left:38px;border-radius: 10px;">
                                
                                 <span style="padding-left:10px;display:inline-block">   {{tcontext}}</span> 
                            </div>

                         </div>
                         <div style="width:400px;height:100px;margin-left:-100px">
                             <div style="font-size:18px;margin-left:-20px;margin-top:10px">家长反馈</div>
                            <div style="width:350px;height:80px;border:1px solid #ccc;margin-left:38px;border-radius: 10px;">
                               <span style="padding-left:10px;display:inline-block">   {{pcontext}}</span> 
                            </div>

                         </div>
                              
                     
                           

                      </div>
              <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <!-- <el-button type="primary" @click="sure" style='margin-right:252px'>确 定</el-button> -->
              </span>
            </el-dialog>
    </div>
</template>
<script>
import Moment from 'moment';
import rate from './rate.vue'
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
                 dialogVisible1:false,
                 stuName:'',
                 value11:'',
                 value22:'',
                 value33:'',
                 value44:'',
                 value55:'',
                 value66:'',
                 value77:'',
                 value88:'',
                 value111:'',
                 value222:'',
                 value333:'',
                 value444:'',
                 value555:'',
                 value666:'',
                 value777:'',
                 value888:'',
                 stuId:'',
                 textarea:'',
                 value00:'',
                 DataArray:[],
                 tcontext:'',
                 pcontext:'',
            }
        },
           components: { //2、暴露
  
      rate,
    
 
    },
        methods:{
            choseData(){
                    

                           this.$http({
                    method: 'get',
                    url: this.$getApi + 'weeklyrRemark/management/find?studentId='+this.stuId +'&klassId='+this.value2 +'&date='+this.value00,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("weeklyrRemark/management/find?studentId",res);
                    this.value111=res.body[0].emotion
                    this.value222=res.body[0].dine
                    this.value333=res.body[0].seleep
                    this.value444=res.body[0].partner
                    this.value555=res.body[0].sanitation
                    this.value666=res.body[0].health
                    this.value777=res.body[0].environment
                    this.value888=res.body[0].self
                    this.tcontext=res.body[0].tcontext
                    this.pcontext=res.body[0].pcontext
                    console.log('this.value111',res.body[0].dine)
                    // this.value222='',
                    // this.value333='',
                    // this.value444='',
                    // this.value555='',
                    // this.value666='',
                    // this.value777='',
                    // this.value888='',
                




                     
                        })
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
                    this.dialogVisible=true
                },checkDing1(index, row){
                    console.log(row)
                    this.stuName=row.name
                    this.stuId=row.id

                           this.$http({
                    method: 'get',
                    url: this.$getApi + 'weeklyrRemark/management/findDate?studentId='+row.id,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("weeklyrRemark/management/countUnRead",res);
                         var DataArray=[];
                          res.body.forEach(function(item, index, array){
                               DataArray.push({value:item.date,label:item.date})    
                          })
                          this.DataArray=DataArray
                   
                        })






                    this.dialogVisible1=true
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
                return row.gender == "FEMALE" ? '女' : row.gender == "MALE" ? '男' : "未知";

            },
                    handleSizeChange: function (size) {
                        this.pagesize = size;
                    },
                    handleCurrentChange: function(currentPage){
                        this.currentPage = currentPage;
                    },
                getData() {                
                   this.value2 =this.value2 + 1;
                    this.$http({
                    method: 'get',
                    url:  this.$getApi+'management/students?klassId=' + this.value2,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                     console.log('++++学生生日+++++',res.bodyText);
                     console.log('----------------------------------',JSON.parse(res.bodyText));
                     console.log('++++学生id++++++++++++++++++++++++++++++++++',res.body)

                    const {
                        body
                    } = res


                    console.log("===res students===",res.body);



                    // if (!!body.length) {
                        this.tableData = body
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
                    url:   this.$getApi+'management/students?klassId=' + this.value2,

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
        }
    }
</script>
<style>
    
</style>