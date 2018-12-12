<template>

    <div>
       <div style="width:102.5%; height:50px; background-color:#fff;margin-top:-10px;margin-bottom:10px;margin-left:-30px; padding-right:25px; line-height:40px;padding-left:20px;" >
                     <div class="line1"> 
            班级
                    <el-select v-model="value" placeholder="请选择班级" @change="chanalue" style="margin-left:20px;">
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select> 
                
                    <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>

                   <el-button type="primary" @click="getData">查询</el-button>
                  <div>
                  
                
                </div>
                   
        </div>
            </div>
    <div>
        <!-- <el-button type="primary" @click="postVacation">主要按钮</el-button> -->
    <el-table
      :data="tableData"
      style="width: 100%"
      border>
    <el-table-column
        prop="name"
        label="姓名"
         align='center'
       >
      </el-table-column>

      <el-table-column
        prop="fromDate"
        label="开始日期"
        :formatter="dateFormat"
        align='center'>
      </el-table-column>
      
      <el-table-column
        prop="toDate"
         align='center'
        label="结束日期"
        :formatter="dateFormat">
      </el-table-column>

      <el-table-column
        prop="createdAt"
         align='center'
        label="请假时间"
        :formatter="dateFormat">
      </el-table-column>

      <el-table-column
        prop="desc"
         align='center'
        label="描述">
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
                  value:0,
                  value1:'',
                 tableData: [],
                  klassesOptions: [],
            }
        },
         methods:{
           dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return Moment(date*1000).format("YYYY-MM-DD ");  
            } ,
            postVacation(){
                  this.$http.post(
                    'http://k12soft.vwico.com:8080/api/vacations',
               
                    {
                         "desc": "string",
                          "fromDate": 150000000,
                          "reason": "AFFAIR",
                          "studentId": 2,
                          "toDate": 156000000,
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
                    console.log("===body=add==kindergartens====",res);
                    this.getData();
                })
            },
                getData(){
                  console.log("value1",this.value1)
var d = new Date(this.value1);  
 
 var datetime=d.getFullYear() + '-' +  (d.getMonth()+1 < 10 ? '0'+(d.getMonth()+1) : d.getMonth()+1) + '-' + (d.getDate()< 10 ? '0'+(d.getDate()) : d.getDate()); 

 console.log("datetime",datetime)



                //           this.$http.get(
                //     'http://k12soft.vwico.com:8080/api/vacations/students?klassId=7&studentId=2&date=2018-05-03',
               
                  
                    
                //     {
                //       headers:{
                //         'content-type': "multipart/form-data",
                //         // 'Content-Type': 'application/json',
                //         'Authorization': 'Bearer '+ localStorage.token

                //       }
                //     }
                // ).then((res) =>{
                //     // const {body} = res;
                //     console.log("===body=add==kindergartens====",res);
                //     // this.getData();
                // })



// (获取所有请假OK)
                     this.$http({

                    method: 'get',
                    url:'https://k12.vwico.com/api/vacations?klassId='+this.value+'&date='+datetime,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { 
                    console.log('======res=====',res);
                
                    const {
                        body
                    } = res
                      
                  var vacationArry=[];
                   res.body.forEach(function(item, index, array){
                               vacationArry.push({name:item.student.name,
                                                  fromDate:item.fromDate,
                                                  toDate:item.toDate,
                                                  createdAt:item.createdAt,
                                                  desc:item.desc,


                              })    
                          })
                   this.tableData=vacationArry;

                    console.log("===学生请假===",res.body);
              


                  

                })


                  this.$http({
                    method: 'get',
                    url: this.$getApi + 'management/klasses',

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
                            chanalue:function(){
              this.value=this.value;
         





                this.$http({
                    method: 'get',
                    url:   this.$getApi+'management/students?klassId=' + this.value,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res)

                    const {
                        body
                    } = res

                    console.log("===res students===",res.body);

                    if (!!body.length) {
                      


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

                    } else {
                        alert('err:' + body)
                    }

                })
















            },

         },
          mounted(){
 
            this.getData();
            
          }







    }
</script>
<style>
    
</style>