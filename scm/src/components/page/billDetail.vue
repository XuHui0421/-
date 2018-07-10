<template>
    <div class="bill-box border">
        <table class="text-break bill-table">
            <tbody>
            <tr class="no-border">
                <td colspan="20" class="no-border">
                <div class="detail-body-title">***电子发票</div>
                </td>
            </tr>
            <tr>
                <td colspan="4" class="no-border">
                <span class="item-label">发票代码:</span>
                <span class="item-info">{{billDetail.fpdm}}</span>
                </td>
                <td colspan="4" class="no-border">
                <span class="item-label">发票编号:</span>
                <span class="item-info">{{billDetail.fphm}}</span>
                </td>
                <td colspan="4" class="no-border">
                <span class="item-label">开票日期:</span>
                <span class="item-info">{{billDetail.kprq}}</span>
                </td>
                <td colspan="5" class="no-border">
                <span class="item-label">校验码:</span>
                <span class="item-info">{{billDetail.jym}}</span>
                </td>
                <td colspan="3" class="no-border">
                <span class="item-label">机器编号:</span>
                <span class="item-info">{{billDetail.jqbm}}</span>
                </td>
            </tr>
            <tr>
                <td colspan="1" class="text-center">
                <div class="mt20">购</div>
                <div class="mt10">买</div>
                <div class="mt10">方</div>
                </td>
                <td colspan="10">
                <div class="mt10">
                    <span class="label">名称</span>:
                    <span class="info">{{billDetail.gfmc}}</span>
                </div>
                <div class="mt10">
                    <span class="label">纳税人识别号</span>:
                    <span class="info">{{billDetail.gfsh}}</span>
                </div>
                <div class="mt10">
                    <span class="label">地址、电话</span>:
                    <span class="info">{{billDetail.gfdzdh}}</span>
                </div>
                <div class="mt10">
                    <span class="label">开户行及账号</span>:
                    <span class="info">{{billDetail.gfyhzh}}</span>
                </div>
                </td>
                <td colspan="1" class="text-center">
                <div class="mt20">密</div>
                <div class="mt10">码</div>
                <div class="mt10">区</div>
                </td>
                <td colspan="8" class="no-border"></td>
            </tr>
            <tr class="text-center">
                <td colspan="5">货物或应税劳务、服务名称</td>
                <td colspan="2">规格型号</td>
                <td>单位</td>
                <td>数量</td>
                <td colspan="2">单价</td>
                <td colspan="3">金额</td>
                <td colspan="3">税率</td>
                <td colspan="3" class="no-border">税额</td>
            </tr>
            <tr v-for="sphGeneral in billDetail.sph" class="text-center blue">
                <td colspan="5">{{sphGeneral.spmcGeneral}}</td>
                <td colspan="2">{{sphGeneral.ggxhGeneral}}</td>
                <td>{{sphGeneral.jldwGeneral}}</td>
                <td>{{sphGeneral.slGeneral}}</td>
                <td colspan="2"></td>
                <td colspan="3">{{sphGeneral.jeGeneral}}</td>
                <td colspan="3">{{sphGeneral.slvGeneral}}</td>
                <td colspan="3" class="no-border">{{sphGeneral.seGeneral}}</td>
            </tr>
            <tr>
                <td colspan="4">价税合计(大写)</td>
                <td colspan="10" class="no-border blue">{{billDetail.jshj  | changeMoneyToChinese()}}</td>
                <td colspan="2" class="no-border">(小写)</td>
                <td colspan="4" class="no-border blue">{{billDetail.jshj}}</td>
            </tr>
            <tr class="no-border">
                <td class="text-center">
                <div class="mt20">销</div>
                <div class="mt10">售</div>
                <div class="mt10">方</div>
                </td>
                <td colspan="10">
                            <div class="mt10">
                              <span class="label">名称</span>:
                              <span class="info">{{billDetail.xfmc}}</span>
                            </div>
                            <div class="mt10">
                              <span class="label">纳税人识别号</span>:
                              <span class="info">{{billDetail.xfsh}}</span>
                            </div>
                            <div class="mt10">
                              <span class="label">地址、电话</span>:
                              <span class="info">{{billDetail.xfdzdh}}</span>
                            </div>
                            <div class="mt10">
                              <span class="label">开户行及账号</span>:
                              <span class="info">{{billDetail.xfyhzh}}</span>
                            </div>
                    </td>
                <td class="text-center">
                <div class="mt20">备</div>
                <div class="mt20">注</div>
                </td>
                <td colspan="8" class="no-border"></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default{
        props: ['billDetail']
    }
</script>
