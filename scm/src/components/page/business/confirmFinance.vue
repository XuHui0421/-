<template>
  <div>
    <el-row class="row-wrap">
      <el-col :span="24" class="col-wrap">
        <div class="panel-box" style="background: #f3faff;">
          <finance-process :status="financeDetail.status" :dataWayType="financeDetail.dataWayType"></finance-process>
        </div>
      </el-col>
    </el-row>
    <div class="padding20 ">
        <div class="detail-header ">
            <span>{{financeDetail.code}}</span>
            <div class="finance-operate-list fr">
                <a v-bind:href="contractUrl"  href="Javascript:;" class="download" id="downloadContract">
                    <el-button type="primary" size="mini" round @click="downloadContract">
                    <i class="icon iconfont icon-xiazai"></i>
                    下载合同
                    </el-button>
                </a>
                <a v-bind:href="consultUrl"  href="Javascript:;" class="download" id="downloadConsult">
                    <el-button type="primary" size="mini" round @click="downloadConsult">
                    <i class="icon iconfont icon-xiazai"></i>
                    下载征询函
                    </el-button>
                </a>
            </div>
        </div>
      <el-tabs v-model="activeTab" class="mt20 ">
        <el-tab-pane label="融资信息" name="first">
            <div>
                <div class="tab-info-title">基本信息</div>
                <ul class="detail-info label110 label-gray label-right">
                    <li><label>银行名称:</label><span>{{financeDetail.applyBankName}}</span></li>
                    <li><label>申请笔数:</label><span>{{financeDetail.applyNumber}}</span></li>
                    <li><label>申请金额:</label><span>{{financeDetail.totalAmount}}</span></li>
                    <li><label>申请时间:</label><span>{{financeDetail.applyTime}}</span></li>
                    <li><label>数据方式:</label><span>{{financeDetail.dataWayType == 1 ? '手动' : '电子对接'}}</span></li>
                    <li><label>状态:</label><span>{{financeDetail.statusDesc}}</span></li>
                </ul>
            </div>
            <el-table ref="multipleTable" :data="supplierTable" class="table">
              <el-table-column prop="finaceEnterpriseName" label="公司名称"></el-table-column>
              <el-table-column prop="className" label="分类"></el-table-column>
              <el-table-column prop="startDate" label="合作开始时间"></el-table-column>
              <el-table-column prop="years" label="合作年限"></el-table-column>
              <el-table-column prop="contact" label="联系人"></el-table-column>
              <el-table-column prop="contactPhone" label="电话"></el-table-column>
              <el-table-column prop="creditLine" label="授信额度"></el-table-column>
              <el-table-column prop="creditAvailable" label="可用额度"></el-table-column>
              <el-table-column prop="statusDesc" label="状态"></el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="票据清单" name="second">
            <!-- <div class="search-center"> 
                <div class="container-header-search">
                    <el-input placeholder="请输入关键字查询" class="input-radius" v-model="keyword">
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>   
                    </el-input>
                </div>
                <el-button type="primary" class="btn-search" round>高级搜索</el-button>
            </div> -->
            <el-table ref="multipleTable" :data="billTable" class="table">
                <el-table-column prop="fpdm" label="发票代码"></el-table-column>
                <el-table-column prop="fphm" label="发票号码"></el-table-column>
                <el-table-column prop="kprq" label="开票日期"></el-table-column>
                <el-table-column prop="jqbm" label="机器编号"></el-table-column>
                <el-table-column prop="je" label="金额"></el-table-column>
                <el-table-column prop="se" label="税额"></el-table-column>
                <el-table-column prop="jshj" label="发票额"></el-table-column>
                <el-table-column prop="xfmc" label="销售方"></el-table-column>
                <el-table-column prop="bz" label="备注"></el-table-column>
                <el-table-column prop="statusDes" label="状态"></el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="操作历史" name="third">
            <el-table ref="multipleTable" :data="logTable" class="table">
                <el-table-column prop="" label="操作类型"></el-table-column>
                <el-table-column prop="" label="操作明细"></el-table-column>
                <el-table-column prop="" label="操作方"></el-table-column>
                <el-table-column prop="" label="操作人"></el-table-column>
                <el-table-column prop="" label="操作时间"></el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="附件" name="fourth">
            <ul class="file-list">
                <li v-for="file in fileList ">
                  <img v-bind:src="file.url" alt="" class="file-img">
                  <p class="file-title">{{file.name}}</p>
                  <a v-bind:href="file.url" download class="download">下载附件</a>
                </li>
              </ul>
              <el-button type="primary" size="mini" round>
                <i class="icon iconfont icon-xiazai"></i>
                全部下载
              </el-button>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<style lang="less" scoped>
  @import "../../../assets/css/page/detail.less";

</style>
<script>
  import FinanceProcess from '../financeProcess';
  export default {
    components: {
      FinanceProcess
    },
    data() {
      return {
        activeTab: 'first',
        fileList: [],
        logTable: [],
        billTable: [],
        supplierTable: [],
        keyword: '',
        financeDetail: {},
        contractUrl: '',
        consultUrl: '',
      }
    },
    created(){
        this.getFinanceDetail();
    },
    methods: {
        getFinanceDetail(){//融资详情
            this.$axios.get('bloan/get/'+this.$route.params.id)
            .then((res) => {
                this.financeDetail = res.rows;
                this.supplierTable = res.rows.infoList;
                var billTable = [];
                for(var i = 0;i<res.rows.infoList.length;i++){
                    for(var j = 0;j<res.rows.infoList[i].detailList.length;j++){
                        billTable.push(res.rows.infoList[i].detailList[j]);
                    }
                }
                this.billTable = billTable;
            });
        },
        downloadContract() {
            this.$axios.get('bloan/download/contract/' + this.$route.params.id)
            .then((response) => {
            });
        },
        downloadConsult() {
            this.$axios.get('bloan/download/consult/' + this.$route.params.id)
            .then((response) => {

            });
        }
    }
  }

</script>
