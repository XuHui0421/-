<template>
  <div class="container">
    <div class="f-box">
      <div class="f-box-left">
        <div class="back" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i> 返回
        </div>
        <h4 class="text-blod fz16 info-dark">财务管理:</h4>
        <ul class="filter-l-list">
          <li :class="{active: active == 1}" @click="active = 1">
            <span class=""> 供应商管理 </span>
            <i class="el-icon-arrow-right"></i>
          </li>
          <li :class="{active: active == 2}" @click="active = 2">
            <span class="">票据清单 </span>
            <i class="el-icon-arrow-right"></i>
          </li>
          <li :class="{active: active == 3}" @click="active = 3">
            <span class="">融资历史 </span>
            <i class="el-icon-arrow-right"></i>
          </li>
        </ul>
      </div>
      <div class="f-box-right border">
        <div v-if="active == 1">
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
                  <el-input placeholder="请输入关键字查询" class="input-radius" v-model="companyKeyword">
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>
                <el-button type="primary" class="btn-search" round @click="getCompanyList">高级搜索</el-button>
              </div>
            </div>
            <div class="info belong-class-box">
              <div class="fl">
                所属状态：
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
              <div class="fr">
                <el-button size="mini" round class="btn-link " @click="isSelect = true"> 指派</el-button>
              </div>
            </div>
          </div>
          <el-row class="confirm-body">
             <el-table ref="multipleTable" :data="companyTable" class="table" style="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="name" label="公司名称"></el-table-column>
              <el-table-column prop="" label="分类"></el-table-column>
              <el-table-column prop="startDate" label="合作开始时间"></el-table-column>
              <el-table-column prop="years" label="合作年限"></el-table-column>
              <el-table-column prop="contract" label="联系人"></el-table-column>
              <el-table-column prop="contractTel" label="电话"></el-table-column>
              <el-table-column prop="creditLine" label="授信额度"></el-table-column>
              <el-table-column prop="creditAvailable" label="可用额度"></el-table-column>
              <el-table-column prop="operatingStatus" label="状态"></el-table-column>
            </el-table>
          </el-row>
          <div class="confirm-footer">
            <div class="pagination">
              <el-pagination @current-change="currentCompany" @prev-click="currentCompany" @next-click="currentCompany" :current-page.sync="companyPaging.currentPage" :page-sizes="[10,20,50]" :page-size="10" layout="prev, pager, next, total,jumper"
                :total="companyPaging.total" background>
              </el-pagination>
              <el-button class="btn-pagination">确认</el-button>
            </div>
          </div>
        </div>
        <div v-else-if="active == 2">
          <div class="list-wrap">
            <div class="container-head">
              <div class="container-head-lf">
                <div class="fl mr20">
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
                <div class="container-header-search">
                  <el-input placeholder="请输入关键字查询" class="input-radius" v-model="billKeyword">
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>
                <el-button type="primary" class="btn-search" round @click="getBillList">高级搜索</el-button>
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
              <el-table ref="multipleTable" :data="billTable" class="table">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="fpdm" label="发票代码"></el-table-column>
                <el-table-column prop="fphm" label="发票号码"></el-table-column>
                <el-table-column prop="kprq" label="开票日期"></el-table-column>
                <el-table-column prop="je" label="开票金额(不含税)"></el-table-column>
                <el-table-column prop="gfmc" label="开票企业"></el-table-column>
                <el-table-column prop="statusDes" label="状态"></el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination @current-change="currentBill" @prev-click="currentBill" @next-click="currentBill" :current-page.sync="billPaging.currentPage" :page-sizes="[10,20,50]" :page-size="10" layout="prev, pager, next, total,jumper"
                  :total="billPaging.total" background>
                </el-pagination>
                <el-button class="btn-pagination">确认</el-button>
              </div>
            </div>
          </div>
        </div>
        <div v-else="active == 3">
          <div class="list-wrap">
            <div class="container-head">
              <div class="container-head-lf">
                <div class="fl mr20">
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
                <div class="container-header-search">
                  <el-input placeholder="请输入关键字查询" class="input-radius" v-model="financeKeyword">
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
              <el-table ref="multipleTable" :data="financeTable" class="table" >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="申请时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.applyTime | formatDate('yyyy-MM-dd')}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="totalAmount" label="申请金额"></el-table-column>
                <el-table-column prop="moneyDone" label="到账金额"></el-table-column>
                <el-table-column prop="coreEnterpriseName" label="核心企业"></el-table-column>
                <el-table-column prop="" label="融资方"></el-table-column>
                <el-table-column prop="applyBankName" label="资金方"></el-table-column>
                <el-table-column prop="loanType" label="融资类型"></el-table-column>
                <el-table-column prop="" label="币别"></el-table-column>
                <el-table-column prop="statusDesc" label="状态"></el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination  @current-change="currentFinance" @prev-click="currentFinance" @next-click="currentFinance" :current-page.sync="financePaging.currentPage" :page-sizes="[10,20,50]" :page-size="10" layout="prev, pager, next, total,jumper"
                  :total="financePaging.total" background>
                </el-pagination>
                <el-button class="btn-pagination">确认</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="指派" :visible.sync="assignDialog" width="30%">
      <div class="dialog-body text-center">
        <h3>****公司指派到</h3>
        <div class="mt20">
          <el-select placeholder="请选择" class="dialog-full-select" v-model="assignValue">
            <el-option v-for="item in people" :key="item.pid" :label="item.name" :value="item.pid">
            </el-option>
          </el-select>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="assignDialog = false">取 消</el-button>
        <el-button type="primary" @click="assignDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scoped lang="less">
  @import "../../../assets/css/page/confirm.less";
  @import "../../../assets/css/page/finManage.less";

</style>


<script>
  export default {
    data() {
      return {
        active: 1,
        isSelect: false,
        assignDialog: false,
        assignValue: '',
        classList: [],
        people: [],
        companyTable: [],//供应商列表
        companyPaging:{
            total: 0,
            pageSize: 10,
            offset: 1,
            currentPage: 0
        },
        companyKeyword:'',
        billTable: [],//票据列表
        billPaging: {
          total: 0,
          pageSize: 10,
          offset: 1,
          currentPage: 0
        },
        billKeyword:'',
        financeTable: [],//融资列表
        financePaging: {
          total: 0,
          pageSize: 10,
          offset: 1,
          currentPage: 0
        },
        financeKeyword:'',
      };
    },
    created() {
      this.$store.commit("setActiveTab", "/data");
      this.getCompanyList();
      this.getBillList();
      this.getFinanceList();
      this.getClassList();
    },
    methods: {
        currentCompany(value){
            this.companyPaging.offset = value;
            this.getCompanyList();
        },
        currentBill(value){
            this.billPaging.offset = value;
            this.getBillList();
        },
        currentFinance(value){
            this.financePaging.offset = value;
            this.getFinanceList();
        },
        getCompanyList(){
            this.$axios.get('benter/supplier',{
                params: {
                    offset: this.companyPaging.offset,
                    keyword: this.keyword
                }
            })
            .then((res) => {
                this.companyTable = res.rows;
                this.companyPaging.total =  res.rows.total;
            });
        },
        getBillList(){
            this.$axios.get('binvoice/query',{
                params: {
                    offset: this.billPaging.offset,
                    keyword: this.keyword
                }
            })
            .then((res) => {
                this.billTable = res.rows;
                this.billPaging.total =  res.rows.total;
            });
        },
        getFinanceList(){
            this.$axios.get('bloan/his',{
                params: {
                    offset: this.financePaging.offset,
                    keyword: this.keyword
                }
            })
            .then((res) => {
                this.financeTable = res.rows;
                this.financePaging.total =  res.rows.total;
            });
        },
        getClassList(){
            this.$axios.get('bentertype/query')
            .then((res) => {
                this.classList = res.rows;
            });
        },
        getDetail() {},
    }
  };

</script>
