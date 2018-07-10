<template>
    <div class="container">
        <div class="header-breadcrumb">
            <div class="breadcrumb-wrap fl">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item >数据中心</el-breadcrumb-item>
                    <el-breadcrumb-item class="breadcrumb-current">服务费 </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-button size="mini" round class="btn-link fr" @click="$router.go(-1)">
                <i class="icon iconfont icon-fanhui"></i>
                返回
            </el-button>
        </div>
        <div class="fee-content bg-gray">
            <div class="fee-rule">
                <span class="rule-tip">!</span>
                <span>计费规则</span>
            </div>
            <div class="fee-main">
                共计支付
                <span class="fee-number">
                    <span class="fee-currency">￥</span>
                    <span>{{feeTotal}}</span>
                </span>
            </div>
            <div class="text-center">
                <el-button type="primary" size="mini" @click="accountDialog = true">账户信息</el-button>
            </div>
        </div>
        <el-table ref="multipleTable" :data="feeTable" class="table">
            <el-table-column prop="bankName" label="银行"></el-table-column>
            <el-table-column prop="busName" label="供应商名称"></el-table-column>
            <el-table-column prop="totalAmount" label="融资金额"></el-table-column>
            <el-table-column prop="amount" label="服务费"></el-table-column>
            <el-table-column prop="contractNo" label="合同号"></el-table-column>
            <el-table-column label="账期">
                 <template slot-scope="scope">
                    {{ scope.row.dayTime }}天
                </template>
            </el-table-column>
            <el-table-column prop="invoiceStatusDesc" label="开票状态"></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @current-change="currentChange" @prev-click="currentChange" @next-click="currentChange" :current-page.sync="paging.currentPage" :page-sizes="[10,20,50]"
            :page-size="10" layout="prev, pager, next, total,jumper" :total="paging.total" background>
          </el-pagination>
          <el-button class="btn-pagination">确认</el-button>
        </div>
        <el-dialog title="账户信息" :visible.sync="accountDialog" width="30%">
            <div class="dialog-body">
                <div>
                    <span>账号：</span>
                    <span>12312545645</span>
                </div>
                <div class="mt20">
                    <span>开户行：</span>
                    <span>中国银行</span>
                </div>
                <div class="mt20">
                    <span>开户行地址：</span>
                    <span>独墅湖高教区</span>
                </div>
                <div class="mt20">
                    <span>联系人：</span>
                    <span class="mr50">张三</span>
                    <span>联系方式：</span>
                    <span>12312545645</span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<style scoped lang="less">
@import "../../../assets/css/page/serviceFee.less";
</style>


<script>
export default {
  data() {
    return {
      feeTable: [],
      paging: {
            total: 0,
            pageSize: 10,
            offset: 1,
            currentPage: 0 //当前页数
        },
       feeTotal: 0,//服务费用
       accountDialog: false
    };
  },
  created() {
    this.$store.commit("setActiveTab", "/data");
    this.getList();
  },
  methods: {
       currentChange(val){
            this.paging.offset = val;
            this.getList();
        },
      getList(){
         this.$axios.get('sfee/query?offset='+this.paging.offset)
        .then((res) => {
            this.feeTable = res.rows;
            this.paging.total = res.total;
        });
      },
      getFeeTotal(){
        this.$axios.get('sfee/query')
        .then((res) => {
            this.feeTotal = res.rows;
        });
      }
  }
};
</script>

