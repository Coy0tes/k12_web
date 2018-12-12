<template>
    <div style="width:100%">
                <div style="width:93%">
                    <!-- <MenuBarTop id="MenuBarTop" :breadcrumb="currentBreadcrumb" :TouchLeftNavStatus="Status" @isNotTouchLeft="getStatusFromTop"></MenuBarTop> -->
                        <div class="main">
                          <div style="width:100%;height:50px;margin-left:22px;">
                              <el-select v-model="value" placeholder="请选择园所" style="margin-top:5px;" @visible-change="test1">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>

                             <!--      <el-date-picker
                                  v-model="value1"
                                  type="date"
                                  placeholder="选择日期">
                                </el-date-picker> -->
                                      <el-button type="primary" @click="getCity">查询</el-button>                  
                                      <el-button type="primary" @click="test2">关联</el-button>  
                                      {{num}}                
                          </div>



                          <!-- 儿童出勤 -->  
                          <!-- {{$store.state.optarray}} -->
                            <div style="padding-left:20px;padding-bottom:30px; border-bottom:1px solid orange;margin-top:20px;">
                                <div id="myChart1" :style="{width: '98%', height: '400px'}"></div>
                                <div style="width:98%;">
                                      <el-table
                                :data="tableData1"
                                border
                                style="width: 100%">
                                <el-table-column
                                  prop="createdAt"
                                  :formatter="dateFormat"
                                  label="时间"
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
                             <!-- 儿童今日出勤 -->  <!--区域统计--> 
                            <div style="padding-left:20px;padding-bottom:30px; border-bottom:1px solid orange;margin-top:20px; display:block">
                                <div id="myChart4" :style="{width: '98%', height: '400px',display:'inline-block'}"></div>
                                <div style="width:98%;">
                                      <el-table
                                :data="tableData01"
                                border
                                style="width: 100%">
                                <el-table-column
                                  prop="type"
                                  label="区域"
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
                             <div style="padding-left:20px;padding-bottom:30px; border-bottom:1px solid orange;margin-top:20px; display:none">
                                <div id="myChart5" :style="{width: '98%', height: '400px',display:'inline-block'}"></div>
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
                                <div id="myChart" :style="{width: '98%', height: '400px',display:'inline-block'}"></div>
                                <div style="width:95%;">
                      <!-- 老师出勤 -->
                                <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                                <el-table-column
                                  prop="createdAt"
                                  :formatter="dateFormat"
                                  label="时间"
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
                  
                  <!-- 收支 -->
                           <div style="padding-left:20px; padding-bottom:30px;border-bottom:1px solid orange;margin-top:20px; display:none">
                                <div id="myChart2" :style="{width: '98%', height: '400px',display:'inline-block'}"></div>
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
                                <div id="myChart3" :style="{width: '98%', height: '400px',display:'inline-block'}"></div>
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
 import Moment from 'moment';
    export default {
          // props: ["message"],
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
                  type:'区域一',
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
                  type:'区域二',
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
                  type:'区域三',
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
                  type:'区域四',
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
                  studentData:[],
                  teeacherData:[],
                  num:'',
                  areaId:'',
                  actorTypes:'',
                  // message:$store.state.optarray,
                 
          
       
            }
        },
        watch:{
          message(){

            


            console.log("a:F烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦方法 ");
      
          }
        },


          components: { //2、暴露
           
              MenuBarTop,
            },
        methods:{
          test2(){
            this.getGroupCharsDataS();
              this.getGroupCharsDataT();
          },
          test1(){
            // console.log("message",message)
             var optArray = this.$store.state.optarray
             var areaID = this.$store.state.areaid
             console.log("test11111",areaID)
          console.log("store log is111:",optArray)
          this.options=optArray
          // this.areaId=areaID

          console.log('qweqweqweqwe',)
          var str=areaID
      if ((str.substr(0, 1)) == "P") {
              console.log('qweqweqweqwe')
               this.actorTypes="province"
                this.getProvince();
            this.getProvinceCharsDataT();
            this.getProvinceCharsDataS();

                 console.log('code============city');
             }else  if((str.substr(0, 1)) == "C"){
                console.log('code============city');
                this.actorTypes="citys"
                this.getCity();
            this.getCityCharsDataS();
            this.getCityCharsDataT();

            }else  if((str.substr(0, 1)) == "Q"){
                console.log('code============city');
                this.actorTypes="citys"
             this.getRegion();
            this.getRegionCharsDataS();
            this.getRegionCharsDataT();

            }
          },
             dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return Moment(date*1000).format("YYYY ");  
            },
          handleNodeClick(data){
            console.log(data);
          },
          // 删除
          // 
          delete1(){
            // 把类型id传到local 里  父组件调用子组件
          },
          test3(msg){
            console.log(msg)
            var str=msg
            var t;
              clearTimeout(t)
              t = setTimeout(function (){
                  console.log('执行了');
              }, 1000);
            this.test1();
            // if ((str.substr(0, 1)) == "P") {
            //   console.log('qweqweqweqwe')
            //    this.actorTypes="province"
            //     this.getProvince();
            // this.getProvinceCharsDataT();
            // this.getProvinceCharsDataS();

            //      console.log('code============city');
            //  }else  if((str.substr(0, 1)) == "C"){
            //     console.log('code============city');
            //     this.actorTypes="citys"
            //     this.getCity();
            // this.getCityCharsDataS();
            // this.getCityCharsDataT();

            // }else  if((str.substr(0, 1)) == "Q"){
            //     console.log('code============city');
            //     this.actorTypes="citys"
            //  this.getRegion();
            // this.getRegionCharsDataS();
            // this.getRegionCharsDataT();

            // }
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
                drawLine() {
                      // console.log('sssssssss',this.chartarry);





                      let myChart = echarts.init(document.getElementById('myChart'))
                      // console.log('0000000000',)
                    
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
                                                data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
                                            },
                                            yAxis: {
                                                type: 'value'
                                            },
                                            series: [
                                                {
                                                    name:'老师1',
                                                    type:'line',
                                                    stack: '总量',
                                                    data:this.teeacherData
                                                }
                                            ]
                                        };


                      myChart.setOption(option);
                        },
                drawLine1() {
                          // console.log('sssssssss',this.chartarry);





                          let myChart1 = echarts.init(document.getElementById('myChart1'))
                          // console.log('0000000000',)
                        
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
                                                data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
                                            },
                                            yAxis: {
                                                type: 'value'
                                            },
                                            series: [
                                                {
                                                    name:'',
                                                    type:'line',
                                                    stack: '总量',
                                                    data:this.studentData
                                                },
                                             
                                                
                                                
                                                
                                            ]
                                        };



                          myChart1.setOption(option);
                            },   


                              drawLine5() {
                          // console.log('sssssssss',this.chartarry);





                          let myChart5 = echarts.init(document.getElementById('myChart5'))
                          // console.log('0000000000',)
                        
                           var option = {
                             title: {
                                          text: '班级收入'
                                            },
                              xAxis: {
                                  type: 'category',
                                  data: ['一月','二月','三月','四月','五月','六月','七月']
                              },
                              yAxis: {
                                  type: 'value'
                              },
                              series: [{
                                  data: [12000, 20000, 15000, 18000, 17000, 11000, 13000],
                                  type: 'bar',
                                    itemStyle: {
                                        color: '#9fdabf'
                                    },
                                     barWidth : 30,
                              }]
                          };



                          myChart5.setOption(option);
                            },   
                              drawLine4() {
                          // console.log('sssssssss',this.chartarry);





                          let myChart4 = echarts.init(document.getElementById('myChart4'))
                          // console.log('0000000000',)/
                        
                           var option = {
                             title: {
                                          text: '区域儿童统计'
                                            },
                              xAxis: {
                                  type: 'category',
                                  data: ['区域一','区域二','区域三','区域四','区域五',]
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



                          myChart4.setOption(option);
                            },
                drawLine2() {
                      // console.log('sssssssss',this.chartarry);





                      let myChart2 = echarts.init(document.getElementById('myChart2'))
                      // console.log('0000000000',)
                    
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



                      myChart2.setOption(option);
                        }, 
                       drawLine3() {
                      // console.log('sssssssss',this.chartarry);





                      let myChart3 = echarts.init(document.getElementById('myChart3'))
                      // console.log('0000000000',)
                    
                       var option = {
                             title: {
                                          text: '区域教师统计'
                                            },
                              xAxis: {
                                  type: 'category',
                                  data: ['区域一','区域二','区域三','区域四','区域五',]
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



                      myChart3.setOption(option);
                        },
                        
                        draw(){
                          this.drawLine();
                          this.drawLine1();
                          this.drawLine2();
                          this.drawLine3();
                          this.drawLine4();
                          this.drawLine5();
                          // console.log('111111111112222222222')
                        },
                           // city
              getCity(){


                this.$http({
                    method: 'get',
                    url:this.$getApi +'district/management/findCitys?parentId'+ this.value,
                   
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
                             // group
              getGroup(){


                this.$http({
                    method: 'get',
                    url:this.$getApi +'district/management/findGroups',
                   
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
              // Provinces
              getProvince(){


                this.$http({
                    method: 'get',
                    url:this.$getApi +'district/management/findProvinces?regionsId=1',
                   
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
              // Regions
              getRegion(){


                this.$http({
                    method: 'get',
                    url:this.$getApi +'district/management/findRegions',
                   
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

                   this.tableData1=body
                   var stuData=[]
                   body.forEach(function(item, index, array){
                          stuData.push(item.january*1,item.february*1,item.march*1,item.april*1,item.may*1,item.june*1,item.july*1,item.auguest*1,item.september*1,item.october*1,item.november*1,item.december*1)
                       
                    })
                   this.studentData=stuData
                    console.log('res---stuData', stuData)
                    console.log('res---getGroupCharsDataS', res)
                    console.log('res---getGroupCharsDataS', body)
                 
                    this.draw();
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
                    this.tableData1=body
                   var stuData=[]
                   body.forEach(function(item, index, array){
                          stuData.push(item.january*1,item.february*1,item.march*1,item.april*1,item.may*1,item.june*1,item.july*1,item.auguest*1,item.september*1,item.october*1,item.november*1,item.december*1)
                       
                    })
                   this.studentData=stuData
                   
                    console.log('res', res)
                    console.log('res', body)
                  this.draw();

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
                 
                    this.draw();
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
                    this.tableData1=body
                   var stuData=[]
                   body.forEach(function(item, index, array){
                          stuData.push(item.january*1,item.february*1,item.march*1,item.april*1,item.may*1,item.june*1,item.july*1,item.auguest*1,item.september*1,item.october*1,item.november*1,item.december*1)
                       
                    })
                   this.studentData=stuData
                   
                    console.log('res', res)
                    console.log('res', body)
                 
                    this.draw();
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
                  this.draw();

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

                   this.tableData1=body
                   var stuData=[]
                   body.forEach(function(item, index, array){
                          stuData.push(item.january*1,item.february*1,item.march*1,item.april*1,item.may*1,item.june*1,item.july*1,item.auguest*1,item.september*1,item.october*1,item.november*1,item.december*1)
                       
                    })
                   this.studentData=stuData
                    console.log('res', res)
                    console.log('res', body)
                  this.draw();

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
                 
                    this.draw();
                })
              },


        },
     
        mounted(){
          
          
          if (localStorage.actorType=="CITY") {
            this.getCity();
            this.getCityCharsDataS();
            this.getCityCharsDataT();

          }else if(localStorage.actorType=="PROVINCE"){
            this.getProvince();
            this.getProvinceCharsDataT();
            this.getProvinceCharsDatas();
          }else if (localStorage.actorType=="REGION") {
            this.getRegion();
            this.getRegionCharsDataS();
            this.getRegionCharsDataT();
          }else if (localStorage.actorType=="GROUP") {
              this.getGroup();
              this.getGroupCharsDataS();
              this.getGroupCharsDataT();

          }

          
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