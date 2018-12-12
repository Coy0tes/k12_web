<template>
   <el-tabs v-model="activeName" @tab-click="handleClick"  type="card">
    <el-tab-pane label="员工表" name="first" ><teachers></teachers></el-tab-pane>
<!--     <el-tab-pane label="教师表" name="second"><ledarTeacher></ledarTeacher></el-tab-pane>
    <el-tab-pane label="任职表" name="thrid"><serviceIn></serviceIn></el-tab-pane> -->
    <el-tab-pane label="教师薪资" name="forth" v-if='isShow' ><teacherSecurity></teacherSecurity></el-tab-pane>
    <el-tab-pane label="员工" name="fiveth" v-if='isShow' ><employe></employe></el-tab-pane>
  
   
  </el-tabs>
</template>
<script>
import teachers from './teachers.vue';
// import ledarTeacher from './ledarTeacher.vue';
// import serviceIn from './serviceIn.vue';
import teacherSecurity from './teacherSecurity.vue';
import employe from './employe.vue';

    export default {
        data(){
            return {
               activeName: 'first',
               isShow:false,
            }
        },
           methods: {
           handleClick(tab, event) {
              console.log(tab, event);
            },
            getData(){
              console.log(localStorage.actorType)
              if (localStorage.actorType=="TEACHER") {
                this.isShow=false
              }else{
                this.isShow=true
              }
            }
    },
    mounted(){
      this.getData();
    },
    components:{
      'teachers':teachers,
      // 'ledarTeacher':ledarTeacher,
      // 'serviceIn':serviceIn,
      'teacherSecurity':teacherSecurity,
      'employe':employe
      
    }
    }
</script>
<style scoped>
    .el-tabs--bottom:not(.el-tabs--border-card):not(.el-tabs--card) .el-tabs__item:nth-child(), .el-tabs--top:not(.el-tabs--border-card):not(.el-tabs--card) .el-tabs__item:nth-child(){
      font-weight: 700!important;
    }
    .el-tabs__item{
      font-weight: 700!important;
    }
</style>