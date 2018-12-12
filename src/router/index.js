/**
 * Created by HarryLee on 2017/5/21.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Regist from '../components/regist.vue'
import Layout from '../components/layout.vue'
import Index from '../components/index.vue'
import newSchool from '../components/newSchool.vue'

import DataStatistics from '../components/functions/dataStatistics.vue'
import UserManagement from '../components/functions/userManagement.vue'

import CertifiedCoach from '../components/functions/certifiedCoach.vue'
import CoachList from '../components/functions/children/coachList.vue'
import CoachDetail from '../components/functions/children/coachDetail.vue'
import CourseDetail from '../components/functions/children/courseDetail.vue'

import CoachAuthentication from '../components/functions/coachAuthentication.vue'
import UncertifiedList from '../components/functions/children/uncertifiedList.vue'
import CertifiedList from '../components/functions/children/certifiedList.vue'
import CertifySeacrchList from '../components/functions/children/certifySearchList.vue'

import ActionStorageManagement from '../components/functions/actionStorageManagement.vue'
import StorageAlreadyHave from '../components/functions/children/storageAlreadyHave.vue'
import ActionDetail from '../components/functions/children/actionDetail.vue'
import ActionEdit from '../components/functions/children/actionEdit.vue'
import AddActions from '../components/functions/children/addActions.vue'
import error from '../components/error.vue'

import upload from '../components/functions/children/youtu.vue'
import picture from '../components/functions/picture.vue'
import kindergarten from '../components/functions/kindergarten.vue'
import klasses from '../components/functions/klasses.vue'
import courses from '../components/functions/courses.vue'
import students from '../components/functions/students.vue'
import guardian from '../components/functions/guardian.vue'
import teachers from '../components/functions/teacher/teachers.vue'
import teaching from '../components/functions/teacher/teaching.vue'
import cookbook from '../components/functions/cookbook.vue'
import klassplans from '../components/functions/klassplans.vue'

import attendance from '../components/functions/attendances/attendance.vue'
import attendanceAdd from '../components/functions/attendances/attendanceAdd.vue'
import moneyplans from '../components/functions/moneyplans.vue'
import Costcategories from '../components/functions/Costcategories.vue'
import Cyclediscount from '../components/functions/Cyclediscount.vue'
import Newchargesplan from '../components/functions/Newchargesplan.vue'
import test from '../components/test.vue'
import testone from '../components/functions/testone.vue'
import newfeiplan from '../components/functions/newfeiplan.vue'
import allerdy from '../components/functions/allerdy.vue'
import havenot from '../components/functions/havenot.vue'
import Arrearage from '../components/functions/Arrearage.vue'
import balance from '../components/functions/balance.vue'
// import newzqzk from '../components/functions/chlid/newzqzk.vue'
import linkage from '../components/linkage.vue'
import interestClass from '../components/functions/interestClass.vue'
import characteristic from '../components/functions/characteristic.vue'
import amendCy from '../components/functions/amendCy.vue'
import collectPlan from '../components/functions/collectPlan.vue'
import NewcharCy from '../components/functions/NewcharCy.vue'
import ue from '../components/ue/ue.vue'
import iklassstu from '../components/functions/klassstu.vue'
import searchKlass from '../components/functions/searchKlass.vue'
import refund from '../components/functions/returnPremium/refund.vue'
import returnmoney from '../components/functions/returnPremium/returnmoney.vue'
import singIn from '../components/functions/attendances/singIn.vue'
import Retroactive from "../components/functions/attendances/Retroactive.vue"
import demand from '../components/functions/attendances/demand.vue'
import prepay from '../components/functions/finance/prepay.vue'
import receivable from '../components/functions/finance/receivable.vue'
import teacherWorkAttendance from '../components/functions/teacher/teacherWorkAttendance.vue'
import teacherCompensation from '../components/functions/teacher/teacherCompensation.vue'
import mainIncome from '../components/functions/finance/mianIncome.vue'
import minorIncome from '../components/functions/finance/minorIncome.vue'
import newPrepay from '../components/functions/finance/newPrepay.vue'
import spendingSummary from '../components/functions/finance/spendingSummary.vue'
import teacherSecurity from '../components/functions/teacher/teacherSecurity.vue'
import vacations from '../components/functions/vacations.vue'
import newStudent from '../components/functions/newStudent.vue'
import initialize from '../components/functions/initialize.vue'
import intrestContrast from '../components/interestContrast.vue'
import klassGer from '../components/functions/klassGer.vue'
import checking from '../components/functions/checking.vue'
import artKlass from '../components/functions/artKlass.vue'
import toll from '../components/functions/toll.vue'
import searchPay from '../components/functions/searchPay.vue'
import payBackMar from '../components/functions/payBackMar.vue'
import finance from '../components/functions/finance/finance.vue'
import addDuty from '../components/functions/teacher/AddDuty.vue'
import ledarTeacher from '../components/functions/teacher/ledarTeacher.vue'
import teacherClass from '../components/functions/teacher/teacherClass.vue'
import chackSearch from '../components/functions/teacher/chackSearch.vue'
import leaveRequest from '../components/functions/teacher/leaveRequest.vue'
import approvalProcess from '../components/functions/teacher/approvalProcess.vue'
import Check from '../components/functions/teacher/Check.vue'
import MyCheck from '../components/functions/teacher/MyCheck.vue'
import remain from '../components/functions/teacher/remain.vue'
import wifiList from '../components/functions/teacher/wifiList.vue'
import singoIn from '../components/functions/teacher/singoIn.vue'
import alyPay_contract from '../components/functions/alyPay_contract.vue'
import grades from '../components/functions/grades.vue'
import aliApply from '../components/functions/aliPay/aliApply.vue'
import oldKlass from '../components/functions/oldKlass.vue'
import manager from '../components/manager.vue'
import OssUpload from '../components/functions/OssUpload.vue'
import teacherGer from '../components/functions/teacher/teacherGer.vue'
import homeWork from '../components/functions/homeWork.vue'
import studentGer from '../components/functions/studentGer.vue'
import remianMoney from '../components/functions/finance/remianMoney.vue'
import healthy from '../components/functions/healthy.vue'
import groupManager from '../components/groupManager.vue'
import financeManage from '../components/financeManage.vue'
import personnelManage from '../components/personnelManage.vue'
// 儿童体检
import childCheck from '../components/functions/child/childCheck.vue'
import morning from '../components/functions/child/childCheck.vue'

//库存
import inWarehouse from '../components/functions/Warehouse/inWarehouse.vue'
import outWarehouse from '../components/functions/Warehouse/outWarehouse.vue'
import applyFor from '../components/functions/Warehouse/applyFor.vue'
import purchase from '../components/functions/Warehouse/purchase.vue'
import Warehouse from '../components/Warehouse.vue'
import childrenAttent from '../components/functions/childrenAttent.vue'
import downInage from '../components/functions/downloade/downInage.vue'
import attentChildren from '../components/functions/attentChildren.vue'
import weekCheck from '../components/functions/children/weekCheck.vue'
import takeMedicine from '../components/functions/child/takeMedicine.vue'






Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    { 
        path: '*', 
        component: (resolve) => require(['../components/login.vue'], resolve),
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        }, 
    },

    {
      path: '/manager',
      component: manager
    },{
      path: '/',
      component: Login,
       meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        }, 
    },{
      path: '/groupManager',
      component: groupManager
    },{
      path: '/financeManage',
      component: financeManage
    },{
      path: '/personnelManage',
      component: personnelManage
    },{
      path: '/Warehouse',
      component: Warehouse
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/newSchool',
      component: newSchool,
      meta: {
            requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
      path: '/regist',
      component: Regist,
      meta: {
            requireAuth: false,  // 添加该字段，表示进入这个路由是不需要登录的
        },
    },
    {
      path: '/upload',
      component: upload
    },

    {
      path: '/',
      component: Layout,
      children: [{
          path: 'index',
          component: Index
        },
        {
          path: 'dataStatistics',
          component: DataStatistics,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        },
        {
          path: 'userManagement',
          component: UserManagement
        },
        {
          path: 'certifiedCoach',
          component: CertifiedCoach,
          children: [{
              path: 'coachList',
              component: CoachList
            },
            {
              path: 'coachDetail',
              component: CoachDetail
            },
            {
              path: 'courseDetail',
              component: CourseDetail
            },
          ]
        },
        {
          path: 'Authentication',
          component: CoachAuthentication,
          children: [{
              path: 'uncertifiedList',
              component: UncertifiedList
            },
            {
              path: 'certifiedList',
              component: CertifiedList
            },
            {
              path: 'certifySearchList',
              component: CertifySeacrchList
            }
          ]
        },
        {
          path: 'action',
          component: ActionStorageManagement,
          children: [{
              path: 'storageAlreadyHave',
              component: StorageAlreadyHave
            },
            {
              path: 'actionDetail',
              component: ActionDetail
            },
            {
              path: 'actionEdit',
              component: ActionEdit
            },
            {
              path: 'addActions',
              component: AddActions
            }


          ]
        },
   
        {
          path: 'picture',
          component: picture
        },
        {
          path: 'kindergarten',
          component: kindergarten
        },
        {
          path: 'klasses',
          component: klasses
        },
        {
          path: 'courses',
          component: courses
        },
        {
          path: 'students',
          component: students
        },
        {
          path: 'attendance',
          component: attendance
        },
        {
          path: 'attendanceAdd',
          component: attendanceAdd
        },
        {
          path: 'error',
          component: error
        },
        {
           path: 'guardian',
           name:'guardian',
           component: guardian
         },
         {
           path: 'teachers',
           component: teachers
         },
         {
           path: 'teaching',
           component: teaching
         },
         {
           path: 'cookbook',
           component: cookbook
         },
         {
           path: 'klassplans',
           component: klassplans
         },
         {
           path: 'moneyplans',
           component: moneyplans
         },
         {
           path: 'Costcategories',
           component: Costcategories
         },
         {
           path: 'Cyclediscount',
           component: Cyclediscount
         },
         {
           path: 'Newchargesplan',
           component: Newchargesplan
         },
         {
           path: 'test',
           component: test
         },
         {
          path:'Cyclediscount',
          component:Cyclediscount
         },
         {
           path: 'testone',
           component: testone
         },
         {
           path: 'newfeiplan',
           component: newfeiplan
         },
         {
           path: 'allerdy',
           component: allerdy
         },
         {
           path: 'havenot',
           component: havenot
         },
         {
           path: 'Arrearage',
           component: Arrearage
         },
         {
           path: 'balance',
           component: balance
         },
         
         {
           path: 'linkage',
           component: linkage
         },
         {
           path: 'interestClass',
           component: interestClass
         }, {
           path: 'characteristic',
           component: characteristic
         },{
           path: 'amendCy',
           component: amendCy
         },{
           path: 'collectPlan',
           component: collectPlan
         },{
           path: 'NewcharCy',
           component: NewcharCy
         },{
           path: 'iklassstu',
           component: iklassstu
         },{
           path: 'searchKlass',
           component: searchKlass
         },{
           path: 'refund',
           component: refund
         },{
           path: 'returnmoney',
           component: returnmoney
         },{
           path: 'singIn',
           component: singIn
         },{
           path: 'Retroactive',
           component: Retroactive
         },{
           path: 'demand',
           component: demand
         },{
           path: 'prepay',
           component: prepay
         },{
           path: 'receivable',
           component: receivable
         },{
           path: 'teacherWorkAttendance',
           component: teacherWorkAttendance
         },{
           path: 'teacherCompensation',
           component: teacherCompensation
         },{
           path: 'mainIncome',
           component: mainIncome
         },{
           path: 'minorIncome',
           component: minorIncome
         },{
           path: 'newPrepay',
           component: newPrepay
         },{
           path: 'spendingSummary',
           component: spendingSummary
         },{
           path: 'teacherSecurity',
           component: teacherSecurity
         },{
           path: 'vacations',
           component: vacations
         },{
           path: 'newStudent',
           component: newStudent
         },{
           path: 'initialize',
           component: initialize
         },{
           path: 'intrestContrast',
           component: intrestContrast
         },{
           path: 'klassGer',
           component: klassGer
         },{
           path: 'checking',
           component: checking
         },{
           path: 'artKlass',
           component: artKlass
         },{
           path: 'toll',
           component: toll
         },{
           path: 'searchPay',
           component: searchPay
         },
         {
           path: 'payBackMar',
           component: payBackMar
         },{
           path: 'finance',
           component: finance
         },{
           path: 'addDuty',
           component: addDuty
         },{
           path: 'ledarTeacher',
           component: ledarTeacher
         },{
           path: 'teacherClass',
           component: teacherClass
         },{
           path: 'chackSearch',
           component: chackSearch
         },
         {
           path: 'leaveRequest',
           component: leaveRequest
         },{
           path: 'approvalProcess',
           component: approvalProcess
         },{
           path: 'Check',
           component: Check
         },{
           path: 'MyCheck',
           component: MyCheck
         },{
           path: 'remain',
           component: remain
         },{
           path: 'wifiList',
           component: wifiList
         },{
           path: 'singoIn',
           component: singoIn
         },{
           path: 'alyPay_contract',
           component: alyPay_contract
         },{
           path: 'grades',
           component: grades
         },{
           path: 'aliApply',
           component: aliApply
         },{
           path: 'oldKlass',
           component: oldKlass
         },{
           path: 'OssUpload',
           component: OssUpload
         },{
           path: 'teacherGer',
           component: teacherGer
         },{
           path: 'homeWork',
           component: homeWork
         },
         {
           path: 'studentGer',
           component: studentGer
         },{
           path: 'remianMoney',
           component: remianMoney
         },{
           path: 'healthy',
           component: healthy
         },{
           path: 'childCheck',
           component: childCheck
         },{
           path: 'inWarehouse',
           component: inWarehouse
         },{
           path: 'outWarehouse',
           component: outWarehouse
         },{
           path: 'applyFor',
           component: applyFor
         },{
           path: 'purchase',
           component: purchase
         },{
           path: 'childrenAttent',
           component: childrenAttent
         },{
           path: 'downInage',
           component: downInage
         },{
           path: 'attentChildren',
           component: attentChildren
         },
         {
           path: 'weekCheck',
           component: weekCheck
         },{
           path: 'takeMedicine',
           component: takeMedicine
         },
         
         
         

       
         


         
         
         
         

      ]
    },
  ]
})
