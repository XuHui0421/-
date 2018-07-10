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
    <div class="list-box">
      <div class="no-record-tip" v-show="paging.total == 0">
        <img src="../../../../static/img/no_record_tip.png" alt="">
        <p>抱歉，暂无您所需的记录</p>
      </div>
      <ul class="bank-list">
        <li v-for="bank in bankList" @click="bankDetail(bank.portraitId)">
          <a>
              <div class="list-body o-h ">
                    <div class="item-lf">
                        <img src="../../../../static/img/bank.png" class="bank-logo">
                        <p>{{bank.bank}}</p>
                    </div>
                    <div class="item-rt">
                        <p>{{bank.startDate}}</p>
                        <p>**产品</p>
                    </div>
              </div>
            
            <div class="list-footer">
                <span>{{bank.contract}} {{bank.contractTel}}</span>
                <span class="bank-money fr">******</span>
            </div>
          </a>
        </li>
      </ul>
      <div class="pagination" v-show="paging.total / paging.pageSize > 1">
        <el-pagination @current-change="currentChange" @prev-click="currentChange" @next-click="currentChange" :current-page.sync="paging.currentPage" :page-sizes="[10,20,50]"
          :page-size="10" layout="prev, pager, next, total,jumper" :total="paging.total" background>
        </el-pagination>
        <el-button class="btn-pagination">确认</el-button>
      </div>
    </div>

  </div>
</template>

<style scoped lang="less">
  @import "../../../assets/css/page/bank.less";

</style>

<script>
  export default {
    data() {
      return {
        bankList: [],
        paging: {
            total: 0,
            pageSize: 10,
            offset: 1,
            currentPage: 0 //当前页数
        },
        
      };
    },
    created() {
      this.$store.commit("setActiveTab", "/data");
      this.getBankList();
    },
    methods: {
         currentChange(value){
            this.paging.offset = value;
            this.getBankList();
        },
        bankDetail(portraitId) {
            this.$router.push({ name: "BbankDetail", params: { id: portraitId } });
        },
        getBankList(){
            this.$axios.get('benter/banked?offset='+this.paging.offset)
            .then((response) => {
                this.bankList = response.rows;
                this.paging.total = response.total;
            })
        }
    }
  };

</script>
