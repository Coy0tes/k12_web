<template>
    <div>
        <div style="width:102.5%; height:50px; background-color:#fff;margin-top:-10px;margin-left:-20px; padding-right:25px;padding-left:30px; line-height:40px;position: fixed; z-index:100;">
          
          <el-input class='search' placeholder="请输入查询儿童"></el-input>
         <el-button type="primary">查询</el-button>
         <el-button type="primary" style="float:right;" @click='open'>新增缴费</el-button>
        </div>
         
       <div style="padding-top:60px;">
          <template>
            <el-table
              :data="tableData"
              style="width: 100%;maring-top:60px;"
              border="true">
              <el-table-column
                prop="id"
                align="center"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="name"
                align="center"
                label="姓名">
              </el-table-column>
               <el-table-column
                prop="payDate"
                align="center"
                label="交费时间">
              </el-table-column>
              <el-table-column
                prop="money"
                align="center"
                label="预交费用">
              </el-table-column>
              <el-table-column
                prop="klass"
                align="center"
                label="报名班级">
              </el-table-column> 
             
              <el-table-column
                prop="dtae"
                align="center"
                label="入园时间">
              </el-table-column>
               <el-table-column
                prop="teacher"
                align="center"
                label="招生老师">
              </el-table-column>
              <el-table-column
                prop="other"
                align="center"
                label="备注">
              </el-table-column>
              <el-table-column
                prop="other"
                align="center"
                label="操作">
              </el-table-column>
            </el-table>
          </template>
       </div>
          <el-dialog
      
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
                <div class="top">
                 <span class="top_text">新增缴费</span>
                 <img src="../../../assets/close3.png" height="48" width="48" class="add_close"@click="dialogVisible = false">
              </div>
                
                <div>
                  
                  <newPrepay></newPrepay>
                </div>

          
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>

    </div>
</template>
<script>
import newPrepay from '../finance/newPrepay.vue'
    export default {
        data(){
            return {
                  tableData: [{
                    id: '1',
                    name: '王小虎',
                    klass: '奇想班',
                    money: '5000',
                    payDate:'2018-1-1',
                    dtae:'2018-2-25'
                  }],
                  dialogVisible:false,
            }
        },
        components:{
          'newPrepay':newPrepay,
        },
        methods:{
          open(){
            this.dialogVisible=true
          },

          getData(){

                          this.$http({
                    method: 'get',
                    url: this.$getApi + 'recreit/findAll?page=1&size=10',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log('*************',res.body)

                  
                        })


          },







        },
        mounted(){
          this.getData();
        }
    }
</script>
<style scoped>
      .search{
        width: 200px;
        margin-bottom: 25px;
     
    }
</style>