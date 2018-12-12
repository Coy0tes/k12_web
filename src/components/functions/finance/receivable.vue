<template>
    <div>
        预收
        <el-input class='search' placeholder="请输入查询儿童"></el-input>
         <el-button type="primary">查询</el-button>
        <template>
            <el-table
              :data="tableData"
              style="width: 100%"
              border="true">
              <el-table-column
                prop="id"
                align="center"
                label="id">
              </el-table-column>
              <el-table-column
                prop="name"
                align="center"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="klass"
                align="center"
                label="所在班级">
              </el-table-column>
              <el-table-column
                prop="money"
                align="center"
                label="预收费用">
              </el-table-column>
            </el-table>
          </template>

    </div>
</template>
<script>
    export default {
        data(){
            return {
                  tableData: []
            }
        }
    }
</script>
<style scoped>
    .search{
        width: 200px;
        margin-bottom: 25px;
        margin-top: 20px;
    }
    
</style>