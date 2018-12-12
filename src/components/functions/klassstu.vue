<template>
   
    <div>
        <div style="width:102.5%; height:50px;padding-left:40px; padding-top:4px; background-color:#fff;margin-top:-10px;margin-bottom:10px;margin-left:-20px; padding-right:25px; line-height:40px; position: fixed; z-index:100;">
                    <div class="header">
            <el-select v-model="value" placeholder="请选择兴趣班">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.value"
                          :value="item.label">
                        </el-option>
                      </el-select><!--改成下拉框-->
            <el-button type="primary" @click="getData">查询</el-button>
        
        </div>

            </div>
  
        <div class="content1">
            <el-table
              :data="tableData"
              border
              style="width: 100%;margin-top:40px;">
              <el-table-column
                prop="id"
                align="center"
                label="序号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="studentId"
                align="center"

                label="学生id">
              </el-table-column>
              <el-table-column
                prop="iklassId"
                align="center"

                label="兴趣班级id"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                align="center"

                label="儿童姓名">
              </el-table-column>
              <el-table-column
                prop="remainCount"
                align="center"

                label="剩余总数">
              </el-table-column>
              <el-table-column
                prop="note"
                align="center"

                label="备注"
                width="180">
              </el-table-column>
              <el-table-column
                prop="remainCount"
                align="center"

                label="操作">
                  <template scope="scope">
                       
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                       
                    </template>
              </el-table-column>
            </el-table>
            <el-dialog
             
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
              <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">提示</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
              <span>是否确认删除？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteTRue">确 定</el-button>
              </span>
            </el-dialog>
        </div>
        

       


    </div>
</template>
<script>
    export default {
        data(){
            return {
                rowId:"",
                tableData:[],
                dialogVisible: false,
                iklassid:'',
                stuInfo:'',
                value:'',
                options:[],
            }
        },
        methods:{
            handleClose(done) {
                 this.$confirm('确认关闭？')
                  .then(_ => {
                    done();
                  })
                  .catch(_ => {});
                },
            handelAdd(){
                this.dialogVisible= true
            },
            getData(){
                // console.log('this.input');
               
                var klasid = this.value;
                //  console.log(klasid);
                // var classid=10;
                          this.$http({
                    method: 'get',
                    url: this.$getApi + 'management/ikm/findStudent?klassId='+klasid,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    if (!!body.length) {
                        this.tableData = body
                        this.count = body.length
                        // this.endAt = new Date().getTime();
                    } else {
                        alert('err:' + body)
                    }



                    console.log("===res getKlassData===",res);
                    console.log("===res getKlassData===",res.body);

                  
                        })
            },
            setData(){

                 var iKlassArray=this.$store.state.classArray;
                 var classArray= iKlassArray.iklassArray;
                 console.log('iKlassArray',classArray);
                    this.options=classArray;
                var iKlassId=this.$store.state.iklassId
                var iklassid=iKlassId.id

                console.log("iKlassId",iklassid)



                 var klassName = this.$store.state.cost
                        // this.tableData = localStorage.schools
                        // this.count = localStorage.schools.length;
                        console.log('+++++++    拿到的数据+++++++++',klassName);
                        let counst=klassName.cost;


                  var klassArray=[];
                          counst.forEach(function(item, index, array){
                               klassArray.push({name:item.name,id:item.id})    
                          })
                             //this.value = klassesArray[0].value
                             this.klassOptions = klassArray;
            },
           
             handleClose(tag) {

                  console.log(tag)
                this.klassOptions.splice(this.klassOptions.indexOf(tag), 1);
              },
              handleDelete(index,row){
                    
                    this.tableData.splice(index, 1);
                console.log('*-/-*/-*/-',row.id);
                this.rowId = row.id
                this.dialogVisible=true
              
              },
              deleteTRue(){
                   this.$http({
                    method: 'delete',
                    url:this.$getApi+'management/ikm/delStudent?ids=[' + this.rowId +']',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('---------兴趣班delete---------',res)
                    
                    const {
                        body
                    } = res
                      


                    console.log("===res students===",res.body);

                     this.$message({
                      message: '失败',
                      type: 'error'
                    });
                    if (!!body.length) {
                        this.tableData = body.content
                        this.count = body.length
                    } else {
                        // alert('err:' + body)
                    }
                    
                  

                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });
                this.dialogVisible=false
              }

           
        },
       
        activated(){
            this.setData()
        },
        // mounted(){
        //     this.getData();
        // }
    }
</script>
<style scoped>
    .inpt{
        width: 150px;
    }
    .header{
        margin-bottom: 25px;
        margin-left:-10px;
    }
    .content1{
        margin-bottom: 25px;
        padding-left: 0px;
        margin-top: 30px;
        padding-top: 13px;
    }
    .el-table th{
      padding: 0!important;
    }
</style>