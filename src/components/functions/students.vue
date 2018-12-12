<template>
    <div class="picture">
  <div style="width:102.5%; height:60px; background-color:#fff;margin-top:-10px;margin-bottom:10px;margin-left:-15px; padding-right:25px; line-height:40px; padding-top:4px">
     <div class="line1" style="margin-top:10px;"> 
           <span style="margin-left:15px;">班级</span> 
                    <el-select v-model="value" placeholder="请选择班级" @change="chanalue">
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select> 
                  <el-button type="primary" v-show="check" @click="query" style='float:right;margin-left:20px;'>返回</el-button>
               <el-button type="primary" @click="showDialog" v-if="addNewStu" style='float:right'>添加新生</el-button>
               <el-button type="primary" @click="outExcel" v-if="addNewStu" style='float:right'>导出excel</el-button>
               <el-button type="primary" @click="outAll" v-if="addNewStu" style='float:right'>导出全部孩子</el-button>
               <!-- <el-button type="primary" @click="outAll" v-if="addNewStu" style='float:right'>批量导入孩子</el-button> -->
               <vue-xlsx-table @on-select-file="handleSelectedFile" style="float:right">批量导入孩子</vue-xlsx-table>

        </div>



            </div>
   
        <div class="queren">
                <el-button type="primary" >确定</el-button>
            </div>
     

        <div class="line1">
            <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%;margin-top:-10px;" border ref="multipleTable" @selection-change="changeFun">
              
                <el-table-column
                  type="selection"
                  width="55"
                  class="chacked">
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

                <el-table-column prop="birthday" label="生日"  width="150" sortable :formatter="dateFormat" >
                </el-table-column>

                <el-table-column prop="joinedAt" label="入校时间" width="150" sortable :formatter="dateFormat">
                </el-table-column>

                <el-table-column label="操作" width="500" align='center'>
                    <template scope="scope">


                        <!-- 家长按钮 -->
                        <el-button size="small" @click="getGuardian(scope.$index, scope.row)">家长</el-button>
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" @click="payfirst(scope.$index, scope.row)" >大额预收</el-button>
                        <el-button size="small" @click="receipts(scope.$index, scope.row)" >查看缴费单据</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        </div>

        
              
        <div class="line1 pr">
            
             <!--  <el-button type="primary" v-if="check" @click="query1">添加学生</el-button>
              <el-button type="primary" v-if="check" @click="query2">跳转费种转结</el-button> -->
        
        </div>
<!-- 缴费单据 -->
            <el-dialog
           
              :visible.sync="billsVisible"
              width="50%"
              :before-close="handleClose">
               <div style="width:100%;height: 55px;
                          background-color: #61bfff;
                          margin-top: -55px;
                          border-radius:5px 5px 0 0;
                          margin-bottom: 50px;" >
             <span class="top_text">缴费单据</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
             <img src="../../assets/close3.png" height="16" width="16" class="closeImg"@click="billsVisible = false">
           </div>
          </div>
                <div id='pic' style="padding-right:5px;padding-left:5px;">
                      <table border="1px solid #ccc" cellspacing="0">
                        <tr>
                          <td colspan="10" style="text-align: center;" class="color">缴费通知单</td>
                        
                        </tr>
                        
                         <tr>
                          <td class="color">幼儿姓名</td>
                          <td>{{this.studentName}}</td>
                          <td class="color">单位名称</td>
                          <td>{{this.schoolName}}</td>
                          <td class="color">单据号</td>
                          
                          <td colspan="5">{{picNum}}</td>
                          
                        </tr>



                         <tr>
                          <td class="color">班级</td>
                          <td>{{this.klassName}}</td>
                          <td class="color">缴费账号</td>
                          <td>微信账号：13300000003 <br>
                           
                          </td>
                          <td style="background-color:#2aa2ff; color:#fff; font-family: '黑体';
      font-size: 15px;font-weight:700;">缴费金额</td>
                          <td></td>
                          <td class="color">缴费日期</td>
                          <td colspan="3">1-10日</td>
                          
                        </tr>


                       <tr>
                          <td class="color">收费项目</td>
                          <td class="color">费用标准</td>
                          <td class="color">费用时间</td>
                          <td class="color">截止到  {{NowTime}}账户余额</td>
                          <td class="color">缺勤天数</td>
                          <!-- <td class="color">请假月份</td> -->
                          <td class="color">可抵减费用</td>
                          <td class="color">应退费用</td>
                          <td class="color">应收款</td>
                          <td style="width: 200px;" class="color">备注</td>
                        </tr>

                      <tr v-for="(item,index) in perArry">
                          <td style="background-color:#2aa2ff; color:#fff; font-family: '黑体';
      font-size: 15px;font-weight:700;height:40px;line-height:40px;">{{item.expense}}</td>
                          <td>{{item.money}}</td>
                          <td>{{item.periodTime|formatval}}</td>
                          <td>{{item.remainMoney}}</td><!--  余额 -->
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>{{item.money}}</td>
                          <td>{{item.expense}}</td>
                          <!-- <td></td> -->
                        </tr>

                       <tr>
                          <td class="color">合计</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <!-- <td></td> -->
                        </tr>


                     


                      </table>
                </div>
                <div>
                  <button @click="printPdf"> 打印</button>
                </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="billsVisible = false">取 消</el-button>
                <el-button type="primary" @click="billsVisible = false">确 定</el-button>
              </span>
            </el-dialog>
<!-- 添加新生 -->

        <el-dialog  :visible.sync="dialogVisible" :before-close="handleClose(dialogVisible)" width="700px" class="dialogSzie">
              

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">添加新生</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
            <el-form ref="form" :model="form" label-width="80px" style="width:360px; margin-left:160px;">

                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                 <el-form-item label="性别">
                   <el-select 
                   v-model="form.gender" 
                   placeholder="请选择"
                  :formatter="formatSex"  style="width:280px;">
                    <el-option label="女" value="FEMALE" :formatter="formatSex" ></el-option>
                     <el-option label="男" value="MALE" :formatter="formatSex" ></el-option>
                   </el-select>
               </el-form-item>

                 <el-form-item label="头像">
                    <el-input v-model="form.avatar" style="width:280px;"></el-input>
                </el-form-item>

                <el-form-item label="生日">
                    <el-col :span="10">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width:280px;"></el-date-picker>
                    </el-col>
                </el-form-item>

                 <el-form-item label="班级">
                    <el-select v-model="value" placeholder="请选择班级" style="width:280px;">
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>  
               </el-form-item>

                <el-form-item label="入学时间">
                    <el-col :span="10">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.joinedAt" style="width:280px;"></el-date-picker>
                    </el-col>
                </el-form-item>

                    

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="isAdd(1)" >关 闭</el-button>
                <el-button @click="isAdd(0)" type="primary">确 定</el-button>
            </span>

        </el-dialog>


        <!-- 预交款 -->
        <el-dialog
 
  :visible.sync="payfirstTag"
  width="37%"
  :before-close="handleClose">
     

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">大额预收</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="payfirstTag = false">
             </div>
          </div>
          <!-- Newtitle  end-->

          <div style="margin-left:224px;">

            <span>幼儿姓名: </span><el-input v-model="rowName" style="width:30%;margin-bottom:20px;"></el-input>
            <br>
            <span>预交金额: </span><el-input v-model="payfirstMoney" placeholder="请输入金额" style="width:30%"></el-input>
          </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="payfirstTag = false">取 消</el-button>
    <el-button type="primary" @click="putPayfirst">确 定</el-button>
  </span>
</el-dialog>



<!-- 年级操作 -->
        <el-dialog  :visible.sync="GradeDialog" :before-close="handleClose(GradeDialog)" class="dialogSzie">
          
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">年级操作</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="GradeDialog = false">
             </div>
          </div>
          <!-- Newtitle  end-->

            <el-form ref="form" :model="form" label-width="80px">

                <el-form-item label="学校">
                     {{this.kgName}}
                  </el-form-item>

                <el-form-item label="">
                    <div v-for="(item,index) in gradeList">
                        <div class="grade">年级：{{item.name}}，描述： {{item.description}} <span class="del" @click="resetGrade(index)">X</span></div>
                    </div>
                </el-form-item>

                <el-form-item label="新增">
                    <div class="line1">
                        <el-input v-model="newGrade" placeholder="请输入年级"></el-input>
                    </div>
                    <div class="line1">
                        <el-input v-model="newDescription" placeholder="请输入描述"></el-input>
                    </div>
                    <div class="line1">
                        <el-button type="primary" @click="addGrade">确定</el-button>
                    </div>
                </el-form-item>
            </el-form>



            <span slot="footer" class="dialog-footer">
                <el-button @click="GisAdd(1)" >关 闭</el-button>
                <el-button @click="GisAdd(0)" type="primary">确 定</el-button>
            </span>

        </el-dialog>

    <!-- {{this.$store.state.check}} -->
    </div>


</template>

<script>
    import guardian from '../functions/guardian.vue'
    import Moment from 'moment';
    import { mapState } from 'vuex';
    import {getLodop} from '../../static/Lodop/LodopFuncs.js'
    // import {needCLodop} from '../../static/Lodop/LodopFuncs.js'
    let LODOP;
    let strHtml=document.getElementById('#pic')
    export default {


     


        components:{
                guardian,
        },

        name: 'picture',
        data() {
            return {
              picNum:0,
              NowTime:'',
              perArry:[],
              period:'',
              klassName:'',
              schoolName:'',
              studentName:'',
              billsVisible:false,
              payfirstMoney:0,
              payfirstTag:false,
                tableData: [],
                kgId:"",
                kgName: "",

                dialogVisible: false, // 学校
                dialogUsage: 0, // 0 新增 1编辑
                dialogIndex: '',


                GradeDialog: false, // 年级 
                GradeUsage: 0, // 0 新增 1编辑
                GradeIndex: '',

                isResetG: false, // dialog内修改年级


                showSize: 10,
                current_page: 0,
                count: 100,
                currentPage:1,
                 pagesize:10,

                form: {
                    name: '',
                    gender: '',
                    avatar:'',
                    birthday:'',
                    klass:'',
                    joinedAt:'',

                },

                gradeList: [],

                klassesOptions: [],

                value :'',
                addNewStu:1,
                newGrade: '',
                newDescription: '',
                check:1,
                multipleSelection:[],
                newshoufei:false,
                rowId:0,
                rowKlassId:0,
                rowName:'',

            }
        },
         // beforeRouteEnter(to, from, next){
         //     next(vm=>{
         //    console.log(" beforeRouteEnter",)    
         //        })
            
         // },
        watch: {
            current_page(now, old) {
                this.getData()   
            },
            // 监视路由
            // '$route':'isTab'
        },
        // beforeRouteEnter(to, from, next){
        //     next(vm => {
        //     vm.url = from.path;
        //     console.log(from.path)
        //     console.log( vm.url)
        //     if(from.path==="/Newchargesplan"){

        //         this.newshoufei=true

        //     }
        //     })
        //     },
             
   filters: {
          formatval: function (val) {
              console.log(val)
              return val == "YEAR"  ? '年' : val == "HALF_YEAR"  ? '半年' :val == "QUARTER"  ? '季' :val == "MONTH"   ? '月' : '未知';
          }
      },
        methods: {
          inSchoolDate(dateStr){
            var strtime = dateStr;
                var date = new Date(strtime); 
                //传入一个时间格式，如果不传入就是获取现在的时间了，这样做不兼容火狐。
                // 可以这样做
                var date = new Date(strtime.replace(/-/g, '/'));
                 
                
               var time1 = date.getTime();
               
                console.log(time1)
                return time1
          },
          handleSelectedFile(convertedData){
              console.log(convertedData)
              var spliArry=[]
              if (convertedData.length>50) {
                  alert('最多导入50条')
                 spliArry= convertedData.slice(0,49)
                  console.log(spliArry)
              }else{
                spliArry=convertedData.body
              }
                
              var a=spliArry

              
              console.log(a)



                var typeArray=[]
                a.forEach(function(item, index, array){
                               typeArray.push({
                                name:item.姓名,
                                gender:item.性别,
                                birthday:item.生日,
                                avatar:'',
                                cardNo: '',
                                portrait: "",
                                klassId:'',
                                klassName:item.班级名字,
                                joinedAt:item.入园时间,
                                  
                          })
                             })

                console.log('typeArray',typeArray)

                    for (var c = 0; c < typeArray.length; c++) {
                  var a=typeArray[c].birthday
                  var b=typeArray[c].joinedAt
                  var d=typeArray[c].gender
                  typeArray[c].birthday=this.inSchoolDate(a)
                  typeArray[c].joinedAt=this.inSchoolDate(b)
                  typeArray[c].gender=this.formatsex1(d)
                  
                }
                 console.log('typeArray1111111',typeArray)


                       this.$http.post(
                    this.$getApi +'management/students/addMany',
                    typeArray,

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
                     this.$message({
                      message: '成功',
                      type: 'success'
                    });
                 
                    console.log('birthday');
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });

          },




           formatsex1: function (val) {
              console.log(val)
              if (val=='男') {
                return ('MALE')
              }else if (val=='女') {
                return ('FEMALE')
              }
              // return val == "FEMALE"  ? '女' : val == "MALE"  ? '男';
          },  
           formatsex: function (val) {
              console.log(val)
              if (val=='MALE') {
                return ('男')
              }else if (val=='FEMALE') {
                return ('女')
              }
              // return val == "FEMALE"  ? '女' : val == "MALE"  ? '男';
          },
          dateTo(dataString){
              var date = new Date(dataString);
               var Y = date.getFullYear() + '-';
              var  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
               var D= (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
             
             
                console.log(Y+M+D);
                return (Y+M+D)
          },
            // 导出全部学生
            outAll(){
                var allStu=[]
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


                    
                    for (var i = 0; i < res.body.length; i++) {
                      


                      var a=res.body[i].id


                this.$http({
                    method: 'get',
                    url:   this.$getApi+'management/students?klassId=' + a,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res)

                    const {
                        body
                    } = res

                    console.log("===res students===",res.body);

                    for (var i = 0; i < res.body.length; i++) {
                      allStu.push(res.body[i]) 

                    }
                

                })

                    };


console.log('allStudent',allStu.length)
  
        





       this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {


                  for (var c = 0; c < allStu.length; c++) {
                  var a=allStu[c].birthday*1000
                  var b=allStu[c].joinedAt*1000
                  var d=allStu[c].gender
                  allStu[c].birthday=this.dateTo(a)
                  allStu[c].joinedAt=this.dateTo(b)
                  allStu[c].gender=this.formatsex(d)
                  
                }

            console.log('allStudent',allStu)

                    this.excelData = allStu //你要导出的数据list。
                    this.export2Excel()
                }).catch(() => {
                
                });






                 
                        })
                console.log('allStudent',allStu)
            },


          outExcel(){
            this.outExe();
          },
                   outExe() {
                this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                         for (var c = 0; c < this.tableData.length; c++) {
                          var a=this.tableData[c].birthday*1000
                          var b=this.tableData[c].joinedAt*1000
                          var d=this.tableData[c].gender
                          this.tableData[c].birthday=this.dateTo(a)
                          this.tableData[c].joinedAt=this.dateTo(b)
                          this.tableData[c].gender=this.formatsex(d)
                          
                }


                    this.excelData = this.tableData //你要导出的数据list。
                    this.export2Excel()
                }).catch(() => {
                
                });
            },
            export2Excel() {
                var that = this;
                require.ensure([], () => {
                    const { export_json_to_excel } = require('E:/JavaCode/WEB/k12w/k12_web/src/excel/Export2Excel.js'); //这里必须使用绝对路径
                    const tHeader = ['ID','名字','性别','生日','入校时间']; // 导出的表头名
                    const filterVal = ['id','name','gender','birthday','joinedAt',]; // 导出的表头字段名
                    const list = that.excelData;
                    console.log(filterVal,list)
                    const data = that.formatJson(filterVal, list);
                    console.log(data)

                    let time1,time2 = '';
                    // if(this.start !== '') {
                    //     time1 = that.moment(that.start).format('YYYY-MM-DD')
                    // }
                    // if(this.end !== '') {
                    //     time2 = that.moment(that.end).format('YYYY-MM-DD')
                    // }
                     console.log('11111111111111111',tHeader)
                    export_json_to_excel(tHeader, data, `学生管理`);// 导出的表格名称，根据需要自己命名
                      console.log('11111111111111111')
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },

    putAccont(){
              this.$http({

                    method: 'get',
                    url:this.$getApi+'charge/suppStudentAccount',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                
                    
                    const {
                        body
                    } = res
                    
                   

                 




                })



    },

          printPdf() {
        this.CreateOneFormPage();
         // LODOP.PRINT();
         //  LODOP.PREVIEW();
      },
      CreateOneFormPage() {
        LODOP = getLodop();
        console.log("LODOP",getLodop())
        LODOP.PRINT_INIT("打印任务名");
        LODOP.SET_PRINT_STYLE("FontSize", 14);
        LODOP.SET_PRINT_STYLE("Bold", 1);
        // LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印页面部分内容");
        LODOP.ADD_PRINT_HTM(0,0,"100%","100%", document.getElementById("pic").innerHTML);
        LODOP.PREVIEW();
        // LODOP.ADD_PRINT_HTM(88, 200, 350, 600, 
        //                                document.getElementById("form1").innerHTML);   

      },







                     formatSex: function (row, column) {
            // console.log('-------formatDate------------',row.periodDiscounts)
                return row.gender == "FEMALE" ? '女' : row.gender == "MALE" ? '男' : "未知";

            },

          receipts(index,row){
           var myDate = new Date();
              var year=myDate.getFullYear();
              var month=myDate.getMonth();
              var day =1;
              var day1=myDate.getDate()
              var nowTime=year+'年'+(month+1)+'月'+day+'日';
              var num11=year+''+(month+1)+''+day1+'';
              console.log("year",year)
            this.NowTime=nowTime
              this.billsVisible=true


        var num=Math.floor(Math.random()*10+1);
        this.picNum=num11+''+localStorage.schoolsId+""+num

console.log("num",year)



              console.log(row.id)
            var stuId=row.id
                   this.$http({

                    method: 'get',
                    url:this.$getApi+'charge/findStuPlan?studentId='+stuId,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                
                    
                    const {
                        body
                    } = res
                    
                    var schoolArry=[];
                    schoolArry=localStorage.schools
                    console.log("===res===",res);

                    var periodArry=[];
                    res.body.forEach(function(item,index,array){
                            periodArry.push({
                                expense:item.expenseEntry.name,
                                periodTime:item.expenseEntry.periodType,
                                money:item.money,
                                time:item.expenseEntry.periodType,
                                remainMoney:item.remainMoney
                            })
                      });



                    this.perArry=periodArry;

                    console.log("===res===",schoolArry[0].id);
                    this.studentName=res.body[0].studentName
                    this.schoolName=localStorage.schoolName
                    this.klassName=res.body[0].klassId
                    this.period=res.body[0].expenseEntry.periodType

                  

                })



          },

            // 判断路由
      //        isTab(){
      //   if(this.$router.back(-1)==='/Newchargesplan'){
      //       console.log("Newchargesplan")
      //       console.log("Newchargesplan",this.$router.back(-1).path)
      //     // this.$refs.tabItem.style.display = 'flex';
      //   }else {
      //     // this.$refs.tabItem.style.display = 'none';
      //     console.log("没有路与")
      //   }
      // },
              dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return Moment(date*1000).format("YYYY-MM-DD ");  
            },
       

           
            message() {
                this.$message('这是一条消息提示');
            },
            payfirst(index,row){
                  // console.log("payfirst",row.),
                  this.rowId=row.id,
                  this.rowKlassId=row.klassId,
                  this.rowName=row.name
this.payfirstTag=true;

                  



            },
            handleSizeChange: function (size) {
        this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },
            putPayfirst(){
                  this.$http({
                    method: 'put',
                    url:this.$getApi+'/charge/prePay?studentId='+ this.rowId+'&klassId='+this.rowKlassId+'&money='+this.payfirstMoney,
               

                    
                      headers: {
                         // 'content-type': "multipart/form-data",
                        // 'Content-Type': 'application/json',
                                            'Authorization': 'Bearer ' + localStorage.token

                                        }
                    
                    
                }).then((res) => { // promise对象
                    console.log('======res=====',res)
                  console.log('------------------',res.body)
                        this.$message({
                      message: '成功',
                      type: 'success'
                    });
                    const {
                        body
                    } = res

                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });
            },
            getData() {                
               this.value =this.value + 1;
                this.$http({
                    method: 'get',
                    url:  this.$getApi+'management/students?klassId=' + this.value,

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
              
            handleClose(dialogName) {
                this[dialogName] = false
            },
            showDialog(path) {
                this.path = path

                this.form.name = ''
                this.form.description = ''

                this.dialogVisible = true
                this.dialogUsage = 0

            },
            handleSizeChange(val) {
                this.pagesize = val;
//        console.log(`每页 ${val} 条`);
      },
            handleCurrentChange(val) {
                this.currentPage = val
            },
            handleEdit(index, row) {

                console.log(index)
                console.log(row)

                this.dialogVisible = true
                this.dialogUsage = 1
                this.dialogIndex = index
                this.kgId = row.id;
                this.kgName = row.name;

                this.form = Object.assign({}, row)
            },
            handleDelete(index, row) {
              console.log(row)
                
                   this.$http({
                    method: 'delete',
                    url:this.$getApi+'management/students/deleteBy/' + row.id ,


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
                      this.tableData.splice(index, 1)
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






            },

    

            query(){
 
                this.$router.go(-1)
                // this.$router.push({path:'Newchargesplan'});
                this.$store.state.chack--
            },
            query1(){

                 this.$router.push({path:'interestClass'});
                this.$store.state.chack--
            },
             query2(){

                 this.$router.push({path:'refund'});
                this.$store.state.chack--
            },
            isAdd(tag) { // 0 添加    1 取消






                this.dialogVisible = false;
                console.log("=====this.value====",this.value)

                if (tag === 0 && this.dialogUsage == 0) {
                   this.$http.post(
                    this.$getApi +'management/students',
                    {
                        "name": this.form.name,
                        "gender": this.form.gender,
                        "birthday": this.form.birthday,
                        "avatar": this.form.avatar,
                        "klassId": this.value,
                        "joinedAt": this.form.joinedAt,
                     
                         "cardNo": "1000",
                          "portrait": ""
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
                     this.$message({
                      message: '成功',
                      type: 'success'
                    });
                 
                    console.log('birthday');
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });
                   this.getData();
                }

                if (tag === 0 && this.dialogUsage == 1) {
                    this.$http.put(
                     this.$getApi+'anagement/students/',
                     {
                        "description": this.form.description,
                        "name": this.form.name
                    },
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
                 this.getData();
                }
                
                this.form = {}

            },
            GisAdd(tag) { // 0 添加    1 取消
                this.GradeDialog = false

            },

            // 家长页面跳转
            
             getGuardian: function(index, row) {

                 var studentId = row.id
                 // localStorage.studentId=studentid;
                 //console.log('before.....',  this.$store.state.studentId) ;
                 this.$store.commit('assign',{id:studentId});
                 //console.log('after.....',  this.$store.state.studentId) ;
                 this.$router.push({path:'guardian'});
                 // location.reload();
                 console.log('------------------++++',studentId)
                 
            },


            //应用对象添加
         changeFun:function(val){




                 this.multipleSelection = val;
                console.log('-----------------',this.multipleSelection)

                    var newsArry=[];
                    this.multipleSelection.forEach(function(item, index, array){
                        newsArry.push({name:item.name,id:item.id,klassId:item.klassId})

                    })
                    console.log(newsArry);
                    console.log(this.multipleSelection)

                    // 有数组了
                    
                        
                        // this.$store.commit('assign',{id:studentId});
                        this.$store.commit('nameOpt',{cost:newsArry});
                        // console.log(cost)
                 





            },




    
              





            addItem() {

                this.$http({
                    method: 'post',
                    url:  this.$getApi+'management/image/add_extend',
                    params: {
                        // urls: this.checkList
                    },
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
            editGrade(index, row) {
                this.GradeDialog = true
                this.kgName = row.name
                this.newKgId = row.id


                this.$http({
                    method: 'get',
                    url:this.$getApi +'/management/'+ this.newKgId +'/grades',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                    if(!res.ok){
                        alert('err res:' + res)
                    }

                    if (!!body.length) {
                         

                        this.gradeList = body

                    } else {
                        this.gradeList = []
                    }

                })


            },
            resetGrade(index) {
                this.isResetG = true

                this.gradeList.splice(index, 1)

            },
            addGrade() {

                let _this = this
                this.$http.post(
                    this.$getApi +'/management/'+_this.newKgId+'/grades',
                    {
                        "description": this.newDescription,
                        "name": this.newGrade
                    },
                    {
                      headers:{
                       
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token

                      }
                    }
                ).then((res) =>{
                   
                    console.log("===body=000000====",res);
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




               
                this.newGrade = ''
                this.newDescription = ''
            },
            chanalue:function(){
              this.value=this.value;
         





                this.$http({
                    method: 'get',
                    url:   this.$getApi+'management/students?klassId=' + this.value,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res)

                    const {
                        body
                    } = res

                    console.log("===res students===",res.body);

                    if (!!body.length) {
                        this.tableData = body
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
        beforeMount() {
                 
        },
        mounted() {

            this.getData();
            // this.CreateOneFormPage();
        },
        beforeDestroy(){
            console.log('000000000000000000')
        },
        deactivated(){
            console.log('11111111111111111')
            // location.reload();
        
        },
        // // 组件被激活调用
        //   activated(){
        //     this.$store.state.check=true;
        //     console.log('---------',this.$store.state.check)
        // },
        // // 组件被移除调用
        // deactivated(){
        //     this.$store.state.check=false;
        //      console.log('---------',this.$store.state.check)
        // },
        // updated(){
        //      if (check) {
        //                     addNewStu:false

        //             }else{
        //                 addNewStu:true
        //             }
        // }
    }
</script>
<style scoped>
    /*#mainContent {*/
    /*width: 1000px;*/
    /*margin: 10px;*/
    /*}*/
   .queren{
    display: inline-block;
    display: none;
   }
   .chacked{
    display: none;
   }
    .picture {
        /*margin-left: -10px;*/
        width: 100%;
        height: 100%;
        padding-left: 0px;
    }

    .line1 {
        padding: 10px;
    }

    .pr {
        display: flex;
        justify-content: space-between;
        align-items: center;
        float: ;
    }

    .line1 .el-pagination {
        padding: 0;
        display: inline-block;
    }

    .imgStyle {
        display: block;
        width: 500px;
        height: auto;
        margin: 10px auto;
    }

    .preImg {
        display: block;
        width: 100px;
        height: auto;
        margin: 0 auto;
    }

    .del {
        padding: 5px;
        color: red;
        cursor: pointer;
        transition: all .3s;
    }

    .del:hover {
        background: #333;
    }

    .grade {
        padding: 4px;
        /*border: 1px solid #33cccc;*/
    }
    table{
      border: 1px solid #000;
      text-align: center;
      width: 100%;
      font-family: "宋体";
    }
    tr{
        border: 1px solid #000;
        text-align: center;
    }
    td{
        border: 1px solid #000;
        text-align: center;
        line-height: 30px;
         height: 30px;
    }
    .color{
      background-color:#8ccdf9;
      color: #fff;

    }

</style>


