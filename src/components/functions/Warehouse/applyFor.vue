<template>
    <div>
            <div style="padding-left: 10px;
        padding-right: 10px">
                
                  <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top:3px">
                    <el-tab-pane label="教学类" name="TEACH">

                        <div>
                                 <el-select v-model="value" placeholder="请选择" style='display:inline-block'>
                                    <el-option
                                      v-for="item in options"
                                      :key="item.value"
                                      :label="item.value"
                                      :value="item.label">
                                    </el-option>
                            </el-select>
                              <el-input v-model="searchData" placeholder="请输入内容" style='display:inline-block ;width:200px' @keyup.native="show($event)"></el-input>
                            <el-button type="primary" style=' margin-top:15px;margin-bottom:5px;display:inline-block' @click='search'>查询</el-button>
                            <!-- <span style="color:green">查询成功</span> -->
                            <el-button style=' margin-top:15px;margin-bottom:5px;float:right; display:inline-block' @click='dialogVisible=true'>入库</el-button>  
                        </div>
                     
                                  <el-table
                                      :data="tableData"
                                      border
                                      style="width: 100%;margin-top:0px;">
                                
                                      <el-table-column
                                        prop=""
                                        label=""
                                        width='1'
                                       >
                                      </el-table-column>
                                         <el-table-column
                                        prop="id"
                                        label="物品id"
                                         align="center"
                                         width='80px'
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="createdAt"
                                        label="购置时间"
                                        :formatter="dateFormat"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="isbn"
                                        label="物品条形码"
                                         align="center"
                                       >
                                      </el-table-column>
                                     
                                      <el-table-column
                                        prop="name"
                                        label="物品名称"
                                         align="center"
                                       >
                                      </el-table-column> 
                                       <el-table-column
                                        prop="spec"
                                        label="规格"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="standar"
                                        label="单位"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="num"
                                        align="center"
                                        label="库存数量">
                                      </el-table-column>
                                   
                                       
                                        <el-table-column
                                        prop="price"
                                         align="center"
                                        label="单价">
                                      </el-table-column> 
                                       <el-table-column
                                        prop="createdBy"
                                         align="center"
                                        label="操作者">
                                      </el-table-column>
                                     
                                      <el-table-column
                                        width='180px'
                                         align="center"
                                        label="核对领取">

                                              <template slot-scope="scope">
                                                
                                                <el-button  size="mini" @click='creatFor(scope.row)'>分配</el-button>
                                                <el-button  size="mini" @click='addWare(scope.row)'>添加</el-button>
                                                <el-button  size="mini" @click='deleteWare(scope.row)'  type="danger">删除</el-button>
                                              </template>

                                      </el-table-column>
                                    </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="厨房类" name="KITCHEN">
                            <div>
                                 <el-select v-model="value" placeholder="请选择" style='display:inline-block'>
                                    <el-option
                                      v-for="item in options"
                                      :key="item.value"
                                      :label="item.value"
                                      :value="item.label">
                                    </el-option>
                            </el-select>
                              <el-input v-model="input" placeholder="请输入内容" style='display:inline-block ;width:200px'></el-input>
                            <el-button type="primary" style=' margin-top:15px;margin-bottom:5px;display:inline-block' >查询</el-button>
                            <el-button style=' margin-top:15px;margin-bottom:5px;float:right; display:inline-block' @click='dialogVisible=true'>入库</el-button>  
                        </div>
                               <el-table
                                      :data="tableData"
                                      border
                                      style="width: 100%;margin-top:0px;">
                                
                                      <el-table-column
                                        prop=""
                                        label=""
                                        width='1'
                                       >
                                      </el-table-column>
                                         <el-table-column
                                        prop="id"
                                        label="物品id"
                                         align="center"
                                         width='80px'
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="createdAt"
                                        label="购置时间"
                                        :formatter="dateFormat"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="isbn"
                                        label="物品条形码"
                                         align="center"
                                       >
                                      </el-table-column>
                                     
                                      <el-table-column
                                        prop="name"
                                        label="物品名称"
                                         align="center"
                                       >
                                      </el-table-column> 
                                       <el-table-column
                                        prop="spec"
                                        label="规格"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="standar"
                                        label="单位"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="num"
                                        align="center"
                                        label="库存数量">
                                      </el-table-column>
                                   
                                       
                                        <el-table-column
                                        prop="price"
                                         align="center"
                                        label="单价">
                                      </el-table-column> 
                                       <el-table-column
                                        prop="createdBy"
                                         align="center"
                                        label="操作者">
                                      </el-table-column>
                                     
                                      <el-table-column
                                        width='180px'
                                         align="center"
                                        label="核对领取">

                                              <template slot-scope="scope">
                                                
                                                <!-- <el-button  size="mini" @click='creatFor(scope.row)'>分配</el-button> -->
                                                <el-button  size="mini" @click='addWare(scope.row)'>添加</el-button>
                                                <el-button  size="mini" @click='deleteWare(scope.row)'  type="danger">删除</el-button>
                                              </template>

                                      </el-table-column>
                                    </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="食材类" name="FOOD">
                          <div>
                                 <el-select v-model="value" placeholder="请选择" style='display:inline-block'>
                                    <el-option
                                      v-for="item in options"
                                      :key="item.value"
                                      :label="item.value"
                                      :value="item.label">
                                    </el-option>
                            </el-select>
                              <el-input v-model="input" placeholder="请输入内容" style='display:inline-block ;width:200px'></el-input>
                            <el-button type="primary" style=' margin-top:15px;margin-bottom:5px;display:inline-block' >查询</el-button>
                            <el-button style=' margin-top:15px;margin-bottom:5px;float:right; display:inline-block' @click='dialogVisible=true'>入库</el-button>  
                          </div>
                            <el-table
                                      :data="tableData"
                                      border
                                      style="width: 100%;margin-top:0px;">
                                
                                      <el-table-column
                                        prop=""
                                        label=""
                                        width='1'
                                       >
                                      </el-table-column>
                                         <el-table-column
                                        prop="id"
                                        label="物品id"
                                         align="center"
                                         width='80px'
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="createdAt"
                                        label="购置时间"
                                        :formatter="dateFormat"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="isbn"
                                        label="物品条形码"
                                         align="center"
                                       >
                                      </el-table-column>
                                     
                                      <el-table-column
                                        prop="name"
                                        label="物品名称"
                                         align="center"
                                       >
                                      </el-table-column> 
                                       <el-table-column
                                        prop="spec"
                                        label="规格"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="standar"
                                        label="单位"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="num"
                                        align="center"
                                        label="库存数量">
                                      </el-table-column>
                                   
                                       
                                        <el-table-column
                                        prop="price"
                                         align="center"
                                        label="单价">
                                      </el-table-column> 
                                       <el-table-column
                                        prop="createdBy"
                                         align="center"
                                        label="操作者">
                                      </el-table-column>
                                     
                                      <el-table-column
                                        width='180px'
                                         align="center"
                                        label="核对领取">

                                              <template slot-scope="scope">
                                                
                                                <!-- <el-button  size="mini" @click='creatFor(scope.row)'>分配</el-button> -->
                                                <el-button  size="mini" @click='addWare(scope.row)'>添加</el-button>
                                                <el-button  size="mini" @click='deleteWare(scope.row)'  type="danger">删除</el-button>
                                              </template>

                                      </el-table-column>
                                    </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="家具" name="FURNITURE">
                          <div>
                                 <el-select v-model="value" placeholder="请选择" style='display:inline-block'>
                                    <el-option
                                      v-for="item in options"
                                      :key="item.value"
                                      :label="item.value"
                                      :value="item.label">
                                    </el-option>
                            </el-select>
                              <el-input v-model="input" placeholder="请输入内容" style='display:inline-block ;width:200px'></el-input>
                            <el-button type="primary" style=' margin-top:15px;margin-bottom:5px;display:inline-block' >查询</el-button>
                            <el-button style=' margin-top:15px;margin-bottom:5px;float:right; display:inline-block' @click='dialogVisible=true'>入库</el-button>  
                          </div>
                                  <el-table
                                      :data="tableData"
                                      border
                                      style="width: 100%;margin-top:0px;">
                                
                                      <el-table-column
                                        prop=""
                                        label=""
                                        width='1'
                                       >
                                      </el-table-column>
                                         <el-table-column
                                        prop="id"
                                        label="物品id"
                                         align="center"
                                         width='80px'
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="createdAt"
                                        label="购置时间"
                                        :formatter="dateFormat"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="isbn"
                                        label="物品条形码"
                                         align="center"
                                       >
                                      </el-table-column>
                                     
                                      <el-table-column
                                        prop="name"
                                        label="物品名称"
                                         align="center"
                                       >
                                      </el-table-column> 
                                       <el-table-column
                                        prop="spec"
                                        label="规格"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="standar"
                                        label="单位"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="num"
                                        align="center"
                                        label="库存数量">
                                      </el-table-column>
                                   
                                       
                                        <el-table-column
                                        prop="price"
                                         align="center"
                                        label="单价">
                                      </el-table-column> 
                                       <el-table-column
                                        prop="createdBy"
                                         align="center"
                                        label="操作者">
                                      </el-table-column>
                                     
                                      <el-table-column
                                        width='180px'
                                         align="center"
                                        label="核对领取">

                                              <template slot-scope="scope">
                                                
                                                <el-button  size="mini" @click='creatFor(scope.row)'>分配</el-button>
                                                <el-button  size="mini" @click='addWare(scope.row)'>添加</el-button>
                                                <el-button  size="mini" @click='deleteWare(scope.row)'  type="danger">删除</el-button>
                                              </template>

                                      </el-table-column>
                                    </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="玩具" name="TOY">
                          <div>
                                 <el-select v-model="value" placeholder="请选择" style='display:inline-block'>
                                    <el-option
                                      v-for="item in options"
                                      :key="item.value"
                                      :label="item.value"
                                      :value="item.label">
                                    </el-option>
                            </el-select>
                              <el-input v-model="input" placeholder="请输入内容" style='display:inline-block ;width:200px'></el-input>
                            <el-button type="primary" style=' margin-top:15px;margin-bottom:5px;display:inline-block' >查询</el-button>
                            <el-button style=' margin-top:15px;margin-bottom:5px;float:right; display:inline-block' @click='dialogVisible=true'>入库</el-button>  
                          </div>
                                  <el-table
                                      :data="tableData"
                                      border
                                      style="width: 100%;margin-top:0px;">
                                
                                      <el-table-column
                                        prop=""
                                        label=""
                                        width='1'
                                       >
                                      </el-table-column>
                                         <el-table-column
                                        prop="thId"
                                        label="物品id"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="thId"
                                        label="购置时间"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="thNum"
                                        label="物品条形码"
                                         align="center"
                                       >
                                      </el-table-column>
                                     
                                      <el-table-column
                                        prop="name"
                                        label="物品名称"
                                         align="center"
                                       >
                                      </el-table-column> 
                                       <el-table-column
                                        prop="name"
                                        label="规格"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="num"
                                        align="center"
                                        label="库存数量">
                                      </el-table-column>
                                      <el-table-column
                                        prop="who"
                                         align="center"
                                        label="申请单位/人">
                                        </el-table-column>
                                        <el-table-column
                                        prop="howMuch"
                                         align="center"
                                        label="数量">
                                      </el-table-column>  
                                        <el-table-column
                                        prop="howMuch"
                                         align="center"
                                        label="单价">
                                      </el-table-column> 
                                       <el-table-column
                                        prop="howMuch"
                                         align="center"
                                        label="操作者">
                                      </el-table-column>
                                     
                                      <el-table-column
                                        
                                         align="center"
                                        label="核对领取">

                                              <template slot-scope="scope">
                                                
                                                <el-button type="text" size="small">已领</el-button>
                                              </template>

                                      </el-table-column>
                                  </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="电子类" name="ELECTRON">
                          <div>
                                 <el-select v-model="value" placeholder="请选择" style='display:inline-block'>
                                    <el-option
                                      v-for="item in options"
                                      :key="item.value"
                                      :label="item.value"
                                      :value="item.label">
                                    </el-option>
                            </el-select>
                              <el-input v-model="input" placeholder="请输入内容" style='display:inline-block ;width:200px'></el-input>
                            <el-button type="primary" style=' margin-top:15px;margin-bottom:5px;display:inline-block' >查询</el-button>
                            <el-button style=' margin-top:15px;margin-bottom:5px;float:right; display:inline-block' @click='dialogVisible=true'>入库</el-button>  
                          </div>
                                  <el-table
                                      :data="tableData"
                                      border
                                      style="width: 100%;margin-top:0px;">
                                
                                      <el-table-column
                                        prop=""
                                        label=""
                                        width='1'
                                       >
                                      </el-table-column>
                                         <el-table-column
                                        prop="id"
                                        label="物品id"
                                         align="center"
                                         width='80px'
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="createdAt"
                                        label="购置时间"
                                        :formatter="dateFormat"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="isbn"
                                        label="物品条形码"
                                         align="center"
                                       >
                                      </el-table-column>
                                     
                                      <el-table-column
                                        prop="name"
                                        label="物品名称"
                                         align="center"
                                       >
                                      </el-table-column> 
                                       <el-table-column
                                        prop="spec"
                                        label="规格"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="standar"
                                        label="单位"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="num"
                                        align="center"
                                        label="库存数量">
                                      </el-table-column>
                                   
                                       
                                        <el-table-column
                                        prop="price"
                                         align="center"
                                        label="单价">
                                      </el-table-column> 
                                       <el-table-column
                                        prop="createdBy"
                                         align="center"
                                        label="操作者">
                                      </el-table-column>
                                     
                                      <el-table-column
                                        width='180px'
                                         align="center"
                                        label="核对领取">

                                              <template slot-scope="scope">
                                                
                                                <el-button  size="mini" @click='creatFor(scope.row)'>分配</el-button>
                                                <el-button  size="mini" @click='addWare(scope.row)'>添加</el-button>
                                                <el-button  size="mini" @click='deleteWare(scope.row)'  type="danger">删除</el-button>
                                              </template>

                                      </el-table-column>
                                    </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="舞蹈美工类" name="DANCE">
                              <div>
                                 <el-select v-model="value" placeholder="请选择" style='display:inline-block'>
                                    <el-option
                                      v-for="item in options"
                                      :key="item.value"
                                      :label="item.value"
                                      :value="item.label">
                                    </el-option>
                            </el-select>
                              <el-input v-model="input" placeholder="请输入内容" style='display:inline-block ;width:200px'></el-input>
                            <el-button type="primary" style=' margin-top:15px;margin-bottom:5px;display:inline-block' >查询</el-button>
                            <el-button style=' margin-top:15px;margin-bottom:5px;float:right; display:inline-block' @click='dialogVisible=true'>入库</el-button>  
                          </div>
                                 <el-table
                                      :data="tableData"
                                      border
                                      style="width: 100%;margin-top:0px;">
                                
                                      <el-table-column
                                        prop=""
                                        label=""
                                        width='1'
                                       >
                                      </el-table-column>
                                         <el-table-column
                                        prop="id"
                                        label="物品id"
                                         align="center"
                                         width='80px'
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="createdAt"
                                        label="购置时间"
                                        :formatter="dateFormat"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="isbn"
                                        label="物品条形码"
                                         align="center"
                                       >
                                      </el-table-column>
                                     
                                      <el-table-column
                                        prop="name"
                                        label="物品名称"
                                         align="center"
                                       >
                                      </el-table-column> 
                                       <el-table-column
                                        prop="spec"
                                        label="规格"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="standar"
                                        label="单位"
                                         align="center"
                                       >
                                      </el-table-column>
                                      <el-table-column
                                        prop="num"
                                        align="center"
                                        label="库存数量">
                                      </el-table-column>
                                   
                                       
                                        <el-table-column
                                        prop="price"
                                         align="center"
                                        label="单价">
                                      </el-table-column> 
                                       <el-table-column
                                        prop="createdBy"
                                         align="center"
                                        label="操作者">
                                      </el-table-column>
                                     
                                      <el-table-column
                                        width='180px'
                                         align="center"
                                        label="核对领取">

                                              <template slot-scope="scope">
                                                
                                                <el-button  size="mini" @click='creatFor(scope.row)'>分配</el-button>
                                                <el-button  size="mini" @click='addWare(scope.row)'>添加</el-button>
                                                <el-button  size="mini" @click='deleteWare(scope.row)'  type="danger">删除</el-button>
                                              </template>

                                      </el-table-column>
                                    </el-table>
                    </el-tab-pane>
                  </el-tabs>
      
            </div>
              <el-dialog
                 
                  :visible.sync="dialogVisible"
                  width="600px"
                  :before-close="handleClose">
                         <div class="top">
                 <span class="top_text">入库</span>
                 <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                   <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
                 </div>
                 </div>
                  
                  <div style="width:300px;margin:0 auto;">
                      
                    <el-form  label-width="100px" >
                       
                      <el-form-item label="物品条码" >
                        <el-input  style='width:200px' placeholder="请输入物品条码" @keyup.native="show($event)" v-model='isbn'></el-input>
                      </el-form-item>
                      <el-form-item label="物品名称" >
                        <el-input  style='width:200px' placeholder="请输入物品名称" v-model='name'></el-input>
                      </el-form-item>
                      <el-form-item label="规格" >
                        <el-input  style='width:200px' placeholder="请输入物品规格" v-model='spec'></el-input>
                      </el-form-item>
                        <el-form-item label="单价" >
                        <el-input  style='width:200px' placeholder="请输入物品单价" v-model='price'></el-input>
                      </el-form-item>
                      <el-form-item label="单位" >
                        <el-input  style='width:200px' placeholder="请输入物品单位" v-model='standar'></el-input>
                      </el-form-item>
                      <el-form-item label="数量">
                        <el-input-number  v-model='num' :max="1000" style='width: 200px;'></el-input-number>
                      </el-form-item>
             <!--          <el-form-item label="操作者">
                        <el-input style='width:200px' placeholder="请输入入库操作者"></el-input>
                      </el-form-item> -->
                      <el-form-item>
                       <el-button type="primary" @click="inWare">确 定</el-button>
                      </el-form-item>
                    </el-form>


                  </div>
                  <span slot="footer" class="dialog-footer">
                   
                    
                  </span>
                </el-dialog>

                <el-dialog
  
                  :visible.sync="dialogVisible1"
                  width="600px"
                  :before-close="handleClose">
                  <div class="top">
                 <span class="top_text">采购</span>
                 <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                   <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible1 = false">
                 </div>
                 </div>
                  <div style="margin-left:30px;padding-left:90px">
                    
                      <el-form  label-width="100px" >
                       
                      <el-form-item label="物品条码" >
                        <el-input  style='width:200px' placeholder="请输入物品条码" @keyup.native="show($event)" v-model='Addisbn'></el-input>
                      </el-form-item>
                      <el-form-item label="物品名称" >
                        <el-input  style='width:200px' placeholder="请输入物品名称" v-model='Addname'></el-input>
                      </el-form-item>
                      <el-form-item label="规格" >
                        <el-input  style='width:200px' placeholder="请输入物品规格" v-model='Addspec'></el-input>
                      </el-form-item>
                        <el-form-item label="单价" >
                        <el-input  style='width:200px' placeholder="请输入物品单价" v-model='Addprice'></el-input>
                      </el-form-item>
                     
                      <el-form-item label="数量">
                        <el-input-number  v-model='Addnum' :max="1000" style='width: 200px;'></el-input-number>
                      </el-form-item>
            
                      <el-form-item>
                       <el-button type="primary" @click="inWareNum" style='width:200px;margin-left:-20px;margin-bottom:20px'>确 定</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                         

                 
                </el-dialog>

                <!-- 删除 -->
                <el-dialog
                  
                  :visible.sync="dialogVisible2"
                  width="600px"
                  :before-close="handleClose">
                   <div class="top">
                 <span class="top_text">删除</span>
                 <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                   <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible2 = false">
                 </div>
                 </div>

                 <div>
                   确认删除？
                 </div>
                  <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                    <el-button type="primary" @click="deleteTrue">确 定</el-button>
                  </span>
                </el-dialog>
                <el-dialog
                    
                    :visible.sync="creatForDialog"
                    width="600px"
                    :before-close="handleClose">
                         <div class="top">
                           <span class="top_text">分配物资</span>
                           <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                             <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="creatForDialog = false">
                           </div>
                        </div>

                        <div>
                          
                          <el-form label-width="80px" style='margin-left:130px'>
                            <el-form-item label="分配班级">
                                <el-select v-model="value123" placeholder="请选择" @visible-change="chanalue">
                                  <el-option
                                    v-for="item in klassesOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="物品名称">
                              <el-input style='width:200px' v-model='Addname'></el-input>
                            </el-form-item>
                            <el-form-item label="分配数量">
                              <el-input style='width:200px' v-model='allotNum'></el-input>
                            </el-form-item>
                           
                          </el-form>
                        </div>

                    <span slot="footer" class="dialog-footer">
                      <el-button @click="creatForDialog = false">取 消</el-button>
                      <el-button type="primary" @click="creatForSure">确 定</el-button>
                    </span>
                  </el-dialog>


    </div>
    
</template>
<script>
import Moment from 'moment';
    export default {
        data(){
            return {
                tableData:[],
                  klassesOptions:[],
                  sthId:'',
                  isbn:'',
                  name:'',
                  spec:'',
                  price:0,
                  num:'',
                  standar:'',
          
                  Addisbn:'',
                  Addname:'',
                  Addspec:'',
                  Addprice:'',
                  Addnum:'',


                subclass:'',
                num111:1,
                dialogVisible:false,
                dialogVisible1:false,
                dialogVisible2:false,
                creatForDialog:false,
                activeName:'TEACH',
                options:[
                {
                    label:'id',
                    value:'物品id'

                },{
                    label:'num',
                    value:'条形码'
                },{
                    label:'name',
                    value:'名字'
                }

                ],
                value:'',
                value11:'',
                searchData:'',
                searcNum:'',
                deleteId:'',
                allotNum:'',
                value123:'',
            }
        },
     
        methods:{
          handleClick(){
            this.getData();
          },


           dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return Moment(date*1000).format("YYYY-MM-DD");  
            },
            chanalue(){
                console.log('1111111111',)
                this.$http({
                    method: 'get',
                    url:  this.$getApi+'management/klasses',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res

                    console.log("===res getKlassData===",res.body);

                    if (!!body.length) {
                        
                          var klassesArray=[];
                          res.body.forEach(function(item, index, array){
                               klassesArray.push({value:item.id,label:item.name})    
                          })
                             //this.value = klassesArray[0].value
                             this.klassesOptions = klassesArray;
                                
                            } else {
                                alert('err:' + body)
                            }
                        })

            },
          creatForSure(){

                   this.$http.post(         
           this.$getApi+'warehouseSchoolAllot/management/create',          
          [{
          
         

                "allotNum": this.allotNum,       //数量
                "applyBy": this.value123, //班级
                "isbn": this.Addisbn,    //条形码
                "name": this.Addname,    //名字
                "price": this.Addprice,          //价格
                "spec":this.Addspec,   //规格
                "type": "KLASS"     //类型
            
          }],
          // console.log(localStorage.token),
          {
          headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token
                      }

                    }
        ).then((res) => { // promise对象
           this.$message({
                      message: '分配成功',
                      type: 'success'
                    }); 
        })
        .catch(function(err){
            console.log(err)
              this.$message({
                      message: '添加失败',
                      type: 'error'
                    }); 
          })
        this.creatForDialog=false
          },
          creatFor(row){

            this.creatForDialog=true
                this.Addisbn=row.isbn
                  this.Addname=row.name
                  this.Addspec=row.spec
                  this.Addprice=row.price
                  this.Addnum=row.num

          },
          inWareNum(){
               this.$http.put(
                    this.$getApi +'warehouseSchool/management/add',
                    [
                        {
                          "isbn": this.Addisbn,
                          "name": this.Addname,
                          "num": this.Addnum,
                          "price": this.Addprice,
                          "spec": this.Addspec
                        }
                      ],
                    {
                      headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token

                      }
                    }
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===add Student body=000000====",res.body);
                    this.$message({
                      message: '成功',
                      type: 'success'
                    }); 
                    this.getData();
                    // console.log('birthday');
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    }); 
                });
                this.dialogVisible1=false;
          },
          deleteTrue(){
                 this.$http({
                    method: 'delete',
                    url:this.$getApi+'warehouseSchool/management?ids='+this.deleteId ,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   const {
                        body
                    } = res
                this.$message({
                       message: '成功',
                     type: 'success'
                    }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                          }); 
                      });
                   
                      


                    console.log("===res students===",res.body);


                  

                })
                this.dialogVisible2=false
          },
          deleteWare(row){
            console.log(row)
            this.deleteId=row.id
            this.dialogVisible2 = true
          },
          addWare(row){
            console.log(row)
                   this.dialogVisible1=true;
                  this.Addisbn=row.isbn
                  this.Addname=row.name
                  this.Addspec=row.spec
                  this.Addprice=row.price
                  this.Addnum=row.num
            
          },
          inWare(){
            console.log('this.isbn',this.isbn)
            console.log('this.isbn',)
           
                   this.$http.post(         
           this.$getApi+'warehouseSchool/management/created',          
          [{
          
              "isbn": this.isbn,
              "name": this.name,
              "num": this.num,
              "price": this.price*1,
              "spec": this.spec,
              'standar':this.standar,
              "subclass": this.activeName,
              "superclass": "FIXATION"
            
          }],
          // console.log(localStorage.token),
          {
          headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token
                      }

                    }
        ).then((res) => { // promise对象
           this.$message({
                      message: '添加成功，如页面没有请刷新页面',
                      type: 'success'
                    }); 
        })
        .catch(function(err){
            console.log(err)
              this.$message({
                      message: '添加失败',
                      type: 'error'
                    }); 
          })
         this.dialogVisible=false;
          },
          search(){
            console.log('1111',this.value,)
            if (this.value=='num') {
                this.$http({
                    method: 'get',
                    url: this.$getApi + 'warehouseSchool/management/findAllBySchoolId?isbn='+this.searchData,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res
                    // var tableArry=[]
                    // tableArry.push(res.body)
                    // console.log("===res getData===",res);
                    if (res.body.length==0) {
                      alert('暂无数据')
                    }else{
                         this.$message({
                      message: '查询成功',
                      type: 'success'
                    });
                    }
                        var tableData=[]
                     res.body.forEach(function(item, index, array){
                               tableData.push({
                                createdAt:item.createdAt,
                                id:item.id,
                                spec:item.spec,
                                isbn:item.isbn,
                                name:item.name,
                                price:item.price,
                                createdBy:item.createdBy.username,
                                num:item.num,
                                isAllot:item.isAllot,
                                applyBy:item.applyBy,
                                standar:item.standar,
                                })    
                          })
                    this.tableData=tableData
                     
                    console.log("======",res);

                        })
                this.searchData=''
            }else if (this.value=='name') {
              console.log(this.value)
                   this.$http({
                    method: 'get',
                    url: this.$getApi + 'warehouseSchool/management/findAllBySchoolId?name='+this.searchData,

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res
                    // var tableArry=[]
                    // tableArry.push(res.body)
                    // console.log("===res getData===",res);
                    //   this.tableData=tableArry
                         var tableData=[]
                     res.body.forEach(function(item, index, array){
                               tableData.push({
                                createdAt:item.createdAt,
                                id:item.id,
                                spec:item.spec,
                                isbn:item.isbn,
                                name:item.name,
                                price:item.price,
                                createdBy:item.createdBy.username,
                                num:item.num,
                                isAllot:item.isAllot,
                                applyBy:item.applyBy,
                                standar:item.standar,
                                })    
                          })
                    this.tableData=tableData
                        this.$message({
                      message: '查询成功',
                      type: 'success'
                    });
                    console.log("======",res);

                        })
                 this.searchData=''
            } 
          },
          getData(){
            
             this.$http({
                    method: 'get',
                    url: this.$getApi + 'warehouseSchool/management/findAllBySchoolIdAndType?subclass='+this.activeName +'&superClass=FIXATION',

                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res
                    console.log(res)
                    var tableData=[]
                     res.body.forEach(function(item, index, array){
                               tableData.push({
                                createdAt:item.createdAt,
                                id:item.id,
                                spec:item.spec,
                                isbn:item.isbn,
                                name:item.name,
                                price:item.price,
                                createdBy:item.createdBy.username,
                                num:item.num,
                                isAllot:item.isAllot,
                                applyBy:item.applyBy,
                                standar:item.standar,
                                })    
                          })
                    this.tableData=tableData
                        })
          },
          show(ev){
             console.log(ev.keyCode)
             this.searcNum=ev.keyCode
            
                if (ev.keyCode==13) {
                    console.log('要执行的代码')
                     this.search();
                     
                     // getApi 

                //      this.$http({
                //     method: 'get',
                //     url:'http://302301.market.alicloudapi.com/barcode/barcode?barcode='+this.searchData,

                //     headers:  {"Content-Type":"application/json; charset=utf-8",
                //     "Authorization":"APPCODE 137acac278174c1895d33b673ca3d34a"}
                // }).then((res) => { // promise对象
                //     const {
                //         body
                //     } = res
                //     console.log('getApi ++++++++++++++',res)
                
          
                //         })

















                    console.log(this.value11)
                }
          }
        },
        mounted(){
            this.getData();
        }
    }
</script>
<style scoped>
  
</style>