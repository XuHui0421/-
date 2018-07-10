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
                    <el-button type="primary" class="btn-search" round @click="getMessageList">高级搜索</el-button>
                </div>
            </div>
            <div class="container-list">
                <el-table ref="multipleTable" :data="messageTable" class="table">
                    <el-table-column prop="title" label="主题"></el-table-column>
                    <el-table-column prop="content" label="内容"></el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                    <el-table-column prop="type" label="类型"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination @current-change="currentChange" @prev-click="currentChange" @next-click="currentChange" :current-page.sync="paging.currentPage" :page-sizes="[10,20,50]" :page-size="10"
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
      messageTable: [],
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
    this.$store.commit("setActiveTab", "/system");
    this.getMessageList();
  },
  methods: {
    currentChange(value){
        this.paging.offset = value;
        this.getMessageList();
    },
    getMessageList(){
        this.$axios.get('msg/query',{
                params: {
                    offset: this.paging.offset,
                    keyword: this.keyword
                }
            })
        .then((res) => {
            this.messageTable = res.rows;
            this.paging.total = res.total;
        });
    }
  }
};
</script>

