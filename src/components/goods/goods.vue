<template>
	<div class="footer-con" id='app'>
		<!-- 左边栏 -->
		<div class="left" ref="menuW">
			<ul>
				<li v-for="(val,key) in goods" class="menu-item" :class="{'current':currentIndex===key}" @click="selectMenu(key,$event)">
					<a><span v-if="val.type>0" class="d_icon" :class="classSum[val.type]"></span>{{val.name}}</a>
				</li>
			</ul>
		</div>
		<!-- 右边内容区 -->
	<div class="right" ref="foodW">
		<ul>
			<li v-for="(val,key) in goods" class="food-list-hook">
				<p>{{val.name}}</p>
				<ul>
					<li v-for="(item,key) in val.foods" class="content">
						<div class="msg-box">
							<div class="left-main">
							<img :src="item.icon" alt=""  @click="selectFood(item)">
						</div>
						<div class="right-main">
							<span id="title">{{item.name}}</span>
							<span id="msg" v-if="item.description">{{item.description}}</span>
							<span id="sell">月售{{item.sellCount}}</span>
							<span id="rating">好评率{{item.rating}}</span>
							<div class="price-box">
								<span id="price">￥{{item.price}}</span><span id="oldprice" v-if="item.oldPrice">{{item.oldPrice}}</span>
							</div>
							<!-- 加减按钮 -->
							<div class="count-btn">
							<!-- item是已经遍历出来的每一项了，所以增加减少显示count会独立进行 -->
								<cartcontrol :foods="item"></cartcontrol>
							</div>
						</div>
						</div>
					</li>
				</ul>
			</li>
		</ul>
	</div>
	<!-- 购物车栏 -->
		<shopcart :select-foods="selectFoods" :dPrice="seller.deliveryPrice" :mPrice="seller.minPrice"></shopcart>
		<!-- flagtrue显示 -->
		<transition name="showDetail">
			<food v-show="flag" :food="selectedFood"></food>
		</transition>
</div>
</template>
<script>
import  "../../public/style.css"
import BScroll from "better-scroll"
import food from "../food/food"
import shopcart from "../shopcart/shopcart"
import cartcontrol from "../cartcontrol/cartcontrol"
export default {
	components:{
		food,//内容
		shopcart,
		cartcontrol
	},
	data(){
		return {
			num:"",
			flag:false,
			goods:[],
			seller:{},
			listHeight:[],//最终储存累积的每一个区间的高度
			scrollY:0,
			selectedFood:{}
		};
	},
	created(){
		// 图标定义为一个数组
		this.classSum=['decrease','discount','special'];
		this.$http.get("/api/goods").then(response=>{
			response=response.body
			if(response.errno===0){
				this.goods=response.data
				this.$nextTick(()=>{
					this._initScoll()
					this._sumHeight()
				})
			}
		}),
		// 获取seller的deliveryPrice和minPrice
		this.classSum=['decrease','discount','special'];
		this.$http.get("/api/seller").then(response=>{
			response=response.body
			if(response.errno===0){
				this.seller=response.data
				
			}
		})
	},
	computed:{
		//计算当前的区间index
		currentIndex(){
			for (var i = 0; i <this.listHeight.length; i++) {
				// 获取上下两个区间的高度
				var height1=this.listHeight[i]
				var height2=this.listHeight[i+1]
				if(!height2 || this.scrollY>=height1 && this.scrollY<height2){
					return i
				}
			}
			return 0
		},
		selectFoods(){
			var foods=[]
			// 初始化存储的食物
			this.goods.forEach((good)=>{
				good.foods.forEach((food)=>{
					if (food.count) {//说明选择了食物
						foods.push(food)
					}
				})
			})
			return foods
		}
	},
	methods:{
		add(value){
			this.num++;
		},
		cut(){
			this.num--
			if(this.num==0){
				this.num=''
			}
		},
		details(key){
			this.flag=true
		},
		selectMenu(key,event){
			if(!event._constructed){
				return
			}
			var foodlist=this.$refs.foodW.getElementsByClassName('food-list-hook')
			var el=foodlist[key]//获取左边按钮对应的右边区域
			this.foodScroll.scrollToElement(el,50)
		},
		_initScoll(){
			this.menuScroll=new BScroll(this.$refs.menuW,{
				click:true
			})
			this.foodScroll=new BScroll(this.$refs.foodW,{
				probeType:3,
				click:true
			})
			this.foodScroll.on("scroll",(pos)=>{
				this.scrollY=Math.abs(Math.round(pos.y))
			})
			
		},
		_sumHeight(){
			// 获取每一个类别区间
			var foodlist=this.$refs.foodW.getElementsByClassName('food-list-hook')
			// 初始化高度
			var height=0
			this.listHeight.push(height)
			for (var i = 0; i < foodlist.length; i++) {
				var item=foodlist[i]//获取每一个类别区间的元素
				height+=item.clientHeight//获取每一类别累加的高度
				this.listHeight.push(height)
			}
		},
		selectFood(food){
			this.flag=true
			this.selectedFood=food
		}

	}
}
</script>
<style lang="stylus" scoped>
@import "../../public/stylus/mixin.styl"
		.footer-con{
			display: flex;
			position: absolute;
			top: 180px;
			bottom: 47px;
			width: 100%;
			overflow: hidden;
		}
		.footer-con .left{
			background: #f3f5f7;
			display: 0 0 80px;
			width: 80px;
		}
		.footer-con .left li{
			width: 100%;
			height: 54px;
			text-align:center;
			font-size:12px;
			font-weight: 200;
			color: rgb(240,20,20);
			position: relative;
			display: table;
			border-1px(rgba(7,17,27,0.1));
		}
		/*food关联menu的高亮*/
		.footer-con .left .menu-item.current{
			background:#fff;
			color:rgb(240,20,20)
		}
		.footer-con .left li::after{
			content:"";
			position: absolute;
			left: 12px;
			bottom: 0;
			width: 54px;
			height: 100%;
		}
		.footer-con .left li a{
			display: block;
			width: 56px;
			height: 24px;
			margin-left:12px;
			top:17px;
			line-height: 11px;
			position: absolute;
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
		 /*图标引入*/
			&.decrease
				bg-image('decrease_3')
			&.discount
				bg-image('discount_3')
			&.special
				bg-image('special_3')
		.footer-con .right{
			flex: 1;
		}
		.footer-con .right p{
			height: 26px;
			width: 100%;
			border-left:3px solid #d9dde1;
			line-height:26px;
			font-size: 12px;
			color: rgb(147,153,159);
			background: #f3f5f7;
			padding-left: 14px;
		}
		.footer-con .right ul li .content .left-main img{
			width: 57px;
			height: 57px;
		}
		.footer-con .right ul li .content{
			display: flex
			position:relative
		}
		.footer-con .right ul li .content .count-btn{
			position:absolute
			bottom:0px
			right:8px
		}
		.footer-con .right ul li .content .msg-box{
			width: 98%;
			height: 100%;
			padding: 18px 0px 0px 0px;
			border-1px(rgba(7,17,27,0.1));
			margin-left: 18px;
			margin-right: 18px;
			position: relative;
			display: flex;
		}
		.footer-con .right ul li .content .right-main{
			flex:8;
			padding-left: 10px;
			position: relative;
		}
		.footer-con .right ul li .content .left-main,.right-main{
			float: left;
		}
		.footer-con .right ul li .content .right-main span{
			display: block;
			font-size: 10px;
		}
		.footer-con .right ul li .content .right-main #title{
			font-size: 14px;
		}
		.footer-con .right ul li .content .right-main #msg{
			margin-top: 8px;
			color: rgb(147,153,159);
		}
		.footer-con .right ul li .content .right-main #sell,#rating{
			display: inline-block;
			margin-top: 8px;
			color: rgb(147,153,159);
		}
		.footer-con .right ul li .content .right-main #rating{
			margin-left: 12px;
		}
		.footer-con .right ul li .content .right-main #price{
			margin-bottom: 18px;
			margin-top: 8px;
			color: red;
			font-weight: 700;
			display: inline-block;
		}
		.footer-con .right ul li .content .right-main #oldprice{
			display: inline-block;
			font-size: 10px;
			margin-left: 8px;
			color: rgb(147,153,159);
			line-height:24px;
			text-decoration: line-through;
		}
		.footer-con .right ul li .content .right-main .btn{
			position: absolute;
			right: 0px;
			bottom: 8px;
			height: 24px;
			display: flex;
		}
		.footer-con .right ul li .content .right-main .btn span{
			display: block;
			height: 100%;
			font-size: 24px;
			flex: 1;
			color: rgb(0,160,220);
			text-align: center;
			line-height: 24px;
			width: 24px;
		}
		.footer-con .right ul li .content .right-main #num{
			font-size: 10px;
			color: rgb(147,153,159);
		}
		.footer-con .footer-col{
			width: 100%;
			height: 47px;
			background:#141d27;;
			position: fixed;
			bottom: 0;
			left: 0;
		}
		.footer-con .footer-col .car-box{
			width: 56px;
			height: 56px;
			border-radius: 50%;
			background:#141d27;
			position: absolute;
			top:-11px;
			left: 10px;
			z-index: 2;
		}
		.footer-con .footer-col .shop-car{
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
		.footer-con .footer-col .pricenum{
			width: 170px;
			height: 23px;
			position: absolute;
			left: 60px;
			top:11px;
			line-height: 24px;
			display: flex;
		}
		.footer-con .footer-col .pricenum #yuan{
			width: 20%;
			font-size: 24px;
			color: rgba(255,255,255,0.4);
			border-right: 1px solid rgba(255,255,255,0.1);
			padding-right: 12px;
		}
		.footer-con .footer-col .pricenum #fei{
			width: 80%;
			padding-left: 8px;
			font-size: 14px;
			color: rgba(255,255,255,0.4);
		}
		.footer-con .footer-col .starprice{
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
		.showDetail-enter-active,.showDetail-leave-active{
			transition:all 0.8s;
		}
		.showDetail-enter,.showDetail-leave-to{
			opacity:0
		}
		
</style>