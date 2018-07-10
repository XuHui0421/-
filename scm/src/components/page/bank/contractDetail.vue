<template>
  <div class="container" ref="container">
    <div class="header-breadcrumb">
      <div class="breadcrumb-wrap fl">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>数据中心</el-breadcrumb-item>
          <el-breadcrumb-item>票据清单 </el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb-current">票据信息 </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-button size="mini" round class="btn-link fr" @click="$router.go(-1)">
        <i class="icon iconfont icon-fanhui"></i>
        返回
      </el-button>
    </div>
    <div class="container-wrap">
      <div class="container-left">
        <div class="detail-header">
          <div class="header-drop">
            <el-dropdown trigger="click" class="dropdown dropdown-square">
              <span class="el-dropdown-link">
                状态
                <i class="el-icon-arrow-down"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>申请中</el-dropdown-item>
                <el-dropdown-item>申请结束</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="header-right">
            <el-dropdown trigger="click" class="dropdown dropdown-round dropdown-primary">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>申请中</el-dropdown-item>
                <el-dropdown-item>申请结束</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="detail-list-wrap">
          <div class="list-search">
                <div class="list-input"><el-input placeholder="请输入关键字查询" size="mini"></el-input></div>
                <el-button class="btn-green ml10" size="mini">查询</el-button>
                <span class="blue ml10">高级</span>
            </div>
          <ul class="bank-list multi-line">
            <li v-for="bank in contractList" @click="getThisDetail(bank.id)">
              <el-checkbox v-model="bank.checked"></el-checkbox>
              <div class="item  item-lf">
                <div class="item-tel">{{bank.contractName}}</div>
                <div class="item-bank">{{bank.partyBName}}</div>
              </div>
              <div class="item item-rt">
                <div class="item-time">{{bank.createTime  | formatDate("yyyy-MM-dd")}}</div>
                <div class="item-status" v-bind:class="bank.status|applyStatus().color">{{bank.status | applyStatus().status}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="list-num">
          当前已加载：{{contractList.length}}条
        </div>
      </div>
      <div class="container-right" >
        <div class="detail-header">
          <h1 class="detail-title">{{detailInfo.code}}</h1>
          <div class="operate-list">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" :limit="1">
              <el-button type="primary" size="mini" round>
                <i class="el-icon-upload2"></i>上传</el-button>
            </el-upload>
          </div>
        </div>
        <div class="detail-body">
          <div class="triangle-topright">
            <span>{{detailInfo.statusDesc}}</span>
          </div>
          <ul class="detail-info label80">
            <li>
              <label>合同标题</label>
              <span>{{detailInfo.contractName}}</span>
            </li>
            <li>
              <label>合同编号</label>
              <span>{{detailInfo.contractNo}}</span>
            </li>
            <li>
              <label>创建时间</label>
              <span>{{detailInfo.createTime | formatDate("yyyy-MM-dd")}}</span>
            </li>
            <li>
              <label>发起方</label>
              <span>{{detailInfo.partyBName}}</span>
            </li>
            <li>
              <label>法定代表</label>
              <span></span>
            </li>
            <li>
              <label>注册资本</label>
              <span></span>
            </li>
            <li>
              <label>所属行业</label>
              <span></span>
            </li>
            <li>
              <label>企业地址</label>
              <span></span>
            </li>
            <li>
              <label>企业网址</label>
              <span></span>
            </li>
          </ul>
          <div class="bg-gray padding20">
            <el-row :gutter="20">
              <el-col :span="12" :offset="6">
                <div class="text-center">
                    <img src="../../../../static/img/no_power_tip.png" alt="" class="img-full">
                    <p class="info">暂无权限查看</p>
                </div>
              </el-col>
            </el-row>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import "../../../assets/css/page/detail.less";
  @import "../../../assets/css/page/contractDetail.less";

</style>

<script>
  export default {
    data() {
      return {
        contractList: [],
        activeTab: "first",
        detailInfo: {}
      };
    },
    created(){
        this.$store.commit("setActiveTab", "/bankdata");
    },
    mounted() {
      this.getDetail(this.$route.params.id);
      this.getList();
    },
    methods: {
      getList() {
        this.$axios.get("mcontract/query")
        .then(response => {
            this.contractList = response.rows;
        });
      },
      getDetail(pid) {
        this.$axios .get("mcontract/get/"+pid)
        .then(response => {
            this.detailInfo = response.rows;
        });
      },
      getThisDetail(pid) {
        for (let i = 0; i < this.contractList.length; i++) {
          if (this.contractList[i].id == pid) {
            this.$set(this.contractList[i], "checked", true);
          } else {
            this.$set(this.contractList[i], "checked", false);
          }
        }
        this.getDetail(pid);
      }
    }
  };

</script>
