<template>
	<view class="container">
		<view class="image"><image :src="library" mode=""></image></view>
		<view class="topfont">图书馆座位预约系统</view>
		
		<view class="" v-show="show">
			<view class="login">
				<text class="login_text">账号</text><input type="text" v-model="account" placeholder="账号/手机号/邮箱" />
			</view>
			<view class="login">
				<text class="login_text">密码</text><input type="text" :password="eye" v-model="password" placeholder="请输入密码" />
				  <view class="eye" @click="eyeClick">
					<image v-show="eye" :src="open" mode=""></image><image v-show="!eye" :src="close" mode=""></image>
					</view>
			</view>
			<view class="button" @click="login">
				登录
			</view>
			<view class="bottom_text">没有账号？去<text class="go" @click="goRegister">注册</text></view>
		</view>
		
		<view class="" v-show="!show">
			<view class="login">
				<text class="login_text">账号</text><input type="text" v-model="account" placeholder="请输入账号/手机号/邮箱" />
			</view>
			<view class="login">
				<text class="login_text">密码</text><input type="text" :password="eye" v-model="password" placeholder="请输入密码" />
				<view class="eye" @click="eyeClick">
				<image v-show="eye" :src="open" mode=""></image><image v-show="!eye" :src="close" mode=""></image>
				</view>
			</view>
			<view class="login">
				<text class="login_text">密码</text><input type="text" :password="eye2" v-model="password2" placeholder="请再次输入密码" />
				<view class="eye" @click="eyeClick2">
				<image v-show="eye2" :src="open" mode=""></image><image v-show="!eye2" :src="close" mode=""></image>
				</view>
			</view>
			<view class="button" @click="register">
				注册
			</view>
			<view class="bottom_text">已有账号？去<text class="go" @click="goLogin">登录</text></view>
		</view>
		
	</view>
</template>

<script>
	import {ajax} from '../../static/ajax/ajax.js'
	export default {
		data() {
			return {
				 show:true,
				 eye:true,
				 eye2:true,
				 account:'',
				 password:'',
				 password2:'',
				 library:'../../static/img/library.svg',
				 open:'../../static/img/open.svg',
				 close:'../../static/img/close.svg'
			}
		},
		methods: {
       goRegister(){
				 this.show=false
			 },
			 goLogin(){
				 this.show=true
			 },
			 eyeClick(){
				 this.eye=!this.eye
			 },
			 eyeClick2(){
			 	 this.eye2=!this.eye2
			 },
			 async login(){
				 const {account,password} = this
				 if(account==''||password=='') return uni.showToast({
				 	title: '账号密码不能为空',
				 	mask:true,
				 	icon:'none'
				 })
				const res =await ajax({
					 url:'/login',
					 data: {
					 	 account,
					 	 password
					 }
				 })
				 if(res =="success"){
					 uni.switchTab({
					     url: '/pages/index/mine'
					 })
				 }
			 },
			 async register(){
				 const {account,password,password2} = this
				 if(account==''||password==''||password2=='') return uni.showToast({
				 	title: '账号密码不能为空',
					mask:true,
					icon:'none'
				 })
				 if(password!==password2) return uni.showToast({
				 	title: '两次密码不一致！',
					mask:true,
					icon:'none'
				 })
         const res = await ajax({
					 url:'/register',
					 data: {
						 account,
						 password
					 }
				 })			 
				 if(res =="success"){
					 uni.showToast({
					 	title: '账号注册成功',
					 	mask:true,
					 	icon:'success'
					 })
				 }else{
					 uni.showToast({
					 	title: '账号已被注册',
					 	mask:true,
					 	icon:'none'
					 })
				 }
			 }
		}
	}
</script>

<style lang="less" scoped>
.container{
	.image{
		margin-top: 70rpx;
		text-align: center;
		image{
			width:250rpx;
			height: 250rpx;
		}
	}
	.topfont{
		  margin-top: 30rpx;
		  height: 120rpx;
			line-height: 120rpx;
			font-size: 60rpx;
			color:#3288C8;
			text-align:center;
	}
	.login{
		width: 80%;
		border-bottom: 1rpx solid #BABEBC;
		margin:40rpx auto 0;
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		align-items: center;
		.login_text{
			font-size: 38rpx;
			margin-right: 40rpx;
			color: #CFCECE;
		}
		input{
			width: 400rpx;
			font-size: 35rpx;
		}
		.eye{
			margin-left: 20rpx;
			width: 40rpx;
			image{
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
	.button{
		color: #fff;
		margin: 80rpx auto 0;
		width: 80%;
		border-radius: 10rpx;
		background-color:#3288C8;
		font-size: 36rpx;
		line-height: 100rpx;
		text-align: center;
		height: 100rpx;
	}
	.bottom_text{
		margin: 60rpx auto;
		width: 80%;
		text-align: center;
		height: 40rpx;
		font-size: 30rpx;
		line-height: 40rpx;
		.go{
			color:#2AB8ED;
			&:hover{
				cursor:pointer
			}
		}
	}
}
</style>
