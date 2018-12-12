<template>
  <div class="newPrepay">
     <!-- <span class="titl">新增预交费用</span> -->
       <div class="main">
     

       <el-form ref="form" :model="form" label-width="80px" style="width:400px;">
  <el-form-item label="儿童姓名">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  
  <el-form-item label="交费时间">
    
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    
  </el-form-item>
  
  <el-form-item label="预交费用">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
 <el-form-item label="报名班级">
    <el-input v-model="form.name"></el-input>
  </el-form-item>

     <el-form-item label="入园时间">
    
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
    
  </el-form-item>

  <el-form-item label="招生老师">
    <el-input v-model="form.name"></el-input>
  </el-form-item>

    <el-form-item label="备注">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>

</el-form>
    </div>
<el-button type="primary" class="query">添加</el-button>

  </div>
   
</template>
<script>
    export default {
        data(){
            return {
                    form: {
                      name: '',
                      region: '',
                      date1: '',
                      date2: '',
                      delivery: false,
                      type: [],
                      resource: '',
                      desc: ''
                    }
            }
        }
    }
</script>
<style>
    .main{
        width: 80%;
        margin: 0 auto;
        margin-top: 20px;
      
    }
    .newPrepay{
        width: 100%;
        height: 540px;
        /*background-color: blue;*/
         margin-top: 30px;
        /*margin-left: 200px;*/
        /*padding-top: 30px;*/
        /*border: 1px solid #87ace0;*/
    }
    .newPrepay .main .titl{
        color: #49a6e9 ;
        font-weight: 700;
        font-size: 26px;
        display: inline-block;
        width: 100%;
        margin-bottom: 30px;
        text-align: center;
    }
    .query{
        width: 324px;
        margin-left: 13%;
    }
   /* .titl{
      display: inline-block;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-color: #61bfff;
      font-size: 26px;
      color: #fff;
      font-weight: 700;
      text-align: center;
    }*/
   
</style>