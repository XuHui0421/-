<template>
  <div :id="id">

  </div>
</template>
<script>
  export default {
    props: ['option', 'id'],
    data() {
      return {
        chart: '',
        baseoption: {
          grid: {
            show: true,
            lineStyle: {
              color: ['#e6e6e6']
            }
          },
          legend: {
            data: [],
            right: 10
          },
          color: ['#3497DB', '#54d6b6', '#a6db69', '#ffd454', '#ffa361', '#d1d1d1'],
          xAxis: {
            data: [],
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
          series: []
        },
        pieOption: {
          grid: {
            show: false
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          color: ['#3497DB', '#54d6b6', '#a6db69', '#ffd454', '#ffa361', '#d1d1d1'],
          legend: {
            data: [],
            right: 10
          },
          xAxis: {
            show: false,
          },
          yAxis: {
            show: false
          },
          series: [],
        },
      }
    },
    watch: {
      option: {
        handler(newVal, oldVal) {
          if (this.chart) {
            if (newVal) {
                var option = this.getOption(newVal.type);
                option.legend.data = newVal.name;
                option.series = newVal.series;
                option.xAxis.data = newVal.data;
                this.chart.setOption(option);
            }
          } else {
            this.init();
          }
        },
        deep: true //对象内部属性的监听，关键。
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.chart = this.$echarts.init(document.getElementById(this.id));
        if(this.option.type){
            
            this.chart.setOption(this.getOption(this.option.type));
            window.addEventListener("resize", this.chart.resize);
        }
      },
      getOption(type){
        var option;
        switch(type){
            case 'pie' : option = this.pieOption;break;
            case 'line' : option = this.baseoption;break;
            case 'bar' : option = this.baseoption;break;
        }
        return option;
      }

    }
  }

</script>
