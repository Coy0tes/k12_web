<template>
    <div style="padding-left:10px;padding-right:10px;" v-loading="loading2"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
              <div style="padding-top:3px;padding-bottom:3px;">
               

                    <el-date-picker
                      v-model="value33"
                      type="date"
                      placeholder="选择日期"
                     >
                    </el-date-picker>





                       <el-select v-model="value1" placeholder="请选择班级" @visible-change="chanalue">
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>

                  <el-button type='primary' @click="getData">查询</el-button>
    
            </div >
            <div style="width:100%;height:30px; margin-top:10px; ">
                <ul>
                    <li style="width:100px;height:30px;background-color:#f5f5f5; margin-right:10px;float:left;border-radius: 10px;border:1px solid #ccc;text-align:center;line-height:30px;font-size:18px;font-weight:700">儿童</li>
                    <li style="width:26%;height:30px;background-color:#f5f5f5; margin-right:10px;float:left;border-radius: 10px;border:1px solid #ccc;text-align:center;line-height:30px;font-size:18px;font-weight:700;margin-left: 10px;" >晨检</li>
                    <li style="width:26%;height:30px;background-color:#f5f5f5; margin-right:10px;float:left;border-radius: 10px;border:1px solid #ccc;text-align:center;line-height:30px;font-size:18px;font-weight:700" >午检</li>
                    <li style="width:26%;height:30px;background-color:#f5f5f5; margin-right:10px;float:left;border-radius: 10px;border:1px solid #ccc;text-align:center;line-height:30px;font-size:18px;font-weight:700" >晚检</li>
                    <!-- <li style="width:30%;height:50px;background-color:#ccc; margin-right:10px;float:left;border-radius: 10px;border:1px solid #000"></li> -->
                </ul>
                
            </div>
            <div style="width:100%;height:200px; margin-top:10px"   v-for="item in tableData">
                  <ul>
                    <!-- 头像姓名 -->
                    <li style="width:100px;height:180px;background-color:#f5f5f5; margin-right:10px;float:left;border-radius: 10px;border:1px solid #ccc;text-align:center;">
                          <div style="margin-top:56px; width:50px; height:50px; margin-left:22px ">
                                                <!-- 头像 -->
                                                <!-- <img src="../../../assets/chrildimg.jpg" width="100%" height="100%" alt="" > -->
                                                <img :src="'https:'+ (item.MORNING.student.avatar==''?'bdtext.oss-cn-beijing.aliyuncs.com/Ata7Kf_1540175291614.png':item.MORNING.student.avatar)" width="50" height="50" alt="" style="border-radius: 50%" >
                                                <p>{{item.MORNING.student.name}}</p>
                                            </div>
                    </li>
                    <!-- 晨检 -->
                       <li style="width:26%;height:180px;background-color:#f5f5f5; margin-right:10px;float:left;border-radius: 10px;border:1px solid #ccc">
                          <div  v-if="!item.MORNING.spirit" style="width:100%;height:178px;background-color:#fff;position: relative;border-radius: 10px;line-height:178px;text-align:center;">暂未上传</div>
                          
                            <div style="float:left; width:25px;height:100%;">
                                           <!--  <input type="checkbox"  style="float:left; width:20px;height:20px;
                                            margin-top:5px;margin-left:5px"> -->

                                          
                                    </div>
                                        
                                    <div style="float:left;width:300px;height:100%;" @click=''v-if="item.MORNING.spirit">
                                        
                                        <ul>

                                            <li style="width:140px;height:26px;background-color:#fff;margin-top:10px;margin-left:4px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;">精神：{{item.MORNING.spirit=='null'?'暂无数据':item.MORNING.spirit|formatStatus}} </li>
                                            <li style="width:140px;height:26px;background-color:#fff;margin-top:10px;margin-left:4px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;">皮肤：{{item.MORNING.sink=='null'?'暂无数据':item.MORNING.sink|formatSink}}</li>
                                            <li style="width:140px;height:26px;background-color:#fff;margin-top:10px;margin-left:4px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;">身体：{{item.MORNING.body=='null'?'暂无数据':item.MORNING.body|formatBody}} </li>
                                          
                                           <!--  <li style="width:140px;height:26px;background-color:#fff;margin-top:10px;margin-left:4px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;">体温  {{item.MORNING.temperature=='null'?'暂无数据':item.MORNING.temperature}}°C</li> -->
                                            <li style="width:140px;height:26px;background-color:#fff;margin-top:10px;margin-left:4px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;">口腔： {{item.MORNING.mouth=='null'?'暂无数据':item.MORNING.mouth|formatMouth}} </li>
                                            <li style="width:140px;height:26px;background-color:#fff;margin-top:10px;margin-left:4px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;">其他： {{item.MORNING.other=='null'?'暂无数据':item.MORNING.other|formatOther}}</li>
                                            <li style="width:284px;height:26px;background-color:#fff;margin-top:10px;margin-left:4px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;"> 备注：{{item.MORNING.remark=='null'?'暂无数据':item.MORNING.remark}}</li>
                                            
                                        </ul>
                                    </div>
                                     <div style="float:left;width:70px;height:100%;padding-top:50px;padding-left:15px">
                                       
                                        <el-button style="display:block;margin-top:20px" size="mini" @click='handelDelete(item.MORNING.id)' type='danger'>删 除</el-button>
                                    </div>



                      </li>
                      <!-- 午检 -->
                         <li style="width:26%;height:180px;background-color:#f5f5f5;margin-right:10px;float:left;border-radius: 10px;border:1px solid #ccc">
                          
                          <div  v-if="!item.NOON.spirit" style="width:100%;height:178px;background-color:#fff;position: relative;border-radius: 10px;line-height:178px;text-align:center;">暂未上传</div>
                            <div style="float:left; width:20px;height:100%;">
                                   
                                          
                                            <p style="text-align:center;font-weight:400;font-size:16px"> </p>
                                    </div>
                                  
                                    <div style="float:left;width:300px;height:100%;" @click='' v-if="item.NOON.spirit">
                                            
                                        <ul>
                                            
                                           <li style="width:140px;height:28px;background-color:#fff;margin-top:10px;margin-left:10px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;">精神：{{item.NOON.spirit=='null'?'暂无数据':item.NOON.spirit|formatStatus}} </li>
                                            <li style="width:140px;height:28px;background-color:#fff;margin-top:10px;margin-left:10px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;">皮肤：{{item.NOON.sink=='null'?'暂无数据':item.NOON.sink|formatSink}}</li>
                                            <li style="width:140px;height:28px;background-color:#fff;margin-top:10px;margin-left:10px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;">身体：{{item.NOON.body=='null'?'暂无数据':item.NOON.body|formatBody}}</li>
                                            <li style="width:140px;height:28px;background-color:#fff;margin-top:10px;margin-left:10px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;">正餐：{{item.NOON.dinner=='null'?'暂无数据':item.NOON.dinner|formatDinner}}</li>
                                         
                                           <li style="width:160px;height:28px;background-color:#fff;margin-top:10px;margin-left:10px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;">午睡：{{item.NOON.afternap=='null'?'暂无数据':item.NOON.afternap|formatAfterNap}} </li>
                                            <li style="width:290px;height:28px;background-color:#fff;margin-top:8px;margin-left:10px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;"> 备注：{{item.NOON.remark}}</li>
                                            
                                        </ul>
                                    </div>
                                     <div style="float:left;width:70px;height:100%;padding-top:50px;padding-left:15px">
                                       
                                        <el-button style="display:block;margin-top:20px" size="mini" @click='handelDelete(item.NOON.id)' type='danger'>删 除</el-button>
                                    </div>


                      </li>
                      <!-- 晚检 -->
                     <li style="width:26%;height:180px;background-color:#f5f5f5; margin-right:10px;float:left;border-radius: 10px;border:1px solid #ccc">
                           <div  v-if="!item.NIGHT.spirit" style="width:100%;height:178px;background-color:#fff;position: relative;border-radius: 10px;line-height:178px;text-align:center;">暂未上传</div>
                          
                            <div style="float:left; width:20px;height:100%;">
                                 

                                            
                                            <p style="text-align:center;font-weight:400;font-size:16px"> </p>
                                    </div>
                                   
                                    <div style="float:left;width:300px;height:100%;" @click=''v-if="item.NIGHT.spirit">
                                        
                                        <ul>
                                           <li style="width:140px;height:28px;background-color:#f5f5f5;background-color:#fff;margin-top:10px;margin-left:10px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;">精神：{{item.NIGHT.spirit=='null'?'暂无数据':item.NIGHT.spirit|formatStatus}} </li>
                                            <li style="width:140px;height:28px;background-color:#f5f5f5;background-color:#fff;margin-top:10px;margin-left:10px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;">皮肤：{{item.NIGHT.sink=='null'?'暂无数据':item.NIGHT.sink|formatSink}}</li>
                                            <li style="width:140px;height:28px;background-color:#f5f5f5;background-color:#fff;margin-top:10px;margin-left:10px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;">身体：{{item.NIGHT.body=='null'?'暂无数据':item.NIGHT.body|formatBody}} </li>
                                            <li style="width:140px;height:28px;background-color:#f5f5f5;background-color:#fff;margin-top:10px;margin-left:10px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;">加餐：{{item.NIGHT.addfood =='null'?'暂无数据':item.NIGHT.addfood |formatAddFood}}</li>
                                          
                                            <li style="width:140px;height:28px;background-color:#f5f5f5;background-color:#fff;margin-top:10px;margin-left:10px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;">大小便：{{item.NIGHT.excrete =='null'?'暂无数据':item.NIGHT.excrete|formatExcrete}} </li>
                                            <li style="width:290px;height:28px;background-color:#fff;margin-top:8px;margin-left:10px;float:left;line-height: 26px;border-radius:4px;padding-left:10px;"> 备注：{{item.NIGHT.remark}}</li>
                                            
                                        </ul>
                                    </div>
                                    <div style="float:left;width:70px;height:100%;padding-top:50px;padding-left:15px">
                                       
                                        <el-button style="display:block;margin-top:20px" size="mini" @click='handelDelete(item.NIGHT.id)' type='danger'>删 除</el-button>
                                    </div>


                      </li>
                      
                      
                     
                  </ul>
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
            </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
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
                value1:'',
                value33:'',
                klassesOptions:[],
                tableData:[],
                innerVisible1:false,
                DeleteId:'',
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
            formatDinner: function (val) {
              // console.log(val)
              return val == 'WELL' ? '正常' : val == 'LESSEATTING' ? '饭量少' :val == 'LESSVEGETABLE' ? '蔬菜少' : val == "LESSMEAT" ? '肉类少': val == "TEACHERHELP" ? '老师喂' :'未知';
          },
          formatAfterNap: function (val) {
              // console.log(val)
              return val == 'WELL' ? '正常' : val == 'LESS' ? '少于30分钟' :val == 'NOSELEEP' ? '没睡' :'未知';
          },
           formatAddFood: function (val) {
              // console.log(val)
              return val == 'WELL' ? '正常' : val == 'LESSDRINK' ? '饮品少' :val == 'LESSFRUIT' ? '水果少' : val == "LESSMEAT" ? '肉类少': val == "MEDICINE" ? '药已吃' :'未知';
          },
          formatExcrete: function (val) {
              // console.log(val)
              return val == 'WELL' ? '正常' : val == 'YELLO' ? '小便黄' :val == 'LESS' ? '小便少':val == 'CONSTIPATION' ? '便秘':val == 'DIARRHEA' ? '小便少' :'拉稀';
          },
      }, 
        methods:{
            handelDelete(id){
                console.log(id)

                this.DeleteId=id
                this.innerVisible1=true

                // console.log(index)
            },
            sureDelete(){
                  this.$http({
                    method: 'delete',
                    url:this.$getApi+'healthCheck/management/delete?ids='+ this.DeleteId,


                    

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
                this.getData();
                 this.innerVisible1=false
            },
              changeData(){
                if (this.value=='DAY') {
                    this.showDate=true
                }else{
                    this.showDate=false
                }
                
            },
            getData(){
                        this.loading2=true

                     var date = new Date(this.value33);  
                       var date_value=date.getFullYear() + '-' + ((date.getMonth() + 1)>9?(date.getMonth() + 1):('0'+(date.getMonth() + 1))) + '-' + (date.getDate()>9?date.getDate():('0'+date.getDate())) 



                        this.$http({
                    method: 'get',
                    url: this.$getApi + 'healthCheck/management/findByDataAndKlass?klassId='+this.value1+'&date='+date_value,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res
                    this.loading2=false
                    console.log("===res getKlassData===",res.body);
                    console.log('typeof',typeof res.body.NIGHT)
                      var a=res.body
                      Object.keys(a).forEach(function(key){

                         console.log(key,a[key]);
                         console.log(a[key].NIGHT)
                              if (!a[key].MORNING) {
                            a[key].MORNING={
                                body:'',
                                createdAt:'',
                                id:'',
                                klassId:'',
                                klassName:'',
                                mouth:'',
                                other:'',
                                remark:'',
                                schoolId:'',
                                sink:'',
                                spirit:'',
                                student:{
                                  avatar:'',
                                  birthday:'',
                                  cardNo:'',
                                  gender:'',
                                  id:'',
                                  klass:'',
                                  name:'',
                                  portrait:'',
                                  schoolId:'',
                                  state:'',
                                },
                                temperature:'',
                                type:'MORNING',
                            }
                            // a[key].push(MORNING)
                          }
                          if (!a[key].NOON) {
                            console.log('没有午检')
                          a[key].NOON={
                                afternap:'',
                            body:'',
                            createdAt:'',
                            dinner:'',
                            id:'',
                            klassId:'',
                            klassName:'',
                            remark:'',
                            schoolId:'',
                            sink:'',
                            spirit:'',
                            student:{
                                  avatar:'',
                                  birthday:'',
                                  cardNo:'',
                                  gender:'',
                                  id:'',
                                  klass:'',
                                  name:'',
                                  portrait:'',
                                  schoolId:'',
                                  state:'',
                                },
                            type:'NOON',
                          }
                          // a.push(NOON)
                          
                          }

                          if(!a[key].NIGHT){
                            a[key].NIGHT={
                                   addfood:'',
                                    body:'',
                                    createdAt:'',
                                    excrete:'',
                                    id:'',
                                    klassId:'',
                                    klassName:'',
                                    remark:'',
                                    schoolId:'',
                                    sink:'',
                                    spirit:'',
                                    student:{
                                          avatar:'',
                                          birthday:'',
                                          cardNo:'',
                                          gender:'',
                                          id:'',
                                          klass:'',
                                          name:'',
                                          portrait:'',
                                          schoolId:'',
                                          state:'',
                                        },
                                    type:'"NIGHT"',
                            }
                         // a.push(NIGHT)
                          }

                    });
                     
                    

                      console.log("===res getKlassDataaaaaaaaaaaaa===",a);

                    
                        this.tableData=a
                      console.log("===res getKlassData===",this.tableData);
                   
                        
                    
                                
                          
                        })
            },
            searchData(){
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
                             this.klassesOptions = klassesArray;
                                
                          
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
                             this.klassesOptions = klassesArray;
                                
                            } else {
                                alert('err:' + body)
                            }
                        })
                }


            },
            chooce(index){
                  console.log('选择了',index)
                  this.ind = index
                 // var abs=document.getElementByClassName('abc')
                 // console.log(abs)








                  // this.checkboxCH(index);
                  // this.isChack=true
                  // this.checkboxCl()
                },
        },
        mounted(){
            this.searchData();
        }
    }
</script>
<style>
 
</style>