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
      <el-col :span="16" class="col-wrap">
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
      <el-col :span="8" class="col-wrap" v-if="activeList.indexOf('S01') != -1">
        <div class="finance-wrap">
          <div class="mb20 o-h text-center">
            <el-button type="primary" class="btn-apply" @click="$router.push('/apply')">快速申请</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="row-wrap">
      <el-col :span="12" class="col-wrap" v-if="activeList.indexOf('B02') != -1">
        <div class="panel-box">
          <div class="panel-header-wrap">
            <div class="panel-header-title">看板名称2</div>
          </div>
          <div id="1" class="panel-body"></div>
        </div>
      </el-col>
      <el-col :span="12" class="col-wrap" v-if="activeList.indexOf('B03') != -1">
        <div class="panel-box">
          <div class="panel-header-wrap">
            <div class="panel-header-title">看板名称2</div>
          </div>
          <div id="2" class="panel-body"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
  @import "../../assets/css/page/index.less";

</style>
<script>
  export default {
    data() {
      return {
        date: '',
        saleData: [],
        dashbordList: [],
        activeList: [],
        bNums: {},
        sNums: {},
        chartOption: {},
        chart1: '',
        chart2: '',
        color: ['#3497DB', '#54d6b6', '#a6db69', '#ffd454', '#ffa361', '#d1d1d1']
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
            this.activeList.indexOf('B02') != -1 ? this.getBankQuota() : '';
            this.activeList.indexOf('B03') != -1 ? this.getSupplierQuota() : '';
            this.activeList.indexOf('S02') != -1 ? this.getSNums() : '';
          });
      },
      getBankQuota() {
        this.$axios.get('bdash/bank')
          .then((res) => {
            this.chart1 = this.$echarts.init(document.getElementById(1));
            var series = [];
            for (var i = 0; i < res.rows.length; i++) {
              series.push({ //图表样式
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                name: '银行', //res.rows[i].bankName,
                label: {
                  normal: {
                    show: true,
                    formatter: '{b}: {c}({d}%)'
                  }
                },
                data: [{
                    value: res.rows[i].usedLimit,
                    name: '已使用额度',
                    itemStyle: {
                      color: this.color[0]
                    }
                  },
                  {
                    value: res.rows[i].availableLimit,
                    name: '剩余额度',
                    itemStyle: {
                      color: this.color[1]
                    }
                  }
                ]
              });
            }
            var option = {
              grid: {
                show: false
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              color: ['#3497DB', '#54d6b6', '#a6db69', '#ffd454', '#ffa361', '#d1d1d1'],
              legend: {
                data: [{
                    name: '已使用额度',
                    icon: 'circle'
                  },
                  {
                    name: '剩余额度',
                    icon: 'circle'
                  }
                ],
                right: 10
              },
              xAxis: {
                show: false,
              },
              yAxis: {
                show: false
              },
              series: series,
            };
            this.chart1.setOption(option);
            window.addEventListener("resize", this.chart1.resize);
          });

      },
      getSupplierQuota() {
        this.$axios.get('bdash/supply')
          .then((res) => {
            this.chart2 = this.$echarts.init(document.getElementById(2));
            var series = [];
            var xdata = [];
            for (var i = 0; i < res.rows.length; i++) {
              xdata.push(res.rows[i].supplyName);
              series.push({ //图表样式
                symbolSize: 10,
                type: 'bar',
                data: [res.rows[i].usedLimit, res.rows[i].limitMoney]
              });
            }
            var option = {
              legend: {
                data: [{
                    name: '已使用额度',
                    icon: 'circle'
                  },
                  {
                    name: '总额度',
                    icon: 'circle'
                  }
                ],
                right: 10
              },
              tooltip: {
                trigger: 'item',
                formatter: function(params){
                    var name = params.seriesIndex ==  0 ? '已使用金额' : '总额度'
                    return   name+params.value;
                }
              },
              color: ['#3497DB', '#54d6b6', '#a6db69', '#ffd454', '#ffa361', '#d1d1d1'],
              xAxis: {
                data: xdata,
                axisLine: {
                  lineStyle: {
                    color: '#f2f2f2'
                  }
                },
                axisLabel: {
                  textStyle: {
                    color: '#999'
                  }
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: ['#e6e6e6']
                  }
                },
                axisTick: {
                  show: false
                }
              },
              yAxis: {
                axisLabel: {
                  textStyle: {
                    color: '#999'
                  }
                },
                axisLine: {
                  show: false,
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: '#f2f2f2'
                  }
                }
              },
              series: series
            }
            this.chart2.setOption(option);
            window.addEventListener("resize", this.chart2.resize);
          });

      },
      getbNums() { //核心企业进度条
        this.$axios.get('bdash/nums')
          .then((res) => {
            this.bNums = res.rows;
          });
      },
      getSNums() { //供应商进度条
        this.$axios.get('sdash/nums')
          .then((res) => {
            this.sNums = res.rows;
          });
      },
    },


  };

</script>
