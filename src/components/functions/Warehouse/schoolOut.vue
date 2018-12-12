<template>
    <div>
            <div style="padding-left: 10px;
        padding-right: 10px;margin-top:10px">
                
                   <div>
                                 <el-select v-model="value" placeholder="请选择周期" style='display:inline-block' @change='change'>
                                    <el-option
                                      v-for="item in options"
                                      :key="item.value"
                                      :label="item.value"
                                      :value="item.label">
                                    </el-option>
                            </el-select>
                                <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期"
                                    v-show='isShow'>
                                  </el-date-picker>
                               条形码： <el-input v-model="isbn" placeholder="请输入内容" style='display:inline-block ;width:200px' @keyup.native="show($event)"></el-input>
                            <el-button type="primary" style=' margin-top:3px;margin-bottom:5px;display:inline-block' @click='search1' >查询</el-button>
                            <!-- <el-button style=' margin-top:5px;margin-bottom:5px;float:right' @click='dialogVisible=true'>领取</el-button>                              -->
                        </div>
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
                tableData:[
                    {
                        thNum:'165435463541',
                        thId:'22',
                        name:'玩具',
                        num:'30',
                        who:'教学部',
                        howMuch:'10',
                        


                    }

                ],
                  options:[{
                  value:'学期',
                  label:'SEMESTER',
                },{
                  value:'月',
                  label:'MONTH',
                },{
                  value:'周',
                  label:'WEEK',
                },{
                  value:'日',
                  label:'DAY',
                },],
                value:'',
                value1:'',
                dialogVisible:false,
                isShow:false,
                isbn:'',

            }
        },
     
        methods:{
          change(){
            console.log('111',this.value)
            if (this.value=='DAY') {
              this.isShow=true
            }else{
              this.isShow=false
            }
          },
          search(){
               if (this.value=='DAY') {
                console.log(this.value1)
                 var date = new Date(this.value1);  
                 var Month=(date.getMonth() + 1);
                 var Month=(date.getMonth() + 1);
                 var Day=date.getDate()
                 var date_value=date.getFullYear() + '-' + (Month>9?Month:('0'+Month)) + '-' +(Day>9?Day:('0'+Day))  
                 console.log(date_value)
                      this.$http({
                    method: 'get',
                    url:  this.$getApi+'warehouseSchoolLog/management/findAll?localDate='+date_value+'&type=DAY',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res);

                    this.tableData=res.body
                        })
              }else {
                        var date = new Date();
                        var seperator1 = "-";
                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var strDate = date.getDate();
                        if (month >= 1 && month <= 9) {
                            month = "0" + month;
                        }
                        if (strDate >= 0 && strDate <= 9) {
                            strDate = "0" + strDate;
                        }
                        var currentdate = year + seperator1 + month + seperator1 + strDate;
                         console.log(currentdate)

                    this.$http({
                    method: 'get',
                    url:  this.$getApi+'warehouseSchoolLog/management/findAll?localDate='+currentdate+'&type='+this.value,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res.body);

                    this.tableData=res.body
                        })
              }
          },
          search1(){
                if (this.isbn=='') {
                  this.search();
                }else{
                        if (this.value=='DAY') {
                console.log(this.value1)
                 var date = new Date(this.value1);  
                 var Month=(date.getMonth() + 1);
                 var Month=(date.getMonth() + 1);
                 var Day=date.getDate()
                 var date_value=date.getFullYear() + '-' + (Month>9?Month:('0'+Month)) + '-' +(Day>9?Day:('0'+Day))  
                 console.log(date_value)
                      this.$http({
                    method: 'get',
                    url:  this.$getApi+'warehouseSchoolLog/management/findAll?localDate='+date_value+'&isbn='+this.isbn+'&type=DAY',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res);

                    this.tableData=res.body
                        })
                this.isbn=''
              }else {
                        var date = new Date();
                        var seperator1 = "-";
                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var strDate = date.getDate();
                        if (month >= 1 && month <= 9) {
                            month = "0" + month;
                        }
                        if (strDate >= 0 && strDate <= 9) {
                            strDate = "0" + strDate;
                        }
                        var currentdate = year + seperator1 + month + seperator1 + strDate;
                         console.log(currentdate)

                    this.$http({
                    method: 'get',
                    url:  this.$getApi+'warehouseSchoolLog/management/findAll?localDate='+currentdate+'&isbn='+this.isbn+'&type='+this.value,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res.body);

                    this.tableData=res.body
                        })
                this.isbn=''
              }
                }
          },
            show(ev){
             console.log(ev.keyCode)
             this.searcNum=ev.keyCode
            
                if (ev.keyCode==13) {
                    console.log('要执行的代码')
                     this.search1();
                    console.log(this.value11)
                }
          },
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

                    this.tableData=res.body
                        })
          },
        },
        mounted(){
            this.getData();
        }
    }
</script>
<style scoped>
  
</style>