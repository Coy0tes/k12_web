<template>
  <div id="app" style="height: 100%">
    <el-row style="height: 100%">
      <el-col :span="4" style="height: 100%">
        <!--3、引用-->
        <!--父组件v-on监听current-bread方法收到的子组件数据，并触发'接受面包屑名'的事件-->
        <div class="title_box">
           <router-link :to="{path:'/'}">
        <img class="logo" src="../assets/logo.png" alt="logo" style="width:185px">
      </router-link>
     </div>
     <el-button v-show="showBtn"> 添加</el-button>
        <el-tree
      :data="data"
      :props="defaultProps"
     
      node-key="id"
      default-expand-all
      accordion
      @node-click="handleNodeClick"
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>
      </el-col>
      <el-col :span="20" style="height: 100%;">
        <MenuBarTop id="MenuBarTop" :breadcrumb="currentBreadcrumb" :TouchLeftNavStatus="Status" @isNotTouchLeft="getStatusFromTop"></MenuBarTop>
       
            <div class="w_title">
                  
                         <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="运营管理" name="first"><manager :param="param" ref="manager"></manager></el-tab-pane>
                            <el-tab-pane label="财务管理" name="second"><financeManage ref="financeManage"></financeManage></el-tab-pane>
                            <el-tab-pane label="人事管理" name="third"><personnelManage ref="personnelManage"></personnelManage></el-tab-pane>
                            <el-tab-pane label="库存管理" name="forth"><Warehouse ref="Warehouse"></Warehouse></el-tab-pane>
                            
                          </el-tabs>

                    
                   
            </div>
     
      </el-col>
    </el-row>
                                <el-dialog
                                 
                                  :visible.sync="dialogVisible"
                                  width="600px"
                                  :before-close="handleClose">
                                      <div class="top">
                                       <span class="top_text">关联地区</span>
                                       <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                                         <img src="../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible = false">
                                       </div>
                                       
                                    </div>
                                <div style="padding-left:150px;">
                                  请输入关联code <el-input v-model="input" placeholder="请输入code" style='width:200px'></el-input>
                                </div>
                                  <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="linked">确 定</el-button>
                                  </span>
                                </el-dialog>


                                  <el-dialog
                                 
                                  :visible.sync="dialogVisible1"
                                  width="600px"
                                  :before-close="handleClose">
                                      <div class="top">
                                       <span class="top_text">添加节点</span>
                                       <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                                         <img src="../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible1 = false">
                                       </div>
                                       
                                    </div>
                                <div style="padding-left:150px;">
                                  请输入名字 <el-input v-model="creatName" placeholder="请输入名字" style='width:200px'></el-input>
                                </div>
                                  <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible1 = false">取 消</el-button>
                                    <el-button type="primary" @click="addChril">确 定</el-button>
                                  </span>
                                </el-dialog> 

                                <el-dialog
                                 
                                  :visible.sync="dialogVisible2"
                                  width="600px"
                                  :before-close="handleClose">
                                      <div class="top">
                                       <span class="top_text">删除节点</span>
                                       <div style="display:inline-block;height:30px;width:30px;border-radius:50%;position: absolute;top: -20px;right: 10px;" class="closeDiv">
                                         <img src="../assets/close3.png"  height="16" width="16" class="closeImg" @click="dialogVisible2 = false">
                                       </div>
                                       
                                    </div>
                                <div style="padding-left:150px;">
                                  请输入名字 <el-input v-model="input" placeholder="请输入名字" style='width:200px'></el-input>
                                </div>
                                  <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible2 = false">取 消</el-button>
                                    <el-button type="primary" @click="delete1">确 定</el-button>
                                  </span>
                                </el-dialog>
  </div>
</template>
<script>
  //1、引入
 
  import MenuBarTop from './MenuBarTop.vue';
  import manager from './manager.vue';
  import financeManage from './financeManage.vue';
  import personnelManage from './personnelManage.vue';
  import Warehouse from './Warehouse.vue';
  export default {
    data() {
      return {
        msg: 'Hello I am Admin',
        dialogVisible:false,
        dialogVisible1:false,
        dialogVisible2:false,
        currentBreadcrumb: '',
        Status: '',
        activeName: 'first',
        data: [], 
        dataId:0,
        creatName:'',
        showBtn:false,
      }
    },

    components: { //2、暴露
  
      MenuBarTop,
      manager,
      financeManage,
      personnelManage,
      Warehouse,
    },
     watch: {
            current_page(now, old) {
                this.getData()
            },
        },

    methods: {
      // 删除
          // 
          handleNodeClick(data){
            console.log(this.activeName,'0333333333333333')
               var optData=[]
          

          data.children.forEach(function(item,index,array){
                            optData.push({
                                label:item.label,
                                value:item.id,
                           
                            })
                      });
            console.log(data)
            console.log(data.code)
            console.log(data.id)
            this.dataId=data.id
             this.$store.commit('areaArry',optData);
          this.$store.commit('areaId',data.code);

          if (this.activeName=='first') {
            this.$refs.manager.test3(data.code);
          }else if (this.activeName=='second') {
             this.$refs.financeManage.sdc(data.code);
          }else if (this.activeName=='third') {}
            
           
            var str=data.code
            // dataId=data.id
            // alert(str.substr(0, 1));
            // 
            // 
            // 
           

            if ((str.substr(0, 1)) == "P") {
               this.actorTypes="province"
                 console.log('code============city');
             }else  if((str.substr(0, 1)) == "C"){
                console.log('code============city');
                this.actorTypes="citys"

            }
         

         
            console.log(optData)
          },
          delete1(){
             this.dialogVisible2=false
          },
          // 关联
            linked(){
                if (this.actorTypes=="group") {
                  
                   this.addRegions()
                }else if (this.actorTypes=="region") {
                  this.addProvinces()
                }else if (this.actorTypes=="province") {
                  this.addCity()
                }else if (this.actorTypes=="citys") {

                }




              this.dialogVisible=false

            },
            // 添加节点
            addChril(){
              if (this.actorTypes=="group") {
                  
                   this.addRegions()
                }else if (this.actorTypes=="region") {
                  this.addProvinces()
                }else if (this.actorTypes=="province") {
                  this.addCity()
                }else if (this.actorTypes=="citys") {

                }
               this.dialogVisible1=false
            },
                 addCity(){
               this.$http.post(
          this.$getApi + 'district/management/web/addCity',
          
          {
           
            "name": this.creatName,
            "provinceId": this.dataId  //关联

            
          },
          {
          headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
        ).then((res) => { // promise对象
          console.log("===regist==== res=====",res);
      
          
        
        })
      },
      addGroups(){
        console.log(this.creatName)
                  this.$http.post(
          this.$getApi + 'district/management/web/addGroups?groupsName='+this.creatName,
          
          {
          headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
        ).then((res) => { // promise对象
          console.log("===regist==== res=====",res);
      
          
        
        })
      },
      addProvinces(){
               this.$http.post(
          this.$getApi + 'district/management/web/addProvinces',
          
          {
           
            "name": this.creatName,
            "regionId": this.dataId

            
          },
          {
          headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
        ).then((res) => { // promise对象
          console.log("===regist==== res=====",res);
      
          
        
        })
      },
      // 大区
      addRegions(){
           this.$http.post(
          this.$getApi + 'district/management/web/addRegions',
          
          {
           
            "name": this.creatName,
            "groupId": this.dataId

            
          },
          {
          headers:{
                        // 'content-type': "multipart/form-data",
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.token

                      }
                    }
        ).then((res) => { // promise对象
          console.log("===regist==== res=====",res);
      
          
        
        })
      },

       renderContent(createElement, { node, data, store }) {
            // console.log('1111111111',this)
            var that=this
        return createElement(

                'span',
                {
                    style:{
                        'flex':'1',
                        'display':'flex',
                        'align-items':'center',
                        'justify-content':'space-between',
                        'font-size':'14px',
                        'padding-right':'8px'
                    }
                },
                [
                    createElement(
                            'span',
                            {},
                            [
                                createElement('span',node.label)
                            ]
                    ),
                    createElement(
                            'span',
                            {},
                            [
                      
                          
                                createElement('i',
                                        {
                                            style:{
                                                'font-size':' 18px',
                                                // "margin-right":"100px",
                                                // "text-align":"left"
                                            },
                                            class: "el-icon-share",
                                            attrs:{
                                                // 'type':'text'
                                            },
                                            on:{
                                                click:function(){
                                                    // vue.menuEdit(node,data,store);
                                                    console.log(node,data,store,)
                                             
                                                    that.dialogVisible=true
                                                }
                                            },
                                           
                                        }
                                ),
                                createElement('i',
                                        {
                                            style:{
                                                'font-size':' 18px',
                                                // "margin-right":"100px",
                                                // "text-align":"left"
                                            },
                                            class: "el-icon-circle-plus",
                                            attrs:{
                                                // 'type':'text'
                                            },
                                            on:{
                                                click:function(){
                                                    // vue.menuEdit(node,data,store);
                                                    console.log(node,data,store,)
                                             
                                                    that.dialogVisible1=true
                                                }
                                            },
                                           
                                        }
                                ), 

                               createElement('i',{
                                            style:{
                                                'font-size':' 18px',
                                                "margin-right":"100px",
                                                // "text-align":"left"
                                            },
                                            class: "el-icon-delete",
                                            attrs:{
                                                // 'type':'text'
                                            },
                                            on:{
                                                click:function(){
                                                    // vue.menuEdit(node,data,store);
                                                    console.log(node,data,store,)
                                                    var a=data.label;
                                                
                                                   
                                                    that.dialogVisible2=true
                                                }
                                            },
                                           
                                        }),  
                        
                            ]
                    )
                ]
        );
    },
      findTree(){
                   this.$http({
                    method: 'get',
                    url:this.$getApi +'district/management/findTree',
                   
                    headers: {
                        // 'content-type': "multipart/form-data",
                        'Authorization': 'Bearer ' + localStorage.token

                    }
                }).then((res) => { // promise对象
                   
                    const {
                        body
                    } = res
                    if (res.body.length) {
                      this.showBtn=false
                    }else if (res.body=={}) {
                        this.showBtn=true
                    }
                        
                    console.log('8888888888888888888888',res.body)
                    var dataArray=[]
                    dataArray.push(body.groupsDTO)
                    console.log(dataArray)
                   this.data=dataArray
                    console.log('res----findTree', res)
                    console.log('res----findTree', body)
                 

                })
              },
       parent(){
                this.$.refs.financeManage.draw();
            },
       handleClick(tab, event) {
        console.log(tab, event);
         console.log('tab.label',tab.label)
        if (tab.label="财务管理") {
          console.log('1111111');
          this.$refs.financeManage.draw();
          
        }
        console.log('tab.label',tab.label)
      },
      getBreadName(params) {
        console.log(params);
        //      将子组件传来的数据赋值给'当前breadcrumb'
        this.currentBreadcrumb = params
      },
      getStatusFromLeft(params) {
        console.log(params);
        this.Status = params
      },
      getStatusFromTop(params) {
        console.log(params);
        this.Status = params
      }
    },
    mounted(){
        this.findTree();
    }
  }
//  $(document).ready(function () {
//    // 浏览器的高度和div的高度
//    var windowHeight = $(window).height();
//    var leftHeight = $("#MenuBarLeft").height();
//    var contentHeight = $("#mainContent").height();
//
//    //获取div对象
//    var left = $("#MenuBarLeft").get(0);
//    var content = $("#mainContent").get(0);
//
//    //div高度大于屏幕高度把屏幕高度赋给div，并出现滚动条
//    if (leftHeight > windowHeight - 20) {
//      left.style.height = windowHeight + 'px';
//      left.style.overflow = "auto";
//    }
//    if (contentHeight > windowHeight - 80) {
//      content.style.height = windowHeight - 60 + 'px';
//      content.style.overflow = "auto";
//    }
//  })

</script>
<style>
  *{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 14px;
    font: inherit;

    vertical-align: baseline;
  }
  ::-webkit-scrollbar  
{  
    width: 16px;  
    height: 16px;  
    background-color: #ffffff;  
}  
  
/*定义滚动条轨道 内阴影+圆角*/  
::-webkit-scrollbar-track  
{  
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  */
    /*border-radius: 10px;  */
    background-color: #eef2f9;  
}  
  
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    /*border-radius: 10px;  */
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  */
    background-color: #d4d7de;  
}  
  /* HTML5 display-role reset for older browsers */

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  body {
    font-family: "siyuan" !important;
    color: #5e658f;
  }

   /*::-webkit-scrollbar {
    display: none
  }*/

  #mainContent{
    z-index: 1;
    margin-top: 91px;
    /*padding-left: 20px;*/
    height: 105%;
    width: 100%;
    /*padding-top: 1px;*/
    background-color: #fff;
  }
   .title_box {
    text-align: center;
    height: 90px;
    padding-bottom: 91px;
    line-height: 101px;

  }
  .w_title{
    width: 100%;
    /*height: 300px;*/
    /*background-color: red;*/
    margin-top: 92px;
  }
  .content1{
    width: 100%;

  }
 .el-button--small, .el-button--small.is-round{
  margin: 2px 2px;
 }
 .el-button--mini{
 margin: 2px 2px;
 }
.el-select-dropdown__list{
      /*width: 110px!important;*/
    }
    .el-dialog__body{
      padding:0!important;
    }
    .el-icon-close:before{
      display: none!important;
    }
    .el-dialog{
        border-radius: 5px;
    }
    .top{
       border-radius: 5px 5px 0 0;
    }
    .el-table__body-wrapper{
    width: 101%!important;
    
  }

  .is-scroll-left,.is-scroll-middle,.is-scroll-right{
     color: #ccc!important;


  }
.is-leaf{
    border: 0;
  }
  .el-tabs__content{
    margin-top:-25px;
  }
  .el-tabs__nav-scroll{
        margin-left:10px;
  }
  .el-button.is-round{
    padding: 12px 15px !important;
  }
  .el-button--mini, .el-button--mini.is-round{
    padding: 7px 7px!important;
  }  
  .el-carousel__container{
    height: 100%!important;
  }
   .el-tree-node__content{
    height: 40px!important;
  }
</style>
