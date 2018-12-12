import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use (Vuex)

const state ={
    count:44,
    check:false,
    currentPage:0,
    const:[],
    sum:0,
    multipleSelection:[],
    

}
const mutations ={
    add(state){
        state.sum ++,
        console.log(state.sum)
    },
    jia(state){
        state. check ++,
        console.log(state.check)
        
    },
    jian(state){
        state. check --
        
    },
    assign(state,stuId){
        state.studentId = stuId.id;
        console.log("store log is:",state.studentId);

    },   
    register(state,regDec){
        state.regDec = regDec;
        console.log("store log is:",state.regDec);

    }, 

    remianId(state,reid){
        state.remianId = reid.id;
        console.log("store log is:",state.remianId);

    },
    imgUrl(state,imgUrl){
        state.upImg = imgUrl;
        console.log("store log is:",state.upImg);

    },

     unit(state,unitid){
        state.unitid = unitid;
        console.log("store log is:",state.unitid);

    },
    nameOpt(state,klassName){
        state.cost=klassName;
        console.log("store log is:",state.cost)
    },
    areaArry(state,optArray){
        state.optarray=optArray;
        console.log("store log is:",state.optarray)
    }, 
    areaId(state,areaId){
        state.areaid=areaId;
        console.log("store log is:",state.areaid)
    },
    rowObj(state,rowCont){
       state.stuCont=rowCont;
       console.log('student Cont',state.stuCont)
    },
    collObj(state,collObj){
        state.stuCont=collObj;
        console.log('student Cont',state.stuCont)
    },
    rowId(state,rowId){
        state.rId=rowId;
        console.log('rowID',state.rId)
    },
    sfjhRowId(state,jhRowId){
        state.jhId=jhRowId;
        console.log('jhRowId',state.jhId)
    },
    klassId(state,klassId){
        state.klasId=klassId;
        console.log('klassId',state.klasId)
    },
    gradeId(state,gradeid){
        state.gradeId=gradeid;
        console.log('gradeId',state.gradeId)
    },
    iklassId(state,iklasRowId){
        state.iklassId=iklasRowId;
        console.log('iklasRowId',state.iklassId)
    },
    iClassArray(state,iklassArray){
        state.classArray=iklassArray;
        console.log("state.iclassId",state.classArray)
    }, 
    calendar(state,calendarObj){
        state.calendarobj=calendarObj;
        console.log("state.calendarobj",state.calendarobj)
    },


}
const actions={
    
}
export default new Vuex.Store({
    state,
    mutations,
    actions
})