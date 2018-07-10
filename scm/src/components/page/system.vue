<template>
    <div class="container">
                <div class="list-wrap">
                    <div class="container-head">
                        <div class="container-head-lf">
                            状态：
                            <el-dropdown trigger="click" class="dropdown dropdown-round">
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
                        <div class="container-head-rt">
                            <div class="container-header-search">
                                <el-input placeholder="请输入关键字查询" class="input-radius">
                                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                                </el-input>
                            </div>
                            <el-button type="primary" class="btn-search" round>高级搜索</el-button>
                        </div>
                    </div>  
                    <div class="container-list ">
                        <el-table class="table"  v-loading="loading"  ref="multipleTable" :data="tableData" tooltip-effect="dark" align="left"   @row-click="getDetail">
                            <el-table-column label="申请时间">  
                                <template slot-scope="scope">
                                    {{ scope.row.applyTime  | formatDate("yyyy-MM-dd") }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="applyAmount" label="申请金额">
                            </el-table-column>
                            <el-table-column prop="billAmount" label="到账金额">
                            </el-table-column>
                            <el-table-column prop="coreEnterpriseName" label="核心企业">
                            </el-table-column>
                            <el-table-column prop="contact" label="融资方">
                            </el-table-column>
                            <el-table-column prop="applyBankName" label="资金方">
                            </el-table-column>
                            <el-table-column prop="type" label="融资类型">
                            </el-table-column>
                            <el-table-column prop="currency" label="币别">
                            </el-table-column>
                            <el-table-column prop="code" label="发票号">
                            </el-table-column>
                            <el-table-column label="状态">
                                <template slot-scope="scope">
                                    <span v-bind:class="scope.row.status|applyStatus().color">
                                        {{ scope.row.status | applyStatus().status}}
                                    </span>
                                    
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination @current-change="currentChange" @prev-click="currentChange" @next-click="currentChange" :current-page.sync="currentPage" :page-sizes="[10,20,50]" :page-size="10"
                            layout="prev, pager, next, total,jumper"
                            :total="paging.total" background>
                            </el-pagination>
                             <el-button class="btn-pagination">确认</el-button>
                        </div>
                    </div>
                </div>
                
            </div>
</template>
<style lang="less">
@import "../../assets/css/common.less";
@import "../../assets/css/page/system.less";
</style>

<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      paging: {
        total: 0,
        pageSize: 10,
        offset: 1
      },
      currentPage: 0 //当前页数
    };
  },
  created() {
    // this.getList();
    this.$store.commit("setActiveTab", "/system");
  },
  methods: {
      currentChange(val){
            this.paging.offset = val;
            this.getList();
        },
    getList() {
      this.loading = true;
      this.$axios
        .get("finace/query/info", {
          params: {
            offset: this.paging.offset,
            pageSize: this.paging.pageSize
          }
        })
        .then(response => {
          this.loading = false;
          this.tableData = response.rows;
          this.paging.total = response.total;
        });
    },
    getDetail(row, event, column) {
      this.$router.push({ name: "Detail", params: { id: row.id } });
    },
    handleSizeChange(val) {
      this.paging.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.paging.offset = val;
      this.getList();
    }
  }
};
</script>
