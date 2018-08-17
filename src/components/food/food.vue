<template>
	<!-- 商品详情页 -->
	<div class="shop-details" v-show="showsection">
		<div class="shop-box">
			<div class="content">
				<!-- 图片展示 -->
				<div class="photo">
					<img :src="food.image" alt="" height="375">
					<span @click="hiddenSection"><a class="icon-arrow_lift"></a></span>
				</div>
				<div class="content">
					<div class="top">
						<p>{{food.name}}</p>
						<span id="sell">月售{{food.sellCount}}份</span>
						<span id="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="_bottom">
						<div class="pic-box">
							<span id="price">￥{{food.price}}</span>
							<span id="oldprice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
						</div>
						<div class="shopcar" @click="addTo">加入购物车</div>
					</div>
				</div>
				<div class="bg"></div>
				<div class="mes">
					<p>商品信息</p>
					<span>{{food.info}}</span>
				</div>
				<div class="bg"></div>
				<div class="rating-container">
					<div class="main">
						<p>商品评价</p>
						<div class="smallBox">
							<span>全部11</span>
							<span>推荐12</span>
							<span>吐槽14</span>
						</div>
						<div class="onlysee">
							<i class="icon-check_circle"></i>
							<span>只看有内容的评价</span>
						</div>
					</div>
				</div>
				<div class="ratings-section">
					<div class="list" v-for="val in food.ratings" v-if="val.text">
						<div class="msg">
							<span id="time">{{val.rateTime|format}}</span>
							<div class="right">
								<span id="username">{{val.username}}</span>
								<img :src="val.avatar" alt="">
							</div>
						</div>
						<div class="til">
							<i :class="val.rateType>0?['icon-thumb_down','high2']:['icon-thumb_up','high1']"></i><span>{{val.text}}</span>
							<p>{{food.text}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 购物车 -->
		<shopcart></shopcart>
	</div>
</template>
<script>
import  "../../public/style.css"
import { formatDate } from '../../public/js/formatDate'// 时间轴过滤器
import shopcart from "../shopcart/shopcart"
import BScroll from "better-scroll"
export default {
		props:{
			food:{}
		},
		computed: {
			favoriteText() {
			return this.food.text?'':'暂时没有评论哦！';
			}
		},
		data(){
			return{
				showsection:true
			}
		},
		filters: {
			format(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		components:{
			shopcart
		},
		methods:{
			addTo(){
				
			},
			hiddenSection(){
				this.showsection=!this.showsection
			}
		}
}
</script>
<style lang="stylus" scoped>
@import "../../public/stylus/mixin.styl"
.shop-details
	position: fixed
	z-index:99
	left:0
	top:0
	width:100%
	height:100%
	overflow: auto
	background:#fff
	color:#000
	.shop-box
		min-height:100%
		width:100%
		.content
			padding-bottom:48px
			.photo
				height:375px
				position:relative
				overflow: hidden
				& img
					position:absolute
					top:0
					left:50%
					margin-left:-187.5px
				& span
					display:inline-block
					width:30px
					height:30px
					background:rgba(255,255,255,0.5)
					position:absolute
					z-index:10
					top:30px
					left:10px
					border-radius:50%
					text-align:center
					&:hover
						background:rgba(255,255,255,0.2)
					& a
						position:absolute
						width:80%
						height:80%
						top:50%
						margin-top:-9px
						left:50%
						margin-left:-13px
						color:rgba(0, 0, 0, 0.8)
						&:hover
							color:rgba(255,255,255,0.5)
			.content
				padding:18px
				& p
					font-size:14px
					font-weight:700
					color:rgb(7,17,27)
					list-height:14px
					margin-bottom:8px
				& span
					color:rgb(147,157,159)
					font-size:10px
					list-height:10px
			._bottom
				padding:18px 0px 0px 0px
				display:flex
				& #price
					font-size:14px
					font-weight:normal
					color:rgb(240,20,20)
					line-height:24px
				& #oldprice
					font-size:10px
					font-weight:normal
					color:rgb(147,157,159)
					line-height:24px
					color:rgb(147,157,159)
					text-decoration: line-through;
				& .pic-box
					flex:7
				& .shopcar
					width:74px
					font-size:10px
					color:#fff
					border-radius:24px
					background:rgb(0,160,220)
					text-align:center
					padding-top:5px
		.bg
			height:18px
			background:#f3f5f7
			border-1px(rgba(7,17,27,0.1))
			border-1-px(rgba(7,17,27,0.1))
		.mes
			color:#000
			padding:18px 
			& p
				margin-bottom:6px
				font-size:14px
			& span
				font-size:12px
				font-weight:200
				color:rgb(77,85,93)
				line-height:24px
		.rating-container
			border-1px(rgba(7,17,27,0.1))
			& .main
				padding:18px
				& p
					font-size:14px
					margin-bottom:18px
				& .smallBox
					border-1px(rgba(7,17,27,0.1))
					& span
						display:inline-block
						font-size:12px
						line-height:16px
						padding:8px 12px
						margin-bottom:18px
						&:first-child
							background:rgb(0,160,220)
							border-radius:12px
							color:#fff
						&:nth-child(2)
							background:rgb(204,236,248)
							border-radius:2px
							color:rgb(77,85,93)
						&:last-child
							background:rgba(77,85,93,0.2)
							border-radius:2px
							color:rgb(77,85,93)
				& .onlysee
					padding:16px 0px
					height:24px
					position:relative
					& i
						font-size:24px
						color:rgb(147,153,159)
						line-height:24px
						position:absolute
					& span
						position:absolute
						left:28px
						top:16px
						font-size:14px
						color:rgb(147,153,159)
						line-height:24px
		& .ratings-section
			padding:0px 18px
			& .list
				padding:16px 0px
				border-1px(rgba(7,17,27,0.1))
				& .msg
					display:flex
					& #time
						flex:8
						font-size:10px
						color:rgb(147,153,159)
						line-height:10px
					& .right
						flex:2
						font-size:10px
						color:rgb(147,153,159)
						line-height:10px
						text-align:right
					& img
						width:12px
						height:12px
						border-radius:50%
				& .til
					& i
						font-size:12px
						line-height:24px
					& .high1
						color:#00A0DC
					& .high2 
						color:#B7BABF
					& span
						font-size:12px
						margin-left:4px
						color:rgb(7,17,27)
</style>