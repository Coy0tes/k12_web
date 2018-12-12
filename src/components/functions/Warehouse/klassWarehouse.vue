<template>
    <div>
            <div style="padding-left: 10px;
        padding-right: 10px">
                
                  <el-tabs v-model="activeName" @tab-click="handleClick" style='margin-top:3px'>
                    <el-tab-pane label="教学类" name="TEACH">
                            <div>
                                班级 : <el-select v-model="value123" placeholder="请选择" @visible-change="chanalue">
                                  <el-option
                                    v-for="item in klassesOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>

                                 <el-select v-model="value" placeholder="请选择" style='display:inline-block'>
                                    <el-option
                                      v-for="item in options"
                                      :key="item.value"
                                      :label="item.value"
                                      :value="item.label">
                                    </el-option>
                            </el-select>
                            <el-input v-model="searchData" placeholder="请输入内容" style='display:inline-block ;width:200px' @keyup.native="show($event)"></el-input>
                              
                            <el-button type="primary" style=' margin-top:15px;margin-bottom:5px;display:inline-block' @click='search'>查询</el-button>
                             
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
                                        prop="klass.name"
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
                                        width='180px'
                                         align="center"
                                        label="核对领取">

                                              <template slot-scope="scope">
                                                
                                              
                                                <el-button  size="mini" @click='deleteWare(scope.row)'  type="danger">删除</el-button>
                                              </template>

                                      </el-table-column>
                                    </el-table>
                    </el-tab-pane>

                   
                    <el-tab-pane label="家具" name="FURNITURE">
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
                            <el-button type="primary" style=' margin-top:15px;margin-bottom:5px;display:inline-block' >查询</el-button>
                            
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
                                        prop="klass.name"
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
                                        width='180px'
                                         align="center"
                                        label="核对领取">

                                              <template slot-scope="scope">
                                                
                                              
                                                <el-button  size="mini" @click='deleteWare(scope.row)'  type="danger">删除</el-button>
                                              </template>

                                      </el-table-column>
                                    </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="玩具" name="TOY">
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
                            <el-button type="primary" style=' margin-top:15px;margin-bottom:5px;display:inline-block' >查询</el-button>
                             
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
                                        prop="klass.name"
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
                                        width='180px'
                                         align="center"
                                        label="核对领取">

                                              <template slot-scope="scope">
                                                
                                              
                                                <el-button  size="mini" @click='deleteWare(scope.row)'  type="danger">删除</el-button>
                                              </template>

                                      </el-table-column>
                                    </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="电子类" name="ELECTRON">
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
                            <el-button type="primary" style=' margin-top:15px;margin-bottom:5px;display:inline-block' >查询</el-button>
                             
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
                                        prop="klass.name"
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
                                        width='180px'
                                         align="center"
                                        label="核对领取">

                                              <template slot-scope="scope">
                                                
                                              
                                                <el-button  size="mini" @click='deleteWare(scope.row)'  type="danger">删除</el-button>
                                              </template>

                                      </el-table-column>
                                    </el-table>
                    </el-tab-pane>

                  </el-tabs>
      
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
                <!-- 删除 -->
                   <el-dialog
                  
                  :visible.sync="dialogVisible2"
                  width="600px"
                  :before-close="handleClose">
                   <div class="top">
                 <span class="top_text">删除</span>
                 <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                   <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible2 = false">
                 </div>
                 </div>

                 <div>
                   确认删除？
                 </div>
                  <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                    <el-button type="primary" @click="deleteTrue">确 定</el-button>
                  </span>
                </el-dialog>
    </div>
    
</template>
<script>
import Moment from 'moment';
    export default {
        data(){
            return {
                tableData:[],
                activeName:'TEACH',
                dialogVisible:false,
                dialogVisible2:false,
                klassesOptions:[],
                searchData:'',
                value123:'',
                 options:[
                {
                    label:'id',
                    value:'物品id'

                },{
                    label:'num',
                    value:'条形码'
                },{
                    label:'name',
                    value:'名字'
                }

                ],
                value:'',
                deleteId:'',
                delKlassId:''

            }
        },
     
        methods:{
              deleteTrue(){
                             this.$http({
                    method: 'delete',
                    url:this.$getApi+'warehouseKlass/management/deleteBy?klassId='+this.delKlassId +'&ids='+this.deleteId ,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   const {
                        body
                    } = res
                this.$message({
                       message: '成功',
                     type: 'success'
                    }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                          }); 
                      });
                   
                      


                    console.log("===res students===",res.body);


                  

                })
                this.dialogVisible2=false
              },
             deleteWare(row){
            console.log(row)
            this.delKlassId=row.klass.id
            this.deleteId=row.id
            this.dialogVisible2 = true
          },
           dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return Moment(date*1000).format("YYYY-MM-DD");  
            },
            show(ev){
             console.log(ev.keyCode)
             this.searcNum=ev.keyCode
            
                if (ev.keyCode==13) {
                    console.log('要执行的代码')
                     this.search();
                    console.log(this.value11)
                }
          },    
          search(){
            console.log('1111',this.value,)
            if (this.value=='num') {
                this.$http({
                    method: 'get',
                    url: this.$getApi + '/warehouseKlass/management/findByKlass?klassId='+this.value123+'&isbn='+this.searchData,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res
                    // var tableArry=[]
                    // tableArry.push(res.body)
                    // console.log("===res getData===",res);
                    if (res.body.length==0) {
                      alert('暂无数据')
                    }else{
                         this.$message({
                      message: '查询成功',
                      type: 'success'
                    });
                    }
                      this.tableData=res.body
                     
                    console.log("======",res);

                        })
                this.searchData=''
            }else if (this.value=='name') {
              console.log(this.value)
                   this.$http({
                    method: 'get',
                    url: this.$getApi + 'warehouseKlass/management/findByKlass?klassId='+this.value123+'&name='+this.searchData,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res
                    // var tableArry=[]
                    // tableArry.push(res.body)
                    // console.log("===res getData===",res);
                    //   this.tableData=tableArry
                      
                        this.tableData=res.body
                        this.$message({
                      message: '查询成功',
                      type: 'success'
                    });
                    console.log("======",res);

                        })
                 this.searchData=''
            } 
          },
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
               handleClick(){
            this.getData();
          },
              getData(){
            
             this.$http({
                    method: 'get',
                    url: this.$getApi + 'warehouseSchool/management/findAllBySchoolIdAndType?subclass='+this.activeName +'&superClass=KLASS',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res
                    console.log(res)
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