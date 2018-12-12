<template>
    <div>
        <div class="content1">
       <div style="width:102.5%; height:50px; margin-top:-20px;margin-left:-20px;padding-top:3px; padding-right:25px;padding-left:20px; line-height:40px;position: fixed; z-index:100;">
         
     
          
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
      
      <el-button type="primary" @click='search'>查询儿童</el-button>
      <!-- <el-button type="primary" @click='test'>test</el-button> -->
       </div>
        


        <!-- tag标签 -->
        <el-tag
          :key="tag"
          v-for="tag in klassOptions"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag.name}}
        </el-tag>


    <div class="tab">
 
       <el-table
   :data="tableData"
    border
    style="width: 100%;margin-top:0px;">
  
     <el-table-column
      label="姓名"
      align="center"
      prop="name">
    </el-table-column>

    <el-table-column
      label="学生 ID"
      align="center"
      prop="klassId">
    </el-table-column>
   
   <el-table-column
      label="班级"
      align="center"
      prop="klassName">
    </el-table-column>

    <el-table-column
      label="金额"
      align="center"
      prop="paback">
    </el-table-column>
    <el-table-column
     
      label="状态"
      width="180"
      align="center">
      <template slot-scope="scope">
        
        <el-button type="primary" size="small" @click="handleClose(scope.$index, scope.row)">编辑</el-button>
      </template>
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
              v-show='ISshow'
              layout="total, prev, pager, next"
              :total="tableData.length"
              style="float:right; margin-top:20px;">
            </el-pagination>
</div>
    </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
              ISshow:false,
               currentPage:1,
                 pagesize:10,
                 showSize: 10,
                current_page: 0,
                count: 100,
              value1:'',
                tableData:[{
                  name:'大春',
                  klassId:'2',
                  klassName:"奇思班",
                  paback:'6000',
                },{
                  name:'法特别',
                  klassId:'2',
                  klassName:"奇想班",
                  paback:'8000',
                },{
                  name:'阿瑟东',
                  klassId:'2',
                  klassName:"奇慧班",
                  paback:'3000',
                },{
                  name:'阿萨德',
                  klassId:'2',
                  klassName:"奇思班",
                  paback:'2000',
                },],
               

          
            }
        },
        methods:{
                  search(){
                      

                var studentId = this.$store.state.studentId
                console.log("guardian log is：",studentId )



                this.$router.push({path:'students'});



                  },
                  test(){
                     var date = new Date(this.value1);  
                 var year = date.getFullYear();
                 var month= (date.getMonth() + 1)<10?'0'+(date.getMonth() + 1) :date.getMonth() + 1
                 var day =  (date.getDate())<10?'0'+(date.getDate()) :date.getDate()

                 console.log(day)
                  },
                   handleSizeChange: function (size) {
        this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },

                  getData(){

                var studentId = this.$store.state.cost.cost[0].id
                console.log("guardian log is：",studentId )

// toDate----------------------------------
                 var date = new Date(this.value1);  
                 var year = date.getFullYear();
                 var month= (date.getMonth() + 1)<10?'0'+(date.getMonth() + 1) :date.getMonth() + 1;
                 var day =  (date.getDate())<10?'0'+(date.getDate()) :date.getDate()

                 console.log(month)
                 var date_value=year + '-' + month+ '-' + day;  

                console.log('data',date_value)

 // fromDate-----------------------              

                //         this.$http.get(
                  
                //     this.$getApi+'payback',
                //     {
                        
                //         "fromDate": "1523947239427",
                //         "studentId": 2,
                //         "toDate": "1523947239427"
                //     },
                //     {
                //       headers:{
                //         'content-type': "multipart/form-data",
                //         // 'Content-Type': 'application/json',
                //         'Authorization': 'Bearer '+ localStorage.token

                //       }
                //     }
                // ).then((res) =>{
                //     // const {body} = res;
                //     console.log("===body=add==teacher====",res);
                    
                // })




                this.$http({
                    method: 'get',
                    url:this.$getApi+'payback',
                   params:{
                       fromDate: "2018-01-01",
                        studentId: studentId,
                        toDate: date_value,
                 },

                    
                      headers: {
                         // 'content-type': "multipart/form-data",
                        // 'Content-Type': 'application/json',
                                            'Authorization': 'Bearer ' + localStorage.token

                                        }
                    
                    
                }).then((res) => { // promise对象
                    console.log('======res=====',res)
                  console.log('------------------',res.body);
                    
                    // const {
                    //     body
                    // } = res
                 
                    var dataArray=[];

                    dataArray.push({
                      name:res.body.student.name,
                      klassId:res.body.klass.id,
                      klassName:res.body.klass.name,
                      // paback:res.bdoy.money
                      paback:res.body.money
                    })



                    this.tableData=dataArray;

                    console.log(this.tableData)
                })
      },






        },

          mounted(){
            console.log('---------mounted--------------');
            this.getData();
    
          },
           activated(){
            this.getData();
        }
    }
</script>
<style scoped>
    .content1{
        width: 100%;
        /*height: 400px;*/
        /*margin-top: 30px;*/
        /*background-color: red;*/
    }
    #input{
      display: inline-block;
      width: 200px
    }
     .block{
        float: right;
    }
    .tab{
      margin-top: 30px;
      padding-top: 29px;
      padding-right: 20px;

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
    
</style>