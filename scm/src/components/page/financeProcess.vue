<template>
  <div class="fiance-process-wrap">
    <div class="process-parent">
      <div class="process-circular " :class="{finish: status > 1}">
        提交
        <span class="check-box">
          <i class="el-icon-check"></i>
        </span>
      </div>
      <em></em>
      <div class="process-circular " :class="{finish: status > 5}">
        对账
        <span class="check-box">
          <i class="el-icon-check"></i>
        </span>
      </div>
      <em></em>
      <div class="process-circular " :class="{finish: status == 15 || status > 15 ,active: status == 10}">
        确权
        <span class="check-box">
          <i class="el-icon-check"></i>
        </span>
      </div>
      <em></em>
      <div class="process-circular " :class="{finish: status > 15}">
        发送银行
        <span class="check-box">
          <i class="el-icon-check"></i>
        </span>
      </div>
      <em></em>
    </div>
    <div class="vertical-line-box">
        <em class="vertical-line"></em>
    </div>
    <div class="process-child">
        <div class="child">
            <em></em>
             <div class="process-circular " :class="{finish: status > 15 && dataWayType == 2}">
                电子银行
                <span class="check-box">
                    <i class="el-icon-check"></i>
                </span>
            </div>
            <em></em>
            <div class="process-circular " :class="{finish: status > 15 && dataWayType == 2}">
                审核通知
                <span class="check-box">
                    <i class="el-icon-check"></i>
                </span>
            </div>
            <em></em>
            <div class="process-circular " :class="{finish: status > 15 && dataWayType == 2}">
                放款通知
                <span class="check-box">
                    <i class="el-icon-check"></i>
                </span>
            </div>
            <em></em>
        </div>
        <div class="child">
            <em class="line-long"></em>
             <div class="process-circular " :class="{finish: status > 15 && dataWayType == 1}">
                线下审核
                <span class="check-box">
                    <i class="el-icon-check"></i>
                </span>
            </div>
            <em></em>
            <div class="process-circular " :class="{finish: status > 15 && dataWayType == 1}">
                放款登记
                <span class="check-box">
                    <i class="el-icon-check"></i>
                </span>
            </div>
            <em class="line-long"></em>
        </div>
    </div>
    <div class="vertical-line-box">
        <em class="vertical-line"></em>
    </div>
    <div class="process-parent">
        <em></em>
            <div class="process-circular " :class="{finish: status > 16}">
                完成
                <span class="check-box">
                    <i class="el-icon-check"></i>
                </span>
            </div>
    </div>

  </div>
</template>
<style lang="less" scoped>
  @import '../../assets/css/page/financeProcess';

</style>
<script>
  export default {
      props: ['status','dataWayType'],
  }

</script>
