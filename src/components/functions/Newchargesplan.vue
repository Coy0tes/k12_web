<template>
    <div class="main">
      <div class="contentd">
        
         <div class="title">
      <!-- <span class="headerd">新增收费计划</span> -->
    </div>
    <p>软件使用方：北京博顿创意幼儿园</p>
    <div class="costKind">
      <span>科&nbsp;&nbsp;目:</span><el-select v-model="valuedd"  type="input" placeholder="请选择科目" class="costKind_input" @change="chanalue">
    <el-option
      v-for="item in nameOptions"
      :key="item.valuedd"
      
    
      :label=" item.valuedd"
      :value="item.labell">
    </el-option>
  </el-select>

    </div>


    <div class="costKind">
      <span>周&nbsp;&nbsp;期:</span><el-select v-model="value22" placeholder="年" type="input"   :formatter="formatDate" class="costKind_input" >
    <el-option
      v-for="item in periodArry"
      :key="item.value22"
      :label="item.value22"
      :value="item.label22">
    </el-option>
  </el-select>

    </div>

    <div class="show">
     <!--  <ul >
        <li> - - - - - -按 年 收费，折扣率 10% - - - </li>
        <li> - - - - -按 半年 收费，折扣率 5%- - - - </li>
        <li> - - - - - -按 月 收费，折扣率 0%- - - - </li>
      </ul> -->


    </div>

  <div class="useKind">
      <span>应用类型:</span><el-select v-model="value" type="input" placeholder="选择周期" class="costKind_input" @change="identFun">
    <el-option
      v-for="item in identArry"
      :key="item.value"
      :label="item.value"
      :value="item.label">
    </el-option>
  </el-select>

    </div>

<div class="finelMoney">
      <span>最终金额:</span><el-input v-model="totleMoney" type="input" value="1000"  class="costKind_input1">
      </el-input>
      <label for="tolAmount">
      <el-input v-model="totleMoney" type="input" :disabled="true" value="1000"  class="costKind_input2">
      </el-input>
      </label>
    <!--    <el-select v-model="value" placeholder="请选择" class="tol_sele">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select> -->
      <span>
       

      </span>

    </div>

<div class="useKind" style="padding-left:9px;">
      <span>应用对象:</span><el-select v-model="valued" 
      type="input" 
      placeholder="普通班" 
      class="costKind_input"
      @change="changeId"
      >
    <el-option
      v-for="item in option"
      :key="item.valued"
      :label="item.labeld"
      :value="item.valued"
      @click='changeId'>
    </el-option>
  </el-select>
  <br/>

  <!--    <el-tag
  v-for="tag in klassOptions"
  :key="tag.name"
  closable

  :type="tag.type"
   @close="handleClose(tag)">
  {{tag.name}}
</el-tag> -->

<el-tag
  :key="tag"
  v-for="tag in klassOptions"
  closable
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag.name}}
</el-tag>







    </div>

    <div class="dateKind">
      <span>截止时间:</span><el-date-picker
      v-model="endAt"
      type="date"
      placeholder="选择日期"
      class="datepic"
     >
    </el-date-picker>

    </div>

      <a style="color:red;font-size:10px;">
      <img src="../../assets/weixin.jpg" height="20" width="20" alt="" style="vertical-align: middle;">
      微信支付</a>

    <div class="useKind">
      
       <el-button type="primary" @click="reg(1)" class="addbtn">添加</el-button>
       <!-- <el-button type="primary" @click="putData">添加1</el-button> -->
    </div>

      </div>
   



    </div>
</template>
<script>
    export default {
        data(){

            return {
              totleMoney:0,
              expenseMoney:0,
              periodArry:[],
              value22:'',
              identArry:[],
          
              tableData:[],
          options: [],
        value: '',
        item: [{
          val: '1',
          lab: '业主'
        }, {
          val: '2',
          lab: '员工'
        }, {
          val: '3',
          lab: '普通'
        }],
        val: '',
         option: [{
          valued:0,
          id:'COMMON_KLASS',
          labeld: '普通班'
        }, {
          valued:1,
          id:'INTEREST_KLASS',
          labeld: '兴趣班'
        }, {
          valued:3,
          id:'STUDENT',
          labeld: '指定儿童'
        }],
        valued: 0,
        value1: '',
         counst: [
          { name: '奇思三班', id: 1 },
    
        ],

            cycleId: "",
            endAt: 0,
            expenseId: "",
            identityId: "",
            money: 0,
            target: '',
            targetType: 0,





            fullScreenLoading: false,
            chargesOptions:[],
            nameOptions:[],
            valuedd:'',
            amount:'',
            klassOptions:[],
            tolAmount:'',
            value8:'',
            totlArry:[],
            labell:'',
            lab:'',
            val:'',
            target:'',
            
            
            }
           

        },
        methods:{
          formatDate: function (row, column) {
            // console.log('-------formatDate------------',row.periodDiscounts)
        return row.value == "YEAR" ? '年' : row.value == "HALF_YEAR" ? '半年' :  row.value == "QUARTER" ? '季' :  row.value == "MONTH" ? '月': "未知";

    },

               getData() {

                      

                this.$http({
                    method: 'get',
                    url: this.$getApi+'expense/entry',
                    headers: {
                        'Authorization': 'Bearer '+ localStorage.token
                    }
                }).then((res) => { // promise对象
                    console.log("======================", res);







                  
                    const {
                        body
                    } = res

                    console.log("=======schools data========",body);
                    console.log("=======schools data========",res.body);

                    if (!!body.length) {
                        this.tableData = body
                        this.count = body.length
                        this.endAt = new Date().getTime();
                    } else {
                        alert('err:' + body)
                    }


                    // 最终金额计算 star
                    var totlArry=[];
                      for(let i=0; i<res.body.length; i++){
                        if(res.body[i].periodDiscounts||res.body[i].identDiscounts){
                          // console.log('***************************',res.body[i].periodDiscounts);
                          let dDis=res.body[i].periodDiscounts;
                // console.log('***************************',dDis);
                          let iDis=res.body[i].identDiscounts;
                    // console.log('***************************',iDis);      

                          for(let j=0; j<dDis.length; j++){
                          // console.log('++++++++++++++++',dDis[j].discountRate/100);
                          var dDisj= dDis[j].discountRate/100 
                          };
                          for(let k=0; k<iDis.length; k++){
                          // console.log('++++++++++++++++',iDis[k].discountRate/100);
                          var iDisk=iDis[k].discountRate/100

                          }
                           let totlDis=iDisk * dDisj;
                           // console.log('////////////////',totlDis)
                          var tolAmount= parseInt(res.body[i].amount-res.body[i].amount*totlDis);

                         
                          
                      // 最终金额计算end
                          if(isNaN(tolAmount)){
                              tolAmount=res.body[i].amount;
                             console.log('*************',tolAmount)
                          }
                         
                          totlArry.push(tolAmount);
                          console.log(totlArry);
                          console.log('...............',tolAmount)






                        }
                      }


                      if (!!body.length) {
                        
                          var nameArray=[];
                          res.body.forEach(function(item, index, array){
                               nameArray.push({
                                valuedd:item.name,
                                labell:item.id,

                                



                               })    
                          })
                             //this.value = klassesArray[0].value
                             this.nameOptions = nameArray;
                              console.log('----------',)
                            } else {
                                alert('err:' + body)
                            }


                            var cycleArray=[];
                          res.body.forEach(function(item, index, array){
                               cycleArray.push({valu:item.periodType,label:item.id,
                                //   cycleId:item.cycleId.id,//周期id
                                // identityId:item.identityId.id//身份折扣id
                               })    
                          })
                             //this.value = klassesArray[0].value
                             this.options = cycleArray;
                                
                            

                                 var typeArray=[];
                          res.body.forEach(function(item, index, array){
                               typeArray.push({val:item.identDiscounts[0].periodType,lab:item.id})    
                          })
                             //this.value = klassesArray[0].value
                             this.typeOptions = typeArray;
                             console.log('periodType',this.typeOptions)








                        var klassName = this.$store.state.cost
                        // this.tableData = localStorage.schools
                        // this.count = localStorage.schools.length;
                        console.log('+++++++    拿到的数据+++++++++',klassName);
                        console.log('+++++++    拿到的数据1111+++++++++',klassName.cost[0].id);
                        this.target=klassName.cost[0].id
                        let counst=klassName.cost;
                       
                        // console.log('+++++++    拿到的数据**********',counst);
                        // for(var i=0;i<counst.length;i++){
                        //     console.log(counst[i]);
                        // }


                        var qwer = this.$store.state
                      console.log("guardian log is：",qwer )









                              var klassArray=[];
                          counst.forEach(function(item, index, array){
                               klassArray.push({name:item.name,id:item.id})    
                          })
                             //this.value = klassesArray[0].value
                             this.klassOptions = klassArray;

                     




                })
            },
              identFun(){
                console.log('identTypeVal',this.value22)

                var periodNum=0;
                  for(var q=0;q<this.periodArry;q++){
                    if(this.value22==this.periodArry[q].value22){
                     var periodNum = this.periodArry[q].discountRate/100
                    };
                    
                 };

                 var identNum=0;
                  for(var p=0;p<this.identArry;p++){
                    if(this.value==this.identArry[p].value){
                     var identNum = this.identArry[p].discountRate/100
                     console.log('identNum',identNum)
                    };

                  }



                this.totleMoney=this.expenseMoney-(this.expenseMoney*periodNum)-(this.expenseMoney*identNum)
                console.log( this.periodArry)

              },


              chanalue(){


                      // var qwer = this.$store.state.cost.cost[0].id
                      // console.log("guardian log is：",qwer )



                // valuedd
                console.log(this.valuedd)
                  var newArry=this.tableData
                  // console.log( newArry)
                  for(var i=0;i<newArry.length;i++){
                    if(this.valuedd==newArry[i].id){
                      console.log(newArry[i]);

                      this.expenseMoney=newArry[i].amount;
                      var ident=[];
                      newArry[i].identDiscounts.forEach(function(item,index,array){
                            ident.push({
                                value:item.identType,
                                label:item.id,
                                discountRate:item.discountRate
                            })
                      });
                     this.identArry=ident;

                      var period=[];
                       newArry[i].periodDiscounts.forEach(function(item,index,array){
                            period.push({
                                value22:item.periodType,
                                label22:item.id,
                                discountRate:item.discountRate
                            })
                      });



                  
                    this.periodArry=period;
                     




                    }
                    
                  }

                   
                      console.log(this.identArry)



              },





           reg(tag) {


// 需要根据taegetType 的值进行判断target的值
                        var klassName = this.$store.state.cost
                        // this.tableData = localStorage.schools
                        // this.count = localStorage.schools.length;
                        console.log('+++++++    拿到的数据+++++++++',klassName);
                        console.log('+++++++    拿到的数据1111+++++++++',klassName.cost[0].id);
                        this.target=klassName.cost[0].id
                        let counst=klassName.cost;
              this.$http.post(
         
           this.$getApi + 'charge/create',
 
          {
              "cycleId":this.value22,
              "endAt":this.endAt,
              "expenseId": this.valuedd,
              "identityId": this.value,
              "money": this.totleMoney,
              "target": this.target,
              "targetType": this.valued
            
          },
                                               
          {
          headers:{
                      
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }

                    }
        ).then((res) => { // promise对象
            this.$message({
                      message: '添加成功',
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
                      message: '添加失败',
                      type: 'error'
                    }); 
                });

        
this.tableData.push({

})

      },

              putData(tag){
        //    this.$http.put(
        //   // tokrn:localStorage.token,
        //   this.$getApi + 'charge/update/1',
        //       {
        //         "cycleId": 5,
        //         "endAt": 0,
        //         "expenseId": this.expenseId,
        //         "identityId": 5,
        //         "money": 5000,
        //         "target": "2,3,4",
        //         "targetType": 0
        //       },
                
        //   {
        //   headers:{
        //                 // 'content-type': "multipart/form-data",
        //                 'Content-Type': 'application/json',
        //                 'Authorization': 'Bearer '+ localStorage.token

        //               }
        //             }
        // ).then((res) => { // promise对象
        //   console.log("===regist==== res=====",res);
        //   if(res.ok){
        //    console.log('------------',res)
        //   }else{
        //     this.$router.push({path:'newschool'});
        //     console.log('---------',err)
        //   }
          
    
        // })
        // .catch(function(err){
        //     console.log(err)
        //   })
        //   
        console.log('-----------------',localStorage.multipleSelection)
        console.log('-----------------',localStorage.token)

        },
        changeId(){
          console.log('执行了');
          console.log('执行了',this.expenseId);
         // this.$store.commit("jia")
          if(this.valued==0){
            this.$router.push({path:'klasses'});
            this.$store.state.check=true;
            console.log('-------',this.$store.state.check)
          }else if (this.valued==1) {
           this.$store.state.check=true;
          this.$router.push({path:'interestClass'});
                      console.log('-------',this.$store.state.check)


          }else if(this.valued==3){
             this.$router.push({path:'students'});
             this.$store.state.check=true;
             console.log('-------',this.$store.state.check)

          }

        }, handleClose(tag) {
          console.log(tag)
        this.klassOptions.splice(this.klassOptions.indexOf(tag), 1);
      },
      aa(){
          var klassName = this.$store.state.cost
                        // this.tableData = localStorage.schools
                        // this.count = localStorage.schools.length;
                        console.log('+++++++    拿到的数据+++++++++',klassName);
                        console.log('+++++++    拿到的数据1111+++++++++',klassName.cost[0].id);
                        this.target=klassName.cost[0].id
                        let counst=klassName.cost;
                       
                        // console.log('+++++++    拿到的数据**********',counst);
                        // for(var i=0;i<counst.length;i++){
                        //     console.log(counst[i]);
                        // }


                        var qwer = this.$store.state
                      console.log("guardian log is：",qwer )









                              var klassArray=[];
                          counst.forEach(function(item, index, array){
                               klassArray.push({name:item.name,id:item.id})    
                          })
                             //this.value = klassesArray[0].value
                             this.klassOptions = klassArray;
      }




        },
        // created(){
        //   // location.reload();
        // }
        
        mounted() {

            this.getData();
          

        },
         activated(){
            this.aa()
        }
    }
</script>
<style scoped>
    .main{
      font-family: "宋体";
      font-size: 14px;
      text-align: center;
     /* border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;*/
      padding-top: 30px;
      width: 106.1%;
      /*height: 100%;*/
      margin-left: -20px;
      margin-top: -100px;
    }
    .costKind{
      width: 100%;
      text-align: center;
      margin-bottom: 15px;
      margin-left: -0%;
    }
    div span{
      margin-right: 12px;
    }
    .costKind_input{
      width: 244px;
      height: 52px;
      verticla-align:center;
    }
    .el-input{
      text-align: center;
      width: 400px;
    }
    .useKind{
      width: 100%;
      text-align: center;
      margin-bottom: 15px;
      margin-left: -0%;
         
    }
    .finelMoney{
       width: 100%;
      text-align: center;
      margin-bottom: 15px;
      margin-left: 7px;
    }
    .dateKind{
      width: 100%;
      text-align: center;
      margin-bottom: 15px;
      margin-left: -0%;
    

    }
    .time{
      width: 400px;
    }
    .el-input__icon{
      width: 50px;
    }
    .el-button{
      width: 480px;
      margin-left: 0%;
      margin-top: 60px;
    }
    .show ul{
        list-style: none;
        width: 244px;
        overflow: hidden;
    }
    .show ul li{
      width: 244px;
      overflow: hidden;;
      margin: 10px 0;
      font-size: 12px;
    }
    .show{
      margin: -20px 0 15px 27%;
      
    }



     .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .costKind_input1{
     width: 114px;
      height: 52px;
     /* padding-left: 20px;*/
      verticla-align:center;
  }
  .costKind_input2{
    width: 114px;
      height: 52px;
     margin-left: 10px;
      verticla-align:center;
  }
  .tol_sele{
    margin-left: 10px;
    padding-left: 10px;
  }
  .contentd{
    width: 100%;
    height: 94%;
    /*border: 1px solid #87ace0;*/
    /*margin-left: 26%;*/
    color: #515584;
  }
  .datepic{
    width: 240px;
  }
  .addbtn{
    width: 324px;
    background-color: #61bfff;
    border: 1px solid #61bfff;
  }
  .headerd{
    width: 100%;
    height: 50px;
    display: inline-block;
    line-height: 50px;
    background-color: #61bfff;
    margin-left: -10px;
    color: #fff;
  }
  .title{
    width: 100%;
  }
  .top{
    width: 107.5%!important;
 
  }




</style>
