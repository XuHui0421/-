<template>
  <div class="container">
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
            <el-button type="primary" size="mini" round icon="el-icon-plus">邀请</el-button>
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
            <li v-for="bank in banks" @click="getThisDetail(bank.id)">
              <el-checkbox v-model="bank.checked"></el-checkbox>
              <div class="item  item-lf">
                <div class="item-tel">{{bank.contactPhone}}</div>
                <div class="item-bank">{{bank.applyBankName}}</div>
              </div>
              <div class="item item-rt">
                <div class="item-time">{{bank.date | formatDate("yyyy-MM-dd")}}</div>
                <div class="item-status" v-bind:class="bank.status|applyStatus().color">{{bank.status | applyStatus().status}}</div>
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
          <h1 class="detail-title">{{detailInfo.code}}</h1>
          <div class="operate-list">
            <el-button type="primary" size="mini" round>
              <i class="icon iconfont icon-export"></i>
              导出票据
            </el-button>
            <el-button type="primary" size="mini" round>
              <i class="icon iconfont icon-daoru"></i>
              导入票据
            </el-button>
            <el-button type="primary" size="mini" round>
              <i class="icon iconfont icon-xiazai"></i>
              下载通知函
            </el-button>
            <el-button size="mini" round class="btn-link" @click="$router.go(-1)">
              <i class="icon iconfont icon-fanhui"></i>
              返回
            </el-button>
          </div>
        </div>
        <div class="detail-tab">
          <div class="triangle-topright">
            <span>未提交</span>
          </div>
          <el-tabs v-model="activeTab" class="mt20">
            <el-tab-pane label="融资详情" name="first">
              <div class="finance-detail">
                <ul class="finance-detail-list">
                  <li>
                    <span class="item-label blue talrt">银行</span>{{detailInfo.applyBankName}}</li>
                  <li>
                    <span class="item-label blue talrt">核心企业</span>{{detailInfo.dayTime}}天(暂定)</li>
                  <li>
                    <span class="item-label blue talrt">币种</span>{{detailInfo.currency}}</li>
                  <li>
                    <span class="item-label blue talrt">时间</span>{{detailInfo.applyTime}}</li>
                  <li>
                    <span class="item-label blue talrt">备注</span>{{detailInfo.remark}}</li>
                </ul>
                <div class="finance-detail-body">
                  <div class="detail-body-header">
                    <div class="row">
                      <div class="col-2">
                        <span class="finance-item-label">申请融资金额:</span>
                        <span class="finance-item-info">{{detailInfo.applyAmount}}</span>
                      </div>
                      <div class="col-2">
                        <span class="finance-item-label">实际到账金额:</span>
                        <span class="finance-item-info orange">{{detailInfo.billAmount ? Number(detailInfo.billAmount).toFixed(2) : ''}}</span>
                      </div>
                      <div class="col-2">
                        <span class="finance-item-label">利率:</span>
                        <span class="finance-item-info">{{detailInfo.interestRate}}
                          <span class="quest">?</span>
                        </span>
                      </div>
                      <div class="col-2">
                        <span class="finance-item-label">服务费:</span>
                        <span class="finance-item-info">{{detailInfo.serviceRate}}</span>
                      </div>
                      <div class="col-2">
                        <span class="finance-item-label">账期:</span>
                        <span class="finance-item-info">{{detailInfo.dayTime}}天
                          <span class="quest">?</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="detail-body-subheader">
                    <span>备注:</span>
                    <span>{{detailInfo.remark}}</span>
                  </div>
                  <el-table :data="detailInfo.detailList" style="width: 100%">
                    <el-table-column prop="invoiceDate" label="发票日期" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="invoiceNo" label="发票号" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="invoiceAmount" label="发票金额" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="dueDate" label="到期日" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="statusDesc" label="状态" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="" label="附件" align="center" header-align="center">
                      <template slot-scope="id">
                        <span class="blue">查看</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="关联附件" name="second">关联附件</el-tab-pane>
            <el-tab-pane label="邮寄信息" name="third">邮寄信息</el-tab-pane>
            <el-tab-pane label="操作日志" name="fourth">操作日志</el-tab-pane>
            <el-tab-pane label="服务费用" name="fifth">服务费用</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import "../../../../assets/css/page/detail.less";
  @import "../../../../assets/css/page/financeDetail.less";

</style>

<script>
  export default {
    data() {
      return {
        id: this.$route.params.id,
        banks: [],
        totalNum: 0,
        activeTab: "first",
        detailInfo: {},
        billTable: []
      };
    },
    mounted() {
      this.getDetail(this.id);
      this.getList();
    },
    methods: {
      getList() {
        this.$axios
          .get("finace/query/info", {
            params: {
              offset: 1,
              pageSize: 10
            }
          })
          .then(response => {
            this.banks = response.rows;
            this.totalNum = response.rows.length;
          });
      },
      getDetail(pid) {
        this.$axios.get("/finace/info/get/" + pid).then(response => {
          this.detailInfo = response.rows;
        });
      },
      getThisDetail(pid) {
        for (let i = 0; i < this.banks.length; i++) {
          if (this.banks[i].id == pid) {
            this.$set(this.banks[i], "checked", true);
          } else {
            this.$set(this.banks[i], "checked", false);
          }
        }
        this.getDetail(pid);
      }
    }
  };

</script>
