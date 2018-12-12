export default {
    install(Vue, options) {
        // Vue.prototype.$getApi = process.env.NODE_ENV === 'build' ? 'http://q.socap1.com:60405' : 'http://10.16.40.94:60405'
        // Vue.prototype.$getApi = 'http://q.socap1.com:60405'
        // 
 
        Vue.prototype.$getApi =  'https://k12.vwico.com/' 
        // Vue.prototype.$getApi =  'http://mxc520.free.idcfengye.com/' 


      // Vue.prototype.$getApi = 'http://192.168.1.150:8080/'
      // Vue.prototype.$getApi = 'http://192.168.1.245:8080/'
      // Vue.prototype.$getApi = 'http://192.168.1.107:8080/'
            // Vue.prototype.$getApi =  'http://192.168.1.107:8080/'
       
         // 'https://k12.vwico.com/'
    }
}



