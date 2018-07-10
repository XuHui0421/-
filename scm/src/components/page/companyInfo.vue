<template>
    <div class="main">
        <div class="header-tab">
            <el-tabs v-model="activeName">
                <el-tab-pane label="基本信息" name="first">
                    <div class="base-info-main">
                         <div class="user-logo">
                            <img v-bind:src="companyForm.logo" >
                            <a class="avatar-cover">修改头像</a>
                            <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" class="input-file" ref="userLogo" @change="editCompanyLogo($event)">
                        </div>
                    </div>
                    <div class="term-wrap">
                        <el-row class="mt20">
                            <el-col :span="6" :offset="2">
                                <div class="item-label">注册资本</div>
                                <div class="item-info">4520 万美元</div>
                            </el-col>
                            <el-col :span="6" :offset="2">
                                <div class="item-label">注册号</div>
                                 <div class="item-info"></div>
                            </el-col>
                            <el-col :span="6" :offset="2">
                                <div class="item-label">所属地区</div>
                                 <div class="item-info"></div>
                            </el-col>
                        </el-row>
                        <el-row class="mt20">
                            <el-col :span="6" :offset="2">
                                <div class="item-label">实缴资本</div>
                                <div class="item-info"></div>
                            </el-col>
                            <el-col :span="6" :offset="2">
                                <div class="item-label">机构代码</div>
                                <div class="item-info"></div>
                            </el-col>
                            <el-col :span="6" :offset="2">
                                <div class="item-label">英文名</div>
                                <div class="item-info"></div>
                            </el-col>
                        </el-row>
                        <el-row class="mt20">
                            <el-col :span="6" :offset="2">
                                <div class="item-label">经营状态</div>
                                <div class="item-info"></div>
                            </el-col>
                            <el-col :span="6" :offset="2">
                                <div class="item-label">公司类型</div>
                                <div class="item-info"></div>
                            </el-col>
                            <el-col :span="6" :offset="2">
                                <div class="item-label">曾用名</div>
                                <div class="item-info"></div>
                            </el-col>
                        </el-row>
                        <el-row class="mt40">
                            <el-col :span="6" :offset="2">
                                <div class="item-label">成立日期</div>
                                <div class="item-info"></div>
                            </el-col>
                            <el-col :span="6" :offset="2">
                                <div class="item-label">所属行业</div>
                                <div class="item-info">--</div>
                            </el-col>
                            <el-col :span="6" :offset="2">
                                <div class="item-label">经营方式</div>
                                <div class="item-info"></div>
                            </el-col>
                        </el-row>
                        <el-row class="mt20">
                            <el-col :span="6" :offset="2">
                                <div class="item-label">信用代码</div>
                                <div class="item-info"></div>
                            </el-col>
                            <el-col :span="6" :offset="2">
                                <div class="item-label">核准日期</div>
                                <div class="item-info"></div>
                            </el-col>
                            <el-col :span="6" :offset="2">
                                <div class="item-label">人员规模</div>
                                <div class="item-info"></div>
                            </el-col>
                        </el-row>
                        <el-row class="mt20">
                            <el-col :span="6" :offset="2">
                                <div class="item-label">识别号</div>
                                <div class="item-info"></div>
                            </el-col>
                            <el-col :span="6" :offset="2">
                                <div class="item-label">登记机关</div>
                                <div class="item-info"></div>
                            </el-col>
                            <el-col :span="6" :offset="2">
                                <div class="item-label">营业期限</div>
                                <div class="item-info"></div>
                            </el-col>
                        </el-row>
                        <el-row class="mt40">
                            <el-col :span="22" :offset="2">
                                <div class="item-label">企业地址</div>
                                <div class="item-info"></div>
                            </el-col>
                            
                        </el-row>
                        <el-row class="mt40">
                            <el-col :span="22" :offset="2">
                                <div class="item-label">经营范围</div>
                                <div class="item-info"></div>
                            </el-col>
                        </el-row>
                    </div>
                    
                </el-tab-pane>
                <el-tab-pane label="经营状况" name="second">经营状况</el-tab-pane>
                <el-tab-pane label="经营风险" name="third">经营风险</el-tab-pane>
            </el-tabs>
        </div>

        
    </div>
</template>

<style scoped lang="less">
@import "../../assets/css/page/companyInfo.less";
@import "../../assets/css/page/userInfo.less";
</style>

<script>
export default {
  data() {
    return {
     activeName:'first',
     companyForm: {}
    };
  },
  created(){
    this.$store.commit("setActiveTab", "/system");
  },
  methods: {
    editCompanyLogo(){//修改企业头像

    }
  }
  
};
</script>