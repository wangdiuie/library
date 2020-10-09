<template>
	<view class="container">
		<view class="select_date" @click="date">
			<view class="left">使用日期</view> <view class="right"> 
			{{chooseDate==''?(month+'月'+day+'日-周'+(week==0?7:week)):chooseDate}}
			</text>
			<image :src="arrow" mode=""></image>
			</view>
		</view>
		<view class="select_date" @click="time">
			<view class="left">开始时间</view> <view class="right"><image :src="arrow" mode=""></image></view>
		</view>
		<view class="select_date">
			<view class="left">使用时长</view> <view class="right"><image :src="arrow" mode=""></image></view>
		</view>
		<view class="select_date" @click="openChooseModal">
			<view class="left">使用人数</view> <view class="right"><text>{{people}}人</text><image :src="arrow" mode=""></image></view>
		</view>
		
		
		<view class="shade" v-if="shade" @click="this.shade=false">
			<view class="date" >
				<view class="today" @click="chooseDay(0)">
					<text>{{month}}月{{day}}日</text><text>-周{{week==0?7:week}}</text>
				</view>
				<view class="tomorrow" @click="chooseDay(1)">
					<text>{{tomorrow}}日</text><text>-周{{week==0?1:week+1}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getDay} from '../../static/function/getday.js'
	export default {
		data() {
			return {
				arrow:'../../static/img/arrow.svg',
				month:'', //几月
				day:'',  //几日
				week:'',  //星期几
				people:'1',
				shade:false,  //遮罩
				tomorrow: '',
				chooseDate: ''
			}
		},
		methods: {
			date(){
				this.shade=true
			},
			time(){
			},
			openChooseModal(){
				let that=this
				uni.showActionSheet({
				    itemList: ['1', '2', '3','4'],
				    success: function (res) {
							that.people=res.tapIndex + 1
							  console.log(res)
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				    }
				})
			},
			chooseDay(i) {
				const {month,day,week,tomorrow} = this
				if(i==0){
					this.chooseDate = month+"月"+day+"日-周"+(week==0?7:week)
				}else{
					this.chooseDate = tomorrow+"日-周"+(week==0?1:week+1)
				}
			}
		},
		onLoad(){
			let date=new Date()
			this.day=date.getDate().toString().length==1?'0'+date.getDate():date.getDate()
			this.month=date.getMonth()+1
			this.week=date.getDay()
			this.tomorrow=getDay(1,'月').slice(5)
		}
 }		
</script>

<style lang="less" scoped>
.container{
	.select_date{
		border-bottom: 1rpx solid #C0C0C0;
		height: 100rpx;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		.left{
			flex: 1;
		}
		.right{
			flex: 1;
			text-align: right;
			image{
				margin-left: 30rpx;
				width: 20rpx;
				height: 20rpx;
			}
		}
	}
	
	.shade{
		background-color: rgba(0,0,0,0.5);
		height: 100vh;
		width: 100vw;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		.date{
			height: 200rpx;
			width: 500rpx;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			padding: 30rpx;
			border-radius: 30rpx;
			.today{
				flex:1;
				padding:0 20rpx; 
				border-bottom: 1px solid #C0C0C0;
				display: flex;
				align-items: center;
			}
			.tomorrow{
				flex:1;
				padding:0 20rpx; 
				display: flex;
				align-items: center;
			}
		}
	}
}
</style>