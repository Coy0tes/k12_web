<template>
    <div>
        <div style="width:102.5%; height:52px; background-color:#fff;margin-top:-10px;margin-bottom:10px;margin-left:-30px; padding-right:25px; padding-left:30px; line-height:50px;">
     <div class="line1"> 
      <el-button type="primary" v-if="check" @click="query" >返回</el-button>
            班级
                    <el-select v-model="value" placeholder="请选择班级" @change=chanalue>
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select> 
                  <el-button type="primary" @click="GetAdd" v-if="addNewStu" style="float:right; margin-top:9px;">添加新生</el-button>
              
                   
        </div>



            </div>
         <el-table :data="tableData" stripe style="width: 100%;color:#1d5391;" ref="multipleTable" @selection-change="changeFun" border="true">
              
               
               
                <el-table-column prop="id" label="学生ID" align="center" width="100">
                </el-table-column>

                <el-table-column prop="name" label="姓名" align="center">
                </el-table-column>

                <el-table-column prop="gender" 
                :formatter="formatSex"
                align="center"
                label="性别">
                </el-table-column>

                <el-table-column prop="birthday" label="生日" align="center" :formatter="dateFormat" >
                </el-table-column>

                <el-table-column prop="joinedAt" label="入校时间" align="center" :formatter="dateFormat">
                </el-table-column>
                <el-table-column prop="" label="收费人" align="center">
                </el-table-column>

                <el-table-column label="操作" width="300" align="center">
                    <template scope="scope">


                        <!-- 家长按钮 -->
                      
                        <el-button size="small" @click="">查询</el-button>
                        
                        <el-button size="small" type="danger">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <div class="tag_main" v-show="isShow">
                <div class="tag_content">
                    
                </div>
            </div>
    </div>
</template>
<script>
  import Moment from 'moment';
    export default {
        data(){
            return {
                klassesOptions:[],
                value:'',
                isShow:false,
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
            formatSex: function (row, column) {
            // console.log('-------formatDate------------',row.periodDiscounts)
        return row.gender == "FEMALE" ? '女' : row.gender == "MALE" ? '男' : "未知";

    },
            getData(){
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
                        this.tableData = body
                        this.count = body.length


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

        },
    }
</script>
<style scoped>
    .tag_main{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 100;
        background-color: rgba(0,0,0,.3);
    }
    .tag_content{
        width: 30%;
        position: absolute;
        left: 36%;
        height: 500px;
        top: 8%;
        background-color: #fff;
    }
</style>