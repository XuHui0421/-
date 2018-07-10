<template>
    <div >
        <div class="base-info-wrap">
            <div class="base-info-header">
                <h2>基本信息</h2>
                <el-button type="primary" round size="mini" @click="updateInfo">保存</el-button>
            </div>
            <div class="base-info-main">
                <div class="user-logo">
                    <img v-bind:src="userform.logo">
                    <a class="avatar-cover">修改头像</a>
                    <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" class="input-file" ref="userLogo" @change="editLogo($event)">
                </div>
                
                <el-form :model="userform" class="two-col-form" label-width="70px"  label-position="left">
                    <div class="form-left">
                        <el-form-item label="手机号">
                            <template>
                                <span>{{userform.mobile}}</span>
                                <span class="text-edit" @click="editPhoneDialog = true">修改</span>
                            </template>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <template>
                                <span>{{userform.email}}</span>
                                <span class="text-edit" @click="editEmailDialog = true">
                                    {{userform.email ? '修改' : '添加'}}
                                </span>
                            </template>
                        </el-form-item>
                        <el-form-item label="密码">
                            <template>
                                <span>*********</span>
                                <span class="text-edit" @click="editPwDialog = true">修改</span>
                            </template>
                        </el-form-item>
                        <!-- <el-form-item label="企业名称">
                            <el-input  auto-complete="off" :value="userform.nickName"></el-input>
                        </el-form-item> -->
                       
                    </div>
                    <div class="form-right">
                        <el-form-item label="性别">
                            <el-radio v-model="userform.gender" label="1" >男</el-radio>
                            <el-radio v-model="userform.gender" label="2" >女</el-radio>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input  auto-complete="off" v-model="userform.trueName"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="地址">
                            <el-cascader class="row" :value="userform.address" :options="options" v-model="selectedOptions"  placeholder="请输入地址">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="电话">
                            <el-input  auto-complete="off" placeholder="请输入电话" :value="userform.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="开户行">
                            <el-input  auto-complete="off" placeholder="请输入开户行"></el-input>
                        </el-form-item>
                         <el-form-item label="开户名称">
                            <el-input  auto-complete="off" placeholder="请输入开户名称"></el-input>
                        </el-form-item> -->
                    </div>
                </el-form>    
            </div>
        </div>
        <div class="base-info-wrap">
            <div class="base-info-header">
                <h2>身份证</h2>
                <span class="header-tip">注：四角完整、亮度均匀、照片清晰。(缺边、模糊、闪光，均不可用)</span>
                <el-button type="primary" round size="mini" @click="updateIdCard">保存</el-button>
            </div>
            <div class="base-info-main">
               <div class="upload-wrap fl">
                   <div class="avatar-uploader">
                       <div class="uploader-des" v-if="!idCard.idCardFront">
                            <i  class="el-icon-circle-plus avatar-uploader-icon avatar-uploader-icon-primary"></i>
                            <p>请上传身份证人像页</p>
                        </div>
                        <div v-else>
                            <img v-bind:src="idCard.idCardFront" class="img-card">
                            <a class="avatar-cover">上传身份证人像页</a>
                        </div>
                        <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" class="input-file" ref="id" @change="editId($event)">
                   </div>
               </div>
               <div class="upload-wrap fr">
                     <div class="avatar-uploader">
                       <div class="uploader-des" v-if="!idCard.idCardEnd">
                            <i  class="el-icon-circle-plus avatar-uploader-icon avatar-uploader-icon-primary"></i>
                            <p>请上传身份证国徽页</p>
                        </div>
                        <div v-else>
                            <img v-bind:src="idCard.idCardEnd" class="img-card">
                            <a class="avatar-cover">上传身份证国徽页</a>
                        </div>
                        <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" class="input-file" ref="idEmblem" @change="editIdEmblem($event)">
                   </div>
               </div>
            </div>
        </div>
        <div class="base-info-wrap">
            <div class="uploade-tip-main">
               <div class="id-uploade-tip-wrap fl">
                    <h2 class="id-uploade-tip-title  blue">证件上传正确示例</h2>
                    <img src="../../../static/img/id_success.png" alt="" class="fl mr20">
                    <div class="id-uploade-tip">
                        <div class="tip-wrap">
                            <span class="tip-round"></span>
                            <span class="tip-info">四角完整</span>
                        </div>
                        <div class="tip-wrap">
                            <span class="tip-round"></span>
                            <span class="tip-info">亮度均匀</span>
                        </div>
                        <div class="tip-wrap">
                            <span class="tip-round"></span>
                            <span class="tip-info">照片清晰</span>
                        </div>
                    </div>
               </div>
               <div class="id-uploade-tip-wrap fr">
                    <h2 class="id-uploade-tip-title danger">证件上传错误示例</h2>
                    <img src="../../../static/img/id_error.png" alt="" class="fl mr20">
                    <div class="id-uploade-tip">
                        <div class="tip-wrap tip-wrap-error">
                            <span class="tip-round"></span>
                            <span class="tip-info">缺边</span>
                        </div>
                        <div class="tip-wrap tip-wrap-error">
                            <span class="tip-round"></span>
                            <span class="tip-info">模糊</span>
                        </div>
                        <div class="tip-wrap tip-wrap-error">
                            <span class="tip-round"></span>
                            <span class="tip-info">闪光</span>
                        </div>
                    </div>
               </div>
            </div>
        </div>
        <div class="base-info-wrap">
           <div class="base-info-header">
                <h2>人脸识别</h2>
                <span class="header-tip">注：此功能需电脑摄像功能,方可继续使用,如无摄像功能,可上传大头照代替</span>
                <el-button type="primary" round size="mini">保存</el-button>
            </div>
            <div class="base-info-main">
               <div class="upload-wrap upload-wrap-center">
                   <div class="avatar-uploader">
                       <div class="uploader-des">
                            <i  class="el-icon-circle-plus avatar-uploader-icon avatar-uploader-icon-primary"></i>
                            <p>请上传本人正脸照片一张</p>
                        </div>
                        <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" class="input-file" ref="selfie" @change="editSelfie($event)">
                   </div>
                   
               </div>
               <div class="error-alert">
                    <i class="el-icon-warning"></i>
                    未能检测到您的电脑摄像功能，请手动上传正脸照
               </div>
               
              
            </div>
        </div>
        <el-dialog title="修改手机号" :visible.sync="editPhoneDialog">
            <el-form :model="phoneForm" :rules="phoneFormRules" class="form-center" ref="phoneForm">
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="phoneForm.mobile" auto-complete="off" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <template>
                        <label>验证码</label>
                        <div>
                            <el-input v-model="phoneForm.code" auto-complete="off" class="input-code" placeholder="请输入验证码"></el-input>
                            <el-button type="primary" class="fr" v-bind:disabled="phoneForm.isSend" @click="sendCode">
                                 {{phoneForm.sendTxt}}
                            </el-button>
                        </div>
                        
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editPhoneDialog = false">取 消</el-button>
                <el-button type="primary" @click="editPhone">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改邮箱" :visible.sync="editEmailDialog">
            <el-form :model="emailForm" :rules="emailFormRules" class="form-center" ref="emailForm">
                <el-form-item label="邮箱账号" prop="email">
                    <el-input v-model="emailForm.email" auto-complete="off" placeholder="请输入邮箱账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <template>
                        <label>验证码</label>
                        <div>
                            <el-input v-model="emailForm.code" auto-complete="off" class="input-code" placeholder="请输入验证码"></el-input>
                            <el-button type="primary" class="fr" v-bind:disabled="emailForm.isSend" @click="sendEmailCode">
                                 {{emailForm.sendTxt}}
                            </el-button>
                        </div>
                        
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editEmailDialog = false">取 消</el-button>
                <el-button type="primary" @click="editEmail">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改密码" :visible.sync="editPwDialog" >
            <el-form :model="passwordForm" :rules="passwordFormRules" class="form-center" ref="passwordForm">
                <el-form-item label="原密码" prop="oldps">
                    <el-input type="password" v-model="passwordForm.oldps" auto-complete="off" placeholder="请输入原密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newps">
                    <el-input type="password" v-model="passwordForm.newps" auto-complete="off" placeholder="请输入新密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editPwDialog = false">取 消</el-button>
                <el-button type="primary" @click="editPassword">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style scoped lang="less">
@import "../../assets/css/page/userInfo.less";
</style>

<script>
export default {
  data() {
    var checkMobile = (rule, value, callback) => {
        if (!value || !/^1\d{10}$/g.test(value)) {
            return callback(new Error('请输入有效的手机号码'));
        }else{
            callback();
        }
    };
    var checkEmail = (rule, value, callback) => {
        if (!value || !/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(value)) {
            return callback(new Error('请输入有效的邮箱'));
        }else{
            callback();
        }
    }
    return {
      userform: {},
      editPhoneDialog: false,//修改手机号码
      editEmailDialog: false,//修改邮箱
      editPwDialog: false,//修改密码
      phoneForm: {
            isSend: false,
            sendTxt: "发送验证码"
      },
      phoneFormRules: {
          mobile: {validator: checkMobile, trigger: 'blur'},
          
      },
      emailForm: {
            isSend: false,
            sendTxt: "发送验证码",
      },
      emailFormRules: {
          email: {validator: checkEmail, trigger: 'blur'}
      },
      passwordForm:{},
      passwordFormRules:{
           oldps: {required: true, message: '请填写原密码',},
           newps: {required: true, message: '请填写新密码',},
      },
      idCard: {
          idCardFront: '',//身份证正面
          idCardEnd: ''//身份证反面
      }
    };
  },
  created(){
      this.getUserInfo();
  },
  methods: {
    getUserInfo(){//获取用户信息
        this.$axios.get('getInfo')
        .then((res) => {
            this.userform = res.rows;
            this.userform.gender += '';//性别转成字符串
            this.idCard.idCardFront =  res.rows.idCardFront;
            this.idCard.idCardEnd =  res.rows.idCardEnd;
        });
    },
    sendCode() {//修改手机号码发送验证码
        var time = 60;
        var _this = this;
        delete this.phoneFormRules.code //删除验证码的验证
        this.$refs['phoneForm'].validate((valid) => {
            if(valid){
                this.$axios.put('customer/sendUpdateMobile', this.phoneForm.mobile)
                    .then(() => {
                        this.phoneForm.isSend = true;
                        var InterValObj = window.setInterval(function() {
                            --time;
                            if (time > 0) {
                                _this.phoneForm.sendTxt = time + "s 重新发送";
                            } else {
                                _this.phoneForm.isSend = false;
                                _this.phoneForm.sendTxt = "发送验证码";
                                window.clearInterval(InterValObj);
                            }
                        }, 1000);
                    })
            }
        })
    },
    editPhone(){//修改手机号
        this.phoneFormRules.code = {required: true, message: '请填写验证码',};//新增验证码的验证
        this.$refs['phoneForm'].validate((valid) => {
          if (valid) {
            this.$axios.put('customer/updateMobile',{
                code: this.phoneForm.code,
                name: this.phoneForm.mobile
            })
            .then(() => {
               this.editPhoneDialog = false;
               this.$Message.success('修改成功!'); 
            })
          } else {
            return false;
          }
        });
    },
    sendEmailCode() {//修改邮箱发送验证码
      var time = 60;
      var _this = this;
        delete this.emailFormRules.code //删除验证码的验证
        this.$refs['emailForm'].validate((valid) => {
            if(valid){
                this.$axios.put('customer/sendUpdateEmail', this.emailForm.email)
                .then(() => {
                    this.emailForm.isSend = true;
                    var InterValObj = window.setInterval(function() {
                        --time;
                        if (time > 0) {
                            _this.emailForm.sendTxt = time + "s 重新发送";
                        } else {
                            _this.emailForm.isSend = false;
                            _this.emailForm.sendTxt = "发送验证码";
                            window.clearInterval(InterValObj);
                        }
                    }, 1000);
                })
            }
        })
    },
    editEmail(){//修改邮箱
    this.emailFormRules.code = {required: true, message: '请填写验证码',};//新增验证码的验证
        this.$refs['emailForm'].validate((valid) => {
          if (valid) {
            this.$axios.put('customer/updateEmai',{
                name: this.emailForm.code,
                email: this.emailForm.email
            })
            .then(() => {
                this.editEmailDialog = false;
               this.$Message.success('修改成功!');
            })
          } else {
            return false;
          }
        });
    },
    editPassword(){//修改密码
        this.$refs['passwordForm'].validate((valid) => {
            if (valid) {
                this.$axios.get('customer/mdps?oldps='+this.passwordForm.oldps+'&newps='+this.passwordForm.newps)
                .then(() => {
                    this.editPwDialog = false;
                    this.$Message.success('修改成功!');
                })
            } else {
                return false;
            }
        });
    },
    editLogo(){//修改头像
        if (this.$refs.userLogo.files.length !== 0) {
          var image = new FormData();
          image.append('file', this.$refs.userLogo.files[0])
          this.$axios.post('file/action/upload/image/url', image)
            .then((response) => {
                this.$axios.put('customer/updatePhoto',{
                    logo : response.rows.url
                })
                .then(() => {
                    this.$Message.success('修改成功!');
                     this.userform.logo = response.rows.url;
                });
               
            })
        }
    },
    updateInfo(){//修改基础信息
        this.$axios.put('customer/update',{
            gender : Number(this.userform.gender),
            trueName : this.userform.trueName
        })
        .then(() => {
            this.$Message.success('保存成功!');
        });
    },
    editId(){
        if (this.$refs.id.files.length !== 0) {
          var image = new FormData();
          image.append('file', this.$refs.id.files[0])
          this.$axios.post('file/action/upload/image/url', image)
            .then((response) => {
                this.idCard.idCardFront = response.rows.url;
            })
        }
    },
    editIdEmblem(){
        if (this.$refs.idEmblem.files.length !== 0) {
          var image = new FormData();
          image.append('file', this.$refs.idEmblem.files[0])
          this.$axios.post('file/action/upload/image/url', image)
            .then((response) => {
                this.idCard.idCardEnd = response.rows.url;
            })
        }
    },
    updateIdCard(){
        this.$axios.put('customer/uIdCardFront',this.idCard)
        .then((response) => {
            this.$Message.success('保存成功!');
        })
    }
  }
  
};
</script>