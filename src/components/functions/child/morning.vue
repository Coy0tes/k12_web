    <!-- 晨检 -->
<template>
    <div style="" >
       <div style="margin-bottom:30px">
                <el-button type="primary" style="float:right;margin-left:20px;margin-right: 20px;" size="small" @click="postCheck">提交检查</el-button>
                <el-button type="primary" style="float:right;" size="small" @click='showDia'>选择儿童</el-button>
                
            </div>
        <div style=" width:650px;padding:30px; margin:0 auto; ">
         
            

        
        <!-- 精神 -->
        <div> 
            <div style="margin-bottom:20px;margin-left: -38px; font-size: 18px; font-weight: 700;">精神</div>
         <el-radio-group v-model="radio1" style="margin-bottom:20px" @change="radio1Change">

            <el-radio :label='1'>良好</el-radio>
            <el-radio :label="2">精神不振</el-radio>
            <el-radio :label="3">萎靡</el-radio>
            <el-radio :label="4">过于兴奋</el-radio>
            <el-radio :label="5">过于烦躁</el-radio>
          </el-radio-group>
        </div> 

        <!-- 身体 -->
        <div>
            <p style="margin-bottom:20px;margin-left: -38px; font-size: 18px; font-weight: 700;">身体</p>
        <el-radio-group v-model="radio2" style="margin-bottom:20px"  @change="radio2Change">

            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">咳嗽</el-radio>
            <el-radio :label="3">流鼻涕</el-radio>
            <el-radio :label="4">高烧</el-radio>
            <el-radio :label="5">低烧</el-radio>
            <el-radio :label="6">腹泻</el-radio>
          </el-radio-group>
        </div> 

         <!-- 体温 -->
    <!--     <div style="margin-bottom:20px">

            <span style="margin-bottom:20px;margin-left: -38px; font-size: 18px; font-weight: 700;display:inline-block">体温 </span> 
      <div style="width:428px;height:1px;background-color:red; margin-bottom:20px">
        <div style="float:left;border-left:1px solid #000;height:15px;font-size:10px">
          35°C
        </div>

        <div style="border-left:1px solid #000;height:15px;width:30px; margin-left:155px;font-size:10px;display:inline-block;">
          38°C
        </div>


        <div style="float:right; border-right:1px solid #000;height:15px;font-size:10px">
          42°C
        </div>
        
      </div>

           <el-slider v-model="value2"  show-input min="35" max='42' show-tooltip="true" step='0.1' :format-tooltip="formatTooltip"  @change="change"></el-slider>
        </div> -->

        
        <!-- 口腔 -->
        <div>
            <p style="margin-bottom:20px;margin-left: -38px; font-size: 18px; font-weight: 700;">口腔</p>
        <el-radio-group v-model="radio3" style="margin-bottom:20px" @change="radio3Change">

            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">疱疹</el-radio>
            <el-radio :label="3">溃疡</el-radio>
            <el-radio :label="4">咽部发红</el-radio>
         
          </el-radio-group>
        </div> 


         <!-- 皮肤 -->
        <div>
            <p style="margin-bottom:20px;margin-left: -38px; font-size: 18px; font-weight: 700;">皮肤</p>
        <el-radio-group v-model="radio4" style="margin-bottom:20px" @change="radio4Change">

            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">红疹</el-radio>
            <el-radio :label="3">过敏</el-radio>
            <el-radio :label="4">身体外伤</el-radio>
            <el-radio :label="5">脸部外伤</el-radio>
            <el-radio :label="6">蚊虫叮咬</el-radio>
         
          </el-radio-group>
        </div>  

           <!-- 其他 -->
        <div>
            <p style="margin-bottom:20px;margin-left: -38px; font-size: 18px; font-weight: 700;">其他</p>
        <el-radio-group v-model="radio5" style="margin-bottom:20px" @change="radio5Change">

            <el-radio :label="1">无</el-radio>
            <el-radio :label="2">携带药物</el-radio>
            <el-radio :label="3">携带危险品</el-radio>
          </el-radio-group>
        </div>    


         <!-- 备注 -->
        <div>
            <p style="margin-bottom:20px;margin-left: -38px; font-size: 18px; font-weight: 700;">备注</p>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  style="width:600px;"
                  v-model="textarea">
                </el-input>
        </div> 
<!-- 选择儿童 -->
        <el-dialog
      
          :visible.sync="dialogVisible"
          width="600px"
          :before-close="handleClose">
            <div class="top">
             <span class="top_text">选择儿童</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
          
         
              <div style="width:300px;margin-left:180px;">
                   <span>学生班级：</span><el-select v-model="value" placeholder="请选择" style='display:inline-block'  @change="choesKlass">
                <el-option
                  v-for="item in klassesOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </div>
              <div style="width:500px; margin-left:50px;background-color:#fff;margin-bottom:20px;margin-top:20px">


                    <ul v-for="(item,index) in chackArry">
                        <li class="abc" :class="{'active':ind === index}" @click="chooce(index)">
                            <div @click='targetC'>
                                 <!-- <el-checkbox  style="float:left" true-label='abc'  checked='qwe'@change='checkboxCH'></el-checkbox> -->

                                 <input type="checkbox"  @click="checkboxCH(item.stuId,index)" @change="checkboxCl" style="float:left; width:18px;height:18px;">

                                 <div style="float:right; border-radius: 50%; width:50px;height:50px;background-color:#FFF;margin-right:15px;margin-top:5px;    margin-top: -12px;"><img :src="item.stuImg"  height="50" width="50"style="border-radius: 50%;"></div>
                                 
                                 <div class="clear"></div>
                                 <p style="text-align:center;font-size:14px;">{{item.stuName}}</p>

                            </div>


                        </li>
           
            
                    </ul>



                    <div class="clear"></div>
              </div>
          <span slot="footer" class="dialog-footer" style="margin-top:30px">
            <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
            <el-button type="primary" @click="addData1" style="margin-right:250px;">添 加</el-button>
          </span>
        </el-dialog>

    <!-- 提交检查 -->
            <el-dialog

              :visible.sync="dialogVisible1"
              width="600px"
              
              :before-close="handleClose">
                   <div class="top">
                 <span class="top_text">提交检查</span>
                 <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                   <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible1 = false">
                 </div>
                 </div>

                      
              <span slot="footer" class="dialog-footer">
               
                <el-button type="primary" @click="dialogVisible = false" style="margin-right:0px;">发 布</el-button>
                <!-- <el-button type="danger" @click="dialogVisible = false" style="margin-right:210px;">批量删除</el-button> -->
              </span>
            </el-dialog>


              <el-dialog  :visible.sync="outerVisible"  width="600px" v-loading="loading2"
     element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
                     <div class="top">
                 <span class="top_text">提交检查</span>
                 <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                   <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="outerVisible = false">
                 </div>
                 </div>


                <div style="width:520px;margin-left:50px;height:600px;overflow:scroll;">
                            <ul  v-for="(item,index) in postCheckArry">
                                <li class="bbb" :class="{'active':ind === index}" @click="chooce(index)">
                                    <div style="float:left; width:80px;height:100%;">
                                            <!-- <input type="checkbox"  style="float:left; width:15px;height:15px;"> -->

                                            <div style="margin-top:50px; width:50px; height:50px; margin-left:15px ">
                                                <!-- 头像 -->
                                                <!-- <img src="../../../assets/chrildimg.jpg" width="100%" height="100%" alt="" > -->
                                                <img :src="item.student.avatar" width="100%" height="100%" alt="" style="border-radius: 50%" >
                                            </div>
                                            <p style="text-align:center;font-weight:400;font-size:16px"> {{item.student.name}}</p>
                                    </div>
                                    <!-- <div class="clear"></div> -->
                                    <div style="float:left;width:300px;height:100%;" @click=''>
                                        <ul>
                                            <li style="width:140px;height:26px;background-color:#fff;margin-top:10px;margin-left:4px;float:left;padding-left:10px;line-height:26px">精神：{{item.spirit|formatStatus}} </li>
                                            <li style="width:140px;height:26px;background-color:#fff;margin-top:10px;margin-left:4px;float:left;padding-left:10px;line-height:26px">皮肤：{{item.sink|formatSink}} </li>
                                            <li style="width:140px;height:26px;background-color:#fff;margin-top:10px;margin-left:4px;float:left;padding-left:10px;line-height:26px">身体：{{item.body|formatBody}} </li>
                                          
                                          <!--   <li style="width:140px;height:26px;background-color:#fff;margin-top:10px;margin-left:4px;float:left;padding-left:10px;line-height:26px">体温：{{item.temperature}}°C </li> -->
                                            <li style="width:140px;height:26px;background-color:#fff;margin-top:10px;margin-left:4px;float:left;padding-left:10px;line-height:26px">口腔：{{item.mouth|formatMouth}} </li>
                                            <li style="width:140px;height:26px;background-color:#fff;margin-top:10px;margin-left:4px;float:left;padding-left:10px;line-height:26px">其他：{{item.other|formatOther}} </li>
                                            <li style="width:290px;height:26px;background-color:#fff;margin-top:10px;margin-left:4px;float:left;padding-left:10px;line-height:26px"> 备注：{{item.remark}}</li>
                                            
                                        </ul>
                                    </div>
                                    <div style="float:left;width:90px;height:100%;padding-top:20px;padding-left:15px">
                                        <el-button style="display:block;margin-left:10px" size="mini" @click='handeLReplace(item.id,index,item)'>编 辑</el-button>
                                        <el-button style="display:block;margin-top:20px" size="mini" type='primary' >发 布</el-button>
                                        <el-button style="display:block;margin-top:20px" size="mini" @click='handelDelete(item.id,index)' type='danger'>删 除</el-button>
                                    </div>
                                </li>                        
                  
                               
                   
                            </ul>
    
                      </div>



            <!-- 编辑 -->
               <el-dialog
                  width="750px"
                
                  :visible.sync="innerVisible2"
                  append-to-body>
                     <div class="top">
                 <span class="top_text">编辑</span>
                 <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                   <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="innerVisible2 = false">
                 </div>
                 </div>
                    <div style="padding-bottom:20px;">
                            <div style="width: 80%; margin-left: 100px;padding-bottom:20px">
                                  <div> 
            <div style="margin-bottom:20px;margin-left: -38px; font-size: 18px; font-weight: 700;">精神</div>
         <el-radio-group v-model="radio1" style="margin-bottom:20px" @change="radio1Change">

            <el-radio :label='1'>良好</el-radio>
            <el-radio :label="2">精神不振</el-radio>
            <el-radio :label="3">萎靡</el-radio>
            <el-radio :label="4">过于兴奋</el-radio>
            <el-radio :label="5">过于烦躁</el-radio>
          </el-radio-group>
        </div> 

        <!-- 身体 -->
        <div>
            <p style="margin-bottom:20px;margin-left: -38px; font-size: 18px; font-weight: 700;">身体</p>
        <el-radio-group v-model="radio2" style="margin-bottom:20px"  @change="radio2Change">

            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">咳嗽</el-radio>
            <el-radio :label="3">流鼻涕</el-radio>
            <el-radio :label="4">高烧</el-radio>
            <el-radio :label="5">低烧</el-radio>
            <el-radio :label="6">腹泻</el-radio>
          </el-radio-group>
        </div> 

         <!-- 体温 -->
        <div style="margin-bottom:20px">

            <span style="margin-bottom:20px;margin-left: -38px; font-size: 18px; font-weight: 700;display:inline-block">体温 </span> 
      <div style="width:428px;height:1px;background-color:red;"></div>

           <el-slider v-model="value2"  show-input  max='42' show-tooltip="true" step='0.1' :format-tooltip="formatTooltip"  @change="change"></el-slider>
        </div>

        
        <!-- 口腔 -->
        <div>
            <p style="margin-bottom:20px;margin-left: -38px; font-size: 18px; font-weight: 700;">口腔</p>
        <el-radio-group v-model="radio3" style="margin-bottom:20px" @change="radio3Change">

            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">疱疹</el-radio>
            <el-radio :label="3">溃疡</el-radio>
            <el-radio :label="4">咽部发红</el-radio>
         
          </el-radio-group>
        </div> 


         <!-- 皮肤 -->
        <div>
            <p style="margin-bottom:20px;margin-left: -38px; font-size: 18px; font-weight: 700;">皮肤</p>
        <el-radio-group v-model="radio4" style="margin-bottom:20px" @change="radio4Change">

            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">红疹</el-radio>
            <el-radio :label="3">过敏</el-radio>
            <el-radio :label="4">身体外伤</el-radio>
            <el-radio :label="5">脸部外伤</el-radio>
            <el-radio :label="6">蚊虫叮咬</el-radio>
         
          </el-radio-group>
        </div>  

           <!-- 其他 -->
        <div>
            <p style="margin-bottom:20px;margin-left: -38px; font-size: 18px; font-weight: 700;">其他</p>
        <el-radio-group v-model="radio5" style="margin-bottom:20px" @change="radio5Change">

            <el-radio :label="1">无</el-radio>
            <el-radio :label="2">携带药物</el-radio>
            <el-radio :label="3">携带危险品</el-radio>
          </el-radio-group>
        </div>    


         <!-- 备注 -->
        <div>
            <p style="margin-bottom:20px;margin-left: -38px; font-size: 18px; font-weight: 700;">备注</p>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  style="width:600px;"
                  v-model="textarea">
                </el-input>
        </div> 
        


                             </div>
                            <el-button type="primary" @click="sureReplace " style="margin-left:116px;display:block;margin-top:30px;margin-bottom:30px;margin: 0 auto;">确定</el-button>
                    </div>
              
                </el-dialog>


                <!-- 确认删除 -->
                <el-dialog
                  width="600px"
                
                  :visible.sync="innerVisible1"
                  append-to-body>
                     <div class="top">
                 <span class="top_text">确认删除</span>
                 <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                   <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="innerVisible1 = false">
                 </div>
                 </div>
                    <div style="width:300px;height:100px;margin:0 auto;">
                            <div style="margin-left:100px"> 请确认是否删除</div>
                            <el-button type="danger" @click="sureDelete " style="margin-left:116px;display:block;margin-top:30px">删除</el-button>
                    </div>
               
                </el-dialog>

                <!-- 确认上传 -->
                <el-dialog
                  width="30%"
               
                  :visible.sync="innerVisible"
                  append-to-body>
                    <div class="top">
                 <span class="top_text">确认上传</span>
                 <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                   <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="innerVisible = false">
                 </div>
                 </div>


                  <div style="width:300px;height:100px;margin:0 auto;">
                            <div style="margin-left:100px"> 请确认是否上传</div>
                            <el-button type="primary" @click="surePut" style="margin-left:116px;display:block;margin-top:30px">确认</el-button>
                    </div>
              
                </el-dialog>
                <div slot="footer" class="dialog-footer">
                  <!-- <el-button @click="outerVisible = false">取 消</el-button> -->
                  <el-button type="primary" @click=" handelPut">全部上传</el-button>
                  <!-- <el-button type="danger" @click="innerVisible1 = true" style="margin-right:210px;">批量删除</el-button> -->
                </div>
              </el-dialog>

    </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                 radio1: 1,
                 radio2: 1,
                 radio3: 1,
                 radio4: 1,
                 radio5: 1,
                 value2:36,
                 dialogVisible:false,
                 dialogVisible1:false,
                 dialogDelete:false,
                 checked:false,
                 outerVisible:false,
                 innerVisible:false,
                 innerVisible1:false,
                 innerVisible2:false,
                 klassesOptions:[],
                 value:'',
                 radio1Value:'WELL',
                 radio2Value:'WELL',
                 radio3Value:'WELL',
                 radio4Value:'WELL',
                 radio5Value:'NOTHING',
                 chackArry:[],
                 textarea:'',
                 studentId:'',
                 addDataArry:[],
                 stuIndex:'',
                 isChack:false,
                 postCheckArry:[],
                 deleteId:'',
                 deleteIndex:'',
                 stuIds:'',
                 ind:'',
                 loading2:false,
                 
            }
        },
         filters: {
           formatStatus: function (val) {
              // console.log(val)
              return val == 'WELL' ? '良好' : val == 'DOLDRUMS' ? '精神不振' :val == 'SAG' ? '萎靡' : val == "TOOEXCITED" ? '过于兴奋' :val == "TOOAGITATED" ? '过于烦躁' :'未知';
          },  
          formatBody: function (val) {
              // console.log(val)
              return val == 'WELL' ? '正常' : val == 'COUGH' ? '咳嗽' :val == 'RHINORRHEA' ? '流鼻涕' : val == "FEVERHIGH" ? '高烧' :val == "EVERLOWF" ? '低烧' :val == "DIARRHEA" ? '腹泻' :'未知';
          },
          formatSink: function (val) {
              // console.log(val)
              return val == 'WELL' ? '正常' : val == 'RASH' ? '皮疹' :val == 'ALLERGY' ? '过敏' : val == "BODYHURT" ? '身体外伤' :val == "FACEHURT" ? '脸部外伤' :val == "MOSQUITOHURT" ? '蚊虫叮咬' :'未知';
          }, 
         formatMouth: function (val) {
              // console.log(val)
              return val == 'WELL' ? '正常' : val == 'HERPAS' ? '疱疹' :val == 'ULCERATION' ? '溃疡' : val == "THROATRED" ? '咽部发红' :'未知';
          },
          formatOther: function (val) {
              // console.log(val)
              return val == 'MEDICINE' ? '携带药物' : val == 'DANGEROUS' ? '携带危险物品' :val == 'NOTHING' ? '无' :'未知';
          },
      }, 
        methods:{
          targetC(e){
            var el = e.target;
            console.log(e)

          },
               chooce(index){
                  console.log('选择了')
                  this.ind = index
                 // var abs=document.getElementByClassName('abc')
                 // console.log(abs)








                  // this.checkboxCH(index);
                  // this.isChack=true
                  // this.checkboxCl()
                },
            sureReplace(){
                     var addDataObj={},
                     addDataObj={

                        "body": this.radio2Value,
                        "mouth": this.radio3Value,
                        "other": this.radio5Value,
                        "remark": this.textarea,
                        "sink": this.radio4Value,
                        "spirit": this.radio1Value,
                        "studentId": this.studentId,
                        "temperature": this.value2,
                        "type": "MORNING"

                     }
                    

                console.log(this.addDataObj)
                this.$http.put(
                     this.$getApi+'healthCheck/management/updateMorning?id=' + this.deleteId,
                    addDataObj,
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
            },
            handeLReplace(val,index,val1){
                console.log(val)
                console.log(val1)
                console.log(index)
                this.studentId=val1.student.id
                this.deleteId=val
                this.deleteIndex=index
                this.innerVisible2=true

            }, 
            handelDelete(val,index){
                console.log(val)
                console.log(index)
                this.deleteId=val
                this.deleteIndex=index
                this.innerVisible1=true

            },
            handelPut(val){
              this.loading2=true
                this.innerVisible = true;

                var str='';
                for (var i = 0; i < this.postCheckArry.length; i++) {
                    console.log(this.postCheckArry[i].id)
                    str += this.postCheckArry[i].id + ','
                    
                }
                 if (str.length > 0) {
                            str = str.substr(0, str.length - 1);
                        }
                    console.log('str',str)
                    this.stuIds=str

            },
            surePut(){
              this.loading2=true
                       this.$http.put(
                     this.$getApi+'healthCheck/management/issue?ids='+ this.stuIds +'&type=MORNING&klassId='+this.value,
                     {

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

                    this.showDia();
                   this.loading2=false
                    this.dialogVisible=false;
                  
                     

                     this.$message({
                      message: '成功',
                      type: 'success'
                    });
                    

                //        this.$http({
                //     method: 'get',
                //     url: this.$getApi + 'healthCheck/management/findUnIssue?type=MORNING&klassId='+this.value,

                //     headers: {
                //         'Authorization': 'Bearer ' + localStorage.token

                //     }
                // }).then((res) => { // promise对象
                //     const {
                //         body
                //     } = res

                //     console.log("===res getKlassData===",res.body);
                //     this.postCheckArry=body.healthMorning
                //     var chack=[]
                //       res.body.forEach(function(item, index, array){
                //                chack.push({stuId:item.id,stuName:item.name,stuImg:item.avatar})    
                //           })
                //       this.chackArry=chack
                //       console.log('-----',this.chackArry)
                //         })


                   this.innerVisible = false 
                    }).catch((res) =>{
                            this.$message({
                              message: '失败',
                              type: 'error'
                    });
                     })
                    this.innerVisible=false
                    
            },
            sureDelete(){

                  this.$http({
                    method: 'delete',
                    url:this.$getApi+'healthCheck/management?ids='+ this.deleteId,


                    

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('---------删除---------',res)
                    
                    const {
                        body
                    } = res
                        this.$message({
                      message: '成功',
                      type: 'success'
                    });


                    console.log("===res students===",res.body);


                  

                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });
                this.innerVisible1 = false
                this.postCheckArry.splice(this.deleteIndex, 1);
            },
            // 添加儿童
            addData1(){
              this.choesKlass();
              // this.isChack=false
              console.log(this.studentId)
                 if (this.addDataArry.length==0) {
                    console.log(this.isChack)
                      this.addDataArry.push({
                    "body": this.radio2Value,
                    "mouth": this.radio3Value,
                    "other": this.radio5Value,
                    "remark": this.textarea,
                    "sink": this.radio4Value,
                    "spirit": this.radio1Value,
                    "studentId": this.studentId,
                    "temperature":0 ,   //this.value2
                    "type": "MORNING"
                    })
                      
                      // this.chackArry.splice(this.stuIndex, 1);
                }else{
                      this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'healthCheck/management/addMorning?klassId='+this.value,
                    
                       this.addDataArry
                    ,
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
                    this.dialogVisible = false
                }

                



              // this.isChack=false
              
                console.log(this.addDataArry)
                this.dialogVisible = false
            },
            addData(){

                console.log(this.isChack)
                // var addDataArry=[]
                if (this.isChack) {
                    console.log(this.isChack)
                      this.addDataArry.push({
                    "body": this.radio2Value,
                    "mouth": this.radio3Value,
                    "other": this.radio5Value,
                    "remark": this.textarea,
                    "sink": this.radio4Value,
                    "spirit": this.radio1Value,
                    "studentId": this.studentId,
                    "temperature": 0, //this.value2
                    "type": "MORNING"
                    })
                      
                      // this.chackArry.splice(this.stuIndex, 1);
                }
             
              
                console.log(this.addDataArry)
                // this.dialogVisible = false
                // this.isChack=false
                console.log('this.isChack',this.isChack)
            },
            // 其他
            radio5Change(){
                var num = this.radio5;
                   
                switch(num){
                    case 1:
                    this.radio5Value="NOTHING"
                        console.log("well",this.radio5Value)
                        break;
                    case 2:
                        this.radio5Value="MEDICINE"
                        console.log("well",this.radio5Value)
                        break;
                    case 3:
                        this.radio5Value="DANGEROUS"
                        console.log("well",this.radio5Value)
                        break; 
                 
                  
                    default:
                        console.log('其他')
                }
            },   // 皮肤
            radio4Change(){
                var num = this.radio4;
                   
                switch(num){
                    case 1:
                    this.radio4Value="WELL"
                        console.log("well",this.radio4Value)
                        break;
                    case 2:
                        this.radio4Value="RASH"
                        console.log("well",this.radio4Value)
                        break;
                    case 3:
                        this.radio4Value="ALLERGY"
                        console.log("well",this.radio4Value)
                        break; 
                    case 4:
                        this.radio4Value="BODYHURT"
                        console.log("well",this.radio4Value)
                        break; 
                    case 5:
                        this.radio4Value="FACEHURT"
                        console.log("well",this.radio4Value)
                        break; 
                    case 6:
                        this.radio4Value="MOSQUITOHURT"
                        console.log("well",this.radio4Value)
                        break;
                  
                    default:
                        console.log('其他')
                }
            },
            // 口腔
            radio3Change(){
                var num = this.radio3;
                   
                switch(num){
                    case 1:
                    this.radio3Value="WELL"
                        console.log("well",this.radio3Value)
                        break;
                    case 2:
                        this.radio3Value="HERPAS"
                        console.log("well",this.radio3Value)
                        break;
                    case 3:
                        this.radio3Value="ULCERATION"
                        console.log("well",this.radio3Value)
                        break; 
                    case 4:
                        this.radio3Value="THROATRED"
                        console.log("well",this.radio3Value)
                        break;
                  
                    default:
                        console.log('其他')
                }
            },
            // 身体
            radio2Change(){
                var num = this.radio2;
                   
                switch(num){
                    case 1:
                    this.radio2Value="WELL"
                        console.log("well",this.radio2Value)
                        break;
                    case 2:
                        this.radio2Value="COUGH"
                        console.log("well",this.radio2Value)
                        break;
                    case 3:
                        this.radio2Value="RHINORRHEA"
                        console.log("well",this.radio2Value)
                        break; 
                    case 4:
                        this.radio2Value="FEVERHIGH"
                        console.log("well",this.radio2Value)
                        break;
                    case 5:
                       this.radio2Value="EVERLOWF "
                        console.log("well",this.radio2Value)
                        break;
                    case 6:
                       this.radio2Value="DIARRHEA "
                        console.log("well",this.radio2Value)
                        break;
                    default:
                        console.log('其他')
                }
            },
            // 精神
            radio1Change(){
                console.log(this.radio1)
                var num = this.radio1;
                   
                switch(num){
                    case 1:
                    this.radio1Value="WELL"
                        console.log("well",this.radio1Value)
                        break;
                    case 2:
                        this.radio1Value="DOLDRUMS"
                        console.log("well",this.radio1Value)
                        break;
                    case 3:
                        this.radio1Value="SAG"
                        console.log("well",this.radio1Value)
                        break; 
                    case 4:
                        this.radio1Value="TOOEXCITED"
                        console.log("well",this.radio1Value)
                        break;
                    case 5:
                       this.radio1Value="TOOAGITATED "
                        console.log("well",this.radio1Value)
                        break;
                    default:
                        console.log('其他')
                } 
            },
            postCheck(){
                    this.loading2=true
                     this.$http({
                    method: 'get',
                    url: this.$getApi + 'healthCheck/management/findPeriod?type=MORNING&klassId='+this.value,



                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res
                    this.loading2=false
                    console.log("===res getKlassData===",res.body);
                    console.log("===res getKlassData===",res);
                    var morningData=body.healthMorning
                  
                    for (var i = 0; i < morningData.length; i++) {

                      if(morningData[i].student.avatar==''){
                        // console.log('wwwwwwwwwwwwwwwwwwwwwwww')
                        morningData[i].student.avatar+= 'https://bdtext.oss-cn-beijing.aliyuncs.com/Ata7Kf_1540175291614.png'
                        console.log('22221',morningData)
                      }else{
                       morningData[i].student.avatar= 'https:'+morningData[i].student.avatar
                      } 
                      console.log('111111111111111',morningData[i].student.avatar)
                    }
                    this.postCheckArry=body.healthMorning
                    var chack=[]
                      res.body.forEach(function(item, index, array){
                               chack.push({stuId:item.id,stuName:item.name,stuImg:item.avatar})    
                          })
                      this.chackArry=chack
                      console.log('-----',this.chackArry)
                        })






                this.outerVisible=true;
            },
            checkboxCl(e){
              
                console.log('val',e.target.checked)
                if (this.dialogVisible===true) {
                 
                }
                this.isChack=e.target.checked
                this.addData();
            },
            checkboxCH(val,index){

               // this.multipleSelection = val;
               console.log('111111val',val)
               this.studentId=val
               console.log('111111index',index)
               console.log('111111index', this.studentId)
               this.stuIndex=index

          console.log(this)
              
            },
            choesKlass(){
                console.log(this.value)
                 this.$http({
                    method: 'get',
                    url: this.$getApi + 'healthCheck/management/findUnChecked?klassId='+this.value+'&type=MORNING',

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
                      this.chackArry=chack
                      console.log('-----',this.chackArry)
                        })



            },
            showDia(){
                this.dialogVisible=true;
                 // this.isChack=false
                 this.klassesArray=[]
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


                  if (this.value!=='') {
                    this.choesKlass()
                  }

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
                             this.klassesOptions = klassesArray;
                                
                            } else {
                                alert('err:' + body)
                            }
                        })
                }

            },
             formatTooltip(val) {
                return val / 1;

                },
                change(){
                    console.log('value2',this.value2)
                }
        }
    }
</script>
<style>
    .clear {
  clear: both;
  }
    .active{
    border:1px solid #409EFF !important;
  }
  .abc{
    width:80px;
    height:82px;
    margin-left:15px;
    float:left;
    margin-top:20px;
    border-radius: 10px;
    border:1px solid #ccc;
  }
  .bbb{
    width:480px;height:160px;background-color:#f5f5f5;margin-bottom:20px;margin-left:10px;border:1px solid #ccc;border-radius: 10px;
  }

</style>