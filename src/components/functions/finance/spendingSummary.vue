<template>
    <div>
        <div class="content1">
          <div style="width:102.5%; height:50px; background-color:#fff;margin-top:-0px;margin-left:-30px; padding-right:25px;padding-left:30px; line-height:40px; padding-top:4px;">
            
               <span> </span><el-select v-model="value" placeholder="请选择查询条件" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.label">
            </el-option>
        </el-select>
       
        <el-button type="primary">查询</el-button>
        <!-- <el-button type="primary" @click="testA">测试</el-button> -->
        <el-button type="primary" style="float:right;margin-right:-14px;" @click="handelOpen">数据统计</el-button>
        <el-button type="primary" style="float:right" @click="addMoneyType">添加支出款项</el-button>
        


          </div>
       


    <div class="tab">
 
       <el-table
     :data="tableData7.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    accordion
    style="width: 100%;color:#1d5391;" border="true" @row-click="test"
     >
    <el-table-column type="expand" style="padding:0;"class-name="zclb">
      <template slot-scope="props">
       
       <el-table
    :data="tableData6"
      size="small"
    style="width: 100%;color:#1d5391; "
    max-height="250" >
    
    <el-table-column
      prop="name"
      align="center"
      label="明细"
      class-name="inTable"
      >
    </el-table-column>
    <el-table-column
      prop="Subid"
      align="center"
      label="id"
      >
    </el-table-column>
    <el-table-column
      prop="money"
      align="center"
      label="金额"
      >
    </el-table-column>
    

    <!-- <el-table-column
      align="center"
      prop="city"
      label="操作人"
      >
    </el-table-column> -->
     <el-table-column
      align="center"
      prop="city"
      label="操作">
       <template slot-scope="scope">
        
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <!-- <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
      </template>
    </el-table-column>
    
   
  </el-table>
      </template>
    </el-table-column>
      <el-table-column
      label=""
      width:'1'
      prop=""
     
      >
    </el-table-column>


     <el-table-column
      label="支出类别"
      align="center"
      prop="name"
      class-name="zclb"
      >
    </el-table-column>

    <el-table-column
      label="总额"
      align="center"
      prop="totlemoney"
      class-name="zclb">
    </el-table-column>

   <!--  <el-table-column
      label="操作"
      align="center"
      prop="totlemoney"
      class-name="zclb">
   
       <template slot-scope="scope">
        <el-button
          size="small"
          type="danger"
          @click="deleteMain(scope.$index, scope.row)">删除</el-button>
      </template>
     

    </el-table-column> -->
    
  </el-table>


    </div>

    <div class="block">
 
  <!-- <el-pagination 
           @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pagesize"
           
            :total="tableData7.length"
            style="float:right; margin-top:20px;">


            </el-pagination> -->

            <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      background="false"
      layout="total, prev, pager, next"
      :total="tableData7.length"
        style="float:right; margin-top:20px;">
    </el-pagination>
</div>
<el-dialog
  
  :visible.sync="dialogVisible"
  width="37%"
  >

 <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">添加支出款项</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
             </div>
          </div>
          <!-- Newtitle  end-->
<div style="margin-left:144px;">
    
<el-form style="margin-right:10px;">
  <el-form-item>
   

<span><span style="margin-right:10px;">
  支出类别
</span>
        <el-select
    v-model="value10"
    
    filterable
    allow-create='true'
    default-first-option
    placeholder="请选择"
    class="inpt_pay"
    @change="indexSelect">
    <el-option
      v-for="item in tableData5"
      :key="item.value"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>

   </span> 
  

   


  <el-button type="primary" style="width:61px;color:#fff;"@click='payoutType'>添 加</el-button>
  <el-button type="danger" style="width:61px;color:#fff;"@click='deleteMain'>删 除</el-button>
  <!-- <el-button type="primary" style="float:right" @click="payoutType">测试</el-button> -->
  </el-form-item>
<div style="width:79%;height:1px; background-color:#83afde; margin-bottom:20px; color: #4d5387; margin-left：-6px;"></div> 
  <el-form-item >
    <span class="font_c" style="word-spacing:2px; ">
      <span style="margin-right:10px;">子 类 别</span>
     <el-select
    v-model="value9"
    
    filterable
    allow-create
    default-first-option
    placeholder="请选择"
    class="inpt_pay"
    @change="paySubindex"
    >
    <el-option
      v-for="item in tableData4"
      :key="item.value"
      :label="item.name"
      :value="item.paySubid">
    </el-option>
  </el-select>
</span> 
    <el-button type="primary"style="width:61px;color:#fff;"@click='payoutSubType'>添 加</el-button>
    <el-button type="danger" style="width:61px;color:#fff;"@click='handleDelete'>删 除</el-button>
  </el-form-item>
  <el-form-item  >
   <span class="font_c" style="word-spacing:10px; margin-right:10px;">金&nbsp;&nbsp;额</span> <el-input style="width:320px;" v-model="money"></el-input>
  </el-form-item>
  
  <el-form-item  >
   <span class="font_c" style="word-spacing:3px; margin-right:10px;">操 作 人</span> <el-input style="width:320px;"></el-input>
  </el-form-item><el-form-item  >
   <span style="word-spacing:8px;margin-right:-21px;">&nbsp;&nbsp;&nbsp;&nbsp; </span> <el-button type="primary" @click="addPayout" style="width:320px; color:#fff;">添 加</el-button>
  </el-form-item>
</el-form>



</div>









  <span slot="footer" class="dialog-footer">
   <!--  <el-button @click="dialogVisible = false">取 消</el-button> -->
    
  </span>
</el-dialog>

<div v-show="dialog" class="tag_main">
  <div class="tag_content">
 


 <!-- Newtitle  start-->
           <div class="top" style="margin-top:-34px;">
             <span class="top_text">支出图型展示</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialog = false">
             </div>
          </div>
          <!-- Newtitle  end-->
<div>
    

<div id="myChart" :style="{width: '600px', height: '400px'}"></div>



</div>

  </div>
 




  
</div>




    </div>
       <el-dialog
       
          :visible.sync="dialogDo"
          width="30%"
          :before-close="handleClose">

        
          <!-- Newtitle  start-->
           <div class="top">
             <span class="top_text">编辑</span>
             <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
               <img src="../../../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogDo = false">
             </div>
          </div>
          <!-- Newtitle  end-->
          <div style="margin-left:25%;padding-bottom:30px;">
            <el-form>
               <el-form-item>
                <span>名 &nbsp; 称</span>
                  <el-input v-model="sonName" style="width:270px;"></el-input>
                </el-form-item>
              <!-- 修改主类别 -->
                  <el-form-item>
                    <span>主类别</span>
                        <el-select
                        v-model="value10"
                        
                        filterable
                        allow-create='true'
                        default-first-option
                        placeholder="请选择"
                        style="width:270px;"
                        @change="indexSelect">
                        <el-option
                          v-for="item in tableData5"
                          :key="item.value"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                </el-form-item>
                <el-form-item>
                <!-- <span>提 交</span> -->
                  <el-button type="primary" @click="putData" style="width:270px;margin-left:9%;">提交</el-button>
                </el-form-item>
               

            </el-form>
              
          </div>
        
        </el-dialog>
    </div>
</template>
<script>

        let echarts = require('echarts/lib/echarts')
        // 引入柱状图组件
        require('echarts/lib/chart/pie')
        // 引入提示框和title组件
        require('echarts/lib/component/tooltip')
        require('echarts/lib/component/title')
   



    export default {
         name: 'hello',
        data(){
            return {
                slelectMajor:'',
                  departments: [
        {name: '教学教务', majors: ['幼儿生活用品', '幼儿园服/被品结账', '幼儿活动费用-园内','幼儿活动费用-园外','幼儿校车费用','幼儿校车油费','幼儿校车电话费','幼儿教学办公用品','幼儿环创用品','幼儿教材结账','室内玩教具','户外玩教具']},
        {name: '艺术团', majors: ['园外课时费结账', '园内教师课时费', '材料费']},
        {name: '医药保健', majors: ['幼儿日常药品', '幼儿保健卫生用品', '幼儿医疗费用','幼儿意外险']},
        {name: '食堂', majors: ['肉鲜类', '果蔬类', '粮油类','奶饮类','豆制品','干果类','调料类','燃气费','厨用/其他','成人餐费','幼儿餐费']},
        {name: '固资低耗', majors: ['固定资产增加-办公家具', '桌子-幼儿用', '床-幼儿用','玩具柜-幼儿用','椅子-成人用','固定资产增加-电子设备','电脑','打印机','固定资产增加-教学教具','钢琴','低值易耗品购买']},
        {name: '后勤维修', majors: ['园所环创费用', '园所维修费用', '园所装修尾款','其他']},
        {name: '园内管理费', majors: ['教职员工资', '全员社保', '外教（第三方）','实习生（第三方）','保洁/临时工（第三方）','员工体检费','过节福利','筑爱家族-生日费用','筑爱家族-员工活动费用','行政事务办公费用','行政后勤生活用品','行政后勤办公用品','差旅费','交通费','电话网络费','房租-园所','房租-员工住宿','物业/清洁费','取暖费','水费','电费','招生费用-印刷费','招生费用-活动费用','培训/会费','招待费']},
        {name: '其他', majors: ['已入园幼儿退费', '备用金款',]},
      ],
      selectedDepartment: '',
                value9:'',
                currentPage:1,
                 pagesize:10,
                 showSize: 10,
                current_page: 0,
                count: 100,
                value10:'',
                sonName:'',
                labe:'',
                money:0,
                dialog:false,
                indexId:'',
                dialogVisible: false,
                dialogDo:false,
                tableData:[],
                options:[{
                  value:"指定儿童",
                  label:1
                },{
                  value:"指定班级",
                  label:2
                }],
                value:'',
                childType:'',

                 tableData5: [],
                 tableData6: [],
                tableData4: [],
                paySubid:0,
                chartarry:[],
                chartname:[],
              }
            },
             computed: {
    majors: function() {
      var majors = [], selectedDepart = this.$data.selectedDepartment;
      this.$data.departments.forEach(function(d) {
        if(d.name == selectedDepart)
          majors = d.majors;
      });
      return majors;
    }
  },
        methods:{
            paySubindex(mId){
                 let objec = {};
                  objec= this.tableData4.find((item)=>{//这里的userList就是上面遍历的数据源
                      return item.paySubid === mId;//筛选出匹配数据
                  });
                  console.log('当前数据的label',objec.name);//我这边的name就是对应label的
             this.childType= objec.name

            },
            testA(){
                  this.$http.get(
                   
                    this.$getApi+'revenue/payout/findAllByMainType?id=19',
                    
                    {
                      headers:{
                      
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                   
                    console.log("===按主类别查询支出====",res);
                           
                });
            },
            addMoneyType(){
                 this.$http.get(
                   
                    this.$getApi+'revenue/payoutType/findAll',
                    
                    {
                      headers:{
                      
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                   
                    console.log("===主类别r====",res);
                    var mainArry=[];
                       res.body.forEach(function(item, index, array){

                        mainArry.push({
                            name:item.name,
                            id:item.id,
                           
                         })
                        
                    })
                       this.tableData5=mainArry
                       console.log('mainArry',mainArry)
                   
                    
                });
               this.dialogVisible = true
            },
            handleSizeChange: function (size) {
        this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },
            getData(){

                 this.$http.get(
                
                    this.$getApi+'revenue/payoutType/findAll',
                   
                    {
                      headers:{
                        
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                    
                    console.log("===主类别r====",res);
                    var mainArry=[];
                       res.body.forEach(function(item, index, array){

                        mainArry.push({
                            name:item.name,
                            indexId:item.id,
                           
                         })
                        
                    })
                       this.tableData5=mainArry
                       console.log('mainArry',res)
                       console.log('mainArry',res.body)
                       
                    
                })
                this.findAll();
                this.addMoneyType();
this.dialogVisible = false
this.getData1();
            },
            //编辑子类
          

            handleEdit(index,row){


              this.dialogDo=true;
              this.paySubid=row.paySubid;
            



            },


            putData(){
                    this.$http({
                    method: 'put',
                    url: this.$getApi + 'revenue/payoutSubType/update?id='+this.paySubid+'&name='+this.sonName+'&type='+this.value10,

                    headers: {
                      
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                      this.$message({
                      message: '成功',
                      type: 'success'
                    }); 
                    const {
                        body
                    } = res

                   console.log('111111111',res)
                   this.open();
                        }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    }); 
                });
            },
            
            getPaySub(){
                 this.$http.get(
                  
                    this.$getApi+'/revenue/payoutSubType/findAll',
                   
                    {
                      headers:{
                      
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                   
                    console.log("===子类别r====",res.body);
                   







                    var minorArry=[];
                      res.body.forEach(function(item, index, array){

                        minorArry.push({
                            name:item.name,
                            id:100000
                           
                         })
                        
                    })


                })
            },
            indexSelect(vId){
                
                console.log('444444444444444',this.value10);
                
               

                // let obj = {};
                //   obj = this.tableData5.find((item)=>{//这里的userList就是上面遍历的数据源
                //       return item.id === vId;//筛选出匹配数据
                //   });
                //   console.log('当前数据的label',obj.name);//我这边的name就是对应label的
               
                 this.$http.get(
                  
                    this.$getApi+'revenue/payoutType/findAll',
                   
                    {
                      headers:{
                      
                       
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                 
                    console.log("===主类别r====",res);
                    var mainArry=[];
                       res.body.forEach(function(item, index, array){

                        mainArry.push({
                            name:item.name,
                            id:item.id,
                           
                         })
                        
                    })
                       this.tableData5=mainArry
                       console.log('mainArry',mainArry)
                     
                    
                });

                this.$http.get(
                   
                    this.$getApi+'/revenue/payoutSubType/findAll',
                    
                    {
                      headers:{
                       
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
               
                    console.log("===子类别r====",res.body);
                    var minorArry=[];
                    for(var i=0; i<res.body.length; i++){
                        if(this.value10===res.body[i].payoutMainType.id){
                            minorArry.push({
                                name:res.body[i].name,
                                paySubid:res.body[i].id,
                                fatherName:res.body[i].payoutMainType.id
                     
                            })

                            
                        }
                    }
                    this.tableData4=minorArry;
                    console.log('---------------------------------------------------------',minorArry)

                })
                 console.log('22222222222',row.name)





            },
            //删除主类
            deleteMain(){
              // this.tableData5.splice(index, 1)
                // console.log('.........',row.indexId)
                 this.$http.delete(
                   
                    this.$getApi+'revenue/payoutMainType/delete?id='+this.value10,
                  
                    {
                      headers:{
                   
                        
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                   this.$message({
                      message: '成功',
                      type: 'success'
                    });
                    // const {body} = res;
                    console.log("===body=add==teacher====",res);
                    
                }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    }); 
                });

          this.getData();

            },
          
            addPayout(){
                console.log(this.value9);
                       this.$http.post(
                  
                    this.$getApi+'revenue/payout/create',
                    {
                        
                        "money":this.money*1,
                        "payoutSubTypeId":this.value9 //获取弹出框明细下id
                    },
                    {
                      headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                    // const {body} = res;
                    console.log("===body=add==teacher====",res);
                     this.$message({
                      message: '添加成功',
                      type: 'success'
                    }); 
                }).catch((res) =>{
                    this.$message({
                      message: '添加失败',
                      type: 'error'
                    }); 
                });


                this.dialogVisible=false

            },
            payoutType(){
                 console.log('1111111111111111',this.value10) ;
                   this.$http.post(
                   
                    this.$getApi+'revenue/payoutType/create',
                    
                        
                        this.value10,
                        
                    
                    {
                      headers:{
                        
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                        this.$message({
                      message: '添加成功',
                      type: 'success'
                    });
                    console.log("===body=add==teacher====",res);

                    
                }).catch((res) =>{
                    this.$message({
                      message: '添加失败',
                      type: 'error'
                    }); 
                });
            },
             open() {
         this.$notify({
          title: '成功',
          message: '添加成功',
          type: 'success',
          position: 'top-left',
           // duration: 0,
        });
      },
       addErr() {
          this.$notify.error({
          title: '失败',
          message: '添加失败，此项已有',
          position: 'top-left',
          // duration: 0,
        
        });
      },
            
            payoutSubType(){
                var type=this.value10; //获取类别下ID
                var name=this.value9;
              console.log('this.tableData4',this.name)
              var newArry=[];
              this.tableData4.forEach(function(item, index, array){
                            newArry.push(item.name)
                    })
              console.log('newArry',newArry)
                console.log('this.childType',name)
               var some=newArry.indexOf(this.childType)
               console.log('some',some)
              if (some!=-1) {
               this.addErr();
              }else{

                     this.$http({
                    method: 'post',
                    url: this.$getApi + 'revenue/payoutSubType/create?type='+type+'&name='+name,

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    this.$message({
                      message: '成功',
                      type: 'success'
                    }); 
                    const {
                        body
                    } = res

                   console.log('111111111',res)
                   
                        }).catch((res) =>{
                    this.$message({
                      message: '失败',
                      type: 'error'
                    }); 
                });

              }
                
            },
     
        
            handelOpen(){
                console.log('232323232323');
                    this.dialog=true;

                    this.drawLine();

            },
            getData1(){
                // this.dialog=true;

                    this.drawLine();
            },
            //删除子类
            handleDelete(){
              
                    this.$http.delete(
                   
                    this.$getApi+'revenue/payoutSubType/delete?id='+this.value9,
                  
                    {
                      headers:{
                   
                        
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                   this.$message({
                      message: '成功',
                      type: 'success'
                    }); 
                    // const {body} = res;
                    console.log("===body=add==teacher====",res);
                    
                }).catch((res) =>{
                    this.$message({
                      message: '删除失败',
                      type: 'error'
                    }); 
                });


          this.getData();

            },



            drawLine() {
      console.log('sssssssss',this.chartarry);





      let myChart = echarts.init(document.getElementById('myChart'))
      console.log('0000000000',)
    
       var option = {
        title : {
        text: '北京博顿幼儿园(草桥园)',
        subtext: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data:this.chartname
    },
    
    series : [
        {
            name: '数据',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:this.chartarry,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
                // label:{            //饼图图形上的文本标签
                //             normal:{
                //                 show:true,
                //                 position:'inner', //标签的位置
                //                 textStyle : {
                //                     fontWeight : 300 ,
                //                     fontSize : 16    //文字的字体大小
                //                 },
                //                 formatter:'{d}%'

                                
                //             }
                //         },
        }
    ]
            };
      myChart.setOption(option);


                //         this.tableData7=tableArry
                      
                  
                //       var chartArry=[];
                //      for(var a=0;a<tableArry.length;a++){
                //     var obj=new Object();
                //     obj.name=tableArry[a].name; 
                //     obj.value=tableArry[a].totlemoney;
                //     chartArry[a]=obj;
                // }

                //          console.log('chartArry',chartArry)


                //     for(var i=0;i<chartArry.length;i++){

                //         names.push(chartArry[i].name);    //挨个取出类别并填入类别数组

                //      }

                //     for(var i=0;i<chartArry.length;i++){

                //         nums.push({name:chartArry[i].name,value:chartArry[i].totlemoney});    //挨个取出销量并填入销量数组

                //       }


                    // myChart.setOption({        //加载数据图表

                    //     legend: {
                    //          orient: 'vertical',
                    //         left: 'left',
      
                    //         data: names

                    //     },

                    //     series: [{

                    //         // 根据名字对应到相应的系列

                    //             name: '数据',
                    //             type: 'pie',
                    //             radius : '55%',
                    //             center: ['50%', '60%'],
                    //             data: nums,
                    //             itemStyle: {
                    //                 emphasis: {
                    //                     shadowBlur: 10,
                    //                     shadowOffsetX: 0,
                    //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
                    //                 }
                    //             },
                    //                 label:{            //饼图图形上的文本标签
                    //                             normal:{
                    //                                 show:true,
                    //                                 position:'inner', //标签的位置
                    //                                 textStyle : {
                    //                                     fontWeight : 300 ,
                    //                                     fontSize : 16    //文字的字体大小
                    //                                 },
                    //                                 formatter:'{d}%'

                                                    
                    //                             }
                    //                         },

                           

                    //     }]

                    // });


    },




    test(row){
        
        console.log('1111111111',row.id)
           this.$http.get(
                   
                    this.$getApi+'/revenue/payout/findAll',
                  
                    {
                      headers:{
                        
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
                ).then((res) =>{
                    
                    console.log("===teststststststststststststst子类别r====",res.body);
                    var minorArry=[];
                    for(var i=0; i<res.body.length; i++){
                        if(row.name===res.body[i].payoutSubType.payoutMainType.name){
                            minorArry.push({
                                name:res.body[i].payoutSubType.name,
                                Subid:res.body[i].payoutSubType.id,
                                fatherName:res.body[i].payoutSubType.payoutMainType.id,
                                money:res.body[i].money,
                               
                                
                            })

                            
                        }
                    }
                    this.tableData6=minorArry;
                    console.log('---------------------------------------------------------',minorArry)









                    
                   


                })
                 console.log('22222222222',row.name)



    },
findAll(){
     this.$http({
                    method: 'get',
                    url: this.$getApi + '/revenue/payout/findAll',

                    headers: {
                        
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                    const {
                        body
                    } = res



                    var list = res.body,
                      flag = 0,
                      data = [];          
                  for(var i = 0; i< list.length; i++) {
                      var az = '';
                      for (var j = 0; j < data.length; j++) {
                          if(data[j][0].payoutSubType.payoutMainType.id == list[i].payoutSubType.payoutMainType.id) {
                              flag = 1;
                              az = j;
                              break;
                          }
                      }
                      if(flag == 1){
                          data[az].push(list[i]);
                          flag = 0;
                      } else if (flag == 0) {
                         var wdy = new Array();
                          wdy.push(list[i]);
                          data.push(wdy);
                      }
                  }
                  console.log('data+++++++++++++',data);

                


                        var tableArry=[];
                     


// 计算总额
// 
                            for( var q=0;q<data.length;q++){
                      if (data[q].length>1) {
                        var sum=0;
                        for(var p=0; p<data[q].length; p++ ){

                          sum+=data[q][p].money
                        }
                        console.log(sum)
                      }else{
                        sum=data[q][0].money
                        console.log('11111111',sum)
                      }

                    tableArry.push({
                           name:data[q][0].payoutSubType.payoutMainType.name,
                           totlemoney:sum   
                        })


                       }


                console.log('tableArry',tableArry)

                        this.tableData7=tableArry
                       
                  
                      var chartArry=[];
                     for(var a=0;a<tableArry.length;a++){
                    var obj=new Object();
                    obj.name=tableArry[a].name; 
                    obj.value=tableArry[a].totlemoney;
                    chartArry[a]=obj;
                }
                    this.chartarry=chartArry
                         console.log('chartArry',chartArry)

                         // alert(chartArry)
                         // 
                         // 
                        var chartName=[];
                tableArry.forEach(function(item, index, array){
                          chartName.push(item.name)
                       
                    })
                this.chartname=chartName;
                this.chartname=tableData7;
                console.log('sssssss',chartName)

                        })
            

}
            

            




    

        },

          mounted(){
            console.log('---------mounted--------------');
            this.getData();
            // this.getPaySub();
            // this.findAll();

          
          
    
          },
          acviteted(){
            this.getData();
          }
    }
</script>
<style>
    .content1{
        width: 98.8%;
        /*height: 400px;*/
        /*margin-top: 30px;*/
        /*background-color: red;*/
        margin-left: 10px;
        /*padding-left:10px;*/

    }
    .tag_add_close{
    position: absolute;
    top: 14px;
    right: 14px;
    width: 30px;
    height: 30px;
  }
    #input{
      display: inline-block;
      width: 200px
    }
     .block{
        float: right;
        margin-right: 5px;

    }
    .tab{
      /*margin-top: 10px;*/
      /*margin-right: 10px;*/
    }
     .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;

  }
  .top{
    width: 100%;
    height: 55px;
    background-color: #61bfff;
    margin-top: -55px;
    /*margin-left:-20px;*/
    margin-bottom: 50px;
  }
  .top_text{
    font-size: 22px;
    /*font-weight: 700;*/
    color: #fff;
    display: inline-block;
    width: 100%;
    text-align: center;
    font-family: '黑体';
    line-height: 55px;
  }
  .font_c{
    color: #4d5387;
  }
  .class_pay{
    width: 20px;
    height: 36px;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    font-size: 14px;
    padding-left: 5px;
    position: absolute;
    left: 63px;
  }
  .inpt_pay{
    width: 180px;
    height: 35px;
    border-radius: 4px;
    /*border: 1px solid #bfcbd9;*/
    font-size: 14px;
  }
  option {
    margin-left: 200px;
  }
  .add_close{
    position: absolute;
    top: -20px;
    right: 9px;
    width: 30px;
    height: 30px;
  }
   .closeImg{
        margin-left: 7px;
        margin-top: 7px;
    }
    .closeDiv:hover{
      background-color: #23a3fb;
    }
  .el-table tr{
    background-color: #fff!important;
  }
  .el-table__expanded-cell{
    padding: 0 !important;
  }
    .el-table--enable-row-transition .el-table__body td{
         padding: 0 !important;
    }
    .el-table--border td, .el-table--border th{
          padding: 0 !important;
    }
    /*.el-table_1_column_2{
        height: 40px;
    }*/
    .zclb{
        height: 45px!important;
        color: #fff!important;
        /*background-color: #41acf5!important;*/
    }
    .inTable{
        height: 25px!important;
        color: #fff!important;
        line-height: 25px!important;
        /*background-color: #41acf5!important;*/
    }
   .el-table_1_column_1,.el-table_1_column_2,.el-table_1_column_3{
        /*background-color: #41acf5!important;*/
        color: #fff!important;
        border-bottom: 2px solid #000;
    }
    .el-table_1_column_2 .cell,.el-table_1_column_3 .cell{
         /*background-color: #41acf5!important;*/
         color: #000!important;
    }
    .el-table th>.cell{
             color: #fff!important;
             /*font-weight: 700;*/
    }
    .el-table .cell{
        color: #000!important;
        line-height: 38px;
    }
    .el-table--fit{
        border-bottom: 2px solid #94caf3;
    }
    .is-leaf[class*="zclb"] .cell,.is-leaf[class*="zclb"]{
        /*background-color: #41acf5!important;*/
        color: #fff;
        height: 40px!important;
        line-height: 40px!important;
    }
    .table_1_column_11 [class*="inTable"] .cell,.table_1_column_11 [class*="inTable"]{
        /*background-color: #41acf5!important;*/
        color: #fff;
        height: 30px!important;
        line-height: 30px!important;
    }
    .el-table[class*="inTable"] >.cell{
      height: 30px!important;
        line-height: 30px!important;
    }
    .el-table_1_column_1[class*="is-leaf"]{
        /*background-color: #41acf5!important;*/
        border-right: 0px!important;
        height: 35px!important;
        line-height: 40px!important;
    }
    thead .cell{
     line-height: 40px !important;
    }
    .tag_main{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,.3);
      z-index: 100;
    }
    .tag_content{
      background-color: #fff;
      position: absolute;
      top: 25%;
      left: 38%;
    /*  width: 30%;
      height: 30%*/;

      /*width: 600px;*/
      /*height: 400px;*/
    }
    .tag_top{
     width: 100%;
    height: 35px;
    background-color: #61bfff;
    /*margin-top: -68px;
    margin-left:-20px*/;
    /*margin-bottom: 50px;*/
  }
  .el-notification.right{
    right:42%;
    top:65%!important;
  }
  .el-notification{
    right: 40%!important;
    top:35%!important;

  }
  #myChart{
    /*padding-left:50px;*/
    margin-top: 15px;
  }
  .el-dialog--small{
    width: 37%;
    
  }
  .el-button{
    padding-right: 12px 12px!important;
  }
  .el-select-dropdown__list{
    /*width: 162px!important;*/
  }
  .el-table__body-wrapper{
    width: 101%!important;
    
  }
/*  smallTable*/

</style>