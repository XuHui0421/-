<template>
  <div class="container" >
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
            <li v-for="bill in billList" @click="getThisDetail(bill.id)">
              <el-checkbox v-model="bill.checked"></el-checkbox>
              <div class="item  item-lf">
                <div class="item-tel">{{bill.fpdm}}</div>
                <div class="item-bank">{{bill.fphm}}</div>
              </div>
              <div class="item item-rt">
                <div class="item-time">{{bill.kprq | formatDate("yyyy-MM-dd")}}</div>
                <div class="item-status" v-bind:class="bill.status|applyStatus().color">{{bill.status | applyStatus().status}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="list-num">
          当前已加载：{{billList.length}}条
        </div>
      </div>
      <div class="container-right">
        <div class="detail-header">
          <h1 class="detail-title">{{billDetail.code}}</h1>
          <div class="operate-list">
            <el-button type="primary" size="mini" round>
              <i class="icon iconfont icon-xiazai"></i>
              下载票据
            </el-button>
          </div>
        </div>
        <div class="detail-tab">
          <el-tabs v-model="activeTab" class="mt20">
            <el-tab-pane label="票据详情" name="first">
                <div class="bill-box border">
                    <table class="text-break bill-table">
                      <tbody>
                        <tr class="no-border">
                          <td colspan="20" class="no-border">
                            <div class="detail-body-title">***电子发票</div>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="4" class="no-border">
                            <span class="item-label">发票代码:</span>
                            <span class="item-info">{{billDetail.fpdm}}</span>
                          </td>
                          <td colspan="4" class="no-border">
                            <span class="item-label">发票编号:</span>
                            <span class="item-info">{{billDetail.fphm}}</span>
                          </td>
                          <td colspan="4" class="no-border">
                            <span class="item-label">开票日期:</span>
                            <span class="item-info">{{billDetail.kprq}}</span>
                          </td>
                          <td colspan="5" class="no-border">
                            <span class="item-label">校验码:</span>
                            <span class="item-info">{{billDetail.jym}}</span>
                          </td>
                          <td colspan="3" class="no-border">
                            <span class="item-label">机器编号:</span>
                            <span class="item-info">{{billDetail.jqbm}}</span>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="1" class="text-center">
                            <div class="mt20">购</div>
                            <div class="mt10">买</div>
                            <div class="mt10">方</div>
                          </td>
                          <td colspan="10">
                            <div class="mt10">
                              <span class="label">名称</span>:
                              <span class="info">{{billDetail.gfmc}}</span>
                            </div>
                            <div class="mt10">
                              <span class="label">纳税人识别号</span>:
                              <span class="info">{{billDetail.gfsh}}</span>
                            </div>
                            <div class="mt10">
                              <span class="label">地址、电话</span>:
                              <span class="info">{{billDetail.gfdzdh}}</span>
                            </div>
                            <div class="mt10">
                              <span class="label">开户行及账号</span>:
                              <span class="info">{{billDetail.gfyhzh}}</span>
                            </div>
                          </td>
                          <td colspan="1" class="text-center">
                            <div class="mt20">密</div>
                            <div class="mt10">码</div>
                            <div class="mt10">区</div>
                          </td>
                          <td colspan="8" class="no-border"></td>
                        </tr>
                        <tr class="text-center">
                          <td colspan="5">货物或应税劳务、服务名称</td>
                          <td colspan="2">规格型号</td>
                          <td>单位</td>
                          <td>数量</td>
                          <td colspan="2">单价</td>
                          <td colspan="3">金额</td>
                          <td colspan="3">税率</td>
                          <td colspan="3" class="no-border">税额</td>
                        </tr>
                        <tr v-for="sphGeneral in billDetail.sph" class="text-center blue">
                          <td colspan="5">{{sphGeneral.spmcGeneral}}</td>
                          <td colspan="2">{{sphGeneral.ggxhGeneral}}</td>
                          <td>{{sphGeneral.jldwGeneral}}</td>
                          <td>{{sphGeneral.slGeneral}}</td>
                          <td colspan="2"></td>
                          <td colspan="3">{{sphGeneral.jeGeneral}}</td>
                          <td colspan="3">{{sphGeneral.slvGeneral}}</td>
                          <td colspan="3" class="no-border">{{sphGeneral.seGeneral}}</td>
                        </tr>
                        <tr>
                          <td colspan="4">价税合计(大写)</td>
                          <td colspan="10" class="no-border blue">{{billDetail.jshj | changeMoneyToChinese()}}</td>
                          <td colspan="2" class="no-border">(小写)</td>
                          <td colspan="4" class="no-border blue">{{billDetail.jshj}}</td>
                        </tr>
                        <tr class="no-border">
                          <td class="text-center">
                            <div class="mt20">销</div>
                            <div class="mt10">售</div>
                            <div class="mt10">方</div>
                          </td>
                          <td colspan="10">
                            <div class="mt10">
                              <span class="label">名称</span>:
                              <span class="info">{{billDetail.xfmc}}</span>
                            </div>
                            <div class="mt10">
                              <span class="label">纳税人识别号</span>:
                              <span class="info">{{billDetail.xfsh}}</span>
                            </div>
                            <div class="mt10">
                              <span class="label">地址、电话</span>:
                              <span class="info">{{billDetail.xfdzdh}}</span>
                            </div>
                            <div class="mt10">
                              <span class="label">开户行及账号</span>:
                              <span class="info">{{billDetail.xfyhzh}}</span>
                            </div>
                          </td>
                          <td class="text-center">
                            <div class="mt20">备</div>
                            <div class="mt20">注</div>
                          </td>
                          <td colspan="8" class="no-border"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
  @import "../../../assets/css/page/billDetail.less";

</style>

<script>
  export default {
    data() {
      return {
        activeTab: "first",
        billDetail: {},
        billList: [],
      };
    },
    created() {
      this.getBillDetail(this.$route.params.id);
      this.getList();
    },
    methods: {
      getList() {
        this.$axios.get('sinvoice/query')
        .then((respnese) => {
            this.billList = respnese.rows;
        });
      },
      getBillDetail(pid) {//发票详情
           this.$axios.get('sinvoice/get/'+pid)
            .then((response) => {
                this.billDetail = response.rows;
            });
      },
      getThisDetail(pid) {
        for (let i = 0; i < this.billList.length; i++) {
          if (this.billList[i].id == pid) {
            this.$set(this.billList[i], "checked", true);
          } else {
            this.$set(this.billList[i], "checked", false);
          }
        }
        this.getBillDetail(pid);
      }
    }
  };

</script>
