<template>
  <div class="scm-header">
      <div class="scm-header-lf">
         欢迎 {{companyInfo.entName}} 进入供应链融资服务平台
      </div>
      <div class="scm-header-rt header-nav">
          <div class="header-nav-menu">
            <a class="icon-box"  href="/aifhelp">
                <i class="icon iconfont icon-help"></i>
            </a>
        </div>
        <div class="header-nav-menu">
            <div class="icon-box"> <i class="icon iconfont icon-lishijilu"></i></div>
            <div class="message-box">
                <div v-if="logsList.length != 0">
                    <ul class="message-box-list">
                        <li v-for="log in logsList">
                            <div>
                                <span class="item-title">{{log.title}}</span>
                                <span class="item-date">{{log.creationTime | formatDate("yyyy-MM-dd")}}</span>
                            </div>
                            <div class="item-content">
                                {{log.content}}
                            </div>
                        </li>
                    </ul>
                    <div class="message-btn">
                         <router-link  to="/logs">
                            查看全部
                        </router-link>
                    </div>
                </div>
                <div v-else class="no-message-box">
                    <img src="../../static/img/no_record_tip.png" alt="">
                    <p class="info">暂无记录</p>
                </div>
                
            </div>
        </div>
        <div class="header-nav-menu">
            <div  class="icon-box">
                <el-badge :value="2" :max="99" class="item">
                    <i class="icon iconfont icon-tongzhi"></i>
                </el-badge>
            </div>
            <div class="message-box">
                <div v-if="messageList.length != 0">
                    <ul class="message-box-list">
                        <li v-for="mes in messageList">
                            <div>
                                <span class="item-title">{{mes.title}}</span>
                                <span class="item-date">{{mes.creationTime | formatDate("yyyy-MM-dd")}}</span>
                            </div>
                            <div class="item-content">
                                {{mes.content}}
                            </div>
                        </li>
                    </ul>
                    <div class="message-btn">
                        <router-link  to="/message">
                            查看全部
                        </router-link>
                    </div>
                </div>
                <div v-else class="no-message-box">
                    <img src="../../static/img/no_notice_tip.png" alt="">
                    <p class="info">暂无记录</p>
                </div>
            </div>
        </div>
        <div class="user-info">
            <img v-bind:src="user.logo" alt="" class="face">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    {{user.trueName}} {{user.department}}
                    <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native = "$router.push('/userInfo')">
                        个人信息
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="getDashbordList" >首页配置</el-dropdown-item>
                    <!-- <el-dropdown-item>安全</el-dropdown-item> -->
                    <el-dropdown-item @click.native = "logout()">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="lang">
            <img src="../../static/img/china_flag.png" alt="" class="lang-flag">
            <!-- <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    {{lang}}
                    <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>繁体中文</el-dropdown-item>
                    <el-dropdown-item>英语</el-dropdown-item>
                    <el-dropdown-item>日语</el-dropdown-item>
                    <el-dropdown-item>法语</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown> -->
        </div>
        <el-dialog title="首页配置" :visible.sync="dashbordDialog">
            <div class="dialog-body">
                <el-checkbox v-model="dashbord.checked" v-for="(dashbord,i) in dashbordList">{{dashbord.actionName}}</el-checkbox>
            </div>
            <div slot="footer" class="dialog-footer">
                <div class="text-center">
                  <el-button type="primary" @click="updateBord">确定</el-button>
                </div>
            </div>
        </el-dialog>
      </div>
      
  </div>
</template>
<style  lang="less">
@import "../assets/css/page/header.less";
</style>
<script>
export default {
  data() {
    return {
      user: {},
      dashbordList: [],
      dashbordDialog: false,
      messageList: [],
      logsList: [],
      companyInfo: {}
    };
  },
  created() {
    if (this.$utils.getCookie("user")){
        this.user = JSON.parse( this.$utils.getCookie("user"));
    }
    this.getMessageList();
    // this.getLogList();
    this.getEnterprise();
  },
  methods: {
    logout() {
        this.$utils.delCookie("user");
        this.$router.push({ path: "/login" });
    },
    getMessageList(){
        this.$axios.get('msg/query')
        .then((res) => {
            this.messageList = res.rows.splice(0,2);
        });
    },
    getLogList(){
        this.$axios.get('log/query')
        .then((res) => {
            this.logsList = res.rows.splice(0,2);
        });
    },
    getEnterprise(){
        this.$axios.get('enterprise/view')
        .then((res) => {
            this.companyInfo = res.rows;
        });
    },
    getDashbordList(){//我的全部看板组建
        this.dashbordDialog = true;
        this.$axios.get('dashbord/myall')
        .then((res) => {
            this.dashbordList = res.rows;
            for (let i = 0; i < this.dashbordList.length; i++) {
                if (this.dashbordList[i].isShow == "1") {
                    this.$set(this.dashbordList[i], "checked", true);
                } else {
                    this.$set(this.dashbordList[i], "checked", false);
                }
            }
        });
    },
    updateBord(){
        console.log(this.dashbordList);
    }
  }
};
</script>


