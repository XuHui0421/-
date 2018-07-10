<template>
  <div class="container o-h">
    <div class="finance-process-box">
          <finance-process :status="financeDetail.status" :dataWayType="financeDetail.dataWayType"></finance-process>
    </div>
    <div class="container-wrap">
      <div class="container-left">
        <div class="detail-header">
          <div class="header-drop">
            <el-dropdown trigger="click" class="dropdown dropdown-square">
              <span class="el-dropdown-link">
                {{$route.params.supplidName}}
                <i class="el-icon-arrow-down"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="supplier in supplierList">{{supplier.finaceEnterpriseName}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="detail-list-wrap">
          <div class="list-search">
            <div class="list-input">
              <el-input placeholder="请输入关键字查询" size="mini"></el-input>
            </div>
            <el-button class="btn-green ml10" size="mini">查询</el-button>
            <span class="blue ml10">高级</span>
          </div>
          <!-- <div class="list-search">
          <div class="list-input">
            <el-input placeholder="请输入关键字查询" size="mini"></el-input>
          </div>
          <el-button class="btn-green" size="mini">查询</el-button>
          <el-button class="btn-link btn-border-none mr10" size="mini">高级</el-button>
        </div> -->
          <ul class="company-list multi-line">
            <li v-for="(bill,index) in billList" @click="getThisDetail(index)">
              <el-checkbox v-model="bill.checked"></el-checkbox>
              <div class="item  item-lf">
                <div class="item-tel">{{bill.gfmc}}</div>
                <div class="item-bank">{{bill.creator}}</div>
              </div>
              <div class="item item-rt">
                <div class="item-time">{{bill.applyTime | formatDate("yyyy-MM-dd")}}</div>
                <div class="item-status" v-bind:class="bill.status|applyStatus().color">{{bill.statusDes}}</div>
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
          <h1 class="detail-title">{{billDetail.loanNo}}</h1>
        </div>
        <div class="detail-body">
          <div class="bill-box border">
            <table class="text-break bill-table">
              <tbody>
                <tr class="no-border">
                  <td colspan="20" class="no-border">
                    <div class="detail-body-title">融资票据</div>
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
                <tr v-for="sphGeneral in billDetail.sphGeneral" class="text-center">
                  <td colspan="5">{{sphGeneral.spmcGeneral}}</td>
                  <td colspan="2">{{sphGeneral.ggxhGeneral}}</td>
                  <td>{{sphGeneral.jldwGeneral}}</td>
                  <td>{{sphGeneral.slGeneral}}</td>
                  <td colspan="2">{{sphGeneral.jeGeneral}}</td>
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
          <ul class="file-list">
            <li v-for="file in fileList ">
              <img v-bind:src="file.url" alt="" class="file-img">
              <p class="file-title">{{file.name}}</p>
              <a v-bind:href="file.url" download class="download">下载附件</a>
            </li>
          </ul>
          <div class="text-center mt100">
            <el-button type="danger" @click="errorBill(billDetail.id)">有误</el-button>
            <el-button type="primary" @click="passConfirm(billDetail.id)">通过</el-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="less">
  @import "../../../assets/css/page/detail.less";
  @import "../../../assets/css/page/financeDetail.less";
  @import "../../../assets/css/page/billDetail.less";

</style>


<script>
  import FinanceProcess from '../financeProcess';
  export default {
      components:{
          FinanceProcess
      },
    data() {
      return {
        billList: [],
        billDetail: {},
        fileList: [],
        paging: {
          total: 0,
          pageSize: 10,
          offset: 1
        },
        contract: {},
        supplierList: [],//供应商列表
        financeDetail: {},
      }
    },
    created() {
      this.$store.commit("setActiveTab", "/confirm");
      this.getBillList(this.$route.params.supplieId);
      this.getSupplierList();
      this.getfinanceDetail();
    },
    methods: {
        getfinanceDetail(){//融资详情
            this.$axios.get('bloan/get/'+this.$route.params.id)
            .then((res) => {
                this.financeDetail = res.rows;
            });
        },
        getSupplierList() {//供应商列表
            this.$axios.get('bloan/query/summary/detail/'+this.$route.params.id)
            .then((res) => {
                this.supplierList = res.rows;
            });
        },
      getBillList(pid) {//发票列表
        this.$axios.get('bloan/query/summary/invoice/'+pid)
          .then((res) => {
                this.billList = res.rows;
                this.paging.total = res.total;
                if(res.rows.length > 0){
                    this.getBillDetail(0);
                }

            
          });
      },
      getBillDetail(index) {
        this.billDetail = this.billList[index];
      },
      getThisDetail(index) {
        this.$set(this.billList[index], "checked", true);
        this.getBillDetail(index);
      },
      errorBill(billId) { //发票有误
        this.$axios.get('bloan/error/' + billId)
          .then((response) => {
            this.$Message.success('已通过');
          });
      },
      passConfirm(billId) { //通过
        this.$axios.get('bloan/detail/confirm/' + billId)
          .then((response) => {
            this.$Message.success('已通过');
          });
      }
    }
  };

</script>
