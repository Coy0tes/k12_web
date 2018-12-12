Skip to content
Features
Business
Explore
Marketplace
Pricing

Search

Sign in or Sign up
44 884 281 jinzhe/vue-calendar
 Code  Issues 3  Pull requests 0  Projects 0  Insights
Join GitHub today
GitHub is home to over 28 million developers working together to host and review code, manage projects, and build software together.

vue-calendar/src/calendar.vue
e980b2f  on 4 Jan
 ZEE.KIM Fixed set today bug
@jinzhe @qcy1121 @eellkk
     
810 lines (787 sloc)  29.1 KB

<style scoped>
.calendar {
    margin:auto;
    width: 70%;
    min-width:300px;
    background: #fff;
    font-family: "PingFang SC","Hiragino Sans GB","STHeiti","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
    user-select:none;
    display: inline-block;
    border-right: 1px solid #ccc;

}
.calendar-tools{
    height:40px;
    font-size: 20px;
    line-height: 40px;
    color:#5e7a88;
}
.calendar-tools span{
    cursor: pointer;
}
.calendar-prev{
    width: 14.28571429%;
    float:left;
    text-align: center;
}
.calendar-info{
    padding-top: 3px;
    font-size:16px;
    line-height: 1.3;
    text-align: center;
}
.calendar-info>div.month{
    margin:auto;
    height:20px;
    width:100px;
    text-align: center;
    color:#5e7a88;
    overflow: hidden;
    position: relative;
}
.calendar-info>div.month .month-inner{
    position: absolute;
    left:0;
    top:0;
    height:240px;
    transition:top .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.calendar-info>div.month .month-inner>span{
    display: block;
    font-size: 14px;
    height:20px;
    width:100px;
    overflow: hidden;
    text-align: center;
}
.calendar-info>div.year{
   font-size:10px;
   line-height: 1;
   color:#999;
}
.calendar-next{
    width: 14.28571429%;
    float:right;
    text-align: center;
}
 
.calendar table {
    clear: both;
    width: 100%;
    margin-bottom:10px;
    height: 600px;
    border-collapse: collapse;
    color: #444444;
}
.calendar td {
    margin:2px !important;
    padding:0px 0;
    width: 14.28571429%;
    height:44px;
    text-align: center;
    vertical-align: middle;
    font-size:14px;
    line-height: 125%;
    cursor: pointer;
    position: relative;
    vertical-align: top;
}
.calendar td.week{
    font-size:10px;
    pointer-events:none !important;
    cursor: default !important;    
}
.calendar td.disabled {
    color: #ccc;
    pointer-events:none !important;
    cursor: default !important;
}
.calendar td.disabled div{
    color: #ccc;
}
.calendar td span{
    display:block;
    max-width:30px;
    height:30px;
    font-size: 16px;
    line-height:30px;
    margin:0px auto;
    border-radius:15px;
}
.calendar td:not(.selected) span:not(.red):hover{
    background:#f3f8fa;
    color:#444;
}
.calendar td:not(.selected) span.red:hover{
    background:#f9efef;
}
.calendar td:not(.disabled) span.red{
    color:#ea6151;
}
.calendar td.selected span{
    /*background-color: #5e7a88;*/
    /*background-color:green;*/
    background-color: #9dcbfb;
    color: #fff;
}
.calendar td .text{
    position: absolute;
    top:40px;
    left:0;
    right:0;
    text-align: center;
    
    padding:2px;
    font-size:8px;
    line-height: 1.2;
    color:#444;
}
.calendar td .isGregorianFestival,
.calendar td .isLunarFestival{
    color:#ea6151;
}
.calendar td.selected span.red{
    background-color: #fff;
    color: #ea6151;
}
.calendar td.selected span.red:hover{
    background-color: #ea6151;
    color: #fff;
}
.calendar thead td {
  text-transform: uppercase;
  height:30px;
  vertical-align: middle;
}
.calendar-button{
    text-align: center;
}
.calendar-button span{
    cursor: pointer;
    display: inline-block;
    min-height: 1em;
    min-width: 5em;
    vertical-align: baseline;
    background:#5e7a88;
    color:#fff;
    margin: 0 .25em 0 0;
    padding: .6em 2em;
    font-size: 1em;
    line-height: 1em;
    text-align: center;
    border-radius: .3em;
}
.calendar-button span.cancel{
    background:#efefef;
    color:#666;
}
.calendar-years{
    position: absolute;
    left:0px;
    top:60px;
    right:0px;
    bottom:0px;
    background:#fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap:wrap;
    overflow: auto;
    transition:all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
}
.calendar-years.show{
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0px);
}
.calendar-years>span{
    margin:1px 5px;
    display: inline-block;
    width:60px;
    line-height: 30px;
    border-radius: 20px;
    text-align:center;
    border:1px solid #fbfbfb;
    color:#999;
}
.calendar-years>span.active{
    border:1px solid #5e7a88;
    background-color: #5e7a88;
    color:#fff; 
}
.el-form-item{
    margin-bottom:10px !important;
}
.selected1{
    background-color: red;
}
.calendar td.active span{
    background-color: #409eff !important;
}
.red{
    color:red !important;
    font-size:12px;
}
.blue{
    font-size:12px;
    color:#409EFF;
}
.orange{
    font-size:12px;
    color:orange;
}
.events{
  height:6px;
   width:6px;
   background-color:#f7c351;    
   border-radius:50%;
    position: relative;
   top: 27px;
    left: 50%;
    margin-left:-3px;
      color:#fff;
       font-size:16px;
    line-height:30px;
}
</style>

<template>
    <div >
          <div style="width:100%;height:50px;margin-top:10px; background-color:#fff;padding-top:5px;padding-left:10px;">
               
                      <!-- <el-button type="primary" @click="search">查询</el-button> -->
                      <el-button type="primary" @click="putCardY">打卡</el-button>
                      <el-button type="warning" @click="getduit2">补签</el-button>
                      <el-button  type="primary"  @click="getduit()">请假</el-button>
                      <el-button  type="primary"  @click="getduit1">加班</el-button>
                      <el-button  type="primary"  @click="getduit3">出差</el-button>

                </div>
    
    <div class="calendar">
        <div class="calendar-tools">
            <span class="calendar-prev" @click="prev">
                <svg width="20" height="20" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g class="transform-group">
                    <g transform="scale(0.015625, 0.015625)">
                        <path d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z" fill="#5e7a88"></path>
                    </g>
                </g>
                </svg>
            </span>
            <span class="calendar-next"  @click="next">
                <svg width="20" height="20" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g class="transform-group">
                    <g transform="scale(0.015625, 0.015625)">
                        <path d="M761.056 532.128c0.512-0.992 1.344-1.824 1.792-2.848 8.8-18.304 5.92-40.704-9.664-55.424L399.936 139.744c-19.264-18.208-49.632-17.344-67.872 1.888-18.208 19.264-17.376 49.632 1.888 67.872l316.96 299.84-315.712 304.288c-19.072 18.4-19.648 48.768-1.248 67.872 9.408 9.792 21.984 14.688 34.56 14.688 12 0 24-4.48 33.312-13.44l350.048-337.376c0.672-0.672 0.928-1.6 1.6-2.304 0.512-0.48 1.056-0.832 1.568-1.344C757.76 538.88 759.2 535.392 761.056 532.128z" fill="#5e7a88"></path>
                    </g>
                </g>
                </svg>
            </span>
            <div class="calendar-info" @click.stop="changeYear">
                <!-- {{monthString}} -->
                <div class="month">
                    <div class="month-inner" :style="{'top':-(this.month*20)+'px'}">
                        <span v-for="m in months">{{m}}</span>
                    </div>
                </div>
                <div class="year">{{year}}</div>
            </div>
        </div>
        <table cellpadding="5">
        <thead>
            <tr>
                <td v-for="week in weeks" class="week">{{week}}</td>
            </tr>
        </thead>
        <tbody>
            <!-- 样式一 -->
        <!-- <tr v-for="(day,k1) in days" style="{'animation-delay',(k1*30)+'ms'}"> -->
             <!-- <td v-for="(child,k2) in day" :class="{'selected':child.selected,'disabled':child.disabled}" @click="select(k1,k2,$event)"> -->
            <!-- <td v-for="(child,k2) in day" @click="select(k1,k2,$event)"> -->
                 <!-- <span :class="{'red':k2==0||k2==6||((child.isLunarFestival||child.isGregorianFestival) && lunar)}">{{child.day}}</span>  -->
                <!-- <span>{{child.day}}</span> -->
                
                <!-- <div class="text" v-if="child.eventName!=undefined"><div style="height:5px; width:5px;background-color:red;margin-left: 48.5%; margin-top: -6% -->
                    <!-- ;border-radius:50%" v-show="isShow"></div></div> -->
                <!-- <div class="text" :class="{'isLunarFestival':child.isLunarFestival,'isGregorianFestival':child.isGregorianFestival}" v-if="lunar">{{child.lunar}}</div> -->
            <!-- </td> -->
        <!-- </tr>  -->
<!-- 样式二 -->
        <tr v-for="(day,k1) in days" style="{'animation-delay',(k1*30)+'ms'}">
           <td v-for="(child,k2) in day" :class="{'selected':child.selected,'disabled':child.disabled,'active':child.active}" ref="mybox" @click="select(k1,k2,$event)">
                <span :class="{'red':k2==0||k2==6||((child.isLunarFestival||child.isGregorianFestival) && lunar)}">{{child.day}}</span>
                <div class="text" v-if="child.eventName!=undefined">

                    <div class="events" @click="colors" v-show="isShow">
                        {{child.day}}
                    </div>
                </div>
                <div class="text" :class="{'isLunarFestival':child.isLunarFestival,'isGregorianFestival':child.isGregorianFestival}" v-if="lunar">{{child.lunar}}</div>
            </td>
        </tr>



        </tbody>
        </table>
            




        <div class="calendar-years" :class="{'show':yearsShow}">
            <span v-for="y in years" @click.stop="selectYear(y)" :class="{'active':y==year}">{{y}}</span>
        </div>
 

    </div>

    <div style="display:inline-block; float:right;width:300px;" >

<div style="width:100%;  display:inline-block;margin-right:25px;">
                    <!-- <div style="color:#ccc; font-size:12px;">(考勤周期内  自上月{{formDate}}号到本月{{toDate}}号 )</div> -->
                <div style="color:#5b87f5;">
                  本月考勤情况<span style="color:#ccc; font-size:12px;">( 自上月{{formDate}}号到本月{{toDate}}号 )</span>
                </div>
                
                  <el-form :label-position="position" label-width="90px">
                    <el-form-item label="出勤天数：">
                     {{chuqinData}}
                    </el-form-item>


                    <el-form-item label="迟到天数：">
                      {{LateData}}
                    </el-form-item>


                    <el-form-item label="请假天数：">
                     {{VacationData}}
                    </el-form-item>

                    <el-form-item label="缺勤天数：">
                     {{notquanqinData}}
                    </el-form-item>
                    <el-form-item label="早退天数：">
                     {{beforGo}}
                    </el-form-item>

                   
                  </el-form>


            <br>


                  <el-form :label-position="position" label-width="110px" style="margin-top: 30px; width:150px;">
                    
<span style="color:#5b87f5;">今日打卡情况</span>





            <br><br><br>
                <span style="font-size:12px">考勤状态： {{statu | formatStatus}}</span>
                    <el-form-item label="上午打卡时间：">
                      <span v-show='show' style="display: inline-block;width: 150px; margin-left: -15px;">{{dataObj.amStar=="NaN:NaN:NaN"?'':dataObj.amStar}} <span :class="amS"> {{checkObj.as|formattype}}</span>
                    </span>
                    </el-form-item>
                    <el-form-item label="上午打卡时间：" v-show='showSing'>
                      <span v-show='show' style="display: inline-block;width: 150px; margin-left: -15px;">
                          {{dataObj.amEnd=="NaN:NaN:NaN"?'':dataObj.amEnd}} <span :class="amE"> {{checkObj.ae|formattype}}</span>
                          
                      </span>
                      
                    </el-form-item>
                    <el-form-item label="下午打卡时间：" v-show='showSing'>
                        <span v-show='show' style="display: inline-block;width: 150px; margin-left: -15px;">
                            {{dataObj.pmStar=="NaN:NaN:NaN"?'':dataObj.pmStar}} <span :class="pmS" > {{checkObj.ps|formattype}}</span>
                            
                        </span>                    </el-form-item>

                    <el-form-item label="下午打卡时间：">
                        <span v-show='show' style="display: inline-block;width: 150px; margin-left: -15px;">
                            {{dataObj.pmEnd=="NaN:NaN:NaN"?'':dataObj.pmEnd}} <span :class="pmE"> {{checkObj.pe|formattype}}</span>
                            
                        </span>
                    </el-form-item>
                  </el-form>
   
            </div>


    </div>



    <el-dialog
 
  :visible.sync="appointDialog"
  width="600px"
  :before-close="handleClose">
  <div>
   
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">请假</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../assets/close3.png"  height="16" width="16" class="closeImg" @click="appointDialog = false">
             </div>
          </div>
          <!-- Newtitle  end-->
      <div style="margin-left:110px;margin-bottom:30px;">
            

                    <el-form>
                       <el-form-item label="请假类型">
                         <el-select v-model="value4" placeholder="请选择" style="width:270px">
                        <el-option
                          v-for="item in options2"
                          :key="item.value4"
                          :label="item.label4"
                          :value="item.value4">
                        </el-option>
                      </el-select>
                      </el-form-item>

                      <el-form-item label="开始时间">
                        <el-date-picker
                          v-model="value2"
                          type="datetime"
                          style="width:270px"
                          placeholder="选择日期时间">
                        </el-date-picker>

                       

                      </el-form-item>

                      

                      <el-form-item label="结束时间">
                        <el-date-picker
                          v-model="value3"
                          type="datetime"
                          @change='vacationTime'
                          style="width:270px"
                          placeholder="选择日期时间">
                        </el-date-picker>

                      </el-form-item>

                      <el-form-item label="时长(天)">
                        <el-input v-model='totleTime' style="width:270px;margin-left:5px;"></el-input> 

                      </el-form-item>


                      <el-form-item label="请假原因">
                               <el-input
                              type="textarea"
                              :rows="2"
                               style="width:270px;"
                              placeholder="请输入内容"
                              v-model="textarea">
                            </el-input>
                      </el-form-item>
                      <el-form-item>
                        <!-- <el-button type="primary" @click="onSubmit">查询</el-button> -->
                      </el-form-item>
                    </el-form>


                 
        </div>

         <div style="   margin-left: 110px;width:400px;">
                       <span> 审批流程</span>
                           <!-- <span style="display:inline-block;height:30px;font-size:14px;font-weight:700; ">{{item.discernDutyId.name}}审核</span> : -->
                            <li  style=" display:inline-block; height:30px; border-radius:25%; font-size:12px;padding-left:10px;" v-for="(it,index) in flow">
                            <span  style=" display:inline-block; width: 75px;;height:30px;border:1px solid #ccc; border-radius:12%;background-color:#d6e5f6; font-size:12px;padding-left:10px;background-color:#d6e5f6;padding-right:10px;position: relative;text-align:center;">{{it.actorName}}
                          
                            </span>  
                           
                             →
                          </li>
                    
                           <div style=" display:inline-block;    margin-left: -20px; width:20px;height:20px;background-color:#fff;">
                              
                          </div>
                          <div style="margin-top:10px;margin-bottom:10px;">
                                   <span style="display:inline-block;height:30px;font-size:14px;">抄送者</span><span style=" display:inline-block; width: 75px;;height:30px;border:1px solid #ccc; border-radius:12%;background-color:#d6e5f6; font-size:12px;padding-left:10px;background-color:#d6e5f6;padding-right:10px;position: relative;text-align:center;margin-left: 29px;">
                                   {{flow1}}
                                   </span> 
                          
                          
                          </div>
                          
                  
                    </div>
  </div>
        
  <span slot="footer" class="dialog-footer">
    <el-button @click="appointDialog = false">取 消</el-button>
    <el-button type="primary" @click="postData">确 定</el-button>
  </span>
</el-dialog> 

<el-dialog
 
  :visible.sync="appointDialog1"
  width="600px"
  :before-close="handleClose">
  <div>
  
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">加班申请</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../assets/close3.png"  height="16" width="16" class="closeImg" @click="appointDialog1 = false">
             </div>
          </div>
          <!-- Newtitle  end-->
      <div style="margin-left:110px;margin-bottom:30px;">
            

                    <el-form>


                      <el-form-item label="方式">
                        <div style="margin-left: 70px;">
                            <el-radio v-model="radio" label="1">调休</el-radio>
                            <el-radio v-model="radio" label="2" disabled="true">加班费</el-radio>
                        </div>
                          

                       

                      </el-form-item>  

                       <el-form-item label="开始时间">
                        <el-date-picker
                          v-model="value5"
                          type="datetime"
                          style='margin-left:9px;width:270px;'
                          placeholder="选择日期时间">
                        </el-date-picker>

                       

                      </el-form-item>

                    

                      <el-form-item label="结束时间">
                        <el-date-picker
                          v-model="value6"
                          type="datetime"
                          @change="workTime"
                          style='margin-left:9px;width:270px;'
                          placeholder="选择日期时间">
                        </el-date-picker>

                      </el-form-item>


                      <el-form-item label="时长(时)">
                        <el-input v-model='vallue' style="width:270px;margin-left:14px;"></el-input>

                      </el-form-item>


                      <el-form-item label="加班描述">
                               <el-input
                              type="textarea"
                              :rows="2"
                               style="width:270px;margin-left:10px;"
                              placeholder="请输入内容"
                              v-model="textarea1">
                            </el-input>
                      </el-form-item>
                      <el-form-item>
                        <!-- <el-button type="primary" @click="onSubmit">查询</el-button> -->
                      </el-form-item>
                    </el-form>


                 
        </div>
          <div style=" margin-left: 110px;width:400px;">
                       <span> 审批流程</span>
                           <!-- <span style="display:inline-block;height:30px;font-size:14px;font-weight:700; ">{{item.discernDutyId.name}}审核</span> : -->
                            <li  style=" display:inline-block; height:30px; border-radius:25%; font-size:12px;padding-left:10px;" v-for="(it,index) in flow">
                            <span  style=" display:inline-block; width: 75px;;height:30px;border:1px solid #ccc; border-radius:12%;background-color:#d6e5f6; font-size:12px;padding-left:10px;background-color:#d6e5f6;padding-right:10px;position: relative;text-align:center;">{{it.actorName}}
                          
                            </span>  
                           
                             →
                          </li>
                    
                           <div style=" display:inline-block;    margin-left: -20px; width:20px;height:20px;background-color:#fff;">
                              
                          </div>
                          <div style="margin-top:10px;margin-bottom:10px;">
                                   <span style="display:inline-block;height:30px;font-size:14px;">抄送者</span><span style=" display:inline-block; width: 75px;;height:30px;border:1px solid #ccc; border-radius:12%;background-color:#d6e5f6; font-size:12px;padding-left:10px;background-color:#d6e5f6;padding-right:10px;position: relative;text-align:center;margin-left:29px;">
                                   {{flow1}}
                                   </span> 
                          
                          
                          </div>
                          
                  
                    </div>

       
  </div>
        
  <span slot="footer" class="dialog-footer">
    <el-button @click="appointDialog1 = false">取 消</el-button>
    <el-button type="primary" @click="postData1">确 定</el-button>
  </span>
</el-dialog>

<!-- 出差 -->
  <el-dialog
  
  :visible.sync="dialogWork"
  width="600px"
  :before-close="handleClose">
  <div>
 

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">出差</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogWork = false">
             </div>
          </div>
          <!-- Newtitle  end-->
          <div style="padding-left:110px;">
                <el-form>
                         <el-form-item label="开始时间">
                             <el-date-picker
                          v-model="value7"
                          type="datetime"
                             style='margin-left:9px;width:270px;'
                          placeholder="选择日期时间">
                        </el-date-picker>
                      </el-form-item>


                       <el-form-item label="结束时间">
                        <el-date-picker
                          v-model="value8"
                          type="datetime"
                          @change="goworkTime"
                          style='margin-left:9px;width:270px;'
                          placeholder="选择日期时间">
                        </el-date-picker>
                      </el-form-item> 

                       <el-form-item label="总时长(天)" >
                          <el-input v-model="totleTime" style="width:270px;margin-left:0px;"> </el-input> 
                      </el-form-item>
                       
                       <el-form-item label="出差原因" >
                          <el-input
                              type="textarea"
                              :rows="2"
                               style="width:270px;margin-left:9px;"
                              placeholder="请输入内容"
                              v-model="textarea2">
                            </el-input>
                      </el-form-item>
                       
                        

                     </el-form>
          </div>
            <div style=" margin-left: 110px;width:400px;">
                       <span> 审批流程</span>
                           <!-- <span style="display:inline-block;height:30px;font-size:14px;font-weight:700; ">{{item.discernDutyId.name}}审核</span> : -->
                            <li  style=" display:inline-block; height:30px; border-radius:25%; font-size:12px;padding-left:10px;" v-for="(it,index) in flow">
                            <span  style=" display:inline-block; width: 75px;;height:30px;border:1px solid #ccc; border-radius:12%;background-color:#d6e5f6; font-size:12px;padding-left:10px;background-color:#d6e5f6;padding-right:10px;position: relative;text-align:center;">{{it.actorName}}
                          
                            </span>  
                           
                             →
                          </li>
                    
                           <div style=" display:inline-block;    margin-left: -20px; width:20px;height:20px;background-color:#fff;">
                              
                          </div>
                          <div style="margin-top:10px;margin-bottom:10px;">
                                   <span style="display:inline-block;height:30px;font-size:14px;">抄送者</span><span style=" display:inline-block; width: 75px;;height:30px;border:1px solid #ccc; border-radius:12%;background-color:#d6e5f6; font-size:12px;padding-left:10px;background-color:#d6e5f6;padding-right:10px;position: relative;text-align:center;margin-left:29px;">
                                   {{flow1}}
                                   </span> 
                          
                          
                          </div>
                          
                  
                    </div>
                   
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogWork = false">取 消</el-button>
    <el-button type="primary" @click="goWork">确 定</el-button>
  </span>
</el-dialog>
<!-- 补签 -->
  <el-dialog
  
  :visible.sync="checkWorkDing"
  width="600px"
  :before-close="handleClose">
  <div>


          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">补签</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../assets/close3.png"  height="16" width="16" class="closeImg" @click="checkWorkDing = false">
             </div>
          </div>
          <!-- Newtitle  end-->
          <div style="padding-left:110px;">
                <el-form>
                      

                      <el-form-item label="补签时间" >
                          <el-date-picker
                            v-model="value1"
                            style="width:270px;"
                            type="date"
                            placeholder="选择日期">
                          </el-date-picker>
                      </el-form-item>


                       <el-form-item label="补签原因" >
                          <el-input
                              type="textarea"
                              :rows="2"
                               style="width:270px;"
                              placeholder="请输入内容"
                              v-model="desc">
                            </el-input>
                      </el-form-item>
                       
                        

                     </el-form>
          </div>
            <div style="  margin-left: 110px;width:400px;">
                       <span> 审批流程</span>
                           <!-- <span style="display:inline-block;height:30px;font-size:14px;font-weight:700; ">{{item.discernDutyId.name}}审核</span> : -->
                            <li  style=" display:inline-block; height:30px; border-radius:25%; font-size:12px;padding-left:10px;" v-for="(it,index) in flow">
                            <span  style=" display:inline-block; width: 75px;;height:30px;border:1px solid #ccc; border-radius:12%;background-color:#d6e5f6; font-size:12px;padding-left:10px;background-color:#d6e5f6;padding-right:10px;position: relative;text-align:center;">{{it.actorName}}
                          
                            </span>  
                           
                             →
                          </li>
                    
                           <div style=" display:inline-block;    margin-left: -20px; width:20px;height:20px;background-color:#fff;">
                              
                          </div>
                          <div style="margin-top:10px;margin-bottom:10px;">
                                   <span style="display:inline-block;height:30px;font-size:14px;">抄送者</span><span style=" display:inline-block; width: 75px;;height:30px;border:1px solid #ccc; border-radius:12%;background-color:#d6e5f6; font-size:12px;padding-left:10px;background-color:#d6e5f6;padding-right:10px;position: relative;text-align:center;margin-left:29px;">
                                   {{flow1}}
                                   </span> 
                          
                          
                          </div>
                          
                  
                    </div>
                   
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="checkWorkDing = false">取 消</el-button>
    <el-button type="primary" @click="checkWork">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import calendar from './calendar.js'
export default {
    props: {
        dataObj:{
            type:Object,
             default:function(){
                return this.checkObj
            }
        },
        // 多选模式
        multi: {
            type: Boolean,
            default: false
        },
        // 范围模式
        range:{
            type: Boolean,
            default: false
        },
        // 默认日期
        value: {
            type: Array,
            default: function(){
                return []
            }
        },
        // 开始选择日期
        begin:  {
            type: Array,
            default: function(){
                return []
            }
        },
        // 结束选择日期
        end:  {
            type: Array,
            default: function(){
                return []
            }
        },
        // 是否小于10补零
        zero:{
            type: Boolean,
            default: false
        },
        // 屏蔽的日期
        disabled:{
            type: Array,
            default: function(){
                return []
            }
        },
        // 是否显示农历
        lunar: {
            type: Boolean,
            default: false
        },
        // 自定义星期名称
        weeks: {
            type: Array,
            default:function(){
                return window.navigator.language.toLowerCase() == "zh-cn"?['日', '一', '二', '三', '四', '五', '六']:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            }
        },
        // 自定义月份
        months:{
            type: Array,
            default:function(){
                return window.navigator.language.toLowerCase() == "zh-cn"?['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            }
        },
        // 自定义事件
        events:  {
            type: Object,
            default: function(){
                return {}
            }
        },
    },
    data() {
        return {
          vallue:'',
          totleTime:'',
          tag:'',
           checkObjPe:false,
            checkObjPs:false,
            checkObjAe:false,
            checkObjAs:false,
          showSing:false,
          todayAmS:'',
          todayAmE:'',
          todayPmS:'',
          todayPmE:'',
            clickToday:'',
            amS:"",
            amE:"",
            pmS:"",
            pmE:"",
            formDate:'',
            toDate:'',
            VacationData:0,
            notquanqinData:0,
            beforGo:0,
            chuqinData:0,
             dialogVisible:false,
            dataObj:{},
            years:[],
            yearsShow:false,
            year: 0,
            month: 0,
            day: 0,
            days: [],
            isShow:true,
            show:false,
            show1:false,
            show2:false,
            show3:false,
            appointDialog:false,
            appointDialog1:false,
            dialogWork:false,
            checkWorkDing:false,
            multiDays:[],
            today: [],

            desc:'',
            options2:[],
            festival:{
                lunar:{
                    "1-1":"春节",
                                      
                    "5-5":"端午节",
               
                    
                    "8-15":"中秋节",
        

                    
                    
                    "12-8":"腊八节",
                   
                },
                gregorian:{
              

                },
            },
            rangeBegin:[],
            rangeEnd:[],
            checkObj:{},
            value1:"",
             value2:'',
              value3:'',
              value4:'',
              textarea:'',
              textarea1:'',
              flow:[],
              flow1:{},
              value5:'',
              value6:'',
              value7:'',
              value8:'',
              value9:'',
              value10:'',
              radio:"",
              textarea2:'',
              attendanceTeacherId:'',
              statu:'',
        }
    },
    watch:{
        events(){
            this.render(this.year,this.month)
        },
        value(){
            this.init();
        }
    },
    mounted() {
        this.init()
    },
        filters: {
           formatStatus: function (val) {
              console.log(val)
            return val == "RETOR" ? '补签' :val == "AFFAIR" ? '事假' :val == "REST" ? '调休':val == "ANNUAL" ? '年休假':val == "SICK" ? '病假':val == "BIRTH" ? '产假':val == "BIRTHWITH" ? '陪产假':val == "MARRIAGE" ? '婚假':val == "FUNERAL" ? '丧假':val == "BUSINESS" ? '出差':val == "OVERTIME" ? '加班':val == "ALL" ? '正常':val == "UNALL" ? '缺勤':val == "LATE" ? '迟到':val == "LEAVE" ? '早退':"未知"; 
             console.log(val,val ,val )
          },
          formattype: function (val) {
              console.log(val)
              return val == "LATE"  ? '迟到' : val == "ALL"  ? '正常'  :val == "LEAVE"  ? '早退'  : '缺勤';
          },
      },
    methods: {  
            workTime(){
              this.vallue=((this.value6- this.value5)/3600000).toFixed(1)
            },

            countWorkDay(sDay,eDay){
         

                //相差天数
                var diffDay = (eDay - sDay) / (1000 * 60 * 60 * 24) + 1;
                var diffWeekDay = diffDay - (s_t_w ==0?0:7-s_t_w) + e_t_w;
                //计算有几个完整的周
                var weeks = Math.floor(diffWeekDay/7);
                if(weeks<=0){ //在同一周内 即开始结束时间不可能同时为周天与周六（周天为一周第一天）
                    return e_t_w-s_t_w+(s_t_w?1:0)+(e_t_w==6?-1:0);
                }else{
                    return weeks*5 + (e_t_w==6?5:e_t_w) + ( s_t_w >= 1 && s_t_w <= 5 ? (6-s_t_w):0);
                }
                console.log(weeks)
            },



          // 补签--时间
              singoInAgain(tag){
                console.log('22222222222222',tag)
                if (tag==1) {

                }

              },
              singoInAgainPut(){

              },
              amStar(){
                 var a = new Date(this.value1).getTime();
                  console.log(a)
                // console.log('22222222222222',tag)
                //   var amStarDate=this.clickToday +' '+this.todayAmS
                //   var getDateSecond=Math.round(new Date(amStarDate))
                //   console.log('11111111111111111',Math.round(new Date(amStarDate)),amStarDate)
                      this.$http.put(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'management/attendancesTeachers/retor',
                    {
                       
                        "attendanceTeacherId": this.attendanceTeacherId,
                        "content": this.desc,
                        "retorTime": a
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
                    console.log("===body=add==guardians====",res);
                    this.$message({
                      message: '补签申请成功',
                      type: 'success'
                    });
                    
                }).catch((res) =>{
                    this.$message({
                      message: '补签申请失败',
                      
                      type: 'error'
                    });
                });
              },
        
       
     
                    sthClick(){
                           const self = this;
                      // this.$refs.mybox.style.color = 'red';
                      console.log('this.$refs.mybox.',this.$refs.mybox)
                    },
                checkWork(){
                
                        this.amStar();
                  
                this.checkWorkDing=false
                },
                goworkTime(){
                     var num= Date.parse(this.value7);
             var num1= Date.parse(this.value8);
                console.log(this.value7)
                console.log(num)
                var d = new Date(this.value7);  
                var b = new Date(this.value8);  


        var fromDate=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        var toDate=b.getFullYear() + '-' + (b.getMonth() + 1) + '-' + b.getDate();
                 // var goWorkDate= this.countWorkDay('2017-08-01','2017-08-06')
                 // console.log('num1num1num1num1num1num1num1num1num1num1num1num1',goWorkDate)
                                   var beginDate = new Date(fromDate.replace(/-/g, "/"));
                      //结束日期
                      var endDate = new Date(toDate.replace(/-/g, "/"));
                      //日期差值,即包含周六日、以天为单位的工时，86400000=1000*60*60*24.
                      var workDayVal = (endDate - beginDate)/86400000 + 1;
                      //工时的余数
                      var remainder = workDayVal % 7;
                      //工时向下取整的除数
                      var divisor = Math.floor(workDayVal / 7);
                      var weekendDay = 2 * divisor;
                       
                      //起始日期的星期，星期取值有（1,2,3,4,5,6,0）
                      var nextDay = beginDate.getDay();
                      //从起始日期的星期开始 遍历remainder天
                      for(var tempDay = remainder; tempDay>=1; tempDay--) {
                          //第一天不用加1
                          if(tempDay == remainder) {
                              nextDay = nextDay + 0;
                          } else if(tempDay != remainder) {
                              nextDay = nextDay + 1;
                          }
                          //周日，变更为0
                          if(nextDay == 7) {
                              nextDay = 0;
                          }
                       
                          //周六日
                          if(nextDay == 0 || nextDay == 6) {
                              weekendDay = weekendDay + 1;
                          }
                      }
                      //实际工时（天） = 起止日期差 - 周六日数目。
                      workDayVal = workDayVal - weekendDay;
                      this.totleTime=workDayVal
                      console.log('jjjjjjjjjjjjjjjjjjjj',workDayVal)
                },
            goWork(){

             var num= Date.parse(this.value7);
             var num1= Date.parse(this.value8);
                console.log(this.value7)
                console.log(num)

                 this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'api/vacationTeacher?type=1',
                   // {
                   //    "formDate": num,
                   //    "reason": this.textarea2,
                   //    "toDate": num1
                   //  },
                     {
                      "desc": this.textarea2,
                      "fromDate": num,
                      
                      "portrait": "",
                      "reasion": "BUSINESS",
                      "toDate": num1,
                      
                      
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
                      message: '出差审请申请成功，',
                      type: 'success'
                    }); 
                   
                }).catch((res) =>{
                    this.$message({
                      message: '出差审请申请失败，',
                      type: 'error'
                    }); 
                });


                this.dialogWork=false



            },
              vacationTime(){
                           var num= Date.parse(this.value2);
             var num1= Date.parse(this.value3);
                // console.log(this.value7)
                console.log(num)
                var d = new Date(this.value2);  
                var b = new Date(this.value3);  


        var fromDate=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        var toDate=b.getFullYear() + '-' + (b.getMonth() + 1) + '-' + b.getDate();
                 // var goWorkDate= this.countWorkDay('2017-08-01','2017-08-06')
                 // console.log('num1num1num1num1num1num1num1num1num1num1num1num1',goWorkDate)
                                   var beginDate = new Date(fromDate.replace(/-/g, "/"));
                      //结束日期
                      var endDate = new Date(toDate.replace(/-/g, "/"));
                      //日期差值,即包含周六日、以天为单位的工时，86400000=1000*60*60*24.
                      var workDayVal = (endDate - beginDate)/86400000 + 1;
                      //工时的余数
                      var remainder = workDayVal % 7;
                      //工时向下取整的除数
                      var divisor = Math.floor(workDayVal / 7);
                      var weekendDay = 2 * divisor;
                       
                      //起始日期的星期，星期取值有（1,2,3,4,5,6,0）
                      var nextDay = beginDate.getDay();
                      //从起始日期的星期开始 遍历remainder天
                      for(var tempDay = remainder; tempDay>=1; tempDay--) {
                          //第一天不用加1
                          if(tempDay == remainder) {
                              nextDay = nextDay + 0;
                          } else if(tempDay != remainder) {
                              nextDay = nextDay + 1;
                          }
                          //周日，变更为0
                          if(nextDay == 7) {
                              nextDay = 0;
                          }
                       
                          //周六日
                          if(nextDay == 0 || nextDay == 6) {
                              weekendDay = weekendDay + 1;
                          }
                      }
                      //实际工时（天） = 起止日期差 - 周六日数目。
                      workDayVal = workDayVal - weekendDay;
                      this.totleTime=workDayVal
                      console.log('jjjjjjjjjjjjjjjjjjjj',workDayVal)
              },
              postData(){
             var num= Date.parse(this.value2);
             var num1= Date.parse(this.value3);
             var timeOut=num1-num;
       


var time=(num1-num)/24*8/1000



            this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'api/vacationTeacher?type=1',
                    {
                      
                      "desc": this.textarea,
                      "fromDate": num,
                      "reasion": this.value4,
                       "portrait": "",
                      "vacationTime": time,
                      "toDate": num1
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
                      message: '请假审请申请成功',
                      type: 'success'
                    }); 
                    
                }).catch((res) =>{
                    this.$message({
                      message: '请假审请申请失败，',
                      type: 'error'
                    }); 
                });
                this.appointDialog=false
        },
             postData1(){
             var num= Date.parse(this.value5);
             var num1= Date.parse(this.value6);
             var timeOut=num1-num;
       


var time=(num1-num)/24*8/1000

console.log('123',this.radio)
var yesno=''
if (this.radio==1) {
        yesno='YES'
}else if(this.radio==2){
    yesno='NO'
}

            this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'api/vacationTeacher?type=1',
                   // {
                   //    "formDate": num,
                   //    "isGone": "CHECKED",
                   //    "schoolId": localStorage.schoolsId,
                   //    "toDate": num1,
                   //    "vacationTime": time,
                   //    "yesNo": yesno
                   //  },
                    {
                      "desc": this.textarea1,
                      "fromDate": num,
                      "isBusiness": yesno,
                      "portrait": "",
                      "reasion": "OVERTIME",
                      "toDate": num1,
                      "vacationTime": time
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
                      message: '加班审请申请成功，',
                      type: 'success'
                    }); 
                    
                }).catch((res) =>{
                    this.$message({
                      message: '加班审请申请失败，',
                      type: 'error'
                    }); 
                })
                this.appointDialog1=false
        },
               putCardY(){




                      this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'management/attendancesTeachers',
                    {},
                      
                    
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
                      message: '打卡成功，',
                      type: 'success'
                    }); 
                    // this.getData();
                }).catch((res) =>{
                    this.$message({
                      message: '打卡失败，',
                      type: 'error'
                    }); 
                })


        },
            getduit(index,row){
               
                // this.rowTeacherId=row.teacherId;
                // this.dutyId=row.dutyid
                
                // console.log('++++++++++++++++',row.dutyid)
                // console.log('+++++++teacherId++++++++',row.teacherId)


                      this.$http({
                        method: 'get',
                        url:this.$getApi+'processNode/management/queryByActorAndType?type=1',                  
                        headers: {
                            // 'content-type': "multipart/form-data",
                            'Authorization': 'Bearer ' + localStorage.token

                        }
                    }).then((res) => { // promise对象
                       
                        const {
                            body
                        } = res
                            this.flow=body.list
                            this.flow1=body.massageCC[0].name
                        console.log("===陪产假剩余====",body);
                        console.log("===陪产假剩余====",this.flow1);
                        console.log("===陪产假剩余====",res);
               
           
                      
                    })




              this.appointDialog = true;



            },  getduit1(){
                  this.$http({
                        method: 'get',
                        url:this.$getApi+'processNode/management/queryByActorAndType?type=1',                  
                        headers: {
                            // 'content-type': "multipart/form-data",
                            'Authorization': 'Bearer ' + localStorage.token

                        }
                    }).then((res) => { // promise对象
                       
                        const {
                            body
                        } = res
                            this.flow=body.list
                            this.flow1=body.massageCC[0].name
                        console.log("===陪产假剩余====",body);
                        console.log("===陪产假剩余====",this.flow1);
                        console.log("===陪产假剩余====",res);
               
           
                      
                    })




              this.appointDialog1 = true;



            }, getduit2(tag){
              this.tag=tag
              console.log(this.tag)
                  this.$http({
                        method: 'get',
                        url:this.$getApi+'processNode/management/queryByActorAndType?type=1',                  
                        headers: {
                            // 'content-type': "multipart/form-data",
                            'Authorization': 'Bearer ' + localStorage.token

                        }
                    }).then((res) => { // promise对象
                       
                        const {
                            body
                        } = res
                            this.flow=body.list
                            this.flow1=body.massageCC[0].name
                        console.log("===陪产假剩余====",body);
                        console.log("===陪产假剩余====",this.flow1);
                        console.log("===陪产假剩余====",res);
               
           
                      
                    })





              this.checkWorkDing = true;



            },getduit3(){
                  this.$http({
                        method: 'get',
                        url:this.$getApi+'processNode/management/queryByActorAndType?type=1',                  
                        headers: {
                            // 'content-type': "multipart/form-data",
                            'Authorization': 'Bearer ' + localStorage.token

                        }
                    }).then((res) => { // promise对象
                       
                        const {
                            body
                        } = res
                            this.flow=body.list
                            this.flow1=body.massageCC[0].name
                        console.log("===陪产假剩余====",body);
                        console.log("===陪产假剩余====",this.flow1);
                        console.log("===陪产假剩余====",res);
               
           
                      
                    })




              this.dialogWork=true ;



            },

             putCardAgain(){
                
                console.log(this.value3)
                console.log(this.value2)
                 var date= Date.parse(this.value2);
                 var date1= Date.parse(this.value3);
console.log(date)
console.log(date1)
               this.$http.put(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'management/attendancesTeachers',
                    
                       {
                          "actorId": localStorage.selfId,
                          "annual": 515,
                          "attendanceTeacherId": localStorage.selfId,
                          "desc": "string",
                          "endTime": 0,
                          "portrait": "string",//半身像
                          "retroType": "RETOR",
                          "sick": 0,
                          "startTime": 0,
                          "temperature": 0//体温
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
                    // this.getData();
                })










        },
        colors(e){
          var el = e.target;
          console.log('22222222222222222222222222',el)
        $(el).css("background-color","#f9ab04");

          console.log('1111111111111111111111111')
        },
        init(){
                        this.$http({
                    method: 'get',
                    url:this.$getApi+'scheduilingPerson/management/queryOne',                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token  

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res
            console.log('查询个人排班',body);
            console.log('查询个人排班',body[0].schedulingId.schedulingType);

                  if (body[0].schedulingId.schedulingType=='1') {
                    console.log('四次排班')
                     this.showSing=true
                  }else if (body[0].schedulingId.schedulingType=='2') {
                      this.showSing=false
                  }











                // 上午开始
                  var todayAmSH=body[0].schedulingId.amStartTime[0]
                  var todayAmSM=body[0].schedulingId.amStartTime[1]
                  var todayAmS=(todayAmSH<10?'0'+todayAmSH:todayAmSH)+":"+ (todayAmSM<10?'0'+todayAmSM:todayAmSM) 
                  this.todayAmS=todayAmS
                    // 上午结束

                  var todayAmEH=body[0].schedulingId.amEndTime[0]
                  var todayAmEM=body[0].schedulingId.amEndTime[1]
                  var todayAmE=(todayAmEH<10?'0'+todayAmEH:todayAmEH)+":"+ (todayAmEM<10?'0'+todayAmSM:todayAmEM)
                  this.todayAmE=todayAmE
                  // 下午开始
                  
                   var todayPmSH=body[0].schedulingId.pmStartTime[0]
                  var todayPmSM=body[0].schedulingId.pmStartTime[1]
                  var todayPmS=(todayPmSH<10?'0'+todayPmSH:todayPmSH)+":"+ (todayPmSM<10?'0'+todayPmSM:todayPmSM) 
                   this.todayPmS=todayPmS


                  // 下午结束
                  var todayPmEH=body[0].schedulingId.pmEndTime[0]
                  var todayPmEM=body[0].schedulingId.pmEndTime[1]
                  var todayPmE=(todayPmEH<10?'0'+todayPmEH:todayPmEH)+":"+ (todayPmEM<10?'0'+todayPmSM:todayPmEM)
                  this.todayPmE=todayPmE
                  console.log('aasdasd',todayPmE)

                })




            this.formDate =localStorage.formDate
            this.toDate =localStorage.toDate

            console.log("iiiiiiiiiiiiiiiiiiiiiiiiii",this.formDate )
            let now = new Date();
            this.year = now.getFullYear()
            this.month = now.getMonth()
            this.day = now.getDate()
            if (this.value.length>0) {
                if (this.range) { //范围
                    this.year = parseInt(this.value[0][0])
                    this.month = parseInt(this.value[0][1]) - 1
                    this.day = parseInt(this.value[0][2]) 
                    let year2 = parseInt(this.value[1][0])
                    let month2 = parseInt(this.value[1][1]) - 1
                    let day2 = parseInt(this.value[1][2]) 
                    this.rangeBegin = [this.year, this.month,this.day]
                    this.rangeEnd = [year2, month2 , day2]
                }else if(this.multi){//多选
                    this.multiDays=this.value;
                    this.year = parseInt(this.value[0][0])
                    this.month = parseInt(this.value[0][1]) - 1
                    this.day = parseInt(this.value[0][2]) 
                }else{ //单选
                    this.year = parseInt(this.value[0])
                    this.month = parseInt(this.value[1]) - 1
                    this.day = parseInt(this.value[2]) 
                }
            }
            
            console.log("-------",this.year)

                  this.$http({
                    method: 'get',
                    url:this.$getApi+'holidaysWeek/management?year='+this.year,                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token  

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res
            console.log(body);

     var newObj1={};
                        for (var j = 0; j < body.length; j++) {
                         

                                             var str = body[j].date;
                                             var name_=body[j].name;
                                           
                                          


                                            var key =str;
                                            var value = name_
                                            newObj1[key] = value;
                                            // console.info('123',newObj1);
                                            
                                      
                        }
                  this.festival.gregorian=newObj1
console.log("gregorian",this.festival.gregorian)
      

                })


                
                      this.$http({
                        method: 'get',
                        url:this.$getApi+'employee/management?actorId='+localStorage.actorId,                  
                        headers: {
                            // 'content-type': "multipart/form-data",
                            'Authorization': 'Bearer ' + localStorage.token

                        }
                    }).then((res) => { // promise对象
                       
                        const {
                            body
                        } = res
                        var opt=[];
                        opt.push({
                            label4:"病假剩余 "+ (body[0].sick/28800).toFixed(0)+"天",
                            value4:"SICK",
                        },{
                             label4:"年假剩余 "+(body[0].annual/28800).toFixed(0)+"天",
                            value4:"ANNUAL",
                        },{
                             label4:"调休剩余 "+(body[0].rest/28800).toFixed(0)+"天",
                            value4:"REST",//，未返回
                        },{
                             label4:"陪产假剩余 "+(body[0].barthWith/28800).toFixed(0)+"天",
                            value4:'BIRTHWITH',
                        },{
                             label4:"产假剩余 "+(body[0].barth/28800).toFixed(0)+"天",
                            value4:'BIRTH',
                        },{
                             label4:"婚假剩余 "+(body[0].marry/28800).toFixed(0)+"天",
                            value4:'MARRUAGE',
                        },{
                             label4:"丧假剩余 "+(body[0].funeral/28800).toFixed(0)+"天",
                            value4:'FUNERAL',
                        })
                        console.log("===陪产假剩余====",body);
                        console.log("===陪产假剩余====",res);
                    console.log("opt",opt)
                      this.options2=opt
           
                      
                    })

                             var date = new Date();
                                var seperator1 = "-";
                                var seperator2 = ":";
                                var month = date.getMonth() + 1;
                                var strDate = date.getDate();
                                if (month >= 1 && month <= 9) {
                                    month = "0" + month;
                                }
                                if (strDate >= 0 && strDate <= 9) {
                                    strDate = "0" + strDate;
                                }
                                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;

                          this.$http({
                        method: 'get',
                        url:this.$getApi+'management/attendancesTeachers/countAttendance?specialDate=' + currentdate,                  
                        headers: {
                            // 'content-type': "multipart/form-data",
                            'Authorization': 'Bearer ' + localStorage.token

                        }
                    }).then((res) => { // promise对象
                                    console.log('cccccccccccccccccccccccccccccccccccccccccccccccccccccc',res )

                                     var nomorData=res.body.count;
                                     var UNnomorData=res.body.del;
                                     var vacationData=res.body.vacation;
                                     var lateData=res.body.late;
                                     var beforGo=res.body.leave;
                                  
                                        this.chuqinData=nomorData
                                        this.notquanqinData=UNnomorData
                                        this.VacationData=vacationData
                                        this.LateData=lateData
                                        this.beforGo=beforGo
                                        console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',nomorData)







                        const {
                            body
                        } = res
                        
           
                      
                    })





                this.render(this.year, this.month)
        },
        goChack(){
             this.$router.push({
              path: '/singoIn'
            })
        },
        // 渲染日期
        render(y, m) {
            let firstDayOfMonth = new Date(y, m, 1).getDay()         //当月第一天
            let lastDateOfMonth = new Date(y, m + 1, 0).getDate()    //当月最后一天
            let lastDayOfLastMonth = new Date(y, m, 0).getDate()     //最后一月的最后一天
            this.year = y
            let seletSplit = this.value
            let i, line = 0,temp = [],nextMonthPushDays = 1
            for (i = 1; i <= lastDateOfMonth; i++) {
                let day = new Date(y, m, i).getDay() //返回星期几（0～6）
                let k
                // 第一行
                if (day == 0) {
                    temp[line] = []

                } else if (i == 1) {
                    temp[line] = []

                    k = lastDayOfLastMonth - firstDayOfMonth + 1
                    for (let j = 0; j < firstDayOfMonth; j++) {
                        // console.log("第一行",lunarYear,lunarMonth,lunarValue,lunarInfo)
                        temp[line].push(Object.assign(
                            {day: k,disabled: true},
                            this.getLunarInfo(this.computedPrevYear(),this.computedPrevMonth(true),k),
                            this.getEvents(this.computedPrevYear(),this.computedPrevMonth(true),k),
                        ))
                        k++;
                    }
                }
       
                
                if (this.range) { // 范围
                    // console.log("日期范围",this.getLunarInfo(this.year,this.month+1,i))
                    let options = Object.assign(
                        {day: i},
                        this.getLunarInfo(this.year,this.month+1,i),
                        this.getEvents(this.year,this.month+1,i),
                     )
                    if (this.rangeBegin.length > 0) {
                        let beginTime = Number(new Date(this.rangeBegin[0], this.rangeBegin[1], this.rangeBegin[2]))
                        let endTime = Number(new Date(this.rangeEnd[0], this.rangeEnd[1], this.rangeEnd[2]))
                        let stepTime = Number(new Date(this.year, this.month, i))
                        if (beginTime <= stepTime && endTime >= stepTime) {
                            options.selected = true
                        }
                    }
                    if (this.begin.length>0) {
                        let beginTime = Number(new Date(parseInt(this.begin[0]),parseInt(this.begin[1]) - 1,parseInt(this.begin[2])))
                        if (beginTime > Number(new Date(this.year, this.month, i))) options.disabled = true
                    }
                    if (this.end.length>0){
                        let endTime = Number(new Date(parseInt(this.end[0]),parseInt(this.end[1]) - 1,parseInt(this.end[2])))
                        if (endTime <  Number(new Date(this.year, this.month, i))) options.disabled = true
                    }
                    if (this.disabled.length>0){
                        if (this.disabled.filter(v => {return this.year === v[0] && this.month === v[1]-1 && i === v[2] }).length>0) {
                            options.disabled = true
                        }
                    }
                    temp[line].push(options)
                }else if(this.multi){//多选
                    console.log('2222222222222',this.multi)
                    let options
                    // 判断是否选中
                    if(this.value.filter(v => {return this.year === v[0] && this.month === v[1]-1 && i === v[2] }).length>0 ){
                        options = Object.assign({day: i,selected:true},this.getLunarInfo(this.year,this.month+1,i),this.getEvents(this.year,this.month+1,i))
                    }else{
                        options = Object.assign({day: i,selected:false},this.getLunarInfo(this.year,this.month+1,i),this.getEvents(this.year,this.month+1,i))
                        if (this.begin.length>0) {
                            let beginTime = Number(new Date(parseInt(this.begin[0]),parseInt(this.begin[1]) - 1,parseInt(this.begin[2])))
                            if (beginTime > Number(new Date(this.year, this.month, i))) options.disabled = true
                        }
                        if (this.end.length>0){
                            let endTime = Number(new Date(parseInt(this.end[0]),parseInt(this.end[1]) - 1,parseInt(this.end[2])))
                            if (endTime <  Number(new Date(this.year, this.month, i))) options.disabled = true
                        }
                        if (this.disabled.length>0){
                            if (this.disabled.filter(v => {return this.year === v[0] && this.month === v[1]-1 && i === v[2] }).length>0) {
                                options.disabled = true
                            }
                        }
                    }
                    
                    temp[line].push(options)
                } else { // 单选
                     // console.log(this.lunar(this.year,this.month,i));
                    
                    let chk = new Date()
                    let chkY = chk.getFullYear()
                    let chkM = chk.getMonth()
                    // 匹配上次选中的日期
                    if (parseInt(seletSplit[0]) == this.year && parseInt(seletSplit[1]) - 1 == this.month && parseInt(seletSplit[2]) == i) {
                        // console.log("匹配上次选中的日期",lunarYear,lunarMonth,lunarValue,lunarInfo)
                        temp[line].push(Object.assign(
                            {day: i,selected: true},
                            this.getLunarInfo(this.year,this.month+1,i),
                            this.getEvents(this.year,this.month+1,i),
                        ))
                        this.today = [line, temp[line].length - 1]
                    }
                     // 没有默认值的时候显示选中今天日期
                    else if (chkY == this.year && chkM == this.month && i == this.day && this.value == "") {
                        // console.log("今天",lunarYear,lunarMonth,lunarValue,lunarInfo)
                        temp[line].push(Object.assign(
                            {day: i,selected: true},
                            this.getLunarInfo(this.year,this.month+1,i),
                            this.getEvents(this.year,this.month+1,i),
                        ))
                        this.today = [line, temp[line].length - 1]
                    }else{
                        // 普通日期
                        // console.log("设置可选范围",i,lunarYear,lunarMonth,lunarValue,lunarInfo)
                        let options = Object.assign(
                            {day: i,selected:false},
                            this.getLunarInfo(this.year,this.month+1,i),
                            this.getEvents(this.year,this.month+1,i),
                        )
                        if (this.begin.length>0) {
                            let beginTime = Number(new Date(parseInt(this.begin[0]),parseInt(this.begin[1]) - 1,parseInt(this.begin[2])))
                            if (beginTime > Number(new Date(this.year, this.month, i))) options.disabled = true
                        }
                        if (this.end.length>0){
                            let endTime = Number(new Date(parseInt(this.end[0]),parseInt(this.end[1]) - 1,parseInt(this.end[2])))
                            if (endTime <  Number(new Date(this.year, this.month, i))) options.disabled = true
                        }
                        if (this.disabled.length>0){
                            if (this.disabled.filter(v => {return this.year === v[0] && this.month === v[1]-1 && i === v[2] }).length>0) {
                                options.disabled = true
                            }
                        }
                        temp[line].push(options)
                    }
                }
                // 到周六换行
                if (day == 6 && i < lastDateOfMonth) {
                    line++
                }else if (i == lastDateOfMonth) {
                    // line++
                    let k = 1
                    for (let d=day; d < 6; d++) {
                         // console.log(this.computedNextYear()+"-"+this.computedNextMonth(true)+"-"+k)
                        temp[line].push(Object.assign(
                            {day: k,disabled: true},
                            this.getLunarInfo(this.computedNextYear(),this.computedNextMonth(true),k),
                            this.getEvents(this.computedNextYear(),this.computedNextMonth(true),k),
                        ))
                        k++
                    }
                    // 下个月除了补充的前几天开始的日期
                    nextMonthPushDays=k
                }
            } //end for
            // console.log(this.year+"/"+this.month+"/"+this.day+":"+line)
            // 补充第六行让视觉稳定
            if(line<=5 && nextMonthPushDays>0){
                // console.log({nextMonthPushDays:nextMonthPushDays,line:line})
                for (let i = line+1; i<=5; i++) {
                    temp[i] = []
                    let start=nextMonthPushDays+(i-line-1)*7
                    for (let d=start; d <= start+6; d++) {
                        temp[i].push(Object.assign(
                            {day: d,disabled: true},
                            this.getLunarInfo(this.computedNextYear(),this.computedNextMonth(true),d),
                            this.getEvents(this.computedNextYear(),this.computedNextMonth(true),d),
                        ))
                    }  
                }
            }
            this.days = temp
        },
        computedPrevYear(){
            let value=this.year
            if(this.month-1<0){
                value--
            }
            return value
        },
        computedPrevMonth(isString){
            let value=this.month
            if(this.month-1<0){
                value=11
            }else{
                value--
            }
            // 用于显示目的（一般月份是从0开始的）
            if(isString){
                return value+1
            }
            return value
        },
        computedNextYear(){
            let value=this.year
            if(this.month+1>11){
                value++
            }
            return value
        },
        computedNextMonth(isString){
            let value=this.month
            if(this.month+1>11){
                value=0
            }else{
                value++
            }
            // 用于显示目的（一般月份是从0开始的）
            if(isString){
                return value+1
            }
            return value
        },
        // 获取农历信息
        getLunarInfo(y,m,d){
            let lunarInfo=calendar.solar2lunar(y,m,d)
            let lunarValue=lunarInfo.IDayCn
            // console.log(lunarInfo)
            let isLunarFestival=false
            let isGregorianFestival=false
            if(this.festival.lunar[lunarInfo.lMonth+"-"+lunarInfo.lDay]!=undefined){
                lunarValue=this.festival.lunar[lunarInfo.lMonth+"-"+lunarInfo.lDay]
                isLunarFestival=true
            }else if(this.festival.gregorian[m+"-"+d]!=undefined){
                lunarValue=this.festival.gregorian[m+"-"+d]
                isGregorianFestival=true
            }
            return {
                lunar:lunarValue,
                isLunarFestival:isLunarFestival,
                isGregorianFestival:isGregorianFestival,
            }
        },
        // 获取自定义事件
        getEvents(y,m,d){
            if(Object.keys(this.events).length==0)return false;
            let eventName=this.events[y+"-"+m+"-"+d]
            let data={}
            if(eventName!=undefined){
                data.eventName=eventName
            }
            return data
        },
        // 上月
        prev(e) {
          console.log('上月')

                               
            e.stopPropagation()
            if (this.month == 0) {
                this.month = 11
                this.year = parseInt(this.year) - 1
            } else {
                this.month = parseInt(this.month) - 1
            }
            this.render(this.year, this.month)
            console.log(this.year, this.month+1)
            this.$emit('selectMonth',this.month+1,this.year)
            this.$emit('prev',this.month+1,this.year)

                           var seperator1 = "-";
                            var months=this.month+1;
                             var years=this.year;
                      
                                var currentdate = years + seperator1 + (months<10?'0'+months:months) + seperator1 + "01";
 console.log('1111111111',this.year, this.month+1)
                          this.$http({
                        method: 'get',
                        url:this.$getApi+'management/attendancesTeachers/period?schoolId='+localStorage.schoolsId+'&periodType=MONTH&specialDate='+currentdate,                  
                        headers: {
                            // 'content-type': "multipart/form-data",
                            'Authorization': 'Bearer ' + localStorage.token

                        }
                    }).then((res) => { // promise对象
                                    console.log('cccccccccccccccccccccccccccccccccccccccccccccccccccccc',res )

                                     var nomorData=[];
                                     var UNnomorData=[];
                                     var vacationData=[];
                                     var lateData=[];
                                     for (var i = 0; i < res.body.length; i++) {
                                            if (res.body[i].status=="ALL") {
                                                nomorData.push(res.body[i])
                                            }
                                            if (res.body[i].status=="UNALL") {
                                                UNnomorData.push(res.body[i])
                                            } 
                                            if (res.body[i].status=="AFFAIR"||res.body[i].status=="ANNUAL"||res.body[i].status=="REST"||res.body[i].status=="SICK"||res.body[i].status=="BIRTH"||res.body[i].status=="BIRTHWITH"||res.body[i].status=="MARRIAGE"||res.body[i].status=="FUNERAL") {
                                                vacationData.push(res.body[i])
                                            }
                                            if (res.body[i].ae=="LATE"||res.body[i].as=="LATE"||res.body[i].pe=="LATE"||res.body[i].ps=="LATE") {

                                                lateData.push(res.body[i])
                                            }
                                        }   
                                        this.chuqinData=res.body.length
                                        this.notquanqinData=UNnomorData.length
                                        this.VacationData=vacationData.length
                                        this.LateData=lateData.length
                                        console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',nomorData)







                        const {
                            body
                        } = res
                        
           
                      
                    })
        },
        //  下月
        next(e) {
          console.log('下月')
            e.stopPropagation()
            if (this.month == 11) {
                this.month = 0
                this.year = parseInt(this.year) + 1
            } else {
                this.month = parseInt(this.month) + 1
            }
            this.render(this.year, this.month)
            this.$emit('selectMonth',this.month+1,this.year)
            this.$emit('next',this.month+1,this.year)
                        var seperator1 = "-";
                            var months=this.month+1
                            var years=this.year
                                var currentdate = years + seperator1 + (months<10?'0'+months:months) + seperator1 + "01";

                          this.$http({
                        method: 'get',
                        url:this.$getApi+'management/attendancesTeachers/period?schoolId='+localStorage.schoolsId+'&periodType=MONTH&specialDate='+currentdate,                  
                        headers: {
                            // 'content-type': "multipart/form-data",
                            'Authorization': 'Bearer ' + localStorage.token

                        }
                    }).then((res) => { // promise对象
                                    console.log('cccccccccccccccccccccccccccccccccccccccccccccccccccccc',res )

                                     var nomorData=[];
                                     var UNnomorData=[];
                                     var vacationData=[];
                                     var lateData=[];
                                     for (var i = 0; i < res.body.length; i++) {
                                            if (res.body[i].status=="ALL") {
                                                nomorData.push(res.body[i])
                                            }
                                            if (res.body[i].status=="UNALL") {
                                                UNnomorData.push(res.body[i])
                                            } 
                                            if (res.body[i].status=="AFFAIR"||res.body[i].status=="ANNUAL"||res.body[i].status=="REST"||res.body[i].status=="SICK"||res.body[i].status=="BIRTH"||res.body[i].status=="BIRTHWITH"||res.body[i].status=="MARRIAGE"||res.body[i].status=="FUNERAL") {
                                                vacationData.push(res.body[i])
                                            }
                                            if (res.body[i].ae=="LATE"||res.body[i].as=="LATE"||res.body[i].pe=="LATE"||res.body[i].ps=="LATE") {

                                                lateData.push(res.body[i])
                                            }
                                        }   
                                        this.chuqinData=res.body.length
                                        this.notquanqinData=UNnomorData.length
                                        this.VacationData=vacationData.length
                                        this.LateData=lateData.length
                                        console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',nomorData)







                        const {
                            body
                        } = res
                        
           
                      
                    })
        },
        // 选中日期
        select(k1, k2, e) {
           
           

    
            
            if (e != undefined) e.stopPropagation()
      
                    let begin=[]
                    let end=[]
                    if(this.zero){
                        this.rangeBegin.forEach((v,k)=>{
                            if(k==1)v=v+1
                            begin.push(this.zeroPad(v))
                        })
                        this.rangeEnd.forEach((v,k)=>{
                            if(k==1)v=v+1
                            end.push(this.zeroPad(v))
                        })
                    }else{
                        begin=this.rangeBegin
                        end=this.rangeEnd
                    }
                    console.log("选中日期",begin,end)
                    this.$emit('select',begin,end)
            //     }
                this.render(this.year, this.month)
     
                this.days[k1][k2].selected = true
                this.days[k1][k2].active = true
                this.day = this.days[k1][k2].day
                console.log(this.day);
                console.log(this.month);
                console.log(this.year);

                    var Month=  this.month< 9 ? '0'+ (this.month+1):(this.month+1)
                    var Day=  this.day< 10 ? '0'+ this.day:this.day

                    console.log(Month)
                    var date=this.year+'-'+Month+'-'+Day

console.log("date",date)
this.clickToday= date



        this.$http({
                    method: 'get',
                    url: this.$getApi+'management/attendancesTeachers?actorId='+ localStorage.actorId +'&date='+date,
                    headers: {
                        'Authorization': 'Bearer '+ localStorage.token
                    }
                }).then((res) => { // promise对象
                    
                    const {
                        body
                    } = res

                    console.log("=======attendancesTeachers========",body);


                    this.statu=body.status;

                    this.attendanceTeacherId=body.id
                    console.log("=======attendancesTeachers========",res);
                    console.log("=======attendancesTeachersID========",this.attendanceTeacherId);
                    this.checkObj=body
                    console.log('this.checkObj',this.checkObj)


                    var amStarSty=document.getElementsByClassName("amStar");
            var amEndty=document.getElementsByClassName("amEnd");
            var pmStarSty=document.getElementsByClassName("pmStar");
            var pmEndSty=document.getElementsByClassName("pmEnd");
// val == "LATE"  ? '迟到' : val == "ALL"  ? '正常'  :val == "LEAVE"  ? '早退' 
             console.log('oooooooooooooooooooooooooooooooooooooooooooooooooo',amStarSty)

             console.log("checkObj",this.checkObj)
        if (this.checkObj.as=="LATE") {

              this.checkObjAs=true
                    this.amS='red';
                // alert("123")

        }else if (this.checkObj.as=="ALL") {
                    this.amS='blue';
                    this.checkObjAs=false
        }

           if (this.checkObj.ae=="LEAVE") {
                    this.amE='orange';
                     this.checkObjAe=true
   
   
 
                // alert("123")

        }else if (this.checkObj.ae=="ALL") {
                    this.amE='blue';
                    this.checkObjAe=false
        }

        if (this.checkObj.ps=="LATE") {
                  
                    this.checkObjPs=true
                      this.pmS='red';
                // alert("123")

        }else if (this.checkObj.ps=="ALL") {
                    this.pmS='blue';
                    this.checkObjPs=false
        }
          if (this.checkObj.pe=="LEAVE") {
                    this.pmE='orange';
                    this.checkObjPe=true
                // alert("123")

        }else if (this.checkObj.pe=="ALL") {
                    this.pmE='blue';
                    this.checkObjPe=false
        }
            




                      var date1={
                "amStar":new Date( body.amStartTime*1000),
                "amEnd":new Date( body.amEndTime*1000),
                "pmStar":new Date( body.pmStartTime*1000),
                "pmEnd":new Date( body.pmEndTime*1000),
                }

                var data1amS=date1.amStar
      var data2amStar= data1amS=="Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)"? "":data1amS

          var data1amE=date1.amEnd
      var data2amEnd= data1amE=="Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)"? "":data1amE

        var data1pmS=date1.pmStar
      var data2pmStar= data1pmS=="Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)"? "":data1pmS

          var data1pmE=date1.pmEnd
      var data2pmEnd= data1pmE=="Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)"? "":data1pmE


console.log('data2amStar',data2amStar)
    console.log('**********',date1)
    if (data2amStar!='') {
      var amS = new Date(data2amStar);  

              var amStar11=(amS.getHours()<10?'0'+amS.getHours():amS.getHours()) + ':' + (amS.getMinutes()<10?'0'+amS.getMinutes():amS.getMinutes()) + ':' + (amS.getSeconds()<10?'0'+amS.getSeconds():amS.getSeconds())
              this.show=true
            }else{
              // amStar11=""
              this.show=false
            }
               
if (data2amEnd!='') {
            var amE = new Date(data2amEnd); 

              var amEnd11=(amE.getHours()<10?'0'+amE.getHours():amE.getHours()) + ':' + (amE.getMinutes()<10?'0'+amE.getMinutes():amE.getMinutes()) + ':' + (amE.getSeconds()<10?'0'+amE.getSeconds():amE.getSeconds());
              this.show1=true
            }else{
              // amEnd11=""
              this.show1=false
}

if (data2pmStar!='') {
           var pmS = new Date(data2pmStar);  
            

              var pmStar11= (pmS.getHours()<10?'0'+pmS.getHours():pmS.getHours()) + ':' + (pmS.getMinutes()<10?'0'+pmS.getMinutes():pmS.getMinutes()) + ':' + (pmS.getSeconds()<10?'0'+pmS.getSeconds():pmS.getSeconds());
              this.show2=true
            }else{
              // pmStar11=""
              this.show2=false
}
               

if (data2pmEnd!='') {
              var pmE = new Date(data2pmEnd);  


              var pmEnd11= (pmE.getHours()<10?'0'+pmE.getHours():pmE.getHours()) + ':' + (pmE.getMinutes()<10?'0'+pmE.getMinutes():pmE.getMinutes()) + ':' + (pmE.getSeconds()<10?'0'+pmE.getSeconds():pmE.getSeconds()); 
              this.show3=true
            }else{
              // pmEnd11=""
              this.show3=false
}





            

            console.log("////////////////////////",amStar11)
            console.log("////////////////////////",amEnd11)
            console.log("////////////////////////",pmStar11)
            console.log("////////////////////////",pmEnd11)

     


      var date2={
                "amStar":amStar11,
                "amEnd":amEnd11,
                "pmStar":pmStar11,
                "pmEnd":pmEnd11,
      }





            this.dataObj=date2
            console.log("qqqqqq",date1)


            
                     

                })







 // var calendarobj = this.$store.state.calendarobj
 //      this.calendarObj=calendarobj
 //      console.log('calendarobj',calendarobj)





       
// this.dialogVisible=true



            



                this.today = [k1, k2]
                this.$emit('select',[this.year,this.zero?this.zeroPad(this.month + 1):this.month + 1,this.zero?this.zeroPad(this.days[k1][k2].day):this.days[k1][k2].day])
                this.$emit('active',[this.year,this.zero?this.zeroPad(this.month + 1):this.month + 1,this.zero?this.zeroPad(this.days[k1][k2].day):this.days[k1][k2].day])
                this.sthClick(k1, k2,e);
            // }
            day.show = !day.show;
        },
        changeYear(){
            if(this.yearsShow){
                this.yearsShow=false
                return false
            }
            this.yearsShow=true
            this.years=[];
            for(let i=~~this.year-10;i<~~this.year+10;i++){
                this.years.push(i)
            }
        },
        selectYear(value){
            this.yearsShow=false
            this.year=value
            this.render(this.year,this.month)
            this.$emit('selectYear',value)
        },
        // 返回今天
        setToday(){
            let now = new Date();
            this.year = now.getFullYear()
            this.month = now.getMonth()
            this.day = now.getDate()
            this.render(this.year,this.month)
            // 遍历当前日找到选中
            this.days.forEach(v => {
                let day=v.find(vv => {
                    return vv.day==this.day && !vv.disabled
                })
                if(day!=undefined ){
                  day.selected=true  
                }
                
            })
        },
        // 日期补零
        zeroPad(n){
            return String(n < 10 ? '0' + n : n)
        },
    }
}
</script>
© 2018 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
API
Training
Shop
Blog
About
Press h to open a hovercard with more details.