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
              label="幼儿ID"
              align='center'
              width="180">
            </el-table-column>
            <el-table-column
              prop="teachereName"
               align='center'
              label="幼儿姓名"
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
             <span class="top_text">统计数据展示</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
                  <div style="font-size:22px;font-weight:700;text-align:center;margin-top:-20px" >草桥园-教师出勤</div>
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
            }
        },
        methods:{
          show(){
              this.dialogVisible=true
              // this.drawLine();
              console.log('222222222222222')
              this.drawLine();
         
               console.log('11111111111111111111')

          },
            getData(){
                         var myDate = new Date();//获取系统当前时间
                    var year = myDate.getFullYear(); //获取当前年份(2位)
                    console.log(year)
                       this.$http({
                        method: 'get',
                        url:this.$getApi+'attendanceRate/management/findStudentKlassRate?schoolId='+ 4 +'&year='+ year,                  
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
                          teacherId:item.klass.id,
                          teachereName:item.klass.name,
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
              // window.setInterval(this.drawLine(),1000);
                    // this.drawLine();
            },
          

            drawLine() {
                  


                  let myChart = echarts.init(document.getElementById('myChart'))
                  console.log('0000000000',)
                
                   var option = {
                      
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['思1班','思2班','奇慧班','奇想班','K3班']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                           
                            data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',]
                        },
                        yAxis: {
                            type: 'value',
                            name: "(单位：%)",
                        },
                        series: [
                            
                            {
                                name:'思1班',
                                type:'line',
                                
                                 yAxisIndex:0 ,
                                data:[12, 13, 10, 13, 9, 23, 21,10, 13, 9, 23, 21]
                            },
                            {
                                name:'思2班',
                                type:'line',
                              
                                yAxisIndex:0 ,
                                data:[22, 18, 19, 23, 29, 33, 31, 19, 23, 29, 33, 31]
                            },
                            {
                                name:'奇慧班',
                                type:'line',
                                
                                yAxisIndex:0 ,
                                data:[15, 23, 20, 15, 19, 33, 41, 20, 15, 19, 33, 41]
                            },
                            {
                                name:'奇想班',
                                type:'line',
                              
                                yAxisIndex:0 ,
                                data:[32, 33, 30, 33, 39, 33, 32, 30, 33, 39, 33, 32]
                            },
                            {
                                name:'K3班',
                                type:'line',
                              
                                yAxisIndex:0 ,
                                data:[82, 93, 90, 93.4, 90, 100, 60, 90, 93, 90, 100, 100]
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