<template>
    <div style="background-color:#fff;">
      <div class="title">
        <el-steps :active="active" finish-status="success" process-status="finish " align-center simple >
        <el-step title="填写商家信息" v-show="false"></el-step>
        <el-step title="填写银行账户" v-show="false"></el-step>
        <el-step title="选择签约产品"></el-step>
        <el-step title="填写经营信息"></el-step>
        <el-step title="确认签约信息"></el-step>
      </el-steps>
      
      </div>

      <div class="">


          <!-- 选择签约 -->
          <div class="" v-show="contentThrid">
            <div style="margin-left:150px;width:800px;">
              <p style="font-size:18px;">我的应用</p>
              

                 <div style="width:100%;border:1px solid #ccc;margin-top:30px;padding-top:15px;padding-left:20px;padding-bottom:20px;"><!-- 高要去掉 -->
                  
                    
                     
                          <span class="el-dropdown-link" style="padding-bottom:20px;">
                            青幼通<i class="el-icon-arrow-down el-icon--right" @click="QYTshow"></i>
                          </span>
                          <div v-show="QYTshow11" style="margin-top:10px;">

                           
                             <el-checkbox v-model="checked">快捷手机wap支付</el-checkbox> <span style="display:inline-block;float:right;font-size:14px; margin-right:50px;">未签约</span>
                            <br>
                            <el-checkbox v-model="checked">中小学教育缴费</el-checkbox><span style="display:inline-block;float:right;font-size:14px; margin-right:50px;">未签约</span>
                            <br>
                            <el-checkbox v-model="checked">快捷手机安全支付</el-checkbox><span style="display:inline-block;float:right;font-size:14px; margin-right:50px;">未签约</span>
                          </div>
                           
                    
                  
                        
                </div>

            </div>
          </div>
          <div class="" v-show="contentFourth" style="padding-left:150px;">
            <div style="border-left:5px solid #409EFF;margin-bottom:25px;" ><span style="font-size:16px;font-weight:700;padding-left:10px;">经营信息 </span> <span style="font-size:14px;color:#ccc;">根据监管要求，请如实填写企业的经营信息。</span></div>
                  <el-form style="margin-left:50px;" label-width="150px">
                      <el-form-item label="经营类目:" style="width:600px;" >
                            <el-input></el-input>
                                         
                      </el-form-item>

                      <el-form-item label="上传经营资质:" style="width:600px;" >
                        <span style="font-size:12px;color:#e6a23c;">请提供《民办学校办学许可证》或《事业单位法人证书》</span><span style="font-size:14px; color:#409eff;cursor: pointer" @click="dialogVisible=true">了解资质要求</span>
                             <el-upload
                                                            action="https://jsonplaceholder.typicode.com/posts/"
                                                            list-type="picture-card"
                                                            style="display:inline"
                                                            :on-preview="handlePictureCardPreview"
                                                            :on-remove="handleRemove">
                                                            <i class="el-icon-plus">
                                                              
                                                            </i>
                                                                
                                                          </el-upload>
                                         
                      </el-form-item>

                  </el-form>

            <div style="border-left:5px solid #409EFF;margin-bottom:25px;" ><span style="font-size:16px;font-weight:700;padding-left:10px;">联系人信息 </span> <span style="font-size:14px;color:#e6a23c;">联系人信息将用于签约后的重要通知，</span><span style="font-size:14px;color:#ccc;">如确认协议、到期提醒等。</span></div>
                           <el-form style="margin-left:50px;" label-width="150px">
                      <el-form-item label="姓名:" style="width:600px;" >
                            <el-input></el-input>
                                         
                      </el-form-item>

                      <el-form-item label="电子邮箱:" style="width:600px;" >
                   
                                     <el-input></el-input>    
                      </el-form-item>
                         <el-form-item label="手机号码:" style="width:600px;" >
                            <el-input></el-input>
                                         
                      </el-form-item>

                  </el-form>

                      <el-dialog
                        
                        :visible.sync="dialogVisible"
                        width="30%"
                        :before-close="handleClose">
                            <div class="top" style="width:100%;">
             <span class="top_text">资质要求</span>
             <img src="../../assets/close3.png" height="48" width="48" class="add_close"@click="dialogVisible = false">
          </div>
                        <span><img src="../../assets/zizhiyaoqiu.jpg" height="" width="100%" alt=""></span>
                        <span slot="footer" class="dialog-footer">
                          <el-button @click="dialogVisible = false">取 消</el-button>
                          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                      </el-dialog>

          </div>
          <div class="" v-show="contentFifth">
            <div style="margin-left:150px;">
                <span style="padding-bottom:30px">确认信息填写无误后点击下方签约按钮，申请签约。</span>
                <br>
                <el-button style="margin-top:30px">申请签约</el-button>

            </div>
            
          </div>

 

        
      </div>







      
        <el-button style="margin-top: 12px;float:right;margin-right:10%;margin-bottom:50px;" @click="next"type="primary">下一步</el-button>
        <el-button style="margin-top: 12px;float:right;margin-right:10%;margin-bottom:50px;" @click="nav"type="primary" v-show="navShow" >上一步</el-button>
  
    </div>
</template>

<script>

    export default {
        data(){
            return {
              dialogVisible:false,
              navShow:false,
               active: 2,
           
               contentThrid:true,
               contentFourth:false,
               contentFifth:false,
               QYTshow11:false,

               qiye:false,
               shehui:false,
               dangjiguan:false,
               shiye:false,
               minban:false,

               nomerY:true,
               nomerN:false,
               value1:'', 
               value2:'', 
                checked: false,
                checked1: false,
                radio:'1',
                radio1:'1',
                radio2:'1',
                activeName:'Third',
                selectedOptions:[],
                unitId:'',
          


              }
        },



         watch:{
   
        active(){
          console.log(this.navShow)
            this.showOrNotshow();
             if (this.active>0) {
            this.navShow=true;
          }else{
              this.navShow=false;
          }
        },
        radio(){
            this.nomerYorN();
        },
       

        },
        methods:{
          getData(){
            let cityData=city.CityInfo
            this.cityNumData=cityData
            console.log(cityData)


             var unitId = this.$store.state.unitid
             this.unitId=unitId
             if (unitId.id==1) {
                  this.qiye=true
                  this.shehui=false
                  this.dangjiguan=false
                  this.shiye=false
                  this.minban=false
                  
             }else if (unitId.id==2) {
                  this.qiye=false
                  this.shehui=false
                  this.dangjiguan=false
                  this.shiye=true
                  this.minban=false

             }else if (unitId.id==3) {
                  this.qiye=false
                  this.shehui=false
                  this.dangjiguan=false
                  this.shiye=false
                  this.minban=true
             }else if (unitId.id==5) {
                  this.qiye=false
                  this.shehui=true
                  this.dangjiguan=false
                  this.shiye=false
                  this.minban=false
             }else if (unitId.id==6) {
                  this.qiye=false
                  this.shehui=false
                  this.dangjiguan=true
                  this.shiye=false
                  this.minban=false
             }










             console.log('unitIdunitId',unitId.id)
          },
              next() {
                if (this.active++ > 4) this.active = 2;

              console.log(this.active)
              
          },
          QYTshow(){
              this.QYTshow11=true
          },
          nav(){
             
               if (this.active-- < 2) this.active = 4;
          },
        nomerYorN(){
            if (this.radio==1) {
                this.nomerY=true
                this.nomerN=false
            }else if (this.radio==2) {
                this.nomerY=false
                this.nomerN=true
            }
        },
      showOrNotshow(){
        if (this.active==0) {
               this.contentFirst=true
               this.contentSecond=false
               this.contentThrid=false
               this.contentFourth=false
               this.contentFifth=false

        }else if (this.active==1) {
               this.contentFirst=false
               this.contentSecond=true
               this.contentThrid=false
               this.contentFourth=false
               this.contentFifth=false

        }else if (this.active==2) {
               this.contentFirst=false
               this.contentSecond=false
               this.contentThrid=true
               this.contentFourth=false
               this.contentFifth=false

        }else if (this.active==3) {
               this.contentFirst=false
               this.contentSecond=false
               this.contentThrid=false
               this.contentFourth=true
               this.contentFifth=false

        }else if (this.active==4) {
               this.contentFirst=false
               this.contentSecond=false
               this.contentThrid=false
               this.contentFourth=false
               this.contentFifth=true
        }
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
    
</style>