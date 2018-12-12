<template>
    <div>
        <div class="content1">
          <div style="width:102.5%; height:50px; background-color:#fff;margin-top:-0px;margin-bottom:10px;margin-left:-30px; padding-right:25px;padding-left:30px; line-height:40px;padding-top:3px;">
            
               <span> </span><el-select v-model="value" placeholder="请选择查询条件" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.label">
            </el-option>
        </el-select>
       
        <el-button type="primary" @click='drawLine'>查询</el-button>
  
        <!-- <el-button type="primary" style="float:right" @click="handelOpen">图型展示</el-button> -->
   
        


          </div>
       

    <div class="echars">
  
  <div id="myChart" :style="{width: '100%', height: '400px', top:'-10px'}"></div>
</div>
    <div class="tab" style="width:100%;padding-right:0px;">
 
       <el-table
    :data="tableData"
    
    style="width: 100%;color:#1d5391;" border="true" @row-click="test"
    :default-sort = "{prop: 'date', order: 'ascending'}"
     >
   <!--  <el-table-column type="expand" style="padding:0;"class-name="zclb">
      <template slot-scope="props">
  
      </template>
    </el-table-column> -->
     <el-table-column
      label=""
      sortable
      align="center"
      prop="name"
      width="1"
      
      >
    </el-table-column>
    <el-table-column
      label="时间"
      align="center"
      sortable
      prop="date"
      class-name="zclb"
      >
    </el-table-column>

    <el-table-column
      label="收入金额"
      align="center"
      prop="revenueIn"
     
      class-name="zclb">
    </el-table-column>

    <el-table-column
      label="支出金额"
      align="center"
      prop="revenueOut"
      class-name="zclb">
    </el-table-column>

    <el-table-column
      label="利润"
      align="center"
      prop="profit"
      class-name="zclb">
    </el-table-column>
   
  
    
  </el-table>

  


    </div>


   <!--  <div class="block">
 
  <el-pagination
    layout="prev, pager, next"
    :total="50" >
  </el-pagination>
</div> -->








    </div>

    </div>
</template>
<script>

        let echarts = require('echarts/lib/echarts')
        // 引入柱状图组件
        require('echarts/lib/chart/bar')
        // 引入提示框和title组件
        require('echarts/lib/component/tooltip')
        require('echarts/lib/component/title')
        require('echarts/lib/component/legend')
   



    export default {
         name: 'hello',
        data(){
            return {
              dataArray:[],
                slelectMajor:'',
          
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
                revenueIn:[],
                revenueOut:[],
                mainArray:[],
                dateTimme:[],
                    // this.revenueIn=revenueIn
                    // this.revenueOut=revenueOut
                profit:[],
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
     
    

            getData(){

                 this.$http.get(
                
                    this.$getApi+'revenue/income/findTotal?startTime=1522569894000',
                   
                    {
                      headers:{
                        
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                    
                    console.log("===收入====",res.body);

                    // this.dataArray=res.body
                    // this.tableData=res.body


                    var newData=[];
                      res.body.forEach(function(item, index, array){
                       
                       newData.push({
                            date:item.date,
                            revenueIn:item.revenueIn,
                            revenueOut:item.revenueOut,
                             profit:(item.revenueIn)-(item.revenueOut),
                         })
                        
                    })
                      console.log('newData',newData)
                      this.tableData=newData

                      var dateTimme=[];
                      var revenueIn=[];
                      var revenueOut=[];
                      var profit=[];
                    for(var i=0;i<newData.length;i++){
                        dateTimme.push(newData[i].date)
                        revenueIn.push(newData[i].revenueIn)
                        revenueOut.push(newData[i].revenueOut)
                        profit.push(newData[i].profit)
                    }


                    this.dateTimme=dateTimme
                    this.revenueIn=revenueIn
                    this.revenueOut=revenueOut
                    this.profit=profit
                    console.log('时间',dateTimme)

                    // res.body.forEach
                    // this.tableData.push(
                    //    "profit":revenueIn-revenueOut,
                    // );
                    // res.bodyText=this.mainArray    //取得是bodytext
                    // console.log(this.mainArray)


                // // 收入
                  var revenueInArry=[];

                  for(var i=0;i<res.body.length;i++){
                    revenueInArry.push(res.body[i].revenueIn)
                  }



                  console.log('revenueInArry',revenueInArry)
                // res.body.forEach(function(item,index,array){
                //     revenueInArry.push(item.revenueIn)
                // })
                  this.revenueIn=revenueInArry
                console.log('revenueIn',this.revenueIn);



                // 支出
                var revenueOutArray=[];
                res.body.forEach(function(item,index,array){
                    revenueOutArray.push(item.revenueOut)
                })

                this.revenueOut=revenueOutArray


                       
                    
                })
console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwww')

                this.drawLine();




 // $(function (){
 //    setTimeout('A()', 1000); //延迟1秒
 //  })


        
            },
       
               
        
            handelOpen(){
                console.log('232323232323');
                    this.dialog=true;

                    this.drawLine();

            },
            
      
            findAll(){
                 this.$http.get(
                
                    this.$getApi+'revenue/income/findAll?page=0&startTime=1522569894000&endTime=1525075494000&size=10',
                   
                    {
                      headers:{
                        
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                    
                    console.log("===主类别11111111111111111====",res);
                
                 
                       
                    
                })


            },


            drawLine() {
              console.log('1231231231231231',this.dataArray) 
      console.log('sssssssss',this.chartarry);


      let myChart = echarts.init(document.getElementById('myChart'))
     
    
    



myChart.setOption({
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        
        
        data:['利润', '支出', '收入'],
  
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'value'
        }
    ],
    yAxis : [
        {
            type : 'category',
            axisTick : {show: true},
            data : this.dateTimme
        }
    ],
    color: [ '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
    series : [
        {
            name:'利润',
            type:'bar',
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
            data:[2000, 1700, 2400, 2440,]
        },
        {
            name:'收入',
            type:'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true
                }
            },
            data:[3200, 3020, 3410, 3740, ]
        },
        {
            name:'支出',
            type:'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'left'
                }
            },
            data:[-1200, -1320, -1010, -1340, ]
        }
    ]
});
                














// var option = {
//     color: [ '#4cabce', '#e5323e'],
//     tooltip: {
//         trigger: 'axis',
//         axisPointer: {
//             type: 'shadow'
//         }
//     },
//     legend: {
//         data: ['Forest', 'Steppe', 'Desert', 'Wetland']
//     },
//     toolbox: {
//         show: true,
//         orient: 'vertical',
//         left: 'right',
//         top: 'center',
//         feature: {
//             mark: {show: true},
//             dataView: {show: true, readOnly: false},
//             magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
//             restore: {show: true},
//             saveAsImage: {show: true}
//         }
//     },
//     calculable: true,
//     xAxis: [
//         {
//             type: 'category',
//             axisTick: {show: false},
//             data: ['2月', '3月', '4月', '5月', '6月','7月','8月']
//         }
//     ],
//     yAxis: [
//         {
//             type: 'value'
//         }
//     ],
//     series: [

//         {
//             name: '收入',
//             type: 'bar',
//             barGap: 0,
//             label: labelOption,
//             data: this.revenueIn
//         },
//         {
//             name: '支出',
//             type: 'bar',
//             label: labelOption,
//             data: this.revenueOut
//         },
       
//     ]
// };
      
  


    },

    

        },

          mounted(){
            console.log('---------mounted--------------');
           
            // this.getPaySub();
            // this.findAll(); 打开
            this.drawLine();

          
          
    
          },
          beforeMount(){
             this.getData();
          }
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
        margin-right: 5px;

    }
    .tab{
      margin-top: 10px;
      margin-right: 10px;
      display: inline-block;
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
    width: 105.95%;
    height: 55px;
    background-color: #61bfff;
    margin-top: -69px;
    margin-left:-20px;
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
  .echars{
    float: right;
    width: 100%;
  }
  #myChart{
    /*padding-left:50px;*/
    top:50px;
  }
  
</style>