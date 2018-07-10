<template>
  <div class="container">
    <div class="header-breadcrumb">
      <div class="breadcrumb-wrap fl">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>数据中心</el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb-current">客户 </el-breadcrumb-item>
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
        <ul class="company-list">
            <li v-for="company in companyList" @click="companyDetail(company.pid)">
                <a>
                <img src="../../../../static/img/companyLogo.png" class="company-logo">
                <p class="company-name">{{company.name}}</p>
                <p>
                    <span class="fl">
                    <i class="icon iconfont icon-lianxiren"></i>{{company.contract}}</span>
                    <span class="fr">
                    <i class="icon iconfont icon-dianhua"></i>{{company.contractTel}}</span>
                </p>
                </a>
            </li>
        </ul>
        <div class="pagination" v-show="paging.total / paging.pageSize > 1">
            <el-pagination @current-change="currentChange" @prev-click="currentChange" @next-click="currentChange"  :current-page.sync="paging.currentPage" :page-sizes="[10,20,50]" :page-size="10"
            layout="prev, pager, next, total,jumper"
            :total="paging.total" background>
            </el-pagination>
            <el-button class="btn-pagination">确认</el-button>
        </div>
    </div>
    
  </div>
</template>
<style scoped lang="less">
  @import "../../../assets/css/page/corecompany.less";

</style>

<script>
  export default {
    data() {
      return {
        companyList: [],
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
      this.getcompanyList();
    },
    methods: {
         currentChange(value){
            this.paging.offset = value;
            this.getcompanyList();
        },
        getcompanyList(){
            this.$axios.get('senter/brand?offset='+this.paging.offset+'&pageSize='+this.paging.pageSize)
            .then((response) => {
                this.companyList = response.rows;
                this.paging.total = response.total;
            })
        },
        companyDetail(pid) {
            this.$router.push({
            name: "ScompanyDetail",
            params: {
                id: pid
            }
            });
        }
    }
  };
</script>
