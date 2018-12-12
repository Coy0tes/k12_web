<template>
    <div class="content">
        <el-form ref="form" :model="form" label-width="80px">
              
        <!-- 上传图片框 -->

            <el-form-item>
               <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
        <!-- 选择学生框 -->
              <el-form-item>
               <el-select v-model="value" placeholder="请选择学生" @visible-change="changeId">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
               
                
              </el-form-item>

        <!-- 学生tag标签 -->
              <el-form-item>
                  <el-tag
                  :key="tag"
                  v-for="tag in klassOptions"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag.name}}
                </el-tag>
                

              </el-form-item>





        <!-- 输入学生体温框 -->
              <el-form-item>
                <el-input v-model="temperature" placeholder="请输入学生体温" class="stuTemperature"></el-input>
              </el-form-item>












              <el-form-item>
                <el-button type="primary" @click="putData" class="singin">立即签到</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
    </div>
</template>
<script>
    export default {
        data(){
            return {
             options:[{
                    value:1,
                    label:"选择学生"
                }],
             value:'',
             imageUrl: '',
             klassOptions:[],
             studentID:0,
             temperature:0,
                }
            },
                methods: {
                  handleAvatarSuccess(res, file) {
                    this.imageUrl = URL.createObjectURL(file.raw);
                  },
                  beforeAvatarUpload(file) {
                    const isJPG = file.type === 'image/jpeg';
                    const isLt2M = file.size / 1024 / 1024 < 2;

                    if (!isJPG) {
                      this.$message.error('上传头像图片只能是 JPG 格式!');
                    }
                    if (!isLt2M) {
                      this.$message.error('上传头像图片大小不能超过 2MB!');
                    }
                    return isJPG && isLt2M;
                  },
                  getData(){

                    var klassName = this.$store.state.cost;
                     console.log('+++++++    拿到的数据+++++++++',klassName);
                    let counst=klassName.cost;
                    var klassArray=[];
                          counst.forEach(function(item, index, array){
                               klassArray.push({name:item.name,id:item.id})    
                          })
                            
                     this.klassOptions = klassArray;
                     console.log('+++++++ 操作的数据+++++++++',klassArray);
                     this.studentID=counst[0].id



                  },
                  putData(){

                      this.$http.post(
         
                       this.$getApi + 'api/attendances',
             
                      {
                          "portrait": "string",
                          "studentId": this.studentID,
                          "temperature": this.temperature*1
                        
                      },
                                                           
                      {
                      headers:{
                                  
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer '+ localStorage.token

                                  }

                                }
                    ).then((res) => { // promise对象
                      console.log("===regist==== res=====",res);
                      if(res.ok){
                       console.log('------------',res)
                      }else{
                        this.$router.push({path:'newschool'});
                        console.log('---------',err)
                      }
                      
                
                    })



                  },
                   changeId(){
                          console.log('执行了');
                          console.log('执行了',this.expenseId);
                        
                          
                            this.$router.push({path:'students'});
                            this.getData();

                     },
                      handleClose(tag) {
                          console.log(tag)
                        this.klassOptions.splice(this.klassOptions.indexOf(tag), 1);
                      },
                },
                mounted(){
                    this.getData();
                },
                activated(){
                     this.getData()
                }
        }
    
</script>
<style>
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .content{
    margin-left: 400px;
  }
  .stuTemperature{
    width: 217px;
  }
  .singin ,.avatar-uploader{
    margin-left: 20px;
  }
 
</style>