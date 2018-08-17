import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods/goods'
import ratings from '../components/ratings/ratings'
import seller from '../components/seller/seller'
import header from '../components/header/header'
import VueResource from 'vue-resource' //远程获取数据

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'goods'
    },
    {
      path: '/goods',
      component:goods
    },
    {
      path: '/ratings',
      component:ratings
    },
    {
      path: '/seller',
      component:seller
    }
  ],
  	linkActiveClass:"active"
})
