<template>
    <div style="padding:10px">
        <!-- 监控设备列表 -->
        <div class="line1" style=""> 
           <span style="margin-left:15px;">班级</span> 
                    <el-select v-model="value2" placeholder="请选择班级" @change="chanalue">
                      <el-option
                        v-for="item in klassesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select> 
                  <el-button type='primary' @click="getNew">查询</el-button>
                  <el-button type='primary' style='float:right;' @click="dialogVisible = true">添加设备</el-button>
            
        </div>
        <el-table
        :data="tableData"
        border
        style="width: 100%;margin-top:10px">
        <el-table-column prop="image" label="图片" width="120px" >
                 <!-- 图片的显示 -->
                 <template   slot-scope="scope">            
                    <img :src="scope.row.deviceCover"  width="70" height="50" style="vertical-align: middle;" />
                 </template>         
      </el-table-column>

       <el-table-column
          prop="deviceId"
          label="设备Id"
          >
        </el-table-column>
        <el-table-column
          prop="klassName"
          label="班级"
          >
        </el-table-column>

        <el-table-column
          prop="deviceName"
          label="设备名称"
          >
        </el-table-column>
       
        <el-table-column
          prop="verifyCode"
          label="验证码">
        </el-table-column>

         <el-table-column prop="image" label="操作" width="180px" >
                 <!-- 图片的显示 -->
                 <template   slot-scope="scope">            
                    <!-- <el-button>更改</el-button> -->
                    <el-button type="danger" @click='deleteDevice(scope.row)'>删除</el-button>
                 </template>         
      </el-table-column>
      </el-table>


              <el-dialog
         
              :visible.sync="dialogVisible"
              width="600px"
              :before-close="handleClose">
               <div class="top">
                     <span class="top_text">授权</span>
                     <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                       <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
                     </div>
                    </div>
                    <!-- https://i.ys7.com/image/IPC/1.jpeg -->
              <div>
                  
                    <el-form style='padding-left: 100px;'>
                          <el-form-item label="设备名称" label-width="120px">
                            <el-input style='width:200px' v-model='deviceName'></el-input>
                          </el-form-item>
                          <el-form-item label="设备id" label-width="120px">
                            <el-input style='width:200px' v-model='deviceId'></el-input>
                          </el-form-item>

                          <el-form-item label="验证码" label-width="120px">
                           <el-input style='width:200px' v-model='verifyCode'></el-input>
                          </el-form-item>
                          <el-form-item label="选择班级" label-width="120px">
                                <el-select v-model="value3" placeholder="请选择班级" @change="chanalue"  style='width:200px'>
                                      <el-option
                                        v-for="item in klassesOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                      </el-option>
                                  </el-select> 
                          </el-form-item>
                        </el-form>

              </div>
              <span slot="footer" class="dialog-footer">
                
                <el-button type="primary" @click="postDevice" style='margin-right:210px;width:150px'>确 定</el-button>
              </span>
            </el-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                tableData:[],
                klassesOptions:[],
                value2:'',
                dialogVisible: false,
                value3:'',
                  
                  deviceId: "",
                  deviceName: "",
                  
                  verifyCode: ""
            }
        },
        methods:{
            deleteDevice(row){
                console.log(row)
                  this.$http({
                    method: 'delete',
                    url:this.$getApi+'hkdevice/delete/' + row.hkdevId ,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    console.log('======res=====',res);
                  console.log('---------兴趣班delete---------',res)
                     this.$message({
                      message: '成功',
                      type: 'success'
                    });
            
                      
                     
                      this.tableData.splice(index, 1)
                 


               

                  

                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });
            },
            getNew(){
                    this.$http({
                    method: 'get',
                    url:  this.$getApi+'hkdevice/findByKlassId?klassId='+this.value2+'&page=1&size=10',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res);
                    console.log("===res getKlassData===",res.body.content);
                    this.tableData=res.body.content

                
                        })
            },


            postDevice(){
                       this.$http.post(
                    this.$getApi +'hkdevice/create',
                    {
                      "deviceCover": "https://i.ys7.com/image/IPC/1.jpeg",
                      "deviceId": this.deviceId,
                      "deviceName": this.deviceName,
                      "klassId": this.value3,
                      "verifyCode": this.verifyCode
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
                    console.log("===add Student body=000000====",res.body);
                     this.$message({
                      message: '成功',
                      type: 'success'
                    });
                    this.getNew();
                    console.log('birthday');
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    });
                });

                this.dialogVisible=false

            },



            getData(){
                // hkdevice/findByKlassId?klassId=8&page=1&size=1
                
                 this.$http({
                    method: 'get',
                    url:  this.$getApi+'hkdevice/findByKlassId?klassId=104&page=1&size=10',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res);
                    console.log("===res getKlassData===",res.body.content);
                    this.tableData=res.body.content

                
                        })



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


            }
        },
        mounted(){
            this.getData();
        }
    }
</script>
<style>
    
</style>