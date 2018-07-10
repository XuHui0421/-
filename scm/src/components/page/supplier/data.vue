<template>
  <div class="container">
    <div class="data-header">
      <el-input placeholder="请输入关键字查询" class="">
        <i slot="suffix" class="el-input__icon el-icon-search blue"></i>
      </el-input>
    </div>
    <div class="data-body">
      <div class="data-classify">
        <h2 class="classify-title">合作企业</h2>
        <el-row class="classify-body">
            <el-col :span="6" >
                 <div class="classify-item">
                    <router-link to="/scorecompany">
                        <i class="icon iconfont icon-hexinqiye bg-purple"></i>
                        <div class="classify-item-info">
                            <p>客户</p>
                            <p>说明说明</p>
                        </div>
                    </router-link>
                </div>
            </el-col>
            <el-col :span="6" :offset="2">
                 <div class="classify-item">
                     <router-link to="/sbank">
                        <i class="icon iconfont icon-yinhang bg-danger"></i>
                        <div class="classify-item-info">
                            <p>银行</p>
                            <p>说明说明</p>
                        </div>
                    </router-link>
                </div>
            </el-col>
        </el-row>
      </div>
      <div class="data-classify">
        <h2 class="classify-title">企业单据</h2>
        <el-row class="classify-body">
            <el-col :span="6" >
                 <div class="classify-item">
                    <router-link to="/sbill">
                    <i class="icon iconfont icon-piaoju bg-blue"></i>
                    <div class="classify-item-info">
                        <p>票据清单</p>
                        <p>票据查询</p>
                    </div>
                    </router-link>
                </div>
            </el-col>
            <el-col :span="6" :offset="2">
                 <div class="classify-item">
                    <router-link to="/sfinanceList">
                    <i class="icon iconfont icon-rongzi bg-warning"></i>
                    <div class="classify-item-info">
                        <p>融资清单</p>
                        <p>票据融资</p>
                    </div>
                    </router-link>
                </div>
            </el-col>
            <el-col :span="6" :offset="2">
                 <div class="classify-item">
                    <router-link to="sserviceFee">
                        <i class="icon iconfont icon-fuwufei bg-blue-darker"></i>
                        <div class="classify-item-info">
                            <p>服务费</p>
                            <p>说明说明</p>
                        </div>
                    </router-link>
                </div>
            </el-col>
        </el-row>
        <el-row class="classify-body">
            <el-col :span="6">
                <div class="classify-item">
                    <router-link to="/scontract">
                        <i class="icon iconfont icon-hetong bg-green"></i>
                        <div class="classify-item-info">
                            <p>合同</p>
                            <p>票据查询</p>
                        </div>
                    </router-link>
                </div>
            </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  @import "../../../assets/css/page/data.less";

</style>
<script>
  export default {
    created() {
      this.$store.commit("setActiveTab", "/sdata");
    }
  };

</script>
