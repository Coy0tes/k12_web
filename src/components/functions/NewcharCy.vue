<template>
        <div class="breadbox">
            <span v-for="(item,index) in breadlist" >
                <router-link :to="item.path">{{item.name}}</router-link>
            </span>
        </div>
</template>
<script>
    export default{
        created() {
          this.getBreadcrumb();
        },
        data() {
            return {
                breadlist: '' // 路由集合
            }
        },
        methods: {
            getBreadcrumb() {
                var breadNumber= this.$route.query.breadNum || 1;//url变量breadNum记录层级，默认为1，如果大于1，要添加上变量；
                var breadLength=this.$store.state.breadListState.length;//目前breadlist集合数组个数
                var curName=this.$route.name;
                var curPath=this.$route.fullPath;
                var newBread={name:curName,path:curPath};
                var ishome=curName=='首页';
                console.log(ishome);
                if(breadNumber===1){//点击一级菜单
                    this.$store.commit('breadListStateRemove',1);//初始化，只有首页面包屑按钮
                    if(!ishome)//如果不是首页
                        this.$store.commit('breadListStateAdd',newBread);//当前页面添加到breadlist集合
                }
                else if(breadLength<=breadNumber){//如果不是一级导航，并且breadlist集合个数等于或者小于目前层级
                    this.$store.commit('breadListStateAdd',newBread);//要把当前路由添加到breadlist集合
                }else{
                    this.$store.commit('breadListStateRemove',parseInt(breadNumber)+1);//如果往回点面包屑导航，截取；
                }
                this.breadlist=this.$store.state.breadListState;
                console.log(this.breadlist);
            }
        },
        watch: {
            $route () {
                this.getBreadcrumb();
            }
        },
    }
</script>