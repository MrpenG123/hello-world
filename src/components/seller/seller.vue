<template>
	<div class="app" ref="boxW">
	<div class="inside-box">
		<!-- 收藏 -->
		<div class="top-main">
			<div class="colletion" >
				<span id="name">{{seller.name}}</span>
				<div class="sells">
					<star :size="36" :score="seller.score" class="star-cs"></star>
					<span id="num1">(666)</span>
					<span id="num2">月售{{seller.sellCount}}单</span>
				</div>
			</div>
			<div class="heart" @click="toggleFavorite">
				<i class="icon-favorite" :class="{active:favorite}"></i>
				<span>{{favoriteText}}</span>
			</div>
		</div>
		<!-- 一般信息 -->
		<div class="footer-main">
			<div class="main-box">
				<div>
					<span>起送价</span>
					<span>20<a>元</a></span>
				</div>
				<div class="middle-item">
					<span>商家配送</span>
					<span>4<a>元</a></span>
				</div>
				<div>
					<span>平均配送时间</span>
					<span>39<a>分钟</a></span>
				</div>
			</div>
		</div>
		<div class="bg-div"></div>
		<!-- 公告 -->
		<div class="announcement">
			<h3>公告与活动</h3>
			<div class="container">
				{{seller.bulletin}}
			</div>
		</div>
		<!-- 介绍信息 -->
		<div class="special-msg" v-for="val in seller.supports" v-if="seller.supports">
			<div class="list-box">
				<a class="d_icon" :class="classSum[val.type]"></a>
				<span class="list">{{val.description}}</span>
			</div>
		</div>
		<div class="bg-div"></div>
		<!-- 图片 -->
		<div class="picture-container">
		<h4>商家实景</h4>
			<div class="box" ref="picW">
				<div class="pics">
					<img :src="item" alt=""  v-for="item in seller.pics">
				</div>
			</div>
		</div>
		<div class="bg-div"></div>
		<!-- 商家信息 -->
		<div class="merchant">
			<h4>商家信息</h4>
			<div class="merchant-info" v-for="val in seller.infos">
				<span  class="list">{{val}}</span>
				<span class="list_after"></span>
			</div>
		</div>
			</div>
		<!-- 底部 -->
		<!-- <shopcart></shopcart> -->
	</div>
</template>

<script>
import star from "../star/star"
import shopcart from "../shopcart/shopcart"
import BScroll from "better-scroll"
export default {
		data(){
			return {
				seller:'',
				favorite: (() => {
				if (!window.localStorage.favorite) {
				return false;
				} else {
				let favorite = JSON.parse(localStorage.favorite);
				return favorite || false;
				}
			})()
			}
		},
		created(){
			// 将图标名称设为一个数组
			this.classSum=['decrease','discount','guarantee','invoice','special']
			this.$http.get("/api/seller").then(response=>{
			response=response.body
			if(response.errno===0){
				this.seller=response.data
				this.$nextTick(()=>{
					this._initScoll()
				})
			}
		})
	},
	methods:{
		_initScoll(){
			// 实例化BScorll
			this.picScroll=new BScroll(this.$refs.picW,{
				scrollX:true//开启横坐标方向滚动
			})
			this.boxScroll=new BScroll(this.$refs.boxW,{
				click:true
			})
		},
		toggleFavorite(){
			this.favorite = !this.favorite;
			let storage = window.localStorage;
			storage.favorite = this.favorite;
		}
	},
	computed:{
			favoriteText(){
				return this.favorite ? "已收藏" : "收藏";
			}
	},
		components:{
			star,
			shopcart
		}
}
</script>
<style lang="stylus" scoped>
@import  "../.././public/stylus/mixin.styl"
		.app
			position:absolute
			top:180px
			bottom:0px
			width:100%
			overflow: hidden
		.top-main
			margin:0px 18px
			border-1px(rgba(7, 17, 27,0.1))
			position: relative
		.top-main .colletion,.heart
			display:inline-block
		.top-main .colletion
			padding:18px 0px
		.top-main .colletion #name
			font-size:14px
			color:rgb(7,17,27)
			line-height:14px
		.top-main .colletion .sells
			margin-top:8px
		.top-main .colletion .sells #star
			color:orange
		.top-main .colletion .sells #num1
			margin-left:8px
			font-size:10px
			line-height:18px
		.top-main .colletion .sells #num2
			margin-left:12px
			font-size:10px
			line-height:18px
		.top-main .heart
			position: absolute
			right:18px
			top:18px
			width:40px;
			height:40px
		.top-main .heart i
			display:block
			font-size:24px
			margin-left:8px
			&.active
				color:red
		.top-main .heart span
			display:block
			width:100%
			text-align:center
			font-size:10px
			color:rgb(77,85,93)
			line-height:10px
		.footer-main .main-box
			margin:0px 18px
			padding:18px 0px
			display:flex
		.footer-main .main-box div
			flex:1
		.footer-main .main-box .middle-item
			border-left:1px solid rgba(7, 17, 27,0.1)
			border-right:1px solid rgba(7, 17, 27,0.1)
		.footer-main .main-box div span
			display:block
			width: 100%
			text-align:center
		.footer-main .main-box div span:first-child
			font-size:10px
			color:rgb(147, 153, 159)
			line-height:10px
			margin-bottom:4px
		.footer-main .main-box div span:last-child
			font-size:24px
			font-weight:200
			color:rgb(7, 17, 27)
			line-height:24px
		.footer-main .main-box div span:last-child a
			font-size:10px
			font-weight:200
			color:rgb(7, 17, 27)
			line-height:12px
		.bg-div
			height:18px
			background:rgba(7, 17, 27,0.1)
			border-1px(rgba(7, 17, 27,0.2))
			border-1-px(rgba(7, 17, 27,0.2))
		.announcement
			margin:18px 18px 0px 18px
		.container
			padding:8px 12px 16px 12px
			font-size:12px
			font-weight:200
			color:rgb(240,20,20)
			line-height:24px
			border-1px(rgba(7, 17, 27,0.2))
		.special-msg
			margin:0px 18px
		.d_icon{
		display: inline-block;
		vertical-align: top;
		width: 16px;
		height: 16px;
		margin-right: 2px;
		background-size: 16px 16px;
		background-repeat: no-repeat;
		}
		&.decrease
			bg-image('decrease_1')
		&.discount
			bg-image('discount_1')
		&.guarantee
			bg-image('guarantee_1')
		&.invoice
			bg-image('invoice_1')
		&.special
			bg-image('special_1')
		.list-box
			padding:16px 12px
			border-1px(rgba(7, 17, 27,0.1))
		.list-box span
			font-size:12px
			font-weight:200
			color:rgb(7, 17, 27)
			line-height:16px
		.picture-container
			padding:18px 0px 18px 18px
			position:relative
			width:100%
			margin-left:-18px
			& h4
				padding-left:18px
				margin-bottom:12px
			.box
				overflow: hidden
				width:100%
				.pics
					min-width:504px
					overflow: hidden
					
					& img
						width: 120px
						height:90px
						margin-left:6px
						float:left
						
		.merchant 
			margin:18px 18px 65px 18px
		.merchant h4
			margin:16px 0px
			
		.merchant-info
			padding:16px 12px
			border-1px(rgba(7, 17, 27,0.1))
		.merchant-info span
			font-size:12px
			font-weight:200
			color:rgb(7,17,27)
			line-height:16px
		.star-cs
			display:inline-block
		.footer-col{
			width: 100%;
			height: 47px;
			background:#141d27;;
			position: fixed;
			bottom: 0;
			left: 0;
		}
		.footer-col .car-box{
			width: 56px;
			height: 56px;
			border-radius: 50%;
			background:#141d27;
			position: absolute;
			top:-11px;
			left: 10px;
			z-index: 2;
		}
		.footer-col .shop-car{
			font-size: 24px;
			line-height: 44px;
			text-align: center;
			border-radius: 50%;
			width: 44px;
			height: 44px;
			color: rgba(255,255,255,0.4);
			background: rgba(0,0,0,0.2);
			position: absolute;
			left: 50%;
			margin-left:-22px;
			top: 50%;
			margin-top:-22px;
			z-index: 3;
		}
		.footer-col .pricenum{
			width: 170px;
			height: 23px;
			position: absolute;
			left: 60px;
			top:11px;
			line-height: 24px;
			display: flex;
		}
		.footer-col .pricenum #yuan{
			width: 20%;
			font-size: 24px;
			color: rgba(255,255,255,0.4);
			border-right: 1px solid rgba(255,255,255,0.1);
			padding-right: 12px;
		}
		.footer-col .pricenum #fei{
			width: 80%;
			padding-left: 8px;
			font-size: 14px;
			color: rgba(255,255,255,0.4);
		}
		.footer-col .starprice{
			width: 105px;
			height: 100%;
			background: rgba(255,255,255,0.1);
			position: absolute;
			right: 0;
			top: 0;
			color:  rgba(255,255,255,0.4);
			line-height: 47px;
			text-align: center;
			font-weight: 700;
		}
</style>

