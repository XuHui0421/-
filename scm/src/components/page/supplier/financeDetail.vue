<template>
  <div class="container" ref="container">
    <div class="header-breadcrumb">
      <div class="breadcrumb-wrap fl">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>数据中心</el-breadcrumb-item>
          <el-breadcrumb-item>融资清单 </el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb-current">融资信息 </el-breadcrumb-item>
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
            <li v-for="finance in financeList" @click="getThisDetail(finance.id)">
              <el-checkbox v-model="finance.checked"></el-checkbox>
              <div class="item  item-lf">
                <div class="item-tel">{{finance.finaceEnterprise}}</div>
                <div class="item-bank">{{finance.applyBankName}}</div>
              </div>
              <div class="item item-rt">
                <div class="w80 text-overflow">{{finance.coreEnterpriseName}}</div>
                <div class="item-status" v-bind:class="finance.status|applyStatus().color">{{finance.statusDesc}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="list-num">
          当前已加载：{{financeList.length}}条
        </div>
      </div>
      <div class="container-right" >
        <div class="detail-header">
          <h1 class="detail-title">{{detailInfo.loanNo}}</h1>
          <div class="operate-list">
            <el-button type="primary" size="mini" round>
              <i class="icon iconfont icon-daochu"></i>
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
          </div>
        </div>
        <div class="detail-tab">
          <div class="triangle-topright">
            <span>{{detailInfo.statusDesc}}</span>
          </div>
          <el-tabs v-model="activeTab" class="mt20">
            <el-tab-pane label="融资详情" name="first">
              <div class="finance-detail">
                <ul class="finance-detail-list">
                  <li>
                    <span class="item-label blue talrt">银行</span>{{detailInfo.applyBankName }}</li>
                  <li>
                    <span class="item-label blue talrt">核心企业</span>{{detailInfo.coreEnterpriseName}}</li>
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
                        <span class="finance-item-info">{{detailInfo.applyAmount }}</span>
                      </div>
                      <div class="col-2">
                        <span class="finance-item-label">实际到账金额:</span>
                        <span class="finance-item-info orange">{{detailInfo.moneyDone  ? Number(detailInfo.moneyDone ).toFixed(2) : ''}}</span>
                      </div>
                      <div class="col-2">
                        <span class="finance-item-label">利率:</span>
                        <span class="finance-item-info">{{detailInfo.loanRate}}
                          <span class="quest">?</span>
                        </span>
                      </div>
                      <div class="col-2">
                        <span class="finance-item-label">服务费:</span>
                        <span class="finance-item-info">{{detailInfo.serviceCharge}}</span>
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
                    <span>{{detailInfo.remark}}</span>
                  </div>
                  <el-table :data="detailInfo.detailList" style="width: 100%">
                    <el-table-column prop="kprq" label="发票日期" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="fphm" label="发票号" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="je" label="发票金额" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="statusDesc" label="状态" align="center" header-align="center"></el-table-column>
                    <el-table-column label="附件" align="center" header-align="center">
                      <template scope="scope">
                        <span class="blue">查看</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="关联附件" name="second">
              <ul class="file-list">
                <li v-for="file in fileList ">
                  <img v-bind:src="file.url" alt="" class="file-img">
                  <p class="file-title">{{file.name}}</p>
                  <a v-bind:href="file.url" download class="download">下载附件</a>
                </li>
              </ul>
              <el-button type="primary" size="mini" round>
                <i class="icon iconfont icon-xiazai"></i>
                全部下载
              </el-button>


            </el-tab-pane>
            <el-tab-pane label="邮寄信息" name="third">
              <div class="tab-content bg-base">
                <h2 class="tab-info-title">
                  <span class="title-tip">!</span>
                  融资编号为：14512315452145645
                </h2>
                <div class="info-wrap">
                  <p>邮寄资料清单：</p>
                  <p>1、申请出下载并敲章</p>
                  <p>2、请将通知书下载并敲章</p>
                  <p>3、请将融资单据原件</p>
                </div>
                <div class="info-wrap">
                  <p>邮寄信息</p>
                  <p>
                    地址：苏州工业园区平胜路瑞安巷9号 联系人：王经理 电话：1234654566
                    <span class="badge-success">我已邮寄</span>
                  </p>
                </div>
                <div class="info-wrap">
                  <p>快递信息</p>
                  <p>
                    物流公司：顺丰 编号：123123
                    <span class="badge-wait">等待签收</span>
                  </p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="操作日志" name="fourth">
              <el-table ref="multipleTable" :data="logTable" class="table">
                <el-table-column prop="logTime" label="日志时间"></el-table-column>
                <el-table-column prop="name" label="产品/项目名称"></el-table-column>
                <el-table-column prop="detail" label="日志详情"></el-table-column>
                <el-table-column prop="detail" label="日志详情"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="服务费用" name="fifth">
              <div class="fee-content bg-gray">
                <div class="fee-rule">
                  <span class="rule-tip">!</span>
                  <span>计费规则</span>
                </div>
                <div class="fee-main">
                  共计支付
                  <span class="fee-number">
                    <span class="fee-currency">￥</span>
                    <span>{{detailInfo.serviceCharge}}</span>
                  </span>
                </div>
                <div class="text-center">
                  <el-button type="primary" size="mini">账户信息</el-button>
                </div>
              </div>
              <el-table ref="multipleTable" :data="billTable" class="table">
                <el-table-column prop="" label="发票代码"></el-table-column>
                <el-table-column prop="" label="发票号码"></el-table-column>
                <el-table-column prop="time" label="开票日期"></el-table-column>
                <el-table-column prop="" label="开具金额(不含税)"></el-table-column>
                <el-table-column prop="" label="开票企业"></el-table-column>
                <el-table-column prop="" label="产生费用"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import "../../../assets/css/page/detail.less";
  @import "../../../assets/css/page/financeDetail.less";
  @import "../../../assets/css/page/serviceFee.less";

</style>

<script>
  export default {
    data() {
      return {
        financeList: [],
        totalNum: 0,
        activeTab: "first",
        detailInfo: {},
        billTable: [],
        fileList: [
        ],
        logTable: []
      };
    },
    created() {
      this.$store.commit("setActiveTab", "/data");
      this.getDetail(this.$route.params.id);
      this.getList();
    },
    methods: {
      getList() {
        this.$axios.get("sloan/query")
        .then(response => {
            this.financeList = response.rows;
        });
      },
      getDetail(pid) {
        this.$axios.get("sloan/get/" + pid)
        .then(response => {
          this.detailInfo = response.rows;
        });
      },
      getThisDetail(pid) {
        for (let i = 0; i < this.financeList.length; i++) {
          if (this.financeList[i].id == pid) {
            this.$set(this.financeList[i], "checked", true);
          } else {
            this.$set(this.financeList[i], "checked", false);
          }
        }
        this.getDetail(pid);
      }
    }
  };

</script>
