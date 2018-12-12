<template>
    <div>
            <div style="padding-left: 10px;
        padding-right: 10px;margin-top:10px">
                
                   <div>
                                   <el-select v-model="value1" placeholder="请选择班级" @visible-change="chanalue">
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>
                              <el-input v-model="input" placeholder="请输入内容" style='display:inline-block ;width:200px'></el-input>
                            <el-button type="primary" style=' margin-top:3px;margin-bottom:5px;display:inline-block' @click='getData' >查询</el-button>
                            <!-- <el-button style=' margin-top:5px;margin-bottom:5px;float:right' @click='dialogVisible=true'>领取</el-button>                              -->
                        </div>
                    <el-table
                                      :data="tableData"
                                      border
                                      style="width: 100%;margin-top:0px;">
                                
                                      <el-table-column
                                        prop=""
                                        label=""
                                        width='1'
                                       >
                                      </el-table-column>
                                         <el-table-column
                                        prop="id"
                                        label="物品id"
                                         align="center"
                                         width='80px'
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="createdAt"
                                        label="购置时间"
                                        :formatter="dateFormat"
                                         align="center"
                                       >
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
                                        prop="applyBy.name"
                                        label="班级"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="num"
                                        align="center"
                                        label="库存数量">
                                      </el-table-column>
                                   
                                       
                                        <el-table-column
                                        prop="price"
                                         align="center"
                                        label="单价">
                                      </el-table-column> 
                                       <el-table-column
                                        prop="createdBy"
                                         align="center"
                                        label="操作者">
                                      </el-table-column>
                                     
                                      <el-table-column
                                        width='180px'
                                         align="center"
                                        label="核对领取">

                                              <template slot-scope="scope" >
                                                
                                                <el-button  size="mini" type='text' v-if="!scope.row.isAllot" @click='creatFor(scope.row)'>领取</el-button>
                                               
                                              </template>

                                      </el-table-column>
                                    </el-table>
            </div>
              <el-dialog
                 
                  :visible.sync="dialogVisible"
                  width="600px"
                  :before-close="handleClose">
                         <div class="top">
                 <span class="top_text">申请领取</span>
                 <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                   <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
                 </div>
                 </div>
                  
                  <div style="width:300px;margin:0 auto;">
                      
                    <el-form  label-width="100px">
                         <el-form-item label="物品id" >
                        <el-input  style='width:200px' placeholder="请输入物品id"></el-input>
                      </el-form-item>
                      <el-form-item label="物品条码" >
                        <el-input  style='width:200px' placeholder="请输入物品条码"></el-input>
                      </el-form-item>
                      <el-form-item label="物品名称" >
                        <el-input  style='width:200px' placeholder="请输入物品名称"></el-input>
                      </el-form-item>
                      <el-form-item label="物品数量">
                        <el-input style='width:200px' placeholder="请输入领取数量"></el-input>
                      </el-form-item>
                      <el-form-item label="申请单位">
                        <el-input style='width:200px' placeholder="请输入领取单位"></el-input>
                      </el-form-item>
                      <el-form-item>
                       <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                      </el-form-item>
                    </el-form>


                  </div>
                  <span slot="footer" class="dialog-footer">
                   
                    
                  </span>
                </el-dialog>
    </div>
    
</template>
<script>

    export default {
        data(){
            return {
                tableData:[],
                dialogVisible:false,
                getId:'',
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
          creatFor(row){
              this.getId=row.id
              this.$http.put(
                    this.$getApi +'warehouseSchoolAllot/management/getIt?ids='+row.id,
                   {},
                    {
                      headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token

                      }
                    }
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===add Student body=000000====",res.body);
                    this.$message({
                      message: '成功',
                      type: 'success'
                    }); 
                    this.getData();
                    // console.log('birthday');
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    }); 
                });
          },
          getData(){
             this.$http({
                    method: 'get',
                    url:  this.$getApi+'/warehouseSchoolAllot/management/findBy?localDate=2018-10-29',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res.body);
                    var tableData=[]
                     res.body.forEach(function(item, index, array){
                               tableData.push({
                                createdAt:item.createdAt,
                                id:item.id,
                                spec:item.spec,
                                isbn:item.isbn,
                                name:item.name,
                                price:item.price,
                                createdBy:item.createdBy.username,
                                num:item.wareNum,
                                isAllot:item.isAllot,
                                applyBy:item.applyBy,
                                })    
                          })
                    this.tableData=tableData
                 
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