<template>
    <div>
      <div class="line">
        <div style="width:103.5%; height:50px; padding-top:4px;margin-left:-40px; padding-right:25px; line-height:40px; padding-left:40px; ">
                    <div class="header">
                

            <el-select v-model="value" placeholder="请选择查询目标"  @change="changePath">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
                <span></span>
                <el-tag
                      :key="tag"
                      v-for="tag in klassOptions"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag)" >
                      {{tag.name}}
                </el-tag>


              <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>


                 

              <el-button type="primary" @click="getData">查询</el-button>
            </div>



            </div>
   
    
   <div style="">
          <template>
    <el-table
    border
      :data="tableData"
      style="width: 100%">

      <el-table-column
        prop="klassname"
        label="班级"
        align="center">
      </el-table-column>

        <el-table-column
        prop="studentname"
        label="学生"
        align="center">
      </el-table-column>


      <el-table-column
        prop="date"
        label="日期"
        align="center">
      </el-table-column>
    

      <el-table-column
        prop="earliest"
        align="center"
        :formatter="dateFormat"  
        label="开始时间">
      </el-table-column>
      <el-table-column
        prop="latest"
        align="center"
        :formatter="dateFormat"  
        label="结束时间">
      </el-table-column>
    </el-table>
  </template>
   </div>
      </div>
       
    </div>
</template>
<script>
import Moment from 'moment';
    export default {
        data(){
            return {
                options:[{
                    value:1,
                    label:"查询学生"
                },{
                    value:2,
                    label:"查询班级"
                }],
                value:'',
                tableData:[],
                value1:'',
                klassOptions:[],
            }
        },
        methods:{

              dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return Moment(date*1000).format("YYYY-MM-DD HH:mm:ss");  
            },
                getKlassData(){

                         var klassName = this.$store.state.cost;
                     console.log('+++++++    拿到的数据+++++++++',klassName);
                    let counst=klassName.cost;
                    var klassArray=[];
                          counst.forEach(function(item, index, array){
                               klassArray.push({
                                name:item.name,
                                id:item.id,
                                klassId:item.klassid})    
                          })
                            
                     this.klassOptions = klassArray;
                     console.log('+++++++ 操作的数据+++++++++',klassArray);
                     this.studentID=counst[0].id;
                     this.klassId=counst[0].klassid

                       var time= this.value1;
                    var klassId=this.klassId;
                    var stuID=this.studentID


                      console.log("time",time);
                    console.log('time2',time.toISOString().slice(0,10));
                    var dateTime=time.toISOString().slice(0,10)
                    console.log(dateTime)
                     this.$http({
                    method: 'get',
                    url:this.$getApi+'api/attendances?klassId='+ stuID +'&date='+dateTime,    //这里的stuID 是班级id              
                    headers: {
                        
                        'Authorization': 'Bearer '  + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res

                    console.log("===查询考勤1====",res);
                    console.log("===查询考勤2====",body);
                    if(res.body.length){
                        this.tableData = body
                    }
                    // this.tableData=body
                })
                this.getData();

                      },

         getData(){

                  var klassName = this.$store.state.cost;
                     console.log('+++++++    拿到的数据+++++++++',klassName);
                    let counst=klassName.cost;
                    var klassArray=[];
                          counst.forEach(function(item, index, array){
                               klassArray.push({
                                name:item.name,
                                id:item.id,
                                klassId:item.klassId,
                                klassname:item.klsaname})    
                          })
                            
                     this.klassOptions = klassArray;
                     console.log('+++++++ 操作的数据+++++++++',klassArray);
                     this.studentID=counst[0].id;
                     this.klassId=counst[0].klassId






                    var time= this.value1;
                    var klassId=this.klassId;
                    var stuID=this.studentID



                    console.log("time",time);
                    console.log('time2',time.toISOString().slice(0,10));
                    var dateTime=time.toISOString().slice(0,10)
                    console.log(dateTime)
                     this.$http({
                    method: 'get',
                    url:this.$getApi+'api/attendances?studentId='+ stuID +'&klassId='+ klassId +'&date='+dateTime,                  
                    headers: {
                        
                        'Authorization': 'Bearer '  + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res
                    var dataArry=[];
                    for(var i=0;i<body.length;i++){
                        
                        for(var j=0;j<klassArray.length;j++){
                            console.log("klassArray xunhuan",klassArray[j])
                            console.log('for循环',body[i]);

                            dataArry.push({
                                klassname:klassArray[j].name,
                                studentname:klassArray[j].name,
                                date:body[i].date,
                                earliest:body[i].earliest,
                                latest:body[i].latest
                                
                            })



                        }

                    }
                    this.tableData=dataArry

                    console.log("===查询考勤====",res);
                    console.log("===查询考勤====",body);

                })
                // this.getKlassData();

            },
            changePath(){
                if(this.value==1){
                     this.$store.state.check=true;
                    this.$router.push({path:'students'});
                    console.log('11111111111',this.value)
                }else if(this.value==2){
                     this.$store.state.check=true;
                    console.log('2222222222',this.value);
                    this.$router.push({path:'klasses'});
                }
                
            },




        },
         mounted() {

            console.log('mounted,查询考勤 ');
        this.getData()
         // location.reload();
        },
         activated(){
              this.getData()
         }
           



        
    }
</script>
<style scoped>
    .line{
      background-color: #fff;
    }
    .header{
        margin-bottom: 20px;
    }
</style>