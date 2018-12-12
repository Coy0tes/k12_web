import Vue from 'vue'
import Vuerify from 'vuerify'

Vue.use(Vuerify, {
  mobile: {
    test: /^\d{11}$/,
    message: '十一位手机号'
  },


})