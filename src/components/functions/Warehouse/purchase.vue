<template>
    <div>


            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
              <el-tab-pane label="园所库存" name="first">
                <applyFor></applyFor>
              </el-tab-pane>
              <el-tab-pane label="班级物资" name="second">
                <klassInfor></klassInfor>
              </el-tab-pane>
      
            </el-tabs>
            <div style="padding-left: 10px;
        padding-right: 10px">
                
       
                <!-- 申请 -->
                <el-dialog
                 
                  :visible.sync="dialogVisible"
                  width="600px"
                  :before-close="handleClose">
                         <div class="top">
                 <span class="top_text">申请采购</span>
                 <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                   <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
                 </div>
                 </div>
                  
                  <div style="width:300px;margin:0 auto;">
                     
                    <el-form  label-width="100px">
                      <el-form-item label="申请日期">
                          <el-date-picker
                              v-model="value1"
                              type="date"
                              style='width:200px'
                              placeholder="请选择日期">
                            </el-date-picker>
                      </el-form-item>
                      <el-form-item label="物品名称" >
                        <el-input  style='width:200px' placeholder="请输入物品名称"></el-input>
                      </el-form-item>
                      <el-form-item label="物品数量">
                        <el-input style='width:200px' placeholder="请输入申请数量"></el-input>
                      </el-form-item>
                      <el-form-item label="申请单位">
                        <el-input style='width:200px' placeholder="请输入申请单位"></el-input>
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
    </div>
    
</template>
<script>
import applyFor from '../Warehouse/applyFor.vue'
import klassInfor from '../Warehouse/klassWarehouse.vue'
    export default {
        data(){
            return {
                tableData:[
                    {
                        date:'2018-10-11',
                        name:'玩具',
                        num:'30',
                        who:'教学部'
                    }

                ],
                dialogVisible:false,
                activeName2:'first',

            }
        },
               components: { //2、暴露
  
      applyFor,
      klassInfor
     
 
    },
        methods:{

        },
        mounted(){

        }
    }
</script>
<style scoped>
  
</style>