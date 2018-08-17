<template>
		<div class="header-main" id="app">
				<!-- 头部 -->
				<div class="top">
					<div class="top-bg" :style="{backgroundImage:'url('+seller.avatar+')'}"></div>
					<div class="picture div-item">
						<img :src="seller.avatar" width="64" height="64">
					</div>
					<div class="left-content div-item">
						<div class="first" v-if="seller.supports">
							<div class="d_icon big" :class="classSum[5]"></div>
							<span id="sp1">{{seller.name}}</span>
						</div>
						<div class="second">
							<p>{{seller.description}}/38分钟送达</p>
						</div>
						<div class="third" v-if="seller.supports">
							<div class="d_icon" :class="classSum[seller.supports[1].type]"></div>
							<span id="sp2">{{seller.supports[1].description}}</span>
						</div>
					<div class="btn" @click="datashow">5个<span>＞</span></div>
					</div>
				</div>
				<div class="bottom-content">
					<a><img src="../../../static/img/bulletin@2x.png"/></a>
					<p ref="runmsg"><marquee>{{seller.bulletin}}</marquee></p>
				</div>
				<!-- 点击展开页 -->
				<transition name="fade">
				<div class="datashow" v-show="datail">
					<div class="datail-content clearfix">
						<div class="main-content">
							<div class="name">
								<span id="name">{{seller.name}}</span>
								<star :size="48" :score="seller.score" class="star-cs"></star>
							</div>
							
							<div class="section-content">
								<div class="h_header">
									<span id="line"></span><span id="text">优惠信息</span><span id="line"></span>
								</div>
								<div class="main">
									<div class="list" v-if="seller.supports" v-for="item in seller.supports">
										<a class="d_icon" :class="classSum[item.type]"></a>
										<span>{{item.description}}</span>
									</div>
								</div>
							</div>
							<!-- 商家公告 -->
							<div class="section-content">
								<div class="h_header">
									<span id="line"></span><span id="text">商家公告</span><span id="line"></span>
								</div>
								<div class="message">
									{{seller.bulletin}}
								</div>
							</div>
						</div>
					</div>
					<!-- 展开后关闭按钮 -->
					<div class="detail-close" @click="close">
						<i class="icon-close"></i>
					</div>
				</div>
				</transition>
		</div>
</template>
<script>
import star from "../star/star"
export default {
	name:'app',
	props:{
		seller:{
			type:Object
		}
	},
	created(){
		this.classSum=['decrease','discount','guarantee','invoice','special','brand']
		console.log(this.seller)
	},
	data(){
		return {
			datail:false,
			sss:''
		}
	},
	methods:{
		go(){
			var str=this.$refs.runmsg.innerText;
			setInterval(function(){
				var start=str.substring(0,1);
				var end=str.substring(1);
				var string=end+start;
				str=string;
				// console.log(str);
			},300)
		},
		datashow(){
			this.datail=true
			// 防止穿透
			var scrollTop = window.pageYOffset||document.documentElement.scrollTop|| document.body.scrollTop||0;
			this.sss=scrollTop;//保存当前滚动条位置
			document.body.style.top=-1*scrollTop+"px";
			document.body.style.position='fixed';
		},
		close(){
			this.datail=false
			document.body.style.overflow='';
			document.body.style.position=null;
			document.body.style.top=null;
			window.scrollTo(0,this.sss);
		}
	},
	components:{
		star
	}
}
</script>
<style lang="stylus" scoped>
@import "../../public/stylus/mixin.styl"
	.header-main .top{
		height:88px;
		padding:24px 0px 0px 24px;
		background:rgba(7,17,27,0.5);
		position:relative;
	}
	.header-main .top .top-bg{
		position:absolute;
		width:100%;
		height:100%;
		background-size:100% 100%
		top:0;
		left:0;
		z-index:-10;
		opacity:0.8;
		filter:blur(10px)
	}
	.header-main .top .div-item{
		float:left;
	}
	.header-main .top .picture img{
		width:64px;
		height:64px;
		border-radius:4px;
	}
	.header-main .top .left-content{
		height:88px;
		margin-left:16px;
		color:#fff;
	}
	.header-main .top .left-content .first{
		position: relative
	}
	.header-main .top .left-content .first .big{
		display: inline-block;
		vertical-align: top;
		width: 30px;
		height: 18px;
		margin-right: 2px;
		background-size: 30px 18px;
		background-repeat: no-repeat;
	}
	.header-main .top .first #sp1{
		font-size:16px;
		display:inline-block;
		margin-left:6px;
		color:#fff;
	}
	.header-main .top .left-content p{
		font-size:12px;
		margin-top:8px;
		font-weight:200;
	}
	.header-main .top .left-content .third{
		height: 15px;
		margin-top: 8px;
		position: relative;
	}
	.header-main .top .left-content .third div{
		position: absolute;
		left:1px;;
		top:1px;
	}
	.header-main .top .left-content .third #sp2{
		margin-left:4px;
		font-size:10px;
		font-weight:200;
		line-height:12px;
		position: absolute;
		top:0px;
		left:12px;
	}
	.header-main .top .btn{
		height:24px;
		width:48px;
		position:absolute;
		right:12px;
		background:rgba(0,0,0,0.2);
		font-size:10px;
		color:#fff;
		border-radius:14px 16px;
		line-height:24px;
		text-align:center;
		bottom:36px;
		cursor:pointer
	}
	.header-main .top .btn span{
		margin-left:2px;
	}
	.header-main .bottom-content{
		height:28px;
		background:rgba(7,17,27,055);
		position: relative
	}
	.header-main .bottom-content  a{
		display:inline-block;
		position: absolute
		left:0px;
	}
	.header-main .bottom-content img{
		width:22px;
		height:12px;
		margin-left:12px;
		vertical-align:middle;
		margin-top:8px
	}
	.header-main .bottom-content span{
		color:#fff;
		font-size:10px;
		line-height:28px;
		margin-right:12px;
		margin-left:38px;
		display:inline-block;
		width:98%;
	}
	.header-main .bottom-content p{
		display:inline-block
		color:white
		font-size:10px
		line-height:28px
		position: absolute
		left:38px
	}
	.header-main .bottom-content span a{
		margin-left:4px;
		color:#fff;
	}
	.d_icon{
		display: inline-block;
		vertical-align: top;
		width: 12px;
		height: 12px;
		margin-right: 2px;
		background-size: 12px 12px;
		background-repeat: no-repeat;
	}
	// 图标引入
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
	&.brand
		bg-image('brand')
	// Sticky footer布局
	.datashow
		position: fixed
		z-index:99
		left:0
		top:0
		width:100%
		height:100%
		overflow: auto
		background:rgba(7, 17, 27,0.8)
		color:#fff
		.datail-content
			min-height:100%
			width:100%
			.main-content
				margin-top:64px
				padding-bottom:64px
	.detail-close
		position: relative
		width:32px
		height:32px
		margin:-64px auto 0 auto
		clear:both
		font-size:32px
//----------------------------------
	.datashow .name
		margin-top:64px
		text-align:center
	.datashow .name #name
		font-size:16px
		font-weight:700
		line-height:16px
		display:block
	.fade-enter-active,.fade-leave-active
		transition:all 0.8s
	.fade-enter,.fade-leave-to
		opacity:0
	.datashow .section-content
		text-align:center
		font-size:14px
		font-weight:700
		line-height:14px
		position: relative
		margin:0px 36px
	.h_header
		margin:28px 0px 24px 0px
	.datashow .section-content .message
		margin-top:24px
		font-size:12px
		font-weight:200
		line-height:24px
	.datashow .section-content #line
		display:inline-block
		width:35%
		border:1px solid rgba(255, 255, 255,0.2)
	.datashow .section-content #text
		vertical-align: middle;
		vertical-align: -20%;
		margin:0 12px
	.datashow .section-content .main
		margin-bottom:28px
	.datashow .section-content .list
		position: relative
		height:16px
	.datashow .section-content .main a
		position: absolute
		left:0
		top:0
		display:inline-block
		width:16px
		height:16px
	.datashow .section-content .main span
		position: absolute
		left:22px
		top:0
		display:inline-block
		font-size:12px
		font-weight:200
		line-height:12px
	.star-cs
		margin-top:16px
</style>