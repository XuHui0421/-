<template>
  <div class="container ">
    <div class="process-bar">
      <div class="title">
        确权申请  
        <span class="orange">{{financeInfo.code}}</span> 
      </div>
      <div class="process-line">
        <div class="line-wrap" v-bind:class="{active : step > 1 || step == 1}">
          <div class="title-des">确权申请</div>
          <div class="process-icon">
            <i v-if="step > 1 " class="icon iconfont icon-duigou-copy"></i>
            <span v-else class="process-step">1</span>
          </div>
        </div>
        <div class="line-wrap" v-bind:class="{active : step > 2 || step == 2}">
          <div class="title-des">提交银行</div>
          <div class="process-icon">
            <i v-if="step > 2" class="icon iconfont icon-duigou-copy"></i>
            <span v-else class="process-step">2</span>
          </div>
        </div>
        <div class="line-wrap" v-bind:class="{active : step > 3 || step == 3}">
          <div class="title-des">等待反馈</div>
          <div class="process-icon">
            <i v-if="step > 3" class="icon iconfont icon-duigou-copy"></i>
            <span v-else class="process-step">3</span>
          </div>
        </div>
      </div>
    </div>
    <div class="f-box">
      <div class="f-box-left">
        <h4 class="text-blod fz16 info-dark">操作分类:</h4>
        <ul class="filter-l-list">
          <li :class="{active: active == 1}" @click="getSupplierList(1)">
            <span class="text-justify">全部 </span>
            <sup class="el-badge__content bg-blue">10</sup>
            <i class="el-icon-arrow-right"></i>
          </li>
          <li :class="{active: active == 15}" @click="getSupplierList(15)">
            <span class="text-justify">已确认 </span>
            <sup class="el-badge__content bg-blue">3</sup>
            <i class="el-icon-arrow-right"></i>
          </li>
          <li :class="{active: active == 5}" @click="getSupplierList(5)">
            <span class="text-justify">待确认 </span>
            <sup class="el-badge__content bg-blue">5</sup>
            <i class="el-icon-arrow-right"></i>
          </li>
          <!-- <li :class="{active: active == 4}" @click="getSupplierList(4)">
            <span class="text-justify">异常 </span>
            <sup class="el-badge__content">2</sup>
            <i class="el-icon-arrow-right"></i>
          </li> -->
        </ul>
      </div>
      <div v-if="paging.total != 0" class="f-box-right border">
        <div class="header-breadcrumb">
          <div class="belong-class-box">
            <ul class="belong-class fl">
              <div class="info fl">所属类目：</div>
              <li v-for="item in classList">
                  <span>{{item.name}}</span>
              </li>
            </ul>
            <div class="fr">
              <div class="container-header-search">
                <el-input placeholder="请输入关键字查询" class="input-radius" v-model="keyword">
                  <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </div>
              <el-button type="primary" class="btn-search" round @click="getSupplierList">高级搜索</el-button>
            </div>
          </div>
        </div>
        <el-row class="confirm-body">
          <el-col class="list-box" :span="8" v-for="supplier in supplierList">
            <a @click="billDetail(supplier.id,supplier.finaceEnterpriseName)">
              <div class="confirm-status wait" :class="supplier.statusDesc | confirmStatus().color">{{supplier.statusDesc}}</div>
              <div class="list-header">
                <img src="../../../../static/img/logo2.png" class="face fl" alt="">
                <span class="text-ellipsis">{{supplier.finaceEnterpriseName}}</span>
              </div>
              <div class="list-body">
                <el-row>
                  <el-col :span="8" :offset="4" class="text-center ver-line">
                    <div class="border-bottom">
                      <p class="info">申请金额</p>
                      <p class="box-list-info">
                        <span class="text-title info-dark">{{supplier.applyAmount}}</span>
                      </p>
                    </div>
                  </el-col>
                  <el-col :span="8" class="text-center">
                    <div class="border-bottom">
                      <p class="info">申请票数</p>
                      <p class="box-list-info">
                        <span class="text-title info-dark">{{supplier.detailList.length}}</span>
                      </p>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" :offset="4" class="text-center ver-line ver-line2">
                    <div>
                      <p class="info">确认金额</p>
                      <p class="box-list-info">
                        <span class="text-title info-dark">{{supplier.applyAmount}}</span>
                      </p>
                    </div>
                  </el-col>
                  <el-col :span="8" class="text-center ">
                    <div>
                      <p class="info">确认票数</p>
                      <p class="box-list-info">
                        <span class="text-title info-dark"></span>
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <el-row class="list-footer">
                <el-col :span="8" class="text-ellipsis">操作员：{{supplier.contact}}</el-col>
                <el-col :span="11">合作年限：</el-col>
                <el-col :span="5" class="text-ellipsis text-left">{{supplier.className}}</el-col>
              </el-row>
              <div class="box-hover">
                <div class="circular bg-blue">审</div>
              </div>
            </a>
          </el-col>

        </el-row>

        <div class="confirm-footer">
          <div class="pagination pagination-right">
            <el-pagination @current-change="currentChange" @prev-click="currentChange" @next-click="currentChange" :current-page.sync="currentPage"
              :page-sizes="[10,20,50]" :page-size="10" layout="prev, pager, next, total,jumper" :total="paging.total" background>
            </el-pagination>
            <el-button class="btn-pagination">确认</el-button>
          </div>
          <div class="next-step-wrap">
            <span class="mr20">
              总金额：
              <span class="money ">{{financeInfo.totalAmount}}</span>
            </span>
            <span>现有
              <span class="blue fz17">{{supplierList.length}}</span> 家供应商</span>
            <div class="fr">
              <span class="fl mr20">2018年10月10日</span>
              <div class="step-btn next-step mr10" @click="financeDetail">
                查看详情
              </div>
              <div class="step-btn next-step " @click="confirmAll" :class="{'next-step-disabled': financeInfo.status != 10}">
                发送银行
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f-box-right" v-else>
        <div class="no-record-tip">
          <img src="../../../../static/img/no_record_tip.png" alt="">
          <p>抱歉，暂无您所需的记录</p>
        </div>
      </div>

    </div>

  </div>
</template>
<style scoped lang="less">
  @import "../../../assets/css/page/process.less";
  @import "../../../assets/css/page/step.less";
  @import "../../../assets/css/page/confirm.less";

</style>


<script>
  export default {
    data() {
      return {
        step: 1,
        active: 1,
        financeInfo: {},
        supplierList: [],
        keyword: '',
        paging: {
          total: 1,
          pageSize: 10,
          offset: 1
        },
        currentPage: 0,
        financeId: '',
        classList: []
      };
    },
    created() {
      this.$store.commit("setActiveTab", "/confirm");
      this.getSupplierList(this.active);
      this.getClassList();
    },
    methods: {
      currentChange(value) {
        this.paging.offset = value;
        this.getSupplierList();
      },
      getSupplierList(active) {
        this.$axios.get('bloan/query/summary/finacing',{
            params: {
                offset: this.paging.offset,
                keyword: this.keyword,
                status: active == 1 ? '' : active
            }
        })
        .then((res) => {
            this.active = active;
            this.financeInfo = res.rows[0];
            this.supplierList = res.rows[0].infoList;
            this.paging.total = res.total;
            this.financeId = res.rows[0].id
        });
      },
       getClassList(){
            this.$axios.get('bentertype/query')
            .then((res) => {
                this.classList = res.rows;
            });
        },
      billDetail(pid,name) {
        this.$router.push({
          name: "ConfirmDetail",
          params: {
            id: this.financeId,
            supplieId: pid,
            supplidName: name
          }
        });
      },
      confirmAll() { //发送银行
        if(this.financeInfo.status == 10){
            this.$confirm('发送成功之后数据将无法变更?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('bloan/confirm/'+this.financeInfo.id)
                .then(() => {
                    this.$Message.success('发送成功!');
                });
            })
        }
        
      },
      financeDetail() {
        this.$router.push({
          name: "ConfirmFinance",
          params: {
            id: this.financeId
          }
        });
      }
    }


  };

</script>
