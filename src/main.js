import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import resource from './resource'
import store from './store'
import Moment from 'moment'
import axios from 'axios'
import ue from './components/ue/ue.vue'
import vueXlsxTable from 'vue-xlsx-table'

Vue.use(vueXlsxTable, {rABS: false})
import Blob from './excel/Blob.js'
import Export2Excel from './excel/Export2Excel.js'


import './static/UE/ueditor.config.js'
import './static/UE/ueditor.all.js'
import './static/UE/lang/zh-cn/zh-cn.js'
import './static/UE/ueditor.parse.min.js'
import 'vue-easytable/libs/themes-base/index.css'


import {VTable,VPagination} from 'vue-easytable'
Vue.use(ElementUI);


import apiDefault from './unit/config'
Vue.use(apiDefault);
Vue.use(Moment);
Vue.prototype.$ajax = axios
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.config.productionTip = false
// Vue.component('pic');

// router.beforeEach((to,from,next) => {
//   // 验证登陆状态
//   if (localStorage.loginStatus === 'login') {
//     if (to.path === '/login') {
//       return next({path: '/dataStatistics'});
//     }
//     next();
//   } else if(){
//     if (to.path !== '/login') {
//       return next({path: '/login'});
//     }else {
//       next();
//     }
//   }
// });

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router,
  resource,
  
});


