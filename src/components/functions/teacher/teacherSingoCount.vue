<template>
    <div>
      <div>
        <el-button style="float:right;margin-right:10px; margin-top: 13px;margin-bottom:4px;" @click="show" type="primary"> 统计展示 </el-button>
      </div>
      <div style="padding-right:20px;">
         <el-table
            :data="tableData"
            border
            style="margin-top:4px; margin-left:10px;margin-right:10px;">
            <el-table-column
              prop=""
              label=""
              width="1">
            </el-table-column>
             <el-table-column
              prop="teacherId"
              label="教师ID"
              align='center'
              width="180">
            </el-table-column>
            <el-table-column
              prop="teachereName"
               align='center'
              label="教师姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="Jan"
               align='align'
              label="一月">
            </el-table-column> 
            <el-table-column
              prop="Feb"
               align='align'
              label="二月">
            </el-table-column> 
            <el-table-column
              prop="Mar" align='center'
              label="三月">
            </el-table-column>
             <el-table-column
              prop="Apr" align='center'
              label="四月">
            </el-table-column> 
            <el-table-column
              prop="May" align='center'
              label="五月">
            </el-table-column>
             <el-table-column
              prop="Jun" align='center'
              label="六月">
            </el-table-column> 
            <el-table-column
              prop="Jul" align='center'
              label="七月">
            </el-table-column> 
            <el-table-column
              prop="Aug" align='center'
              label="八月">
            </el-table-column>
             <el-table-column
              prop="Sept" align='center'
              label="九月">
            </el-table-column> 
            <el-table-column
              prop="Oct" align='center'
              label="十月">
            </el-table-column>
            <el-table-column
              prop="Nov" align='center'
              label="十一月">
            </el-table-column>
            <el-table-column
              prop="Dec" align='center'
              label="十二月">
            </el-table-column>
          </el-table>
            <el-dialog
             
              :visible.sync="dialogVisible"
              width="900px"
              :before-close="handleClose">
                <div class="top">
             <span class="top_text">教师出勤</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
                  <!-- <div style="font-size:22px;font-weight:700;text-align:center;margin-top:-20px" >草桥园-教师出勤</div> -->
              <div id="myChart" :style="{width: '850px', height: '400px'}"></div>

              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>

      </div>
         
            </div>
</template>
<script>
 let echarts = require('echarts/lib/echarts')
        // 引入柱状图组件
        // require('echarts/lib/chart/pie')
        // require('echarts/lib/chart/line')
        require('echarts/lib/chart/lines')
        // 引入提示框和title组件
        require('echarts/lib/component/tooltip')
        require('echarts/lib/component/title')

    export default {
        data(){
            return {
                tableData:[],
                dialogVisible:true,
                teacherName:[],
                teacherCount:[],
                attRate:[],
                monthDay:'',

            }
        },
        methods:{
          show(){
              this.dialogVisible=true
              // this.drawLine();
              
              // 获取老师考勤数据
                   var date = new Date();  
                 var Month=(date.getMonth() + 1);
                 var Month=(date.getMonth() + 1);
                 var Day=date.getDate()
                 var date_value=date.getFullYear() + '-' + (Month>9?Month:('0'+Month)) + '-' +(Day>9?Day:('0'+Day)) 
                console.log(date_value)
                     this.$http({
                    method: 'get',
                    url:  this.$getApi+'management/attendancesTeachers/findTeacherRate?localDate=2018-11-11',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res);

                    this.tableData=res.body
                    var teacherName=[];
                    var teacherCount=[];
                    var attRate=[];
                    for (var i = 1; i < res.body.length; i++) {
                       teacherName.push(res.body[i].name)
                       teacherCount.push(res.body[i].attCount)
                       if (res.body[i].attRate=='NaN') {
                        attRate.push(0)
                       
                       }else if(res.body[i].attRate!='NaN'){
                        attRate.push(res.body[i].attRate)
                       }

                    }
                    console.log(teacherName)
                    this.teacherName=teacherName
                    this.teacherCount=teacherCount
                    this.attRate=attRate
                    this.monthDay=res.body[0].days
                    console.log(teacherCount)
                    console.log(attRate)

                    this.drawLine();

                        })












              // this.drawLine();
         
               console.log('11111111111111111111')

          },
            getData(){
                         var myDate = new Date();//获取系统当前时间
                    var year = myDate.getFullYear(); //获取当前年份(2位)
                    console.log(year)
                       this.$http({
                        method: 'get',
                        url:this.$getApi+'attendanceRate/management/findBySchool?schoolId='+ localStorage.schoolsId +'&year='+ year,                  
                        headers: {
                            // 'content-type': "multipart/form-data",
                            'Authorization': 'Bearer ' + localStorage.token

                        }
                    }).then((res) => { // promise对象
                       
                        const {
                            body
                        } = res
                        var opt=[];
                           res.body.forEach(function(item, index, array){
                          opt.push({
                          Jan:item.january,
                          teacherId:item.actorId,
                          teachereName:item.userName,
                          Feb:item.february,
                          Mar:item.march,
                          Apr:item.april,
                          May:item.may,
                          Jun:item.june,
                          Jul:item.july,
                          Aug:item.auguest,
                          Sept:item.september,
                          Oct:item.october,
                          Nov:item.november,
                          Dec:item.december,

                        })
                       
                    }) 
                           this.tableData=opt
                      
                     console.log('1111111111111111111111',res)
                      
           
                      
                    })   
                    this.dialogVisible=false
             
            },
          

            drawLine() {
                  


                  let myChart = echarts.init(document.getElementById('myChart'))
                  console.log('0000000000',)
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
                                    data:['天数','出勤率']
                                },
                                xAxis: [
                                    {
                                        type: 'category',
                                        data: this.teacherName,
                                        axisPointer: {
                                            type: 'shadow'
                                        }
                                    }
                                ],
                                yAxis: [
                                    {
                                        type: 'value',
                                        name: '天数',
                                        min: 0,
                                        max: this.monthDay,
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
                                        name:'考勤天数',
                                        type:'bar',
                                        data:this.teacherCount,
                                        barWidth : 10,

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

                  myChart.setOption(option);



            },
        },
         mounted(){
            console.log('---------mounted--------------');
           
            // this.getPaySub();
            // this.findAll(); 打开
            
            this.getData();
        

          
          
    
          },
          beforeMount(){
             this.drawLine();
          }
    }
</script>
<style>
    
</style>