<template>
  <div class="container" >
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
        <div class="container-left">
      <div class="detail-list-wrap">
        <ul class="company-list multi-line">
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
        当前已加载：{{totalNum}}条
      </div>
    </div>
    <div class="container-right">
      <div class="detail-header">
        <h1 class="detail-title">{{bankInfo.name}}</h1>
      </div>
      <div class="detail-tab">
        <el-tabs v-model="activeTab" class="mt20">
          <el-tab-pane label="详情信息" name="first">
            <ul class="detail-info label80">
              <li>
                <label>银行</label>
                <span>{{bankInfo.name}}</span>
              </li>
              <li>
                <label>核心企业</label>
                <span>***</span>
              </li>
              <li>
                <label>币种</label>
                <span>{{bankInfo.currency}}</span>
              </li>
              <li>
                <label>时间</label>
                <span>{{bankInfo.startDate}}</span>
              </li>
              <li>
                <label>备注</label>
                <span>{{bankInfo.remark}}</span>
              </li>
              <li>
                <label>运输方式</label>
                <span>***</span>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="当前融资" name="second">
            <div class="finance-detail-body">
              <div class="detail-body-header">
                <div class="row">
                  <div class="col-2">
                    <span class="finance-item-label">申请融资金额:</span>
                    <span class="finance-item-info">{{bankInfo.applyAmount}}</span>
                  </div>
                  <div class="col-2">
                    <span class="finance-item-label">实际到账金额:</span>
                    <span class="finance-item-info orange">{{bankInfo.billAmount ? Number(bankInfo.billAmount).toFixed(2) : ''}}</span>
                  </div>
                  <div class="col-2">
                    <span class="finance-item-label">利率:</span>
                    <span class="finance-item-info">{{bankInfo.interestRate}}
                      <span class="quest">?</span>
                    </span>
                  </div>
                  <div class="col-2">
                    <span class="finance-item-label">服务费:</span>
                    <span class="finance-item-info">{{bankInfo.serviceRate}}</span>
                  </div>
                  <div class="col-2">
                    <span class="finance-item-label">账期:</span>
                    <span class="finance-item-info">{{bankInfo.dayTime}}天
                      <span class="quest">?</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="detail-body-subheader">
                <span>备注:</span>
                <span>{{bankInfo.remark}}</span>
              </div>
              <el-table :data="bankInfo.detailList" style="width: 100%">
                <el-table-column prop="invoiceDate" label="申请时间" align="center" header-align="center"></el-table-column>
                <el-table-column prop="invoiceNo" label="申请金额" align="center" header-align="center"></el-table-column>
                <el-table-column prop="invoiceAmount" label="到账金额" align="center" header-align="center"></el-table-column>
                <el-table-column prop="dueDate" label="核心企业" align="center" header-align="center"></el-table-column>
                <el-table-column prop="statusDesc" label="融资方" align="center" header-align="center"></el-table-column>
                <el-table-column prop="statusDesc" label="融资类型" align="center" header-align="center"></el-table-column>
                <el-table-column prop="statusDesc" label="币别" align="center" header-align="center"></el-table-column>
                <el-table-column prop="statusDesc" label="发票号" align="center" header-align="center"></el-table-column>
                <el-table-column prop="statusDesc" label="状态" align="center" header-align="center"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="历史融资" name="third">
            <div class="finance-detail-body">
              <div class="detail-body-header">
                <div class="row">
                  <div class="col-2">
                    <span class="finance-item-label">申请融资金额:</span>
                    <span class="finance-item-info">{{bankInfo.applyAmount}}</span>
                  </div>
                  <div class="col-2">
                    <span class="finance-item-label">实际到账金额:</span>
                    <span class="finance-item-info orange">{{bankInfo.billAmount ? Number(bankInfo.billAmount).toFixed(2) : ''}}</span>
                  </div>
                  <div class="col-2">
                    <span class="finance-item-label">利率:</span>
                    <span class="finance-item-info">{{bankInfo.interestRate}}
                      <span class="quest">?</span>
                    </span>
                  </div>
                  <div class="col-2">
                    <span class="finance-item-label">服务费:</span>
                    <span class="finance-item-info">{{bankInfo.serviceRate}}</span>
                  </div>
                  <div class="col-2">
                    <span class="finance-item-label">账期:</span>
                    <span class="finance-item-info">{{bankInfo.dayTime}}天
                      <span class="quest">?</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="detail-body-subheader">
                <span>备注:</span>
                <span>{{bankInfo.remark}}</span>
              </div>
              <el-table :data="bankInfo.detailList" style="width: 100%">
                <el-table-column prop="invoiceDate" label="申请时间" align="center" header-align="center"></el-table-column>
                <el-table-column prop="invoiceNo" label="申请金额" align="center" header-align="center"></el-table-column>
                <el-table-column prop="invoiceAmount" label="到账金额" align="center" header-align="center"></el-table-column>
                <el-table-column prop="dueDate" label="核心企业" align="center" header-align="center"></el-table-column>
                <el-table-column prop="statusDesc" label="融资方" align="center" header-align="center"></el-table-column>
                <el-table-column prop="statusDesc" label="融资类型" align="center" header-align="center"></el-table-column>
                <el-table-column prop="statusDesc" label="币别" align="center" header-align="center"></el-table-column>
                <el-table-column prop="statusDesc" label="发票号" align="center" header-align="center"></el-table-column>
                <el-table-column prop="statusDesc" label="状态" align="center" header-align="center"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>

        </el-tabs>
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
        totalNum: 50,
        bankList: [],
        bankInfo: {
        },
        activeTab: "second"
      };
    },
    created() {
      this.getDetail(this.$route.params.id);
      this.getBankList();
    },
    methods: {
      getBankList(){
            this.$axios.get('senter/bank?offset=0&pageSize=50')
            .then((response) => {
                this.bankList = response.rows;
                this.totalNum = response.rows.length;
            })
      },
      getDetail(pid) {
          this.$axios.get('sbank/get/'+pid)
            .then((response) => {
                this.bankInfo = response.rows;
            })
      },
      getThisDetail(portraitId) {
        for (let i = 0; i < this.bankList.length; i++) {
          if (this.bankList[i].portraitId == pid) {
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
