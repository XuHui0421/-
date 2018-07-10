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
          <el-button type="primary" class="btn-search" round @click="getBusinessList">高级搜索</el-button>
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
        <el-table ref="multipleTable" :data="businessTable" class="table" @row-click="getDetail">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="applicant" label="公司名称"></el-table-column>
          <el-table-column prop="" label="简称"></el-table-column>
          <el-table-column prop="" label="合作开始时间"></el-table-column>
          <el-table-column prop="" label="合作年限"></el-table-column>
          <el-table-column prop="" label="联系人"></el-table-column>
          <el-table-column prop="mobile" label="电话"></el-table-column>
          <el-table-column prop="" label="授信额度"></el-table-column>
          <el-table-column prop="" label="可用额度"></el-table-column>
          <el-table-column prop="" label="已使用额度"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
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
        businessTable: [],
        keyword: '',
        loading: false,
        paging: {
          total: 0,
          pageSize: 10,
          offset: 1,
           currentPage: 0 //当前页数
        },
       
      };
    },
    created() {
      this.$store.commit("setActiveTab", "/business");
      this.getBusinessList();
    },
    methods: {
        currentChange(value){
            this.paging.offset = value;
            this.getBusinessList();
        },
         getBusinessList(){//融资列表
            this.$axios.get('sloan/query',{
                params: {
                    offset: this.paging.offset,
                    keyword: this.keyword
                }
            })
            .then((res) => {
                this.businessTable = res.rows;
                this.paging.total = res.total;
            });
        },
      getDetail(row) {
        this.$router.push({
          name: "BusinessDetail",
          params: {
            id: row.id
          }
        });
      }
    }
  };

</script>
