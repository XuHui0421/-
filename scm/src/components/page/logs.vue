<template>
    <div class="container">
        <div class="list-wrap">
            <div class="container-head">
                <div class="container-head-lf">
                    <div class="container-header-search">
                        <el-input placeholder="请输入关键字查询" class="input-radius" v-model="keyword">
                            <i slot="suffix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                    <el-button type="primary" class="btn-search" round @click="getLogist">高级搜索</el-button>
                </div>
                <div class="container-head-rt">
                    <el-button type="primary" size="mini" round icon="el-icon-download"  class="mr10">下载日志</el-button>
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
                <el-table ref="multipleTable" :data="logTable" class="table">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="createTime" label="日志时间"></el-table-column>
                    <el-table-column prop="title" label="产品/项目名称"></el-table-column>
                    <el-table-column prop="content" label="日志详情"></el-table-column>
                    <el-table-column prop="content " label="日志详情"></el-table-column>
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

<style scoped lang="less">
@import "../../assets/css/page/logs.less";
</style>


<script>
export default {
  data() {
    return {
      logTable: [],
      keyword: '',
      loading: false,
      paging: {
        total: 0,
        pageSize: 10,
        offset: 1
      },
      currentPage: 0 //当前页数
    };
  },
  created() {
    this.$store.commit("setActiveTab", "/system");
    this.getLogist();
  },
  methods: {
      currentChange(value){
            this.paging.offset = value;
            this.getLogist();
        },
      getLogist(){
        this.$axios.get('log/query',{
                params: {
                    offset: this.paging.offset,
                    keyword: this.keyword
                }
            })
        .then((res) => {
            this.logTable = res.rows;
            this.paging.total = res.total;
        });
    }
  }
};
</script>

