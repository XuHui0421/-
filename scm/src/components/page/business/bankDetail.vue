<template>
  <div class="container">
    <div class="header-breadcrumb">
      <div class="breadcrumb-wrap fl">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>数据中心</el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb-current">银行 </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-button size="mini" round class="btn-link fr" @click="$router.go(-1)">
        <i class="icon iconfont icon-fanhui"></i>
        返回
      </el-button>
    </div>
    <div class="container-wrap">
      <div class="container-left" >
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
            <li v-for="bank in bankList" @click="getThisDetail(bank.portraitId)">
              <el-checkbox v-model="bank.checked"></el-checkbox>
              <div class="item  item-lf">
                <div class="item-tel">{{bank.name}}</div>
                <div class="item-bank">{{bank.contract }}</div>
              </div>
              <div class="item item-rt">
                <div class="item-time">{{bank.startDate | formatDate("yyyy-MM-dd")}}</div>
                <div>{{bank.contractTel }}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="list-num">
          当前已加载：{{bankList.length}}条
        </div>
      </div>
      <div class="container-right">
        <div class="detail-header">
          <h1 class="detail-title">{{bankInfo.name}}</h1>
        </div>
        <div class="detail-tab">

           <div class="finance-detail">
                <ul class="finance-detail-list">
                  <li>
                    <span class="item-label blue talrt">银行</span>{{bankInfo.name }}</li>
                  <li>
                    <span class="item-label blue talrt">核心企业</span>{{bankInfo.brandName}}</li>
                  <li>
                    <span class="item-label blue talrt">币种</span>{{bankInfo.currency}}</li>
                  <li>
                    <span class="item-label blue talrt">时间</span>{{bankInfo.applyTime}}</li>
                  <li>
                    <span class="item-label blue talrt">备注</span>{{bankInfo.remark}}</li>
                </ul>
                <div class="finance-detail-body">
                  <div class="detail-body-header">
                    <div class="row">
                      <div class="col-2">
                        <span class="finance-item-label">申请融资金额:</span>
                        <span class="finance-item-info">{{bankInfo.moneyApply }}</span>
                      </div>
                      <div class="col-2">
                        <span class="finance-item-label">实际到账金额:</span>
                        <span class="finance-item-info orange">{{bankInfo.moneyDone  ? Number(detailInfo.moneyDone ).toFixed(2) : ''}}</span>
                      </div>
                      <div class="col-2">
                        <span class="finance-item-label">利率:</span>
                        <span class="finance-item-info">{{bankInfo.loanRate}}
                          <span class="quest">?</span>
                        </span>
                      </div>
                      <div class="col-2">
                        <span class="finance-item-label">服务费:</span>
                        <span class="finance-item-info">{{bankInfo.serviceCharge}}</span>
                      </div>
                      <!-- <div class="col-2">
                        <span class="finance-item-label">账期:</span>
                        <span class="finance-item-info">{{detailInfo.dayTime}}天
                          <span class="quest">?</span>
                        </span>
                      </div> -->
                    </div>
                  </div>
                  <div class="detail-body-subheader">
                    <span>备注:</span>
                    <span>{{bankInfo.remark}}</span>
                  </div>
                  <el-table :data="bankInfo.detailVoList" style="width: 100%">
                    <el-table-column prop="kprq" label="发票日期" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="fphm" label="发票号" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="amount" label="发票金额" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="" label="到期日" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="statusDesc" label="状态" align="center" header-align="center"></el-table-column>
                    <el-table-column label="附件" align="center" header-align="center">
                      <template scope="scope">
                        <span class="blue">查看</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="less">
  @import "../../../assets/css/page/detail.less";
  @import "../../../assets/css/page/financeDetail.less";

</style>


<script>
  export default {
    data() {
      return {
        bankList: [],
        bankInfo: {},
        activeTab: "second"
      };
    },
    created() {
      this.getDetail(this.$route.params.id);
      this.getBankList();
    },
    methods: {
      getBankList() {
        this.$axios.get('benter/banked')
          .then((response) => {
            this.bankList = response.rows;
            this.totalNum = response.rows.length;
          })
      },
      getDetail(pid) {
        this.$axios.get('benter/get/portrait/' + pid)
          .then((response) => {
            this.bankInfo = response.rows;
          })
      },
      getThisDetail(portraitId) {
        for (let i = 0; i < this.bankList.length; i++) {
          if (this.bankList[i].portraitId == portraitId) {
            this.$set(this.bankList[i], "checked", true);
          } else {
            this.$set(this.bankList[i], "checked", false);
          }
        }
        this.getDetail(portraitId);
      }
    }
  };

</script>
