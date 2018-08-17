<template>
		<div class="cartcontrol">
			<div class="cart-decrease icon-remove_circle_outline" v-show="foods.count>0" @click="decreaseCart" >
			</div>
			<div class="cart-count" v-show="foods.count>0">{{foods.count}}</div>
			<div class="cart-add icon-add_circle" @click="addCart">
			</div>
		</div>
</template>
<script>
import Vue from "vue"// 一定要引入
export default {
	props:{
		foods:{
			type:Object
		}
	},
	created(){
		// console.log(this.food)
	},
	methods:{
		// 增加
		addCart(event){
			if(!event._constructed){
				return
			}
			if(!this.foods.count){//向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性
				//this.food.count=1
				//通过数组的变异方法（Vue数组变异方法）我们可以动态控制数据的增减，但是我们却无法做到对某一条数据的修改。这时候就需要Vue的内置方法来帮忙了~
				Vue.set(this.foods,"count",1)//这样界面上的food就有count这个属性了
			}else{
				this.foods.count++
			}
		},
		// 减少
		decreaseCart(){
			if(!event._constructed){
				return
			}
			if(this.foods.count){
				this.foods.count--
			}
		}
	}

}
</script>

<style lang="stylus">
	.cartcontrol
		font-size: 0
		.cart-decrease
			display: inline-block
			padding: 6px
			line-height: 24px
			font-size: 24px
		.cart-count
			display: inline-block
			vertical-align: top
			width: 12px
			padding-top: 6px
			line-height: 24px
			text-align: center
			font-size: 10px
			color: rgb(147, 153, 159)
		.cart-add
			display: inline-block
			padding: 6px
			line-height: 24px
			font-size: 24px
			color: rgb(0, 160, 220)
			position: relative





</style>
