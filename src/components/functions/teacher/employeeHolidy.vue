<template>
    <div style="padding-top:10px; padding-right:20px;">
              <el-table :data="tableData" stripe style="width: 100%; margin:10px;" ref="multipleTable" border >
                
                <el-table-column prop="userName" align="center" label="教师名">
                </el-table-column> 
                <el-table-column prop="annual" align="center" label="年假时间">
                </el-table-column>
                 <el-table-column prop="sick" align="center" label="病假时间">
                </el-table-column>
                <el-table-column prop="barth" align="center" label="产假时间">
                </el-table-column>
                <el-table-column prop="barthWith" align="center" label="陪产时间">
                </el-table-column> 
                <el-table-column prop="funeral" align="center" label="丧假时间">
                </el-table-column> 
                <el-table-column prop="marry" align="center" label="婚假时间">
                 </el-table-column>
            </el-table>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                tableData:[],
            }
        },
        methods:{
            getData(){
                 this.$http({
                    method: 'get',
                    url:this.$getApi+'employee/management/queryAll',                  
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token  

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res
                    var newData=[];
                            res.body.forEach(function(item, index, array){
                        newData.push({
                            userName:item.userName,
                            annual:Math.ceil(item.annual/28800)+" 天",
                            sick:Math.ceil(item.sick/28800)+" 天",
                            barth:Math.ceil(item.barth/28800)+" 天",
                            barthWith:Math.ceil(item.barthWith/28800)+" 天",
                            funeral:Math.ceil(item.funeral/28800)+" 天",
                            marry:Math.ceil(item.marry/28800)+" 天",



                        })

                    });
                    console.log("===wifi 员工假期====",body);
                    console.log("===wifi 员工假期====",res);

                   this.tableData=newData

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