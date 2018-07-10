<template>
  <div class="container" ref="container">
    <div class="header-breadcrumb">
      <div class="breadcrumb-wrap fl">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>数据中心</el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb-current">核心企业 </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-button size="mini" round class="btn-link fr" @click="$router.go(-1)">
        <i class="icon iconfont icon-fanhui"></i>
        返回
      </el-button>
    </div>
    <div class="container-wrap">
      <div class="container-left">
        <div class="detail-list-wrap">
          <ul class="company-list multi-line">
            <li v-for="company in companyList" @click="getThisDetail(company.id)">
              <el-checkbox v-model="company.checked"></el-checkbox>
              <div class="item  item-lf">
                <div class="item-tel">{{company.name}}</div>
                <div class="item-bank">{{company.userName}}</div>
              </div>
              <div class="item item-rt">
                <div class="item-time">{{company.date | formatDate("yyyy-MM-dd")}}</div>
                <div>{{company.department}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="list-num">
          当前已加载：{{companyList.length}}条
        </div>
      </div>
      <div class="container-right">
        <div class="detail-header">
          <h1 class="detail-title">{{companyInfo.name}}</h1>
        </div>
        <div class="detail-body">
          <ul class="detail-info label80">
            <li>
              <label>公司名称</label>
              <span>{{companyInfo.name}}</span>
            </li>
            <li>
              <label>简称</label>
              <span>{{companyInfo.abbreviationName}}</span>
            </li>
            <li>
              <label>社会信用代码</label>
              <span>{{companyInfo.businessRegNo}}</span>
            </li>
            <li>
              <label>注册号</label>
              <span>{{companyInfo.registrationNo}}</span>
            </li>
            <li>
              <label>法定代表</label>
              <span>{{companyInfo.legalRepresentative}}</span>
            </li>
            <li>
              <label>注册资本</label>
              <span>{{companyInfo.registeredCapital}}</span>
            </li>
            <li>
              <label>所属行业</label>
              <span>{{companyInfo.industry}}</span>
            </li>
            <li>
              <label>企业地址</label>
              <span>{{companyInfo.address}}</span>
            </li>
            <li>
              <label>企业网址</label>
              <span>{{companyInfo.website}} </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="less">
  @import "../../../assets/css/page/detail.less";
  @import "../../../assets/css/page/companyDetail.less";

</style>


<script>
  export default {
    data() {
      return {
        companyList: [],
        companyInfo: {},
      };
    },
    created() {
      this.getDetail(this.$route.params.id);
      this.getCompanyList();
    },
    methods: {
      getCompanyList() {
        this.$axios.get('senter/brand')
          .then((response) => {
            this.companyList = response.rows;
          })
      },
      getDetail(pid) {
        this.$axios.get('senter/get/portrait/' +pid)
          .then((response) => {
            this.companyInfo = response.rows;
          })
      },
      getThisDetail(pid) {
        for (let i = 0; i < this.companyList.length; i++) {
          if (this.companyList[i].id == pid) {
            this.$set(this.companyList[i], "checked", true);
          } else {
            this.$set(this.companyList[i], "checked", false);
          }
        }
        this.getDetail(pid);
      }
    }
  };

</script>
