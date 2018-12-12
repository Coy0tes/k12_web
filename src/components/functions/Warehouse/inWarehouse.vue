<template>
    <div style='padding-left:10px;padding-right:10px'>
     <!-- 入库 -->
        <div>
                                 <el-select v-model="value" placeholder="请选择" style='display:inline-block'>
                                    <el-option
                                      v-for="item in options"
                                      :key="item.value"
                                      :label="item.value"
                                      :value="item.label">
                                    </el-option>
                            </el-select>
                              <el-input v-model="input" placeholder="请输入内容" style='display:inline-block ;width:200px'></el-input>
                            <el-button type="primary" style='margin-bottom:5px;display:inline-block;margin-top:3px' >查询</el-button>
                            <!-- <el-button style='float:right' @click='dialogVisible=true'>领取</el-button>                              -->
         </div>
         <div >  
                  <el-table
                  :data="tableData"
                  border
                  style="width: 100%;">
            
                  <el-table-column
                    prop=""
                    label=""
                    width='1'
                   >
                  </el-table-column>
                     <el-table-column
                    prop="id"
                    label="id"
                     align="center"
                     width='100px'
                   >
                  </el-table-column>
                  <el-table-column
                    prop="buyAt"
                    label="购置时间"
                     align="center"
                   >
                  </el-table-column>
                  <el-table-column
                    prop="createdAt"
                     align="center"
                    label="分配时间">
                  </el-table-column>
                  <el-table-column
                    prop="isbn"
                    label="物品条形码"
                     align="center"
                   >
                  </el-table-column>
                 
                  <el-table-column
                    prop="name"
                    label="物品名称"
                     align="center"
                   >
                  </el-table-column> 
                   <el-table-column
                    prop="spec"
                    label="规格"
                     align="center"
                   >
                  </el-table-column>
                  <el-table-column
                    prop="oldNum"
                    align="center"
                    label="库存数量">
                  </el-table-column>
                  <el-table-column
                    prop="createdBy.username"
                     align="center"
                    label="操作人">
                    </el-table-column>
                    <el-table-column
                    prop="num"
                     align="center"
                    label="操作数量">
                  </el-table-column>  
                    <el-table-column
                    prop="klass"
                     align="center"
                    label="分配班级">
                  </el-table-column> 
                     <el-table-column
                    prop="operationtype"
                     align="center"
                    label="状态">
                  </el-table-column> 
                   
                 
                
                </el-table>
    
         </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
              tableData:[]
            }
        },
        methods:{
                getData(){
                  this.$http({
                    method: 'get',
                    url:  this.$getApi+'warehouseSchoolLog/management/findAll',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res.body);
                    var inWareArry=[]
                    for (var i = 0; i <res.body.length; i++) {
                      console.log('00000')
                      if (res.body[i].operationtype=='ADDBY') {
                        console.log('1111111111111')
                        inWareArry.push(res.body[i])
                      }
                    }
                    console.log(inWareArry)


                    this.tableData=inWareArry
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