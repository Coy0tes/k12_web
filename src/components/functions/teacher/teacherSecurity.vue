<template>
    <div>
     



           <div class="tags" style="padding-top:10px; margin-left:10px;">
               
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
                  prop="name"
                  label="姓名"
                   width="100"
                    fixed="left"
                  align="center"
                  >
                </el-table-column>
            
                <el-table-column
                  prop="teacherSocialSecurity.salary"
                  align="center"
                  label="基本工资"
                   width="130">
                </el-table-column> <el-table-column
                  prop="teacherSocialSecurity.taxIncome"
                  align="center"
                  label="个税起征点"
                   width="130">
                </el-table-column>
                <el-table-column
                  prop="teacherSocialSecurity.personInsuranceEndowment"
                  align="center"
                  label="养老保险"
                  width="130"
                  >
                </el-table-column>
                <el-table-column
                  prop="teacherSocialSecurity.personInsuranceUnemployee"
                  align="center"
                  width="130"
                  label="失业保险">
                </el-table-column>
                <el-table-column
                  prop="teacherSocialSecurity.personInsuranceMedical"
                  align="center"
                  label="医疗保险"
                  width="130">
                </el-table-column>
           
                <el-table-column
                  prop="teacherSocialSecurity.personFundsHouse"
                  align="center"
                  width='130'
                  label="公积金">
                </el-table-column>
                <el-table-column
                  prop="teacherSocialSecurity.personTax"
                  align="center"
                  label="个人所得税"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="teacherSocialSecurity.actualPayroll"
                  align="center"
                  label="实发工资"
                   width="130">
                </el-table-column>   <el-table-column
                  prop="teacherSocialSecurity.accumulationFund"
                  align="center"
                  label="公积金缴费基数"
                   width="130">
                </el-table-column>   <el-table-column
                  prop="teacherSocialSecurity.bankId"
                  align="center"
                  label="银行卡号"
                   width="180">
                </el-table-column>   <el-table-column
                  prop="teacherSocialSecurity.companyBorth"
                  align="center"
                  label="公司承担生育0.5% "
                   width="130">
                </el-table-column>   <el-table-column
                  prop="teacherSocialSecurity.companyEndowment"
                  align="center"
                  label="公司承担养老20%"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.companyFunds"
                  align="center"
                  label="公司承担公积金12%"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.companyHurt"
                  align="center"
                  label="公司承担工伤0.6%+4"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.companyMedical"
                  align="center"
                  label="公司承担医疗7%+4.5 "
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.companyPay"
                  align="center"
                  label="教育公司代缴部分"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.companyUnemployee"
                  align="center"
                  label="公司承担失业0.5% "
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.cutAffair"
                  align="center"
                  label="事假扣款"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.cutAttend"
                  align="center"
                  label="考勤扣款"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.cutMeal"
                  align="center"
                  label="餐费扣款"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.cutOther"
                  align="center"
                  label="其他扣款"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.cutSick"
                  align="center"
                  label="病假扣款
                  "
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.other"
                  align="center"
                  label="其他
                  "
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.personCutFivesalay"
                  align="center"
                  label="个人五险一金扣款小计 "
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.personTaxAfterSalary"
                  align="center"
                  label="税后工资 "
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.salaryAge"
                  align="center"
                  label="工龄工资"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.salaryPayment"
                  align="center"
                  label="应付工资"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.salaryPerf"
                  align="center"
                  label="绩效工资"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.salarySubtotal"
                  align="center"
                  label="工资小计"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.salayTotal"
                  align="center"
                  label="工资总额"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.socilaBaseEndoUnemp"
                  align="center"
                  label="养老、失业基数"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.socilaBaseHurtBorthMedic"
                  align="center"
                  label="工伤、生育、医疗基数"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.stuAward"
                  align="center"
                  label=" 生源奖"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.subsidyMedal"
                  align="center"
                  label=" 勋章奖励"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.subsidyOther"
                  align="center"
                  label=" 其他补助"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.subsidyOvertime"
                  align="center"
                  label=" 加班补助"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.subsidyShuttle"
                  align="center"
                  label=" 班车补助"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.totalCost"
                  align="center"
                  label=" 总人工成本"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.unTax"
                  align="center"
                  label=" 避税部分"
                   width="130">
                </el-table-column><el-table-column
                  prop="teacherSocialSecurity.type"
                  align="center"
                  fixed="right"
                  :formatter="formatSex"
                  label=" 员工状态"
                   width="130">
                </el-table-column>
                  <el-table-column
                prop="other"
                align="center"
                fixed="right"
                 width="180"
                label="操作">
                <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)">编辑薪资</el-button>
                  <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit1(scope.$index, scope.row)">编辑状态</el-button>
                
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



<!-- 编辑教师薪资  star-->
          <el-dialog
     
            :visible.sync="isShow"
             width="1200px"

            :before-close="handleClose">


           <!-- <div class="tag_mian" v-show="isShow"> -->
        <div class="tag_content">
        <!--   <div class="tag_header">
            
            <span class="addMoney">编辑教师薪资</span>
            <img src="../../../assets/close3.png" height="48" width="48" alt="" class="closeX" @click="handelClose">
          </div> -->

             <div class="top">
                     <span class="top_text">编辑教师薪资</span>
                     <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -42px;right: 10px;" class="closeDiv">
                       <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg"  @click="handelClose">
                     </div>
                    </div>
              <div style="margin-left:1%;">
                  <el-form  style='margin-left: 140px;overfoll:scroll;'>

                    <p style="font-size:18px;font-weight:700;font-family:'黑体'">基本数据</p>
                    <br>
                    <el-form-item >

                     <span>
                       <span style="word-spacing:10px">姓&nbsp;&nbsp;名 </span>
                       <el-input style="width:100px;" v-model="name"></el-input>

                     </span> 
                <span class="line"></span>
                 <span>
                        
                        <span style="margin-right:0px;">公积金缴费基数 </span>
                    
                    <el-input style="width:100px;margin-left:7px;" v-model='accumulationFund' placeholder="3500"></el-input> 元
                      </span>

                    <span class="line"></span>
                    <span> <span style="margin-right:10px;">实发工资 </span>
                      <el-input style="width:100px;" v-model="actualPayroll"></el-input>元
                    </span>

                    <span class="line"></span>
                      <span>

                        <span style="margin-right:0px;">银行卡号 </span>
                    
                    <el-input style="width:180px;margin-left: 13px;" v-model='bankId' placeholder="8"></el-input>
                      </span>



                    </el-form-item>
                  

                     <el-form-item>
               
                         

                              <span style="">
                            <span style="margin-right:2px;">基本工资</span>
                      <el-input style="width:100px; margin-left: 7px;" v-model="salary" ></el-input> 元 &nbsp;
                          </span> 

                          <span class="line"></span>
                              <span style="">
                            <span style="margin-right:5px;">工 龄 工 资</span>
                      <el-input style="width:100px; margin-left: 7px;" v-model="salaryAge" ></el-input> 元
                          </span> 
                          
                           <span class="line"></span>
                              <span style="">
                            <span style="margin-right:2px;">应付工资</span>
                      <el-input style="width:100px; margin-left: 7px;" v-model="salaryPayment" ></el-input> 元
                          </span>
                              
                             <span class="line"></span>
                          <span>
                            <span style="word-spacing:10px;margin-right:5px;">备&nbsp;注</span>
                    
                       <el-input style="width:180px;margin-left: 18px;"v-model='remark' class="color_sl"></el-input>
                           </span>
                           
                         

                    </el-form-item> 


                    <el-form-item>
                          
                
                         <span>
                            <span style="margin-right:0px;">绩效工资</span>
                    
                       <el-input style="width:100px;margin-left: 10px;"v-model='salaryPerf' class="color_sl"></el-input> 元 &nbsp;
                           </span>

                             <span class="line"></span>
                           

                             <span style="">
                            <span style="margin-right:2px;">个税起征点</span>
                      <el-input style="width:100px; margin-left: 7px;" v-model="taxIncome" ></el-input> 元
                          </span>

                          <span class="line"></span>
                              <span style="">
                            <span style="margin-right:2px;">工资总额</span>
                      <el-input style="width:100px; margin-left: 7px;" v-model="salayTotal" ></el-input> 元
                          </span> 
                          
                           <span class="line"></span>

                               <span>
                            <span style="word-spacing:10px;margin-right:10px;">员工状态</span>
                    
                       <el-select v-model="value2" placeholder="请选择" @change='choses'  style='width:180px'>
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                           </span>
                            
                           
                         

                    </el-form-item>

                    <el-form-item>
                          
                
                        

                             
                              <span style="">
                            <span style="margin-right:3px;">避税部分</span>
                      <el-input style="width:100px; margin-left: 7px;" v-model="unTax" ></el-input> 元
                          </span> 
                             <span class="line"></span>
                                 <span style="">
                            <span style="margin-right:18px;">工 资 小 计</span>
                      <el-input style="width:100px; margin-left: 1px;" v-model="salarySubtotal" ></el-input> 元
                          </span> 
                          
                           <span class="line"></span>
                              <span style="">
                            <span style="margin-right:2px;">人工成本</span>
                      <el-input style="width:100px; margin-left: 7px;" v-model="totalCost" ></el-input> 元
                          </span>

                            <span class="line"></span>
                        <span style="">
                            <span style="margin-right:10px;">社保缴费基数</span>
                      <el-input style="width:130px; margin-left: 7px;" v-model="socilaBaseEndoUnemp" ></el-input> 元
                          </span>
                       

                    </el-form-item>



                  <!-- 公司承担部分 -->
                    <span style="font-size:18px;font-weight:700;font-family:'黑体';display:inline-block">公司承担部分: 
                      <span style="font-size:18px" class="el-icon-arrow-down" @click='companyShow=true' v-if='!companyShow'></span>
                    <span style="font-size:18px" class="el-icon-arrow-up" @click='companyShow=false' v-if='companyShow'></span>      </span>  
                    <el-form-item v-show='companyShow'>
                            <span><span style="margin-right:10px;">生育 </span>
                     
                      <el-input style="width:150px;" v-model='companyBorth'placeholder="0.5"></el-input> %
                          </span>

                      
                     <span class="line"></span>
                       
                          <span>
                            <span style="margin-right:10px;">养老 </span>
                   
                      <el-input style="width:150px;" v-model='companyEndowment'placeholder="20"> </el-input> %
                          </span>
                           <span class="line"></span>
                         <span>
                        <span style="margin-right:10px;">公积金 </span>
                  
                       <el-input style="width:150px;"v-model='companyFunds' placeholder="12"></el-input> %
                      </span>
                      <span class="line"></span>
                      <span>
                          <span style="margin-right:10px;">工伤 </span>
                     
                       <el-input style="width:150px;"v-model='companyHurt' placeholder="0.6"></el-input> %
                      </span>

                    </el-form-item>
                 

               
                   
                    <el-form-item v-show='companyShow'> 
               
                          
                          <span>
                            <span style="word-spacing:3px;margin-right:10px;">医疗</span>
                     
                     <el-input style="width:150px;margin-left: 2px;"v-model='companyMedical'placeholder="7"></el-input> %
                          </span>
                            <span class="line"></span>
                         <span>
                            <span style="word-spacing:0px;margin-right:0px;">公司代缴部分</span>
                    
                       <el-input style="width:100px;margin-left: 0px;"v-model='companyPay'placeholder="10" class="color_sl"></el-input> %
                           </span>

                             <span class="line"></span>
                              <span style="">
                            <span style="margin-right:10px;">失 &nbsp; 业</span>
                      <el-input style="width:150px; margin-left: 5px;" v-model="companyUnemployee" placeholder="0.5"></el-input> %
                          </span>    


                            <span class="line"></span>
                          <br>
                        <!-- <span style="color:red;display:inline-block;cursor: pointer" @click='companyShow=false'>收起 <i class="el-icon-arrow-up"></i> </span> -->
                           
                         

                    </el-form-item> 

<!-- 个人承担部分 -->
                    <br>
                    <br>
                     <span style="font-size:18px;font-weight:700;font-family:'黑体';display:inline-block">个人承担部分:
                      <span tyle="font-size:18px" class="el-icon-arrow-down" @click='personCut=true' v-if='!personCut'></span>
                      <span tyle="font-size:18px" class="el-icon-arrow-up" @click='personCut=false' v-if='personCut'></span>
                      <!-- <span tyle="font-size:18px" class="el-icon-circle-plus" @click='personCut=true'></span> -->
                    </span>

                    <el-form-item v-show='personCut'>
               
                          
                       
                
                    
                          
                              <span style="">
                            <span style="margin-right:0px;">住房公积金</span>
                      <el-input style="width:120px; margin-left: 7px;" v-model="personFundsHouse" placeholder="12"></el-input> %
                          </span> 
                          
                           <span class="line"></span>
                              <span style="">
                            <span style="margin-right:0px;">养老保险</span>
                      <el-input style="width:120px; margin-left: 7px;" v-model="personInsuranceEndowment" placeholder="8"></el-input> %
                          </span>
                           
                          <span class="line"></span>
                              <span style="">
                            <span style="margin-right:0px;">税后工资</span>
                      <el-input style="width:130px; margin-left: 7px;" v-model="personTaxAfterSalary" placeholder="8"></el-input> 元
                          </span>


                                <span class="line"></span>
                              <span style="">
                            <span style="margin-right:0px;">失业保险</span>
                      <el-input style="width:130px; margin-left: 2px;" v-model="personInsuranceUnemployee" placeholder="0.5"></el-input> %
                          </span> 

                    </el-form-item>

          
                   <el-form-item v-show='personCut'>
               
                          
                       
                
                         <span>
                            <span style="word-spacing:10px;margin-right:10px;">医疗保险</span>
                    
                       <el-input style="width:180px;margin-left: 8px;"v-model='personInsuranceMedical' class="color_sl" placeholder="2"></el-input> %
                           </span>

                       

                          <span class="line"></span>
                              <span style="">
                            <span style="margin-right:10px;">个人所得税</span>
                      <el-input style="width:170px; margin-left: 7px;" v-model="personTax" placeholder="12"></el-input> 元
                          </span> 
                          
                          

                              <span class="line"></span>
                              <span style="">
                            <span style="margin-right:10px;">五险一金扣款小计</span>
                      <el-input style="width:160px; margin-left: 2px;" v-model="personCutFivesalay" ></el-input> 元
                          </span> 

                          
                           
                         <br>
                         <br>
                      <!-- <span style="color:red;display:inline-block;cursor: pointer" @click='personCut=false'>收起 <i class="el-icon-arrow-up"></i> </span> -->
                    </el-form-item>
 <!-- 扣款部分        -->
                      <br>
                      <br>
                      <span style="font-size:18px;font-weight:700;font-family:'黑体';display:inline-block">扣款部分: 
                        <span tyle="font-size:18px" class="el-icon-arrow-down" @click='cutModel=true' v-if='!cutModel'></span>
                        <span tyle="font-size:18px" class="el-icon-arrow-up" @click='cutModel=false' v-if='cutModel'></span>
                      </span>
                    <el-form-item v-show='cutModel'>
               
                          
               
                
                         <span>
                            <span style="word-spacing:10px;margin-right:0px;">考勤扣款</span>
                    
                       <el-input style="width:125px;margin-left: 4px;"v-model='cutAttend' class="color_sl"></el-input> 元
                           </span>

                             <span class="line"></span>
                              <span style="">
                            <span style="margin-right:0px;">餐费扣款</span>
                      <el-input style="width:120px; margin-left: 4px;" v-model="cutMeal" ></el-input> 元
                          </span> 

                          <span class="line"></span>
                              <span style="">
                            <span style="margin-right:10px;">其他扣款</span>
                      <el-input style="width:130px; margin-left: 4px;" v-model="cutOther" ></el-input> 元
                          </span> 
                          
                           <span class="line"></span>
                              <span style="">
                            <span style="margin-right:10px;">病假扣款</span>
                      <el-input style="width:130px; margin-left: 4px;" v-model="cutSick" ></el-input> 元
                          </span>
                           
                           <br>
                            <span style="margin-top:20px;display:inline-block"> 
                            <span style="word-spacing:3px;margin-right:0px;">事假扣款</span>
                     
                     <el-input style="width:125px;margin-left: 4px;"v-model='cutAffair'placeholder="7"></el-input> 元


                          </span>

                            <span class="line"></span>
                               <span>
                            <span style="word-spacing:10px;margin-right:0px;">其&nbsp;&nbsp;他</span>
                    
                       <el-input style="width:120px;margin-left: 5px;"v-model='other' class="color_sl"></el-input> 
                           </span>

                             <br>
                            <!-- <span style="color:red;display:inline-block;cursor: pointer" @click='cutModel=false'>收起 <i class="el-icon-arrow-up"></i> </span> -->
                    </el-form-item>




                  
                  <!-- 奖励补助 -->
                       <br>
                       <br>
                     <span style="font-size:18px;font-weight:700;font-family:'黑体';display:inline-block">奖励补助: 
                      <span tyle="font-size:18px" class="el-icon-arrow-down" @click='subsidy=true' v-if='!subsidy'></span>
                      <span tyle="font-size:18px" class="el-icon-arrow-up" @click='subsidy=false' v-if='subsidy'></span>
                     </span>

                    <el-form-item v-show='subsidy'>
                          
                
                        

                             <span class="line"></span>
                              <span style="">
                            <span style="margin-right:0px;">生源奖</span>
                      <el-input style="width:130px; margin-left: 7px;" v-model="stuAward" ></el-input> 元
                          </span> 

                          <span class="line"></span>
                              <span style="">
                            <span style="margin-right:0px;">勋章奖励</span>
                      <el-input style="width:130px; margin-left: 7px;" v-model="subsidyMedal" ></el-input> 元
                          </span> 
                          
                           <span class="line"></span>
                              <span style="">
                            <span style="margin-right:0px;">其他补助</span>
                      <el-input style="width:130px; margin-left: 7px;" v-model="subsidyOther" ></el-input> 元
                          </span>
                               <span class="line"></span>
                              <span style="">
                            <span style="margin-right:0px;">班车补助</span>
                      <el-input style="width:130px; margin-left: 7px;" v-model="subsidyShuttle" ></el-input> 元
                          </span> 
                           
                         

                    </el-form-item>   


                    <el-form-item v-show='subsidy'>
                          
                
                         <span>
                            <span style="word-spacing:10px;margin-right:0px;">加班补助</span>
                    
                       <el-input style="width:130px;margin-left: 7px;"v-model='subsidyOvertime' class="color_sl"></el-input> 元
                           </span>

                        

                       
                           <br>
                          <!-- <span style="color:red;display:inline-block;cursor: pointer" @click='subsidy=false'>收起 <i class="el-icon-arrow-up"></i> </span> -->

                    </el-form-item>  



                     













                   
                    <el-form-item style="">
                         
                         
                       
                         
                        

                    </el-form-item>
                    
                    <el-form-item>
                         <span style="word-spacing:9px">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <el-button @click="update1" class="close" style="margin-bottom:20px; width:270px; margin-left:25%;"  type="primary">提  交</el-button>
                    </el-form-item>
                  </el-form>
               
              </div>

                
             

        </div>

      </el-dialog>
<!-- </div> -->
<!-- 设置薪资 个税 -->
        <el-dialog

          :visible.sync="setOptDialog"
          width="1200px"
          :before-close="handleClose">
              <div class="top">
                           <span class="top_text">设置薪资参数</span>
                           <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                             <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="setOptDialog = false">
                           </div>
              </div>
                <div style="padding-left:30px">
                       <el-form  >
                    <el-form-item >
                
                         <span>
                        
                        <span style="margin-right:0px;">个税起征点 </span>
                    
                    <el-input style="width:170px;margin-left: 20px;" v-model='taxIncome' placeholder="3500"></el-input> 元
                      </span>
                <span class="line"></span>
                         <span>
                            <span style="word-spacing:10px;margin-right:10px;">默认个税税率</span>
                    
                       <el-input style="width:170px;margin-left: 0px;"v-model='grsu'placeholder="10" class="color_sl"></el-input> %
                           </span>
                    </el-form-item>
                  
               
                                 
                    <!--   <div style="margin-left:66px;margin-bottom:20px;">
                         <template>
                                    <el-radio v-model="radio" label="1" style="font-size:12px;">农村户口</el-radio>
                                    <el-radio v-model="radio" label="2">城镇户口</el-radio>
                                  </template>

                      </div> -->
                                 

                    <el-form-item>
                         
                          <span><span style="margin-right:10px;">失业保险税率 </span>
                     
                      <el-input style="width:170px;" v-model='sy'placeholder="0.2"></el-input> %
                          </span>
                           <span class="line"></span>
                          <span>
                            <span style="margin-right:10px;">医疗保险税率 </span>
                   
                      <el-input style="width:170px;" v-model='yliao'placeholder="2"> </el-input> %
                          </span>

                    </el-form-item>  
                  
                    <el-form-item>

                         
                      <span>
                        <span style="margin-right:10px;">生育保险税率 </span>
                  
                       <el-input style="width:170px;"v-model='sybx' placeholder="0.8"></el-input> %
                      </span>
                       <span class="line"></span>
                      <span>
                          <span style="margin-right:10px;">工伤保险税率 </span>
                     
                       <el-input style="width:170px;"v-model='gs' placeholder="0.4"></el-input> %
                      </span>
                    </el-form-item>
                   
                    <el-form-item>
               
                          
                          <span>
                            <span style="word-spacing:3px;margin-right:10px;">公积金税率</span>
                     
                     <el-input style="width:170px;margin-left: 14px;"v-model='gjj'placeholder="10"></el-input> %
                          </span>
                            <span class="line"></span>

                               <span>

                        <span style="margin-right:10px;">养老保险税率 </span>
                    
                    <el-input style="width:170px;margin-left: 5px;" v-model='yl' placeholder="8"></el-input> %
                      </span>
                      
                           
                         

                    </el-form-item>
                
                    
             
                  </el-form>
                  <div>
                    超过<el-input style="width:90px;margin-left: 5px;" v-model='passNo' ></el-input>
                    至<el-input style="width:90px;margin-left: 5px;" v-model="toNo"></el-input>，
                    税率为<el-input style="width:50px;margin-left: 5px;" v-model='taxRate' ></el-input>%,
                    速算扣除数为<el-input style="width:80px;margin-left: 5px;" v-model='theNo'></el-input>
                    <el-button type="primary" icon="el-icon-plus" circle @click='Identity'></el-button>
                     <ul style="width: 300px;margin: 0 auto;">
                      <li v-for="(item,index) in addSetArry"  style="font-size:10px"> 超过{{item.pass}}至{{item.to}}的部分，税率为{{item.taxRate}}%，速算扣除数为{{item.theNo}} 
                        <!-- <el-button type="info" icon="el-icon-delete" circle @click="handleDelete1(index)"></el-button> -->
                        <i class="el-icon-delete" @click="handleDelete1(index)"></i>
                      </li>
                    </ul>
                  </div>
                  


                </div>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="update1" class="close" style="margin-bottom:20px; width:270px;    margin-right: 174px;" type="primary">提  交</el-button>
          </span>
        </el-dialog>
<!-- 编辑教师薪资  end-->
  <el-dialog
                 
                  :visible.sync="dialogVisible"
                  width="600px"
                  :before-close="handleClose">
                    <div class="top">
                   <span class="top_text">编辑状态</span>
                   <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                     <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
                   </div>
                </div>
                  <div style="margin:0 auto; width:300px; height:300px; ">
                    <div>
                       日期 <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                    </div>
                   <div style="margin-top:20px">
                     状态 <el-select v-model="value2" placeholder="请选择" @change='choses' >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                   </div>

                   <div style="margin-top:20px" v-show="abc">
                             <el-switch
                  v-model="value19"
                  active-text=" 毕业"
                  inactive-text="没有毕业"
                  style="margin-bottom:30px;"
                  >
                </el-switch>
                   </div>

                   <div style="margin-top:20px" v-show="abc">
                             <el-switch
                  v-model="value20"
                  active-text=" 转正"
                  inactive-text="试用"
                  style="margin-bottom:30px;"
                  >
                </el-switch>
                   </div>

                <el-button type="primary" @click="statePost" style='width:200px;margin:0 auto;margin-left: 50px;'>确 定</el-button>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->

                    
                  </span>
                </el-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            return {
              subsidy:false,
              personCut:false,
              cutModel:false,
              companyShow:false,
               addSetArry:[],
              showDialog:false,
              dialogVisible:false,
              setOptDialog:false,
                isShow:false,
                abc:true,
                value1:'',
                value2:'',
                value19:'',
                value20:'',
                tableData:[],
                rowId:0,
                id:0,
                name:'',
                job:'',            
                radio: '1',
                passNo:0,
                toNo:0,
                taxRate:0,
                theNo:0,


                 current_page: 0,
                 currentPage:1,
                      pagesize:10,
                count: 100,
                teacherSocialSecurityId:0,
                actorId:0,
                options:[{
                  value:'LEAVEBY',
                  label:'离职'
                },{
                  value:'JOINBY',
                  label:'转正'
                },],

               accumulationFun: 0,
               actorI: 0,
                actualPayrol: 0,
                bankI: "",
                companyBorth: 0,
                companyEndowment: 0,
                companyFunds: 0,
                companyHurt: 0,
                companyMedical: 0,
                companyPay: 0,
                companyUnemployee: 0,
                cutAffair: 0,
                cutAttend: 0,
                cutMeal: 0,
                cutOther: 0,
                cutSick: 0,
                name: "",
                other: 0,
                personCutFivesalay: 0,
                personFundsHouse: 0,
                personInsuranceEndowment: 0,
                personInsuranceMedical: 0,
                personInsuranceUnemployee: 0,
                personTax: 0,
                personTaxAfterSalary: 0,
                remark: "",
                salary: 0,
                salaryAge: 0,
                salaryPayment: 0,
                salaryPerf: 0,
                salarySubtotal: 0,
                salayTotal: 0,
                socilaBaseEndoUnemp: 0,
                socilaBaseHurtBorthMedic: 0,
                stuAward: 0,
                subsidyMedal: 0,
                subsidyOther: 0,
                subsidyOvertime: 0,
                subsidyShuttle: 0,
                taxIncome: 0,
                totalCost: 0,
                type: "",
                unTax: 0,
                putActorId:'',

            }

            },
          methods:{
            handleDelete1(index){
          
              console.log("handleDelete index",index);
             this.addSetArry.splice(index, 1)
            },
            Identity(){
            this.addSetArry.push({
               pass:this.passNo, //超过
                to:this.toNo,    //至
                taxRate:this.taxRate, //税率
                theNo:this.theNo,    //扣除数
                
            });


        
            console.log("IdentityArry",this.addSetArry)
            // $("#newtype").css("display","none");
          },
           formatSex: function (row, column) {
            // console.log('-------formatDate------------',row.periodDiscounts)
                return row.teacherSocialSecurity.type == "JOINBY" ? '转正' : row.teacherSocialSecurity.type == "LEAVEBY" ? '离职' : "未知";

            },
            choses(){
            console.log('value2',this.value2)
            if (this.value2=='LEAVEBY') {
              this.value20=true
              this.value19=false
              this.abc=false

            }else if (this.value2=='JOINBY') {
              this.abc=true
            }
          },
            getData(){
                   this.$http({
                    method: 'get',
              
                    url: this.$getApi+'employee/management/querySocialSecurity',
                    headers: {
                        
                        'Authorization': 'Bearer ' + localStorage.token
                  }
                }).then((res) => { 
                    const {body} = res

                    console.log("====get teacherMsg ======",res); 

                    this.tableData=res.body; 
                    console.log('屏宽',document.body.clientWidth)
                    console.log('屏分辨率',window.screen.width)
                    if(1300<document.body.clientWidth<1500){
                      console.log('23322222222222222222222222')
                        $('.top').width="108%!important;"
                    }
                })
          },
                    handleSizeChange: function (size) {
                      this.pagesize = size;
                    },
                    handleCurrentChange: function(currentPage){
                        this.currentPage = currentPage;
                    },

                    statePost(){
                    
                     var d = Date.parse(this.value1)
                     console.log(d)
               this.$http.put(
                     this.$getApi+'revenue/tsss/update/' + this.rowId,
                     {
                        "date": d ,
                        "folw": this.value2,
                        "id": this.actorId,
                        "isGraduate": this.value19,
                        "isTransform": this.value20
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
                      message: '失败，',
                      type: 'error'
                    }); 
                })
                    },
                  addData(){
         
              console.log('5555555555555555',this.Gongjj)
              
                     this.$http.post(
                  
                    this.$getApi+'revenue/tsss/create',
                    {
                        
                       "accumulationFund": this.accumulationFund,
                        "actorId": this.putActorId,
                        "actualPayroll":this.actualPayroll,
                        "bankId": this.bankId,
                        "companyBorth": this.companyBorth,
                        "companyEndowment":this.companyEndowment,
                        "companyFunds": this.companyFunds,
                        "companyHurt": this.companyHurt,
                        "companyMedical":this.companyMedical,
                        "companyPay": this.companyPay,
                        "companyUnemployee": this.companyUnemployee,
                        "cutAffair": this.cutAffair,
                        "cutAttend": this.cutAttend,
                        "cutMeal": this.cutMeal,
                        "cutOther": this.cutOther,
                        "cutSick": this.cutSick,
                        "name": this.name,
                        "other": this.other,
                        "personCutFivesalay":this.personCutFivesalay,
                        "personFundsHouse": this.personFundsHouse,
                        "personInsuranceEndowment": this.personInsuranceEndowment,
                        "personInsuranceMedical": this.personInsuranceMedical,
                        "personInsuranceUnemployee": this.personInsuranceUnemployee,
                        "personTax": this.personTax,
                        "personTaxAfterSalary": this.personTaxAfterSalary,
                        "remark": this.remark,
                        "salary": this.salary,
                        "salaryAge": this.salaryAge,
                        "salaryPayment": this.salaryPayment,
                        "salaryPerf": this.salaryPerf,
                        "salarySubtotal":this.salarySubtotal,
                        "salayTotal": this.salayTotal,
                        "socilaBaseEndoUnemp": this.socilaBaseEndoUnemp,
                        "socilaBaseHurtBorthMedic": this.socilaBaseHurtBorthMedic,
                        "stuAward": this.stuAward,
                        "subsidyMedal": this.subsidyMedal,
                        "subsidyOther": this.subsidyOther,
                        "subsidyOvertime": this.subsidyOvertime,
                        "subsidyShuttle": this.subsidyShuttle,
                        "taxIncome": this.taxIncome,
                        "totalCost": this.totalCost,
                        "type": "JOINBY",//this.value2
                        "unTax": this.unTax
                    },


  // "accumulationFund": 0,
  // "actorId": this.actorId,
  // "actualPayroll": 0,
  // "bankId": "string",
  // "companyBorth": 0,
  // "companyEndowment": 0,
  // "companyFunds": 0,
  // "companyHurt": 0,
  // "companyMedical": 0,
  // "companyPay": 0,
  // "companyUnemployee": 0,
  // "cutAffair": 0,
  // "cutAttend": 0,
  // "cutMeal": 0,
  // "cutOther": 0,
  // "cutSick": 0,
  // "name": "string",
  // "other": 0,
  // "personCutFivesalay": 0,
  // "personFundsHouse": 0,
  // "personInsuranceEndowment": 0,
  // "personInsuranceMedical": 0,
  // "personInsuranceUnemployee": 0,
  // "personTax": 0,
  // "personTaxAfterSalary": 0,
  // "remark": "string",
  // "salary": 0,
  // "salaryAge": 0,
  // "salaryPayment": 0,
  // "salaryPerf": 0,
  // "salarySubtotal": 0,
  // "salayTotal": 0,
  // "socilaBaseEndoUnemp": 0,
  // "socilaBaseHurtBorthMedic": 0,
  // "stuAward": 0,
  // "subsidyMedal": 0,
  // "subsidyOther": 0,
  // "subsidyOvertime": 0,
  // "subsidyShuttle": 0,
  // "taxIncome": 0,
  // "totalCost": 0,
  // "type": "LEAVEBY",
  // "unTax": 0

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
                    
                }).catch((res) =>{
                    this.$message({
                      message: '失败，',
                      type: 'error'
                    }); 
                })



                  this.showDialog=false

          },
             handleEdit1(index,row){
             this.rowId=row.id;
              this.actorId=row.actorId;
              this.name=row.name
             this.teacherSocialSecurityId=row.teacherSocialSecurityId
              this.dialogVisible=-true
          },
          handleEdit(index,row){
 

              console.log(row);
              console.log(row.id);
              this.rowId=row.id;
              this.actorId=row.actorId;
              this.putActorId=row.teacherSocialSecurity.actorId
              this.name=row.name
             this.teacherSocialSecurityId=row.teacherSocialSecurity.id


              this.isShow=true;
              // console.log(index)
              console.log(row)
 



          },

            handelClose(){
            this.isShow=false,
            console.log('222222222222');
          },

            update1(){
             if (this.teacherSocialSecurityId==0) {
                // 添加老师
                this.addData();
                 this.isShow=false
                console.log("00000000")
              }else if (this.teacherSocialSecurityId!=0) {
                // 编辑老师
                this.upDate();
                 this.isShow=false
                 console.log("111111111")


              }
          },
          upDate(){


         
                   //   <!-- name 名字 -->
                   // <!-- taxIncome 个税起征点 -->
                   // <!-- paymoney 薪资待遇 -->
                   // <!-- yl 养老保险税率 -->
                   // <!-- sy 失业保险税率 -->
                   // <!-- yliao  医疗保险税率 -->
                   // <!-- sybx 生育保险税率 -->
                   // <!-- gs 工伤保险税率 -->
                  
                   // <!-- grsu 个税税率 -->
             

               this.$http.put(
                     this.$getApi+'revenue/tsss/update',
                     {
                        
                

                        "accumulationFund": this.accumulationFund,
                        "actorId": this.putActorId,
                        "actualPayroll":this.actualPayroll,
                        "bankId": this.bankId,
                        "companyBorth": this.companyBorth,
                        "companyEndowment":this.companyEndowment,
                        "companyFunds": this.companyFunds,
                        "companyHurt": this.companyHurt,
                        "companyMedical":this.companyMedical,
                        "companyPay": this.companyPay,
                        "companyUnemployee": this.companyUnemployee,
                        "cutAffair": this.cutAffair,
                        "cutAttend": this.cutAttend,
                        "cutMeal": this.cutMeal,
                        "cutOther": this.cutOther,
                        "cutSick": this.cutSick,
                        "name": this.name,
                        "other": this.other,
                        "personCutFivesalay":this.personCutFivesalay,
                        "personFundsHouse": this.personFundsHouse,
                        "personInsuranceEndowment": this.personInsuranceEndowment,
                        "personInsuranceMedical": this.personInsuranceMedical,
                        "personInsuranceUnemployee": this.personInsuranceUnemployee,
                        "personTax": this.personTax,
                        "personTaxAfterSalary": this.personTaxAfterSalary,
                        "remark": this.remark,
                        "salary": this.salary,
                        "salaryAge": this.salaryAge,
                        "salaryPayment": this.salaryPayment,
                        "salaryPerf": this.salaryPerf,
                        "salarySubtotal":this.salarySubtotal,
                        "salayTotal": this.salayTotal,
                        "socilaBaseEndoUnemp": this.socilaBaseEndoUnemp,
                        "socilaBaseHurtBorthMedic": this.socilaBaseHurtBorthMedic,
                        "stuAward": this.stuAward,
                        "subsidyMedal": this.subsidyMedal,
                        "subsidyOther": this.subsidyOther,
                        "subsidyOvertime": this.subsidyOvertime,
                        "subsidyShuttle": this.subsidyShuttle,
                        "taxIncome": this.taxIncome,
                        "totalCost": this.totalCost,
                        "type": this.value2,//this.value2
                        "unTax": this.unTax
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
                      message: '失败，',
                      type: 'error'
                    }); 
                })
                this.isShow=false
          },
               handleDelete(index,row){
                console.log('9999999',row.id);
                this.tableData.splice(index, 1)
                this.$http.delete(
                    
                    this.$getApi+'revenue/tsss/delete/'+row.id,
                  
                    {
                      headers:{
                  
                        
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                   
                    console.log("===body=add==teacher====",res);
                    this.$message({
                      message: '成功',
                      type: 'success'
                    }); 
                }).catch((res) =>{
                    this.$message({
                      message: '失败，',
                      type: 'error'
                    }); 
                })
          }





        },
        mounted(){
          this.getData();
                 this.$http({
                    method: 'get',
              
                    url: this.$getApi+'revenue/tsss/findAll?page=1',
                    headers: {
                        
                        'Authorization': 'Bearer ' + localStorage.token
                  }
                }).then((res) => { 
                    const {body} = res

                    console.log("====revenue/payoutType/findAll ======",res); 

              
                     
                   
                    
                })
          
        }
    }
</script>
<style scoped>
.el-table__header-wrapper thead div{
    background-color: #42acf6;
}
.el-table th{
    background-color: #42acf6!important;
}
.tag_mian{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}
.el-dialog__header{
  padding: 0 !important;
}


 .tag_content{
        /*margin-left: 36%;*/
        margin-top: -3%;
        width: 100%;
        /*height: 600px;*/
        background-color: #fff;
        /*overflow: scroll;*/
        /*height: 500px;*/
        position: absolute;
        top:0;
        left: 0;
      }

.tag_header{
        width: 100%;
        height: 50px;
        background-color: #61bfff;
        margin-bottom: 28px;
      }
   .addMoney{
        display: inline-block;
        font-size: 24px;
        color: #fff;
        line-height: 50px;
        font-weight: 700;
        /*margin-left: 40%;*/
      } 
       .closeX{
        display: inline-block;
        height: 35px;
        width: 35px;
        float: right;
        margin-top: 8px;
        margin-right: 8px;
      }
      .line{
        margin-left: 7px;
        margin-right: 7px;
        padding: 0px !important;
      }
      div[class*="color_sl"] >.el-input__inner{
        color: #ccc!important;
      }
      .el-table_1_column_1[class*="is-leaf"]{
        border-right: 1px!important;
      }
      .tags{
        margin-right: 10px;
      }

</style>