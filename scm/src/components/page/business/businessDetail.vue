<template>
  <div class="container" ref="container">
    <div class="container-wrap">
      <div class="container-left">
        <div class="detail-list-wrap">
          <ul class="company-list multi-line">
            <li v-for="company in companyList" @click="getThisDetail(company.id)">
              <el-checkbox v-model="company.checked"></el-checkbox>
              <div class="item  item-lf">
                <div class="item-tel">{{company.name}}</div>
                <div class="item-bank">{{company.userName}}</div>
              </div>
              <div class="item item-rt">
                <div class="item-time">{{company.date | formatDate("yyyy-MM-dd")}}</div>
                <div>{{company.department}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="list-num">
          当前已加载：{{companyList.length}}条
        </div>
      </div>
      <div class="container-right">
        <div class="detail-header">
            <h1 class="detail-title">{{companyInfo.name}}</h1>
            <div class="fr">
                <el-button size="mini" round type="primary" @click="payWayDialog = true">
                    <i class="icon iconfont icon-xiugai"></i>
                    修改支付
                </el-button>
                <el-button size="mini" round type="danger" icon="el-icon-close">
                    取消融资
                </el-button>
                <el-button size="mini" round class="btn-link" @click="$router.go(-1)">
                    <i class="icon iconfont icon-fanhui"></i>
                    返回
                </el-button>
            </div>
        </div>
        <div class="detail-body">
          <ul class="detail-info label80">
            <li>
              <label>公司名称</label>
              <span>{{companyInfo.name}}</span>
            </li>
            <li>
              <label>简称</label>
              <span>{{companyInfo.abbreviationName}}</span>
            </li>
            <li>
              <label>社会信用代码</label>
              <span>{{companyInfo.businessRegNo}}</span>
            </li>
            <li>
              <label>注册号</label>
              <span>{{companyInfo.registrationNo}}</span>
            </li>
            <li>
              <label>法定代表</label>
              <span>{{companyInfo.legalRepresentative}}</span>
            </li>
            <li>
              <label>注册资本</label>
              <span>{{companyInfo.registeredCapital}}</span>
            </li>
            <li>
              <label>所属行业</label>
              <span>{{companyInfo.industry}}</span>
            </li>
            <li>
              <label>企业地址</label>
              <span>{{companyInfo.address}}</span>
            </li>
            <li>
              <label>企业网址</label>
              <span>{{companyInfo.website}} </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog title="修改支付方式" :visible.sync="payWayDialog" width="40%">
        <el-form :model="payWayForm" ref="payWayForm" label-position="left"  label-width="80px" :inline="true">
            <div  v-for="(payWay, index) in payWayForm.payWay">
                <el-form-item :label="'支付方式'+(index+1)">
                    <el-select v-model="payWay.way" placeholder="请选择">
                        <el-option v-for="item in paywayList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付比例">
                    <el-input v-model="payWay.proportion" placeholder="请输入内容"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <div class="blue mt10 cp" @click="payWayForm.payWay.push([{way: '',proportion: ''}])">添加支付方式</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="payWayDialog = false">取 消</el-button>
        <el-button type="primary" @click="payWayDialog = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style scoped lang="less">
  @import "../../../assets/css/page/detail.less";
  @import "../../../assets/css/page/companyDetail.less";

</style>


<script>
  export default {
    data() {
      return {
        companyList: [],
        companyInfo: {},
        payWayDialog: false,//修改支付方式对话框
        payWayForm: {
            payWay: [
                {way: "",proportion: ""},
                {way: "",proportion: ""}
            ]
        },
        paywayList: [],//支付方式
      };
    },
    created() {
      this.getDetail(this.$route.params.id);
      this.getCompanyList();
    },
    methods: {
      getCompanyList() {
        this.$axios.get('benter/brand')
          .then((response) => {
            this.companyList = response.rows;
          })
      },
      getDetail(pid) {
        this.$axios.get('benter/get/portrait/' +pid)
          .then((response) => {
            this.companyInfo = response.rows;
          })
      },
      getThisDetail(pid) {
        for (let i = 0; i < this.companyList.length; i++) {
          if (this.companyList[i].id == pid) {
            this.$set(this.companyList[i], "checked", true);
          } else {
            this.$set(this.companyList[i], "checked", false);
          }
        }
        this.getDetail(pid);
      },
    }
  };

</script>
