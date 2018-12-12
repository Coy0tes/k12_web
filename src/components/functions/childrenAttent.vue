<template>
    <div>
        <!-- 儿童考勤 -->
  
        <div style="padding-left:10px;padding-right:10px;">
            <!-- top -->
            <div style="padding-top:3px;padding-bottom:3px; margin-top:10px;">
                <el-select v-model="value" placeholder="请选择查询周期" @change='changeData'>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select> 

                    <el-date-picker
                      v-model="value33"
                      type="date"
                      placeholder="选择日期"
                      v-show='showDate'>
                    </el-date-picker>



                       <el-select v-model="value1" placeholder="请选择班级" @visible-change="chanalue">
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>
                  <el-button type='primary' @click="search">查询</el-button>
                  <!-- <el-button type='primary' @click="search1">查询1</el-button> -->
                  <el-button type='primary' @click="postData" style="float:right">打卡</el-button>
                  <el-button type='primary' @click="postManyData" style="float:right">一键补卡</el-button>
            </div>

            <!-- 日 -->
            <el-table
            :data="tableData"
            border
            v-show='dtime'
            style="width: 100%">
            <el-table-column
              prop=""
              label=""
              width='1'>
            </el-table-column>  
             <el-table-column
              prop="date"
              label="日期"
              align='center'>
            </el-table-column>
              <el-table-column
              prop="name"
              label="姓名"
              align='center'>
            </el-table-column>
            <el-table-column
              prop="earliest"
              label="打卡最早时间"
              :formatter="dateFormat"
              align='center'>
            </el-table-column>
            <el-table-column
              prop="latest"
              label="打卡最晚时间"
              :formatter="dateFormat"
              align='center'>
            </el-table-column> 
                <el-table-column
                  
                  label="操作"
                  width="180"
                  align="center">
                  <template slot-scope="scope" >
                   
                    <el-button @click="handleClick(scope.row)"  size="small"  v-if="scope.row.type">补卡</el-button>
                    <el-button @click="handleClickmsg(scope.row)"  size="small"  >详情</el-button>
                   
                  </template>
                </el-table-column>
         
          </el-table>
          <!-- 月 /周-->
           <el-table
            :data="tableData"
            border
            style="width: 100%" 
            v-show='mwtime'>
            <el-table-column
              prop=""
              label=""
              width='1'>
            </el-table-column>  
             
              <el-table-column
              prop="name"
              label="姓名"
              align='center'>
            </el-table-column>
            <el-table-column
              prop="attendCount"
              label="打卡次数"
              align='center'>
            </el-table-column> 
              <el-table-column
              
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)"  size="small">补卡</el-button>
                   
                  </template>
                </el-table-column>
         
          </el-table>
        </div>
            <!-- 补签 -->
            <el-dialog
             
              :visible.sync="dialogVisible"
              width="600px"
              :before-close="handleClose">
               <div class="top">
             <span class="top_text">补卡</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible=false">
             </div>
            </div>
            <div style="width:300px;height:140px;margin:0 auto;">
              补卡时间：
                       <el-date-picker
                          v-model="value2"
                          type="datetime"
                          placeholder="选择日期时间"
                          default-time="12:00:00">
                        </el-date-picker>
                        <br>
                        <br>
                儿童体温：
            
                <el-input v-model="temperature" placeholder="请输入体温" style="width:210px"></el-input>°C




            </div>
            <div style="width:80px;height:30px;margin:0 auto">
                <el-button type="primary"  @click='sure'>确 定</el-button>
            </div>
              <span slot="footer" class="dialog-footer">
               
                
              </span>
            </el-dialog> 
            <!-- 签到 -->
             <el-dialog
             
              :visible.sync="dialogVisible1"
              width="600px"
              :before-close="handleClose">
               <el-dialog
                  width="600px"
                  
                  :visible.sync="innerVisible"
                  append-to-body>

<!-- 内层 Dialog -->
  <div class="top">
             <span class="top_text">选择儿童</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="innerVisible=false">
             </div>
            </div>
              <div style="width:600px;margin:0 auto;padding-bottom:30px;">
                <el-select v-model="value22" placeholder="请选择" style="width:250px;margin-left:170px" @change="choesKlass">
                <el-option
                  v-for="item in klassesOptionss"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div style="width:500px; margin-left:50px;background-color:#fff;margin-bottom:20px;margin-top:20px">


                    <ul v-for="(item,index) in chackArry">
                        <li style="width:80px;height:80px;background-color:#CCC;margin-left:15px;float:left;margin-top:20px;">
                            <div>
                                 <!-- <el-checkbox  style="float:left" true-label='abc'  checked='qwe'@change='checkboxCH'></el-checkbox> -->

                                 <input type="checkbox"  @click="checkboxCH(item.stuId,index,item.stuName)" @change="checkboxCl" style="float:left; width:15px;height:15px">

                                 <div style="float:right; border-radius: 50%; width:50px;height:50px;background-color:#FFF;margin-right:15px;margin-top:5px;    margin-top: -12px;"><img :src="item.stuImg" alt="" style="width:50px;height:50px;border-radius: 50%;"></div>
                                  <p style="text-align:center;font-weight:700;font-size:18px;">{{item.stuName}}</p>
                                 <div class="clear"></div>
                                

                            </div>


                        </li>
           
            
                    </ul>



                    <div class="clear"></div>
              </div>

                <el-button type="primary"  @click='innerVisible=false' style='margin-left: 250px;'>确 定</el-button>

            </div>

                </el-dialog>
               <div class="top">
             <span class="top_text">签到</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible1=false">
             </div>
            </div>
            <div style="width:300px;height:160px;margin:0 auto;">
                签到儿童：
                        <el-button  @click='chooseChild'> 选择儿童</el-button>
                        <br>
                        <br>
                        儿童姓名： {{studentName}}
                        <br>
                        <br>
                儿童体温：<el-input v-model="temperature" placeholder="请输入体温" style="width:210px;diaplay:inline-block;"></el-input>°C




            </div>
            <div style="width:80px;height:30px;margin:0 auto">
                <el-button type="primary"  @click='sure1'>确 定</el-button>
            </div>
              <span slot="footer" class="dialog-footer">
               
                
              </span>
            </el-dialog>


            <el-dialog
          
              :visible.sync="dialogVisible2"
              width="600px"
              :before-close="handleClose">
                <div class="top">
             <span class="top_text">一键补卡</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible2=false">
             </div>
            </div>
                  <div>
                      <span style="display:inline-block;margin-left:120px;"></span>选择班级
                      <el-select v-model="value22" placeholder="请选择" style="width:250px;margin-left:0px" @change="choesPutKlass">
                        <el-option
                          v-for="item in klassesOptionss"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>

                  </div>
              <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible2 = false">取 消</el-button> -->
                <el-button type="primary" @click="postMany">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog
          
              :visible.sync="dialogVisibleMsg"
              width="600px"
              :before-close="handleClose">
                  <div class="top">
                   <span class="top_text">打卡详情</span>
                   <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                     <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisibleMsg=false">
                   </div>
                  </div>
                  <div style="width:600px;height:500px;">
                      <div style="width:200px;margin:0 auto">
                        <img :src="childAttImg" alt="" width="200px"height='300px' style="margin-bottom:30px;box-shadow: 0px 0px 25px 10px #d1d1d1">
                        <div style="font-size:20px;text-align:center;width:200px;font-family:'黑体'"> 接 送 人：{{childAttName}}</div>
                        <div style="width:200px;heigth:10px;margin-top:20px;font-size:20px;text-align:center;font-family:'黑体'">---接送时间---</div>
                        <div style="width:200px;heigth:10px;margin-top:20px;font-size:16px;text-align:center;font-family:'黑体'">入园：{{childAttEarliest}}</div>
                        <div style="width:200px;heigth:10px;margin-top:20px;font-size:16px;text-align:center;font-family:'黑体'">离园：{{childAttLatest}}</div>

                      </div>
                  </div>
              <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisibleMsg = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibleMsg = false">确 定</el-button> -->
              </span>
            </el-dialog>




    </div>
</template>
<script>
import Moment from 'moment';
    export default {
        data(){
            return {
                tableData:[],
                options:[{
                    value:'DAY',
                    label:'日'
                },{
                    value:'WEEK',
                    label:'周'
                },{
                    value:'MONTH',
                    label:'月'
                }],
                value:'',
                dtime:true,
                mwtime:false,
                klassesOptions:[],
                dialogVisible:false,
                dialogVisible1:false,
                dialogVisible2:false,
                dialogVisibleMsg:false,
                innerVisible:false,
                showDate:false,
                value2:'',
                putStuId:'',
                temperature:'',
                klassOptions1:[],
                target:'',
                klassesOptionss:[],
                value22:'',
                chackArry:[],
                studentName:'',
                stuId:'',
                value33:'',
                aaa:false,
                poatManyArry:[],
                childAttImg:'',
                childAttName:'',
                childAttEarliest:'',
                childAttLatest:'',

            }
        },
        methods:{
              time(time){
                 var date = new Date(time*1000);//如果date为10位不需要乘1000
                          var Y = date.getFullYear() + '-';
                          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                          var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
                          var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                          var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                          var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
                           return Y+M+D+h+m+s;
              },
              handleClickmsg(row){
                console.log(row)
                // this.putStuId=row.studentId
                this.dialogVisibleMsg=true
                       var date = new Date(this.value33);  
                     var date_value=date.getFullYear() + '-' + ((date.getMonth() + 1)>9?(date.getMonth() + 1):('0'+(date.getMonth() + 1))) + '-' + (date.getDate()>9?date.getDate():('0'+date.getDate())) 
                this.$http({
                    method: 'get',
                    url: this.$getApi + 'api/attendances?studentId='+row.studentId+'&klassId='+this.value1+'&date='+date_value,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res
                      this.childAttImg='https:'+res.body[0].portrait
                      this.childAttName=res.body[0].name
                         

                      this.childAttEarliest=this.time(res.body[0].earliest)


                      this.childAttLatest=this.time(res.body[0].latest)

                    console.log("===res getKlassData===",res.body);
                    console.log("===childAttArry===",this.childAttArry);

                   
                        
                        
                          
                                
                          
                        })




              },
              postMany(){

                   this.$http.post(
                     
                       this.$getApi + 'api/attendances/retroMany',
             
                     this.poatManyArry,
                                                           
                      {
                      headers:{
                                  
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer '+ localStorage.token

                                  }

                                }
                    ).then((res) => { // promise对象
                        this.$message({
                                  message: '补签成功',
                                  type: 'success'
                                });
                     this.dialogVisible2=false;
                      
                
                    }).catch((res) =>{
                                this.$message({
                                  message: '补签失败',
                                  type: 'error'
                                }); 
                                this.dialogVisible2=false;
                            });
            },
            choesPutKlass(){
                console.log(this.value22)

                console.log(this.tableData)
                    var timestamp = Date.parse(new Date());
                    console.log(timestamp)
                    var b=this.tableData
                    var c=[]
                    for (var i = 0; i < b.length; i++) {
                         if (b[i].type) {
                            
                            c.push({
                                "portrait": "",
                                "retroAt": timestamp,
                                "studentId": b[i].studentId,
                                "temperature": 0
                            })
                               
                         }
                    }
                    console.log(c)
                    this.poatManyArry=c
                    this.mounted();

    

            },
            postManyData(){
                this.dialogVisible2=true
                           if (localStorage.actorType=="TEACHER") {
                    console.log('是老师')

                        this.$http({
                    method: 'get',
                    url: this.$getApi + 'management/klasses/findKlassOfTeacher',

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
                               klassesArray.push({value:item.id,label:item.name})    
                          })
                             //this.value = klassesArray[0].value
                             this.klassesOptionss = klassesArray;
                                
                          
                        })




                }else{
                    console.log('不是老师')

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
                             this.klassesOptionss = klassesArray;
                                
                            } else {
                                alert('err:' + body)
                            }
                        })
                }
            },
            chooseChild(){
                this.innerVisible=true
                this.choesKlass();
            },
            checkboxCH(val,index,name){

               // this.multipleSelection = val;
               console.log('111111',val)
               this.studentName=name
               this.stuId=val
               console.log('111111index',index)
               console.log('111111index',name)
               this.stuIndex=index

          // console.log(this)
              
            },
               checkboxCl(e){
              
                console.log('val',e.target.checked)
                if (this.dialogVisible===true) {
                 
                }
                this.isChack=e.target.checked
                this.addData();
            },
            choesKlass(){
                console.log(this.value22)
                     this.$http({
                    method: 'get',
                    url: this.$getApi + 'management/students?klassId='+this.value22,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res.body);
                    var chack=[]
                      res.body.forEach(function(item, index, array){
                               chack.push({stuId:item.id,stuName:item.name,stuImg:item.avatar})    
                          })
                      for (var j = 0; j < chack.length; j++) {

                      if(chack[j].stuImg==''){
                        // console.log('wwwwwwwwwwwwwwwwwwwwwwww')
                        chack[j].stuImg+='https://bdtext.oss-cn-beijing.aliyuncs.com/Ata7Kf_1540175291614.png'
                        console.log('22221',chack[j].stuImg)
                      }else{
                       chack[j].stuImg= 'https:'+chack[j].stuImg
                      } 
                      console.log('111111111111111',chack[j].stuImg)
                    }
                      

                      console.log('-------------------------------',this.chackArry)
                      console.log('-------------------------------',this.tableData)
                                var newArry=[]
                                var littleData=this.tableData
                                for (var q = 0; q < chack.length; q++) {
                               
                                    // this.chackArry[q]
                                    for (var k = 0; k < littleData.length; k++) {
                                        // this.tableData[p]
                                        if (chack[q].stuId== littleData[k].studentId) {
                                        console.log('一样的去掉')
                                            chack.splice(q, 1);
                                        }
                                    }

                                }
                                console.log('111111111111111111111111111',chack)
                                // this.chackArry=newArry

                                this.chackArry=chack
                        })

            },
              dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return Moment(date*1000).format("YYYY-MM-DD HH:mm ");  
            },
            sure(){
                console.log(this.value2)
                var timestamp3 = new Date(this.value2).getTime();
                 this.$http.put(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'api/attendances',
                    {
                      
                      "portrait": "",
                      "retroAt": timestamp3,
                      "studentId": this.putStuId,
                      "temperature": this.temperature

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
                this.dialogVisible=false
            },
            getData(){
                // time:true,
                     var date = new Date(this.value33);  
                     var date_value=date.getFullYear() + '-' + ((date.getMonth() + 1)>9?(date.getMonth() + 1):('0'+(date.getMonth() + 1))) + '-' + (date.getDate()>9?date.getDate():('0'+date.getDate())) 

                              console.log(date_value)    
                 this.$http({
                    method: 'get',
                    url: this.$getApi + 'api/attendances?klassId='+this.value1+'&date='+ date_value,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res.body);
                   


                    var a =res.body
                    var typeArray=[]
                       a.forEach(function(item, index, array){
                               typeArray.push({
                                    date:item.date,
                                    earliest:item.earliest,
                                    klassId:item.klassId,
                                    latest:item.latest,
                                    name:item.name,
                                    studentId:item.studentId,
                                    type:(item.latest-item.earliest)
                                  
                          })
                             })

                       for (var i = 0; i < typeArray.length; i++) {
                           if (typeArray[i].type>7200) {
                                typeArray[i].type= false
                           }else{
                                typeArray[i].type= true
                           }
                       }
                    this.tableData=typeArray
                    console.log(this.tableData)
              
                        })
            },
            postData(){
                    this.dialogVisible1=true;
                    // this.$router.push({path:'students'});
                            if (localStorage.actorType=="TEACHER") {
                    console.log('是老师')

                        this.$http({
                    method: 'get',
                    url: this.$getApi + 'management/klasses/findKlassOfTeacher',

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
                               klassesArray.push({value:item.id,label:item.name})    
                          })
                             //this.value = klassesArray[0].value
                             this.klassesOptionss = klassesArray;
                                
                          
                        })




                }else{
                    console.log('不是老师')

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
                             this.klassesOptionss = klassesArray;
                                
                            } else {
                                alert('err:' + body)
                            }
                        })
                }

            },
            sure1(){
                 this.$http.post(
                     
                       this.$getApi + 'api/attendances',
             
                      {
                            "portrait": "",
                              "studentId": this.stuId,
                              "temperature": this.temperature
                        
                      },
                                                           
                      {
                      headers:{
                                  
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer '+ localStorage.token

                                  }

                                }
                    ).then((res) => { // promise对象
                        this.$message({
                                  message: '打卡成功',
                                  type: 'success'
                                });
                     this.dialogVisible1=false;
                      
                
                    }).catch((res) =>{
                                this.$message({
                                  message: '打卡失败',
                                  type: 'error'
                                }); 
                                this.dialogVisible1=false;
                            });
                    this.mounted();
            },
            handleClick(row){
                this.dialogVisible=true
                console.log(row)
                this.putStuId=row.studentId
            },
            chanalue(){
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
            },
            changeData(){
                if (this.value=='DAY') {
                    this.showDate=true
                }else{
                    this.showDate=false
                }
                
            },
            search(){

                console.log(this.value)
                console.log(this.value1)
                // console.log(this.value33)
                if (this.value=='DAY') {
                    this.dtime=true
                    this.mwtime=false
                    
                    this.getData();

                }else if (this.value=='WEEK') {
                       this.dtime=false
                        this.mwtime=true
                         var date = new Date();
                            var seperator1 = "-";
                            var seperator2 = ":";
                            var month = date.getMonth() + 1;
                            var strDate = date.getDate();
                            if (month >= 1 && month <= 9) {
                                month = "0" + month;
                            }
                            if (strDate >= 0 && strDate <= 9) {
                                strDate = "0" + strDate;
                            }
                            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                              this.$http({
                    method: 'get',
                    url: this.$getApi + 'api/attendances/period?klassId='+this.value1+'&type=WEEK&specialDate='+currentdate,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res.body);
                    var a =res.body.students
                    this.tableData=a
                    //    var periodArry=[];
                    // res.body.forEach(function(item,index,array){
                    //         periodArry.push({
                    //             expense:item.expenseEntry.name,
                    //             periodTime:item.expenseEntry.periodType,
                    //             money:item.money,
                    //             time:item.expenseEntry.periodType,
                    //             remainMoney:item.remainMoney
                    //         })
                    //   });
                        }) 
                }else if (this.value=='MONTH') {
                    this.dtime=false
                    this.mwtime=true
                   

                     var date = new Date();
                            var seperator1 = "-";
                            var seperator2 = ":";
                            var month = date.getMonth() + 1;
                            var strDate = date.getDate();
                            if (month >= 1 && month <= 9) {
                                month = "0" + month;
                            }
                            if (strDate >= 0 && strDate <= 9) {
                                strDate = "0" + strDate;
                            }
                            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + '01'
                         this.$http({
                    method: 'get',
                    url: this.$getApi + 'api/attendances/period?klassId='+this.value1+'&type=MONTH&specialDate='+currentdate,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res.body);
                    var a =res.body.students
                    this.tableData=a
                    //    var periodArry=[];
                    // res.body.forEach(function(item,index,array){
                    //         periodArry.push({
                    //             expense:item.expenseEntry.name,
                    //             periodTime:item.expenseEntry.periodType,
                    //             money:item.money,
                    //             time:item.expenseEntry.periodType,
                    //             remainMoney:item.remainMoney
                    //         })
                    //   });
                        }) 
                }
             
            },
            aa(){
          var klassName = this.$store.state.cost
                        // this.tableData = localStorage.schools
                        // this.count = localStorage.schools.length;
                        console.log('+++++++    拿到的数据+++++++++',klassName);
                        console.log('+++++++    拿到的数据1111+++++++++',klassName.cost[0].id);
                        this.target=klassName.cost[0].id
                        let counst=klassName.cost;
                       
                        // console.log('+++++++    拿到的数据**********',counst);
                        // for(var i=0;i<counst.length;i++){
                        //     console.log(counst[i]);
                        // }


                        var qwer = this.$store.state
                      console.log("guardian log is：",qwer )









                              var klassArray=[];
                          counst.forEach(function(item, index, array){
                               klassArray.push({name:item.name,id:item.id})    
                          })
                             //this.value = klassesArray[0].value
                             this.klassOptions1 = klassArray;
      }
           
        },
         mounted(){
            var klassId=''
            if (localStorage.actorType=="TEACHER") {
                console.log('是老师身份')
                     this.$http({
                    method: 'get',
                    url: this.$getApi + 'management/klasses/findKlassOfTeacher',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res.body);
                        klassId=res.body[0].id
                            
                             var date = new Date();
                            var seperator1 = "-";
                            var seperator2 = ":";
                            var month = date.getMonth() + 1;
                            var strDate = date.getDate();
                            if (month >= 1 && month <= 9) {
                                month = "0" + month;
                            }
                            if (strDate >= 0 && strDate <= 9) {
                                strDate = "0" + strDate;
                            }
                            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                                  
                          





                           this.$http({
                    method: 'get',
                    url: this.$getApi + 'api/attendances?klassId='+klassId+'&date='+currentdate,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res.body);
                    var a =res.body
                    var typeArray=[]
                       a.forEach(function(item, index, array){
                               typeArray.push({
                                    date:item.date,
                                    earliest:item.earliest,
                                    klassId:item.klassId,
                                    latest:item.latest,
                                    name:item.name,
                                    studentId:item.studentId,
                                    type:(item.latest-item.earliest)
                                  
                          })
                             })

                       for (var i = 0; i < typeArray.length; i++) {
                           if (typeArray[i].type>7200) {
                                typeArray[i].type= false
                           }else{
                                typeArray[i].type= true
                           }
                       }
                    this.tableData=typeArray
                    // this.tableData=res.body
              
                        })
                          var klassesArray=[];
                          res.body.forEach(function(item, index, array){
                               klassesArray.push({value:item.id,label:item.name})    
                          })
                             //this.value = klassesArray[0].value
                             this.klassesOptionss = klassesArray;
                                
                          
                        })
                console.log('1111111',klassId)
              
            }


                   
            },
             activated(){
            this.aa()
        }
    }
</script>
<style>
    
</style>