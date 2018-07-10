<template>
  <div class="container">
    <div class="border">
      <div class="finance-process-bar">
        <div class="title">
          申请融资
        </div>
        <div class="process-line">
          <div class="line-wrap" v-bind:class="{active : step > 1 || step == 1}">
            <div class="title-des">融资申请</div>
            <div class="process-icon">
              <i v-if="step > 1 " class="icon iconfont icon-duigou-copy"></i>
              <span v-else class="process-step">1</span>
            </div>
          </div>
          <div class="line-wrap" v-bind:class="{active : step > 2 || step == 2}">
            <div class="title-des">待确权</div>
            <div class="process-icon">
              <i v-if="step > 2" class="icon iconfont icon-duigou-copy"></i>
              <span v-else class="process-step">2</span>
            </div>
          </div>
          <div class="line-wrap" v-bind:class="{active : step > 3 || step == 3}">
            <div class="title-des">待放款</div>
            <div class="process-icon">
              <i v-if="step > 3" class="icon iconfont icon-duigou-copy"></i>
              <span v-else class="process-step">3</span>
            </div>
          </div>
          <div class="line-wrap" v-bind:class="{active : step > 4 || step == 4}">
            <div class="title-des">待付费</div>
            <div class="process-icon">
              <i v-if="step > 4" class="icon iconfont icon-duigou-copy"></i>
              <span v-else class="process-step">4</span>
            </div>
          </div>
          <div class="line-wrap" v-bind:class="{active : step > 5 || step == 5}">
            <div class="title-des">已完成</div>
            <div class="process-icon">
              <i v-if="step > 5" class="icon iconfont icon-duigou-copy"></i>
              <span v-else class="process-step">5</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 申请融资 -->
      <div v-show="step == 1" class="finance-apply">
        <div v-show="applyStep == 1" class="tab">
          <div class="tab-title">
            <ul class="tabs-nav">
              <li @click="activeName = 'first' " v-bind:class="{active : activeName == 'first'}">
                <div>录入发票</div>
              </li>
              <li @click="activeName = 'second' " v-bind:class="{active : activeName == 'second'}">
                <div>导入发票</div>
              </li>
            </ul>
            <div class="fr mt20">
              <el-badge :value="3" class="badge">
                <span class="blue">历史记录</span>
              </el-badge>
            </div>
          </div>
          <div class="tab-content">
            <div v-show="activeName == 'first'">
              <div class="uploader-box">
                <div class="uploader-img">
                  <div class="upload-box">
                    <div v-if="!billUrl.url" class="upload-des">
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                      <p>请上传证书</p>
                      <input type="file" name="file" class="input-file" accept="image/gif,image/jpeg,image/bmp,image/png,image" @change="uploadBill($event)"
                        ref="uploadBill">
                    </div>
                    <div class="has-img-box" v-else>
                      <img class="upload-img" v-bind:src="billUrl.url" alt="">
                      <div class="img-delte" @click="deleteBillUrl">x</div>
                    </div>
                  </div>
                </div>
                <div class="uploader-form">
                  <el-form :inline="true" :model="billForm" label-position="top" :rules="billRules" ref="addBillForm">
                    <el-form-item label="发票代码" prop="fpdm">
                      <el-input v-model="billForm.fpdm" placeholder="请输入发票代码"></el-input>
                    </el-form-item>
                    <el-form-item label="发票号码" prop="fphm">
                      <el-input v-model="billForm.fphm" placeholder="请输入发票号码"></el-input>
                    </el-form-item>
                    <el-form-item label="发票日期" prop="kprq">
                      <el-date-picker v-model="billForm.kprq" placeholder="请输入发票日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="开票金额(不含税)" prop="value">
                      <el-input v-model="billForm.value" placeholder="请输入开票金额"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="upload-btn-group ">
                  <el-button type="primary" @click="checkBill" v-show="!isAdd">核验</el-button>
                  <el-button type="primary" @click="addBill" v-show="isAdd">添加</el-button>
                </div>
              </div>
              <el-row class="mt20">
                <el-col :span="16">
                  <div class="bill-box border ">
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
                          <td colspan="10" class="no-border blue">{{billDetail.jshj | changeMoneyToChinese()}}</td>
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
                </el-col>
                <el-col :span="6" :offset="2">
                  <el-row>
                    <el-col :span="8" class="mb20">
                      <div class="upload-box">
                        <div class="upload-des">
                          <i class="el-icon-circle-plus blue fz22"></i>
                          <p>添加附件</p>
                          <input type="file" name="file" class="input-file" ref="uploadFile" @change="uploadFile('uploadFile',uploadFileList)">
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8" v-for="(file,index) in  uploadFileList" class="mb20">
                      <div class="file-box" @click="toggle(file,index)">
                        <img v-bind:src="file.url" alt="">
                        <p>{{file.name}}</p>
                        <div class="file-del-box">
                          <div class="bg-blue checked" @click="delFile(file.key,uploadFileList,index)">
                            <i class="el-icon-close"></i>
                          </div>
                          <div class="file-del"></div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <!-- <el-row class="text-right">
                <el-col :span="2" :offset="22">
                  <el-button type="danger" @click="">删除</el-button>
                </el-col>
              </el-row> -->
            </div>
            <div v-show="activeName == 'second'">
              <div class="uploader-box">
                <el-row type="flex">
                  <el-col :span="7" :offset="6">
                    <div>
                      <div class="upload-box">
                        <div class="upload-des" v-if="!billExcel.name">
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <p>请上传证书</p>
                          <input type="file" name="file" class="input-file" @change="selectbillExcel($event)" ref="importBill">
                        </div>
                        <div class="has-file-box" v-else>
                          <i class="el-icon-close close" @click="billExcel = {}"></i>
                          <p class="excel-name">{{billExcel.name}}</p>
                        </div>
                      </div>
                      <div class="mt10 danger">注：支持批量上传（最多50条数据），只支持Excle格式</div>
                    </div>
                  </el-col>
                  <el-col :span="6" :offset="2">
                    <div class="upload-btn-group">
                      <el-button class="btn-line" @click="downloadBill">
                        <i class="icon iconfont icon-xiazai"></i>
                        模板下载
                      </el-button>
                      <el-button type="primary" @click="importBill">导入</el-button>

                    </div>
                  </el-col>
                  <el-col :span="2" :offset="6">
                    <div class="cp blue">
                      <i class="el-icon-question"></i>
                      帮助中心
                    </div>
                  </el-col>
                </el-row>
              </div>
              <el-row class="mt20">
                <el-col :span="16">
                  <el-table ref="multipleTable" :data="billTable2" class="table" @row-click="autoBillDetail()">
                    <el-table-column prop="fpGeneral.fpdmGeneral" label="发票代码"></el-table-column>
                    <el-table-column prop="fpGeneral.fphmGeneral" label="发票号码"></el-table-column>
                    <el-table-column prop="fpGeneral.kprqGeneral" label="开票日期"></el-table-column>
                    <el-table-column prop="fpGeneral.jeGeneral" label="开票金额(不含税)"></el-table-column>
                    <el-table-column prop="fpGeneral.gfmcGeneral" label="开票企业"></el-table-column>
                    <el-table-column prop="fpGeneral.fpdmGeneral" label="状态"></el-table-column>
                  </el-table>
                </el-col>
                <el-col :span="6" :offset="2">
                  <el-row>
                    <el-col :span="8" class="mb20">
                      <div class="upload-box">
                        <div class="upload-des">
                          <i class="el-icon-circle-plus blue fz22"></i>
                          <p>添加附件</p>
                          <input type="file" name="file" class="input-file" accept="image/gif,image/jpeg,image/bmp,image/png,image" @change="uploadFile('uploadFile2',uploadFileList2)"
                            ref="uploadFile2">
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8" v-for="(file,index) in  uploadFileList2" class="mb20">
                      <div class="file-box" @click="toggle(file,index)">
                        <img v-bind:src="file.url" alt="">
                        <p>{{file.name}}</p>
                        <div class="file-del-box">
                          <div class="bg-blue checked" @click="delFile(file.key,uploadFileList2,index)">
                            <i class="el-icon-close"></i>
                          </div>
                          <div class="file-del"></div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <!-- <el-row class="text-right">
                <el-col :span="2" :offset="22">
                  <el-button type="danger">删除</el-button>
                </el-col>
              </el-row> -->
            </div>
          </div>
        </div>
        <div v-show="applyStep == 2" class="select-company">
          <div class="select-company-title">
            <h2>选择您所需要的核心企业</h2>
            <span>现已有{{bankList.length}}家核心企业竭诚为您服务</span>
          </div>
          <ul v-if="bankList.length" class="company-list">
            <li v-for="(item,index) in bankList" v-bind:class="{active: item.active}" @click="toggle(item,index)">
              <div class="com-list-header">
                {{item.coreEnterpriseName}}
                <i v-if="item.active" class="el-icon-circle-check-outline"></i>
                <i v-else class=""></i>
              </div>
              <div class="com-list-main">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <h3>总票数</h3>
                    <p class="text-large mt30 info-darker"> {{item.detailList.length}}</p>
                  </el-col>
                  <el-col :span="6">
                    <h3>总金额</h3>
                    <p class="text-large mt30 info-darker">￥ {{item.applyAmount}}</p>
                  </el-col>
                  <el-col :span="6">
                    <h3>银行</h3>
                    <span class="el-dropdown-link">
                      <img v-bind:src="item.bankLogo || '../../../../static/img/bank.png'" alt="" class="dropdown-img">
                    </span>

                    <p class="mt10"> {{item.applyBankName}}</p>
                  </el-col>
                  <el-col :span="6" class="mt40">
                    <el-button class="btn-line" @click="fileDialog = true">管理附件</el-button>
                  </el-col>
                </el-row>
              </div>
            </li>
          </ul>
          <div class="no-record-tip"v-else>
            <img src="../../../../static/img/no_record_tip.png" alt="">
            <p>抱歉，暂无您所需的记录</p>
        </div>
        </div>
        <div class="next-step-wrap">
          <span class="mr20">
            票据数量：{{billTable1.length}}条
            <el-popover placement="top-start" trigger="click" width="900" v-model="billPop">
              <div>
                <div class="poppover-header">
                  <span class="mr50">票据数量：{{billTable1.length}}条</span>
                  <div class="fr">
                    <el-button type="primary" size="mini" round icon="el-icon-close" class="mr50" @click="delBill">删除</el-button>
                    <span class="cp" @click="billPop = false;">收起
                      <i class="el-icon-caret-bottom" slot="reference"></i>
                    </span>
                  </div>

                </div>
                <el-table :data="billTable1" @row-click="propBillDetail">
                  <el-table-column label="" width="50">
                    <template scope="scope">
                      <el-radio v-model="radio" :label="scope.row.id">&nbsp;</el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column prop="fpdm" label="发票代码"></el-table-column>
                  <el-table-column prop="fphm" label="发票号码"></el-table-column>
                  <el-table-column prop="kprq" label="开票日期"></el-table-column>
                  <el-table-column prop="je" label="开票金额(不含税)"></el-table-column>
                  <el-table-column prop="gfmc" label="开票企业"></el-table-column>
                  <el-table-column prop="statusDes" label="状态"></el-table-column>
                </el-table>
              </div>

              <i class="el-icon-caret-top cp" slot="reference"></i>
            </el-popover>
          </span>
          <div class="fr">
            <div class="step-btn prev-step" v-show="applyStep == 2" @click="applyStep = 1">
              上一步
            </div>
            <div class="step-btn next-step" @click="applyBill" :class="{'next-step-disabled': billTable1.length == 0}">
              {{applyStep == 1 ? '下一步': '提交申请'}}
            </div>
          </div>

        </div>
      </div>
      <!-- 等待确认 等待确权 -->
      <div v-show="step == 2" class="finance-wait" v-bind:class="{'bg-light-purple': step == 4}">
        <div class="wait-pic"></div>
        <p class="wait-message">融资等待确权</p>
        <p class="text-right fz14">下一步：张三经理-13464979797 </p>
      </div>
      <!-- 待放款 -->
      <div v-show="step == 3" class="finance-wait" v-bind:class="{'bg-light-purple': step == 4}">
        <div class="wait-pic"></div>
        <p class="wait-message">融资已提交,等待银行放款</p>
        <p class="text-right fz14">下一步：张三经理-13464979797 </p>
      </div>
      <!-- 等待付费 -->
      <div v-show="step == 4" class="finance-wait bg-light-purple">
        <span class="fr">计费规则</span>
        <div class="wait-pic"></div>
        <p class="wait-message">融资等待付费</p>
        <p class="mt10 fz14">
          <span class="text-blod mr10">总金额：
            <span class="orange">￥50000</span>
          </span>
          <span class="fz10">先付费后开票</span>
        </p>
        <el-button type="primary" size="mini" class="mt10 ">账户信息</el-button>

      </div>
      <!-- 已完成 -->
      <div v-show="step == 5" class="finance-wait bg-base">
        <div class="wait-pic wait-pic-success"></div>
        <p class="wait-message">融资申请已完成！</p>
      </div>

      <div v-show="step !== 1" class="finance-detail">
        <el-tabs v-model="detaiActive">
          <el-tab-pane label="融资详情" name="first">
            <div class="text-title blue text-blod">融资编号为：1211312</div>
            <el-row class="mt20">
              <el-col :span="6">总金额：
                <span class="orange">￥30000</span>
              </el-col>
              <el-col :span="6">币别：人民币 </el-col>
              <el-col :span="6">产品名称：四月产品 </el-col>
              <el-col :span="6">提交人：张三 </el-col>
            </el-row>
            <div class="bg-base finance-detail-body">
              <el-row>
                <el-col :span="6">
                  <label class="label80">核心企业：</label>苏州****有限公司 </el-col>
                <el-col :span="6">
                  <label class="label80">联系人：</label>张三经理 </el-col>
                <el-col :span="6">
                  <label class="label80">联系方式：</label>13464979776 </el-col>
              </el-row>
              <el-row class="mt20">
                <el-col :span="6">
                  <label class="label80">银行名称：</label>苏州****银行</el-col>
                <el-col :span="6">
                  <label class="label80">联系人：</label>张三经理 </el-col>
                <el-col :span="6">
                  <label class="label80">联系方式：</label>13464979776 </el-col>
                <el-col :span="6">
                  <label class="label80">合同编号：</label>4645446444 </el-col>
              </el-row>
            </div>
            <el-table ref="multipleTable" :data="billTable" class="table">
              <el-table-column prop="" label="发票代码"></el-table-column>
              <el-table-column prop="" label="发票号码"></el-table-column>
              <el-table-column prop="time" label="开票日期"></el-table-column>
              <el-table-column prop="" label="开票金额(不含税)"></el-table-column>
              <el-table-column prop="" label="开票企业"></el-table-column>
              <el-table-column prop="" label="状态"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="操作历史" name="second">
            <div class="history-wrap">
              <div class="history-item active">
                <span>2018-05-20</span>
              </div>
              <div class="history-item ">
                <span>张三已对邮寄信息进行操作</span>

              </div>
            </div>

          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog title="管理附件" :visible.sync="fileDialog">
      <div class="dialog-body">
        <el-upload class="avatar-uploader  dialog-uploader" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card">
          <div class="">
            <i class="el-icon-circle-plus avatar-uploader-icon avatar-uploader-icon-primary"></i>
          </div>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fileDialog = false">取 消</el-button>
        <el-button type="primary" @click="fileDialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="financeDialogTitle" slot="融资编号为：54684684641" :visible.sync="financeDialog" class="dialog-title-lg">
      <el-row class="mt20">
        <el-col :span="6">总金额：
          <span class="orange">￥30000</span>
        </el-col>
        <el-col :span="6">币别：人民币 </el-col>
        <el-col :span="6">产品名称：四月产品 </el-col>
        <el-col :span="6">提交人：张三 </el-col>
      </el-row>
      <div class="bg-base finance-detail-body">
        <el-row>
          <el-col :span="6">
            <label class="label80">核心企业：</label>苏州****有限公司 </el-col>
          <el-col :span="6">
            <label class="label80">联系人：</label>张三经理 </el-col>
          <el-col :span="6">
            <label class="label80">联系方式：</label>13464979776 </el-col>
        </el-row>
        <el-row class="mt20">
          <el-col :span="6">
            <label class="label80">银行名称：</label>苏州****银行</el-col>
          <el-col :span="6">
            <label class="label80">联系人：</label>张三经理 </el-col>
          <el-col :span="6">
            <label class="label80">联系方式：</label>13464979776 </el-col>
          <el-col :span="6">
            <label class="label80">合同编号：</label>4645446444 </el-col>
        </el-row>
      </div>
      <el-table ref="multipleTable" :data="billTable1" class="table">
        <el-table-column prop="" label="发票代码"></el-table-column>
        <el-table-column prop="" label="发票号码"></el-table-column>
        <el-table-column prop="time" label="开票日期"></el-table-column>
        <el-table-column prop="" label="开票金额(不含税)"></el-table-column>
        <el-table-column prop="" label="开票企业"></el-table-column>
        <el-table-column prop="" label="状态"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="收货地址" :visible.sync="maildialog">
      <el-row>
        <el-col :span="12" :offset="1">
          <el-form :model="mailForm" label-width="80px">
            <el-form-item label="快递公司">
              <el-input v-model="mailForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮寄编号">
              <el-input v-model="mailForm.no" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="maildialog = false">取 消</el-button>
        <el-button type="primary" @click="maildialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="billDialog" width="70%">
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
                <span class="item-info">{{billDetailDialog.fpdm}}</span>
              </td>
              <td colspan="4" class="no-border">
                <span class="item-label">发票编号:</span>
                <span class="item-info">{{billDetailDialog.fphm}}</span>
              </td>
              <td colspan="4" class="no-border">
                <span class="item-label">开票日期:</span>
                <span class="item-info">{{billDetailDialog.kprq}}</span>
              </td>
              <td colspan="5" class="no-border">
                <span class="item-label">校验码:</span>
                <span class="item-info">{{billDetailDialog.jym}}</span>
              </td>
              <td colspan="3" class="no-border">
                <span class="item-label">机器编号:</span>
                <span class="item-info"></span>
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
                  <span class="info">{{billDetailDialog.gfmc}}</span>
                </div>
                <div class="mt10">
                  <span class="label">纳税人识别号</span>:
                  <span class="info">{{billDetailDialog.gfsh}}</span>
                </div>
                <div class="mt10">
                  <span class="label">地址、电话</span>:
                  <span class="info">{{billDetailDialog.gfdzdh}}</span>
                </div>
                <div class="mt10">
                  <span class="label">开户行及账号</span>:
                  <span class="info">{{billDetailDialog.gfyhzh}}</span>
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
            <tr v-for="sphGeneral in billDetailDialog.sphGeneral" class="text-center blue">
              <td colspan="5">{{sphGeneral.spmcGeneral}}</td>
              <td colspan="2">{{sphGeneral.ggxhGeneral}}</td>
              <td>{{sphGeneral.jldwGeneral}}</td>
              <td>{{sphGeneral.slGeneral}}</td>
              <td colspan="2">{{sphGeneral.jeGeneral}}</td>
              <td colspan="3">{{sphGeneral.jeGeneral}}</td>
              <td colspan="3">{{sphGeneral.slvGeneral}}</td>
              <td colspan="3" class="no-border">{{sphGeneral.seGeneral}}</td>
            </tr>
            <tr>
              <td colspan="4">价税合计(大写)</td>
              <td colspan="10" class="no-border blue">{{billDetailDialog.jshj | changeMoneyToChinese()}}</td>
              <td colspan="2" class="no-border">(小写)</td>
              <td colspan="4" class="no-border blue">{{billDetailDialog.jshj}}</td>
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
      <div class="mt20">
        <el-row>
          <el-col :span="8" :offset="2">
            <el-button type="primary" :disabled="rowIndex == 0" @click="rowIndex < 0 ? '' :billDetailDialog = billTable[--rowIndex];">上一笔</el-button>
          </el-col>
          <el-col :span="8">
            <div class="blue mt10">
              <span class="fz16">{{rowIndex + 1}}</span> /{{billTable.length}}</div>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" :disabled="rowIndex == billTable.length - 1" @click="rowIndex == billTable.length - 1 ? '' :billDetailDialog = billTable[++rowIndex];">下一笔</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog title="正在申请融资" :visible.sync="myApplyDialog" width="30%">
      <el-row class="text-center">
        <el-col :span="12" class="border-right">
          <p>笔数</p>
          <p class="blue text-large mt20">{{mySloanNow.count}}</p>
        </el-col>
        <el-col :span="12">
          <p>总金额</p>
          <p class="blue text-large mt20">￥{{mySloanNow.amount}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6" class="text-center mt30">
          <router-link to="/sfinanceList">
            <el-button type="primary" class="btn-full">查看</el-button>
          </router-link>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<style scoped lang="less">
  @import "../../../assets/css/page/apply.less";
  @import "../../../assets/css/page/billDetail.less";
  @import "../../../assets/css/page/financeDetail.less";

</style>
<script>
  export default {
    data() {
      return {
        step: 1, //融资步骤
        activeName: "first", //手动录入还是自动录入tab
        detaiActive: "first", //融资详情和操作历史tab
        applyStep: 1, //申请步骤 (上一步下一步)
        billPop: false, //票据数量弹出框是否打开
        fileDialog: false, //文件管理对话框
        financeDialog: false, //邮寄融资详情对话框
        maildialog: false, //邮寄快递信息对话框
        billDialog: false, //发票详情对话框
        myApplyDialog: false, //当前融资笔数对话框
        isAdd: false,
        mySloanNow: {}, //我当前的融资
        billUrl: { //上传发票证书 - 图片url
          key: '',
          url: ''
        },
        billExcel: {}, //导入发票excel
        billForm: {}, //发票表单
        billRules: { //发票表单验证规则
          fpdm: {
            required: true,
            message: '请输入发票代码'
          },
          fphm: {
            required: true,
            message: '请输入发票号码'
          },
          kprq: {
            required: true,
            message: '请输入发票日期'
          },
          value: {
            required: true,
            message: '请输入开票金额'
          },
        },
        uploadFileList: [], //发票附件
        uploadFileList2: [], //发票附件
        billDetail: {},
        billDetailDialog: {},
        rowIndex: 0, //发票列表点击 当前行数
        billTable: [], //发票列表
        radio: '',
        billTable1: [], //手动录入发票列表
        billTable2: [], //自动录入发票列表
        bankList: [],
        financeDialogTitle: "融资编号为：54684684641", //邮寄融资详情对话框title
        mailForm: {}
      };
    },
    created() {
      this.$store.commit("setActiveTab", "/apply");
      this.getApplyList();
      this.getSloanNow(true);
      this.getBillList();
    },
    methods: {
      getApplyList() { //获取核心企业
        this.$axios.get('sloan/apply')
          .then((response) => {
            this.bankList = response.rows;
          });
      },
      getSloanNow(isFirst) { //当前融资信息
        this.$axios.post('sloan/now')
          .then((response) => {
            if (response.rows.count > 0) {
              if (isFirst) {
                this.myApplyDialog = true;
              }
              this.mySloanNow = response.rows;
            }
          });
      },
      getFinance(id) { //获取融资详情
        this.$axios.get('sloan/get/' + id)
          .then((response) => {
            switch (response.rows) {
              case "1":
                this.step = 2;
                break;
              case "5":
                this.step = 3;
                break;
              case "9":
                this.step = 4;
                break;
              case "88":
                this.step = 5;
                break;
            }
            this.step = response.rows;
          });
      },
      getBillList() { //当前已存在的票据列表
        this.$axios.get('sloan/loan')
          .then((resopnse) => {
            this.billTable1 = resopnse.rows;
          })
      },
      uploadBill() { //上传证书
        if (this.$refs.uploadBill.files.length !== 0) {
          var image = new FormData();
          image.append('file', this.$refs.uploadBill.files[0])
          this.$axios.post('sfphy/file/info', image)
            .then((response) => {
              this.billForm = {
                fphm: response.invoiceNo,
                kprq: response.invoiceDate
              };
              this.billUrl = {
                key: response.enclosureKey,
                url: this.$baseUrl + 'file/action/download/file?key=' + response.enclosureKey + '&uid=' + JSON.parse(
                  this.$utils.getCookie("user")).uid
              }
            })
        }
      },
      checkBill() { //核验发票
        this.$refs["addBillForm"].validate((valid) => {
          if (valid) {
            this.$axios.post('sfphy/fpcy', this.billForm)
              .then((response) => {
                  var type = response.rows.msgGeneral == '查验成功' ? 'success' : 'error';
                    this.$Message({type:type,message:response.rows.msgGeneral});
                    this.billDetail = response.rows.fpGeneral;
                    this.isAdd = true;
              })
          } else {
            return false;
          }
        })
      },
      addBill() { //添加发票
        var param = {
          kprq: this.billDetail.kprq,
          fpdm: this.billDetail.fpdm,
          fphm: this.billDetail.fphm,
          je: this.billDetail.je,
          fileVos: []
        }
        for (let i = 0; i < this.uploadFileList.length; i++) {
          param.fileVos.push({
            fileKey: this.uploadFileList[i].key,
            fileName: this.uploadFileList[i].name,
            fileUrl: this.uploadFileList[i].url,
          });
        }
        this.$axios.post('sloan/add/', param)
          .then(() => {
            this.getBillList();
            //清空数据
            this.$refs['addBillForm'].resetFields();
            this.billDetail = {};
            this.billUrl = {
              key: '',
              url: ''
            };
            this.uploadFileList = [];
            this.isAdd = false;
          });
      },
      uploadFile(formName, list) { //手动录入上传附件
        var file = new FormData();
        file.append('file', this.$refs[formName].files[0])
        this.$axios.post('file/action/upload/image/url', file)
          .then((response) => {
            list.push(response.rows);
            // this.uploadFileList.push(response.rows);
          });
      },
      delFile(key, list, index) { //删除附件
        this.deleteFile(key, function () {
          list.splice(index, 1);
        });
      },
      deleteBillUrl() {
        this.deleteFile(this.billUrl.key, function () {
          this.billUrl = {
            key: '',
            url: ''
          }
        });
      },
      deleteFile(key, callback) {
        this.$axios.post('file/action/delete?key=' + key)
          .then(() => {
            callback();
          });
      },
      delBill() { //删除发票
        this.$axios.get('sloan/deleteinv/' + this.radio)
          .then(() => {
            this.getSloanNow(false);
            for (let i = 0; i < this.billTable1.length; i++) {
              if (this.radio == this.billTable1[i].id) {
                this.billTable1.splice(i, 1);
              }
            }
          });
      },
      selectbillExcel() { //选择excel
        this.billExcel = this.$refs.importBill.files[0];
      },
      importBill() { //导入
        var file = new FormData();
        file.append('file', this.billExcel);
        this.$axios.post('sfphy/fpcy/import/xml', file)
          .then((response) => {
            this.billTable2 = response.rows;
            this.getBillList();
            this.getSloanNow(false);
          })
      },
      downloadBill() { //模板下载
        window.open(this.$baseUrl + "sfphy/fpcy/dowload/xml");
      },
      propBillDetail(row, event, column) {
        if (event.target.nodeName != "INPUT" && event.target.nodeName != "SPAN") {
          this.billTable = this.billTable1;
          this.getBillDetail(row);
        }
      },
      autoBillDetail(row) {
        this.getBillDetail(row);
        this.billTable = this.billTable2;
      },
      getBillDetail(row, event, column) { //发票详情
        this.billDialog = true;
        this.billDetailDialog = row;
        this.billTable.map((c, i) => {
          if (c.fphm == row.fphm) {
            this.rowIndex = i;
          }
        });
      },

      applyBill() {
        if (this.applyStep == 1) { //下一步
          if (this.billTable1.length > 0) {
            this.applyStep = 2;
          }

        } else { //提交申请
          var list = [];
          for (let i = 0; i < this.bankList.length; i++) {
            if (this.bankList[i].active) {
              list.push(this.bankList[i]);
            }
          }
          if (list.length == 0) {
            this.$Message.error('请先选择核心企业!');
          } else {
            this.$axios.post('sloan/submit', list)
              .then((response) => {
                this.$Message.success('申请成功!');
                this.$router.push({
                    name: 'SfinanceDetail',
                    params: {id: response.rows }
                });
              });
          }
        }
      },
      toggle(item, index) {
        item.active ? this.$set(item, 'active', false) : this.$set(item, 'active', true);
      }
    }
  };

</script>
