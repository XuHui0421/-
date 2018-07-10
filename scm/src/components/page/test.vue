
<template>
  <div class="container">
    <el-row class="row-wrap" v-if="activeList.indexOf('B01') != -1">
      <el-col :span="24" class="col-wrap">
        <div class="panel-box">
          <div class="panel-header-title">
            <span>当前融资</span>
          </div>
          <el-row class="text-center padding20 ">
            <el-col :span="4" :offset="2" class="panel-header-info">
              <span>新申请</span>
              <p>
                <i class="icon iconfont blue icon-xinshenqing1"></i>
                <span>{{bNums.newLoan}}</span>
              </p>
            </el-col>
            <el-col :span="4" class="panel-header-info">
              <span>待确权</span>
              <p>
                <i class="icon iconfont orange icon-qianbao1"></i>
                <span>{{bNums.waitConfirm}}</span>
              </p>
            </el-col>
            <el-col :span="4" class="panel-header-info">
              <span>确权中</span>
              <p>
                <i class="icon iconfont orange icon-quequanzhong"></i>
                <span>{{bNums.waitConfirming}}</span>
              </p>
            </el-col>
            <el-col :span="4" class="panel-header-info">
              <span>确权完成</span>
              <p>
                <i class="icon iconfont orange icon-quequanwancheng1"></i>
                <span>{{bNums.waitConfirmed}}</span>
              </p>
            </el-col>
            <el-col :span="4" class="panel-header-info">
              <span>已完成</span>
              <p>
                <i class="icon iconfont orange icon-daifangkuan"></i>
                <span>{{bNums.fininsh}}</span>
              </p>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row class="row-wrap" v-if="activeList.indexOf('S02') != -1">
      <el-col :span="24" class="col-wrap">
        <div class="panel-box">
          <div class="panel-header-title">
            <span>当前融资</span>
          </div>
          <el-row class="text-center padding20 ">
            <el-col :span="4" class="panel-header-info">
              <span>新申请</span>
              <p>
                <i class="icon iconfont blue icon-xinshenqing1"></i>
                <span>{{sNums.newLoan}}</span>
              </p>
            </el-col>
            <!-- <el-col :span="4" class="panel-header-info">
              <span>申请中</span>
              <p>
                <i class="icon iconfont blue icon-shenqingzhong1"></i>
                <span>0</span>
              </p>
            </el-col> -->
            <el-col :span="4" class="panel-header-info">
              <span>待确权</span>
              <p>
                <i class="icon iconfont orange icon-qianbao1"></i>
                <span>{{sNums.waitConfirm}}</span>
              </p>
            </el-col>
            <el-col :span="4" class="panel-header-info">
              <span>待放款</span>
              <p>
                <i class="icon iconfont orange icon-daifangkuan"></i>
                <span>{{sNums.waitPay}}</span>
              </p>
            </el-col>
            <el-col :span="4" class="panel-header-info">
              <span>待付费</span>
              <p>
                <i class="icon iconfont orange icon-daifufei1"></i>
                <span>{{sNums.waitCharge}}</span>
              </p>
            </el-col>
            <el-col :span="4" class="panel-header-info">
              <span>已完成</span>
              <p>
                <i class="icon iconfont blue icon-yiwancheng1"></i>
                <span>{{sNums.fininsh}}</span>
              </p>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row class="row-wrap">
      <el-col :span="10" class="col-wrap" v-if="activeList.indexOf('S01') != -1">
        <div class="finance-wrap">
          <div class="mb20 o-h text-center">
            <el-button type="primary" class="btn-apply" @click="$router.push('/apply')">快速申请</el-button>
          </div>

          <el-row>
            <el-col :span="12" class="panel">
              <div class="panel-info">
                <p class="fz36 blue font-thin">1家</p>
                <p class="info">合作银行</p>
              </div>

            </el-col>
            <el-col :span="12" class="panel">
              <div class="panel-info">
                <p class="fz36 success font-thin">0元</p>
                <p class="info">服务费</p>
              </div>

            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="panel">
              <div class="panel-info">
                <p class="fz36 info-darker font-thin">0票</p>
                <p class="info">待确权</p>
              </div>

            </el-col>
            <el-col :span="12" class="panel">
              <div class="panel-info">
                <p class="fz36 font-thin">120</p>
                <p class="info">累计确权</p>
              </div>

            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="index == 0 ? 14 : 12 " class="col-wrap" v-for="(dashbord,index) in dashbordList" v-if="getOption(dashbord.actionKey)">
        <div class="panel-box" >
          <div class="panel-header-wrap">
            <div class="panel-header-title">{{dashbord.actionName}}</div>
          </div>
          <Echarts class="panel-body" :id="dashbord.id" :option='chartOption' :activeKey="dashbord.actionKey"></Echarts>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
  @import "../../assets/css/page/index.less";

</style>
<script>
  import { option } from '../../assets/js/echartOption';
  import Echarts from './echarts.vue';
  export default {
    components: {
      Echarts,
    },
    data() {
      return {
        date: '',
        saleData: [],
        dashbordList: [],
        activeList: [],
        bNums: {},
        sNums: {},
        chartOption: {}
      }
    },
    created() {
      this.$store.commit("setActiveTab", "/index");
     
    },
    mounted() {
        this.getDashbord();
    },
    methods: {
      getOption(actionKey) {
        var data;
        for (let i = 0; i < option.length; i++) {
          if (option[i].actionKey == actionKey) {
            data = option[i];
            break;
          }
        }
        return data;
      },
      getDashbord() {
        this.$axios.get('customerDashbord/query')
          .then((res) => {
            this.dashbordList = res.rows;
            for (var i = 0; i < this.dashbordList.length; i++) {
              this.activeList.push(res.rows[i].actionKey);
            }
            this.activeList.indexOf('B01') != -1 ? this.getbNums() : '';
            this.activeList.indexOf('B02') != -1 ? this.getSupplierQuota() : '';
            this.activeList.indexOf('B03') != -1 ? this.getBankQuota() : '';
            this.activeList.indexOf('S02') != -1 ? this.getSNums() : '';
          });
      },
      getBankQuota(){
        this.$axios.get('bdash/bank')
        .then((res) => {
              var color = ['#3497DB', '#54d6b6', '#a6db69', '#ffd454', '#ffa361', '#d1d1d1'];
              var series = [];
              for(var i = 0;i< res.rows.length;i++){
                  series.push({//图表样式
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    name: '银行',//res.rows[i].bankName,
                    data: [{value:res.rows[i].usedLimit,name:'已使用额度',itemStyle:{color:color[0]}},
                           {value:res.rows[i].availableLimit,name:'剩余额度',itemStyle:{color:color[1]}}]
                });
              }
              this.$set(option[1],"series",series);
              this.chartOption = option[1];
        });
      },
      getSupplierQuota(){
          this.$axios.get('bdash/supply')
          .then((res) => {
             var series = [];
             var xdata = [];
              for(var i = 0;i< res.rows.length;i++){
                  xdata.push(res.rows[i].supplyName);
                  series.push({//图表样式
                    symbolSize: 10,
                    type: 'bar',
                    itemStyle: {
                        color: '#B7EAC4',
                        borderWidth: '2',
                        borderColor: ['#27C24C']
                    },
                    areaStyle: {
                        color: '#B7EAC4'
                    },
                    data: [res.rows[i].usedLimit,res.rows[i].limitMoney]
                });
              }
              this.$set(option[2],"series",series);
              this.$set(option[2],"data",xdata);
              this.chartOption = option[2];
          });
      },
      getbNums(){//核心企业进度条
            this.$axios.get('bdash/nums')
            .then((res) => {
                this.bNums = res.rows;
            });
      },
      getSNums(){//供应商进度条
            this.$axios.get('sdash/nums')
            .then((res) => {
                this.sNums = res.rows;
            });
      },
    },


  };

</script>
