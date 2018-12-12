<template>
    <div>
        <div class="block" style="margin-left:5px;">
          <!-- <span class="demonstration">北京博顿云祥科技有限公司</span> -->
          <el-carousel  :style="imgHeight">
            <el-carousel-item v-for="item in imgURl"  >
              <img :src="item.urrl"  class="bannerImg" />

            </el-carousel-item>
          </el-carousel>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
              imgURl:[
              {urrl:require("../../assets/banner财务插图-01.jpg")},
              {urrl:require("../../assets/banner财务插图-02.jpg")},
              {urrl:require("../../assets/banner财务插图-03.jpg")}
              ],
              imgHeight:''
                
              
            }
            
        },methods:{
              a(){
                console.log('屏幕',window.innerWidth)
                if (window.innerWidth==1920) {
                  this.imgHeight="height:630px;"
                }else if (window.innerWidth==1366) {
                  this.imgHeight="height:443px;"
                }
              }
            },
            mounted(){
              this.a();
            }
    }
</script>
<style scoped>
    .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .demonstration{
    font-weight: 700;
    font-size: 25px;
    text-align: center;
    display: inline-block;
    width: 100%;
  }
  .block{
    width: 100%;
    margin-top: 20px;
  }

  img {
    width: 100%;
    height: 100%;
}
</style>