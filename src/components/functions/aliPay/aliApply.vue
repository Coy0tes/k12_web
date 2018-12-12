<template>
    <div> 
     
        <el-form  label-width="100px" style="margin-top:30px; padding-top:7%;padding-left:20%;":model="ruleForm" ref="ruleForm" >
          <el-form-item label="" style="width:600px;" >
                  <el-radio v-model="radio" label="1">商家有支付宝账号</el-radio>
                  <el-radio v-model="radio" label="2">商家没有支付宝账号</el-radio>
          </el-form-item>
           <el-form-item label="单位类型：" style="width:600px;" v-show="isShow">
             <el-select v-model="value" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
                
              </el-select>
              <p style="color:rgb(206, 212, 230);">根据商家营业执照选择正确类型</p>
          </el-form-item>



          <el-form-item label="账户名："style="width:600px;"prop="userName" :rules="[
       { validator: validateMobile, trigger: 'blur' },
        { required: true, message: '账户不能为空', trigger: 'blur' },
        { pattern: /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/, message: '请输入正确的支付宝账户' }
        ]">
            <el-input v-model="ruleForm.userName" ></el-input>
            <p style="color:rgb(206, 212, 230);">很重要！签约成功将作为商家账号</p>
          </el-form-item>

    
          


          <el-form-item label=""style="width:600px;">
                  <!-- <el-button type="primary" @click="submitForm(ruleForm)">测试</el-button> -->
                  <el-button type="primary" @click="goTo('ruleForm')">下一步</el-button>
          </el-form-item>
              
        </el-form>



 




    </div>
</template>
<script>
    export default {
        data(){
            return {
               ruleForm:{
                  userName:'',
               },

                  isShow:false,
                  radio:'1',
                  mobile:0,
                  options:[{
                      value: 1,
                      label: '企业'
                  },{
                      value: 2,
                      label: '事业单位'
                  },{
                      value: 3,
                      label: '民办非企业单位'
                  },{
                      value: 5,
                      label: '社会团体'
                  },{
                      value: 6,
                      label: '党政及国家机关'
                  }],
                  value:1,
                  userName:''
            }
        },
    watch:{
   
        radio(){
            this.init();
        }
    },
        methods:{
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
              init(){
                if (this.radio==1) {
                  this.isShow=false;
                }else if (this.radio==2) {
                  this.isShow=true;
                }

              },
              goTo(formName){
                // console.log('1111111',this.$refs)
                 this.$refs[formName].validate((valid) => {
                if (valid) {
                  // alert('submit!');
                     if (this.ruleForm.userName!=''&&this.radio==1) {
                  console.log("123123123123")
                     this.$router.push({
                  path: '../alyPay_contract'
                })
                }else if (this.ruleForm.userName.userName!=''&&this.radio==2) {
                    var unitId=this.value
                    this.$store.commit('unit',{id:unitId});


                       this.$router.push({
                          path: '../testone',
                          
                        })

                }else{

                  alert('请填写账户名')
                }
                } else {
                  console.log('数据错误!!');
                  alert('请检查账户名是否正确!!')
                  return ;
                }
              });


             
                
              }
       
        },

    }
</script>
<style>
    
</style>