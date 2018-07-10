<template>
  <div class="container">
    <div class="header-breadcrumb">
      <div class="breadcrumb-wrap fl">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>数据中心</el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb-current">合同 </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-button size="mini" round class="btn-link fr" @click="$router.go(-1)">
        <i class="icon iconfont icon-fanhui"></i>
        返回
      </el-button>
    </div>
    <div class="list-wrap">
      <div class="container-head">
        <div class="container-head-lf">
          <div class="fl mr20">
            供应商状态：
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
          <div class="container-header-search">
            <el-input placeholder="请输入关键字查询" class="input-radius" v-model="keyword">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>   
            </el-input>
          </div>
          <el-button type="primary" class="btn-search" round @click="getContractList">高级搜索</el-button>
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
        <el-table ref="multipleTable" :data="contractTable" class="table" @row-click="getDetail">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="" label="合同编号"></el-table-column>
          <el-table-column prop="" label="合同名称"></el-table-column>
          <el-table-column prop="" label="发起方"></el-table-column>
          <el-table-column prop="" label="创建时间"></el-table-column>
          <el-table-column prop="" label="联系人"></el-table-column>
          <el-table-column prop="" label="电话"></el-table-column>
          <el-table-column prop="" label="邮箱"></el-table-column>
          <el-table-column prop="" label="备注"></el-table-column>
          <el-table-column prop="" label="状态"></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @current-change="currentChange" @prev-click="currentChange" @next-click="currentChange" :current-page.sync="paging.currentPage" :page-sizes="[10,20,50]"
            :page-size="10" layout="prev, pager, next, total,jumper" :total="paging.total" background>
          </el-pagination>
          <el-button class="btn-pagination">确认</el-button>
        </div>
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
        contractTable: [],
        keyword: '',
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
      this.getContractList();
    },
    methods: {
        currentChange(value){
            this.paging.offset = value;
            this.getContractList();
        },
        getContractList(){
            this.$axios.get('bcontract/query',{
                params: {
                    offset: this.paging.offset,
                    keyword: this.keyword
                }
            })
            .then((response) => {
                this.contractTable = response.rows;
                this.paging.total = response.total;
            })
        },
        getDetail(row) { 
            this.$router.push({ name: "BcontractDetail", params: { id: row.id } });
        }
    }
  };

</script>
