<template>
  <div class="login_container"  v-loading.fullscreen.lock="fullScreenLoading">
    <img src="../assets/beijing.png" height="100%" width="100%" alt="" class="bgc_img">
    <div class="content">
    
         <img src="../assets/fanhui.png" height="20" width="10" @click="goLogin"  id="qwer"></img>
         <span class="zhuce">教师注册</span>
         <div>
             
             姓&nbsp;&nbsp;名   <el-input v-model="username" placeholder="请填写您的姓名" class="username" 
            type="input" id="uname" ></el-input>
           
         </div>

         <div>
             
             生&nbsp;&nbsp;日   <el-date-picker
                                  v-model="birthday "
                                  
                                  placeholder="请填写您的生日">
                                </el-date-picker>
         </div>
            
        <div class="gender">
            性别:
            <template>
              <el-radio v-model="gender" label="MALE">男士</el-radio>
              <el-radio v-model="gender" label="FEMALE">女士</el-radio>
            </template>
        </div>

         <div>
             
             手 机 号   <el-input v-model="mobile" placeholder="请填写您的手机号码" type="input" class="username" id="d_mobl" ></el-input>
             <!-- <div class="d_mobl"> 手机号不能为空 </div> -->
         </div>

         <div>
             
             邀 请 码   <el-input v-model="secretCode" placeholder="系统会推送到您的短信中" type="input" class="username"></el-input>
         </div>
          

          <div>
             
             密&nbsp;&nbsp;码   <el-input v-model="password" type="input" placeholder="请填写您的密码" class="username"></el-input>
         </div>

         <div>
             
            确认密码   <el-input prop="password" type="input" placeholder="请再输入一次密码" class="username"></el-input>
         </div>

         <div>
              <el-button type="primary" round class="logbtn" @click="reg(1)">注册</el-button>
              <!-- <el-button type="primary" round class="logbtn" @click="getPerson">注册111</el-button> -->

         </div>
    </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
               
                // name: '',
                // password: '',
                // mobile:'',
                // secretCode:'',

                avatar: "",
                username: '',
                birthday:0,
                secretCode:0,
                gender:'',
                mobile:'',
                password:'',
                portrait:'',

                
                // "birthday": 0,
                // "gender": "MALE",
                // "mobile": "string",
                // "password": "string",
                // "portrait": "string",
                // "secretCode": 0,
                // "username": "string"
                
                  // fullScreenLoading: false

            }
        },

        methods:{
          getPerson(){
                  this.$http.post(
          this.$getApi + 'management/invitations/teacher',
          
         {
            "joinTime": 1528447575120,
            "mobile": "13120212135",
            "username": "111"
          },
          {
          headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }).then((res) => { // promise对象
                      console.log("===regist==== res=====",res);

          
        
      
        })
          },

          reg(tag) {
            var timestamp3 = new Date(this.birthday).getTime();
        this.$http.post(
          this.$getApi + 'users',
          // console.log("...............11111111111111111",this.username),
          // console.log("...............11111111111111111",this.secretCode),
          // console.log("...............11111111111111111",this.birthday),
          // console.log("...............11111111111111111",this.mobile),
          // console.log("...............11111111111111111",this.password),
          // console.log("...............11111111111111111",this.gender),
          
          {
          
            "username":this.username,
            "secretCode":this.secretCode,
            "birthday": timestamp3,
            "gender": "MALE",
            "mobile": this.mobile,
            "password":this.password,
            "avatar":'aaaa',
            "portrait":'qqq'



    
           

 

        
           
            
          },
          {
          headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }).then((res) => { // promise对象
                      console.log("===regist==== res=====",res);

          
          if(res.ok){
            alert("注册成功，快去登陆吧")
            this.$router.push({path:'login'})
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
      goLogin(){
        this.$router.push({
              path: 'login'
            })
    }

        },
        
    //        mounted() {
    //   console.log(`NODE_ENV:${process.env.NODE_ENV}`) // process.env.NODE_ENV === 'build' ?  '生产环境' : '开发环境'
    //   //        console.log(`API:${this.API}`)
    //   console.log(`$getApi:${this.$getApi}`);
    //   // this.render();
    // }
    }
</script>
<style scoped>
        .username{
            width: 340px;
        }
        .el-input{
            width: 260px;
            margin-bottom: 30px;

        }
        .gender{
             margin-bottom: 30px;
        }
        .logbtn{
            width: 334px;
        }
        .content{
            width: 420px;
            background-color: #fff;
            margin:0 auto;
            height: 600px;
            padding-top: 20px;
            text-align: center;
           position: relative;
           left: 310px;
           top: -55px;
           color: #4c557e;
           border-radius: 20px;
        }
    
        .login_container{
          width: 100%;
          height: 100%;
          padding-top: 220px;
          /*background-color: #C0CCDA;*/
        }
        .uname{
          width: 200px;
          height: 30px;
          color: red;
          position: relative;
         /* background-color: red;*/
          right: -460px;
          top: -63px;
          border: 1px solid red;
          text-align: center;
          line-height: 30px;
          font-weight: 700;
          display: none;
          border-radius: 5px;

        }
        .d_mobl{
          width: 200px;
          height: 30px;
          /*background-color: red;*/
          position: relative;
          right: -460px;
          top: -63px;
           border: 1px solid red;
          text-align: center;
          line-height: 30px;
          font-weight: 700;
          display: none;
          color: red;
           border-radius: 5px;
        }
        


      #qwer{
        position: absolute;
        top: 20px;
        color: #43acf0;
        left: 20px;
        display: inline-block;
        cursor: pointer;

      }
      .zhuce{
        font-size: 26px;
        font-weight: 700;
        color: #49a6e9 ;
        margin-bottom: 30px;
        display: inline-block;
      }
      .gender{
        font-size: 14px;
        color: #707070;
      }
      .el-radio{
        font-size: 12px !important;
          color: #707070;
      }
      .el-radio__label{
        font-size: 12px !important;
          color: #707070;
      }







</style>