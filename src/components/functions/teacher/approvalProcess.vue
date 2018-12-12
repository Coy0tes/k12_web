<template>
    <div >
 <!--      <el-button @click="add">添加</el-button>
      <el-button @click="processPut">123</el-button>
        <el-button type="danger" @click="deleteData">删除</el-button> -->
       <!-- <span style="font-size:16px;font-weight:700;">请假审批流程</span>  -->




        <div class="line">
             <div style="width:100.5%; margin-top:-20px;margin-bottom:10px;margin-left:-0px; padding-right:25px; line-height:40px; 
  z-index: 0;margin-top:5px;border-bottom:1px solid #57b4f5;padding-bottom:10px;" >
                <el-button @click="dialogAdd=true" type="primary"style="margin-left:0px;width:100px">添加</el-button>
            </div>
         
        </div>











            <div style="margin-left:10px;margin-top:-25px;">
                   
                  <div>
                     
            
                   <span  style="display:block; width:300px;">
                       
                   </span>
<!-- 展示数据 -->
                   <div>
                  
                      <ul v-for="(item,index) in getDataArray" style="display:block;line-height:30px;border-radius：12%;font-size:12px;border-bottom:1px solid #57b4f5;padding-top:15px;padding-bottom:15px;"@click='deleteData1(index)' >
                           <span style="display:inline-block;height:30px;font-size:14px;font-weight:700; ">{{item.discernDutyId.name}}审核</span> :
                            <li  style=" display:inline-block; height:30px; border-radius:25%; font-size:12px;padding-left:10px;" v-for="(it,index) in item.list">
                            <span  style=" display:inline-block; height:30px;border:1px solid #ccc; border-radius:12%;background-color:#d6e5f6; font-size:12px;padding-left:10px;background-color:#d6e5f6;padding-right:14px;position: relative;text-align:center;">{{it.actorName}}
                              <i class="el-icon-error" style="line-height:0px!important;position: absolute;top: 8px;right: 0px;">
                           
                            </i>
                            </span>  
                           
                             →
                          </li>
                          <!-- 添加 -->
                          <!-- <el-button type="primary" round style=" margin-top:20px;    margin-left: -18px;" @click='addData'size="mini"  class="el-icon-plus"></el-button> -->
                          <!-- 修改  -->
                           <el-button type="warning" @click="putShow" class="el-icon-edit"round size="mini" style=" margin-top:20px; margin-left: -15px;"></el-button> 
                          <!-- 删除 -->
                           <el-button type="danger" @click="deleteData" class="el-icon-delete"round size="mini"></el-button>
                           
                          <div style="margin-top:10px;margin-bottom:10px;">
                                   <span style="display:inline-block;height:30px;font-size:14px;">抄送者：</span><span style=" display:inline-block; width: 75px;;height:30px;border:1px solid #ccc; border-radius:12%;background-color:#d6e5f6; font-size:12px;padding-left:10px;background-color:#d6e5f6;padding-right:14px;position: relative;text-align:center;">{{item.massageCC[0].name}}
                                    <i class="el-icon-error" style="line-height:0px!important;position: absolute;top: 8px;right: 4px;">
                           
                            </i>
                                   </span> 
                          
                          
                          </div>
                  
                        </ul>


                   </div>
                  </div>
    <!-- 删除提示               -->
                    <el-dialog
                     
                      :visible.sync="dialogVisible"
                      width="30%"
                      :before-close="handleClose">
        

            <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">提示</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
                      <span>是否确定删除次审批流程？</span>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="deleteTrue">确 定</el-button>
                      </span>
                    </el-dialog> 

<!-- 添加审批流程 -->

                           <el-dialog
                     
                      :visible.sync="dialogAdd"
                      width="1000px"
                      :before-close="handleClose">
          
              <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">添加审批流程</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogAdd = false">
             </div>
          </div>
          <!-- Newtitle  end-->
                     <div style="margin-left:20px;">
                       
                                <span>
                    <ul>

                       审批流程： <el-select v-model="value3" placeholder="请选择基层职务" size="small"style="display:inline-block;width:100px;margin-left:10px;margin-top:20px; height:30px;"@change="changeLocationValue">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      style="height:30px;"
                     >
                    </el-option>
                  </el-select>
                  →
                        <li v-for="(item,index) in dutyArray" @click="deleteOne(index)" style="display:inline-block;line-height:30px;border-radius：12%;" >
                            
                            <span  style=" display:inline-block; height:30px;border:1px solid #ccc; border-radius:12%;background-color:#d6e5f6; font-size:12px;padding-left:10px;">{{item.name}}
                             <i class="el-icon-error" style="line-height:0px!important;position: relative;top: -6px;right: 3px;">
                           
                            </i></span>
                            →
                        </li>
                        
                   
                        <el-button type="primary" round style=" margin-top:20px;" @click='addData' size="mini"class="el-icon-plus"></el-button>

                    </ul>
                    <div>
                             {{labeld}}抄送者：
                       <el-tag
                        :key="tag"
                        v-for="tag in teacherarray"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag.name}}
                      </el-tag>
                    <el-button type="primary" round style=" margin-top:20px;" @click='goTeacher'size="mini" class="el-icon-plus"></el-button>
                    </div>
             
                      
                      
                </span>
                        <!-- <el-button @click="processPut">添加审批</el-button> -->


                     </div>
                      <span slot="footer" class="dialog-footer">
                        <!-- <el-button @click="dialogAdd = false">取 消</el-button> -->
                        <el-button type="primary" @click="processPut">确 定</el-button>
                      </span>
                    </el-dialog> 

<!-- 修改审批流程 -->
                     <el-dialog
                     @close="replace"
                      :visible.sync="PutVisible"
                      width="1000"
                      :before-close="handleClose">
                             

                            <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">修改审批流程</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="PutVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
                      <div style="margin-left:20px;">
                          {{discernDutyIdName}}审核:
                              <li v-for="(item,index) in putArryList"  style="display:inline-block;line-height:30px;border-radius：12%;"@click="putData(index)" @dblclick='qwer' >
                            
                            <span  style=" display:inline-block; height:30px;border:1px solid #ccc; border-radius:12%;background-color:#d6e5f6; font-size:12px;padding-left:10px;">{{item.actorName}}{{item.name}}
                             <div class="el-icon-error" style="line-height:0px!important;position: relative;top: -6px;right: 3px;cursor: pointer;"@click='qwer(index)'>
                           
                            </div></span>
                            →

                        </li> 
                       <el-button type="primary" round style=" margin-top:20px;" size="mini" class="el-icon-plus" @click='addData' ></el-button>
                       <div style="display:none;width:30px;height:10px;background-color:#FFF;margin-left:-20px;">
                         
                       </div>
                       <!-- <el-button type="primary" round style=" margin-top:20px;" @click='addTeacher'size="mini" class="el-icon-plus"></el-button> -->
                                    <div style="margin-top:10px;margin-bottom:10px;">
                                   抄送者：<span style=" display:inline-block;height:30px;border:1px solid #ccc; border-radius:12%;background-color:#d6e5f6; font-size:12px;padding-left:10px;background-color:#d6e5f6;padding-right:14px;position: relative;text-align:center;">{{massageCCName}}
                                    <i class="el-icon-error" style="line-height:0px!important;position: absolute;top: 8px;right: 2px;">
                           
                            </i>
                                   </span> 
                          
                          <el-button type="primary" round style=" margin-top:20px;" size="mini" class="el-icon-plus" @click='addData'></el-button>
                          </div>


                         
                          
                          
   


                      </div>
                      <span slot="footer" class="dialog-footer">
                        <!-- <el-button @click="PutVisible = false">取 消</el-button> -->
                        <el-button type="primary" @click="addSth">确 定</el-button>
                      </span>
                    </el-dialog>
                                          


             
                    
            </div>
    
    </div>
</template>
<script>

export default {
    data() {
        return {
           options1:[],
                value3:'',
                teacherarray:[],
                dutyArray:[],
                options2:[],
                value4:"请假审批流程",
                input:'',
                string:'',
                getDataArray:[],
                labeld:'',
                deleteId:0,
                dialogVisible:false,
                PutVisible:false,
                putArry:[],
                discernDutyIdName:'',
                putArryList:[],
                dialogAdd:false,
                massageCCName:'',
                indexId:0,
                discernDutyId:0,
                changeIndex:0,
                actor:[],
                massageCCId:0,
        }
    },
    methods: {
                addTeacher(){
                  this.$router.push({
                    path: '/ledarTeacher'
                  });

                   this.putArryList.push(this.dutyArray[0])
             
                },
                qwer(index){
                  this.putArryList.splice(index,1);
                  event.stopPropagation();
                    console.log('eeeeeeeee',this.putArryList)
                    console.log('eeeeeeeee1111',index)
                },
              addSth(){
                // this.putArryList.splice(this.changeIndex,1,this.teacherarray[0]);
                // this.putArryList.splice(1,0,this.teacherarray[0]);
                console.log('222',this.putArryList );
                var listArray=this.putArryList
                // console.log(this.teacherarray[0].actorId)
                var actor=[];
              
                  listArray.forEach(function(item, index, array){
                        actor.push({        actorId:item.actorId,
                                            dutyId:item.dutyId,
                                            num:""})
                    })

                  console.log('12131',actor)



                 this.$http.put(
             
                    this.$getApi+'processNode/management?nodeId='+this.indexId,
                    
                       {
                        "activitiType": 1,
                        actor,
                        "discernDutyId":this.discernDutyId,
                        "massageCC": this.massageCCId,
                        "processName": ""
                      },
                    
                    {
                      headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                    // const {body} = res;
                     this.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                    console.log("===body=add==teacher====",res);
                     // this.PutVisible = false
                    // this.getData();
                }).catch((res) =>{
                    this.$message({
                      message: '修改失败，',
                      type: 'error'
                    }); 
                     // this.PutVisible = false
                });
                // this.PutVisible = false
              },



              putData(index){
                this.changeIndex=index;
                console.log('index',index);
                 this.$router.push({
                    path: '/ledarTeacher'
                  });
                 this.putArryList.splice(index,1,this.teacherarray[0]);
                 console.log('222',this.putArryList )
                 
           




              },
              replace(){
                location.reload();
              },
              putShow(){
                this.PutVisible = true
              },
              deleteData1(index){
                console.log(index)
                console.log(this.getDataArray[index].id)



                this.indexId=this.getDataArray[index].id
                console.log(this.getDataArray[index])
                this.discernDutyId=this.getDataArray[index].discernDutyId.id;
                var num=this.getDataArray[index].id
                this.deleteId=num;
                this.putArry=this.getDataArray[index];
                this.massageCCName=this.putArry.massageCC[0].name

                console.log('1111',this.putArry.massageCC[0].id);
                this.massageCCId=this.putArry.massageCC[0].id
                this.discernDutyIdName=this.putArry.discernDutyId.name;
                this.putArryList=this.putArry.list
              },

              deleteOne(index){
                console.log('row',index);
                this.dutyArray.splice(index, 1);
              },
              notUse(){
                this.radio="";
            },
            handleClose(tag) {
          console.log(tag)
        this.teacherarray.splice(this.teacherarray.indexOf(tag), 1);
      },handleClose1(tag) {
          console.log(tag)
        this.dutyArray.splice(this.dutyArray.indexOf(tag), 1);
      },
            dutyPut(){
                var num= Date.parse(this.value1);
                console.log('11111',this.value)
                // console.log('11111',num)
            },
               getduit(index,row){
                this.appointDialog = true;
                this.rowTeacherId=row.teacherId;
                this.dutyId=row.dutyid
                
                console.log('++++++++++++++++',row.dutyid)
                console.log('+++++++teacherId++++++++',row.teacherId)

            },
            goTeacher(){
                     this.$router.push({
              path: '/ledarTeacher'
            })
            },

            changeLocationValue(value){
            //locations是v-for里面的也是datas里面的值
            let obj = {};
            obj = this.options1.find((item)=>{
                return item.value === value;
            });
           console.log(obj.label);
           this.labeld=obj.label

           console.log(this.value3)
        },
            deleteData(){

              this.dialogVisible = true;
        
            },
            deleteTrue(){
                               this.$http({
                    method: 'delete',
                    url:this.$getApi+'processNode/management/'+this.deleteId,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                
                     this.$message({
                      message: '删除成功，',
                      type: 'success'
                    }); 
                    const {
                        body
                    } = res
                      


                    console.log("===res students===",res.body);


          
          this.getDataArray.splice(this.index, 1);

                  

                }).catch((res) =>{
                    this.$message({
                      message: '删除失败，',
                      type: 'error'
                    }); 
                });
                this.getData();
                 this.dialogVisible = false;
            },
            getData(){
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
                                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;


                        this.$http({
                    method: 'get',
                    url:this.$getApi+'api/vacationTeacher/teacher?activitisTypes=WEEK&isGone=CHECKED&date='+currentdate,                  
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
                  

                    });


                });


                     this.$http({
                    method: 'get',
                    url:this.$getApi+'duty/management?isSubstratum=TRUE',                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                    console.log("===get duty/management?isSubstratum=TRUE grades====",body);
                    console.log("===get duty/management?isSubstratum=TRUE grades====",res);
                    var newData=[];
                    body.forEach(function(item, index, array){
                            newData.push({
                               label: item.name,
                               value:item.id
                            })

                    });
                this.options1=newData

                }); 


                 this.$http({
                    method: 'get',
                    url:this.$getApi+'ProceaaType/management',                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                    console.log("===ProceaaType/management====",body);
                    console.log("===ProceaaType/management====",res);
                var newData1=[];
                    body.forEach(function(item, index, array){
                            newData1.push({
                               label: item.name,
                               value:item.typeNo
                            })

                    });
                this.options2=newData1

                });



                this.$http({
                    method: 'get',
                    url:this.$getApi+'processNode/management',                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                    console.log("===process  Node/management====vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv",body);
                    this.getDataArray=body;
                    console.log("===process  getDataArray====",this.getDataArray);
                    console.log("===process  Node/management====",res);
        
                

                });

                




            },

             getData1(){
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
                               klassArray.push({name:item.name,id:item.teacherId})    
                          })
                             //this.value = klassesArray[0].value
                             this.teacherOptions = klassArray;


                             var teacherArray=[];
                             counst.forEach(function(item,index,array){
                                    teacherArray.push({
                                        duty:item.duty,
                                        name:item.name,
                                        dutyId:item.dutyid,
                                        actorId:item.id
                                    })
                             })
                             this.teacherarray=teacherArray
                            console.log('teacherarray',this.teacherarray)

                                var str = "";
                              //根据name获取所有元素
                            
                              for (var i = 0; i < teacherArray.length; i++) {
                                  str += teacherArray[i].actorId + ",";
                              }
                              //去掉最后一个逗号(如果不需要去掉，就不用写)
                              if (str.length > 0) {
                                  str = str.substr(0, str.length - 1);
                              }
                            this.string=str
                              console.log("str",str)





                                      this.dutyArray.push({
                                        duty:this.teacherarray[0].duty,
                                        name:this.teacherarray[0].name,
                                        dutyId:this.teacherarray[0].dutyId,
                                        actorId:this.teacherarray[0].actorId
                                    })
                            
                            console.log('dutyArray',this.dutyArray)
                            this.putArryList.push(this.teacherarray[0]);
                            this.putArryList.splice(this.changeIndex,1,this.teacherarray[0]);
                 console.log('222',this.putArryList )
                            console.log('wwwwwwwwww',this.putArryList)


            },
            processPut(){
                            var actor=[];
                             this.dutyArray.forEach(function(item,index,array){
                                    actor.push({
                                        dutyId:item.dutyId,
                                        actorId:item.actorId,
                                        num:""
                                    })
                             });


                         console.log(this.dutyArray)
                         console.log(actor)







                        this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'processNode/management',
                    
                       {
                          "activitiType": 1,
                            actor,
                          "discernDutyId": this.value3,   //后期获取登录者的职务 存到localStorage 中
                          "massageCC": this.string,
                          "processName": ""
                        },
                    
                    {
                      headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                    // const {body} = res;
                     this.$message({
                      message: '添加成功',
                      type: 'success'
                    });
                    console.log("===body=add==teacher====",res);
                    // this.getData();
                }).catch((res) =>{
                    this.$message({
                      message: '添加失败，',
                      type: 'error'
                    }); 
                });
                this.getData();
                this.dialogAdd = false
                

            },
            addData(){
                    this.$router.push({
              path: '/teachers'
            })
                          
                          
            },
            handleSizeChange: function (size) {
        this.pagesize = size;
        },
        handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
        },
        postData(){
             var num= Date.parse(this.value1);
             var num1= Date.parse(this.value2);
             var timeOut=num1-num;
             if (this.radio==1) {
                console.log('222',timeOut);
                this.annualNum=timeOut;
                this.sickNum=0;
             }else if(this.radio==1){
                this.annualNum=0;
                this.sickNum=timeOut;
             }else{
                this.annualNum=0;
                this.sickNum=0;
             }






            this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'api/vacationTeacher',
                    {
                      "actorId": this.rowTeacherId,
                      "annualNum": this.annualNum/1000,
                      "desc": this.textarea,
                      "fromDate": num/1000,
                      "reasion": this.value,
                      "schoolId": localStorage.schoolsId,
                      "sickNum": this.sickNum/1000,
                      "toDate": num1/1000
                    },
                    {
                      headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===body=add==teacher====",res);
                    this.getData();
                })
        },





        },
         mounted(){
            this.getData();

        },
         activated(){
            this.getData1();
            // this.getData();
        }
    }
</script>
<style scoped>
    .el-input--suffix .el-input__inner{
      height: 30px!important;
    }
</style>