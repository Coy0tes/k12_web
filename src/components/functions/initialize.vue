<template>
    <div>
        <el-form >
          <el-form-item clsaa="addklassForm" >
           <span>菜名</span> <el-input class='addKlass' v-model='klassName'></el-input>


          
           <el-button type="primary" @click="putKlass">查询</el-button>
          </el-form-item>

          <el-form-item label="" >
         <!--     <li v-for='item in items'>
                 {{item.}}
             </li> -->
          </el-form-item>
        
        </el-form>
    </div>
</template>
<script>
  

    // 传参并指定回调执行函数为onBack
  



    // 回调执行函数

    export default {
        data(){
            return {
                form: {
                    klassName: '',
                    klassDescription: '',
                },
                a:''
            }





                 
        },
        methods:{

            putKlass(){
    //             var script = document.createElement('script');
    // script.type = 'text/javascript';
    //               script.src = 'http://apis.juhe.cn/cook/query.php?menu=%E5%B0%8F%E7%82%92%E8%82%89&dtype=json&key=327de8f9e36fb2d260a70105181239a0&callback=onBack';
    //           document.head.appendChild(script);
    //         this.onBack();
                // console.log(head)


                this.$http.jsonp('http://apis.juhe.cn/cook/query.php?menu='+this.klassName+'&dtype=json&key=327de8f9e36fb2d260a70105181239a0&callback=onBack', {
                        params: {},
                        jsonp: 'onBack'
                    }).then((res) => {
                        console.log('111111111111111111',res,this.putKlass); 
                    })
             
             },
   
        }
    }
</script>
<style>
    .addKlass{
        width: 200px;
        height: 40px;
    }
    .addklassForm{
        vertical-align: baseline;
    }
</style>