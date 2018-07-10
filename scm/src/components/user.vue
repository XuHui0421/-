<template>
  <div class="user-wrap">
      <div class="user-info">
            <div class="user-img">
                <el-badge :value="3" class="badge">
                    <img src="../../../static/img/face.jpeg" alt="" class="face">
                </el-badge>
            </div>
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    {{user.name}}
                    <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item>安全</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="lang">
            <img src="../../../static/img/china_flag.png" alt="" class="lang-flag">
            <el-dropdown trigger="click">
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
            </el-dropdown>
        </div>
  </div>
</template>
<style  lang="less">
@import '../assets/css/page/user.less';
</style>
<script>
export default {
   data(){
        return {
            user: {
                name: 'hui.xu'
            },
            lang: '简体中文'
        }
    }
}

</script>


