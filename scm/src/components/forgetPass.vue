<template>
  <div class="">
    <header>
      <div class="header-img-box">
        <img src="../../static/img/companyLogo.png" alt="">
      </div>
    </header>
    <div class="layout-contaniner">
      <div class="maincenter">
        <span class="ml40">重置前，请认真阅读
          <a href="#" class="blue">
            <智慧精融平台用户协议>
          </a> ,注册时即默认此协议</span>
        <div class="main-content">
          <div class="title">
            忘记密码
          </div>
          <div class="update-wrap">
            <div v-if="!success" class="forgetPass-form">
              <el-form :model="passForm" :rules="passFormRules" label-position="top" ref="passForm">
                <el-form-item label="请输入邮箱" prop="name">
                  <el-input v-model="passForm.name" placeholder="请输入邮箱账号"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                  <template>
                    <el-row>
                      <el-col :span="14">
                        <el-input v-model="passForm.code" placeholder="请输入验证码"></el-input>
                      </el-col>
                      <el-col :span="8" :offset="2">
                        <el-button type="primary" class="fr btn-send-code" v-bind:disabled="send.isSend" @click="sendCode">
                          {{send.sendTxt}}
                        </el-button>
                      </el-col>
                    </el-row>
                  </template>
                </el-form-item>
                <el-form-item label="设置密码" prop="password">
                  <el-input type="password" v-model="passForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" class="btn-full mt20" @click="updatePassword">确认修改</el-button>
            </div>
            <div v-else class="success">
              <img src="../../static/img/opera_success.png">
              <router-link to="/login">
                <el-button type="primary" class="btn-full mt20">立即登录</el-button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import '../assets/css/page/forgetPass.less';

</style>
<script>
  export default {
    data() {
      return {
        send: {
          isSend: false,
          sendTxt: "发送验证码",
        },
        passForm: {
          name: '',
          code: '',
          password: ''
        },
        passFormRules: {
          name: {
            required: true,
            message: '请输入邮箱账号'
          }
          // code: {required: true, message: '请输入验证码'},
          // password: {required: true, message: '请输入密码'}
        },
        success: false //是否修改成功
      }
    },
    methods: {
      sendCode() { //发送验证码
        var time = 60;
        var _this = this;
        delete this.passFormRules.code //删除验证码的验证
        this.$refs['passForm'].validate((valid) => {
          if (valid) {
            this.$logaxios.post('forgetcode?name='+this.passForm.name+'&type=2')
              .then((res) => {
                _this.send.isSend = true;
                var InterValObj = window.setInterval(function () {
                  --time;
                  if (time > 0) {
                    _this.send.sendTxt = time + "s 重新发送";
                  } else {
                    _this.send.isSend = false;
                    _this.send.sendTxt = "发送验证码";
                    window.clearInterval(InterValObj);
                  }
                }, 1000);
              })
          }
        })
      },
      updatePassword() {
        this.passFormRules.code = {
          required: true,
          message: '请输入验证码'
        };
        this.passFormRules.password = {
          required: true,
          message: '请输入密码'
        };
        this.$refs['passForm'].validate((valid) => {
          if (valid) {
            this.$logaxios.post('email/retps?name='+this.passForm.name+'&code='+this.passForm.code+'&password='+this.passForm.password, )
              .then((res) => {
                this.success = true;
              })
          }
        })
      }
    }
  }

</script>
