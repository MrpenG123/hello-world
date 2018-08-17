<template>
<div class="box" ref="ratingW">
<!-- 评分服务 -->
<div class="scroll" >
	<div class="ratings-box border-1px">
		<!-- 左边 -->
		<div class="score-content">
			<div class="all-info">
				<span id="score">3.9</span>
				<span id="title">综合评分</span>
				<span id="msg">高于周边商家69.2%</span>
			</div>
		</div>
		<!-- 右边 -->
		<div class="server-content">
			<div class="attitude">
				<div class="all-dec">
					<div class="first">
						<span id="ser">服务态度</span>
						<star :size="24" :score="seller.score" class="star-cs"></star>
						<span id="point">3.9</span>
					</div>

					<div class="second">
						<span id="ser">服务态度</span>
						<star :size="24" :score="seller.serviceScore" class="star-cs"></star>
						<span id="point">4.0</span>
					</div>

					<div class="time">
						<span id="sp1">送达时间</span>
						<span id="sp2">44分钟</span>
					</div>
				</div>
			</div>
		</div>
	</div><!-- ratings-box -->
	<div class="bg"></div>
	<!-- 选项 -->
	<div class="rating-section">
		<div class="rating-box">
			<div class="box-section">
				<div class="best" @click="select(2,$event)" :class="{'highlight':selectType==2}">
					<!-- 点击设置一个方法select,数字是相当于键名 -->
					<span>全部</span>
					<span id="number">{{ratings.length}}</span></div>
				<div class="better" @click="select(0,$event)" :class="{'highlight':selectType==0}">
					<span>满意</span>
					<span id="number">{{best}}</span></div>
				<div class="bad" @click="select(1,$event)" :class="{'highlight':selectType==1}">
					<span>不满意</span>
					<span id="number">{{bad}}</span></div>
			</div>
			<div class="show-btn">
				<div class="icon-check_circle" id="check" @click="select(3,$event)" :class="{'highlight':selectType==3}"><span id="content">只看有内容的评价</span></div>
			</div>
		</div>
	</div>
	<!-- 评论内容 -->
		<div class="ratings-container">
		<!-- 展示对应内容 -->
			<div v-show="rateShow(val)" v-for="val in ratings">
				<div class="container-box"> 
					<div class="photos">
						<img :src="val.avatar" alt="">
					</div>
					<div class="main-content">
						<div class="per-time">
							<span id="person-name">{{val.username}}</span>
							<span id="time">{{val.rateTime|format}}</span>
						</div>
						<star :size="24" :score="val.score" class="star-cs"></star>
						<span id="regula">{{val.deliveryTime}}分钟送达</span>
						<p id="text" :class="[val.recommend[0]?'':'active']">{{val.text}}</p>
						<!-- 推荐 -->
						<div class="labels" v-if="val.recommend[0]">
							<span :class="val.rateType>0?['icon-thumb_down','gary']:['icon-thumb_up','blue']"></span>
							<a v-for="item in val.recommend">{{item}}</a>
						</div>
					</div>
				</div>
			</div>
		</div>
</div><!-- scroll -->
	<!-- 支付 -->
	<!-- <shopcart></shopcart> -->
</div>
</template>
<script>
import star from "../star/star"// 星星组件
import shopcart from "../shopcart/shopcart"
import { formatDate } from '../../public/js/formatDate'// 时间轴过滤器
import BScroll from "better-scroll"// better-scroll插件
export default {
	// 时间轴过滤器
	filters: {
	format(time) {
		let date = new Date(time);
		return formatDate(date, 'yyyy-MM-dd');
	}
		},
	data(){
		return {
			ratings:[],
			seller:[],
			selectType:2
		}
	},
	methods:{
		_initScoll(){
			this.ratingScroll=new BScroll(this.$refs.ratingW,{
				click:true
			})
		},
	// 点击添加一个方法,
		select(type,event){
			if(!event._constructed){
				return;
			}
			this.selectType=type;
		},
		// 点击切换评论内容(判断selectType的值返回对应的值给v-show调用,从而显示对应的内容)
		rateShow(val){
			if(this.selectType==0){
				return val.rateType==0
			}else if(this.selectType==1){
				return val.rateType==1
			}else if(this.selectType==2){
				return val
			}else if(this.selectType==3){
				return val.text
			}
		}
	},
	created(){
			this.$http.get("/api/ratings").then(response=>{
			response=response.body
			if(response.errno===0){
				this.ratings=response.data
			}
		}),
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
		components:{
			star,
			shopcart
		},
		computed:{
			best(){
				var total=this.ratings.filter(el => {
					return el.rateType===0
				})
				return total.length
				},
			bad(){
				var total=this.ratings.filter(el => {
					return el.rateType===1
				})
				return total.length
				}
			}
}
</script>

<style lang="stylus" scoped>
@import  "../.././public/stylus/mixin.styl"
		.box{
			position:absolute
			top:180px
			bottom:0px
			width:100%
			overflow: hidden
		}
		.ratings-box{
			display: flex;
			border-1px(rgb(147,153,159));
		}
		.ratings-box .score-content{
			width:30%;
		}
		.ratings-box .server-content{
			width: 70%;
			margin:0px 18px;
		}
		.ratings-box .score-content .all-info{
			width: 100%;
			margin: 18px 0px;
			border-right:1px solid #eee;
		}
		.ratings-box .score-content .all-info span{
			display: block;
			width:100%;
			text-align:center;
		}
		.ratings-box .score-content .all-info #score{
			color: rgb(255,153,0);
			font-size: 24px;
			padding-bottom: 6px;
			line-height: 28px;
		}
		.ratings-box .score-content .all-info #title{
			color:rgb(7,17,27);
			font-variant-position: 12px;
			line-height: 12px;
			font-size:12px;
		}
		.ratings-box .score-content .all-info #msg{
			font-size: 10px;
			line-height: 14px;
			padding-top:8px;
			height:12px;
			padding-bottom:18px;
			color:rgba(0, 0, 0, 0.6);
		}
		.ratings-box .server-content .attitude{
			width:100%;
		}
		.ratings-box .server-content .attitude .all-dec{
			margin:18px 0px;
			padding:0px 24px;
		}
		.ratings-box .server-content .attitude .all-dec .first #ser,.second #ser{
			font-size:12px;
			color: rgb(7,17,27);
			line-height:18px;
			padding-right:12px;
		}
		.ratings-box .server-content .attitude .all-dec .first #star,.second #star{
			color:orange;
			padding-right:12px;
		}
		.ratings-box .server-content .attitude .all-dec .first #point,.second #point{
			color:rgb(255, 153, 0);
			font-size:12px;
			line-height:18px;
		}
		.ratings-box .server-content .attitude .all-dec .second,.time{
			margin-top:8px;
		}
		.ratings-box .server-content .attitude .all-dec .time #sp1{
			font-size:12px;
			color: rgb(7,17,27);
			line-height:18px;
			padding-right:12px;
		}
		.ratings-box .server-content .attitude .all-dec .time #sp2{
			font-size:12px;
			color: rgb(147,153,159);
			line-height:18px;
		}
		.bg{
			width:100%;
			height:18px;
			background:rgba(0, 0, 0, 0.1);
		}
		.rating-section{
			width:100%;
			border-1px(rgb(147,153,159));
		}
		.rating-section .rating-box{
			width:100%;
			height:100%;
		}
		.rating-section .box-section{
			padding:18px 0px;
			border-1px(rgb(147,153,159));
			display:flex
			margin:0px 18px;
		}
		.rating-section .box-section div #number{
			font-size:10px
		}
		.rating-section .box-section div{
			height:18px;
			line-height:18px;
			font-size:18px;
			text-align:center;
			display:inline-block;
			padding:4px 8px;
			font-size:14px
		}
		.rating-section .box-section div.highlight{
			background:rgba(255,0,0,0.2)
		}
		.rating-section .box-section div:nth-last-child(-n+2){
			margin-left:8px
		}
		.rating-section .box-section .best{
			background:#00A0DC;
			color:#fff;
		}
		.rating-section .box-section .better{
			background:#CCECF8;
			color:#000;
		}
		.rating-section .box-section .bad{
			background:#E9EBEC;
			color:#000;
		}
		.rating-section .show-btn{
			padding:18px 0px
			margin-left:18px
			position: relative
		}
		.rating-section .show-btn #check,#content{
			color:rgb(147, 153, 159)
		}
		.rating-section .show-btn #check{
			font-size:20px
			position: absolute
			top:8px;
		}
		.rating-section .show-btn #check.highlight{
			color:#00A0DC;
		}
		.rating-section .show-btn #content{
			font-size:12px
			width:100px
			position: absolute
			top:4px
		}
		.ratings-container .container-box{
			margin:18px 18px 0px 18px
			display:flex
			border-1px(rgba(7, 17, 27,0.1))
		}
		.ratings-container .photos img{
			width: 28px 
			height:28px
			border-radius:50%
		}
		.ratings-container .photos{
			flex:0.3
		}
		.ratings-container .main-content{
			flex:9.7
			padding-left:12px
		}
		.ratings-container .main-content span{
			display:inline-block
		}
		.ratings-container .main-content .per-time{
			position: relative
			height:10px
		}
		.ratings-container .main-content #person-name{
			position: absolute
			font-size:10px
			color:rgb(7, 12, 27)
			line-height:12px
		}
		.ratings-container .main-content #time{
			position: absolute
			right:10px
			font-size:10px
			font-weight:200
			color:rgb(147, 153, 159)
			line-height:12px
		}
		.ratings-container .main-content #star{
			display:inline-block
			color:orange
			margin-top:4px
		}
		.ratings-container .main-content #regula{
			padding-right:18px
			font-size:10px
			font-weight:200
			color:rgb(147, 153, 159)
			line-height:12px
		}
		.ratings-container .main-content #text{
			color:rgb(7, 12, 27)
			font-size:12px
			line-height:18px
			margin-top:6px
		}
		.ratings-container .main-content .labels
			margin:8px 0px 18px 0px
			& .blue
				color:#00A0DC
			& .gary
				color:#B7BABF
		.ratings-container .main-content .labels span,a{
			display:inline-block
			margin-left:8px
		}
		.ratings-container .main-content .labels span{
			font-size:12px
			color:rgb(0, 160, 220)
		}
		.ratings-container .main-content .labels a{
			border:1px solid rgba(7, 12, 27,0.1);
			border-radius:2px
			font-size:9px
			color:rgb(147, 153, 159)
			line-height:16px
			padding:0px 6px
			margin-bottom:5px
		}
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
		.active{
			margin-bottom:18px
		}
		.star-cs
			display:inline-block
</style>