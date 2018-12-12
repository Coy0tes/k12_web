<template>
    <div style="padding:10px">
           <el-select v-model="value1" placeholder="请选择班级" @visible-change="getKlass">
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>
                   <el-date-picker
                      v-model="value33"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                 <el-button type='primary' @click="getData">查询</el-button>
          
            <div>
                
                 <el-table
                      :data="tableData"
                      border
                      @row-click='handleClick'
                      style="width: 100%;margin-top:10px">
                      <el-table-column
                        prop=""
                        width="1"
                        label="">
                      </el-table-column>
                       <el-table-column
                        prop="createdAt"
                        width="150"
                        :formatter="dateFormat"
                        align='center'
                        label="日期">
                      </el-table-column> 
                      <el-table-column
                        prop="klassName"
                        width="150"
                        
                        align='center'
                        label="班级">
                      </el-table-column>
                      <el-table-column
                        prop="content"
                         align='center'
                        label="内容"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="createdBy.username"
                         align='center'
                        label="上传者"
                        >
                      </el-table-column> 
                      <el-table-column
                        prop="pictures.length"
                         align='center'
                        label="照片数量"
                        >
                      </el-table-column>
                      
                   
                    </el-table>


                    <el-dialog
                    
                      :visible.sync="dialogVisible"
                      width="1000px"
                      :before-close="handleClose">
                       <div class="top">
                         <span class="top_text">查看图片</span>
                         <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                           <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
                         </div>
                      </div>

                      
                                        
                                        
                                <div  style="margin-bottom:2px;margin-top:2px;text-align:center;height:480px;padding-left:80px;margin-top:-20px">

                                            <!-- "'https://'+i  可以实现跳转-->
                                        <li style="float:left;list-style:none; margin-left:5px" v-for='i in pictures'>
                                             <a href="" :download="'https://'+i"  style="width:40px;height:20px;background-color:#fafafa;position: relative;top:130px;left:80px">
                                                下载
                                                 </a>
                                          <img :src="'https://'+i"  width="120px" height='130px' />
                                            
                                        </li>
                                      
                           
                                </div>
                              
                         
                      
                      <span slot="footer" class="dialog-footer">
                        <!-- <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
                      </span>
                    </el-dialog>


            </div>
 
    </div>
</template>
<script>
import Moment from 'moment';
    export default {
        data(){
            return {
                tableData:[],
                klassesOptions:[],
                value1:'',
                value33:'',
                dialogVisible:false,
                pictures:[]
            }
        },
  
        methods:{
               dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return Moment(date*1000).format("YYYY-MM-DD");  
            },
            handleClick(row){
                console.log(row)
                this.pictures=row.pictures
                this.dialogVisible=true
            },
            downloadIamge(i, name) {//下载图片地址和图片名
                    this.$http.jsonp('https://bdhead.oss-cn-beijing.aliyuncs.com', {
                    params: {},
                    headers:{
                      'content-type': "application/json;charset=UTF-8",
                      'Access-Control-Allow-Origin':'*'
                    },
                    jsonp: 'onBack'
                }).then((res) => {
                    console.log('sssssssssss',res); 
                })

                console.log('载图片地址和图片名',i)
                var a=i[0]
                console.log(a)
              var image = new Image();
                // console.log('载图片地址和图片名',i)
              // 解决跨域 Canvas 污染问题
              image.setAttribute("crossOrigin", "anonymous");
                     console.log('11111111111111',i)
              image.onload = function() {
                    console.log('22222222222222',)
                var canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                var context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, image.width, image.height);
                var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
             
                var a = document.createElement("a"); // 生成一个a元素
                var event = new MouseEvent("click"); // 创建一个单击事件
                a.download = name || "photo"; // 设置图片名称
                a.href = url; // 将生成的URL设置为a.href属性
                a.dispatchEvent(event); // 触发a的单击事件
              };
              image.src = 'https://'+a;
            },
            downs(i){
                console.log(i)
              this.downloadIamge(i, 'pic')
            },
            exportData(e) {
             //   if ( e && e.preventDefault ){
             //     e.preventDefault(); 
             // } else {
             //     window.event.returnValue = false;  
             // }
                       
                
                

            },

            getKlass(){
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

                   
                        
                          var klassesArray=[];
                          res.body.forEach(function(item, index, array){
                               klassesArray.push({value:item.id,label:item.name})    
                          })
                             //this.value = klassesArray[0].value
                             this.klassesOptions = klassesArray;
                                
                           
                        })
                }
            },

            getData(){
                         var date = new Date(this.value33);  
                     var date_value=date.getFullYear() + '-' + ((date.getMonth() + 1)>9?(date.getMonth() + 1):('0'+(date.getMonth() + 1))) + '-' + (date.getDate()>9?date.getDate():('0'+date.getDate())) 
                    this.$http({
                    method: 'get',
                    url:  this.$getApi+'management/klass-feeds/findFeed?klassId='+this.value1+'&localDate='+date_value,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res.body);
                    var a= res.body



               
                   
                    for (var i = 0; i<a.length;i++) {
                        console.log(a[i])
                            for(var j=0;j<a[i].pictures.length; j++){
                                // console.log( a[i].pictures('jpg'))
                               a[i].pictures[j] = a[i].pictures[j].match(/(\S*).jpg/g); 
                                console.log(a[i].pictures[j])
                                // console.log(a[i].pictures.length)
                                // if (a[i].pictures[j].length>55) {
                                //      a[i].pictures[j]=a[i].pictures[j].substr(0,55)
                                // console.log(a[i].pictures[j])

                                // }else{
                                //      a[i].pictures[j]=a[i].pictures[j]
                                // }
                               

                            }



                    }

                    this.tableData=a
                        })
            },
        },
        mounted(){

            this.getKlass();
            this.getData();
        }
    }
</script>
<style>
    
</style>s