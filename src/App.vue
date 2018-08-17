<template>
  <div id="app">
    <test :seller="seller" class="h_top"></test>
    <div class="tab border-1px" >
        <div class="tab-item"><router-link to="/goods">商品</router-link></div>
        <div class="tab-item"><router-link to="/ratings">评价</router-link></div>
        <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <keep-alive>
      <router-view :goods="goods" :ratings="ratings"></router-view>
    </keep-alive>
  </div>
</template>
<script>
import test from  './components/header/header'
export default{
  name:'app',
  data(){
    return {
      seller:{
      },
      goods:{
      },
      ratings:{
      }
    }
  },
  methods:{
    run(){
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 140) {
          document.querySelector('.tab').style.position="fixed";
          document.querySelector('.tab').style.top="0px";
          document.querySelector('.tab').style.left="0";
          document.querySelector('.tab').style.width="100%";
          document.querySelector('.tab').style.zIndex="10";
          document.querySelector('.tab').style.backgroundColor="#fff";
        } else{
          document.querySelector('.tab').style.position="";
          document.querySelector('.tab').style.top="";
          document.querySelector('.tab').style.left="";
          document.querySelector('.tab').style.width="";
          document.querySelector('.tab').style.zIndex="";
          document.querySelector('.tab').style.backgroundColor="";
        }
    }
  },
  created(){
    this.$http.get("/api/seller").then(response=>{
      response=response.body
      if(response.errno===0){
        this.seller=response.data
      }
    }),
    this.$http.get("/api/goods").then(response=>{
      response=response.body
      if(response.errno===0){
        this.goods=response.data
      }
    }),
    this.$http.get("/api/ratings").then(response=>{
      response=response.body
      if(response.errno===0){
        this.ratings=response.data
      }
    })
  },
  mounted(){
    window.addEventListener("scroll",this.run);
  },
    components:{
      test
    }
}
</script>
<style lang="stylus" scoped>
@import  "./public/stylus/mixin.styl"
  .tab{
    display:flex;
    height:40px;
    line-height:40px;
    border-1px(rgb(7,17,27,0.1));
  }
  .tab .tab-item{
    flex:1;
    text-align:center;
  }
  .tab .tab-item a{
    display:block;
  }
  .tab .tab-item a.active{
    color:rgb(240,20,20);
  }
</style>
