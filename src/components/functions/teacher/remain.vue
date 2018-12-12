<template>
    <div style="padding-left:10px;padding-right:10px;padding-top:5px;">
        <div style="margin-bottom:5px;"> 
            <el-button type="primary" style="float:right" @click="addBaby">添加</el-button>
        <el-select v-model="value1" placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
              <el-date-picker
              v-model="value2"
              type="date"
              placeholder="选择日期">
            </el-date-picker>

            <el-button type="primary" @click="search">查询</el-button>
            </div>
             <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop=""
                  label=""
                  align=""
                  width="1">
                </el-table-column>
                <el-table-column
                  prop="parentName"
                  label="姓名"
                  align="center"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="moblie"
                   align="center"
                  label="电话"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="babyName"
                   align="center"
                  label="宝宝姓名">
                </el-table-column>
                <el-table-column
                  prop="babyAge"
                   align="center"
                  label="宝宝年龄">
                </el-table-column> 
                <el-table-column
                  prop="isWill"
                   align="center"
                   :formatter='formatStyle'
                  label="状态">
                </el-table-column>
                   <el-table-column
                align="center"
                  label="操作"
                >
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="primary" size="small">详情</el-button>
                    
                  </template>
                </el-table-column>
              </el-table>


              <el-dialog
        
              :visible.sync="dialogVisible"
              width="600px"
              max-height="800px" 
              :before-close="handleClose">
                <div class="top">
             <span class="top_text">{{ParentName}}的回访详情</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
              <div style="margin-left:30px;margin-top:-20px;">
                 <div style="display:inline-block;margin-bottom:20px;">宝宝姓名{{BabyName}}</div>    <div style="display:inline-block;margin-bottom:20px;margin-left:100px">家长电话{{ParentMoblie}}</div>
                 <ul v-for="(item,index) in stateData">
                    <li>
                        <div style="display:inline-block;margin-right:20px;">{{item.createdAt|time}}</div> {{item.content}}  <div  style="display:inline-block;float:right;margin-right:40px">{{item.teacherName}}</div>
                        <div style="border:1px solid #ccc;height:30px;width:1px;margin-left:40px"></div>
                        
                    </li>
                     
                 </ul>
                 <div style="border:1px solid #fff;height:30px;width:1px;margin-left:40px;    margin-top: -30px;"></div>
                 <div style="margin-top:30px;line-height:53px;">
                    <div>状态 <el-select v-model="value" placeholder="请选择" style="margin-top: -10px;width: 200px;margin-bottom:20px;">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      </div>
                    <div style="vertical-align；middle;text-align:center;line-height:53px;margin-left: -38px;">
                    描述 <el-input
                      type="textarea"
                      :rows="2"
                      style="width:500px; "
                      placeholder="请输入内容"
                      v-model="content">
                    </el-input>
                    </div>
                 </div>
              </div>
              <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="handleAdd" style="margin-right:45%;margin--top:15px">确 定</el-button>
              </span>
            </el-dialog>

            <el-dialog
              
              :visible.sync="dialogAdd"
              width="600px"
              :before-close="handleClose">
            <div class="top">
             <span class="top_text">添加信息</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogAdd = false">
             </div>
          </div>
              <!-- <span></span> -->
                    <el-form  label-width="80px" :model="formData" style="margin-left:100px">
                      <el-form-item label="家长姓名">
                        <el-input v-model="formData.parentName" style="width:300px"></el-input>
                      </el-form-item>
                      <el-form-item label="家长电话">
                        <el-input v-model="formData.mobile" style="width:300px"></el-input>
                      </el-form-item>
                      <el-form-item label="宝宝姓名">
                        <el-input v-model="formData.babyName" style="width:300px"></el-input>
                      </el-form-item>
                      <el-form-item label="宝宝年龄">
                        <el-input v-model="formData.babyAge" style="width:300px"></el-input>
                      </el-form-item>
                    </el-form>






              <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="fromAdd" style="    margin-right: 42%;">确 定</el-button>
              </span>
            </el-dialog>
          <!--   <a href='bdhead.oss-cn-beijing.aliyuncs.com/ttxy/bodun_ttxy_qsyi_1510129004_0.jpg' download="">点击下载</a>
            <p @click='down'>下载</p>
             <a href="#" @click="download()" download='https://bdhead.oss-cn-beijing.aliyuncs.com/ttxy/bodun_ttxy_qsyi_1510129004_0.jpg'>download</a>

              <iframe id="ifile" style="display:none" src='https://bdhead.oss-cn-beijing.aliyuncs.com/ttxy/bodun_ttxy_qsyi_1510129004_0.jpg'></iframe> -->
    </div>
</template>
<script>
    export default {
        data(){
            return {
                formData:{
                      babyAge: "",
                      babyName: "",
                      mobile: "",
                      parentName: "",
                      schoolId: localStorage.schoolsId
                },
                tableData:[
                {
                    name:'赵女士',
                    mobeil:'13100011223',
                    babyName:'李毅',
                    babyAge:'3',
                    state:'回访中'
                },{
                    name:'李女士',
                    mobeil:'13100011223',
                    babyName:'王益',
                    babyAge:'4',
                    state:'已入园'
                },

                ],
                   options: [{
                      value: 'WILLOK',
                      label: '愿意入园'
                    }, {
                      value: 'WILL',
                      label: '待定'
                    }, {
                      value: 'UNWILL',
                      label: '不愿意入园'
                    }],
                    value: '',  

                  options1: [{
                      value: 'UNVISIT',
                      label: '未访问'
                    }, {
                      value: 'VISITING',
                      label: '正在访问'
                    }, {
                      value: 'VISITOK',
                      label: '访问结束'
                    }],
                    value1: '',
                    value2: '',
                stateData:[
             


                ],
                dialogVisible:false,
                dialogAdd:false,
                visitId:'',
                content:'',
                data:[],
                ParentName:'',
                BabyName:'',
                ParentMoblie:'',
                token:'',
              

            }
        },
        filters:{
              time: function (value) {
          let d = new Date(parseInt(value) * 1000)
          // console.log('dddddddd',d)
           if (d == "Invalid Date") {
               return "";  
              }       
              return (d.getFullYear()) + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
       },
        },
        methods:{

          download(){
           //下载文件的地址
           var url="https://bdhead.oss-cn-beijing.aliyuncs.com/ttxy/bodun_ttxy_qsyi_1510129004_0.jpg";
           document.getElementById("ifile").src=url;

           console.log('1111111111',document.getElementById("ifile").src)
        },


      // api/tp/aliyun/bd-token
          down(){

            
                        
    

                //   this.$http.jsonp('https://bdhead.oss-cn-beijing.aliyuncs.com/ttxy/bodun_ttxy_qsyi_1510129004_0.jpg', {
                //     params: {},
                //     headers:{
                //       'content-type': "application/json;charset=UTF-8",
                //     },
                //     jsonp: 'onBack'
                // }).then((res) => {
                //     console.log('sssssssssss',res); 
                // })

                         this.$http({
                    method: 'get',
                    url:'https://bdhead.oss-cn-beijing.aliyuncs.com/ttxy/bodun_ttxy_qsyi_1510129004_0.jpg',                  
                    headers: {
                        'content-type': "application/json;charset=UTF-8",
                        'Access-Control-Allow-Origin':'*',
                        // 'Authorization': 'Bearer ' + localStorage.token,
                        'Access-Control-Allow-Origin':'*',

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res
                  
                  console.log('111',)
                    
                  

                  

                })
          },
          downs(){

               this.$http({
                    method: 'get',
                    url:this.$getApi + 'api/tp/aliyun/bd-token',               
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token,
                        

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res
                   
                      console.log(res)
                       this.token=res.body.token
                  

                    console.log(this.token)


                         this.$http({
                    method: 'get',
                    url:'https://bdhead.oss-cn-beijing.aliyuncs.com/ttxy/bodun_ttxy_qsyi_1510129004_0.jpg',                  
                    headers: {
                        'content-type': "application/json;charset=UTF-8",
                        'Authorization': 'Bearer ' + localStorage.token,
                        // 'Access-Control-Allow-Origin':'http://127.0.0.1:8020',

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res
                    this.tableData=res.body
                      console.log(res)
                    
                  

                  

                })

                })

                 

          },


        formatStyle: function (row, column) {
           
        return row.isWill == "UNWILL" ? '不愿意入园' :row.isWill == "WILL" ? '待定' :row.isWill == "WILLOK" ? '愿意入园':"未知";  

    },
            getData(){
               console.log(this.value2)
                // var newdate=new Date(this.value2).Format('yyyy-MM-dd')
                   var date = new Date(this.value2);  
                   var year =date.getFullYear()
                   var month=date.getMonth() + 1
                   var day=date.getDate()
    var date_value=year + '-' + (month<10?'0'+month:month) + '-' + (day<10?'0'+day:day );
    console.log(date_value)
                              this.$http({
                    method: 'get',
                    url:this.$getApi+'visit/management/find?isVisit='+ this.value1+'&specialDate='+ date_value,                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res
                    this.tableData=res.body
                      console.log(res)
                    
                  

                  

                })
            },
            search(){
                this.getData();
            },
            handleClick(row){
                console.log(row)
                 this.visitId=row.id
                 this.ParentName=row.parentName
                 this.BabyName=row.babyName
                 this.ParentMoblie=row.moblie
                          this.$http({
                    method: 'get',
                    url:this.$getApi+'visit/management/findVisitParents?visitSchoolId='+row.id,                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res
                        this.stateData=res.body
                      console.log(res)
                    
                  

                  

                })




                this.dialogVisible=true
            },
            handleAdd(){
                        this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'visit/management/addVisitParam?visitSchoolId='+ this.visitId,
                    
                       // visit/management/find?isVisit=UNVISIT&specialDate=2018-08-28
                          {
                              "content": this.content,
                                "isWill": this.value
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
                        this.$message({
                      message: '成功',
                      type: 'success'
                    }); 
                         this.getData();
                        this.dutyDialog=false
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    }); 
                    // this.getData();
                })
                 this.dialogVisible=false
            },
            addBaby(){
                this.dialogAdd=true
                
            },
            fromAdd(){
                
               console.log(this.formData)
                       this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'visit/management/web/addVisit',
                    
                       // visit/management/find?isVisit=UNVISIT&specialDate=2018-08-28
                          this.formData,
                    
                    {
                      headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===body=add==teacher====",res);
                        this.$message({
                      message: '成功',
                      type: 'success'
                    }); 
                         this.getData();
                        this.dialogAdd=false
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    }); 
                    // this.getData();
                })
                this.dialogAdd=false
            }
        },
        mounted(){
          this.getData();
        }
    }
</script>
<style>
    
</style>