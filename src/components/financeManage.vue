<template>
    <div style="width:100%">
                <div style="width:93%">
                    <!-- <MenuBarTop id="MenuBarTop" :breadcrumb="currentBreadcrumb" :TouchLeftNavStatus="Status" @isNotTouchLeft="getStatusFromTop"></MenuBarTop> -->
                        <div class="main">
                          <div style="width:100%;height:50px;margin-left:22px;">
                              <el-select v-model="value" placeholder="请选择" style="margin-top:5px;"@visible-change="test1">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>

                                  <el-date-picker
                                  v-model="value1"
                                  type="date"
                                  placeholder="选择日期">
                                </el-date-picker>
                                      <el-button type="primary" @click="searchData">查询</el-button>                  
                                      <el-button type="primary" @click='sdc'>关联</el-button>                  
                          </div>



                          <!-- 儿童出勤 -->  
                            <div style="padding-left:20px;padding-bottom:30px; border-bottom:1px solid orange;margin-top:20px;width:100%;display:none">
                                <div id="myChart11" :style="{width: '1100px', height: '400px'}"></div>
                                <div style="width:98%;">
                                      <el-table
                                :data="tableData1"
                                border
                                style="width: 100%">
                                <el-table-column
                                  prop="type"
                                  label="班级"
                                  >
                                </el-table-column>
                                <el-table-column
                                  prop="att"
                                  label="一111111月"
                                  >
                                </el-table-column>
                                <el-table-column
                                  prop="sth"
                                  label="二月">
                                </el-table-column>
                                 <el-table-column
                                  prop="sick"
                                  label="三月">
                                </el-table-column>
                                <el-table-column
                                  prop="not"
                                  label="四月">
                                </el-table-column>
                                 <el-table-column
                                  prop="attpr"
                                  label="五月">
                                </el-table-column>
                                <el-table-column
                                  prop="sthpr"
                                  label="六月">
                                </el-table-column>
                                <el-table-column
                                  prop="sickpr"
                                  label="七月">
                                </el-table-column>
                              </el-table>
                                            
                                </div>
                                        

      
                            </div> 
                             <!-- 儿童今日出勤 -->  
                         

            <!-- 园所收入 -->
                             <div style="padding-left:20px;padding-bottom:30px; border-bottom:1px solid orange;margin-top:20px;">
                                <div id="myChart51" :style="{width: '1100px', height: '400px',display:'inline-block'}"></div>
                                <div style="width:98%;">
                                      <el-table
                                :data="tableData0"
                                border
                                style="width: 100%">
                                <el-table-column
                                  prop="type"
                                  label="班级"
                                  >
                                </el-table-column>
                               <el-table-column
                                  prop="january"
                                  label="一月"
                                  >
                                </el-table-column>
                                <el-table-column
                                  prop="february"
                                  label="二月">
                                </el-table-column>
                                 <el-table-column
                                  prop="march"
                                  label="三月">
                                </el-table-column>
                                <el-table-column
                                  prop="april"
                                  label="四月">
                                </el-table-column>
                                 <el-table-column
                                  prop="may"
                                  label="五月">
                                </el-table-column>
                                <el-table-column
                                  prop="june"
                                  label="六月">
                                </el-table-column>
                                <el-table-column
                                  prop="july"
                                  label="七月">
                                </el-table-column>
                                <el-table-column
                                  prop="auguest"
                                  label="八月">
                                </el-table-column> 
                                 <el-table-column
                                  prop="september"
                                  label="九月">
                                </el-table-column>
                                <el-table-column
                                  prop="october"
                                  label="十月">
                                </el-table-column> 
                                <el-table-column
                                  prop="november"
                                  label="十一月">
                                </el-table-column>
                                <el-table-column
                                  prop="december"
                                  label="十二月">
                                </el-table-column>
                              </el-table>
                                            
                                </div>
                                        

      
                            </div>   
                            <!-- 园所支出 -->
                             <div style="padding-left:20px;padding-bottom:30px; border-bottom:1px solid orange;margin-top:20px;">
                                <div id="myChart41" :style="{width: '1100px', height: '400px',display:'inline-block'}"></div>
                                <div style="width:98%;">
                                      <el-table
                                :data="tableData1"
                                border
                                style="width: 100%">
                                <el-table-column
                                  prop="type"
                                  label="区域"
                                  >
                                </el-table-column>
                                <el-table-column
                                  prop="january"
                                  label="一月"
                                  >
                                </el-table-column>
                                <el-table-column
                                  prop="february"
                                  label="二月">
                                </el-table-column>
                                 <el-table-column
                                  prop="march"
                                  label="三月">
                                </el-table-column>
                                <el-table-column
                                  prop="april"
                                  label="四月">
                                </el-table-column>
                                 <el-table-column
                                  prop="may"
                                  label="五月">
                                </el-table-column>
                                <el-table-column
                                  prop="june"
                                  label="六月">
                                </el-table-column>
                                <el-table-column
                                  prop="july"
                                  label="七月">
                                </el-table-column>
                                <el-table-column
                                  prop="auguest"
                                  label="八月">
                                </el-table-column> 
                                 <el-table-column
                                  prop="september"
                                  label="九月">
                                </el-table-column>
                                <el-table-column
                                  prop="october"
                                  label="十月">
                                </el-table-column> 
                                <el-table-column
                                  prop="november"
                                  label="十一月">
                                </el-table-column>
                                <el-table-column
                                  prop="december"
                                  label="十二月">
                                </el-table-column>
                              </el-table>
                                            
                                </div>
                                        

      
                            </div>  



                            <div style="padding-left:20px; padding-bottom:30px;border-bottom:1px solid orange;display:none">
                                <div id="myChart01" :style="{width: '1100px', height: '400px',display:'inline-block'}"></div>
                                <div style="width:95%;">
                      <!-- 老师出勤 -->
                                <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                                <el-table-column
                                  prop="type"
                                  label="老师"
                                  >
                                </el-table-column>
                                <el-table-column
                                  prop="att"
                                  label="一月"
                                  >
                                </el-table-column>
                                <el-table-column
                                  prop="sth"
                                  label="二月">
                                </el-table-column>
                                 <el-table-column
                                  prop="sick"
                                  label="三月">
                                </el-table-column>
                                <el-table-column
                                  prop="not"
                                  label="四月">
                                </el-table-column>
                                 <el-table-column
                                  prop="attpr"
                                  label="五月">
                                </el-table-column>
                                <el-table-column
                                  prop="sthpr"
                                  label="六月">
                                </el-table-column>
                                <el-table-column
                                  prop="sickpr"
                                  label="七月">
                                </el-table-column>
                              </el-table>
                                            
                                </div>
                                        
        

                            </div>  
                  
                  <!-- 收支 -->
                           <div style="padding-left:20px; padding-bottom:30px;border-bottom:1px solid orange;margin-top:20px;">
                                <div id="myChart21" :style="{width: '1100px', height: '400px',display:'inline-block'}"></div>
                                <div style="width:95%;">
                                <el-table
                                :data="tableData2"
                                border
                                style="width: 100%">
                                <el-table-column
                                  prop="type"
                                  label="类别"
                                  >
                                </el-table-column>
                                <el-table-column
                                  prop="att"
                                  label="一月"
                                  >
                                </el-table-column>
                                <el-table-column
                                  prop="sth"
                                  label="二月">
                                </el-table-column>
                                 <el-table-column
                                  prop="sick"
                                  label="三月">
                                </el-table-column>
                                <el-table-column
                                  prop="not"
                                  label="四月">
                                </el-table-column>
                                 <el-table-column
                                  prop="attpr"
                                  label="五月">
                                </el-table-column>
                                <el-table-column
                                  prop="sthpr"
                                  label="六月">
                                </el-table-column>
                                <el-table-column
                                  prop="sickpr"
                                  label="七月">
                                </el-table-column>
                              </el-table>
                                            
                                </div>
                                        


                            </div>  



<!-- 招生率 -->
                         <div style="padding-left:20px; padding-bottom:30px;border-bottom:1px solid orange;margin-top:20px;display:none">
                                <div id="myChart31" :style="{width: '1100px', height: '400px',display:'inline-block'}"></div>
                                <div style="width:98%">
                                <el-table
                                :data="tableData3"
                                border
                                style="width: 100%">
                                <el-table-column
                                  prop="type"
                                  label="类别"
                                  >
                                </el-table-column>
                                <el-table-column
                                  prop="att"
                                  label="奇思班"
                                  >
                                </el-table-column>
                                <el-table-column
                                  prop="sth"
                                  label="奇想班">
                                </el-table-column>
                                 <el-table-column
                                  prop="sick"
                                  label="奇慧班">
                                </el-table-column>
                                <el-table-column
                                  prop="not"
                                  label="知一班">
                                </el-table-column>
                                 <el-table-column
                                  prop="attpr"
                                  label="知二班">
                                </el-table-column>
                                <el-table-column
                                  prop="sthpr"
                                  label="知三班">
                                </el-table-column>
                                <el-table-column
                                  prop="sickpr"
                                  label="知四班">
                                </el-table-column>
                              </el-table>




                              <el-dialog
                                 
                                  :visible.sync="dialogVisible"
                                  width="600px"
                                  :before-close="handleClose">
                                      <div class="top">
                                       <span class="top_text">关联地区</span>
                                       <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                                         <img src="../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
                                       </div>
                                       
                                    </div>
                                <div style="padding-left:150px;">
                                  请输入关联code <el-input v-model="input" placeholder="请输入code" style='width:200px'></el-input>
                                </div>
                                  <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="linked">确 定</el-button>
                                  </span>
                                </el-dialog>
                                 <el-dialog
                                 
                                  :visible.sync="dialogVisible1"
                                  width="600px"
                                  :before-close="handleClose">
                                      <div class="top">
                                       <span class="top_text">添加节点</span>
                                       <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                                         <img src="../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible1 = false">
                                       </div>
                                       
                                    </div>
                                <div style="padding-left:150px;">
                                  请输入名字 <el-input v-model="input" placeholder="请输入名字" style='width:200px'></el-input>
                                </div>
                                  <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible1 = false">取 消</el-button>
                                    <el-button type="primary" @click="addChril">确 定</el-button>
                                  </span>
                                </el-dialog>   
                                <el-dialog
                                 
                                  :visible.sync="dialogVisible2"
                                  width="600px"
                                  :before-close="handleClose">
                                      <div class="top">
                                       <span class="top_text">删除节点</span>
                                       <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                                         <img src="../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible1 = false">
                                       </div>
                                       
                                    </div>
                                <div style="padding-left:150px;">
                                  请输入名字 <el-input v-model="input" placeholder="请输入名字" style='width:200px'></el-input>
                                </div>
                                  <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible2 = false">取 消</el-button>
                                    <el-button type="primary" @click="delete1">确 定</el-button>
                                  </span>
                                </el-dialog>
                                            
                                </div>
                                        


                            </div>
                            
                            

                            <!--  <div id="myChart1" :style="{width: '48%', height: '400px',display:'inline-block'}"></div>
                             <div id="myChart2" :style="{width: '48%', height: '400px',display:'inline-block'}"></div> -->
                        </div>
                </div>
            
           <div class="left">
             <div class="title_box">
    <!--   <router-link :to="{path:'/'}">
        <img class="logo" src="../assets/logo.png" alt="logo" style="width:185px">
      </router-link> -->
    </div>
       <!-- q -->





    
           </div>
         <!--   <div class="right"> 
               123
           </div> -->
       
    </div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
        // 引入柱状图组件
        require('echarts/lib/chart/pie')
        require('echarts/lib/chart/bar')
        require('echarts/lib/chart/line')
        // 引入提示框和title组件
        require('echarts/lib/component/tooltip')
        require('echarts/lib/component/title')

import MenuBarTop from './MenuBarTop.vue';
    export default {
        data(){
            return {
                  data: [], 
              defaultProps: {
                children: 'children',
                label: 'label'
              },
                 currentBreadcrumb: '',
                Status: '',
                tableData:[{
                  type:'老师1',
                  att:'80%',
                  sth:'100%',
                  sick:'100%',
                  not:'100%',
                  attpr:'70%',
                  sthpr:'10%',
                  sickpr:'10%',
                },{
                  type:'老师2',
                  att:'80%',
                  tt:'80%',
                  sth:'100%',
                  sick:'100%',
                  not:'100%',
                  attpr:'70%',
                  sthpr:'10%',
                  sickpr:'10%',
                },{
                  type:'老师3',
                  att:'80%',
                  tt:'80%',
                  sth:'100%',
                  sick:'100%',
                  not:'100%',
                  attpr:'70%',
                  sthpr:'10%',
                  sickpr:'10%',
                },{
                  type:'老师4',
                  att:'80%',
                  tt:'80%',
                  sth:'100%',
                  sick:'100%',
                  not:'100%',
                  attpr:'70%',
                  sthpr:'10%',
                  sickpr:'10%',
                },{
                  type:'老师5',
                  att:'80%',
                 tt:'80%',
                  sth:'100%',
                  sick:'100%',
                  not:'100%',
                  attpr:'70%',
                  sthpr:'10%',
                  sickpr:'10%',
                },],

              tableData1:[{
                  type:'奇思班',
                  att:'80%',
                 tt:'80%',
                  sth:'100%',
                  sick:'100%',
                  not:'100%',
                  attpr:'70%',
                  sthpr:'10%',
                  sickpr:'10%',
                },{
                  type:'奇想班',
                  att:'80%',
                  tt:'80%',
                  sth:'100%',
                  sick:'100%',
                  not:'100%',
                  attpr:'70%',
                  sthpr:'10%',
                  sickpr:'10%',
                },{
                  type:'奇慧班',
                  att:'80%',
                 tt:'80%',
                  sth:'100%',
                  sick:'100%',
                  not:'100%',
                  attpr:'70%',
                  sthpr:'10%',
                  sickpr:'10%',
                },{
                  type:'知一班',
                  att:'80%',
                  tt:'80%',
                  sth:'100%',
                  sick:'100%',
                  not:'100%',
                  attpr:'70%',
                  sthpr:'10%',
                  sickpr:'10%',
                },{
                  type:'知二班',
                  att:'80%',
                  tt:'80%',
                  sth:'100%',
                  sick:'100%',
                  not:'100%',
                  attpr:'70%',
                  sthpr:'10%',
                  sickpr:'10%',
                },], 
              tableData01:[{
                  type:'奇思班',
                  att:'80',
                 tt:'0',
                  sth:'0',
                  sick:'0',
                  not:'0',
                  attpr:'100%',
                  sthpr:'0%',
                  sickpr:'0%',
                  notget:'0%'
                },{
                  type:'奇想班',
                  att:'30',
                 tt:'0',
                  sth:'0',
                  sick:'0',
                  not:'0',
                  attpr:'100%',
                  sthpr:'0%',
                  sickpr:'0%',
                  notget:'0%'
                },{
                  type:'奇慧班',
                  att:'50',
                 tt:'0',
                  sth:'0',
                  sick:'0',
                  not:'0',
                  attpr:'100%',
                  sthpr:'0%',
                  sickpr:'0%',
                  notget:'0%'
                },{
                  type:'知一班',
                  att:'40',
                 tt:'0',
                  sth:'0',
                  sick:'0',
                  not:'0',
                  attpr:'100%',
                  sthpr:'0%',
                  sickpr:'0%',
                  notget:'0%'
                },], 


                tableData0:[{
                  type:'奇思班',
                  att:'8000',
                 tt:'8000',
                  sth:'10000',
                  sick:'1000',
                  not:'1000',
                  attpr:'7000',
                  sthpr:'1000',
                  sickpr:'1000',
                },{
                  type:'奇想班',
                 att:'8000',
                 tt:'8000',
                  sth:'10000',
                  sick:'1000',
                  not:'1000',
                  attpr:'7000',
                  sthpr:'1000',
                  sickpr:'1000',
                },{
                  type:'奇慧班',
                 att:'8000',
                 tt:'8000',
                  sth:'10000',
                  sick:'1000',
                  not:'1000',
                  attpr:'7000',
                  sthpr:'1000',
                  sickpr:'1000',
                },{
                  type:'知一班',
                 att:'8000',
                 tt:'8000',
                  sth:'10000',
                  sick:'1000',
                  not:'1000',
                  attpr:'7000',
                  sthpr:'1000',
                  sickpr:'1000',
                },{
                  type:'知二班',
                  att:'8000',
                 tt:'8000',
                  sth:'10000',
                  sick:'1000',
                  not:'1000',
                  attpr:'7000',
                  sthpr:'1000',
                  sickpr:'1000',
                },], 

              tableData2:[{
                  type:'收入',
                  att:'20000',
                 tt:'30000',
                  sth:'50000',
                  sick:'10000',
                  not:'1000',
                  attpr:'70000',
                  sthpr:'10000',
                  sickpr:'10000',
                },{
                  type:'支出',
                  att:'8000',
                  tt:'8000',
                  sth:'1000',
                  sick:'1000',
                  not:'1000',
                  attpr:'7000',
                  sthpr:'1000',
                  sickpr:'15000',
                },{
                  type:'合计',
                  att:'12000',
                 tt:'22000',
                  sth:'49000',
                  sick:'9000',
                  not:'9000',
                  attpr:'63000',
                  sthpr:'9000',
                  sickpr:'-5000',
                },], 

                tableData3:[{
                  type:'人数',
                  att:'200',
                 tt:'300',
                  sth:'500',
                  sick:'100',
                  not:'100',
                  attpr:'700',
                  sthpr:'100',
                  sickpr:'100',
                },{
                  type:'本月招生率',
                  att:'12%',
                 tt:'22%',
                  sth:'49%',
                  sick:'90%',
                  not:'90%',
                  attpr:'63%',
                  sthpr:'90%',
                  sickpr:'50%',
                },],





                options: [],
                  value: '',
                  dialogVisible:false,
                  dialogVisible1:false,
                  dialogVisible2:false,
                  nameArry:[],
                  countArry:[],
                  nameArry1:[],
                  countArry1:[],
                  code:'',
                 
          
       
            }
        },
          components: { //2、暴露
           
              MenuBarTop,
            },
        methods:{
          sdc(msg){

              console.log('财务  code',msg)
                // 收入 根据code 获取区域
                   this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findIncomeByDistrict?code='+msg,
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res
                     var a=body.income
                                          var nameArry=[]
                     a.forEach(function(item, index, array){
                          nameArry.push(item.citys.name)
                       
                    })   
                    var countArry=[];

                     body.income.forEach(function(item, index, array){
                          countArry.push(item.count)
                       
                    })

                     var tableData=[];
                    
                     a.forEach(function(item, index, array){
                          tableData.push({
                            type:item.citys.name,
                            january:item.january*1,
                             february:item.february*1,
                             march:item.march*1,
                             april:item.april*1,
                             may:item.may*1,
                             june:item.june*1,
                             july:item.july*1,
                             auguest:item.auguest*1,
                             september:item.september*1,
                             october:item.october*1,
                             november:item.november*1,
                             december:item.december*1,
                          }
                            
                            )
                       
                    })




                     console.log('res  区域收入', res)

                     this.tableData0=tableData
                     this.nameArry=nameArry
                     this.countArry=countArry
                     console.log(nameArry)
                 this.drawLine51();
                   
                    console.log('res  区域收入', res)
                   
                

                }) 
                 // 支出 根据code 获取区域
                    this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findPayoutByDistrict?code='+msg,
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 区域支出', res)
                   
                

                }) 
          },
          searchData(){
              var str=this.code
              if ((str.substr(0, 1)) == "P") {
                      console.log('province')
                      //  this.actorTypes="province"
                        this.getProvince1();
                        this.getOutProvince1();
                  

                         console.log('code============city');
                     }else  if((str.substr(0, 1)) == "C"){
                        console.log('code============city');
                        // this.actorTypes="citys"
                        this.getCity1();
                        this.getOutCity1();
               

                    }else  if((str.substr(0, 1)) == "Q"){
                        console.log('code============city');
                        // this.actorTypes="citys"
                     this.getRegion1();
                     this.getOutRegion1();
                  
                    }
          },
          test1(){
             var optArray = this.$store.state.optarray
             var areaID = this.$store.state.areaid
              console.log("store log is:",optArray)

              this.code=areaID
              console.log("store log is:",areaID)
              this.options=optArray
          },
          handleNodeClick(data){
            console.log(data);
          },
          // 删除
          // 
          delete1(){

          },
      
       
     



      
           renderContent(createElement, { node, data, store }) {
            console.log('1111111111',this)
            var that=this
        return createElement(

                'span',
                {
                    style:{
                        'flex':'1',
                        'display':'flex',
                        'align-items':'center',
                        'justify-content':'space-between',
                        'font-size':'14px',
                        'padding-right':'8px'
                    }
                },
                [
                    createElement(
                            'span',
                            {},
                            [
                                createElement('span',node.label)
                            ]
                    ),
                    createElement(
                            'span',
                            {},
                            [
                      
                          
                                createElement('i',
                                        {
                                            style:{
                                                'font-size':' 18px',
                                                // "margin-right":"100px",
                                                // "text-align":"left"
                                            },
                                            class: "el-icon-share",
                                            attrs:{
                                                // 'type':'text'
                                            },
                                            on:{
                                                click:function(){
                                                    // vue.menuEdit(node,data,store);
                                                    console.log(node,data,store,)
                                             
                                                    that.dialogVisible=true
                                                }
                                            },
                                           
                                        }
                                ),
                                createElement('i',
                                        {
                                            style:{
                                                'font-size':' 18px',
                                                // "margin-right":"100px",
                                                // "text-align":"left"
                                            },
                                            class: "el-icon-circle-plus",
                                            attrs:{
                                                // 'type':'text'
                                            },
                                            on:{
                                                click:function(){
                                                    // vue.menuEdit(node,data,store);
                                                    console.log(node,data,store,)
                                             
                                                    that.dialogVisible1=true
                                                }
                                            },
                                           
                                        }
                                ), 

                               createElement('i',{
                                            style:{
                                                'font-size':' 18px',
                                                "margin-right":"100px",
                                                // "text-align":"left"
                                            },
                                            class: "el-icon-delete",
                                            attrs:{
                                                // 'type':'text'
                                            },
                                            on:{
                                                click:function(){
                                                    // vue.menuEdit(node,data,store);
                                                    console.log(node,data,store,)
                                                    var a=data.label;
                                                    if (/\w+\[\u96c6][\u56e2]\w+/(a)) {
                                                      console.log('222222222222222')
                                                    }
                                                   
                                                    that.dialogVisible2=true
                                                }
                                            },
                                           
                                        }),  
                        
                            ]
                    )
                ]
        );
    },
          one(){
            console.log(this.label)
          },
            handleNodeClick(data) {
              console.log(data);
            },
                handleOpen(key, keyPath) {
                        console.log(key, keyPath);
                        console.log(key, keyPath,index);

                      },
                handleClose(key, keyPath) {
                        console.log(key, keyPath);
                      },
                getStatusFromTop(params) {
                    console.log(params);
                    this.Status = params
                  },
                test(e){
                    console.log(e)
                  },
                handleSelect(key, keyPath) {
                        console.log(key, keyPath);
                      },
                drawLine01() {
                      console.log('sssssssss',this.chartarry);





                      let myChart01 = echarts.init(document.getElementById('myChart01'))
                      console.log('0000000000',)
                    
               var option = {
                                            title: {
                                                text: '老师出勤'
                                            },
                                            tooltip: {
                                                trigger: 'axis'
                                            },
                                          
                                            grid: {
                                                left: '3%',
                                                right: '4%',
                                                bottom: '3%',
                                                containLabel: true
                                            },
                                            toolbox: {
                                                feature: {
                                                    saveAsImage: {}
                                                }
                                            },
                                            xAxis: {
                                                type: 'category',
                                                boundaryGap: false,
                                                data: ['一月','二月','三月','四月','五月','六月','七月']
                                            },
                                            yAxis: {
                                                type: 'value'
                                            },
                                            series: [
                                                {
                                                    name:'老师1',
                                                    type:'line',
                                                    stack: '总量',
                                                    data:[120, 132, 101, 134, 90, 230, 210]
                                                },
                                                {
                                                    name:'老师2',
                                                    type:'line',
                                                    stack: '总量',
                                                    data:[220, 182, 191, 234, 290, 330, 310]
                                                },
                                                {
                                                    name:'老师3',
                                                    type:'line',
                                                    stack: '总量',
                                                    data:[150, 232, 201, 154, 190, 330, 410]
                                                },
                                                {
                                                    name:'老师4',
                                                    type:'line',
                                                    stack: '总量',
                                                    data:[320, 332, 301, 334, 390, 330, 320]
                                                },
                                                {
                                                    name:'老师5',
                                                    type:'line',
                                                    stack: '总量',
                                                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                                                }
                                            ]
                                        };


                      myChart01.setOption(option);
                        },
                drawLine11() {
                          console.log('sssssssss',this.chartarry);





                          let myChart11 = echarts.init(document.getElementById('myChart11'))
                          console.log('0000000000',)
                        
                           var option = {
                                            title: {
                                                text: '儿童出勤'
                                            },
                                            tooltip: {
                                                trigger: 'axis'
                                            },
                                          
                                            grid: {
                                                left: '3%',
                                                right: '4%',
                                                bottom: '3%',
                                                containLabel: true
                                            },
                                            toolbox: {
                                                feature: {
                                                    saveAsImage: {}
                                                }
                                            },
                                            xAxis: {
                                                type: 'category',
                                                boundaryGap: false,
                                                data: ['一月','二月','三月','四月','五月','六月','七月']
                                            },
                                            yAxis: {
                                                type: 'value'
                                            },
                                            series: [
                                                {
                                                    name:'奇思班',
                                                    type:'line',
                                                    stack: '总量',
                                                    data:[120, 132, 101, 134, 90, 230, 210]
                                                },
                                                {
                                                    name:'奇想班',
                                                    type:'line',
                                                    stack: '总量',
                                                    data:[220, 182, 191, 234, 290, 330, 310]
                                                },
                                                {
                                                    name:'奇慧班',
                                                    type:'line',
                                                    stack: '总量',
                                                    data:[150, 232, 201, 154, 190, 330, 410]
                                                },
                                                {
                                                    name:'知一班',
                                                    type:'line',
                                                    stack: '总量',
                                                    data:[320, 332, 301, 334, 390, 330, 320]
                                                },
                                                {
                                                    name:'知二班',
                                                    type:'line',
                                                    stack: '总量',
                                                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                                                }
                                            ]
                                        };



                          myChart11.setOption(option);
                            },   


                              drawLine51() {
                          console.log('sssssssss',this.chartarry);





                          let myChart51 = echarts.init(document.getElementById('myChart51'))
                          console.log('0000000000',)
                        
                           var option = {
                             title: {
                                          text: '园所收入'
                                            },
                              xAxis: {
                                  type: 'category',
                                  data: this.nameArry
                              },
                              yAxis: {
                                  type: 'value'
                              },
                              series: [{
                                  data: this.countArry,
                                  type: 'bar',
                                    itemStyle: {
                                        color: '#9fdabf'
                                    },
                                     barWidth : 30,
                              }]
                          };



                          myChart51.setOption(option);
                            },   
                              drawLine41() {
                          console.log('sssssssss',this.chartarry);




                      let myChart41 = echarts.init(document.getElementById('myChart41'))
                          console.log('0000000000',)
                        
                           var option = {
                             title: {
                                          text: '园所支出'
                                            },
                              xAxis: {
                                  type: 'category',
                                  data: this.nameArry1
                              },
                              yAxis: {
                                  type: 'value'
                              },
                              series: [{
                                  data: this.countArry1,
                                  type: 'bar',
                                    itemStyle: {
                                        color: '#9fdabf'
                                    },
                                     barWidth : 30,
                              }]
                          };



                          myChart41.setOption(option);
                            },
                drawLine21() {
                      console.log('sssssssss',this.chartarry);





                      let myChart21 = echarts.init(document.getElementById('myChart21'))
                      console.log('0000000000',)
                    
                       var option = {
                               title: {
                                                text: '营收状况'
                                     },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    crossStyle: {
                                        color: 'red'
                                    }
                                }
                            },
                            toolbox: {
                                feature: {
                                    dataView: {show: true, readOnly: false},
                                    magicType: {show: true, type: ['line', 'bar']},
                                    restore: {show: true},
                                    saveAsImage: {show: true}
                                }
                            },
                            legend: {
                                data:['收入','支出','利润']
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                                    axisPointer: {
                                        type: 'shadow'
                                    }
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '数据',
                                    min: 0,
                                    max: 250000,
                                    interval: 50000,
                                    axisLabel: {
                                        formatter: '{value} 人'
                                    },
                                      itemStyle: {
                                        color: '#c23531'
                                    }
                                },
                                {
                                    
                              
                                    interval: 5000,
                                  
                                }
                            ],
                            series: [
                                {
                                    name:'收入',
                                    type:'bar',
                                    data:[20000, 40009, 70000, 23200, 25600, 76700, 135600, 162200, 32600, 20000, 64000, 33000],
                                    itemStyle: {
                                        color: '#d48265'
                                    }
                                },
                                {
                                    name:'支出',
                                    type:'bar',
                                    data:[12000, 34000, 57000, 12300, 12560, 47670, 100500, 86200, 2260, 10000, 56405, 23005],
                                    itemStyle: {
                                        color: '#9fdabf'
                                    }

                                },
                                {
                                    name:'利润',
                                    type:'line',
                                    yAxisIndex: 1,
                                    data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
                                    itemStyle: {
                                        color: '#61a0a8'
                                    }
                                    
                                }
                            ]
                        };



                      myChart21.setOption(option);
                        }, 
                       drawLine31() {
                      console.log('sssssssss',this.chartarry);





                      let myChart31 = echarts.init(document.getElementById('myChart31'))
                      console.log('0000000000',)
                    
                       var option = {
                               title: {
                                                text: '本月招生率'
                                     },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    crossStyle: {
                                        color: 'red'
                                    }
                                }
                            },
                            toolbox: {
                                feature: {
                                    dataView: {show: true, readOnly: false},
                                    magicType: {show: true, type: ['line', 'bar']},
                                    restore: {show: true},
                                    saveAsImage: {show: true}
                                }
                            },
                            legend: {
                                data:['人数','招生率']
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: ['奇想班','奇慧班','奇思班','知一班','知二班','知三班','知四班'],
                                    axisPointer: {
                                        type: 'shadow'
                                    }
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '数据',
                                    min: 0,
                                    max: 25000,
                                    interval: 5000,
                                    axisLabel: {
                                        formatter: '{value} 人'
                                    },
                                      itemStyle: {
                                        color: '#c23531'
                                    },

                                },
                                {
                                    
                              
                                    interval: 5000,
                                  
                                }
                            ],
                            series: [
                                {
                                    name:'人数',
                                    type:'bar',
                                    data:[2000, 4009, 7000, 2320, 2560, 7670, 13560],
                                    itemStyle: {
                                        color: '#d48265'
                                    },
                                    barWidth : 30,
                                },
                              
                                {
                                    name:'招生率',
                                    type:'line',
                                    yAxisIndex: 1,
                                    data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3],
                                    itemStyle: {
                                        color: '#61a0a8'
                                    }
                                    
                                }
                            ]
                        };



                      myChart31.setOption(option);
                        },
                        draw(){
                          this.drawLine01();
                          this.drawLine11();
                          this.drawLine21();
                          this.drawLine31();
                          this.drawLine41();
                          this.drawLine51();
                        },
                           // city
              getCity(){


                this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findIncomeCitys',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 获取城市数据', res)
                    console.log('res', body.count)
                    var nameArry=[]
                     body.count.forEach(function(item, index, array){
                          nameArry.push(item.school.name)
                       
                    })   
                    var countArry=[];

                     body.count.forEach(function(item, index, array){
                          countArry.push(item.count)
                       
                    })

                     var tableData=[];

                     body.count.forEach(function(item, index, array){
                          tableData.push({
                            type:item.school.name,
                            january:item.january*1,
                             february:item.february*1,
                             march:item.march*1,
                             april:item.april*1,
                             may:item.may*1,
                             june:item.june*1,
                             july:item.july*1,
                             auguest:item.auguest*1,
                             september:item.september*1,
                             october:item.october*1,
                             november:item.november*1,
                             december:item.december*1,
                          }
                            
                            )
                       
                    })






                     this.tableData0=tableData
                     this.nameArry=nameArry
                     this.countArry=countArry
                     console.log(nameArry)
                 this.drawLine51();

                })  
                



              },   getCity1(){


                this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findIncomeCitys?cityId='+ this.value,
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 获取城市数据', res)
                    console.log('res', body.count)
                    var nameArry=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',]
                    //  body.count.forEach(function(item, index, array){
                    //       nameArry.push(item.school.name)
                       
                    // })   
                    var countArry=[];

               

                     var tableData=[];
                     var tableData111=[];

                        var a=body.count
                          tableData.push(a.january*1,a.february*1,a.march*1,a.april*1,a.may*1,body.count.june*1,a.july*1,a.auguest*1,a.september*1,a.october*1,a.november*1,a.december*1,)

                      var a=body.count
                          tableData111.push({
                            type:a.school.name,
                            january:a.january*1,
                            february:a.february*1,
                            march:a.march*1,
                            april:a.april*1,
                            may:a.may*1,
                            june:body.count.june*1,
                            july:a.july*1,
                            auguest:a.auguest*1,
                            september:a.september*1,
                            october:a.october*1,
                            november:a.november*1,
                            december:a.december*1})
                       
                 





                     this.tableData0=tableData111
                     this.nameArry1=nameArry
                     this.countArry1=tableData
                     console.log(nameArry)
                 this.drawLine51();

                })  
                



              },
              // 市支出

              getOutCity(){


                this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findPayoutCitys',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 获取城市数据', res)
                    console.log('res', body.count)
                    var nameArry=[]
                     body.count.forEach(function(item, index, array){
                          nameArry.push(item.school.name)
                       
                    })   
                    var countArry=[];

                     body.count.forEach(function(item, index, array){
                          countArry.push(item.count)
                       
                    })

                    var tableData=[];





                     body.count.forEach(function(item, index, array){
                          tableData.push({
                            type:item.school.name,
                            january:item.january*1,
                             february:item.february*1,
                             march:item.march*1,
                             april:item.april*1,
                             may:item.may*1,
                             june:item.june*1,
                             july:item.july*1,
                             auguest:item.auguest*1,
                             september:item.september*1,
                             october:item.october*1,
                             november:item.november*1,
                             december:item.december*1,
                          }
                            
                            )
                       
                    })






                     this.tableData1=tableData
                     this.nameArry1=nameArry
                     this.countArry1=countArry
                     console.log(nameArry)
                 this.drawLine41();

                })  
                



              },   getOutCity1(){


                this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findPayoutCitys?cityId='+this.value,
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 获取城市数据', res)
                    console.log('res', body.count)
                   var nameArry=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',]  
                
              

                     var tableData=[];

                   var tableData111=[];

                      var a=body.count
                          tableData.push(a.january*1,a.february*1,a.march*1,a.april*1,a.may*1,body.count.june*1,a.july*1,a.auguest*1,a.september*1,a.october*1,a.november*1,a.december*1,)





                     this.tableData1=
                     this.nameArry1=nameArry
                     this.countArry1=countArry
                     console.log(nameArry)
                 this.drawLine41();

                })  
                



              },           
                             // group
              getGroup(){


            
                this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findIncomeGroups'+ this.value,
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 获取城市数据', res)
                    console.log('res', body.count)
                    var nameArry=[]
                     body.count.forEach(function(item, index, array){
                          nameArry.push(item.regions.name)
                       
                    })   
                    var countArry=[];

                     body.count.forEach(function(item, index, array){
                          countArry.push(item.count)
                       
                    })

                         var tableData=[];

                     body.count.forEach(function(item, index, array){
                          tableData.push({
                            type:item.regions.name,
                            january:item.january*1,
                             february:item.february*1,
                             march:item.march*1,
                             april:item.april*1,
                             may:item.may*1,
                             june:item.june*1,
                             july:item.july*1,
                             auguest:item.auguest*1,
                             september:item.september*1,
                             october:item.october*1,
                             november:item.november*1,
                             december:item.december*1,
                          }
                            
                            )
                       
                    })






                     this.tableData0=tableData
                     this.nameArry=nameArry
                     this.countArry=countArry
                     console.log(nameArry)
                 this.drawLine51();

                })
                



              },         getGroup1(){


            
                this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findIncomeGroups?groupId='+ this.value,
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 获取城市数据1111', res)
                    console.log('res', body.count)
                   var nameArry=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',]  
              

                     var tableData=[];
                       tableData.push(body.count.january*1,body.count.february*1,body.count.march*1,body.count.april*1,body.count.may*1,body.count.june*1,body.count.july*1,body.count.auguest*1,body.count.september*1,body.count.october*1,body.count.november*1,body.count.december*1,)





                     this.tableData1=
                     this.nameArry=nameArry
                     this.countArry=tableData
                     console.log(nameArry)
                 this.drawLine51();

                })
                



              },  
              // 集团支出
              getOutGroup(){


            
                this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findPayoutGroups',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 获取城市数据 out ', res)
                    console.log('res', body.count)
                    var nameArry=[]
                     body.count.forEach(function(item, index, array){
                          nameArry.push(item.regions.name)
                       
                    })   
                    var countArry=[];

                     body.count.forEach(function(item, index, array){
                          countArry.push(item.count)
                       
                    })

                    
                    var tableData=[];

                     body.count.forEach(function(item, index, array){
                          tableData.push({
                            type:item.regions.name,
                            january:item.january*1,
                             february:item.february*1,
                             march:item.march*1,
                             april:item.april*1,
                             may:item.may*1,
                             june:item.june*1,
                             july:item.july*1,
                             auguest:item.auguest*1,
                             september:item.september*1,
                             october:item.october*1,
                             november:item.november*1,
                             december:item.december*1,
                          }
                            
                            )
                       
                    })






                     this.tableData1=tableData
                     this.nameArry1=nameArry
                     this.countArry1=countArry
                     console.log(nameArry)
                 this.drawLine41();

                })
                



              },
              getOutGroup1(){


            
                this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findPayoutGroups?groupId='+ this.value,
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 获取城市数据1111', res)
                    console.log('res', body.count)
                   var nameArry=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',]  
              

                  

                     var tableData=[];
                       tableData.push(body.count.january*1,body.count.february*1,body.count.march*1,body.count.april*1,body.count.may*1,body.count.june*1,body.count.july*1,body.count.auguest*1,body.count.september*1,body.count.october*1,body.count.november*1,body.count.december*1,)





                     this.tableData1=
                     this.nameArry1=nameArry
                     this.countArry1=tableData
                     console.log(nameArry)
                 this.drawLine41();

                })
                



              },
              // Provinces
              getProvince(){


              
                this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findIncomeProvince'+ this.value,
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 获取城市数据', res)
                    console.log('res', body.count)
                    var nameArry=[]
                     body.count.forEach(function(item, index, array){
                          nameArry.push(item.citys.name)
                       
                    })   
                    var countArry=[];

                     body.count.forEach(function(item, index, array){
                          countArry.push(item.count)
                       
                    })

                       var tableData=[];

                     body.count.forEach(function(item, index, array){
                          tableData.push({
                            type:item.citys.name,
                            january:item.january*1,
                             february:item.february*1,
                             march:item.march*1,
                             april:item.april*1,
                             may:item.may*1,
                             june:item.june*1,
                             july:item.july*1,
                             auguest:item.auguest*1,
                             september:item.september*1,
                             october:item.october*1,
                             november:item.november*1,
                             december:item.december*1,
                          }
                            
                            )
                       
                    })






                     this.tableData0=tableData
                     this.nameArry=nameArry
                     this.countArry=countArry
                     console.log(nameArry)
                 this.drawLine51();

                })



              },   getProvince1(){


              
                this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findIncomeProvince?provinceId='+ this.value,
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 获取城市数据11111', res)
                    console.log('res', body.count)
                   var nameArry=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',]   
                    var countArry=[];

                    //  body.count.forEach(function(item, index, array){
                    //       countArry.push(item.count)
                       
                    // })

                     var tableData=[];

                     tableData.push(body.count.january*1,body.count.february*1,body.count.march*1,body.count.april*1,body.count.may*1,body.count.june*1,body.count.july*1,body.count.auguest*1,body.count.september*1,body.count.october*1,body.count.november*1,body.count.december*1,)
                     
                      var tableData111=[]
                      var a=body.count
                          tableData111.push({
                            type:a.provinces.name,
                            january:a.january*1,
                            february:a.february*1,
                            march:a.march*1,
                            april:a.april*1,
                            may:a.may*1,
                            june:body.count.june*1,
                            july:a.july*1,
                            auguest:a.auguest*1,
                            september:a.september*1,
                            october:a.october*1,
                            november:a.november*1,
                            december:a.december*1})
                       
                 





                     this.tableData0=tableData111





                     this.nameArry=nameArry
                     this.countArry=tableData
                     console.log(nameArry)
                 this.drawLine51();

                })



              }, 
              getOutProvince(){


              
                this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findPayoutProvince',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 获取城市数据', res)
                    console.log('res', body.count)
                    var nameArry=[]
                     body.count.forEach(function(item, index, array){
                          nameArry.push(item.citys.name)
                       
                    })   
                    var countArry=[];

                     body.count.forEach(function(item, index, array){
                          countArry.push(item.count)
                       
                    })

                     var tableData=[];

                     body.count.forEach(function(item, index, array){
                          tableData.push({
                            type:item.citys.name,
                            january:item.january*1,
                             february:item.february*1,
                             march:item.march*1,
                             april:item.april*1,
                             may:item.may*1,
                             june:item.june*1,
                             july:item.july*1,
                             auguest:item.auguest*1,
                             september:item.september*1,
                             october:item.october*1,
                             november:item.november*1,
                             december:item.december*1,
                          }
                            
                            )
                       
                    })






                     this.tableData1=tableData
                     this.nameArry1=nameArry
                     this.countArry1=countArry
                     console.log(nameArry)
                 this.drawLine41();

                })



              }, getOutProvince1(){


              
                this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findPayoutProvince?provinceId='+ this.value,
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 获取城市数据11111', res)
                    console.log('res', body.count)
                   var nameArry=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',]   
                    var countArry=[];


                      var a=body.count
                          
               

                     var tableData=[];

                    tableData.push(a.january*1,a.february*1,a.march*1,a.april*1,a.may*1,body.count.june*1,a.july*1,a.auguest*1,a.september*1,a.october*1,a.november*1,a.december*1,)

                    var tableData111=[]
                      var a=body.count
                          tableData111.push({
                            type:a.provinces.name, //支出 name是当前方法名
                            january:a.january*1,
                            february:a.february*1,
                            march:a.march*1,
                            april:a.april*1,
                            may:a.may*1,
                            june:body.count.june*1,
                            july:a.july*1,
                            auguest:a.auguest*1,
                            september:a.september*1,
                            october:a.october*1,
                            november:a.november*1,
                            december:a.december*1})
                       
                 





                     this.tableData1=tableData111



                     
                     this.nameArry1=nameArry
                     this.countArry1=tableData
                     console.log(nameArry)
                 this.drawLine41();

                })



              },
              // Regions
              getRegion(){


            
                this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findIncomeRegions'+ this.value,
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 获取城市数据', res)
                    console.log('res', body.count)
                    var nameArry=[]
                     body.count.forEach(function(item, index, array){
                          nameArry.push(item.province.name)
                       
                    })   
                    var countArry=[];

                     body.count.forEach(function(item, index, array){
                          countArry.push(item.count)
                       
                    })

                        var tableData=[];

                     body.count.forEach(function(item, index, array){
                          tableData.push({
                            type:item.province.name,
                            january:item.january*1,
                             february:item.february*1,
                             march:item.march*1,
                             april:item.april*1,
                             may:item.may*1,
                             june:item.june*1,
                             july:item.july*1,
                             auguest:item.auguest*1,
                             september:item.september*1,
                             october:item.october*1,
                             november:item.november*1,
                             december:item.december*1,
                          }
                            
                            )
                       
                    })






                     this.tableData0=tableData
                     this.nameArry=nameArry
                     this.countArry=countArry
                     console.log(nameArry)
                 this.drawLine51();

                })

              },

              getRegion1(){


            
                this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findIncomeRegions?regionId='+ this.value,
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 获取城市数据111', res)
                    console.log('res', body.count)
                       var nameArry=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',]    
           

                     var tableData=[];

                   tableData.push(body.count.january*1,body.count.february*1,body.count.march*1,body.count.april*1,body.count.may*1,body.count.june*1,body.count.july*1,body.count.auguest*1,body.count.september*1,body.count.october*1,body.count.november*1,body.count.december*1,)





                     // this.tableData1=
                     this.nameArry=nameArry
                     this.countArry=tableData
                     console.log(nameArry)
                 this.drawLine51();

                })
                
              },
              getOutRegion(){


            
                this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findPayoutRegions',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 获取城市数据', res)
                    console.log('res', body.count)
                    var nameArry=[]
                     body.count.forEach(function(item, index, array){
                          nameArry.push(item.province.name)
                       
                    })   
                    var countArry=[];

                     body.count.forEach(function(item, index, array){
                          countArry.push(item.count)
                       
                    })

                   var tableData=[];

                     body.count.forEach(function(item, index, array){
                          tableData.push({
                            type:item.province.name,
                            january:item.january*1,
                             february:item.february*1,
                             march:item.march*1,
                             april:item.april*1,
                             may:item.may*1,
                             june:item.june*1,
                             july:item.july*1,
                             auguest:item.auguest*1,
                             september:item.september*1,
                             october:item.october*1,
                             november:item.november*1,
                             december:item.december*1,
                          }
                            
                            )
                       
                    })






                     this.tableData1=tableData
                     this.nameArry1=nameArry
                     this.countArry1=countArry
                     console.log(nameArry)
                 this.drawLine41();

                })

              },
             getOutRegion1(){


            
                this.$http({
                    method: 'get',
                    url:this.$getApi +'countMoney/management/findPayoutRegions?regionId='+ this.value,
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 获取城市数据111', res)
                    console.log('res', body.count)
                       var nameArry=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',]    
         

                     var tableData=[];

                   tableData.push(body.count.january*1,body.count.february*1,body.count.march*1,body.count.april*1,body.count.may*1,body.count.june*1,body.count.july*1,body.count.auguest*1,body.count.september*1,body.count.october*1,body.count.november*1,body.count.december*1,)





                     // this.tableData1=
                     this.nameArry1=nameArry
                     this.countArry1=tableData
                     console.log(nameArry)
                 this.drawLine41();

                })
                
              },
              findTree(){
                   this.$http({
                    method: 'get',
                    url:this.$getApi +'district/management/findTree',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res', res)
                    console.log('res', body)
                 

                })
              },
              // 集团学生勤率
              getGroupCharsDataS(){
                 this.$http({
                    method: 'get',
                    url:this.$getApi +'groupRate/management/findGroupStuRate',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res', res)
                    console.log('res', body)
                 

                })
              },
                  // 集团教师勤率
              getGroupCharsDataT(){
                      this.$http({
                    method: 'get',
                    url:this.$getApi +'groupRate/management/findGroupTeaRate',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res', res)
                    console.log('res', body)
                 

                })
              },
              // 大区学生
              getRegionCharsDataS(){
                             this.$http({
                    method: 'get',
                    url:this.$getApi +'regionsRate/management/findProvinceStudentsRate',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res', res)
                    console.log('res', body)
                 

                })
              },   
              // 大区老师
               getRegionCharsDataT(){
                             this.$http({
                    method: 'get',
                    url:this.$getApi +'regionsRate/management/findProvinceTeachersRate',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res', res)
                    console.log('res', body)
                 

                })
              },   
              // 省学生
               getProvinceCharsDataS(){
                             this.$http({
                    method: 'get',
                    url:this.$getApi +'rateProvince/findCityStudentRate',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res', res)
                    console.log('res', body)
                 

                })
              }, 
              // 省 老师
                getProvinceCharsDataT(){
                             this.$http({
                    method: 'get',
                    url:this.$getApi +'rateProvince/findCityTeacherRate',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res', res)
                    console.log('res', body)
                 

                })
              },    
              // 市学生
               getCityCharsDataS(){
                             this.$http({
                    method: 'get',
                    url:this.$getApi +'rateCity/management/cityStudentRate',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res', res)
                    console.log('res', body)
                 

                })
              },
              // 市老师
              getCityCharsDataS(){
                             this.$http({
                    method: 'get',
                    url:this.$getApi +'rateCity/management/cityTeacherRate',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res', res)
                    console.log('res', body)
                 

                })
              },


        },
     
        mounted(){
          if (localStorage.actorType=="CITY") {
            this.getCity();
            this.getOutCity();
          }else if(localStorage.actorType=="PROVINCE"){
            this.getProvince();
            this.getOutProvince();
          }else if (localStorage.actorType=="REGION") {
            this.getRegion();
            this.getOutRegion();
          }else if (localStorage.actorType=="GROUP") {
              this.getGroup();
              this.getOutGroup();
          }


           // this.getCity(); //测试用
          this.draw();
          this.findTree();
          

            

        },
        active(){
          console.log('1111111111111111111111111111111111111111111111111111111111111111111')
        }
    }
</script>
<style scoped>
    .left{
        float: left;
        width: 17%;
        height: 100%;
        /*background-color: red;*/
    }
    .right{
        /*float: right;*/
         width: 80%;
        height: 100%;
        background-color: red;
    }
    #MenuBarTop{
        /*width: 100%;*/
    }
    .el-col-12{
        width: 100%;
    }
     .title_box {
    text-align: center;
    height: 10px;
    /*padding-bottom: 91px;*/
    line-height: 101px;

  }
  .main{
    margin-top: 15px;
    margin-left:15px;
    width: 99%;
  }
  .el-tree-node__content{
    height: 40px!important;
  }
</style>