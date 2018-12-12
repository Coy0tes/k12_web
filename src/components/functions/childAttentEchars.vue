<template>
    <div style="padding:10px">
         选择日期：<el-date-picker
      v-model="value4"
      type="month"
      placeholder="选择月份"
      style="margin-top:10px"
      @change='setDate'
      >
    </el-date-picker>
    <!-- 折线图 -->
    <div id="myChart1" :style="{width: '800px', height: '400px'}"></div>
      <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="attDate"
      label="日期"
      >
    </el-table-column>
    <el-table-column
      prop="klassName"
      label="班级"
      >
    </el-table-column>
    <el-table-column
      prop="stuCount"
      label="出勤人数">
    </el-table-column>
     <el-table-column
      prop="attRate"
      :formatter='formatRat'
      label="出勤率">
    </el-table-column>
  </el-table>

 

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
    export default {
        data(){
            return {
                
                value4:'',
                tableData:[{
                   date:'2018-11-30',
                   name:'k1',
                   addres:'26',
                   address:'20',
                },{
                   date:'2018-11-30',
                   name:'k2',
                   addres:'29',
                   address:'22',
                },{
                   date:'2018-11-30',
                   name:'思一',
                   addres:'19',
                   address:'73',
                },{
                   date:'2018-11-30',
                   name:'行一',
                   addres:'26',
                   address:'30',
                },{
                   date:'2018-11-30',
                   name:'k4A',
                   addres:'45',
                   address:'20',
                },{
                   date:'2018-11-30',
                   name:'k4B',
                   addres:'10',
                   address:'100',
                },],
                klassName:[],
                stuCount:[],
                attRate:[],

            }
        },
        methods:{
            setDate(){
                console.log(this.value4)
           var date = new Date(this.value4);  
                 var Month=(date.getMonth() + 1);
                 var Month=(date.getMonth() + 1);
                 var Day=date.getDate()
                 var date_value=date.getFullYear() + '-' + (Month>9?Month:('0'+Month)) + '-' +(Day>9?Day:('0'+Day)) 
                console.log(date_value)
                     this.$http({
                    method: 'get',
                    url:  this.$getApi+'api/attendances/findKlassRateOfStu?localDate='+date_value,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res);

                    this.tableData=res.body
                    var klassName=[];
                    var stuCount=[];
                    var attRate=[];
                    for (var i = 0; i < res.body.length; i++) {
                       klassName.push(res.body[i].klassName)
                       stuCount.push(res.body[i].stuCount)
                       if (res.body[i].attRate=='NaN') {
                        attRate.push(0)
                       
                       }else if(res.body[i].attRate!='NaN'){
                        attRate.push(res.body[i].attRate)
                       }

                    }
                    console.log(klassName)
                    this.klassName=klassName
                    this.stuCount=stuCount
                    this.attRate=attRate
                    
                    console.log(stuCount)
                    console.log(attRate)

                    this.drawLine1();

                        })



            },  
                    formatRat: function (row, column) {
            // console.log('-------formatDate------------',row.periodDiscounts)
        return row.attRate == "NaN" ? '0' : row.attRate ;

        },

              drawLine1() {
                          console.log('sssssssss',this.chartarry);





                          let myChart1 = echarts.init(document.getElementById('myChart1'))
                          // console.log('0000000000',)
                        
                           var option = {
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross',
                                        crossStyle: {
                                            color: '#999',
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
                                    data:['人数','出勤率']
                                },
                                xAxis: [
                                    {
                                        type: 'category',
                                        data: this.klassName,
                                        axisPointer: {
                                            type: 'shadow'
                                        }
                                    }
                                ],
                                yAxis: [
                                    {
                                        type: 'value',
                                        name: '人数',
                                        min: 0,
                                        max: 30,
                                        interval: 5,
                                        axisLabel: {
                                            formatter: '{value} '
                                        }
                                    },
                                    {
                                        type: 'value',
                                        name: '出勤率',
                                        min: 0,
                                        max: 100,
                                        interval: 10,
                                        axisLabel: {
                                            formatter: '{value} %'
                                        }
                                    }
                                ],
                                series: [
                                
                                    {
                                        name:'考勤人数',
                                        type:'bar',
                                        data:this.stuCount,
                                        barWidth : 30,
                                                   itemStyle:{
                                    normal:{
                                        color:'#3ca0ec'
                                    }
                                },
                                    },
                                    {
                                        name:'出勤率',
                                        type:'line',
                                        yAxisIndex: 1,
                                        data:this.attRate
                                    }
                                ]
                            };




                          myChart1.setOption(option);
                            }, 
                               drawLine3() {
                      // console.log('sssssssss',this.chartarry);





                      let myChart3 = echarts.init(document.getElementById('myChart3'))
                      // console.log('0000000000',)
                    
                       var option = {
                             title: {
                                          text: '班级儿童出勤人数'
                                            },
                              xAxis: {
                                  type: 'category',
                                  data: ['k1','k2','思一','行一','k4A','k4B']
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
        },
        mounted(){
            // this.drawLine1();
            // this.drawLine3();
        }
    }
</script>
<style>
    
</style>    