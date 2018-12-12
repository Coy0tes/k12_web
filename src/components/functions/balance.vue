<template>
    <div>
        <div class="content1----">
          <div style="width:102.5%; height:50px; background-color:#fff;margin-top:-10px;padding-top:3px; margin-bottom:10px;margin-left:-30px; padding-right:25px;padding-left:30px; line-height:40px;position: fixed; z-index:100;">
            
               <span></span><el-select v-model="value" placeholder="请选择查询条件" style='margin-left:10px;'>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.label">
            </el-option>
        </el-select>
       
        <el-button type="primary">查询</el-button>


          </div>
       


    <div class="tab" >
 
       <el-table
    :data="tableData5.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    border
    style="width: 100%; margin-top:-30px;margin-left:10px; margin-right:10px;">
    <el-table-column type="expand" class-name="zclb">
      <template slot-scope="props">
       
       <el-table
    :data="tableData4"
    style="width: 100%;"
    max-height="250">
    
    <el-table-column
      prop="name"
      align="center"
      label="费种id"
      style="height:40px;"
      >
    </el-table-column>
    <el-table-column
      prop="province"
      align="center"
      label="费种"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="city"
      label="余额"
      >
    </el-table-column>
    
   
  </el-table>
      </template>
    </el-table-column>
     <el-table-column
      label="姓名"
      align="center"
      prop="name">
    </el-table-column>

    <el-table-column
      label="学生 ID"
      align="center"
      prop="id">
    </el-table-column>
   
   <el-table-column
      label="班级 ID"
      align="center"
      prop="klassid">
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
              layout="total, prev, pager, next"
              :total="tableData.length"
              v-show="ISshow"
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
                // ISshow:false,
                showSize: 10,
                current_page: 0,
                count: 100,
                currentPage:1,
                 pagesize:10,
                tableData:[],
                options:[{
                  value:"指定儿童",
                  label:1
                },{
                  value:"指定班级",
                  label:2
                }],
                value:'',
                 tableData5: [{
                  id: 1,
                  name: '张三',
                 klassid:2
                 
                 
                }, {
                  id: 2,
                  name: '李四',
                  klassid:2
                 
                 
                 
                }, {
                  id: 3,
                  name: '王五',
                  klassid:2
                  
                  
                 
                }, {
                  id: 4,
                  name: '赵六',
                  klassid:2
                
                  
               
                }],
                tableData4: [{
                 
                  name: 31,
                  province:'保育费' ,
                  city: 2000,
                 
                }, {
                  name: 10,
                  province:'伙食费' ,
                  city: 3000,
                }, {
                  name:20 ,
                  province: '兴趣班',
                  city: 5000,
                }]
              }
            },
        methods:{

                  getData(){
                console.log('==============')

                var timestamp3 = new Date().getTime();
             this.$http({

                    method: 'get',
                    url:this.$getApi+'charge/findRemains?startTime=1525137948000&klassId=2&studentId=35',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('---------当月余额---------',res)
                    
                    const {
                        body
                    } = res
                      

                  if(body.content.length==0){
                      this.ISshow=false
                    }else{
                      this.ISshow=true
                    }


                      if (!!body.length) {
                        this.tableData = body
                        this.count = body.length
                    } else {
                        // alert('err:' + body)
                    }

                    console.log("===res===",res.body);



                  

                })


      },handleSizeChange: function (size) {
        this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },






        },

          mounted(){
            console.log('---------mounted--------------');
            this.getData();
    
          },
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
      padding-top: 70px;
      padding-right: 17px;
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
  .el-table .cell{
    line-height: 35px!important;
  }
  .cell{
    line-height: 35px!important;
  }
    
</style>