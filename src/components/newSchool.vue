<template>
  <div class="reg_container" v-loading.fullscreen.lock="fullScreenLoading">
    <img src="../assets/beijing.png" height="100%" width="100%" alt="" class="bgc_img">


<!-- 园所创建 -->
    <div class="contentd" v-show="createdSchool">
      <img src="../assets/fanhui.png" height="20" width="10" @click="goLogin"  id="qwer"></img>
    
      <h3 class="title">园所创建</h3>

     
        <el-form labelWidth="100px">
          
          <el-form-item class="test">
            <span>名&nbsp;称 </span>
            <el-input v-model="name" type="input" placeholder="请输入园所名称" class="widt"></el-input>
          </el-form-item>
<!-- //自己写三级联动 -->
          <div class="linkage">
            
           <span>地&nbsp;址</span> <v-distpicker v-model="description"></v-distpicker>
          </div>

           <el-form-item class="test">
            <span>园&nbsp;长 </span>
            <el-input v-model="username" type="input" placeholder="请输入姓名" class="widt"></el-input>
          </el-form-item>

          <el-form-item class="test">
            <span>手&nbsp;机 </span>
           <el-input v-model="mobile" type="input" placeholder="请输入手机号" class="widt"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="reg(1)" class="login_button">创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
 

    </div>


    <div class="contentd" v-show="createdOther" style="padding-top:100px;padding-left:60px;">
      <div style="width:100%;margin-left:150px;padding-bottom:10px;font-size:20px;"> 创建{{regDec}}</div>
      名字：<el-input style="width:300px;" v-model="creatName"></el-input>
      <el-button type="primary" @click="postData" class="login_button" style="margin-top:30px">创建</el-button>

    </div>

    <!-- 大区 集团 省 市创建 -->
      <el-dialog
    
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose">
           <div class="top">
                                       <span class="top_text">关联手机号</span>
                                       <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                                         <img src="../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
                                       </div>
                                       
                                    </div>
        <div style="margin-left:150px">

          绑定手机 : <el-input v-model="input" placeholder="请输入要绑定的手机号" style="width:200px"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    
  </div>
</template>
<script>
import VDistpicker from 'v-distpicker';
import Vuerify from 'vuerify';


  export default {
    //    computed: {
    //        API() {
    //            return this.$store.state.tigerApi
    //        }
       // },
    template: `
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="username">
      <input type="mobile" v-model="mobile">
     
      <input type="name" v-model="name">
      <input type="submit">
      <ul><li v-for="err in errors" v-text="err"></li></ul>
    </form>
  `,



     components: { VDistpicker },


    data() {
      return {
        name: '',
        username: '',
        attDeviceIds:[''],
        description:'',
        mobile:'',
        fullScreenLoading: false,
        createdSchool:false,
        createdOther:false,
        regDec:'',
        creatName:'',
        dialogVisible:false,
        code:'',
      }
    },
  //    compouted: {
  //   errors () {
  //     return this.$vuerify.$errors // 错误信息会在 $vuerify.$errors 内体现
  //   }
  // },

  // vuerify: {
  //   username: {
  //     test: /\w{4,}/,  // 自定义规则，可以是函数，正则或者全局注册的规则（填字符串）
  //     message: '至少 4 位字符'
  //   },
  //   password: 'required', // 使用全局注册的规则
  //   email: [ // 支持传入数组
  //     'required',
  //     'email',
  //     { test: /@gmail/, message: '只能是谷歌邮箱' }
  //   ],
  //   phone: 'phone' // 使用全局自定义规则
  // },

    methods: {
     
      reg(tag) {
        this.$http.post(
          this.$getApi + 'schools',
          
          {
            "attDeviceIds":this.attDeviceIds,
            "description":this.description,
            "username": this.username,
            "name": this.name,
            "mobile": this.mobile
            
          },
          {
          headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
        ).then((res) => { // promise对象
          console.log("===regist==== res=====",res);
          if(res.ok){
            alert("点击确定去注册!")
            this.$router.push({path:'regist'})
          }else{
            this.$router.push({path:'newschool'});
            console.log('---------',err)
          }
          
          //this.fullScreenLoading = false;
          // if (res.ok) {
          //   localStorage.loginStatus = 'login';
          //   //window.location.href = '/login'
          //   // this.$router.push({
          //   //   name:'name'
          //   // })
          // } else {
          //   alert('用户名或密码有误，请重新输入！')
          // }
        })
      },
      addCity(){
               this.$http.post(
          this.$getApi + 'district/management/web/addCity',
          
          {
           
            "name": this.creatName,
            "provinceId": 0

            
          },
          {
          headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
        ).then((res) => { // promise对象
          console.log("===regist==== res=====",res);
      
          
        
        })
      },
      addGroups(){
        console.log(this.creatName)
                  this.$http.post(
          this.$getApi + 'district/management/web/addGroups?groupsName='+this.creatName,
          
          {
          headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
        ).then((res) => { // promise对象
          console.log("===regist==== res=====",res);
          this.code=res.body.code
          this.dialogVisible=true
          
        code
        })
      },
      addProvinces(){
               this.$http.post(
          this.$getApi + 'district/management/web/addProvinces',
          
          {
           
            "name": this.creatName,
            "regionId": 0

            
          },
          {
          headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
        ).then((res) => { // promise对象
          console.log("===regist==== res=====",res);
           this.code=res.body.code
          this.dialogVisible=true
          
        
        })
      },
      // 大区
      addRegions(){
           this.$http.post(
          this.$getApi + 'district/management/web/addRegions',
          
          {
           
            "name": this.creatName,
            "groupId": 0

            
          },
          {
          headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
        ).then((res) => { // promise对象
          console.log("===regist==== res=====",res);
           this.code=res.body.code
          this.dialogVisible=true
          
        
        })
      },
      postData(){
            if (this.regDec=='group') {
              this.addGroups();
            }else if(this.regDec=='regiion'){
              this.addRegions();
            }else if (this.regDec=='provinces') {
              this.addProvinces();
            }else if (this.regDec=='city') {
              this.addCity();
            }
      },
       goLogin(){
        this.$router.push({
              path: 'login'
            })
    }
    },
    mounted() {

      var regDec = this.$store.state.regDec
      this.regDec=regDec
      console.log(regDec)
      if (regDec=="school") {
        this.createdSchool=true
        this.createdOther=false
      }else{
        this.createdSchool=false
        this.createdOther=true
      }
      console.log(`NODE_ENV:${process.env.NODE_ENV}`) // process.env.NODE_ENV === 'build' ?  '生产环境' : '开发环境'
      //        console.log(`API:${this.API}`)
      console.log(`$getApi:${this.$getApi}`)
    }
  }

</script>
<style scoped>
.test{
  margin-left: -41px;
}
#qwer{
    /*width: 100px;*/
    color: #43acf0;
    margin-top: 15px;
    margin-left: 20px;
    cursor: pointer;
   }
  .reg_container {
    width: 100%;
    height: 100%;
    padding-top: 175px;
    /*background-color: #C0CCDA*/
     background-image: url(../assets/yuanquan.png);
   background-repeat:no-repeat;
   background-position: 35% 80px;
  }

  .title {
    margin-left: -38px;
    text-align: center;
    color: #475669;
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 40px;
  }

  .email_input {}

  .password_input {}

  .login_button {
    width: 360px !important;
  margin-left: 12px;
  color: #fff;

  }
  .goback{
    width: 200px;
    position: absolute;
    top: 20%;
    left: 30%;
  }
  .address{
    width: 400px;
    height: 36px;
    /*margin-bottom: 30px;*/
    color: #1f2d3d;
    font-size: inherit;
    display: inline-block;
    
  }
  .linkage{
    /*margin-left: 12%;*/
    font-size: 14px;
    color: #5e658f;
    vertical-align: middle;
    width: 550px;
    padding-left: 59px;
     margin-bottom: 30px;

  }
  .linkage span{
    padding-right: 6px;
  }
  .bgc_img{
            position:fixed; 
            top:0; 
            left:0; 
            bottom:0; 
            right:0; 
            z-index:-1; 
        }
   .contentd{
        width: 530px;
        height: 426px;
        float: right;
        background-color: #fff;
        margin-right: 11%;
        /*text-align: center;*/
        border-radius: 20px;
        color: #4c557e;
        /*text-align: center;*/
   }  
   .widt{
    margin-left: 5px;
    width: 360px;
    color: #5e658f;
   }  
   .el-form-item__label{
    color: #5e658f !important;
   }

</style>
