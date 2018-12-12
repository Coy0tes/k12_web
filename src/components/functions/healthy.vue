<template>
    <div style="padding:10px;">

            <el-select v-model="value1" placeholder="请选择班级" @visible-change="chanalue">
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>


    <el-date-picker
      v-model="value33"
      type="date"
      placeholder="选择日期">
    </el-date-picker>

  
  
    
      <el-button type="primary" @click='getData'>查询</el-button>
    <div style="margin-top:10px;">
        
 

       <el-table
    :data="tableData"
    border
    style="width: 100%">
     <el-table-column
          prop="id"
          label="序号"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="klass"
          label="班级"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="date"
          align="center"
          :formatter="dateFormat"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="jiancha"
          align="center"
          :formatter="formatDate"
          
          label="晨、午检">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="幼儿姓名">
        </el-table-column>
        <el-table-column
          prop="state"
          align="center"
          label="症状">
        </el-table-column>

      <!--   <el-table-column
      
      label="照片"
                align="center"
      >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
       
      </template>
    </el-table-column> -->

        <el-table-column
          prop="HYcall"
          align="center"
          label="晨检嘱托">
        </el-table-column>
        
  </el-table>

        </div>
    </div>
</template>
<script>
import Moment from 'moment';
    export default {
        data(){
            return {
                value1:"",
                value2:"",
                options: [{
                  value: '选项1',
                  label: '黄金糕'
                }, {
                  value: '选项2',
                  label: '双皮奶'
                }, {
                  value: '选项3',
                  label: '蚵仔煎'
                }, {
                  value: '选项4',
                  label: '龙须面'
                }, {
                  value: '选项5',
                  label: '北京烤鸭'
                }],
                value33: '',
                tableData:[],
                klassesOptions:[],
            }
        },
        methods:{
                chanalue(){
                  this.$http({
                    method: 'get',
                    url:  this.$getApi+'management/klasses',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res.body);

                    if (!!body.length) {
                        
                          var klassesArray=[];
                          res.body.forEach(function(item, index, array){
                               klassesArray.push({value:item.id,label:item.name})    
                          })
                             //this.value = klassesArray[0].value
                             this.klassesOptions = klassesArray;
                                
                            } else {
                                alert('err:' + body)
                            }
                        })
            },
             dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return Moment(date*1000).format("YYYY-MM-DD HH:mm ");  
            },
          formatDate: function (row, column) {
            // console.log('-------formatDate------------',row.periodDiscounts)
        return row.jiancha == "MORNING" ? '晨检' : row.jiancha == "NOON" ? '午检' :  row.jiancha == "NIGHT" ? '晚检' :"未知";

    },
          getData(){
                 var date = new Date(this.value33);  
                     var date_value=date.getFullYear() + '-' + ((date.getMonth() + 1)>9?(date.getMonth() + 1):('0'+(date.getMonth() + 1))) + '-' + (date.getDate()>9?date.getDate():('0'+date.getDate())) 
             this.$http({
                    method: 'get',
                    url:  this.$getApi+'healthCheck/management/findSymptom?klassId='+this.value1 +'&localDate='+ date_value,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                 
                    console.log("===res getKlassData===",res);
                       console.log("===res getKlassData===",res.body);
                       var dataArry=[]

              res.body.forEach(function(item, index, array){
                     dataArry.push({
                            id:item.id,
                            klass:item.klass.name,
                            date:item.createdAt,
                            jiancha:item.type,
                            name:item.student.name,
                            state:item.healthMsg,
                            HYcall:item.remark,
                       })
                     })

                    
                        this.tableData=dataArry
                        })
          }
        },
        mounted(){
          this.getData();
        }
    }
</script>

<style scoped>
    
</style>