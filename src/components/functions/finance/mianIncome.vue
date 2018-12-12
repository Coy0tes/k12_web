<template>
    <div>
        <div class="content1">
          <div style="width:101.5%; height:50px; background-color:#fff;margin-top:-0px;margin-left:-13px; padding-right:10px;padding-left:30px; line-height:40px;padding-top:4px;">
            
               <span></span><el-select v-model="value" placeholder="请选择查询条件" style="margin-left:-17px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.label">
            </el-option>
        </el-select>
       
        <el-button type="primary" style>查询</el-button>
  
        <el-button type="primary" style="float:right;margin-right-15px;" @click="handelOpen">数据统计</el-button>
   
        


          </div>
       


    <div class="tab">
 
       <el-table
     :data="tableData7.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    style="width: 100%;color:#1d5391;" border="true" @row-click="test" unique-opened='true'
     >
    <el-table-column type="expand" style="padding:0;"class-name="zclb">
      <template slot-scope="props">
       
       <el-table
    :data="tableData6"
    :size="mini"
    style="width: 100%;color:#1d5391;"
    max-height="250" >
    
    <el-table-column
      prop="klassname"
      align="center"
      label="费用名称"
      class-name="inTable"
      >
    </el-table-column>
    <el-table-column
      prop="id"
      align="center"
      label="id"
      >
    </el-table-column>
    <el-table-column
      prop="money"
      align="center"
      label="金额"
      >
    </el-table-column>
     <el-table-column
     
      label="详情"
      width="100">
      <template slot-scope="scope">
        
        <el-button size="small" @click="getMain(scope.$index, scope.row)">详情</el-button>
      </template>
    </el-table-column>
    

 
   
    
   
  </el-table>
      </template>
    </el-table-column>
     <el-table-column
      label="班级"
      align="center"
      prop="klassname"
      class-name="zclb"
      >
    </el-table-column>

    <el-table-column
      label="总额"
      align="center"
      prop="totlemoney"
      class-name="zclb">
    </el-table-column>

  
    
  </el-table>


    </div>

    <div class="block">
 
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      background="false"
      layout="total, prev, pager, next"
      :total="tableData7.length"
        style="float:right; margin-top:20px;">
    </el-pagination>
</div>
<el-dialog
  
  :visible.sync="dialogVisible"
  width="30%"
  >

 <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">添加支出款项</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
<div style="margin-left:180px;">
    
<el-form >
  <el-form-item>
   

<span><span style="margin-right:10px;">
  支出类别
</span>
        <el-select
    v-model="value10"
    
    filterable
    allow-create='true'
    default-first-option
    placeholder="请选择"
    class="inpt_pay"
    @change="indexSelect">
    <el-option
      v-for="item in tableData5"
      :key="item.value"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>

   </span> 
  

   


  <el-button type="primary" style="width:61px;color:#fff;"@click='payoutType'>添 加</el-button>
  <el-button type="danger" style="width:61px;color:#fff;"@click='deleteMain'>删 除</el-button>
  <!-- <el-button type="primary" style="float:right" @click="payoutType">测试</el-button> -->
  </el-form-item>
<div style="width:79%;height:1px; background-color:#83afde; margin-bottom:20px; color: #4d5387; margin-left：-6px;"></div> 
  <el-form-item >
    <span class="font_c" style="word-spacing:2px; ">
      <span style="margin-right:10px;">子 类 别</span>
     <el-select
    v-model="value9"
    
    filterable
    allow-create
    default-first-option
    placeholder="请选择"
    class="inpt_pay"
    @change="paySubindex"
    >
    <el-option
      v-for="item in tableData4"
      :key="item.value"
      :label="item.name"
      :value="item.paySubid">
    </el-option>
  </el-select>
</span> 
    <el-button type="primary"style="width:61px;color:#fff;"@click='payoutSubType'>添 加</el-button>
    <el-button type="danger" style="width:61px;color:#fff;"@click='handleDelete'>删 除</el-button>
  </el-form-item>
  <el-form-item  >
   <span class="font_c" style="word-spacing:10px; margin-right:10px;">金&nbsp;&nbsp;额</span> <el-input style="width:320px;" v-model="money"></el-input>
  </el-form-item>
  
  <el-form-item  >
   <span class="font_c" style="word-spacing:3px; margin-right:10px;">操 作 人</span> <el-input style="width:320px;"></el-input>
  </el-form-item><el-form-item  >
   <span style="word-spacing:8px;margin-right:10px;">&nbsp;&nbsp;&nbsp;&nbsp; </span> <el-button type="primary" @click="addPayout" style="width:320px; color:#fff;">添 加</el-button>
  </el-form-item>
</el-form>



</div>









  <span slot="footer" class="dialog-footer">
   <!--  <el-button @click="dialogVisible = false">取 消</el-button> -->
    
  </span>
</el-dialog>

<div v-show="dialog" class="tag_main">
  <div class="tag_content">

 <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">支出图型展示</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialog = false">
             </div>
          </div>
          <!-- Newtitle  end-->
<div>
    

<div id="myChart" :style="{width: '600px', height: '400px'}"></div>



</div>

  </div>
 




  
</div>





    </div>
       <el-dialog
       
          :visible.sync="dialogDo"
          width="30%"
          :before-close="handleClose">

          

          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">编辑</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogDo = false">
             </div>
          </div>
          <!-- Newtitle  end-->
          <div style="margin-left:25%;padding-bottom:30px;">
            <el-form>
               <el-form-item>
                <span>名 &nbsp; 称</span>
                  <el-input v-model="sonName" style="width:270px;"></el-input>
                </el-form-item>
              <!-- 修改主类别 -->
                  <el-form-item>
                    <span>主类别</span>
                        <el-select
                        v-model="value10"
                        
                        filterable
                        allow-create='true'
                        default-first-option
                        placeholder="请选择"
                        style="width:270px;"
                        @change="indexSelect">
                        <el-option
                          v-for="item in tableData5"
                          :key="item.value"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                </el-form-item>
                <el-form-item>
                <!-- <span>提 交</span> -->
                  <el-button type="primary" @click="putData" style="width:270px;margin-left:9%;">提交</el-button>
                </el-form-item>
               

            </el-form>
              
          </div>
        
        </el-dialog>
    </div>
</template>
<script>

        let echarts = require('echarts/lib/echarts')
        // 引入柱状图组件
        require('echarts/lib/chart/pie')
        // 引入提示框和title组件
        require('echarts/lib/component/tooltip')
        require('echarts/lib/component/title')
   



    export default {
         name: 'hello',
        data(){
            return {
                slelectMajor:'',
                  departments: [
        {name: '教学教务', majors: ['幼儿生活用品', '幼儿园服/被品结账', '幼儿活动费用-园内','幼儿活动费用-园外','幼儿校车费用','幼儿校车油费','幼儿校车电话费','幼儿教学办公用品','幼儿环创用品','幼儿教材结账','室内玩教具','户外玩教具']},
        {name: '艺术团', majors: ['园外课时费结账', '园内教师课时费', '材料费']},
        {name: '医药保健', majors: ['幼儿日常药品', '幼儿保健卫生用品', '幼儿医疗费用','幼儿意外险']},
        {name: '食堂', majors: ['肉鲜类', '果蔬类', '粮油类','奶饮类','豆制品','干果类','调料类','燃气费','厨用/其他','成人餐费','幼儿餐费']},
        {name: '固资低耗', majors: ['固定资产增加-办公家具', '桌子-幼儿用', '床-幼儿用','玩具柜-幼儿用','椅子-成人用','固定资产增加-电子设备','电脑','打印机','固定资产增加-教学教具','钢琴','低值易耗品购买']},
        {name: '后勤维修', majors: ['园所环创费用', '园所维修费用', '园所装修尾款','其他']},
        {name: '园内管理费', majors: ['教职员工资', '全员社保', '外教（第三方）','实习生（第三方）','保洁/临时工（第三方）','员工体检费','过节福利','筑爱家族-生日费用','筑爱家族-员工活动费用','行政事务办公费用','行政后勤生活用品','行政后勤办公用品','差旅费','交通费','电话网络费','房租-园所','房租-员工住宿','物业/清洁费','取暖费','水费','电费','招生费用-印刷费','招生费用-活动费用','培训/会费','招待费']},
        {name: '其他', majors: ['已入园幼儿退费', '备用金款',]},
      ],
      selectedDepartment: '',
                value9:'',
                value10:'',
                sonName:'',
                labe:'',
                money:0,
                dialog:false,
                indexId:'',
                dialogVisible: false,
                dialogDo:false,
                tableData:[],
                options:[{
                  value:"指定儿童",
                  label:1
                },{
                  value:"指定班级",
                  label:2
                }],
                value:'',
                childType:'',

                 tableData5: [],
                 tableData6: [],
                tableData4: [],
                paySubid:0,
                chartarry:[],
                chartname:[],
                tableData7:[],
                 showSize: 10,
                current_page: 0,
                count: 100,
                currentPage:1,
                 pagesize:10,
              }
            },
             computed: {
    majors: function() {
      var majors = [], selectedDepart = this.$data.selectedDepartment;
      this.$data.departments.forEach(function(d) {
        if(d.name == selectedDepart)
          majors = d.majors;
      });
      return majors;
    }
  },
        methods:{
            getMain(index,row){
              console.log(row)
              console.log(index)
              var remianId = row.id 
              this.$store.commit('remianId',{id:remianId});//存
              // var remianId = this.$store.state.remianId //拿
              this.$router.push({path:'/remianMoney'});
              // revenue/income/findDetail?id=2
               // this.$http.get(
                
               //      this.$getApi+'revenue/income/findDetail?id=1',
                   
               //      {
               //        headers:{
                        
               //          'Authorization': 'Bearer '+ localStorage.token

               //        }
               //      }
               //  ).then((res) =>{
                    
               //      console.log("===revenue/income/findDetail====",res);
                
                 
                       
                    
               //  })


            },
     
            handleEdit(){
              this.dialogDo=true
            },

            getData(){

               
                      this.$http({

                    method: 'get',
                    url:$this.getApi+'revenue/income/findTotal?startTime=1521569894000',

                    headers: {
                      'content-type': "multipart/form-data",
                        // 'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { 
                    console.log('======res=====',res);
                
                    const {
                        body
                    } = res
                
              

                    console.log("===学生请假===",res.body);
              


                  

                })
            },
       
               
        
            handelOpen(){
                console.log('232323232323');
                    this.dialog=true;

                    this.drawLine();

            },
             handleSizeChange: function (size) {
        this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },

            test(row){
        
        console.log('1111111111',row.id)
           this.$http.get(
                   
                    this.$getApi+'revenue/income/findAll?page=0&startTime=1522574771000&endTime=1525166771000&size=30',
                  
                    {
                      headers:{
                        
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                    
                    console.log("===teststststststststststststst子类别r====",res.body.content);
                    var minorArry=[];
                    for(var i=0; i<res.body.content.length; i++){
                        if(row.klassname==res.body.content[i].klassName){
                          console.log('res.body.content[i].klassName',res.body.content[i])
                            minorArry.push({
                                klassname:res.body.content[i].names,
                                money:res.body.content[i].money,
                                id:res.body.content[i].id,
                            })

                            
                        }
                    }
                    this.tableData6=minorArry;
                    console.log('---------------------------------------------------------',minorArry)









                    
                   


                })
                 console.log('22222222222',row.klassname)



    },
            
      
            findAll(){
                 this.$http.get(
                
                    this.$getApi+'revenue/income/findAll?page=1&startTime=1522574771000&endTime=1544079656000&size=30',
                   
                    {
                      headers:{
                        
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                    
                    console.log("===主类别11111111111111111====",res.body.content);
                    console.log("===findAll====",res);

// 根据班级名字 数据分类





        
                    var list = res.body.content,
                      flag = 0,
                      data = [];          
                  for(var i = 0; i< list.length; i++) {
                      var az = '';
                      for (var j = 0; j < data.length; j++) {
                          if(data[j][0].klassName == list[i].klassName) {
                              flag = 1;
                              az = j;
                              break;
                          }
                      }
                      if(flag == 1){
                          data[az].push(list[i]);
                          flag = 0;
                      } else if (flag == 0) {
                         var wdy = new Array();
                          wdy.push(list[i]);
                          data.push(wdy);
                      }
                  }
                  console.log('data+++++++++++++',data);

                


                        var tableArry=[];
                     


// 计算总额
// 
                            for( var q=0;q<data.length;q++){
                      if (data[q].length>1) {
                        var sum=0;
                        for(var p=0; p<data[q].length; p++ ){

                          sum+=data[q][p].money
                        }
                        console.log(sum)
                      }else{
                        sum=data[q][0].money
                        console.log('11111111',sum)
                      }

                    tableArry.push({
                           klassname:data[q][0].klassName,
                           totlemoney:sum   
                        })


                       }


                console.log('tableArry',tableArry)

                        this.tableData7=tableArry
                       
                  
                      var chartArry=[];
                     for(var a=0;a<tableArry.length;a++){
                    var obj=new Object();
                    obj.name=tableArry[a].klassname; 
                    obj.value=tableArry[a].totlemoney;
                    chartArry[a]=obj;
                }
                    this.chartarry=chartArry
                         console.log('chartArry',chartArry)

                         // alert(chartArry)
                         // 
                         // 
                        var chartName=[];
                tableArry.forEach(function(item, index, array){
                          chartName.push(item.name)
                       
                    })
                this.chartname=chartName;
                this.chartname=tableData7;
                console.log('sssssss',chartName)















                  //   var list = res.body.content,
                  //     flag = 0,
                  //     data = [];          
                  // for(var i = 0; i< list.length; i++) {
                  //     var az = '';
                  //     for (var j = 0; j < data.length; j++) {
                  //         if(data[j][0].klassName == list[i].klassName) {
                  //             flag = 1;
                  //             az = j;
                  //             break;
                  //         }
                  //     }
                  //     if(flag == 1){
                  //         data[az].push(list[i]);
                  //         flag = 0;
                  //     } else if (flag == 0) {
                  //        var wdy = new Array();
                  //         wdy.push(list[i]);
                  //         data.push(wdy);
                  //     }
                  // }
                  // console.log('data+++++++++++++',data);
                        
                  //     data.forEach(function(item,index,array){
                  //         tableArray.push({
                  //           klassname:item[0].klassName,

                  //         })
                  //     })
                      // this.tableData7=tableArray
                    
                })
                // var tableArray=[];

                //           for( var q=0;q<data.length;q++){
                //       if (data[q].length>1) {
                //         var sum=0;
                //         for(var p=0; p<data[q].length; p++ ){

                //           sum+=data[q][p].money
                //         }
                //         console.log(sum)
                //       }else{
                //         sum=data[q][0].money
                //         console.log('11111111',sum)
                //       }

                //     tableArry.push({
                //            name:data[q][0].klassName,
                //            totlemoney:sum   
                //         })


                //        }
                //        this.tableData7=tableArry
                  






            },

            fakeData(){

                  let TabData=[ {
                            "createAt": 1521701671266,
                            "expenseId": 11,
                            "id": 1,
                            "klassId": 7,
                            "klassName": "奇想班",
                            "klassType": 3,
                            "money":4500,
                            "names": "保育费",
                            "schoolId": 4,
                            "src": 0,
                            "theYearMonth": 0
                          }];


                          




            },


            drawLine() {
      console.log('sssssssss',this.chartarry);


      let myChart = echarts.init(document.getElementById('myChart'))
      console.log('0000000000',)
    
       var option = {
                title : {
        text: '北京博顿幼儿园(草桥园)',
        subtext: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: this.chartname
    },
    series : [
        {
            name: '数据',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:this.chartarry,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
            };
      myChart.setOption(option);



    },

    

        },

          mounted(){
            console.log('---------mounted--------------');
            // this.getData();
           
            this.findAll();

          
          
    
          },
    }
</script>
<style scoped>

    .tag_add_close{
    position: absolute;
    top: 14px;
    right: 14px;
    width: 30px;
    height: 30px;
   }
    #input{
      display: inline-block;
      width: 200px
    }
     .block{
        float: right;
        margin-right: 0px;

    }
    .tab{
      /*margin-top: 10px;*/

    }
     .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;

  }
  .top{
    width: 100%;
    height: 55px;
    background-color: #61bfff;
    margin-top: -30px;
  
    margin-bottom: 50px;
  }
  .top_text{
    font-size: 24px;
    /*font-weight: 700;*/
    color: #fff;
    display: inline-block;
    width: 100%;
    text-align: center;
    line-height: 55px;
  }
  .font_c{
    color: #4d5387;
  }
  .class_pay{
    width: 20px;
    height: 36px;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    font-size: 14px;
    padding-left: 5px;
    position: absolute;
    left: 63px;
  }
  .inpt_pay{
    width: 180px;
    height: 35px;
    border-radius: 4px;
    /*border: 1px solid #bfcbd9;*/
    font-size: 14px;
  }
  option {
    margin-left: 200px;
  }
  .add_close{
    position: absolute;
    top: 14px;
    right: 13px;
    width: 30px;
    height: 30px;
  }
  .el-table tr{
    background-color: #fff!important;
  }
  .el-table__expanded-cell{
    padding: 0 !important;
  }
    .el-table--enable-row-transition .el-table__body td{
         padding: 0 !important;
    }
    .el-table--border td, .el-table--border th{
          padding: 0 !important;
    }
    /*.el-table_1_column_2{
        height: 40px;
    }*/
    .zclb{
        height: 40px!important;
        color: #fff!important;
        /*background-color: #41acf5!important;*/
    }
   .el-table_1_column_1,.el-table_1_column_2,.el-table_1_column_3{
        /*background-color: #41acf5!important;*/
        color: #fff!important;
        border-bottom: 2px solid #000;
    }
    .el-table_1_column_2 .cell,.el-table_1_column_3 .cell{
         /*background-color: #41acf5!important;*/
         color: #000!important;
    }
    .el-table th>.cell{
             color: #fff!important;
             /*font-weight: 700;*/
    }
    .el-table .cell{
        color: #000!important;
        height: 30px!important;
    }
    .el-table--fit{
        border-bottom: 2px solid #41acf5;
    }
    .is-leaf[class*="zclb"] .cell,.is-leaf[class*="zclb"]{
        background-color: #41acf5!important;
        color: #fff;
        height: 40px!important;
        line-height: 40px!important;
    }
    .el-table_1_column_1[class*="is-leaf"]{
        /*background-color: #41acf5!important;*/
        border-right: 0px;
        height: 40px!important;
        line-height: 40px!important;
    }
    .tag_main{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,.3);
      z-index: 1000;
    }
    .tag_content{
      background-color: #fff;
      position: absolute;
      top: 25%;
      left: 38%;
 
    }
    .tag_top{
     width: 100%;
    height: 55px;
    background-color: #61bfff;
    /*margin-top: -68px;
    margin-left:-20px*/;
    margin-bottom: 50px;
  }
  .el-notification.right{
    right:42%;
    top:65%!important;
  }
  .el-notification{
    right: 40%!important;
    top:35%!important;

  }
  #myChart{
    padding-left:50px;
  }
  
</style>