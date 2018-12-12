<template>
    <div class="content1" v-loading="loading2"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
      <div style="width:102.5%; height:50px;margin-top:15px;margin-bottom:0px;margin-left:-20px; padding-right:25px; line-height:40px;">
            
            <span id="zdtj"></span>
            <!-- <el-select v-model="value">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input v-model="input" placeholder="请输入内容" class="search"></el-input>
              <el-button type="primary">查询</el-button> -->
              
       
        <el-button type="primary" id="newbtn" @click='newVisible = true' style="margin-right:4px; margin-top:2px; float:right">新增科目</el-button>
          <vue-xlsx-table @on-select-file="handleSelectedFile">excel导入</vue-xlsx-table>
      </div>
   
        <div ></div>
        <div class="c_content">
            <el-table
               :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                border
                style="width: 100%; margin-top:-15px;">
                <el-table-column
                  fixed
                  prop=""
                  align="center"
                  label=""
                  width="1"
                 >
                </el-table-column>

                <el-table-column
                  fixed
                  prop="id"
                  align="center"
                  label="费种ID"
                 >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="名称"
                  align="center"
                  >
                </el-table-column>
                <el-table-column
                  prop="amount"
                  align="center"
                  label="原始金额"
                  >
                </el-table-column>


                <el-table-column
                  prop="periodDiscounts"
                  align="center"
                  label="金额周期"
                  :formatter="formatDate"
                  >
                  <template>
                      
                  </template>

                </el-table-column>

              <!--   <el-table-column
                  prop="periodDiscounts"
                  align="center"
                  label="周期"
                  :formatter="formatDate"
                  width="110">
                  <template>
                      
                  </template>

                </el-table-column> -->
                <el-table-column
                  prop="pDiscounts"
                  align="center"
                  label="周期折扣"
                 
                  >
                  <template>
                      
                  </template>

                </el-table-column>
              <!--   <el-table-column
                  prop="identDiscounts"
                  align="center"
                  label="应用类型"
                  width="110">
                  
                  <template>
                      
                  </template>

                </el-table-column> -->

                <el-table-column
                  prop="iDiscounts"
                  label="应用类型折扣"
                  align="center"
                  
                 >
                  
                  

                </el-table-column>
                
                <el-table-column
              
                  label="操作"
                  align="center"
                  width="190">
                  <template slot-scope="scope">

                    <el-button @click="handleClick(scope.$index,scope.row)" type="danger" size="small">删除</el-button>
                    <el-button type="primary" size="small" id="com" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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

    <!-- 编辑 star -->
        <el-dialog

        :visible.sync="dialogVisible"
        width="585px"
        :before-close="handleClose">
       
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">编辑</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
       <el-form ref="form" :model="form" label-width="80px" class='el_content
       '>

 <!-- <div class="name">
            <span>名&nbsp;&nbsp;称: </span><el-input v-model="name"  type="input" placeholder="请输入费用种类名字" class="name_inpt"></el-input>

        </div> -->
          <div class="allplus"  id="newtype">
          <div class="newtype">
            <p>新增身份类型折扣</p>
           
            <div class="margin">
                身份类型 : <el-select v-model="valued11" placeholder="请选择" class="ns_inpt" type="input" align="center">
                    <el-option
                      v-for="item in opt11"
                      :key="item.valued11"
                      :label="item.label11"
                      :value="item.valued11">
                    </el-option>
                  </el-select>
            </div>
            <div class="margin">
                折 扣 率 : <el-input v-model="inputinit" type="input" placeholder="以百分比为单位" class="ns_inpt"></el-input>

            </div>
            <div class="margin">
                <el-button type="primary" class="mainbtn"  @click="Identity">添加折扣</el-button>
                <el-button type="primary" class="mainbtn1" @click="cancel">取消</el-button>
            </div>

        </div>

        </div>

         <el-form-item label="名 称:">
                    <el-input class="name_inpt" v-model="form.name"></el-input>
         </el-form-item>




        <el-form-item label="金额周期:">
                  <el-select placeholder="周期性" v-model='valu' class="name_inpt">
              <el-option
                v-for="item in option"
                :key="item.valu"
                :label="item.label"
                :value="item.valu">
              </el-option>
            </el-select>
         </el-form-item>








         <!-- -->


           <el-form-item label="原始金额:">
                    <el-input class="name_inpt" v-model="form.amount"></el-input>
         </el-form-item>


    

          <el-form-item label="时间周期:">
                  <el-select placeholder="时间周期" class="name_inpt2" v-model='val' id="disab">
              <el-option
                v-for="item in opt"
                :key="item.val"
                :label="item.label"
                :value="item.val">
              </el-option>
            </el-select>
            <el-button type="primary" @click="innerVisible=true" >添加折扣</el-button>
            <ul style="text-align:right;width:296px;margin-top:15px;">
              <li v-for="(item,index) in periodShowArry">-------按 {{item.periodType|formatval}} 收费，折扣率 {{item.discountRate}}%-------- <i @click="handleDeleteDis(index)" class="el-icon-error"></i>
              </li>
            </ul>
         </el-form-item>




        

  
        
        
          <el-form-item label="身份类型:">
                  <el-select placeholder="身份周期" v-model='valued' class="name_inpt2" id="disab">
              <el-option
                v-for="item in optionss"
                :key="item.valued"
                :label="item.label"
                :value="item.valued">
              </el-option>
            </el-select>
             <el-button type="primary" @click="identVisible=true">添加折扣</el-button>
            <ul  style="text-align:right;width:296px;margin-top:15px;">
              <li v-for="(item,index) in identShowArry">-------按 {{item.identType|formatvalue}} 收费，折扣率 {{item.discountRate}}% <i @click="handleDeleteIden(index)" class="el-icon-error"></i>
              </li>
            </ul>
         </el-form-item>

<!-- abcdef -->

    <el-form-item label="退费规则:">

       <div class="kaoqin" style="margin-left:-4px;" >
          <!-- 考勤规则 -->
          <div style=" margin-bottom:10px; margin-left:2px;">
         
                  <el-select v-model="kq_value" placeholder="实际考勤" style="width:124px" @change="changeValue" class="back_sty">
                        <el-option
                          v-for="item in kaoqinArry"
                          :key="item.kq_value"
                          :label="item.kq_value"
                          :value="item.kq_label"
                          no-data-text="实际考勤">
                        </el-option>
                      </el-select>

                      <el-select v-model="Bd_value" placeholder="大于" style="width:80px;margin:0 4px; ">
                        <el-option
                          v-for="item in BDArry"
                          :key="item.Bd_value"
                          :label="item.Bd_value"
                          :value="item.Bd_label"
                          :disabled="item.disabled">
                        </el-option>
                      </el-select>
                       
                       <!-- <el-input-number v-model="R_one" controls-position="right" @change="handleChange" :min="1" :max="10" style="width:120px;" ></el-input-number> -->
                       <el-input-number v-model="R_one" controls-position="right"  @change="handleChange" :min="2" :max="32" style="width:120px;"></el-input-number>

                       <span v-show='tian'>(天)</span><span v-show='ci'></span> 
                       
          </div>
<!-- 年度请假 -->
          <div style="margin-left:4px; margin-bottom:-10px;" v-show='ci'>
             <!-- <span class="font_col">退费规则: </span> -->
                  <el-select v-model="vacateArry[0].V_value"  style="width:124px;">
                        <el-option
                          v-for="item in vacateArry"
                          :key="item.V_value"
                          :label="item.V_value"
                          :value="item.V_label"
                          >
                        </el-option>
                      </el-select>

                      <el-select v-model="V_bd_value" placeholder="等于" style="width:80px;margin:0 4px; ">
                        <el-option
                          v-for="item in V_bdArry"
                          :key="item.V_bd_value"
                          :label="item.V_bd_value"
                          :value="item.V_bd_label">
                        </el-option>
                      </el-select>
                       
                       <!-- <el-input-number v-model="V_bd_num"  controls @change="handleChange" :min="1" :max="10" style="width:120px;" ></el-input-number> -->
                          <el-input-number v-model="V_bd_num" controls-position="right"  @change="handleChange" :min="1" :max="10" style="width:120px;"></el-input-number>
                       <!-- <span v-show='tian'>(天)</span> --><span >(次)</span> 
                      <br>
                      <br>

          </div>
          <!-- 单月退还 -->
                   <div style="margin-left:4px;">
                     
                          
                      <el-select v-model="danMonth[0].D_value" placeholder="单月退还" style="width:124px" @change='test'>
                        <el-option
                          v-for="item in danMonth"
                          :key="item.D_value"
                          :label="item.D_value"
                          :value="item.D_label">
                        </el-option>
                      </el-select>

                       <el-select v-model="R_value" placeholder="比例" style="width:80px; margin:0 5px;" @change='test'>
                        <el-option
                          v-for="item in ruleArry"
                          :key="item.R_value"
                          :label="item.R_value"
                          :value="item.R_label">
                        </el-option>
                      </el-select>
                      
                      <el-input-number v-model="R_two" controls-position="right"  @change="handleChange" :min="1" :max="10000" style="width:120px; margin-left:-1px;"></el-input-number>
                        <span v-show='yuan'>(元)</span><span v-show='baifenhao'>(%)</span> 
                      
                        <el-button type="primary" @click="addBackRule" ><i class="el-icon-plus" circle></i></el-button>


                   </div>    
     
                    

           
                    <ul style="margin-top:10px;width:400px; text-align:right;">

                      <li v-for="(item,index) in backRuleArry" style="color:#aaaaaa;font-size:16px; line-height:30px;">
                        {{item.kq_value}}{{item.Bd_value|formatStatus}}{{item.R_one}}<span v-show='tian'>(天)</span> 时 


                        <span>{{V_value}}{{item.V_bd_value|formatStatus}} {{item.V_bd_num}} <span v-show='ci'></span></span>

                        单月退还 {{item.R_value|formattype}}{{item.R_two}} <i @click="paybackDelete(index)" class="el-icon-error"></i>

                        
                      </li>                     
                    </ul>
        </div> 
             <ul  style="text-align:right;width:296px;margin-top:15px;">
                  <li v-for="(item,index) in paybackBySemestersArry">学期请假次数{{item.countCompareType|formatStatus}} {{item.vacationCount}}次请假天数{{item.daysCompareType|formatStatus}}{{item.vacationDays}}天 时,退还{{item.pType|formattype}}为{{item.pValue}} <i @click="deletePaybackBySemesters(index)" class="el-icon-error"></i>
                  </li>
                </ul>
                 <ul  style="text-align:right;width:296px;margin-top:15px;">
                  <li v-for="(item,index) in paybackByDaysArry">考勤天数{{item.compareType|formatStatus}}{{item.pDay}}天时，退还{{item.pType|formattype}}为{{item.pValue}} <i @click="deletePaybackByDays(index)" class="el-icon-error"></i>
                  </li>
                </ul>


     </el-form-item>

      




 </el-form>


 <!-- 编辑end -->
 <!--编辑 内层周期折扣 -->
  <el-dialog
      width="544px"
      
      :visible.sync="innerVisible"
      append-to-body>
       <div  style="width:100% !important;  height: 55px;
    background-color: #9dd8f9;
    margin-top: -55px;
   
    margin-bottom: 50px;">
             <span class="top_text">增加周期折扣</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
             <img src="../../assets/close3.png" height="48" width="48" class="closeImg"@click="innerVisible = false">
           </div>
          </div>

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">增加周期折扣</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="innerVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
<div>
  <div>
        <div class="all_1">
        <div class="newseal">
            <!-- <p style="margin-left:-140px;">增加周期折扣</p> -->
           
            <div class="margin">
                周&nbsp; &nbsp;期 : <el-select v-model="val11" placeholder="请选择" class="ns_inpt" type="input">
                    <el-option
                      v-for="item in option11"
                      :key="item.val11"
                      :label="item.label11"
                      :value="item.val11">
                    </el-option>
                  </el-select>
            </div>
            <div class="margin">
               折扣率 : <el-input v-model="inputinit_" type="input" placeholder="以百分比为单位" class="ns_inpt"></el-input>
            </div>
            <div class="margin" style="padding-bottom:20px">
                <el-button type="primary" @click="crcle" style="margin-left:64px; ">添加折扣</el-button>
                 <!-- <el-button type="primary" style="width:100px;" @click="innerVisible=false">取消</el-button> -->
            </div>

        </div>
        </div>
    </div>



</div>

    </el-dialog>
   <!-- 编辑 内层身份折扣 -->
 
     
      <el-dialog
      width="544px"
    
      :visible.sync="identVisible"
      append-to-body>

  

           <div  style="width:100% !important;  height: 55px;
    background-color: #9dd8f9;
    margin-top: -55px;
   
    margin-bottom: 50px;">
             <span class="top_text">新增身份类型折扣</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
             <img src="../../assets/close3.png" height="48" width="48" class="closeImg"@click="identVisible = false">
           </div>
          </div>


 <div style="margin-left:180px;margin-top:-20px;">
  
   
     
          
           
            <div class="margin" style="margin-left:-27px;">
                身份类型 : <el-select v-model="valued11" placeholder="请选择" class="ns_inpt"  type="input" align="center">
                    <el-option
                      v-for="item in opt11"
                      :key="item.valued11"
                      :label="item.label11"
                      :value="item.valued11">
                    </el-option>
                  </el-select>
            </div>
            <div class="margin">
                折 扣 率 : <el-input v-model="inputinit" type="input" placeholder="以百分比为单位" class="ns_inpt"></el-input>

            </div>
            <div class="margin" style="padding-bottom:20px">
                <el-button type="primary" style="width:96px;margin-left:64px;" @click="Identity">添加折扣</el-button>
                <!-- <el-button type="primary" style="width:96px;" @click="identVisible=false">取消</el-button> -->
            </div>

        
 </div>
   
        

        
  






    </el-dialog>

  

<el-button type="primary" @click="putData" style="margin-left:32%; width:200px; margin-bottom:20px;">确 定</el-button>
        
      </el-dialog>

<!-- 新增费种 -->
      <el-dialog
          :visible.sync="newVisible"
          width="585px"
          
          :before-close="handleClose1">
           

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">新增科目</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="newVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
          <div style="width:100%;height:auot; margin-bottom:30px;padding-bottom:30px;" id="newAdddeiz">
            
               <div class="content">
<div class="tabel">
  <!-- 新增身份类型折扣 弹出框 -->
  <div class="allplus"  id="newtype">
          <div class="newtype">
            <p>新增身份类型折扣</p>
           
            <div class="margin">
                身份类型 : <el-select v-model="valued11" placeholder="请选择" class="ns_inpt" type="input" align="center">
                    <el-option
                      v-for="item in opt11"
                      :key="item.valued11"
                      :label="item.label11"
                      :value="item.valued11">
                    </el-option>
                  </el-select>
            </div>
            <div class="margin">
                折 扣 率 : <el-input v-model="inputinit" type="input" placeholder="以百分比为单位" class="ns_inpt"></el-input>

            </div>
            <div class="margin">
                <el-button type="primary" class="mainbtn" @click="Identity">添加折扣</el-button>
                <!-- <el-button type="primary" class="mainbtn1" @click="cancel">取消</el-button> -->
            </div>

        </div>

        </div>
<!-- 新增身份类型折扣 弹出框  end-->

<!-- 新增周期折扣 弹出框 -->

<div class="allplus_1" id="allplus_1">
<div class="all">
        <div class="all_1">
        <div class="newseal">
            <p>新增周期折扣</p>
           
            <div class="margin">
                周&nbsp;&nbsp;期 : <el-select v-model="val11" placeholder="请选择" class="ns_inpt" type="input">
                    <el-option
                      v-for="item in option11"
                      :key="item.val11"
                      :label="item.label11"
                      :value="item.val11">
                    </el-option>
                  </el-select>
            </div>
            <div class="margin">
               折 扣 率 : <el-input v-model="inputinit_" type="input" placeholder="以百分比为单位" class="ns_inpt"></el-input>
            </div>
            <div class="margin">
                <el-button type="primary" class="mainbtn"  @click="crcle">添加折扣</el-button>
                 <!-- <el-button type="primary" class="mainbtn1" @click="cancel1">取消</el-button> -->
            </div>

        </div>
        </div>
    </div>
    </div>

<!-- 新增周期折扣 弹出框  end-->


<!-- 金额周期tag -->
<div class="sum" id="sum">
  <p><h1>周期性、一次性解释</h1> <br/> <br/>
<li>&nbsp;&nbsp;周期性是表示有周期性的费用种类 周期可以是 年、半年、季、月、日； </li> <br/>
             <li> &nbsp;&nbsp;一次性费用是指缴费一次后不用再次缴费的费用类型</li><br/>
           <li> 注：周期性费种折扣自选周期自选<br/>
                一次性缴费不提供折扣及周期选择</li></p>
<el-button type="primary" class="mainbtn1" @click="close">关闭</el-button>

</div>
<div class="sum1" id="sum1">
  <p><h1>后付费解释</h1> <br/> <br/>
    <li>孩子当月的开销及各种支出费用 在次月（可以具体到几号）结清当月金额</li>
</p>
<el-button type="primary" class="mainbtn1" @click="close1">关闭</el-button>

</div>

<!-- 金额周期tag  end-->
      <div class="title">
      <!-- <span class="header" >新增收费种类</span> -->
    </div>
        <div class="name">
            <span class="font_col">名&nbsp;&nbsp;称: </span><el-input v-model="name"  type="input" placeholder="请输入费用种类名字" class="name_inpt"></el-input>

        </div>


    
         <div class="amount">
            <div>
              <template><span class="ques" @click="question"></span>
                <el-radio-group v-model="radioNum" @change="cut" size="mini">
                <el-radio class="radio"  label="1">周期性</el-radio>
                <el-radio class="radio"  label="2">一次性</el-radio>
                <el-radio class="radio"  label="3">后付费</el-radio>
                </el-radio-group>
            <span class="ques1" @click="question1"></span>
            <!-- <el-checkbox v-model="checked" class="onebox" >后付费</el-checkbox> -->

              </template>
            </div>
            <span class="font_col">金额周期: </span>
            <span></span><el-select v-model="value11" type='input' class="name_inpt" align="center">
              <el-option
                v-for="item in options11"
                :key="item.value11"
                :label="item.label11"
                :value="item.value11"
                :disabled="item.disabled"
                align="center">
              </el-option>
            </el-select>

        </div>



         <div class="amount">
            <span class="font_col">原始金额: </span><el-input v-model="amount"  placeholder="请输入原始金额" type="input" class="name_inpt"></el-input>

        </div>


        <div class="zhouqi_sel1">

          <span class="font_col">时间周期: </span>
             <el-select v-model="val11" v-bind:disabled="disabledInput" placeholder="年" id="disab" type="input"  class="name_inpt2">
              <el-option
                v-for="item in option11"
                :key="item.val11"
                :label="item.label11"
                :value="item.val11">
              </el-option>
            </el-select>

            <el-button type="primary" class="zhekou_btn" @click='addszqzk' v-bind:disabled="disabledInput">添加折扣</el-button>


        </div>
        
        <div class="tis_li">
          <!-- <li> - - - - -  - - - -  按 月 收费，折扣率 0%- - - - - - - - -</li> -->

            <ul id="tis_ul">

              <li v-for="(item,index) in crcleArry">
                 - - -  - - - - - - -按{{item.periodType|formatval}} 收费，折扣率 {{item.discountRate}}%- - -  - - - -
                 <i @click="handleDelete1(index)" class="el-icon-error"></i>

              </li>
             
            </ul>
        </div>
         <div class="zhouqi_sel2">
          <span class="font_col">身份类型: </span>
             <el-select v-model="valued11" v-bind:disabled="disabledInput" placeholder="业主" id="disab" type="input" class="name_inpt2">
              <el-option
                v-for="item in opt11"
                :key="item.valued11"
                :label="item.label11"
                :value="item.valued11">
              </el-option>
            </el-select>

            <el-button type="primary" class="zhekou_btn" @click="addsth" v-bind:disabled="disabledInput">添加折扣</el-button>


        </div>
        
        <div class="tis_li">
          <!-- <li> - - - - -  - - - - -普通 收费，折扣率 0%- - - - - - - - -</li> -->
            <ul id="tis_ul1">
              <li v-for="(item,index) in IdentityArry">
                 - - -  - - - - - - -按{{item.identType|formatvalue}} 收费，折扣率 {{item.discountRate}}%- - -  - - - -
                  <i @click="handleDelete(index)" class="el-icon-error"></i>
              </li>
            
            </ul>
            
        </div>

        <div class="kaoqin" style="margin-left:-4px;" >
          <!-- 考勤规则 -->
          <div style=" margin-bottom:10px; margin-left:2px;">
            <span class="font_col">退费规则: </span>
                  <el-select v-model="kq_value" placeholder="实际考勤" style="width:124px" @change="changeValue" class="back_sty">
                        <el-option
                          v-for="item in kaoqinArry"
                          :key="item.kq_value"
                          :label="item.kq_value"
                          :value="item.kq_label"
                          no-data-text="实际考勤">
                        </el-option>
                      </el-select>

                      <el-select v-model="Bd_value" placeholder="大于" style="width:80px;margin:0 4px; ">
                        <el-option
                          v-for="item in BDArry"
                          :key="item.Bd_value"
                          :label="item.Bd_value"
                          :value="item.Bd_label"
                          :disabled="item.disabled">
                        </el-option>
                      </el-select>
                       
                       <!-- <el-input-number v-model="R_one" controls-position="right" @change="handleChange" :min="1" :max="10" style="width:120px;" ></el-input-number> -->
                       <el-input-number v-model="R_one" controls-position="right"  @change="handleChange" :min="0" :max="100" style="width:120px;"></el-input-number>

                       <span v-show='tian'>(天)</span><span v-show='ci'></span> 
                       
          </div>
<!-- 年度请假 -->
          <div style="margin-left:78px; margin-bottom:-10px;" v-show='ci'>
             <!-- <span class="font_col">退费规则: </span> -->
                  <el-select v-model="vacateArry[0].V_value"  style="width:124px;">
                        <el-option
                          v-for="item in vacateArry"
                          :key="item.V_value"
                          :label="item.V_value"
                          :value="item.V_label"
                          >
                        </el-option>
                      </el-select>

                      <el-select v-model="V_bd_value" placeholder="等于" style="width:80px;margin:0 4px; ">
                        <el-option
                          v-for="item in V_bdArry"
                          :key="item.V_bd_value"
                          :label="item.V_bd_value"
                          :value="item.V_bd_label">
                        </el-option>
                      </el-select>
                       
                       <!-- <el-input-number v-model="V_bd_num"  controls @change="handleChange" :min="1" :max="10" style="width:120px;" ></el-input-number> -->
                          <el-input-number v-model="V_bd_num" controls-position="right"  @change="handleChange" :min="0" :max="1000" style="width:120px;"></el-input-number>
                       <!-- <span v-show='tian'>(天)</span> --><span >(次)</span> 
                      <br>
                      <br>

          </div>
          <!-- 单月退还 -->
                   <div style="margin-left:127px;">
                     
                          
                      <el-select v-model="danMonth[0].D_value" placeholder="单月退还" style="width:124px" @change='test'>
                        <el-option
                          v-for="item in danMonth"
                          :key="item.D_value"
                          :label="item.D_value"
                          :value="item.D_label">
                        </el-option>
                      </el-select>

                       <el-select v-model="R_value" placeholder="比例" style="width:80px; margin:0 5px;" @change='test'>
                        <el-option
                          v-for="item in ruleArry"
                          :key="item.R_value"
                          :label="item.R_value"
                          :value="item.R_label">
                        </el-option>
                      </el-select>
                      
                      <el-input-number v-model="R_two" controls-position="right"  @change="handleChange" :min="0" :max="100000" style="width:120px; margin-left:-1px;"></el-input-number>
                        <span v-show='yuan'>(元)</span><span v-show='baifenhao'>(%)</span> 
                      
                        <el-button type="primary" @click="addBackRule" ><i class="el-icon-plus" circle></i></el-button>


                   </div>    
     
                    

                  <!--   console.log('..R_two..',this.R_two*1)//单月退还 后的数值
                    console.log('..R_one..',this.R_one) //考勤天数后的计数器
                    console.log('..kq_value..',this.kq_value)//考勤天数
                    console.log('..Bd_value..',this.Bd_value)//考勤天数后的不等号
                    // console.log('..R_one..',this.R_one)
                    console.log('..R_value..',this.R_value)//单月退还后的金额或比例
                    console.log('..V_value..',this.V_value) //年度请假
                    console.log('.. V_bd_value..',this.V_bd_value)//年度请假 后的不等号
                    console.log('..V_bd_num..',this.V_bd_num)//年度请假 后的计数器 -->




           
                    <ul style="margin-top:10px; margin-left:164px;width:400px; text-align:right;">

                      <li v-for="(item,index) in backRuleArry" style="color:#aaaaaa;font-size:16px; line-height:30px;">
                        {{item.kq_value}}{{item.Bd_value|formatStatus}}{{item.R_one}}<span v-show='tian'>(天)</span> 时 


                        <span>{{V_value}}{{item.V_bd_value|formatStatus}} {{item.V_bd_num}} <span v-show='ci'></span></span>

                        单月退还 {{item.R_value|formattype}}{{item.R_two}} <i @click="paybackDelete(index)" class="el-icon-error"></i>

                        
                      </li>                     
                    </ul>
        </div> 

        <div class="main_btn">

          <el-button type="primary" class="add_sth1" @click="reg(1)" style="margin-botton；20px;">添 加</el-button>
      
        </div>
</div>
<!-- 弹出框 -->
     
 
      </div>


           </div>
          
        </el-dialog>
   
   <!-- 删除提示 -->
<el-dialog

  :visible.sync="dialogMessage"
  width="30%"
  :before-close="handleClose">
 
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">删除</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogMessage = false">
             </div>
          </div>
          <!-- Newtitle  end-->
  <span>是否确认删除这条收费科目么？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogMessage = false">取 消</el-button>
    <el-button type="primary" @click="handelDeleteRow">确 定</el-button>
  </span>
</el-dialog>



        <div class="tags" id="btn_tag">
              <div class="compile">
                





                  <amendCy></amendCy>







                 <el-button class="btn_tag"  @click="handolTags">关闭</el-button>
              </div>


        </div>

    </div>
</template>
<script>

import amendCy from '../functions/amendCy.vue';
import Cyclediscount from '../functions/Cyclediscount.vue'


    export default {
        data(){
            return {
              currentPage:1,
                 pagesize:10,
              disArray:[],
              putDataId:0,
              paybackBySemestersArry:[],
              paybackByDaysArry:[],
              identVisible:false,
              innerVisible:false,
              identShowArry:[],
              periodShowArry:[],
              V_bd_num:1,
              V_bdArry:[{
                  V_bd_value:'等于',
                  V_bd_label:2,
              }],
            V_bd_value:'',

              vacateArry:[{
                V_value:'请假次数',
                V_label:2
              }],
              V_value:'',

              danMonth:[{
                D_value:'单月退还',
                D_label:'单月退还'
              }],

              D_value:'',
              R_one:1,
              R_two:0*1,
              tian:true,
              ci:false,
              yuan:false,
              baifenhao:true,
              kaoqinArry:[{
                kq_value:'考勤天数',
                kq_label:"考勤天数",
              },{
                kq_value:'学期请假',
                kq_label:"学期请假",
              },],
              kq_value:'',

              BDArry:[],
              Bd_value:'',

                ruleArry:[{
                  R_value:'金额',
                  R_label:1,
                },{
                  R_value:'比例',
                  R_label:2,
                },],
                R_value:'',

               options11: [{
              id:'1',
              value11: 'YEAR',
              label11: '年',
              disabled: true
            }, {
               id:'2',
              value11: 'HALF_YEAR',
              label11: '学期'
            }, {
               id:'3',
              value11: 'QUARTER',
              label11: '季'
            }, {
               id:'4',
              value11: 'MONTH',
              label11: '月'
            },  {
               id:'6',
              value11: 'ONCE',
              label11: '一次性'
            }],
            value11: '',

             option11: [{
               id:'1',
              val11: 'YEAR',
              label11: '年'
            }, {
               id:'2',
              val11: 'HALF_YEAR',
              label11: '半年',
              disabled:false
            }, {
              id:'3',
              val11: 'QUARTER',
              label11: '季',
              disabled:false
            }, {
              id:'4',
              val11: 'MONTH',
              label11: '月'
            }],
            val11: '',


             opt11: [{
              
              valued11: 'PROPRIETOR',
              label11: '业主'
            }, {
              
              valued11: 'MEMBER',
              label11: '员工'
            }, {
              
              valued11: 'USER',
              label11: '普通'
            }, {
              
              valued11: 'OTHERS',
              label11: '其他'
            }],
            valued11: '',


            radioNum:'1',
            disabledInput:false,
            amount:0,
            identDiscounts:[
                {
                  discountRate:0,
                  
                  identType:0,
                }
            ],
            name:'',
            periodDiscounts:[{
              discountRate:0,
              
              periodType:"",
              
            }],
            periodType:'',
          
            checked: false,

            inputinit:0,
            inputinit_:0,
            fullScreenLoading: false,
            crcleArry:[],
            IdentityArry:[],
            backRuleArry:[],
            daysPayBack:[],
            semestersPayback:[],
              newVisible:false,
                delId:0,
                dialogMessage:false,
                dialogVisible:false,
                options: [{
                  value: '选项1',
                  label: '费种'
                }, {
                  value: '选项2',
                  label: '名称'
                }],
                value: '',
                tableData: [],
                
                      id: '',
                      name: '',
                      amount: '',
                      periodDiscounts: '',
                      identDiscounts: '',

                      
                form: {
                    name: '',
                    amount:'',
                    id:''

                }, 
                 option: [{
                  valu: 'YEAR',
                  label: '年'
                }, {
                  valu: 'HALF_YEAR',
                  label: '半年'
                }, {
                   
                  valu: 'QUARTER',
                  label: '季'
                }, {
                   
                  valu: 'MONTH',
                  label: '月'
                }, {
                   
                  valu: 'DAY',
                  label: '日'
                }, {
                   
                  valu: 'ONCE',
                  label: '一次性'
                }],
                valu: '', 


                opt: [{
               id:'1',
              val: 'YEAR',
              label: '年'
            }, {
               id:'2',
              val: 'HALF_YEAR',
              label: '半年',
              disabled:false
            }, {
              id:'3',
              val: 'QUARTER',
              label: '季',
              disabled:false
            }, {
              id:'4',
              val: 'MONTH',
              label: '月'
            }],
            val: '',


            optionss: [{
              id:'1',
              valued: 'PROPRIETOR',
              label: '业主'
            }, {
              id:'2',
              valued: 'MEMBER',
              label: '员工'
            }, {
              id:'2',
              valued: 'USER',
              label: '普通'
            }],
            valued: '',
            delId:0,
            loading2:true,
   
                  
                    
            }
        },
        components:{
          'amendCy':amendCy,
          'Cyclediscount':Cyclediscount



         },
         filters: {
           formatStatus: function (val) {
              console.log(val)
              return val == 1 ? '大于' : val == 2 ? '等于' :val == 3 ? '小于' : val == "" ? '' :'未知';
          },formatval: function (val) {
              console.log(val)
              return val == "YEAR"  ? '年' : val == "HALF_YEAR"  ? '半年' :val == "QUARTER"  ? '季' :val == "MONTH"   ? '月' : '未知';
          },formatvalue: function (val) {
              console.log(val)
              return val == "PROPRIETOR"  ? '业主' : val == "MEMBER"   ? '员工' :val == "USER"   ? '普通' : '未知';
          },formattype: function (val) {
              console.log(val)
              return val == 1  ? '金额' : val == 2   ? '比例'  : '未知';
          },
      }, 
        methods:{
          // excel导入
      handleSelectedFile(convertedData){
        console.log(convertedData)
      },


           formatDate: function (row, column) {
            // console.log('-------formatDate------------',row.periodDiscounts)
        return row.periodDiscounts == "YEAR" ? '年' : row.periodDiscounts == "HALF_YEAR" ? '学期' :  row.periodDiscounts == "QUARTER" ? '季' :  row.periodDiscounts == "MONTH" ? '月': row.periodDiscounts == "DAY" ? '日': row.periodDiscounts == "ONCE" ? '一次性':"未知";

    },
     formatStyle: function (row, column) {
            // console.log('-------formatDate------------',row.periodDiscounts)
        return row.iDiscounts == ":%,:%" ? '暂无数据' :row.iDiscounts == "PROPRIETOR:10%,PROPRIETOR:10%" ? '业主:10%,业主:10%' :row.iDiscounts == "MEMBER:10%,MEMBER:10%" ? '员工:10%,员工:10%':row.iDiscounts == "PROPRIETOR:20%,PROPRIETOR:20%" ? '业主:20%,业主:20%':row.iDiscounts == "MEMBER:20%,MEMBER:20%" ? '员工:20%,员工:20%':"未知";  

    },
     formatSty: function (row, column) {
            // console.log('-------formatDate------------',row.periodDiscounts)
        return row.pDiscounts == ":%,:%" ? '暂无数据' :row.pDiscounts == "YEAR:20%,YEAR:20%" ? '年:20%,年:20%':row.pDiscounts == "QUARTER:20%,QUARTER:20%" ? '季:20%,季:20%':row.pDiscounts == "QUARTER:10%,QUARTER:10%" ? '季:10%,季:10%':"未知" ;

    },

            handleClose1(done) {
              this.newVisible=false;
      },
          getData(){
        console.log('==============')

        console.log('this.$store.state.add();',this.$store.state.sum);

        var addSum= this.$store.state.sum;


             this.$http({
                    method: 'get',
                    url:this.$getApi+'expense/entry',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                    this.disArray=res.body;
                  console.log('------------------',res.body)
                  var tableArray=[];

                  this.loading2=false
                   var iDiscounts=''
                  // for (var i = 0; i < res.body.identDiscounts.length; i++) {
                  //   iDiscounts+=identDiscounts[i]
                  // }
                res.body.forEach(function(item,index,array){
                 

                    tableArray.push({
                        id:item.id,
                        name:item.name,
                        amount:item.amount,
                        periodDiscounts:item.periodType,
                        pDiscounts:item.periodDiscounts,
                        iDiscounts:item.identDiscounts
                    })
                })

                    this.tableData=tableArray;
                    const {
                        body
                    } = res
                            
                    var constArray=[];
                    res.body.forEach(function(item, index, array){

 console.log("===---------------periodShowArry------------===",this.periodShowArry);
                    

// 用for 来做            


                      for(var z=0;z<res.body.length;z++){
                          console.log('qweqeq',res.body[z]) 
                      }











              
                        constArray.push({id: item.id,
                           name:item.name,
                           amount: item.amount,
                           periodDiscounts:item.periodType,
                           // identDiscounts:item.identDiscounts,
                        




                           pDiscounts:item.periodDiscounts[0].periodType + ':'+item.periodDiscounts[0].discountRate+'%,'+item.periodDiscounts[1].periodType + ':'+item.periodDiscounts[1].discountRate+'%',
                           iDiscounts:item.identDiscounts[0].identType + ':'+item.identDiscounts[0].discountRate+'%,'+item.identDiscounts[1].identType + ':'+item.identDiscounts[1].discountRate+'%',
                           
                         })
                        console.log('-----constArray-----',item.periodDiscounts[0])
                    })

                    console.log("------constArray------",constArray);

                    if (!!body.length) {
                        this.tableData = constArray
                        this.count = constArray.length
                    } else {
                        alert('err:' + body)
                    }
                    // this.periodShowArry=res.body.periodDiscounts


                   



                  

                })


      },
      handleSizeChange: function (size) {
        this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },
      putData(){

        // console.log('this.amount*1',this.form.amount*1)
        this.$http.put(
          // tokrn:localStorage.token,
           this.$getApi+'expense/entry/update/'+this.putDataId,
  
          
          {
            "amount":this.form.amount*1,
            "identDiscounts":this.identShowArry,
            "name": this.form.name,
            "delayCharge": true,


            "paybackByDays": this.daysPayBack,

            "paybackBySemesters":this.semestersPayback,
           



            "periodDiscounts":this.periodShowArry,
              "periodType": this.valu,
            
          },
          // console.log(localStorage.token),
          {
          headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }

                    }
        ).then((res) => { // promise对象
            this.$message({
                      message: '修改成功',
                      type: 'success'
                    }); 
          console.log("===regist==== res=====",res);
          if(res.ok){
           console.log('------------',res)
          }else{
            this.$router.push({path:'newschool'});
            console.log('---------',err)
          }
          
    
        }).catch((res) =>{
                    this.$message({
                      message: '修改失败',
                      type: 'error'
                    }); 
                });
        this.dialogVisible=false;

      },
      // 删除身份类型折扣
      handleDeleteIden($index){
          console.log('handleDeleteIdenID',this.identShowArry)
          console.log('handleDeleteIdenID',this.identShowArry[$index].id)

          var idenId=this.identShowArry[$index].id
            this.$http({
                    method: 'delete',
                    url:this.$getApi+'/expense/entry/deleteIdentDiscounts/'+idenId ,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                
                    
                    const {
                        body
                    } = res
                      
                      this.$message({
                      message: '成功',
                      type: 'success'
                    });

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
                this.identShowArry.splice(index, 1)
      },
      // 删除按天退费
      deletePaybackByDays($index){
           
        var daysId=this.paybackByDaysArry[$index].id;
                 this.$http({
                    method: 'delete',
                    url:this.$getApi+'/expense/entry/deletePaybackByDays/'+daysId,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                
                    
                    const {
                        body
                    } = res
                      
                     this.$message({
                      message: '成功',
                      type: 'success'
                    });

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
 this.paybackByDaysArry.splice(index, 1)
      },
      // 删除按学期退费
      deletePaybackBySemesters($index){

        var SemestersId=this.paybackBySemestersArry[$index].id;
             this.$http({
                    method: 'delete',
                    url:this.$getApi+'expense/entry/deletePaybackBySemester/'+SemestersId,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                
                    
                    const {
                        body
                    } = res
                      


                    console.log("===res students===",res.body);
                     this.$message({
                      message: '成功',
                      type: '失败'
                    });

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
    this.paybackBySemestersArry.splice(index, 1)

      },
      // 删除周期折扣
      handleDeleteDis($index){
         console.log('handleDeleteIdenID',this.periodShowArry[$index].id)

          var preiId=this.periodShowArry[$index].id
      
               this.$http({
                    method: 'delete',
                    url:this.$getApi+'expense/entry/deletePeriodDiscounts/'+ preiId ,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                
                    
                    const {
                        body
                    } = res
                      
                     this.$message({
                      message: '成功',
                      type: 'success'
                    });

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
                this.paybackBySemestersArry.splice(index, 1)


      },
         handleDeletePayback($index){
                  this.$http({
                    method: 'delete',
                    url:this.$getApi+'expense/entry/deletePaybackBySemester/6' ,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                
                    
                    const {
                        body
                    } = res
                      

                     this.$message({
                      message: '成功',
                      type: 'success'
                    });
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

       handleEdit(index, row) {

                console.log(index)
                console.log(row.id)
                this.putDataId=row.id
                this.dialogVisible = true
                // console.log(row.name)
                

              this.kgId = row.id;
                this.kgName = row.name;
console.log( "row.iDiscounts",row.periodDiscounts);
console.log('`````````',this.disArray)
            this.periodShowArry=this.disArray[index].periodDiscounts;
            this.identShowArry=this.disArray[index].identDiscounts;
            this.paybackByDaysArry=row.paybackByDays
            this.paybackBySemestersArry=row.paybackBySemesters

                this.form = Object.assign({}, row)

           
            },

             changeValue() {
               if(this.kq_value=='学期请假'){
              this.ci=true;
              this.tian=true;
              // this.BDArry[0].disabled=false;
              // this.BDArry[1].disabled=true;
               var kaoqin=[{
                Bd_value:'大于',
                Bd_label:1,
              },{
                Bd_value:'等于',
                Bd_label:2,
              }]
              this.BDArry=kaoqin
            }else{
              this.ci=false;
              this.tian=true;
              // this.BDArry[0].disabled=true;
              // this.BDArry[1].disabled=false;
               var kaoqin1=[{
                Bd_value:'小于',
                Bd_label:3,
              },{
                Bd_value:'等于',
                Bd_label:2,
              }]
              this.BDArry=kaoqin1
            };
         
        },
 handleChange(value) {
        console.log(value);
      },























         cancelAttr(){
              //1.首先我们要拿到input的父class(input)
                 //当我们设置disabled属性的时候，父集的class设置成 input el-input is-disabled，首先我们改变父集的class,把父集改成可编辑状态，才能修改input的属性
              const parent = document.querySelector(".input");
              parent.className = "input el-input ";//改变父集的class,把父集改成可编辑状态，
              //2.在设置input属性
                  //获取input
              const input = document.querySelector(".input input");
                  //设置input的属性为false
                  input.disabled = false;
          },















            reg(tag) {
console.log('789987979879879879879879',this.daysPayBack)
console.log('789987979879879879879879',this.semestersPayback)




        this.$http.post(
          // tokrn:localStorage.token,
           this.$getApi+'expense/entry',
  
          
          {
            "amount":this.amount*1,
            "identDiscounts":this.IdentityArry,
            "name": this.name,
            "delayCharge": true,


            "paybackByDays": this.daysPayBack,

            "paybackBySemesters":this.semestersPayback,
              "paybacks": [
                {
                  "desc": "string",
                  "expr": "string"
                }
              ],



            "periodDiscounts":this.crcleArry,
              "periodType": this.value11,
            
          },
          // console.log(localStorage.token),
          {
          headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }

                    }
        ).then((res) => { // promise对象
           this.$message({
                      message: '添加成功，如页面没有请刷新页面',
                      type: 'success'
                    }); 
           this.getData();
          console.log("===regist==== res=====",res);
          if(res.ok){
           console.log('------------',res)
          }else{
            this.$router.push({path:'newschool'});
            console.log('---------',err)
          }
          
    
        })
        .catch(function(err){
            console.log(err)
              this.$message({
                      message: '添加失败',
                      type: 'error'
                    }); 
          })
        this.newVisible=false;
        this.getData();
        this.amount='';
        this.name='';
        this.IdentityArry=[];
        this.semestersPayback=[];
        this.daysPayBack=[];
        this.crcleArry=[];


      },
// 获取数据
      
      addBackRule(){

        if (this.kq_value=='考勤天数') {
     this.daysPayBack.push({
            compareType:this.Bd_value*1,
            pDay:this.R_one*1,
            pType:this.R_value*1,
            pValue:this.R_two*1       //没有获取到

      })
console.log("考勤天数组-----",this.daysPayBack);


// 如果是学期请假放到这里
}else if(this.kq_value=='学期请假'){


  this.semestersPayback.push({
    countCompareType:this.Bd_value,
    daysCompareType:this.V_bd_value,
    pType:this.R_value,
     pValue:this.R_two*1, 
      semesterType:2,      //没有获取到
     vacationCount:this.V_bd_num,
     vacationDays:this.R_one
  })

  console.log('学期请假组-----',this.semestersPayback)

}
      this.$store.commit('add');
    
        console.log('..R_two..',this.R_two*1)//单月退还 后的数值
        console.log('..R_one..',this.R_one) //考勤天数后的计数器
        console.log('..kq_value..',this.kq_value)//考勤天数
        console.log('..Bd_value..',this.Bd_value)//考勤天数后的不等号
        // console.log('..R_one..',this.R_one)
        console.log('..R_value..',this.R_value)//单月退还后的金额或比例
        console.log('..V_value..',this.V_value) //年度请假
        console.log('.. V_bd_value..',this.V_bd_value)//年度请假 后的不等号
        console.log('..V_bd_num..',this.V_bd_num)//年度请假 后的计数器

if(this.ci==false){
  this.V_value='';
  this.V_bd_value='';
  this.V_bd_num='';
}


// if(this.Bd_value==1){
//     this.Bd_value="大于"
// }else if(this.Bd_value==2){
//     this.Bd_value="等于"
// }else if (this.Bd_value==3) {
//     this.Bd_value="小于"
// }



      
         this.backRuleArry.push({
                R_two:this.R_two*1,
                R_one:this.R_one,
                kq_value:this.kq_value,
                Bd_value:this.Bd_value,
                R_value:this.R_value,
                V_value:this.V_value,
                V_bd_value:this.V_bd_value,
                V_bd_num:this.V_bd_num


          })

// 如果是考勤天数放到这里

// var daysPayBack=[];









// this.backRuleArry.push
          console.log('this.backRuleArry',this.backRuleArry)
          console.log('this.backRuleArry11111111',newObj)


 console.log('this.$store.state.add();',this.$store.state.sum*50+700);


      },





          addsth(){//身份类型添加折扣
             $("#newtype").css("display","block");

          },
          // addDiscount(){//身份类型添加折扣 弹出框
            
         

          //  $("#newtype").css("display","none");

          //   $("#tis_li1").clone(true).appendTo($("#tis_ul1"));
          //   this.Identity();
          //   // console.log('//////////////////',this.label);

          //   // // $("button").click(function(){
          //   //   $("#tis_ul1").append($("tis_li1:first").clone(true));
          //   // // });


          // },
          addszqzk(){//周期添加折扣
                 $("#allplus_1").css("display","block");
                 

          },
          // add_disc(){//周期添加折扣  弹出框
          //    $("#allplus_1").css("display","none");
          //        $("#tis_li").clone(true).appendTo($("#tis_ul"));
          //        this.crcle();



          // },
          test(){
            console.log('88888888888888888888',this.R_value)
            if(this.R_value=='1'){
              this.yuan=true;
              this.baifenhao=false;
            }else{
              this.yuan=false;
              this.baifenhao=true;
            }





          },
          deleteSth(){ //删除按钮
           // console.log('---------------',$(this).parent())
           console.log('///////////////',this.valued)

         




           $("#tis_ul1").on("click",function(){
              $("#tis_li1").remove();

                var  lis = document.getElementById('tis_ul1').getElementsByTagName('li').length;
          console.log(lis)

              
              if (lis===1) {
             


            $("#tis_li1").clone(true).appendTo($("#tis_ul1"));
        


          }
           });

            

          },
          identView(){
             this.identVisible=true;
          },
          Identity(){
            this.identShowArry.push({
               identType:this.valued11,
                discountRate:this.inputinit*1
            });


            this.IdentityArry.push({
                identType:this.valued11,
                discountRate:this.inputinit*1
            })
            console.log("IdentityArry",this.IdentityArry)
            $("#newtype").css("display","none");
          },
          handleDelete(index){
            // console.log("handleDelete row",this);
            console.log("handleDelete index",index);
           this.IdentityArry.splice(index, 1)
          },

          crcle(){
              console.log('22222222222',this.val)
            this.periodShowArry.push({
                 periodType:this.val11,
              discountRate:this.inputinit_*1
            });
        
            this.crcleArry.push({
              periodType:this.val11,
              discountRate:this.inputinit_*1

            })

            console.log("crcleArry",this.crcleArry)

              $("#allplus_1").css("display","none");
          },
          paybackDelete(index){

              this.backRuleArry.splice(index,1)

          },
           handleDelete1(index){
            // console.log("handleDelete row",this);
            console.log("handleDelete index",index);
           this.crcleArry.splice(index, 1)
          },



           deleteSth1(){ //删除按钮
          $("#tis_ul").on("click",function(){
              $("#tis_li").remove();


                  var  lis = document.getElementById('tis_ul').getElementsByTagName('li').length;
          console.log(lis)

              
              if (lis===1) {
             


            $("#tis_li").clone(true).appendTo($("#tis_ul"));
        


          }

           })

          },
          cancel(){
            $("#newtype").css("display","none");
          },
           cancel1(){
            $("#allplus_1").css("display","none");
          },
          question(){
          $("#sum").css("display","block");
          },
          
          question1(){
          $("#sum1").css("display","block");
          },
          close(){
            $("#sum").css("display","none");
          },
           close1(){
            $("#sum1").css("display","none");
          },
          cut(value){
           if (value==1) {
              this.disabledInput=false;
               console.log('---------',value)
               this.value=''


           }else if(value==2){
               this.disabledInput=true;;
              console.log('---------',value)
              this.value='ONCE'
           }else if(value==3){
            this.disabledInput=false;
               console.log('---------',value)
               this.value=''
           }
          },
     
            handleClick(index,row){
              this.tableData.splice(index, 1)
         this.dialogMessage=true
        console.log(row.id);
        this.delId=row.id
         console.log(delId) 
         // this.$store.commit('rowId',{rId:delId});    

      },
             handleClose() {
        this.dialogMessage = false
      
        

      },
      handelDeleteRow(){
        console.log(this.delId)
         this.$http({
                    method: 'delete',
                    url:this.$getApi+'expense/entry/' + this.delId ,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('---------未缴费---------',res)
                    
                    const {
                        body
                    } = res
                      


                    console.log("===res students===",res.body);

                    this.$message({
                      message: '删除成功',
                      type: 'success'
                    });
                    if (!!body.length) {
                        this.tableData = body.content
                        this.count = body.length
                    } else {
                        // alert('err:' + body)
                    }

                  

                }).catch((res) =>{
                    this.$message({
                      message: '删除失败',
                      type: 'error'
                    });
                });
                   this.dialogMessage = false
      },

    
      
     handolTags(){
      $("#btn_tag").css("display","none");
     },
     
      },
         mounted(){
          console.log('---------------------------------------');
          this.getData();
         },
        //  activated(){
        //     var div =document.getElementById('newAdddeiz');
        //     $("#newAdddeiz").width(700 + 50*this.$store.state.sum);
        // }
        // methods:{
          
        // }
    }
</script>
<style scoped>
.content{
     font-family: "宋体";
      font-size: 14px;
      text-align: center;
     /* border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;*/
      padding-top: 30px;
      /*width: 1000px;*/
      height: 100%;
      padding-top: 80px;
      margin-left: 0px;
  }
  .title{
      display: block;
      font-size: 26px;
      font-weight: 700;
      /*margin-left: -20px;*/
      /*border:1px solid #ccc;*/

  }
  .name{
    margin-left: 10px;
  }
  .name_inpt{
    /*text-align: center;*/
    /*display: inline-block;*/
    width: 370px;
   
  }

  .name_inpt1{
    /*display: inline-block;*/
    width: 400px;
   /* margin-left: -13px;*/
  }
  .zhouqi_sel{
    margin-top: 30px;
  }
  .amount{
    margin-left: 10px;
    margin-top: 30px;
  }
  .zhouqi_sel1{
     margin-top: 30px;
     margin-left: 10px;
  }
  .zhouqi_sel2{
     margin-top: 30px;
     margin-left: 10px;
  }
  .name_inpt2{
     display: inline-block;
    width: 296px;
   
  }
  .zhekou_btn{
    display: inline-block;

  }
  .tis_li{
    margin-top: 30px;
    margin-left: 122px;
    text-align: right;
    width: 450px;
  }
  .tis_li li{
    margin-bottom: 20px;
  }
  .main_btn{
    width: 400px;
    text-align: center;
    margin-left: 52%;
  }
  .add_sth{
    width: 480px;
    margin-left: -105%;
    margin-top: 50px;


  }
   .add_sth1{
    width: 324px;
    margin-left: -94%;
    margin-top: 50px;
    font-size: 16px;
    font-weight: 700;

  }
  .el-input-number__decrease{
    width: 20px!important;
  }
  .delet_colr{
    display: inline-block;

  }
  
  {
    background-color: #8291a6;
  }
   .newseal{
        width: 320px;
        height: 350px;
        background-color: #fff;
        padding-left: 40px;
        padding-top: 10px;
        margin-left: 27%;
        margin-top: -7%;


    }
    .newseal p{
      padding-left: 35px;
    }
    .newtype{
        width: 320px;
        height: 350px;
         padding-left: 40px;
         padding-top: 10px;
         margin-top: 50px;
         background-color: #fff;
         position: absolute;
          margin-left: 27%;
        margin-top: 8.5%;
        

    }
    .newtype p{
      margin-left:-13px;
  
    }
    .ns_inpt{
        width: 155px;
    }
    p{
        font-size: 20px;
        font-weight: 700;
       text-align: center;
       margin-top: 15px;
       margin-bottom: 20px;
       margin-left:-27%;
    }
    .mainbtn{
       /* margin-left: 8%;*/
        width: 188px;
        margin-top: 30px;
        margin-left: 5px;

    }
    .margin{
        margin-top: 20px;
      /*  width: 188px;*/
      margin-left: -20px;
    }
    .all{
      width: 100%;
      height: 100%;
      padding-top: 200px;
      background-color: rgba(0,0,0,.3);
    }
    .all_1{
      /*margin-top: 100px;*/
    }
    .allplus{
      width: 100%;
      height: 100.5%;
      background-color: rgba(0,0,0,.3);
      position: absolute;
      z-index: 100;
        margin-left: 19px;
      margin-top: -21.5%;
      display: none;

    }
    .allplus_1{
      width: 100%;
      height: 100.5%;
      background-color: rgba(0,0,0,.3);
      position: absolute;
      z-index: 100;
      margin-left: 19px;
      margin-top: -21.5%;
      display: none;
    }
    #tis_li1{
      margin: 20px 0;
    }
    li{
      list-style: none;
    }
    .ques{
      display: inline-block;
      width: 15px;
      height: 15px;
      /*border: 1px solid rgba(237,18,111,.5);*/
      border-radius: 5px;
      margin-left:-160px;
      color: red;
      cursor: pointer;
      position: relative;
      top: -15px;
      right: -230px;
     
    }
    .ques1{
       display: inline-block;
      width: 15px;
      height: 15px;
      /*border: 1px solid rgba(237,18,111,.5);*/
      border-radius: 5px;
      margin-left:-160px;
      color: red;
      cursor: pointer;
       position: relative;
      top: -14px;
      left: 158px;
    }
    .sum{
      width: 300px;
      height: 300px;
      background-color: #fff;
      position: fixed;
      left: 46%;
      z-index: 100;
      border: 1px solid #ccc;
      display: none;
      padding-top: 15px;
       padding-right: 10px;

    }
     .sum1{
      width: 300px;
      height: 300px;
      background-color: #fff;
      position: fixed;
      left: 46%;
      z-index: 100;
      border: 1px solid #ccc;
      display: none;
      padding-top: 15px;
       padding-right: 10px;

    }
    .sum p{
      width: 90%;
      margin: 0;
      font-size: 12px;
      font-weight: 400;
      line-height: 15px;



    }
      li{
      line-height: 20px;
       font-family: 微软雅黑;
     }
    .mainbtn1{
      margin-left: 0;
        width: 188px;
        margin-top: 30px;
    }
    .onebox{
      position: relative;
      top: 0px;
      left: 220px;
    }
    .el-radio-group{
      margin-top: -30px;
      margin-left: 42px;

    }
   
    .header{
      display: inline-block;
      width: 102%;
      height: 50px;
      background-color: #61bfff;
      margin-left: -11px;
      color: #fff;
      line-height: 50px;
    }
    .tabel{
  width: 100.5%;
  /*height: 540px;*/
  /*border: 1px solid #85aedc;*/
  margin-left: -19px;
  margin-top: -99px;
}
.el-input__inner{
  width: 168px;
}
.el-radio__label{
  font-size: 12px !important;
}
.radio{
  padding-left: 9px !important;
  font-size: 12px !important;
  color: #4e5486;
}
   #disab{
    width: 168px !important;
   } 
    button{
    /*background-color: #61bfff !important;*/
    /*border:1px solid #61bfff;*/
   }
 .el-input__icon+.el-input__inner{
  padding-left: 40%;
 }

  select{
    direction: rtl;
}
.font_col{
  color: #4f5383;
}
.top{
  width: 100%!important;
}
.back_sty>input{
  height: 32px!important;
}
#header{
    position: fixed;
    top: 8.5%;
    z-index: 100;
    background-color: #fff;
    width: 100%;
}
#zdtj{
    margin-left: 30px;
}
.search{
    width: 100px;

}
#newbtn{
    float: right;
    margin-right: 60px;
}
.c_content{
    width: 98.8%;
    height: 600px;
    margin-left: 10px;
    margin-top: 15px;
    padding-right: 5px;
    /*border:1px solid #ccc;*/
}
.tags{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.3);
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 100;
  display: none;
}
.compile{
  width: 590px;
  height: 80%;
  position: absolute;
  top: 100px;
  right: 600px;
  background-color: #fff;
}
.btn_tag{
  position: absolute;
 bottom: 35px;
 left: 44%;

}
.tag_inpt{
  margin-top: 35px;
  width: 75%;
  margin-left: 15%;
}
.tag_elinpt{
   width: 80%;
   display: inline-block;
}
.tag_span{
  display: inline-block;
}
.tag_inpt1{
 margin-top: 35px;
  width: 75%;
  margin-left: 12%;
}
.name_inpt{
  width: 398px;
  /*padding-bottom: 20px;*/
}
.el-dialog__body{
margin-left: 280px;
}
.name_inpt2{
  /*padding-bottom: 20px;*/

  width: 296px;
}
.el_content{
  margin-left: 35px;
}
.top{
  width: 100% !important;

}
.content1{
  width: 100%!important;
  margin-left: 0px!important;
}
#newAdddeiz{
  height: (this.$store.state.sum*50+700)px;
}
.el-button--small{
  margin: 5px 5px !important;
}
.el-tabs__content{
  margin-top:10px!important;
}
    
</style>

