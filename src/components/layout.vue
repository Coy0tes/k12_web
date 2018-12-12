<template>
  <div id="app" style="height: 100%">
    <el-row style="height: 100%">
      <el-col :span="4" style="height: 100%">
        <!--3、引用-->
        <!--父组件v-on监听current-bread方法收到的子组件数据，并触发'接受面包屑名'的事件-->
        <MenuBarLeft id="MenuBarLeft" @current-bread="getBreadName" @isTouchLeftNav="getStatusFromLeft"></MenuBarLeft>
      </el-col>
      <el-col :span="20" style="height: 100%;">
        <MenuBarTop id="MenuBarTop" :breadcrumb="currentBreadcrumb" :TouchLeftNavStatus="Status" @isNotTouchLeft="getStatusFromTop"></MenuBarTop>
        <keep-alive>
          <router-view id="mainContent" @current-bread="getBreadName" @isTouchLeftNav="getStatusFromLeft">
            <div class="w_title">
              
            </div>
          </router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  //1、引入
  import MenuBarLeft from './MenuBarLeft.vue';
  import MenuBarTop from './MenuBarTop.vue';
  export default {
    data() {
      return {
        msg: 'Hello I am Admin',
        currentBreadcrumb: '',
        Status: '',
      }
    },

    components: { //2、暴露
      MenuBarLeft,
      MenuBarTop,
    },

    methods: {
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
  .w_title{
    width: 100%;
    height: 300px;
    /*background-color: red;*/
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
