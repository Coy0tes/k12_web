<template>
    <div class="main">
    <div class="title">
      <span>费种转入</span>
    </div>


<div class="useKind">
      <span>应用儿童:</span><el-select v-model="expenseId" 
      type="input" 
      placeholder="普通班" 
      class="costKind_input2"
      @visible-change="changeId"
      >
    <el-option
      v-for="item in option"
      :key="item.valued"
      :label="item.labeld"
      :value="item.valued">
    </el-option>
  </el-select>
   <el-button type="primary" class="search" @click="handleSearch">查询</el-button>
  <br/>


<el-tag
  :key="tag"
  v-for="tag in klassOptions"
  closable
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag.name}}
</el-tag>


<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClo">
  
<el-table :data="gridData">
    <el-table-column property="id" label="id" align="center" width="150"></el-table-column>
    <el-table-column property="studentName" align="center" label="姓名" width="200"></el-table-column>
    <el-table-column property="expenseEntry.name" align="center" label="费种" width="200"></el-table-column>
    <el-table-column property="money" align="center" label="余额"></el-table-column>
  </el-table>





  <span slot="footer" class="dialog-footer">
    <el-button class="tag_btn" @click="dialogVisible = false">取 消</el-button>
    <el-button class="tag_btn" type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>




    </div>


     <div class="costKind">
      <span>转出费种:</span><el-select v-model="valued_"  type="input" placeholder="业主" class="costKind_input">
    <el-option
      v-for="item in redundOptions"
      :key="item.valued_"
     
      
      :label=" item.valued_"
      :value="item.label_">
    </el-option>
  </el-select>

    </div>

         <div class="costKind_re">
      <span>结余:</span>
      <el-input class="costKind_input" v-model="surplus"></el-input>

    </div>



    <div class="costKind">
      <span>转入费种:</span><el-select v-model="value"  type="input" placeholder="业主" class="costKind_input">
    <el-option
      v-for="item in nameOptions"
      :key="item.valuedd"
      :identityId="item.nameId"
      :cycleId="item.cycleId"
      :label=" item.valuedd"
      :value="item.labell">
    </el-option>
  </el-select>

    </div>


    <div class="costKind">
      <span>周&nbsp;&nbsp;期:</span><el-select v-model="value" placeholder="年" type="input" :formatter="formatDate" class="costKind_input">
    <el-option
      v-for="item in options"
      :key="item.valu"
      :label="item.valu"
      :value="item.label">
    </el-option>
  </el-select>

    </div>

   <!--  <div class="show">
      <ul >
        <li> - - - - - - - - - -按 年 收费，折扣率 10% {{}} - - - - - - - -</li>
        <li> - - -  - - - - - -按 半年 收费，折扣率 5%- - - - - - - - -</li>
        <li> - - - - -  - - - - -按 月 收费，折扣率 0%- - - - - - - - -</li>
      </ul>


    </div> -->

  <div class="useKind">
      <span>应用类型:</span><el-select v-model="val" type="input" placeholder="业主" class="costKind_input">
    <el-option
      v-for="item in typeOptions"
      :key="item.val"
      :label="item.val"
      :value="item.lab">
    </el-option>
  </el-select>

    </div>

<div class="finelMoney">
      <span>最终金额:</span><el-input v-model="tolAmount" type="input" value="1000"  class="costKind_input1">
      </el-input>
      <span>参考金额:</span>
      <el-input v-model="tolAmount" type="input"  :disabled="true" value="1000"  class="costKind_input1">
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


    <div class="dateKind">
      <span>截止时间:</span><el-date-picker
      v-model="endAt"
      type="date"
      placeholder="选择日期"
     >
    </el-date-picker>

    </div>

<div class="useKind">
  
   <!-- <el-button type="primary" @click="reg(1)">转入</el-button> -->
   <el-button type="primary" @click="test">转入</el-button>

</div>



    </div>
</template>
<script>
    export default {
        data(){
            return {
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
          valued:3,
          id:'STUDENT',
          labeld: '指定儿童'
        }],
        valued: '',
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




             dialogVisible: false,
            fullScreenLoading: false,
            chargesOptions:[],
            nameOptions:[],
            valuedd:'',
            amount:'',
            klassOptions:[],
            tolAmount:0,
            value8:'',
            totlArry:[],
            labell:'',
            labe:0,
            val:0,
            gridData:[],
            redundOptions:[],
            valued_:'',
            surplus:0,
            studentChargeId:0,
            studentID:0,
            }
           

        },
        methods:{
          formatDate: function (row, column) {
     
        return row.value == "YEAR" ? '年' : row.value == "HALF_YEAR" ? '半年' :  row.value == "QUARTER" ? '季' :  row.value == "MONTH" ? '月': "未知";

    },
      handleClo(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
                    console.log("=======schools data========",res.bodyText);

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
                          this.tolAmount=tolAmount;






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
                               typeArray.push({val:item.identDiscounts[0].id,lab:item.id})    
                          })
                             //this.value = klassesArray[0].value
                             this.typeOptions = typeArray;


                           








                                       var klassName = this.$store.state.cost
                        // this.tableData = localStorage.schools
                        // this.count = localStorage.schools.length;
                        console.log('+++++++    拿到的数据+++++++++',klassName);

                        let counst=klassName.cost;
                        this.studentID=counst[0].id
                        console.log('studentID',counst[0].id)
                              var klassArray=[];
                          counst.forEach(function(item, index, array){
                               klassArray.push({name:item.name,id:item.id})    
                          })
                             //this.value = klassesArray[0].value
                             this.klassOptions = klassArray;


                    



                })
            },

            one(){
              console.log('111111111111111111111111')
            },
            handleSearch(){
                this.dialogVisible=true;
                var klassName = this.$store.state.cost;
                 let counst=klassName.cost;
                 // console.log("counst",counst[0].id)
                var klassid=counst[0].id;
                  this.$http({
                    method: 'get',
                    url: this.$getApi + 'charge/findStuPlan?studentId='+klassid,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res
                        if(!!res.body){
                           this.gridData = body
                        this.count = body.length
                        }else{
                          alert("err",err)
                        }

                        
                    console.log("===res tableData===",res);
                      var redundArry=[];
                      res.body.forEach(function(item, index, array){
                               redundArry.push({valued_:item.expenseEntry.name,label_:item.id})    
                          })
                             //this.value = klassesArray[0].value
                             this.redundOptions = redundArry;


                             console.log("redundArry",redundArry)


                    console.log("===res getKlassData===",res.body);
                    console.log("===res getKlassData   ID===",res.body[0].id);
                    this.surplus=res.body[0].money;
                    this.studentChargeId=res.body[0].id
                  
                        })
                // this.getData();

            },
         




     
        changeId(){
          console.log('执行了');
          // console.log('执行了',this.expenseId);s
         // this.$store.commit("jia")
          
            this.$router.push({path:'students'});
            

        }, handleClose(tag) {
          console.log(tag)
        this.klassOptions.splice(this.klassOptions.indexOf(tag), 1);
      },
      test(){


           this.$http.post(
         
           this.$getApi + 'charge/refund',
 
          {
              "cycleId": this.val,
              "descMoney": this.surplus,
              "endAt": 0,
              "identityId": this.val,
              "money": this.tolAmount,
              "studentChargeId":this.studentChargeId,
              "studentId": this.studentID,
              "toExpenseId": this.value,
              "totalMoney": this.tolAmount
            
          },
                                               
          {
          headers:{
                      
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





      }




        },
      
        
        mounted() {

            this.getData();
          

        },
         activated(){
            this.getData()
        }
    }
</script>
<style scoped>
    .main{
      font-family: "宋体";
      font-size: 14px;
      text-align: center;
    
      padding-top: 30px;
      width: 1000px;
      height: 100%;
      margin-left: 200px;
    }
    .costKind{
      width: 100%;
      text-align: center;
      margin-bottom: 15px;
      margin-left: -3%;
    }
    div span{
      margin-right: 12px;
    }
    .costKind_input{
      width: 400px;
      height: 52px;
      verticla-align:center;
    }
    .costKind_input1{
      width: 200px;
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
      margin-left: -3%;
         
    }
    .finelMoney{
       width: 100%;
      text-align: center;
      margin-bottom: 15px;
      margin-left: -26px;
    }
    .dateKind{
      width: 100%;
      text-align: center;
      margin-bottom: 15px;
      margin-left: -3%;
    

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
        width: 400px;
        overflow: hidden;
    }
    .show ul li{
      width: 400px;
      overflow: hidden;;
      margin: 10px 0;
    }
    .show{
      margin: -20px 0 15px 30.5%;
      
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
     width: 155px;
      height: 52px;
     /* padding-left: 20px;*/
      verticla-align:center;
  }
  .costKind_input2{
    width: 300px;
      height: 52px;
     margin-left: 10px;
      verticla-align:center;
  }
  .tol_sele{
    margin-left: 10px;
    padding-left: 10px;
  }
  .costKind_re{
     width: 100%;
      text-align: center;
      margin-bottom: 15px;
      
      margin-left: -32px;
  }
  .search{
    width: 90px;
  }
  .tag_btn{
    width: 80px;
  }
  .title{
    margin-bottom: -20px;
  }



</style>
