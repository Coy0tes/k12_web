<template>

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
                <el-button type="primary" class="mainbtn1" @click="cancel">取消</el-button>
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
                <el-button type="primary" class="mainbtn" @click="crcle">添加折扣</el-button>
                 <el-button type="primary" class="mainbtn1" @click="cancel1">取消</el-button>
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
                 - - -  - - - - - - -按{{item.periodType}} 收费，折扣率 {{item.discountRate}}%- - -  - - - -<el-button type="danger" size="mini" class="delet_colr" @click="handleDelete1(index)">删除</el-button>
              </li>
              <!-- <li>  - - - - - - - - -按 年 收费，折扣率 10% - - - - - - <el-button type="danger" size="mini" class="delet_colr">删除</el-button></li> -->
              <!-- <div style="display:none">
              <li id="tis_li" v-bind:disabled="disabledInput"> - - -  - - - - - -按 {{this.val}} 收费，折扣率 {{this.inputinit_}}%- - - - - - <el-button type="danger" size="mini" class="delet_colr" @click="deleteSth1">删除</el-button> </li>
              </div> -->
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
                 - - -  - - - - - - -按{{item.identType}} 收费，折扣率 {{item.discountRate}}%- - -  - - - -<el-button type="danger" size="mini" class="delet_colr" @click="handleDelete(index)">删除</el-button>
              </li>
              <!-- <li> - - - - - - - - - -业主 收费，折扣率 10% - - - - - -<el-button type="danger" size="mini" class="delet_colr">删除</el-button></li> -->
           <!--    <div style="display:none">
              <li id="tis_li1" v-bind:disabled="disabledInput"> - - -  - - - - - - -按{{this.valued}} 收费，折扣率 {{this.inputinit}}%- - -  - - - -<el-button type="danger" size="mini" class="delet_colr" @click="deleteSth">删除</el-button></li>
              </div> -->
            </ul>
            
        </div>

        <div class="kaoqin" style="margin-left:10px;" >
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
                       <el-input-number v-model="R_one" controls-position="right"  @change="handleChange" :min="2" :max="32" style="width:120px;"></el-input-number>

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

                      <el-select v-model="V_bd_value" placeholder="大于" style="width:80px;margin:0 4px; ">
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
                      
                      <el-input-number v-model="R_two" controls-position="right"  @change="handleChange" :min="1" :max="10000" style="width:120px; margin-left:-1px;"></el-input-number>
                        <span v-show='yuan'>(元)</span><span v-show='baifenhao'>(%)</span> 
                      
                        <el-button type="primary" @click="addBackRule" ><i class="el-icon-plus" circle></i></el-button>


                   </div>    
     
                        
                        <!-- <el-button type="primary" @click="addBackRule">添加</el-button> -->
                       <!--  <el-button type="primary"  @click="addBackRule"> <i class="el-icon-circle-plus"></i></el-button>
                        <el-button type="primary" @click="crcle">添加</el-button> -->

                      
                    <ul style="margin-top:10px; margin-left:164px;width:400px;">

                      <li v-for="(item,index) in backRuleArry" style="color:#aaaaaa">
                        {{item.kq_value}}{{item.Bd_value}}{{item.R_one}}<span v-show='tian'>(天)</span><span v-show='ci'>(次)</span> 时 


                        <span>{{item.V_value}} {{item.V_bd_value}} {{item.V_bd_num}} <span v-show='ci'></span></span>

                        单月退还 {{item.R_value}}{{item.R_two}} <i @click="paybackDelete(index)" class="el-icon-error"></i>
<!-- <el-button type="danger"  size='mini' style="background-color:ff4949!important; border-radius:50%;"><i class="el-icon-delete" circle></i></el-button> -->

                        <!-- <span v-show='yuan'>元</span> --><!-- <span v-show='baifenhao'>(%)</span>  -->
                        
                      </li>                     
                    </ul>
        </div> 

        <div class="main_btn">

          <el-button type="primary" class="add_sth1" @click="reg(1)" style="margin-botton；20px;">添 加</el-button>
          <!-- <el-button type="primary"  @click="test">测试</el-button> -->
        </div>
</div>
<!-- 弹出框 -->
     
 
      </div> 
</template>
<script>
    export default {
        data(){
            return {
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
              label11: '半年'
            }, {
               id:'3',
              value11: 'QUARTER',
              label11: '季'
            }, {
               id:'4',
              value11: 'MONTH',
              label11: '月'
            }, {
               id:'5',
              value11: 'DAY',
              label11: '日'
            }, {
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
              id:'1',
              valued11: 'PROPRIETOR',
              label11: '业主'
            }, {
              id:'2',
              valued11: 'MEMBER',
              label11: '员工'
            }, {
              id:'2',
              valued11: 'USER',
              label11: '普通'
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
                }
            },
        methods:{




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
          // console.log('----------',this.inputinit),
          // console.log('----------',this.label),
          // console.log('----------',this.name),
          // console.log('----------',this.inputinit_),
          // console.log('----------',this.val),
          // console.log('----------',this.value),
          // console.log('----------',token),
          
          {
            "amount":this.amount,
            "identDiscounts":this.IdentityArry,
            "name": this.name,
            "delayCharge": true,


            "paybackByDays": this.daysPayBack,

            "paybackBySemesters":this.semestersPayback,



            "periodDiscounts":this.crcleArry,
              "periodType": this.value,
            
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
          })
      },
// 获取数据
      
      addBackRule(){
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


        var newObj={};
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
     pValue:this.R_two*1,       //没有获取到
     vacationCount:this.V_bd_num,
     vacationDays:this.R_one
  })

  console.log('学期请假组-----',this.semestersPayback)

}








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
            if(this.R_value=='金额'){
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
          Identity(){
            this.IdentityArry.push({
                identType:this.valued,
                discountRate:this.inputinit*1
            })
            console.log("IdentityArry",this.IdentityArry)

          },
          handleDelete(index){
            // console.log("handleDelete row",this);
            console.log("handleDelete index",index);
           this.IdentityArry.splice(index, 1)
          },

          crcle(){
              console.log('22222222222',this.val)
            
        
            this.crcleArry.push({
              periodType:this.val,
              discountRate:this.inputinit_*1

            })

            console.log("crcleArry",this.crcleArry)


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
           }
          },
     
         
         
         
        },
         mounted(){
            console.log('---------mounted--------------');
            this.getData();
            
          },
           created() {
           
              
        }
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
    /*margin-left: -20px;*/
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
    /*margin-left: -20px;*/
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
    width: 274px;
   
  }
  .zhekou_btn{
    display: inline-block;

  }
  .tis_li{
    margin-top: 30px;
    margin-left: 55px;
  }
  .tis_li li{
    margin-bottom: 20px;
  }
  .main_btn{
    width: 400px;
    text-align: center;
    margin-left: 50%;
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
        margin-left: -0.1%;
      margin-top: -10.9%;
      display: none;

    }
    .allplus_1{
      width: 100%;
      height: 100.5%;
      background-color: rgba(0,0,0,.3);
      position: absolute;
      z-index: 100;
      margin-left: -0.1%;
      margin-top: -10.9%;
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
  height: 540px;
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
  width: 107.5%!important;
}
.back_sty>input{
  height: 32px!important;
}
  

</style>


<!-- // //   {
// //   "amount": 0,
// //   "identDiscounts": [
// //     {
// //       "discountRate": 0,
// //       "identType": "USER"
// //     }
// //   ],
// //   "name": "string",
// //   "periodDiscounts": [
// //     {
// //       "discountRate": 0,
// //       "periodType": "YEAR"
// //     }
// //   ],
// //   "periodType": "YEAR"
// // } -->

<!-- 
延迟收费解释
大概意思  上月钱下月结

孩子当月的开销及各种支出费用 在次月（可以具体到几号）结清当月金额
 -->