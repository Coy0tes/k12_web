<template>
    <div class='main'>
       <div style="width:102.5%; height:50px; padding-top:4px; background-color:#fff;margin-top:-10px;margin-bottom:10px;margin-left:-20px; padding-left:30px; line-height:40px;position: fixed; z-index:100;">
           <div class="header">
       <el-select v-model="value" placeholder="请选择兴趣班">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.value"
                          :value="item.label">
                        </el-option>
                      </el-select>
            <el-button type="primary" @click="getData">查询</el-button>
        </div>

            </div>
      <div style=" background-color: #e6edf5; padding-left:10px;">
         
        

        <div class="tab">
        <template>
            <el-table
                :data="tableData"
                border
                style="width: 100%;margin-top:50px;">
             <el-table-column
                  prop="id"
                  label="id"
                  width="180"
                  align='center'>
            </el-table-column>
            <el-table-column
                  prop="name"
                  label="班级"
                  width="180"
                  align='center'>
            </el-table-column>
   
            <el-table-column
                  prop="lesPeriod"
                  label="课程周期"
                  width="180"
                  align='center'>
            </el-table-column>
             <el-table-column
                  prop="lessonCount"
                  label="课程课时"
                  width="180"
                  align='center'>
            </el-table-column>
            <el-table-column
                  prop="type"
                  :formatter="formatDate"
                  label="类型"
                  align='center'>
            </el-table-column>
             <el-table-column
                  prop="description"
                  label="描述"
                  align='center'>
            </el-table-column>
          </el-table>
        </template>
        </div>


      </div>
       
    </div>
    
</template>
<script>
    export default {
        data(){
            return {
              tableData:[],
              input:'',
              options:[],
              value:'',
            }
        },
         methods:{
                formatDate: function (row, column) {
            // console.log('-------formatDate------------',row.periodDiscounts)
        return row.type == "INTEREST_SMALL" ? '小班（一对多）' : row.type == "INTEREST_SMALL" ? '大班（一对一）' : "未知";

        },
            getData(){

               var iKlassArray=this.$store.state.classArray;
                 var classArray= iKlassArray.iklassArray;
                 console.log('iKlassArray',classArray);
                    this.options=classArray;


             
              var klassid=this.value;
                 this.$http({
                    method: 'get',
                    url: this.$getApi + 'management/ikm/'+klassid,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res
                        var bodyData=[];
                        bodyData.push(res.body);
                        if (!!bodyData) {
                           this.tableData = bodyData
                           this.count = bodyData.length
                        }else{
                          alert('err:' + body)
                        }

                        
                    console.log("===res tableData===",bodyData);
                    console.log("===res getKlassData===",res.body);

                  
                        })
            }
         },
          mounted(){
            this.getData();
        },
    }
</script>
<style scoped>
    .inpt{
        width: 150px;

    }
    .header{
        margin-bottom: 30px;
    }
    .main{
      float: left;
      padding-left: 0px;
      width: 100%;
    }
    .tab{
   
    }
    
</style>