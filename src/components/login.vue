<template>
  <div class="login_container" v-loading.fullscreen.lock="fullScreenLoading">
    <img src="../assets/beijing.png" height="100%" width="100%" alt="" class="bgc_img">
    <div class="login_content">
         
      <h3 class="title">博顿云祥系统登录</h3>
        <!-- <el-button type="primary" @click="testRouters">测试跳转</el-button> -->
        <el-form labelWidth="100px" class="phone" :model="ruleForm" ref="ruleForm">
          <el-form-item label="手机号"
           prop="mobile"
          :rules="[
          { validator: validateMobile, trigger: 'blur' },
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
            
          ]">
            <el-input v-model="ruleForm.mobile" type="input" placeholder="请输入手机号" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密  码" class="password_input" prop="password":rules="[
          { validator: validateMobile, trigger: 'blur' },
          { required: true, message: '密码不能为空', trigger: 'blur' },    
          ]">
            <el-input v-model="ruleForm.password" type="password"  placeholder="请输入密码" @keyup.native="showlog"
            ></el-input>
          </el-form-item>
          
          <el-form-item>

               <!-- <router-link :to="{ path: 'newSchool'}"  class="schoolzc">园所注册</router-link> -->
               <select style="float: right;
                  margin-top: 30px;
                  margin-left: 10px;" @change='addsth($event,item)' v-model="selected" placeholder="请选择">
                  <option value ="">请选择</option>
                  <option value ="group">集团注册</option>
                  <option value ="regiion">大区注册</option>
                  <option value="provinces">省级注册</option>
                  <option value="city">市级注册</option>
                  <option value="school">园所注册</option>
                </select>
               <!-- <a class="schoolzc"  @click="schoolReg"></a> -->
               <router-link :to="{ path: 'regist'}"  class="schoolzc">教师注册</router-link>
               <a class="remember"><input type="checkbox" class="checkbox">记住账号密码</a>
          </el-form-item>

         
            <el-button type="primary" @click="login" class="login_button">立 即 登 录</el-button>
            <!-- <el-button type="primary" @click="reg" class="login_button">教师注册</el-button> -->
            
          

        </el-form>
     <!-- <div class="newSchool">
       <newSchool></newSchool>
     </div> -->
    </div>
<el-dialog

  :visible.sync="ErrorDialog"
  width="30%"
  :before-close="handleClose">
<!--   <div class="top" style="width:100%;">
             <span class="top_text">提示</span>
             <img src="../assets/close3.png" height="48" width="48" class="add_close"@click="ErrorDialog = false">
          </div> -->
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">提示申请</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../assets/close3.png"  height="16" width="16" class="closeImg" @click="ErrorDialog = false">
             </div>
          </div>
          <!-- Newtitle  end-->
  <span style="display:inline-block;width:100%;text-align:center;">用户名或密码有误，请重新输入!</span>
  <span slot="footer" class="dialog-footer">
    
    <el-button type="primary" @click="ErrorDialog = false">确 定</el-button>
  </span>
</el-dialog>

<el-dialog :visible.sync="SchoolDialog" :before-close="handleClose(SchoolDialog)" class="dialogSzie">
           <!--       <div class="top">
             <span class="top_text">选择学校</span>
             <img src="../assets/close3.png" height="48" width="48" class="add_close"@click="SchoolDialog = false">
          </div> -->
           <div class="top">
             <span class="top_text">选择学校</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../assets/close3.png"  height="16" width="16" class="closeImg" @click="SchoolDialog = false">
             </div>
             
          </div>
                    <el-select v-model="value" placeholder="请选择学校" style="margin-left:30px;">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>                
                
            <span slot="footer" class="dialog-footer">
                <el-button @click="SchoolDialog=false" >关 闭</el-button>
                <el-button @click="GisAdd(0)" type="primary" >确 定</el-button>
            </span>

        </el-dialog>


  </div>
</template>
<script>
import newSchool from './newSchool.vue';

  export default {
    //    computed: {
    //        API() {
    //            return this.$store.state.tigerApi
    //        }
    //    },
    data() {
      return {
        selected: "",
        ruleForm:{
           mobile: '',
            password: '',
        },
       
        fullScreenLoading: false,
        options: [],
        SchoolDialog: false,
        value : '',
        ErrorDialog:false,
       
      }
    },
      computed: {
    reg () {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.regist
    }
  },
    methods:{
      showlog(ev){
          console.log(ev.keyCode)
                if (ev.keyCode==13) {
                    console.log('要执行的代码')
                   this.login()
                }
      },
      addsth(event,item){
        // console.log('11111',value)
        console.log(this.selected);
        var regdec=this.selected
        this.$store.commit('register',regdec);


        this.$router.push({path:'newSchool'});



      },
             submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
           resetForm(formName) {
        this.$refs[formName].resetFields();
      },

       testRouters(){
         this.$router.push({
              path: '/test'
            })
       },



      login() {
        this.$http.post(
           this.$getApi+'tokens',
          {
            "mobile": this.ruleForm.mobile,
            "password": this.ruleForm.password
          }
        ).then((res) => {
          
        console.log(res) 
          localStorage.userId=res.body.id;
          localStorage.actorType=res.body.actorType[0];
              var actorType=res.body.actorType[0]
                   if (actorType=='CITY'||actorType=='PROVINCE'||actorType=='REGION'||actorType=='GROUP') {
                    this.$http.post(
                    this.$getApi+'tokens/district',
                    {
                        "mobile": this.ruleForm.mobile,
                        "password": this.ruleForm.password
                    },
                    {
                      headers:{
                        'Content-Type': 'application/json',
                      }
                    }
                ).then((res) =>{                    
                      localStorage.token = res.body.token;
                      localStorage.code = res.body.code;
                })
                     this.$router.push({path:'/groupManager'});                     
                  }else if (actorType=='TEACHER'||actorType=='MANAGER') {



                    console.log('11111111111111')
             var gradeId=res.body.schools[0].grades;
           this.$store.commit('gradeId',{klassID:gradeId});
            localStorage.token = res.body.token;
               

              localStorage.loginStatus = 'login'; 
              if(res.body.schools.length >0){//选择学校

                this.SchoolDialog = true;
                var schoolArray=[];
                  res.body.schools.forEach(function(item, index, array){
                       schoolArray.push({value:item.id,label:item.name})    
                  })

// 選擇學校
                 this.value = schoolArray[0].value
                 this.options = schoolArray;
                 // localStorage.schoolsName = this.value;
                 localStorage.schoolsId=res.body.schools[0].id;
                 localStorage.actorType=res.body.actorType[0];
                
                 
                  localStorage.userName= res.body.username;
          
                  localStorage.formDate=res.body.schools[0].formDate
                  localStorage.toDate=res.body.schools[0].toDate
                // alert('用户名或密码有误，请重新输入!')
              }else{
                
                 this.SchoolDialog = false;                
                   this.$http.post(
                      this.$getApi+'/tokens/school/'+localStorage.schoolsId,//+localStorage.schoolsId
                     {
                      "schoolId": res.body.schools[0].id
                     },
                     {
                      headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token

                      }
                    }
                    ).then((res) => {       
                        console.log("=======login==res==body0000====",res.body);
                                            
                      
                      localStorage.token = res.body.token;
                      localStorage.actor = res.body.manager.actor;
                      localStorage.actorId = res.body.manager.actor.id;
                      localStorage.loginStatus = 'login';
                      localStorage.roles = JSON.stringify(res.body.manager.roles);
                        this.$router.push({path:'dataStatistics'})
                    })
              }
               
           

          

          }
          
          this.fullScreenLoading = false;
          localStorage.schools = JSON.stringify(res.body.schools);


      
        }).catch((res) => { 
          console.log('err',res)
            this.ErrorDialog=true;
         
        });
     

      },
       reg(){  
         // this.$router.push({
         //      path: 'regist'
         //    })
         return this.$route.params.regist
         console.log(this.$router)
      },
       schoolReg(){  
         this.$router.push({
              path: 'newSchool'
            })
      },
       handleClose(dialogName) {
                this[dialogName] = false
            },
      GisAdd(tag) { // 0 添加    1 取消
        console.log('this.value',this.value)
                this.SchoolDialog = false
                this.$http.post(
                     this.$getApi+'tokens/school/' + this.value,
                     {
                      "schoolId": this.value
                     },
                     {
                      headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token

                      }
                    }
                    ).then((res) => {
                      console.log("=======enter==res==body====",res.body);
                       // localStorage.selfId = res.body.teacher.actor.id;
                      localStorage.token = res.body.token;
                      localStorage.loginStatus = 'login';
                      // localStorage.avatar=res.body.teacher.actor.user.avatar


                      if (res.body.manager) {
                        localStorage.manager = res.body.manager;
                       localStorage.actor = res.body.manager.actor;
                      localStorage.actorId = res.body.manager.actor.id;
                    }else if (res.body.teacher) {
                      localStorage.manager = res.body.teacher;
                       localStorage.actor = res.body.teacher.actor;
                      localStorage.actorId = res.body.teacher.actor.id;
                    }
                      
                      console.log("=======enter==res======", JSON.stringify(localStorage.manager));
                      this.$router.push({path:'dataStatistics'})
                   
                    })
            }
    },
    mounted() {
      console.log(`NODE_ENV:${process.env.NODE_ENV}`) // process.env.NODE_ENV === 'build' ?  '生产环境' : '开发环境'
      // console.log(`API:${this.API}`)
      console.log(`$getApi:${this.$getApi}`)
    }
  }

</script>
<style>
.login_content{
  width: 400px;
  height: 360px;
  background-color: #fFF;
  float: right;
  margin-right: 20%;
  padding-top: 35px;
  border-radius: 20px;
}
  .login_container {
    width: 100%;
    height: 113%;
    padding-top: 200px;
    /*background-color: #C0CCDA;*/
    /*background-image: url(../assets/beijing.png);*/
    background-image: url(../assets/yuanquan.png);
   background-repeat:no-repeat;
   background-position: 35% 80px;

  }
  .phone{
    width: 350px;
  }

  .title {
    margin-left: 10px!important;
    text-align: center;
    color: #49a6e9 !important;
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 40px;

  }
  a{
    display: block;
    color: #fff;
    cursor: pointer;
  }

  .email_input {}

  .password_input {
    width: 350px;
  }

  .login_button {
    width: 85%!important;
    margin-left: 15%;
  }

  .reg_button {
    width: 40%;
  }

  /*.btnW > .el-form-item__content{
    display: flex;
  }*/
  .schoolzc{
        float: right;
        text-decoration: underline;
        margin-top:20px;
        color: #ccc;
        font-size: 12px;
        display: inline-block;
        margin-left: 15px;
  }
  .remember{
    display: inline-block;
  font-size: 12px;
  color: #ccc;
  text-decoration: none;
  float: left;
  margin-top:20px;
  margin-left: -50px;
  }
  .bgc_img{
      position:fixed; 
      top:0; 
      left:0; 
      bottom:0; 
      right:0; 
      z-index:-1; 
  }
  .checkbox{
    vertical-align:middle  !important;
  }
  .newSchool{

  }

</style>
