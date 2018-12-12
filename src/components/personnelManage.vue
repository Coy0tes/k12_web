<template>
    <div style="width:100%">
                <div style="width:93%">
                    <!-- <MenuBarTop id="MenuBarTop" :breadcrumb="currentBreadcrumb" :TouchLeftNavStatus="Status" @isNotTouchLeft="getStatusFromTop"></MenuBarTop> -->
                        <div class="main">
                          <div style="width:100%;height:50px;margin-left:22px;">
                              <el-select v-model="value" placeholder="请选择园所" style="margin-top:5px;"@visible-change="test1">
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
                                      <el-button type="primary" @click="getCity">查询</el-button>                  
                                      <el-button type="primary">关联</el-button>                  
                          </div>



                          <!-- 儿童出勤 -->  
                            <div style="padding-left:20px;padding-bottom:30px; border-bottom:1px solid orange;margin-top:20px;">
                               
                          
                                        
            <!-- 教师 薪资 -->
            <div style="margin-top:20px">
                教师薪资 
                 <el-table
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                stripe
                border
                style="width: 100% background-color:#42acf6; margin-top:8px;">
            
                <el-table-column
                  prop=""
                  label=""
                  width='1'
                  align="center"
                  >
                </el-table-column>
                <el-table-column
                  prop="id"
                  label="id"
                  width='80'
                  align="center"
                  >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                   width="100"
                  align="center"
                  >
                </el-table-column>
            
                <el-table-column
                  prop="paymoney"
                  align="center"
                  label="基本工资"
                   width="130">
                </el-table-column>
                <el-table-column
                  prop="baoxian"
                  align="center"
                  label="养老保险"
                  width="130"
                  >
                </el-table-column>
                <el-table-column
                  prop="baoxian_1"
                  align="center"
                  width="130"
                  label="失业保险">
                </el-table-column>
                <el-table-column
                  prop="baoxian_2"
                  align="center"
                  label="医疗保险"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="sybaoxian"
                  align="center"
                  label="生育保险"
                   width="130">
                </el-table-column>
                <el-table-column
                  prop="gsbaoxian"
                  align="center"
                  label="工伤保险"
                   width="130">
                </el-table-column>
                <el-table-column
                  prop="Gongjj"
                  align="center"
                  label="公积金">
                </el-table-column>
                <el-table-column
                  prop="gerensds"
                  align="center"
                  label="个人所得税"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="actual"
                  align="center"
                  label="实发工资"
                   width="130">
                </el-table-column>
              
              </el-table>
            </div>
            
      
                            </div> 
                             <!-- 儿童今日出勤 -->  
                            <div style="padding-left:20px;padding-bottom:30px; border-bottom:1px solid orange;margin-top:20px;display: none;">
                                <div id="myChart42" :style="{width: '1100px', height: '400px',display:'inline-block'}"></div>
                                <div style="width:98%;">
                                      <el-table
                                :data="tableData01"
                                border
                                style="width: 100%">
                                <el-table-column
                                  prop="type"
                                  label="班级"
                                  >
                                </el-table-column>
                                <el-table-column
                                  prop="att"
                                  label="出勤人数"
                                  >
                                </el-table-column>
                                <el-table-column
                                  prop="sth"
                                  label="事假人数">
                                </el-table-column>
                                 <el-table-column
                                  prop="sick"
                                  label="销假人数">
                                </el-table-column>
                                <el-table-column
                                  prop="not"
                                  label="缺勤人数">
                                </el-table-column>
                                <el-table-column
                                  prop="attpr"
                                  label="出勤率">
                                </el-table-column>
                                <el-table-column
                                  prop="sthpr"
                                  label="事假率">
                                </el-table-column>

                                <el-table-column
                                  prop="sickpr"
                                  label="病假率">
                                </el-table-column>

                                <el-table-column
                                  prop="notget"
                                  label="缺勤率">
                                </el-table-column>
                              
                              </el-table>
                                            
                                </div>
                                        

      
                            </div> 

            <!-- 班级收入 -->
                             <div style="padding-left:20px;padding-bottom:30px; border-bottom:1px solid orange;margin-top:20px;">
                                <div id="myChart52" :style="{width: '1100px', height: '400px',display:'inline-block'}"></div>
                                <div style="width:98%;">
                                      <el-table
                                :data="tableData0"
                                border
                                style="width: 100%">
                                <el-table-column
                                  prop="type"
                                  label="部门"
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



                            <div style="padding-left:20px; padding-bottom:30px;border-bottom:1px solid orange">
                                <div id="myChart02" :style="{width: '1100px', height: '400px',display:'inline-block'}"></div>
                                <div style="width:95%;">
                      <!-- 老师出勤 -->
                                <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                                <el-table-column
                                  prop="type"
                                  label="地区"
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
                                <div id="myChart22" :style="{width: '1100px', height: '400px',display:'inline-block'}"></div>
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
                         <div style="padding-left:20px; padding-bottom:30px;border-bottom:1px solid orange;margin-top:20px;">
                                <div id="myChart32" :style="{width: '1100px', height: '400px',display:'inline-block'}"></div>
                                <div style="width:98%">
                            




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
                  data: [{
                  label: 'S集团运营中心',
                  id:1,
                  children: [{
                    label: 'S1大区运营中心',
                    id:2,
                    children: [{
                      label: 'S省运营中心',
                       id:5,
                       children: [{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       },{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       },{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       },{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       }]
                       },{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       },{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       },{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       }],
                  },{
                    label: 'S2大区运营中心',
                    id:2,
                    children: [{
                      label: 'S省运营中心',
                       id:5,
                       children: [{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       },{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       },{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       },{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       },{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       }]
                     },{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       },{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       }],
                  },{
                    label: 'S3大区运营中心',
                    id:2,
                    children: [{
                      label: 'S 省运营中心',
                       id:5,
                       children: [{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       },{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       },{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       },{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       },{
                        label: 'S市运营中心',
                         children: [{
                        label: 'S园'
                       },{
                        label: 'SS园'
                       },{
                        label: 'SSS园'
                       },{
                        label: 'SSSS园'
                       }]
                       }]
                     },{
                      label: 'S省运营中心',
                       children: [{
                        label: 'S 园'
                       },{
                        label: 'S 园'
                       },{
                        label: 'S 园'
                       },{
                        label: 'S 园'
                       },{
                        label: 'S 园'
                       }]
                     },{
                      label: 'S 省运营中心',
                       children: [{
                        label: 'S 园'
                       },{
                        label: 'S 园'
                       },{
                        label: 'S 园'
                       },{
                        label: 'S 园'
                       }]
                     }],
                  },{
                    label: 'S4大区运营中心',
                     id:5,
                    children: [{
                      label: 'S 省运营中心',
                       children: [{
                        label: 'S 市运营中心',
                        children: [{
                        label: 'S 园'
                       }]
                       }]
                     }],
                  },]
                }], 
              defaultProps: {
                children: 'children',
                label: 'label'
              },
                 currentBreadcrumb: '',
                Status: '',
                tableData:[{
                  type:'大区1',
                  att:'80%',
                  sth:'100%',
                  sick:'100%',
                  not:'100%',
                  attpr:'70%',
                  sthpr:'10%',
                  sickpr:'10%',
                },{
                  type:'大区2',
                  att:'80%',
                  tt:'80%',
                  sth:'100%',
                  sick:'100%',
                  not:'100%',
                  attpr:'70%',
                  sthpr:'10%',
                  sickpr:'10%',
                },{
                  type:'大区3',
                  att:'80%',
                  tt:'80%',
                  sth:'100%',
                  sick:'100%',
                  not:'100%',
                  attpr:'70%',
                  sthpr:'10%',
                  sickpr:'10%',
                },{
                  type:'大区4',
                  att:'80%',
                  tt:'80%',
                  sth:'100%',
                  sick:'100%',
                  not:'100%',
                  attpr:'70%',
                  sthpr:'10%',
                  sickpr:'10%',
                },{
                  type:'大区5',
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
                  type:'人力部',
                  att:'8',
                 tt:'8',
                  sth:'10',
                  sick:'1',
                  not:'1',
                  attpr:'7',
                  sthpr:'1',
                  sickpr:'1',
                },{
                  type:'财务部',
                 att:'8',
                 tt:'8',
                  sth:'10',
                  sick:'1',
                  not:'1',
                  attpr:'7',
                  sthpr:'1',
                  sickpr:'1',
                },{
                  type:'软件部',
                 att:'8',
                 tt:'8',
                  sth:'10',
                  sick:'1',
                  not:'10',
                  attpr:'70',
                  sthpr:'10',
                  sickpr:'10',
                },{
                  type:'设计部',
                 att:'8',
                 tt:'8',
                  sth:'10',
                  sick:'10',
                  not:'1',
                  attpr:'7',
                  sthpr:'10',
                  sickpr:'10',
                }], 

              tableData2:[{
                  type:'入职',
                  att:'20',
                 tt:'30',
                  sth:'50',
                  sick:'10',
                  not:'1',
                  attpr:'70',
                  sthpr:'10',
                  sickpr:'10',
                },{
                  type:'离职',
                  att:'8',
                  tt:'8',
                  sth:'1',
                  sick:'1',
                  not:'1',
                  attpr:'7',
                  sthpr:'1',
                  sickpr:'15',
                },{
                  type:'分析数据',
                  att:'12%',
                 tt:'22%',
                  sth:'4%',
                  sick:'9%',
                  not:'9%',
                  attpr:'63%',
                  sthpr:'9%',
                  sickpr:'5%',
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





                options: [{
                    value: '草桥园',
                    label: '1'
                  }, {
                    value: '铜湾园',
                    label: '2'
                  }, {
                    value: '西苑园',
                    label: '3'
                  }, {
                    value: '中苑园',
                    label: '4'
                  }, {
                    value: '葫芦岛园',
                    label: '5'
                  }],
                  value: '',
                  dialogVisible:false,
                  dialogVisible1:false,
                  dialogVisible2:false,
                  teeacherData:[],
                 
          
       
            }
        },
          components: { //2、暴露
           
              MenuBarTop,
            },
        methods:{
          //       test1(){
          //    var optArray = this.$store.state.optarray
          //   console.log("store log is:",optArray)
          //   this.options=optArray
          // },
          handleNodeClick(data){
            console.log(data);
          },
          // 删除
          // 
          delete1(){

          },
          // 关联
            linked(){
                if (type=="group") {
                  
                   this.addRegions()
                }else if (type=="region") {
                  this.addProvinces()
                }else if (type=="province") {
                  this.addCity()
                }else if (type=="citys") {

                }




              this.dialogVisible=false

            },
            // 添加节点
            addChril(){
              if (localStorage.actorType=="group") {
                  
                   this.addRegions()
                }else if (localStorage.actorType=="region") {
                  this.addProvinces()
                }else if (localStorage.actorType=="province") {
                  this.addCity()
                }else if (localStorage.actorType=="citys") {

                }
               this.dialogVisible1=false
            },




             addCity(){
               this.$http.post(
          this.$getApi + 'district/management/web/addCity',
          
          {
           
            "name": this.creatName,
            "provinceId": 0   //关联

            
          },
          {
          headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
        ).then((res) => { // promise对象
          console.log("===regist==== res=====",res);
      
          
        
        })
      },
      addGroups(){
        console.log(this.creatName)
                  this.$http.post(
          this.$getApi + 'district/management/web/addGroups?groupsName='+this.creatName,
          
          {
          headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
        ).then((res) => { // promise对象
          console.log("===regist==== res=====",res);
      
          
        
        })
      },
      addProvinces(){
               this.$http.post(
          this.$getApi + 'district/management/web/addProvinces',
          
          {
           
            "name": this.creatName,
            "regionId": 0

            
          },
          {
          headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
        ).then((res) => { // promise对象
          console.log("===regist==== res=====",res);
      
          
        
        })
      },
      // 大区
      addRegions(){
           this.$http.post(
          this.$getApi + 'district/management/web/addRegions',
          
          {
           
            "name": this.creatName,
            "groupId": 0

            
          },
          {
          headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
        ).then((res) => { // promise对象
          console.log("===regist==== res=====",res);
      
          
        
        })
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
          //            test3(msg){
          //   console.log(msg)
          //   var str=msg
          //   if ((str.substr(0, 1)) == "P") {
          //     console.log('qweqweqweqwe')
          //      this.actorTypes="province"
          //       this.getProvince();
          //   this.getProvinceCharsDataT();
          //   this.getProvinceCharsDataS();

          //        console.log('code============city');
          //    }else  if((str.substr(0, 1)) == "C"){
          //       console.log('code============city');
          //       this.actorTypes="citys"
          //       this.getCity();
          //   this.getCityCharsDataS();
          //   this.getCityCharsDataT();

          //   }else  if((str.substr(0, 1)) == "Q"){
          //       console.log('code============city');
          //       this.actorTypes="citys"
          //    this.getRegion();
          //   this.getRegionCharsDataS();
          //   this.getRegionCharsDataT();

          //   }
          // },
                handleSelect(key, keyPath) {
                        console.log(key, keyPath);
                      },
                drawLine02() {
                      console.log('sssssssss',this.chartarry);





                      let myChart02 = echarts.init(document.getElementById('myChart02'))
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


                      myChart02.setOption(option);
                        },
                


                              drawLine52() {
                          console.log('sssssssss',this.chartarry);





                          let myChart52 = echarts.init(document.getElementById('myChart52'))
                          console.log('0000000000',)
                        
                           var option = {
                             title: {
                                          text: '招聘数据'
                                            },
                              xAxis: {
                                  type: 'category',
                                  data: ['一月','二月','三月','四月','五月','六月','七月']
                              },
                              yAxis: {
                                  type: 'value'
                              },
                              series: [{
                                  data: [12, 20, 150, 18, 17, 11, 13],
                                  type: 'bar',
                                    itemStyle: {
                                        color: '#9fdabf'
                                    },
                                     barWidth : 30,
                              }]
                          };



                          myChart52.setOption(option);
                            },   
                              drawLine42() {
                          console.log('sssssssss',this.chartarry);





                          let myChart42 = echarts.init(document.getElementById('myChart42'))
                          console.log('0000000000',)
                        
                           var option = {
                             title: {
                                          text: '今日儿童出勤'
                                            },
                              xAxis: {
                                  type: 'category',
                                  data: ['奇思班','奇想班','奇慧班','知一班','知二班',]
                              },
                              yAxis: {
                                  type: 'value'
                              },
                              series: [{
                                data: [30, 23, 25, 20, 15],
                                  type: 'bar',
                                    itemStyle: {
                                        color: '#d48265'
                                    },
                                    barWidth : 30,
                              }]
                          };



                          myChart42.setOption(option);
                            },
                drawLine22() {
                      console.log('sssssssss',this.chartarry);





                      let myChart22 = echarts.init(document.getElementById('myChart22'))
                      console.log('0000000000',)
                    
                       var option = {
                               title: {
                                                text: '人事分析图'
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
                                data:['入职','离职','走势']
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
                                    max: 250,
                                    interval: 50,
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
                                    name:'入职',
                                    type:'bar',
                                    data:[20, 40, 70, 20, 20, 76, 135, 162, 200, 20, 64, 33],
                                    itemStyle: {
                                        color: '#d48265'
                                    }
                                },
                                {
                                    name:'离职',
                                    type:'bar',
                                    data:[12, 34, 57, 12, 125 ,47, 100, 86, 2, 10, 56, 23],
                                    itemStyle: {
                                        color: '#9fdabf'
                                    }

                                },
                                {
                                    name:'走势',
                                    type:'line',
                                    yAxisIndex: 1,
                                    data:[2, 2, 3, 4, 6, 10, 20, 23, 23, 16, 12, 6],
                                    itemStyle: {
                                        color: '#61a0a8'
                                    }
                                    
                                }
                            ]
                        };



                      myChart22.setOption(option);
                        }, 
                       drawLine32() {
                      console.log('sssssssss',this.chartarry);





                      let myChart32 = echarts.init(document.getElementById('myChart32'))
                      console.log('0000000000',)
                    
                       var option = {
                               title: {
                                                text: '人员流失率'
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
                                data:['人数','流失率']
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
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
                                    max: 250,
                                    interval: 50,
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
                                    data:this.teeacherData,
                                    itemStyle: {
                                        color: '#d48265'
                                    },
                                    barWidth : 30,
                                },
                              
                                {
                                    name:'招生率',
                                    type:'line',
                                    yAxisIndex: 1,
                                    data:[2, 2, 6, 4, 6, 10, 20],
                                    itemStyle: {
                                        color: '#61a0a8'
                                    }
                                    
                                }
                            ]
                        };



                      myChart32.setOption(option);
                        },
                        draw(){
                          this.drawLine02();
                       
                          this.drawLine22();
                          this.drawLine32();
                          this.drawLine42();
                          this.drawLine52();
                        },
                           // city
              getCity(){


                this.$http({
                    method: 'get',
                    url:this.$getApi +'empFlowRate/management/findRateLeaveCity?folwEnum=LEAVEBY',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('城市人员流失率', res)
                    console.log('res', body)
                 

                })  
                



              },   

              //    test3(msg){
              //   console.log(msg)
              //   var str=msg
              //   if ((str.substr(0, 1)) == "P") {
              //     console.log('qweqweqweqwe')
              //      this.actorTypes="province"
              //       this.getProvince();
              //   this.getProvinceCharsDataT();
              //   this.getProvinceCharsDataS();

              //        console.log('code============city');
              //    }else  if((str.substr(0, 1)) == "C"){
              //       console.log('code============city');
              //       this.actorTypes="citys"
              //       this.getCity();
              //   this.getCityCharsDataS();
              //   this.getCityCharsDataT();

              //   }else  if((str.substr(0, 1)) == "Q"){
              //       console.log('code============city');
              //       this.actorTypes="citys"
              //    this.getRegion();
              //   this.getRegionCharsDataS();
              //   this.getRegionCharsDataT();

              //   }
              // },
                             // group
              getGroup(){


                this.$http({
                    method: 'get',
                    url:this.$getApi +'empFlowRate/management/findRateLeaveCity?folwEnum=LEAVEBY',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('省人员流失率', res)
                    console.log('城市人员流失率', res)
                    console.log('res', body)
                   this.getGroupCharsDataT();

                })  
                



              },  
              // Provinces
              getProvince(){


                this.$http({
                    method: 'get',
                    url:this.$getApi +'empFlowRate/management/findRateProvinces?folwEnum=LEAVEBY',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('省人员流失率', res)
                    console.log('res', body)
                 

                })  
                



              }, 
              // Regions
              getRegion(){


                this.$http({
                    method: 'get',
                    url:this.$getApi +'empFlowRate/management/findRateRegions?folwEnum=LEAVEBY',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                   
                    console.log('res 大区人员流失率', res)
                    console.log('res', body)
                

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
                    url:this.$getApi +'empFlowRate/management/findRateLeaveCity?folwEnum=LEAVEBY',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                         var terData=[]
                   body.forEach(function(item, index, array){
                          terData.push(item.january*1,item.february*1,item.march*1,item.april*1,item.may*1,item.june*1,item.july*1,item.auguest*1,item.september*1,item.october*1,item.november*1,item.december*1)
                       
                    })
                   this.teeacherData=terData
                   this.tableData=body
                    console.log('res', res)
                    console.log('res', body)
                 
                    this.draw();
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
                            var terData=[]
                   body.forEach(function(item, index, array){
                          terData.push(item.january*1,item.february*1,item.march*1,item.april*1,item.may*1,item.june*1,item.july*1,item.auguest*1,item.september*1,item.october*1,item.november*1,item.december*1)
                       
                    })
                   this.teeacherData=terData
                   this.tableData=body
                   
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

                            var terData=[]
                   body.forEach(function(item, index, array){
                          terData.push(item.january*1,item.february*1,item.march*1,item.april*1,item.may*1,item.june*1,item.july*1,item.auguest*1,item.september*1,item.october*1,item.november*1,item.december*1)
                       
                    })
                   this.teeacherData=terData
                   this.tableData=body
                    console.log('res', res)
                    console.log('res', body)
                 

                })
              },    
              // 市学生
               getCityCharsDataS(){
                             this.$http({
                    method: 'get',
                    url:this.$getApi +'rateCity/management/findCityStudentRate',
                   
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
              getCityCharsDataT(){
                             this.$http({
                    method: 'get',
                    url:this.$getApi +'rateCity/management/findCityTeacherRates',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res
                            var terData=[]
                   body.forEach(function(item, index, array){
                          terData.push(item.january*1,item.february*1,item.march*1,item.april*1,item.may*1,item.june*1,item.july*1,item.auguest*1,item.september*1,item.october*1,item.november*1,item.december*1)
                       
                    })
                   this.teeacherData=terData
                   this.tableData=body
                   
                    console.log('res', res)
                    console.log('res', body)
                 

                })
              },


        },
     
        mounted(){
          if (localStorage.actorType=="CITY") {
            this.getCity();
          }else if(localStorage.actorType=="PROVINCE"){
            this.getProvince();
          }else if (localStorage.actorType=="REGION") {
            this.getRegion();
          }else if (localStorage.actorType=="GROUP") {
              this.getGroup();
          }

          this.draw();
          this.findTree();
          

            

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