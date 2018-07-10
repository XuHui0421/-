<template>
  <div class="container">
    <div class="f-box">
      <div class="f-box-left">
        <div class="back" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i> 返回
        </div>
        <h4 class="text-blod fz16 info-dark">采购管理:</h4>
        <ul class="filter-l-list">
          <li :class="{active: active == 1}" @click="() => {active = 1,companyPaging.offset = 0}">
            <span class=""> 供应商清单 </span>
            <i class="el-icon-arrow-right"></i>
          </li>
          <li :class="{active: active == 2}" @click="() => {active = 2,companyPaging.offset = 0}">
            <span class="">供应商分配 </span>
            <i class="el-icon-arrow-right"></i>
          </li>
          <li :class="{active: active == 3}" @click="active = 3">
            <span class="">分类管理 </span>
            <i class="el-icon-arrow-right"></i>
          </li>
          <li :class="{active: active == 4}" @click="active = 4">
            <span class="">快速导入 </span>
            <i class="el-icon-arrow-right"></i>
          </li>
        </ul>
      </div>
      <div class="f-box-right">
        <div v-if="active == 1 || active == 2">
          <div class="header-breadcrumb">
            <div class="o-h">
              <div class="breadcrumb-wrap fl">
                <el-breadcrumb separator=">">
                  <el-breadcrumb-item>数据中心</el-breadcrumb-item>
                  <el-breadcrumb-item class="breadcrumb-current">采购管理 </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </div>
            <div  class="belong-class-box">
              <ul class="belong-class fl">
                <div class="info fl">所属类目：</div>
                <li v-for="item in classList" @click="classFilter(item.id)" :class="{active:item.active}">
                  <span>{{item.name}}</span>
                </li>
              </ul>
              <div class="fr">
                <div class="container-header-search">
                  <el-input placeholder="请输入关键字查询" class="input-radius" v-model="keyword">
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>
                <el-button type="primary" class="btn-search" round @click="getCompanyList">高级搜索</el-button>
              </div>
            </div>
            
            <div v-if="active == 1" class="info belong-class-box">
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
                <el-button size="mini" round type="danger" icon="el-icon-close" @click="deleteSupplier"> 删除</el-button>
              </div>
            </div>
            <div  v-else  class="info belong-class-box">
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
                <el-button size="mini" round class="btn-link" @click="assignDialog = true"> 指派</el-button>
                <el-button size="mini" round class="btn-link" @click="classDialog = true"> 归类</el-button>
              </div>
            </div>
          </div>
          <div class="container-list">
            <el-table ref="multipleTable" :data="companyTable" class="table" style="width: 100%">
              <el-table-column>
                <template scope="scope">
                    <el-radio v-model="radio" :label="scope.row.id">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="公司名称"></el-table-column>
              <el-table-column prop="" label="分类"></el-table-column>
              <el-table-column prop="startDate" label="合作开始时间"></el-table-column>
              <el-table-column prop="years" label="合作年限"></el-table-column>
              <el-table-column prop="contract" label="联系人"></el-table-column>
              <el-table-column prop="tel" label="电话"></el-table-column>
              <el-table-column prop="creditLine" label="授信额度"></el-table-column>
              <el-table-column prop="creditAvailable" label="可用额度"></el-table-column>
              <el-table-column prop="operatingStatus" label="状态"></el-table-column>
            </el-table>
            <div class="confirm-footer">
              <div class="pagination">
                <el-pagination @current-change="currentCompany" @prev-click="currentCompany" @next-click="currentCompany" :current-page.sync="companyPaging.currentPage" :page-sizes="[10,20,50]" :page-size="10" layout="prev, pager, next, total,jumper"
                  :total="companyPaging.total" background>
                </el-pagination>
                <el-button class="btn-pagination">确认</el-button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="active == 3">
          <div class="tree-box">
            <el-tree :data="classList" node-key="pid" >
              <div class="class-drag-list" slot-scope="{ node, data }">
                <div class="fl">
                  <i class="icon iconfont icon-menu info"></i>
                  <span v-show="showClassEdit != data.id">{{data.name}}</span>
                  <el-input placeholder="请输入内容" v-model="data.name" v-show="showClassEdit == data.id"></el-input>
                </div>
                <div class="fr">
                  <div v-show="showClassEdit != data.id">
                    <el-button size="mini" type="text" @click="showClassEdit = data.id">修改</el-button>
                    <el-button size="mini" type="text" class="info" @click=" removeClass(node, data) ">删除</el-button>
                  </div>
                  <div v-show="showClassEdit == data.id">
                    <el-button size="mini" type="text" @click=" updateClass(node, data) ">完成</el-button>
                    <el-button size="mini" type="text" class="info" @click="  showClassEdit = '' ">取消</el-button>
                  </div>
                </div>
              </div>
            </el-tree>
            <div class="add-class-box" v-show="addClass">
              <div class="fl">
                <i class="icon iconfont icon-menu info"></i>
                <el-input placeholder="请输入内容" v-model="className"></el-input>
              </div>
              <div class="fr">
                <div>
                  <el-button size="mini" type="text" @click="addClassSure">完成</el-button>
                  <el-button size="mini" type="text" class="info" @click="addClass = false">取消</el-button>
                </div>
              </div>
            </div>
            <div class="text-center  mt20" @click="addClass = true">
              <span class="add-btn">
                <i class="el-icon-circle-plus blue text-title"></i>
                添加新分类
              </span>
            </div>
          </div>

        </div>
        <div v-if="active == 4">
          <div class="detail-header">
            <div class="detail-title">
              导入供应商
            </div>
            <div class="operate-list">
                <el-button type="primary" size="mini" round icon="el-icon-upload2" class="btn-import" @click="importSupplieDialog = true">
                  导入供应商
                </el-button>
              <el-button type="primary" size="mini" round icon="el-icon-check">保存</el-button>
            </div>
          </div>
          <div class="business-form">
            <el-form :inline="true" :model="addBusinessForm" :rules="addBusinessRules" label-width="100px" label-position="right" ref="addBusinessForm">
              <el-form-item label="企业名称" prop="fpdm" class="form-item">
                <el-input v-model="addBusinessForm.name" placeholder="请输入企业名称"></el-input>
              </el-form-item>
              <el-form-item label="组织机构代码" prop="fphm" class="form-item">
                <el-input v-model="addBusinessForm.fphm" placeholder="请输入组织机构代码"></el-input>
              </el-form-item>
              <el-form-item label="联系人" prop="contact" class="form-item">
                <el-input v-model="addBusinessForm.contact" placeholder="请输入联系人"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="mobile" class="form-item">
                <el-input v-model="addBusinessForm.mobile" placeholder="请输入联系方式"></el-input>
              </el-form-item>
              <el-form-item label="分类" prop="class" class="form-item">
                <el-select placeholder="请选择分类" v-model="addBusinessForm.class" class="form-select">
                  <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
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
    <el-dialog title="归类" :visible.sync="classDialog" width="30%">
      <div class="dialog-body text-center">
        <h3>****公司归类到</h3>
        <div class="mt20">
          <el-select placeholder="请选择" class="dialog-full-select" v-model="classValue">
            <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="classDialog = false">取 消</el-button>
        <el-button type="primary" @click="classDialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="导入供应商" :visible.sync="importSupplieDialog" width="30%">
        <el-form :model="importSupplieForm" :rules="importSupplieFormRules" class="form-center" ref="importSupplieForm">
                <el-form-item label="导入企业类型" prop="type">
                    <el-input type="text" v-model="importSupplieForm.type" auto-complete="off" placeholder="请输入导入企业类型"></el-input>
                </el-form-item>
                <el-form-item label="核心企业" prop="core">
                    <el-input type="text" v-model="importSupplieForm.core" auto-complete="off" placeholder="请输入核心企业"></el-input>
                </el-form-item>
        </el-form>
      <input type="file" class="input-file" ref="importCompany">
      <div slot="footer" class="dialog-footer">
        <el-button @click="importSupplieDialog = false">取 消</el-button>
        <el-button type="primary" @click="importCompany()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scoped lang="less">
  @import "../../../assets/css/page/confirm.less";
  @import "../../../assets/css/page/purchase.less";

</style>


<script>
  export default {
    data() {
      return {
        classDialog: false, //归类dialog
        classManagerDialog: false, //分类管理dialog
        assignDialog: false, //指派dialog
        importSupplieDialog: false,//导入供应商dialog
        assignValue: '',
        people: [],
        active: '1',
        companyTable: [],
        keyword: '',
        radio: '',
        companyPaging: {
          total: 0,
          pageSize: 10,
          offset: 1,
          currentPage: 0
        },
        classList: [],
        showClassEdit: '',
        className: '',
        addClass: false,
        classValue: '',
        addBusinessForm: { //添加供应商表单

        },
        addBusinessRules: { //添加供应商验证规则

        },
        importSupplieForm: {//导入供应商表单

        },
        importSupplieFormRules: {//导入供应商表单验证规则

        }
      };
    },
    created() {
      this.$store.commit("setActiveTab", "/data");
      this.getCompanyList();
      this.getClassList();
    },
    methods: {
         currentCompany(value){
            this.companyPaging.offset = value;
            this.getCompanyList();
        },
        getClassList(){//分类
            this.$axios.get('bentertype/query')
            .then((res) => {
                this.classList = res.rows;
            });
        },
        classFilter(classId){
            for(var i = 0;i<this.classList.length;i++){
                if(this.classList[i].id == classId){
                    this.$set(this.classList[i],'active',true);
                }else{
                    this.$set(this.classList[i],'active',false);
                }
                
            }
            this.getCompanyList(classId);
        },
      getCompanyList(classId) {//供应商列表
        this.$axios.get('/benter/supplier',{
                params: {
                    offset: this.companyPaging.offset,
                    classId: classId,
                    keyword: this.keyword
                }
            })
        .then((res) => {
            this.companyTable = res.rows;
            this.companyPaging.total = res.total;
        });
      },
      deleteSupplier(){//删除供应商
        if(this.radio){
            this.$confirm('确定删除供应商吗?', '删除供应商', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                this.$axios.delete('/benter/delete/'+this.radio)
                .then((res) => {
                   this.$Message.success('删除成功!');
                   this.getCompanyList();
                });
            });
        }else{
            this.$Message.error('请选择供应商!');
        }
        
      },
      importCompany(){//导入供应商
        if (this.$refs.importCompany.files.length !== 0) {
          var file = new FormData();
          file.append('file', this.$refs.importCompany.files[0])
          this.$axios.post('benter/import', file)
            .then((response) => {
                this.$Message.success('导入成功!');
            })
        }
      },
      addClassSure(){//新增分类
         this.$axios.post('bentertype/add',{name: this.className})
        .then((res) => {
            this.getClassList();
            this.$Message.success('新增成功!');
            this.addClass = false;
        });
      },
      updateClass(node, data) {//修改分类
        this.$axios.post('bentertype/update',{name: data.name,id: data.id})
        .then((res) => {
            this.getClassList();
            this.$Message.success('修改成功!');
            this.showClassEdit = '';
        });
      },
      removeClass(node, data) {//删除分类
        this.$axios.delete('/bentertype/delete/'+data.id)
        .then((res) => {
            this.getClassList();
            this.$Message.success('删除成功!');
        });
      },
    }
  };
</script>
