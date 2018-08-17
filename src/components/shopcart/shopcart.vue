<template><!-- 购物车 -->
		<div class="shopcart">
			<div class="content" @click="toggleList">
				<div class="content-left">
					<div class="logo-wrapper">
						<div class="logo" :class="{'highlight':totalCount>0}">
							<i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
						</div>
						<div class="num" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
					<div class="desc">另需配送费￥{{dPrice}}元</div>
				</div>
				<div class="content-right" @click.stop.prevent="pay">
					<div class="pay" :class="payClass">
						{{payDesc}}
					</div>
				</div>
			</div>
			<!-- 清空购物车 -->
			<transition name="show">
			<div class="fold" v-show="listShow">
					<div class="top">
						<div id="car">购物车</div>
						<div id="del"  @click="empty">清空</div>
					</div>
					<div class="main" ref="listC">
						<div>
							<ul v-for="val in selectFoods">
								<li>
									<span class="name">{{val.name}}</span>
									<div class="price">￥{{val.price*val.count}}</div>
									<div class="wrapper">
									<cartcontrol :foods="val"></cartcontrol>
									</div>
								</li>
							</ul>
						</div>
					</div>
			</div>
			</transition>
			<div class="list-mark" v-show="listShow" @click="hideList"></div>
		</div>
</template>

<script>
import BScroll from "better-scroll"
import cartcontrol from "../cartcontrol/cartcontrol"
export default {
	props:{
		selectFoods:{
			type:Array,
			default(){
				return [
				
				]
			}
		},
		dPrice:{
			type:Number,
			default:0
		},
		mPrice:{
			type:Number,
			default:0
		}
	},
	data(){
		return {
			goods:{},
			fold:true,
		}
	},
	components:{
		cartcontrol
	},
	computed:{
		totalPrice(){
			var total=0//初始化为0
			this.selectFoods.forEach((food)=>{
				// 计算总价
				total+=food.price*food.count
			})
			return total
		},
		totalCount(){
			var count=0//初始化为0
			this.selectFoods.forEach((food)=>{
				// 统计数量
				count+=food.count
			})
			return count
		},
		payDesc(){
			// 支付信息
			if(this.totalPrice===0){
				return "还需"+this.mPrice+"元起送"
			}else if(this.totalPrice<this.mPrice){
				var diff=this.mPrice-this.totalPrice
				return "还差￥"+diff+"元起送"
			}else{
				return "去结算"
			}
		},
		payClass(){//显示对应高亮
			if(this.totalPrice<this.mPrice){
				return 'none-enough'
			}else{
				return 'enough'
			}
		},
		listShow(){
			if(!this.totalCount){
				this.fold=true
				return false
			}
				var show=!this.fold

				if(show){
					this.$nextTick(() => {
						if(!this.scroll){
						this.scroll=new BScroll(this.$refs.listC,{
							click:true
						})
					}else{
						//当没有选择食物的时候，不实例化Bscroll
						this.scroll.refresh()
					}
					})
				}
				return show
		}

	},
	methods:{
		empty(){
			this.selectFoods.forEach((food)=>{
				food.count=0
			})
		},
		toggleList(){
			if(!this.totalCount){
				return false
			}
			this.fold=!this.fold
		},
		pay() {
			if(this.totalPrice < this.minPrice) {
 			return;
			}
			window.alert("你需要支付"+this.totalPrice+"元")
		},
		hideList(){
			this.fold=true
		}
	}

}
</script>

<style lang="stylus">
@import "../../public/stylus/mixin.styl"
	.shopcart
		position:fixed
		left: 0
		bottom: 0
		z-index: 50
		width: 100%
		height: 48px
		background:#000
		.content
			display: flex
			background: #141d27
			font-size: 0
			color: rgba(255, 255, 255, 0.4)
			.content-left
				flex:1
				.logo-wrapper
					display:inline-block
					vertical-align: top
					position: relative
					top: -10px
					margin: 0 12px
					padding: 6px
					width: 56px
					height: 56px
					box-sizing: border-box
					border-radius: 50%
					background: #141d27
					.logo
						width: 100%
						height: 100%
						border-radius: 50%
						text-align: center
						background: #2b343c
						&.highlight
							background:rgb(0, 160, 220)
						.icon-shopping_cart
							line-height: 44px
							font-size: 24px
							color: #80858a
							&.highlight
								color:#fff
					.num
						position: absolute
						top: 0
						right: 0
						width: 24px
						height: 16px
						line-height: 16px
						text-align: center
						border-radius: 16px
						font-size: 9px
						font-weight: 700
						color: #fff
						background: rgb(240, 20, 20)
						box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
				.price
					display:inline-block
					vertical-align: top
					margin-top: 12px
					line-height: 24px
					padding-right: 12px
					box-sizing: border-box
					border-right: 1px solid rgba(255,255,255,0.1)
					font-size: 16px
					font-weight: 700
					color:rgba(255,255,255,0.4)
					&.highlight
						color: #fff
				.desc
					display:inline-block
					vertical-align: top
					margin: 12px 0 0 12px
					line-height: 24px
					font-size: 10px
			.content-right
				flex: 0 0 105px
				width: 105px
				.pay
					height: 48px
					line-height: 48px
					text-align: center
					font-size: 12px
					font-weight: 700
					background: #2b333b
					&.none-enough
						background: #2b333b
					&.enough
						background:#00b43c
						color: #fff
		.show-enter-active,.show-leave-active
			transition:all 0.8s
		.show-enter,.show-leave-to
			opacity: 0
		.fold 
			position:fixed
			bottom:48px
			width: 100%
			background:#fff
			z-index:-5
			& .top
				display:flex
				height: 40px
				background:#f3f5f7 
				padding:0px 18px
				border-1px(rgba(7,17,27,0.1))
				& div
					flex:5
					line-height:40px
				& #del
					text-align:right
					font-size:12px
					color:rgb(0,160,220)
				& #car
					font-size:14px
					color:rgb(7,17,27)
			& .main
				padding:0px 18px
				max-height:240px
				overflow: hidden
				& li
					padding:12px 0px
					height:48px
					border-1px(rgba(7,17,27,0.1))
					font-size:14px
					color:rgb(7,17,27)
					line-height:48px
					display:flex
					& .name
						height:48px
						flex:7
					& .price
						color:red
					& .wrapper
						margin-top:6px
						margin-left:6px
		.list-mark
			position: fixed
			top: 0
			left: 0
			width: 100%
			height: 100%
			z-index:-40
			backdrop-filter: blur(10px)
			background: rgba(7, 17, 27, 0.6)
</style>
