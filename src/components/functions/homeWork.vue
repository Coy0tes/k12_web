<template>
    <div>
               <div class="line"> 
                <div style="width:100%; height:50px;padding-top:4px;margin-left:0px;  ">
                <el-select v-model="value" placeholder="请选择班级" visible-change=''   >
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select> 
                  
                
                  
                  <el-button type="primary" @click="getData">查 询</el-button>
                  <!-- <el-button type="primary" @click="showDialog">新增班级计划</el-button> -->

                    <el-button type="primary" @click="showDialog" style="float:right;">新增作业</el-button>
            </div>
                    
                                
        </div>

        <div class="line" style="margin-top:-20px;">
            <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%; " ref="multipleTable" border>
                <el-table-column prop="id" label="ID" width="100" align="center">
                </el-table-column>
                <el-table-column prop="title" label="标题" align="center">
                </el-table-column>
                <el-table-column prop="" label="内容" align="center">
                </el-table-column>
                 <el-table-column prop="planType" label="类型" align="center"  :formatter="formatDate">
                </el-table-column>

                <el-table-column label="操作" width="" align="center">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>

              <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pagesize"
              background="false"
              layout="total, prev, pager, next"
              :total="tableData.length"
              style="float:right; margin-top:20px;">
            </el-pagination>

            

       <el-dialog :visible.sync="editDialogVisible" :before-close="handleClose(dialogVisible)" class="dialogSzie" width="1000px">
       
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">编辑班级计划</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="editDialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->

            <el-form ref="form" :model="form" label-width="80px">

             <el-form-item label="选择班级">
                  <el-select v-model="value" placeholder="请选择班级">
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select> 
                </el-form-item>

                <el-form-item label="选择类型">
                  <el-select v-model="plantypevalue" placeholder="请选择类型">
                      <el-option
                        v-for="item in planTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select> 
             </el-form-item>       

                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>

                <el-form-item label="内容">
                    <!-- <el-input v-model="form.content"></el-input> -->
                    <!-- <el-input v-html="form.content"></el-input> -->
                    <template v-html="form.content">
                        <UE :defaultMsg=defaultMsg  :config=config  :id=ue1 ref="ue"></UE>
                    </template>

                    </el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="isAdd(1)" >关 闭</el-button>
                <el-button @click="isAdd(2)" type="primary">确 定</el-button>
            </span>

        </el-dialog>





        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose(dialogVisible)"  width="1000px" class="dialogSzie">
         
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">新增班级计划</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->

            <el-form ref="form" :model="form" label-width="80px" style="margin-left:120px;">

             <el-form-item label="选择班级" style="width:400px;">
                  <el-select v-model="value" placeholder="请选择班级" style="width:328px;">
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select> 
                </el-form-item>

                <el-form-item label="选择类型" style="width:400px;" >
                  <el-select v-model="plantypevalue" placeholder="请选择类型" style="width:328px;">
                      <el-option
                        v-for="item in planTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select> 
             </el-form-item>       

                <el-form-item label="标题" style="width:400px;">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>

                <el-form-item label="内容" style="width:408px;">
                    <UE :defaultMsg=defaultMsg :config=config :id=ue ref="ue"></UE>
                   
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="isAdd(1)" >关 闭</el-button>
                <el-button @click="IsAdd(0)" type="primary">确 定</el-button>
            </span>

        </el-dialog>
        </div>


    </div>
</template>
<script>
    import UE from '../ue/ue.vue'; 
    export default {
        components: {UE},
        data(){
            return {
                dialogVisible:false,
                 ue1: "ue1", // 不同编辑器必须不同的id
                  config: {
                  initialFrameWidth: null,
                  initialFrameHeight: 350
                },
                value:'',
                tableData:[],
                  currentPage:1,
                 pagesize:10,
                 editDialogVisible:false,
                 dialogVisibl:false,
                showSize: 10,
                current_page: 0,
                count: 100,
                form:{},

            }
        },
        methods:{
            formatDate: function (row, column) {
            // console.log('-------formatDate------------',row.periodDiscounts)
            return row.planType == "WEEK" ? '周' : row.planType == "MONTH" ? '月' :  row.planType == "NOTICE" ? '通知' :  row.planType == "HOMEWORK" ? '亲子作业': "未知";

            },
              showDialog(path) {
                // this.path = path

                this.form.title = ''
                this.form.content = ''
                this.dialogVisible = true
                this.dialogUsage = 0

            },
                  UESetContent(){
                    if (this.imgUrl=='') {
                      var upImg=this.imgUrl
                    this.$store.commit('imgUrl',upImg);
                    console.log('0000000000000000000000',this.imgUrl)
                            }
                    
                     // this.ue1.setContent('<p>new text</p>', true);
                     let content1 = this.$refs.ue.setUEContent();

                   console.log(content1)
                   // ue.execCommand('inserthtml', this.imgUrl);
                      // this.defaultMsg=this.imgUrl
                      console.log("defaultMsg",this.defaultMsg)
                },
             handleClose(dialogName) {
                this[dialogName] = false
            },
             handleEdit(index, row) {
                // this.UESetContent();
                console.log('===edit=====index====',index)
                console.log('===edit=====index====',row)
                this.editDialogVisible = true;

                this.dialogVisible = false;
                this.dialogUsage = 1;
                this.dialogIndex = index;
                this.planId = row.id;
                this.kgName = row.name;

                this.form = Object.assign({}, row)
                this.defaultMsg = row.content
            },
              handleSizeChange: function (size) {
               this.pagesize = size;
            },
               handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
            },
               handleCurrentChange(val) {
                this.current_page = val
            },
            IsAdd(){
                   this.$http.post(
                    //'http://k12soft.vwico.com:8080/management/kindergartens/',
                    this.$getApi+'management/klass-plans',
                    {
                        "title": this.form.title,
                        "content": this.form.content,
                        "klassId": this.value,
                        "type": "HOMEWORK"
                    },
                    {
                      headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token

                      }
                    }
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===body=add==klassPlans====",res.body);
                     this.$message({
                      message: '成功',
                      type: 'success'
                    });
                    
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });

            },
            getData(){
                console.log('homeWork.vue')
                 var klassId =  1
               if (this.value==='') {
                  klassId=1
               }else{
                klassId=this.value
               }
                    this.$http({
                    method: 'get',
                    url: this.$getApi+'management/klass-plans?klassId='+ klassId + '&planType=HOMEWORK',
                    headers: {
                        'Authorization': 'Bearer '+localStorage.token
                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res 
                    console.log("=============homeWork.vue================", 'https://k12.vwico.com/management/klass-plans?klassId='+ this.value + '&planType=' + this.plantypevalue)

                    console.log("====homeWork.vue ======",res.body);

                     this.$http({
                                method: 'get',
                                url: this.$getApi+'management/klasses',

                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.token

                                }
                            }).then((res) => { // promise对象
                                const {
                                    body
                                } = res

                                console.log("===res homeWork.vue===",res.body);

                                if (!!body.length) {
                                    
                                      var klassesArray=[];
                                      res.body.forEach(function(item, index, array){
                                           klassesArray.push({value:item.id,label:item.name})    
                                      })
                                         //this.value = klassesArray[0].value
                                         this.klassesOptions = klassesArray;
                                            
                                        } else {
                                              this.klassesOptions=[];
                                        }
                                    })
                     

                    if (!!body.length) {
                        this.tableData = res.body;
                        this.count = res.body.length;

                    } else {
                        // this.klassesOptions=[];
                    }

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