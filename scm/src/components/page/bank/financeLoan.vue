<template>
  <div class="container">
    <div class="list-wrap">
      <div class="container-head">
        <div class="container-head-lf">
          <div class="fl mr20">
            所属行业：
            <el-dropdown trigger="click" class="dropdown dropdown-round">
              <span class="el-dropdown-link">
                行业
                <i class="el-icon-arrow-down"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>申请中</el-dropdown-item>
                <el-dropdown-item>申请结束</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="container-header-search">
            <el-input placeholder="请输入关键字查询" class="input-radius" v-model="keyword">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <el-button type="primary" class="btn-search" round @click="getFinanceList">高级搜索</el-button>
        </div>
        <div class="container-head-rt">
          <el-dropdown trigger="click" class="dropdown dropdown-round dropdown-primary ">
            <span class="el-dropdown-link">
              更多
              <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>启用</el-dropdown-item>
              <el-dropdown-item>停用</el-dropdown-item>
              <el-dropdown-item>批量导入</el-dropdown-item>
              <el-dropdown-item>密码重置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="container-list ">
        <el-table ref="multipleTable" :data="financeTable" class="table" @row-click="getDetail">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="code" label="编号"></el-table-column>
          <el-table-column label="申请时间">
              <template slot-scope="scope">
                  <span>{{scope.row.applyTime | formatDate('yyyy-MM-dd')}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="totalAmount" label="申请金额"></el-table-column>
          <el-table-column prop="coreEnterpriseName" label="核心企业"></el-table-column>
          <el-table-column prop="statusDesc" label="状态"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  @import "../../../assets/css/page/logs.less";

</style>


<script>
  export default {
    data() {
      return {
        financeTable: [],
        keyword: '',
        loading: false,
       
      };
    },
    created() {
      this.$store.commit("setActiveTab", "/financeLoan");
      this.getFinanceList();
    },
    methods: {
        currentChange(value){
            this.paging.offset = value;
            this.getFinanceList();
        },
         getFinanceList(){//融资列表
            this.$axios.get('mloan/query/bank/home',{
                params: {
                    keyword: this.keyword
                }
            })
            .then((res) => {
                for(var i = 0;i< res.rows.length;i++){
                    for(var j = 0;j<res.rows[i].summaryVoList.length;j++){
                        this.financeTable.push(res.rows[i].summaryVoList[j]);
                    }
                    
                }
            });
        },
      getDetail(row) {
        this.$router.push({
          name: "BankFinanceDetail",
          params: {
            id: row.id
          }
        });
      }
    }
  };

</script>
