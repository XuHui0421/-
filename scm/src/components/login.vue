<template>
  <div class="login-bg">
    <div class="login-log">
      <img src="../../static/img/logo.png" alt="">
    </div>
    <div class="login-main">
      <div class="login-main-left">
        <div class="title-wrap">
          <h1 class="title">智慧服务平台</h1>
          <h3 class="sub-title">供应链、区块链、大数据、金融风控 人工智能、产业智连</h3>
        </div>
        <img src="../../static/img/pic.png" alt="">
      </div>
      <div class="login-main-right">
        <div class="main-right-header">
          <div class="header-title">{{passwordLogin ? "密码登录" : "扫码登录"}}</div>
          <div class="header-tip">
            <div class="tip-arrow">
              <em></em>
              <span></span>
            </div>
            <div class="tip-content">{{passwordLogin ? "扫码登录" : "密码登录"}}</div>
          </div>
          <img  v-bind:src='passwordLogin ? "../../static/img/code.png" : "../../static/img/computer.png"' class="login-way-img" alt="" @click="changeLoginWay()">
        </div>
		<div class="login-title">
			智慧精融票据融资服务平台软件
		</div>
		<div class="warning-tip" v-show="userError">
			<img src="../../static/img/tip.png" alt="">
			用户名不存在	 
		</div>
		<el-form :model="loginForm"   ref="loginForm" class="login-form" v-show="passwordLogin" :rules="loginRules">
			<el-form-item label="" prop="name">
    			<el-input placeholder="用户名" type="text" v-model="loginForm.name">
					<template slot="prepend">
						<i class="icon iconfont icon-yonghuming"></i>
					</template>
				</el-input>
  			</el-form-item>
			<el-form-item label="" prop="pass">
    			<el-input placeholder="密码"  type="password" v-model="loginForm.pass">
					<template slot="prepend">
						<i class="icon iconfont icon-mima"></i>
					</template>
				</el-input>
  			</el-form-item>
			
			<div class="password-wrap">
				<el-checkbox v-model="loginForm.rememberPass">记住密码</el-checkbox>
				<router-link to="/forgetPass">忘记密码？</router-link>
			</div>
			<el-button type="primary" class="btn-login" @click="login">登录</el-button>
		</el-form>
		<div class="login-code" v-show="!passwordLogin">
            <div id="WXCode" class="WXCode"></div>
		</div>
      </div>
    </div>
    <div class="login-copyright">
		COPYRIGHT © 2013-2017 智慧精融版权所有 WWW.SCMBANKING.COM 苏ICP备16023411号-1 
	</div>
  </div>
</template>

<style lang="less"> 
@import '../assets/css/page/login.less';

</style>
<script>
export default {
  data(){
	return {
		userError: false, //用户名是否存在
		passwordLogin: true, //是否是密码登录
		qrcode: '',//二维码
		loginForm: {
			name: '',
			pass: '',
			rememberPass: false
		},
		loginRules: {
			name: [
				{ required: true, message: '用户名不能为空', trigger: 'blur' }
          	],
			pass:  [
				{ required: true, message: '密码不能为空', trigger: 'blur' }
          	]
        },
        redirect_uri: "http%3A%2F%2Fwww.58pic.com%2Findex.php%3Fm%3Dlogin%26a%3Dcallback%26type%3Dweixin"

	}
  },
  created(){
	  // this.getqrcode();
	  var accountInfo = this.$utils.getCookie("account");
	  if(accountInfo){
		this.loginForm.name = accountInfo.username;
		this.loginForm.pass = accountInfo.password;
		this.loginForm.rememberPass = true;
	  }
  },
  mounted(){
      var obj = new WxLogin({
            self_redirect: false,
            id:"WXCode", 
            appid: "wx47e0850600dd30fc", 
            scope: "snsapi_login", 
            redirect_uri: this.redirect_uri,
            state: "",
            style: "black",
            href: "data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlew0KICAgIGRpc3BsYXk6IG5vbmU7DQp9DQouaW1wb3dlckJveCAucXJjb2Rlew0KICAgIHdpZHRoOiAxNzBweDsNCn0="
        });
  },
  methods: {
	  changeLoginWay() {
		this.passwordLogin = this.passwordLogin ?  false : true;
	  },
	  //获取登录二维码
	  getqrcode(){
		  

	  },
	  //登录
	  login(){
		this.$refs["loginForm"].validate((valid) => {
			if (valid) {	
				var accountInfo = {
					"username": this.loginForm.name,
					"password": this.loginForm.pass
				}
				var isChecked = this.loginForm.rememberPass;
				this.$logaxios.post('login?username='+this.loginForm.name+'&password='+this.loginForm.pass)
				.then((response) => {
					if(response.status == 201){
						this.userError = true;
					}else{	
						if(isChecked){
							this.$utils.setCookie("account",JSON.stringify(accountInfo));
						}else{
							this.$utils.delCookie("account");
						}
                        this.userError = false;
                        this.$utils.setCookie("user",JSON.stringify(response.rows));
						this.$router.push({path: '/index'});
					}
				})
			} 
		});
	  }
  }
}
</script>


